-- ShowIci: unclaimed venues in Lanaudière (Rawdon, Berthierville, Saint-Jean-de-Matha). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('La Queen','Restaurant','3638 Rue Queen',null,'Rawdon','J0K 1S0',st_setsrid(st_makepoint(-73.70671,46.04237),4326)::geography,'Rawdon restaurant-bar on Rue Queen. Live shows not confirmed.

Resto-bar de Rawdon sur la rue Queen. Spectacles à confirmer.',array['Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://www.la-queen.ca','450 834-8282','showici','showici:la-queen-rawdon',true,null),
('MuzikArt Café','Bar','480 Rue de Frontenac',null,'Berthierville','J0K 1A0',st_setsrid(st_makepoint(-73.17169,46.08419),4326)::geography,'Berthierville café mixing art, music and local food. Live shows not confirmed.

Café de Berthierville qui mêle art, musique et saveurs locales. Spectacles à confirmer.',array['Solo / duo']::text[],array['folk','Québec francophone','jazz']::text[],'https://www.muzikartcafe.com','579 208-0151','showici','showici:muzikart-cafe-berthierville',true,null),
('CRAPO – Centre régional d''animation du patrimoine oral','Event hall','180 Rue Sainte-Louise',null,'Saint-Jean-de-Matha','J0K 2S0',st_setsrid(st_makepoint(-73.53387,46.23039),4326)::geography,'65-seat hall with a bar in Saint-Jean-de-Matha for traditional music, song, storytelling, folk, jazz and world music.

Salle de 65 places avec bar à Saint-Jean-de-Matha : musique trad, chanson, conte, folk, jazz et musiques du monde.',array['Solo / duo','Bands']::text[],array['trad','folk','jazz']::text[],null,null,'showici','showici:crapo-centre-regional-d-animation-du-patrimoine-oral-saint-jean-de-matha',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
