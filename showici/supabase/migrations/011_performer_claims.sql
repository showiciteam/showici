-- 011: Performer profiles listed by ShowIci (e.g. artists we interview for Spotlight) that the artist can claim.
-- An unclaimed performer has no owner. Its page shows "Listed by ShowIci · Is this you? Claim it".
-- A claim is approved instantly when the claimant's confirmed email is on the artist's own website domain
-- (e.g. karla@kbust.com for kbust.com); otherwise it waits for an admin in Admin → Claims.
-- Safe to run more than once.

-- ───────────── Performers without an owner ─────────────
alter table public.performers alter column owner drop not null;
alter table public.performers add column if not exists source text not null default 'artist' check (source in ('artist', 'showici'));
alter table public.performers add column if not exists claimed_at timestamptz;

-- The public view lists its columns explicitly; the new ones go at the end.
create or replace view public.performers_view as
select p.id, p.owner, p.name, p.act_type, p.genres, p.repertoire, p.base_city, p.location, p.travel_km, p.event_types,
  p.languages, p.members, p.set_length, p.fee_range, p.own_sound, p.bio, p.available_days, p.available, p.verified,
  p.published, p.created_at, p.instagram, p.facebook, p.tiktok, p.music_url, p.website, p.contact_name, p.blocked_dates,
  st_y(p.location::geometry) as lat, st_x(p.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where p.owner is not null and r.subject_id = p.owner) as rating,
  (select count(*) from reviews r where p.owner is not null and r.subject_id = p.owner) as review_count,
  p.cover_path, p.logo_path, p.source, p.claimed_at
from performers p where p.published;
grant select on public.performers_view to anon, authenticated;

-- Admins can add and remove ShowIci-listed performers from the app (they already read and update all of them).
drop policy if exists "admin inserts performers" on performers;
create policy "admin inserts performers" on performers for insert with check (public.is_admin());
drop policy if exists "admin manages performer media" on performer_videos;
create policy "admin manages performer media" on performer_videos for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin manages performer photos" on performer_photos;
create policy "admin manages performer photos" on performer_photos for all using (public.is_admin()) with check (public.is_admin());

-- A claim may switch the claimant's account to the performer role; the profile guard allows it only inside claim functions.
create or replace function public.protect_profile_fields() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin()
     and coalesce(current_setting('showici.claim_in_progress', true), '') <> 'on'
     and (new.role is distinct from old.role or new.plan is distinct from old.plan) then
    raise exception 'Only an admin can change role or plan';
  end if;
  return new;
end $$;

-- ───────────── Claims ─────────────
create table if not exists public.performer_claims (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  performer_id uuid not null references public.performers on delete cascade,
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
create index if not exists performer_claims_status_idx on public.performer_claims (status, created_at desc);
create unique index if not exists performer_claims_one_pending on public.performer_claims (performer_id, claimant) where status = 'pending';

alter table public.performer_claims enable row level security;
drop policy if exists "own performer claims" on public.performer_claims;
create policy "own performer claims" on public.performer_claims for select using (claimant = auth.uid());
drop policy if exists "admin reads performer claims" on public.performer_claims;
create policy "admin reads performer claims" on public.performer_claims for select using (public.is_admin());
revoke insert, update, delete on public.performer_claims from anon, authenticated;
grant select on public.performer_claims to authenticated;

-- Hands a performer page to an account: owner set, account switched to the performer role.
create or replace function public.give_performer(p_performer uuid, p_to uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from performers where owner = p_to and id <> p_performer) then
    raise exception 'This account already has a performer profile. Contact us and we''ll merge them.';
  end if;
  update performers set owner = p_to, claimed_at = now() where id = p_performer and owner is null;
  if not found then raise exception 'This profile has already been claimed. If it is yours, contact us.'; end if;
  perform set_config('showici.claim_in_progress', 'on', true);
  update profiles set role = 'performer' where id = p_to and role in ('planner', 'performer');
  perform set_config('showici.claim_in_progress', '', true);
end $$;
revoke all on function public.give_performer(uuid, uuid) from public, anon, authenticated;

-- Called from the "Claim this profile" form. Returns 'approved' or 'pending'.
create or replace function public.claim_performer(p_performer uuid, p_name text, p_role text, p_phone text default null, p_message text default null)
returns text language plpgsql security definer set search_path = public as $$
declare
  v_me uuid := auth.uid();
  v_email text;
  v_confirmed timestamptz;
  v_perf performers%rowtype;
  v_site text;
  v_mail text;
  v_inbox text;
  v_free text[] := array['gmail.com','hotmail.com','outlook.com','live.com','yahoo.com','yahoo.ca','icloud.com','me.com','videotron.ca','bell.net','sympatico.ca','videotron.qc.ca','protonmail.com','proton.me','aol.com','msn.com','hotmail.ca','outlook.fr','gmx.com'];
  v_platforms text[] := array['facebook.com','instagram.com','linktr.ee','linktree.com','google.com','business.site','wixsite.com','squarespace.com','tiktok.com','x.com','twitter.com','youtube.com','spotify.com','bandcamp.com','soundcloud.com','ticketmaster.ca','eventbrite.ca','eventbrite.com'];
begin
  if v_me is null then raise exception 'Please sign in first'; end if;
  select u.email, u.email_confirmed_at into v_email, v_confirmed from auth.users u where u.id = v_me;
  select * into v_perf from performers where id = p_performer for update;
  if not found then raise exception 'Profile not found'; end if;
  if v_perf.owner is not null then raise exception 'This profile has already been claimed. If it is yours, contact us.'; end if;
  if exists (select 1 from performers where owner = v_me) then
    raise exception 'Your account already has a performer profile. Contact us and we''ll merge them.';
  end if;
  if exists (select 1 from performer_claims where performer_id = p_performer and claimant = v_me and status = 'pending') then
    raise exception 'Your claim for this profile is already waiting for review.';
  end if;

  v_site := bare_domain(v_perf.website);
  v_mail := bare_domain(v_email);
  if v_confirmed is not null and v_site is not null and v_mail is not null
     and not (v_mail = any(v_free)) and not (v_site = any(v_platforms))
     and not exists (select 1 from unnest(v_platforms) d where v_site like '%.' || d)
     and (v_mail = v_site or v_site like '%.' || v_mail or v_mail like '%.' || v_site) then
    perform give_performer(p_performer, v_me);
    insert into performer_claims (performer_id, claimant, email, name, role, phone, message, status, auto_approved, decided_at)
      values (p_performer, v_me, v_email, trim(p_name), trim(p_role), nullif(trim(p_phone), ''), nullif(trim(p_message), ''), 'approved', true, now());
    return 'approved';
  end if;

  insert into performer_claims (performer_id, claimant, email, name, role, phone, message)
    values (p_performer, v_me, v_email, trim(p_name), trim(p_role), nullif(trim(p_phone), ''), nullif(trim(p_message), ''));
  select trim(both '"' from value::text) into v_inbox from app_settings where key = 'contact_inbox';
  perform notify_email(v_inbox, 'Performer claim to review: ' || v_perf.name,
    '<b>' || replace(trim(p_name), '<', '&lt;') || '</b> (' || replace(trim(p_role), '<', '&lt;') || ') wants to claim the performer profile <b>' || replace(v_perf.name, '<', '&lt;') || '</b>.<br>'
    || 'Email: ' || v_email || coalesce('<br>Phone: ' || replace(nullif(trim(p_phone), ''), '<', '&lt;'), '')
    || coalesce('<br>Artist website: ' || v_perf.website, '')
    || coalesce('<p style="white-space:pre-line;background:#F5F0E6;padding:12px;border-radius:8px">' || replace(nullif(trim(p_message), ''), '<', '&lt;') || '</p>', '')
    || '<p><a href="https://www.showici.com/admin/claims?kind=performer">Review in ShowIci admin</a></p>', v_email);
  return 'pending';
end $$;
revoke all on function public.claim_performer(uuid, text, text, text, text) from public, anon;
grant execute on function public.claim_performer(uuid, text, text, text, text) to authenticated;

-- Admin approves or rejects a claim. Approving hands the profile over and closes other pending claims for it.
create or replace function public.decide_performer_claim(p_claim uuid, p_approve boolean)
returns void language plpgsql security definer set search_path = public as $$
declare c performer_claims%rowtype; v_name text;
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  select * into c from performer_claims where id = p_claim for update;
  if not found or c.status <> 'pending' then raise exception 'This claim was already handled'; end if;
  select name into v_name from performers where id = c.performer_id;
  if p_approve then
    perform give_performer(c.performer_id, c.claimant);
    update performer_claims set status = 'approved', decided_at = now(), decided_by = auth.uid() where id = p_claim;
    update performer_claims set status = 'rejected', decided_at = now(), decided_by = auth.uid() where performer_id = c.performer_id and status = 'pending' and id <> p_claim;
    perform notify_email(c.email, 'Your ShowIci profile is now yours',
      'Good news! Your claim for <b>' || replace(v_name, '<', '&lt;') || '</b> was approved. You can now edit your profile, add photos and videos, and get messages from venues and event planners.'
      || '<p><a href="https://www.showici.com/register/performer" style="display:inline-block;background:#14213D;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:bold">Edit my profile</a></p>');
  else
    update performer_claims set status = 'rejected', decided_at = now(), decided_by = auth.uid() where id = p_claim;
    perform notify_email(c.email, 'About your profile claim on ShowIci',
      'We couldn''t confirm that you are <b>' || replace(v_name, '<', '&lt;') || '</b> or manage this act. If this is a mistake, simply reply to this email or use Contact on www.showici.com and we''ll sort it out.');
  end if;
end $$;
revoke all on function public.decide_performer_claim(uuid, boolean) from public, anon;
grant execute on function public.decide_performer_claim(uuid, boolean) to authenticated;
