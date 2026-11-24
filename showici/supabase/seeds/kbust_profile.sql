-- K-Bust: performer page created by ShowIci from the Spotlight interview (approved by the artist on 2026-11-24).
-- Unclaimed (no owner): the artist can claim it from her profile page. Run after migration 011. Safe to run more than once.
insert into public.performers (id, owner, source, name, act_type, genres, repertoire, base_city, location, members, bio,
  website, instagram, facebook, music_url, cover_path, published, available)
values ('6b2f3c1e-4a8d-4e7b-9c15-0d2e8f7a51b4', null, 'showici', 'K-Bust', 'Solo musician',
  array['Pop', 'Electronic', '80s / 90s', 'Rock'], 'Originals', 'Montréal',
  st_makepoint(-73.5673, 45.5017)::geography, 1,
  'K-Bust is the solo project of Karla Bustamante Garrido, a Chilean-born singer-songwriter, multi-instrumentalist and producer based in Montréal. Her sound blends ''80s-inspired synth-pop, catchy melodies and rock energy, with lyrics about vulnerability and self-assertion. Her third album, REBIRTH (ten original songs), came out on November 6, 2026 and was launched at Le Petit Campus. Start with Heartbeat.',
  'https://kbust.com', 'https://instagram.com/kbust', 'https://facebook.com/kbustmusic', 'https://youtube.com/@kbust',
  '/spotlight/kbust-whisky-a-go-go.webp', true, true)
on conflict (id) do nothing;

insert into public.performer_videos (performer_id, youtube_url, title, featured, position)
select '6b2f3c1e-4a8d-4e7b-9c15-0d2e8f7a51b4', v.url, v.title, v.featured, v.pos
from (values
  ('https://www.youtube.com/watch?v=YCU8VjSnCTI', 'Live at Le Petit Campus, Montréal', true, 0),
  ('https://www.youtube.com/watch?v=K4yJki0OSxk', 'Live at the ShowPlace Theater, Buffalo, NY', false, 1)
) as v(url, title, featured, pos)
where not exists (select 1 from public.performer_videos where performer_id = '6b2f3c1e-4a8d-4e7b-9c15-0d2e8f7a51b4');

insert into public.performer_photos (performer_id, storage_path, is_cover, position)
select '6b2f3c1e-4a8d-4e7b-9c15-0d2e8f7a51b4', v.path, v.cover, v.pos
from (values
  ('/spotlight/kbust-whisky-a-go-go.webp', true, 0),
  ('/spotlight/kbust-skullys-columbus.webp', false, 1)
) as v(path, cover, pos)
where not exists (select 1 from public.performer_photos where performer_id = '6b2f3c1e-4a8d-4e7b-9c15-0d2e8f7a51b4');
