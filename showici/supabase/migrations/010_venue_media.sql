-- 010: venues get a logo and a list of YouTube videos (like performers), shown with previews on the venue page.

alter table public.venues add column if not exists logo_path text;

create table if not exists public.venue_videos (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues on delete cascade,
  youtube_url text not null check (char_length(youtube_url) <= 300),
  title text check (char_length(title) <= 120),
  featured boolean not null default false,
  position int not null default 0
);
create index if not exists venue_videos_venue_idx on public.venue_videos (venue_id, position);

alter table public.venue_videos enable row level security;
drop policy if exists "public venue videos" on public.venue_videos;
create policy "public venue videos" on public.venue_videos for select using (true);
drop policy if exists "own venue videos" on public.venue_videos;
create policy "own venue videos" on public.venue_videos for all
  using (exists (select 1 from public.venues v where v.id = venue_id and v.owner = auth.uid()))
  with check (exists (select 1 from public.venues v where v.id = venue_id and v.owner = auth.uid()));
grant select on public.venue_videos to anon, authenticated;
grant insert, update, delete on public.venue_videos to authenticated;

-- Venues that already had one YouTube link start their video list with it.
insert into public.venue_videos (venue_id, youtube_url, title, featured, position)
select v.id, v.youtube_url, null, true, 0
from public.venues v
where v.youtube_url ~ '^https?://' and not exists (select 1 from public.venue_videos x where x.venue_id = v.id);

-- The public view lists venue columns via v.*, which is fixed when the view is created: recreate it to pick up logo_path.
drop view if exists public.venues_view;
create view public.venues_view as
select v.*, st_y(v.location::geometry) as lat, st_x(v.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where v.owner is not null and r.subject_id = v.owner) as rating
from venues v where v.published;
grant select on public.venues_view to anon, authenticated;

-- Make the API see the new table and column right away.
notify pgrst, 'reload schema';
