-- ShowIci database schema for Supabase (Postgres + PostGIS).
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create extension if not exists postgis;

-- ───────────────────────── Accounts ─────────────────────────
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null check (role in ('venue', 'performer', 'planner', 'admin')),
  display_name text,
  plan text not null default 'free' check (plan in ('free', 'performer_pro', 'venue_pro')),
  language text not null default 'fr' check (language in ('fr', 'en', 'es')),
  created_at timestamptz not null default now()
);

-- Create a profile automatically when someone signs up (role and name come from sign-up metadata).
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, role, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'role', 'planner'), new.raw_user_meta_data->>'display_name');
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────────────────── Performers ─────────────────────────
create table public.performers (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references public.profiles on delete cascade,
  name text not null,
  act_type text not null,
  genres text[] not null default '{}',
  repertoire text check (repertoire in ('Covers', 'Originals', 'Both')),
  base_city text,
  location geography(point, 4326),
  travel_km int not null default 50,
  event_types text[] not null default '{}',
  languages text[] not null default '{}',
  members int default 1,
  set_length text,
  fee_range text,
  own_sound boolean default false,
  bio text check (char_length(bio) <= 500),
  available_days text[] default '{}',
  available boolean not null default true,
  verified boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create index performers_location_idx on public.performers using gist (location);

create table public.performer_videos (
  id uuid primary key default gen_random_uuid(),
  performer_id uuid not null references public.performers on delete cascade,
  youtube_url text not null,
  title text,
  length text,
  featured boolean not null default false,
  position int not null default 0
);

create table public.performer_photos (
  id uuid primary key default gen_random_uuid(),
  performer_id uuid not null references public.performers on delete cascade,
  storage_path text not null,
  is_cover boolean not null default false,
  position int not null default 0
);

-- Phone numbers live in their own table so they are never exposed publicly.
create table public.private_contacts (
  profile_id uuid primary key references public.profiles on delete cascade,
  phone text
);

-- ───────────────────────── Venues ─────────────────────────
create table public.venues (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references public.profiles on delete cascade,
  name text not null,
  type text not null,
  street text,
  area text,
  city text,
  postal_code text,
  location geography(point, 4326),
  description text,
  capacity text,
  stage text,
  setting text,
  equipment text[] default '{}',
  books text[] default '{}',
  genres text[] default '{}',
  nights text,
  lead_time text,
  fee_range text,
  open_to_new_acts boolean default true,
  website text, instagram text, facebook text, youtube_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create index venues_location_idx on public.venues using gist (location);

create table public.venue_photos (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues on delete cascade,
  storage_path text not null,
  is_cover boolean not null default false,
  position int not null default 0
);

-- ───────────────────────── Shows ─────────────────────────
create table public.shows (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues on delete cascade,
  performer_id uuid references public.performers on delete set null,
  performer_name text,
  title text,
  genre text,
  starts_at timestamptz not null,
  doors_at timestamptz,
  entry text default 'Free entry',
  description_fr text,
  description_en text,
  poster_path text,
  ticket_url text, -- optional Eventbrite or other ticket link
  status text not null default 'draft' check (status in ('draft', 'live', 'cancelled')),
  created_at timestamptz not null default now()
);

-- ───────────────────────── Private event requests ─────────────────────────
create table public.event_requests (
  id uuid primary key default gen_random_uuid(),
  planner_id uuid not null references public.profiles on delete cascade,
  event_type text not null,
  event_date date not null,
  start_time time,
  length text,
  city text,
  location geography(point, 4326),
  guests text,
  setting text,
  wants text[] default '{}',
  style text,
  language text,
  budget text,
  note text,
  status text not null default 'open' check (status in ('open', 'booked', 'closed')),
  created_at timestamptz not null default now()
);

-- ───────────────────────── Messaging (platform is the go-between) ─────────────────────────
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  event_request_id uuid references public.event_requests on delete set null,
  created_by uuid not null references public.profiles,
  created_at timestamptz not null default now()
);
create table public.conversation_members (
  conversation_id uuid references public.conversations on delete cascade,
  profile_id uuid references public.profiles on delete cascade,
  primary key (conversation_id, profile_id)
);
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations on delete cascade,
  sender_id uuid not null references public.profiles,
  body text not null,
  kind text not null default 'text' check (kind in ('text', 'proposal')),
  created_at timestamptz not null default now()
);

-- Hide phone numbers and emails typed into messages, to keep contact on ShowIci.
create or replace function public.mask_contact_info() returns trigger language plpgsql as $$
begin
  new.body := regexp_replace(new.body, '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[email hidden]', 'g');
  new.body := regexp_replace(new.body, '(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}', '[phone hidden]', 'g');
  return new;
end $$;
create trigger mask_contact before insert on public.messages for each row execute function public.mask_contact_info();

-- ───────────────────────── Plan limits (off during the free launch) ─────────────────────────
create table public.app_settings (key text primary key, value jsonb not null);
insert into public.app_settings values
  ('plan_limits_enabled', 'false'),
  ('free_daily_contacts', '2');

create table public.contact_log (
  id bigserial primary key,
  sender_id uuid not null references public.profiles,
  recipient_id uuid not null references public.profiles,
  created_at timestamptz not null default now()
);

-- Starts a conversation, enforcing the daily contact cap for free plans when limits are on.
create or replace function public.start_conversation(p_recipient uuid, p_first_message text)
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
  select plan into v_plan from profiles where id = v_me;
  select (value)::boolean into v_limits from app_settings where key = 'plan_limits_enabled';
  select (value)::int into v_cap from app_settings where key = 'free_daily_contacts';
  if v_limits and v_plan = 'free' then
    select count(*) into v_used from contact_log
      where sender_id = v_me and created_at > now() - interval '1 day';
    if v_used >= v_cap then raise exception 'Daily contact limit reached'; end if;
  end if;
  insert into conversations (created_by) values (v_me) returning id into v_conv;
  insert into conversation_members values (v_conv, v_me), (v_conv, p_recipient);
  insert into messages (conversation_id, sender_id, body) values (v_conv, v_me, p_first_message);
  insert into contact_log (sender_id, recipient_id) values (v_me, p_recipient);
  return v_conv;
end $$;

-- ───────────────────────── Reviews ─────────────────────────
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations on delete cascade,
  reviewer_id uuid not null references public.profiles,
  subject_id uuid not null references public.profiles,
  rating int not null check (rating between 1 and 5),
  tags text[] default '{}',
  body text,
  would_rebook boolean,
  created_at timestamptz not null default now(),
  unique (conversation_id, reviewer_id)
);

-- ───────────────────────── Read views and search functions ─────────────────────────
create or replace view public.performers_view as
select p.*, st_y(p.location::geometry) as lat, st_x(p.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where r.subject_id = p.owner) as rating,
  (select count(*) from reviews r where r.subject_id = p.owner) as review_count
from performers p where p.published;

create or replace view public.venues_view as
select v.*, st_y(v.location::geometry) as lat, st_x(v.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where r.subject_id = v.owner) as rating
from venues v where v.published;

create or replace function public.performers_nearby(p_lat float, p_lng float, p_radius_km float)
returns setof jsonb language sql stable as $$
  select to_jsonb(pv) || jsonb_build_object(
    'distance_km', st_distance(pv.location, st_makepoint(p_lng, p_lat)::geography) / 1000,
    'performer_videos', (select coalesce(jsonb_agg(v order by v.position), '[]'::jsonb) from performer_videos v where v.performer_id = pv.id))
  from performers_view pv
  where st_dwithin(pv.location, st_makepoint(p_lng, p_lat)::geography, p_radius_km * 1000)
  order by st_distance(pv.location, st_makepoint(p_lng, p_lat)::geography);
$$;

create or replace function public.venues_nearby(p_lat float, p_lng float, p_radius_km float)
returns setof jsonb language sql stable as $$
  select to_jsonb(vv) || jsonb_build_object(
    'distance_km', st_distance(vv.location, st_makepoint(p_lng, p_lat)::geography) / 1000)
  from venues_view vv
  where st_dwithin(vv.location, st_makepoint(p_lng, p_lat)::geography, p_radius_km * 1000)
  order by st_distance(vv.location, st_makepoint(p_lng, p_lat)::geography);
$$;

-- ───────────────────────── Row-level security ─────────────────────────
alter table profiles enable row level security;
alter table performers enable row level security;
alter table performer_videos enable row level security;
alter table performer_photos enable row level security;
alter table venues enable row level security;
alter table venue_photos enable row level security;
alter table shows enable row level security;
alter table event_requests enable row level security;
alter table conversations enable row level security;
alter table conversation_members enable row level security;
alter table messages enable row level security;
alter table reviews enable row level security;
alter table contact_log enable row level security;
alter table app_settings enable row level security;
alter table private_contacts enable row level security;

create policy "own phone" on private_contacts for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "own profile" on profiles for all using (id = auth.uid()) with check (id = auth.uid());

create policy "public performers" on performers for select using (published or owner = auth.uid());
create policy "own performer" on performers for all using (owner = auth.uid()) with check (owner = auth.uid());
create policy "public videos" on performer_videos for select using (true);
create policy "own videos" on performer_videos for all
  using (exists (select 1 from performers p where p.id = performer_id and p.owner = auth.uid()));
create policy "public perf photos" on performer_photos for select using (true);
create policy "own perf photos" on performer_photos for all
  using (exists (select 1 from performers p where p.id = performer_id and p.owner = auth.uid()));

create policy "public venues" on venues for select using (published or owner = auth.uid());
create policy "own venue" on venues for all using (owner = auth.uid()) with check (owner = auth.uid());
create policy "public venue photos" on venue_photos for select using (true);
create policy "own venue photos" on venue_photos for all
  using (exists (select 1 from venues v where v.id = venue_id and v.owner = auth.uid()));

create policy "public shows" on shows for select using (status = 'live'
  or exists (select 1 from venues v where v.id = venue_id and v.owner = auth.uid()));
create policy "venue manages shows" on shows for all
  using (exists (select 1 from venues v where v.id = venue_id and v.owner = auth.uid()));

-- Event requests are private: only the planner and signed-in performers can read them.
create policy "planner owns request" on event_requests for all using (planner_id = auth.uid()) with check (planner_id = auth.uid());
create policy "performers see requests" on event_requests for select
  using (exists (select 1 from profiles pr where pr.id = auth.uid() and pr.role = 'performer'));

create policy "members see conversation" on conversations for select
  using (exists (select 1 from conversation_members m where m.conversation_id = conversations.id and m.profile_id = auth.uid()));
create policy "members see membership" on conversation_members for select using (profile_id = auth.uid());
create policy "members read messages" on messages for select
  using (exists (select 1 from conversation_members m where m.conversation_id = messages.conversation_id and m.profile_id = auth.uid()));
create policy "members send messages" on messages for insert
  with check (sender_id = auth.uid() and exists (select 1 from conversation_members m
    where m.conversation_id = messages.conversation_id and m.profile_id = auth.uid()));

create policy "public reviews" on reviews for select using (true);
create policy "write own review" on reviews for insert with check (reviewer_id = auth.uid());
create policy "read settings" on app_settings for select using (true);

-- ───────────────────────── Photo storage ─────────────────────────
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict do nothing;
create policy "anyone can view media" on storage.objects for select using (bucket_id = 'media');
create policy "signed-in users upload to own folder" on storage.objects for insert
  with check (bucket_id = 'media' and auth.uid()::text = (storage.foldername(name))[1]);
