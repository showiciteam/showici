-- ShowIci update 002: real data for dashboards, inbox and admin.
-- Run once, after schema.sql: Supabase dashboard → SQL Editor → New query → paste → Run.

-- ───────────── Helpers (security definer avoids row-level-security loops) ─────────────
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.is_conversation_member(p_conversation uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from conversation_members where conversation_id = p_conversation and profile_id = auth.uid());
$$;

-- ───────────── Profiles ─────────────
-- Names and roles are visible so people can see who they are talking to. Contact details are not in this table.
create policy "profiles are readable" on profiles for select using (true);

-- Sign-up can only choose venue, performer or planner (never admin).
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, role, display_name)
  values (
    new.id,
    case when new.raw_user_meta_data->>'role' in ('venue', 'performer', 'planner') then new.raw_user_meta_data->>'role' else 'planner' end,
    new.raw_user_meta_data->>'display_name');
  return new;
end $$;

-- Nobody can make themselves an admin or change their own plan from the app.
create or replace function public.protect_profile_fields() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and not public.is_admin()
     and (new.role is distinct from old.role or new.plan is distinct from old.plan) then
    raise exception 'Only an admin can change role or plan';
  end if;
  return new;
end $$;
drop trigger if exists protect_profile_fields on profiles;
create trigger protect_profile_fields before update on profiles
  for each row execute function public.protect_profile_fields();

-- ───────────── Messaging ─────────────
-- Members can see who else is in their conversations (needed for names in the inbox).
drop policy if exists "members see membership" on conversation_members;
create policy "members see membership" on conversation_members for select
  using (public.is_conversation_member(conversation_id));

-- New messages appear live in the inbox.
do $$ begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null; end $$;

-- How many new contacts the signed-in user started in the last 24 hours.
create or replace function public.contacts_today() returns int
language sql stable security definer set search_path = public as $$
  select count(*)::int from contact_log where sender_id = auth.uid() and created_at > now() - interval '1 day';
$$;

-- ───────────── Reports ─────────────
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null default auth.uid() references public.profiles on delete cascade,
  subject_id uuid references public.profiles on delete cascade,
  conversation_id uuid references public.conversations on delete set null,
  kind text not null check (kind in ('message', 'profile', 'no_show', 'other')),
  reason text,
  status text not null default 'open' check (status in ('open', 'dismissed', 'resolved')),
  created_at timestamptz not null default now()
);
alter table reports enable row level security;
create policy "file a report" on reports for insert with check (reporter_id = auth.uid());
create policy "admin reads reports" on reports for select using (public.is_admin());
create policy "admin updates reports" on reports for update using (public.is_admin());

-- ───────────── Admin access ─────────────
create policy "admin reads performers" on performers for select using (public.is_admin());
create policy "admin updates performers" on performers for update using (public.is_admin());
create policy "admin reads venues" on venues for select using (public.is_admin());
create policy "admin reads shows" on shows for select using (public.is_admin());
create policy "admin reads requests" on event_requests for select using (public.is_admin());
create policy "admin updates settings" on app_settings for update using (public.is_admin());

create or replace function public.admin_stats() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  return jsonb_build_object(
    'venues', (select count(*) from venues),
    'performers', (select count(*) from performers),
    'planners', (select count(*) from profiles where role = 'planner'),
    'messages_week', (select count(*) from messages where created_at > now() - interval '7 days'),
    'shows', (select count(*) from shows));
end $$;

-- ───────────── Make yourself admin ─────────────
-- After you have signed up on the site, replace the email below and run this line on its own:
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'you@example.com');
