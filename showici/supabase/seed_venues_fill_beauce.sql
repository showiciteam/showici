-- ShowIci: unclaimed venues in Beauce (Saint-Joseph-de-Beauce, Beauceville, Lac-Etchemin). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Théâtre de l''Hôtel de Ville','Event hall','843 Avenue du Palais',null,'Saint-Joseph-de-Beauce','G0S 2V0',st_setsrid(st_makepoint(-70.87963,46.30764),4326)::geography,'Saint-Joseph-de-Beauce theatre in the old town hall, with comedy and seasonal shows.

Théâtre de Saint-Joseph-de-Beauce dans l''ancien hôtel de ville, avec comédies et spectacles.',array['Stand-up comedy','Solo / duo','Bands']::text[],array['Québec francophone','pop']::text[],'https://www.theatrehv.com','418 313-0226','showici','showici:theatre-de-l-hotel-de-ville-saint-joseph-de-beauce',true,null),
('L''Entracte','Pub','664 Boulevard Renault',null,'Beauceville',null,st_setsrid(st_makepoint(-70.77257,46.20338),4326)::geography,'Pub on Boulevard Renault in Beauceville. Live shows not confirmed.

Pub du boulevard Renault à Beauceville. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','country','Québec francophone']::text[],null,null,'showici','showici:l-entracte-beauceville',true,null),
('O Manoir – Resto & Spectacles','Restaurant','1415 Route 277',null,'Lac-Etchemin','G0R 1S0',st_setsrid(st_makepoint(-70.49587,46.39587),4326)::geography,'Restaurant and show room at the Manoir Lac-Etchemin.

Resto et spectacles au Manoir Lac-Etchemin.',array['Solo / duo','Bands']::text[],array['Québec francophone','pop','country']::text[],'https://www.manoirlacetchemin.com','418 625-2101','showici','showici:o-manoir-resto-spectacles-lac-etchemin',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
