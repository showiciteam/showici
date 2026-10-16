-- 007: performer header image and logo, and repertoire answers that depend on the act type
-- (a magician answers "Audience", a comedian "Content", a band "Covers / Originals / Both").

alter table public.performers add column if not exists cover_path text;
alter table public.performers add column if not exists logo_path text;

-- Repertoire is no longer only Covers / Originals / Both.
alter table public.performers drop constraint if exists performers_repertoire_check;
alter table public.performers add constraint performers_repertoire_check check (char_length(repertoire) <= 60);

-- The public view lists its columns explicitly, so the new ones are added at the end.
create or replace view public.performers_view as
select p.id, p.owner, p.name, p.act_type, p.genres, p.repertoire, p.base_city, p.location, p.travel_km, p.event_types,
  p.languages, p.members, p.set_length, p.fee_range, p.own_sound, p.bio, p.available_days, p.available, p.verified,
  p.published, p.created_at, p.instagram, p.facebook, p.tiktok, p.music_url, p.website, p.contact_name, p.blocked_dates,
  st_y(p.location::geometry) as lat, st_x(p.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where r.subject_id = p.owner) as rating,
  (select count(*) from reviews r where r.subject_id = p.owner) as review_count,
  p.cover_path, p.logo_path
from performers p where p.published;
