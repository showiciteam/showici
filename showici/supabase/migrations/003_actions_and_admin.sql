-- ShowIci update 003: everything users, venues and admins can act on.
-- Run once, after 002: Supabase dashboard → SQL Editor → New query → paste → Run.

-- ───────────── New profile fields ─────────────
alter table performers add column if not exists instagram text;
alter table performers add column if not exists facebook text;
alter table performers add column if not exists tiktok text;
alter table performers add column if not exists music_url text;
alter table performers add column if not exists website text;
alter table performers add column if not exists contact_name text;
alter table performers add column if not exists blocked_dates date[] not null default '{}';
alter table venues add column if not exists contact_name text;
alter table venues add column if not exists contact_role text;

-- The public views pick up the new columns (recreated because their column list changes).
drop view if exists public.performers_view;
drop view if exists public.venues_view;
create view public.performers_view as
select p.*, st_y(p.location::geometry) as lat, st_x(p.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where r.subject_id = p.owner) as rating,
  (select count(*) from reviews r where r.subject_id = p.owner) as review_count
from performers p where p.published;

create view public.venues_view as
select v.*, st_y(v.location::geometry) as lat, st_x(v.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where r.subject_id = v.owner) as rating
from venues v where v.published;

-- ───────────── Saved performers / followed venues ─────────────
create table if not exists public.saved (
  profile_id uuid not null default auth.uid() references public.profiles on delete cascade,
  kind text not null check (kind in ('performer', 'venue')),
  target_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (profile_id, kind, target_id)
);
alter table saved enable row level security;
drop policy if exists "own saved" on saved;
create policy "own saved" on saved for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

-- ───────────── Messaging ─────────────
-- Reuses an existing conversation between the same two people (no duplicate threads, no extra contact used),
-- and can link the conversation to the event request being answered.
drop function if exists public.start_conversation(uuid, text);
create or replace function public.start_conversation(p_recipient uuid, p_first_message text, p_event_request uuid default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare
  v_me uuid := auth.uid();
  v_plan text;
  v_limits boolean;
  v_cap int;
  v_used int;
  v_conv uuid;
begin
  if v_me is null then raise exception 'Not signed in'; end if;
  if p_recipient = v_me then raise exception 'You cannot message yourself'; end if;

  select m1.conversation_id into v_conv
  from conversation_members m1 join conversation_members m2 on m2.conversation_id = m1.conversation_id
  where m1.profile_id = v_me and m2.profile_id = p_recipient
  limit 1;

  if v_conv is null then
    select plan into v_plan from profiles where id = v_me;
    select (value)::boolean into v_limits from app_settings where key = 'plan_limits_enabled';
    select (value)::int into v_cap from app_settings where key = 'free_daily_contacts';
    if v_limits and v_plan = 'free' then
      select count(*) into v_used from contact_log where sender_id = v_me and created_at > now() - interval '1 day';
      if v_used >= v_cap then raise exception 'Daily contact limit reached'; end if;
    end if;
    insert into conversations (created_by, event_request_id) values (v_me, p_event_request) returning id into v_conv;
    insert into conversation_members values (v_conv, v_me), (v_conv, p_recipient);
    insert into contact_log (sender_id, recipient_id) values (v_me, p_recipient);
  end if;

  insert into messages (conversation_id, sender_id, body) values (v_conv, v_me, p_first_message);
  return v_conv;
end $$;

-- ───────────── Reviews: only between people who talked on ShowIci ─────────────
drop policy if exists "write own review" on reviews;
create policy "write own review" on reviews for insert with check (
  reviewer_id = auth.uid()
  and subject_id <> auth.uid()
  and public.is_conversation_member(conversation_id)
  and exists (select 1 from conversation_members m where m.conversation_id = reviews.conversation_id and m.profile_id = reviews.subject_id)
);

-- ───────────── Photos: owners can remove their own files ─────────────
drop policy if exists "users delete own media" on storage.objects;
create policy "users delete own media" on storage.objects for delete
  using (bucket_id = 'media' and auth.uid()::text = (storage.foldername(name))[1]);

-- ───────────── Admin powers ─────────────
drop policy if exists "admin updates profiles" on profiles;
create policy "admin updates profiles" on profiles for update using (public.is_admin());
drop policy if exists "admin updates venues" on venues;
create policy "admin updates venues" on venues for update using (public.is_admin());
drop policy if exists "admin updates shows" on shows;
create policy "admin updates shows" on shows for update using (public.is_admin());
drop policy if exists "admin updates requests" on event_requests;
create policy "admin updates requests" on event_requests for update using (public.is_admin());

-- Everyone who signed up, with their email (emails live in the protected auth schema). Admins only.
create or replace function public.admin_users()
returns table (id uuid, email text, role text, display_name text, plan text, created_at timestamptz, confirmed boolean, last_sign_in_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  return query
    select u.id, u.email::text, p.role, p.display_name, p.plan, u.created_at, u.email_confirmed_at is not null, u.last_sign_in_at
    from auth.users u left join profiles p on p.id = u.id
    order by u.created_at desc;
end $$;
