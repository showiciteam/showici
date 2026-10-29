-- ShowIci: unclaimed venues in the Beauce. Public sources (venue sites, Pouding chômeur, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Bar Le Baril','Bar','11500 1re Avenue',null,'Saint-Georges',null,st_setsrid(st_makepoint(-70.67579,46.12242),4326)::geography,'Saint-Georges bar listed among Beauce music venues.

Bar de Saint-Georges répertorié parmi les lieux de musique de la Beauce.',array['Bands','Solo / duo']::text[],array['rock','country']::text[],null,null,'showici','showici:bar-le-baril-saint-georges',true,null),
('Café du Mille-Lieux','Restaurant','12010 1re Avenue',null,'Saint-Georges','G5Y 2E1',st_setsrid(st_makepoint(-70.66959,46.11863),4326)::geography,'Saint-Georges cultural café with a regular concert programme.

Café culturel de Saint-Georges avec une programmation régulière de concerts.',array['Solo / duo','Bands']::text[],array['folk','indie','Québec francophone']::text[],'https://cafedumillelieux.org',null,'showici','showici:cafe-du-mille-lieux-saint-georges',true,null),
('Salle Méchatigan','Event hall','919 Route Saint-Martin',null,'Sainte-Marie','G6E 1E6',st_setsrid(st_makepoint(-71.02915,46.45545),4326)::geography,'Sainte-Marie performance hall programmed by Ovascène.

Salle de spectacle de Sainte-Marie programmée par Ovascène.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://ovascene.com',null,'showici','showici:salle-mechatigan-sainte-marie',true,null),
('Les Amants de la scène – Centre culturel Marie-Fitzbach','Event hall','250 18e Rue',null,'Saint-Georges',null,st_setsrid(st_makepoint(-70.67414,46.11697),4326)::geography,'Beauce''s performing-arts presenter, with shows at the Centre culturel Marie-Fitzbach.

Diffuseur en arts de la scène de la Beauce, avec spectacles au Centre culturel Marie-Fitzbach.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://ccmf.saint-georges.ca',null,'showici','showici:les-amants-de-la-scene-centre-culturel-marie-fitzbach-saint-georges',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
