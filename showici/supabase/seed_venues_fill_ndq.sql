-- ShowIci: unclaimed venues in Nord-du-Québec (Lebel-sur-Quévillon, Matagami). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Taverne 105','Bar','105 Rue Principale Sud',null,'Lebel-sur-Quévillon',null,st_setsrid(st_makepoint(-76.97926,49.05174),4326)::geography,'Tavern on Rue Principale in Lebel-sur-Quévillon. Live shows not confirmed.

Taverne de la rue Principale à Lebel-sur-Quévillon. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','country']::text[],null,'819 755-2550','showici','showici:taverne-105-lebel-sur-quevillon',true,null),
('Resto Pub Le Boréal','Pub','94 Boulevard Matagami',null,'Matagami',null,st_setsrid(st_makepoint(-77.63542,49.75726),4326)::geography,'Resto-pub on Boulevard Matagami. Live shows not confirmed.

Resto-pub du boulevard Matagami. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','country']::text[],null,'819 739-4466','showici','showici:resto-pub-le-boreal-matagami',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
