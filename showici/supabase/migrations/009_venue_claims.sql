-- 009: Venues listed by ShowIci (from public sources) that the real owner can claim.
-- An unclaimed venue has no owner. Its page shows "Is this your venue? Claim it".
-- A claim is approved instantly when the claimant's confirmed email is on the venue's own website domain
-- (e.g. bob@lebarbiz.ca for lebarbiz.ca); otherwise it waits for an admin in Admin → Venue claims.

-- ───────────── Venues without an owner ─────────────
alter table public.venues alter column owner drop not null;
alter table public.venues add column if not exists phone text check (char_length(phone) <= 40);
alter table public.venues add column if not exists source text not null default 'owner' check (source in ('owner', 'showici'));
alter table public.venues add column if not exists source_ref text check (char_length(source_ref) <= 80); -- e.g. OpenStreetMap id "osm:n1570292450"
alter table public.venues add column if not exists claimed_at timestamptz;
create unique index if not exists venues_source_ref_key on public.venues (source_ref) where source_ref is not null;

-- The public view gets the new columns (recreated because its column list changes; the venue search reads it).
drop view if exists public.venues_view;
create view public.venues_view as
select v.*, st_y(v.location::geometry) as lat, st_x(v.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where v.owner is not null and r.subject_id = v.owner) as rating
from venues v where v.published;
grant select on public.venues_view to anon, authenticated;

-- ───────────── Claims ─────────────
create table if not exists public.venue_claims (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  venue_id uuid not null references public.venues on delete cascade,
  claimant uuid not null default auth.uid() references public.profiles on delete cascade,
  email text not null,
  name text not null check (char_length(name) between 1 and 120),
  role text not null check (char_length(role) between 1 and 60),
  phone text check (char_length(phone) <= 40),
  message text check (char_length(message) <= 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  auto_approved boolean not null default false,
  decided_at timestamptz,
  decided_by uuid references public.profiles on delete set null
);
create index if not exists venue_claims_status_idx on public.venue_claims (status, created_at desc);
create unique index if not exists venue_claims_one_pending on public.venue_claims (venue_id, claimant) where status = 'pending';

alter table public.venue_claims enable row level security;
drop policy if exists "own claims" on public.venue_claims;
create policy "own claims" on public.venue_claims for select using (claimant = auth.uid());
drop policy if exists "admin reads claims" on public.venue_claims;
create policy "admin reads claims" on public.venue_claims for select using (public.is_admin());
-- No direct insert/update: claims go through claim_venue() and decide_venue_claim() below.
revoke insert, update, delete on public.venue_claims from anon, authenticated;
grant select on public.venue_claims to authenticated;

-- Host of a URL or email domain, lower-case, without "www.".
create or replace function public.bare_domain(p text)
returns text language sql immutable as $$
  select nullif(regexp_replace(lower(split_part(split_part(regexp_replace(coalesce(p, ''), '^[a-z]+://', '', 'i'), '/', 1), '@', -1)), '^www\.', ''), '')
$$;

-- Email ShowIci (only once Resend and an inbox are configured, see 004 and 008).
create or replace function public.notify_email(p_to text, p_subject text, p_html text, p_reply_to text default null)
returns void language plpgsql security definer set search_path = public, extensions as $$
declare v_key text;
begin
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'resend_api_key' limit 1;
  if v_key is null or coalesce(p_to, '') = '' then return; end if;
  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object('Authorization', 'Bearer ' || v_key, 'Content-Type', 'application/json'),
    body := jsonb_build_object('from', 'ShowIci <hello@showici.com>', 'to', jsonb_build_array(p_to), 'subject', p_subject,
      'html', '<div style="font-family:Arial,sans-serif;color:#14213D;font-size:15px;line-height:1.5">' || p_html || '</div>')
      || case when p_reply_to is null then '{}'::jsonb else jsonb_build_object('reply_to', p_reply_to) end
  );
exception when others then
  return; -- an email problem never blocks the claim
end $$;
revoke all on function public.notify_email(text, text, text, text) from public, anon, authenticated;

-- Called from the "Claim this venue" form. Returns 'approved' or 'pending'.
create or replace function public.claim_venue(p_venue uuid, p_name text, p_role text, p_phone text default null, p_message text default null)
returns text language plpgsql security definer set search_path = public as $$
declare
  v_me uuid := auth.uid();
  v_email text;
  v_confirmed timestamptz;
  v_venue venues%rowtype;
  v_site text;
  v_mail text;
  v_inbox text;
  v_free text[] := array['gmail.com','hotmail.com','outlook.com','live.com','yahoo.com','yahoo.ca','icloud.com','me.com','videotron.ca','bell.net','sympatico.ca','videotron.qc.ca','protonmail.com','proton.me','aol.com','msn.com','hotmail.ca','outlook.fr','gmx.com'];
  v_platforms text[] := array['facebook.com','instagram.com','linktr.ee','linktree.com','google.com','business.site','wixsite.com','squarespace.com','tiktok.com','x.com','twitter.com','yelp.com','yelp.ca','tripadvisor.com','tripadvisor.ca','ticketmaster.ca','eventbrite.ca','eventbrite.com'];
begin
  if v_me is null then raise exception 'Please sign in first'; end if;
  select u.email, u.email_confirmed_at into v_email, v_confirmed from auth.users u where u.id = v_me;
  select * into v_venue from venues where id = p_venue for update;
  if not found then raise exception 'Venue not found'; end if;
  if v_venue.owner is not null then raise exception 'This venue has already been claimed. If it is yours, contact us.'; end if;
  if exists (select 1 from venue_claims where venue_id = p_venue and claimant = v_me and status = 'pending') then
    raise exception 'Your claim for this venue is already waiting for review.';
  end if;

  v_site := bare_domain(v_venue.website);
  v_mail := bare_domain(v_email);
  if v_confirmed is not null and v_site is not null and v_mail is not null
     and not (v_mail = any(v_free)) and not (v_site = any(v_platforms))
     and not exists (select 1 from unnest(v_platforms) d where v_site like '%.' || d)
     and (v_mail = v_site or v_site like '%.' || v_mail or v_mail like '%.' || v_site) then
    update venues set owner = v_me, claimed_at = now() where id = p_venue;
    insert into venue_claims (venue_id, claimant, email, name, role, phone, message, status, auto_approved, decided_at)
      values (p_venue, v_me, v_email, trim(p_name), trim(p_role), nullif(trim(p_phone), ''), nullif(trim(p_message), ''), 'approved', true, now());
    return 'approved';
  end if;

  insert into venue_claims (venue_id, claimant, email, name, role, phone, message)
    values (p_venue, v_me, v_email, trim(p_name), trim(p_role), nullif(trim(p_phone), ''), nullif(trim(p_message), ''));
  select trim(both '"' from value::text) into v_inbox from app_settings where key = 'contact_inbox';
  perform notify_email(v_inbox, 'Venue claim to review: ' || v_venue.name,
    '<b>' || replace(trim(p_name), '<', '&lt;') || '</b> (' || replace(trim(p_role), '<', '&lt;') || ') wants to claim <b>' || replace(v_venue.name, '<', '&lt;') || '</b>.<br>'
    || 'Email: ' || v_email || coalesce('<br>Phone: ' || replace(nullif(trim(p_phone), ''), '<', '&lt;'), '')
    || coalesce('<br>Venue website: ' || v_venue.website, '') || coalesce('<br>Venue phone: ' || v_venue.phone, '')
    || coalesce('<p style="white-space:pre-line;background:#F5F0E6;padding:12px;border-radius:8px">' || replace(nullif(trim(p_message), ''), '<', '&lt;') || '</p>', '')
    || '<p><a href="https://www.showici.com/admin/claims">Review in ShowIci admin</a></p>', v_email);
  return 'pending';
end $$;
revoke all on function public.claim_venue(uuid, text, text, text, text) from public, anon;
grant execute on function public.claim_venue(uuid, text, text, text, text) to authenticated;

-- Admin approves or rejects a claim. Approving hands the venue to the claimant and closes other pending claims for it.
create or replace function public.decide_venue_claim(p_claim uuid, p_approve boolean)
returns void language plpgsql security definer set search_path = public as $$
declare c venue_claims%rowtype; v_name text;
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  select * into c from venue_claims where id = p_claim for update;
  if not found or c.status <> 'pending' then raise exception 'This claim was already handled'; end if;
  select name into v_name from venues where id = c.venue_id;
  if p_approve then
    update venues set owner = c.claimant, claimed_at = now() where id = c.venue_id and owner is null;
    if not found then raise exception 'This venue already has an owner'; end if;
    update venue_claims set status = 'approved', decided_at = now(), decided_by = auth.uid() where id = p_claim;
    update venue_claims set status = 'rejected', decided_at = now(), decided_by = auth.uid() where venue_id = c.venue_id and status = 'pending' and id <> p_claim;
    perform notify_email(c.email, 'Your venue is now yours on ShowIci',
      'Good news! Your claim for <b>' || replace(v_name, '<', '&lt;') || '</b> was approved. You can now add photos, post your shows and get messages from artists.'
      || '<p><a href="https://www.showici.com/dashboard/venue" style="display:inline-block;background:#14213D;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:bold">Open my venue dashboard</a></p>');
  else
    update venue_claims set status = 'rejected', decided_at = now(), decided_by = auth.uid() where id = p_claim;
    perform notify_email(c.email, 'About your venue claim on ShowIci',
      'We couldn''t confirm that you manage <b>' || replace(v_name, '<', '&lt;') || '</b>. If this is a mistake, simply reply to this email or use Contact on www.showici.com and we''ll sort it out.');
  end if;
end $$;
revoke all on function public.decide_venue_claim(uuid, boolean) from public, anon;
grant execute on function public.decide_venue_claim(uuid, boolean) to authenticated;
