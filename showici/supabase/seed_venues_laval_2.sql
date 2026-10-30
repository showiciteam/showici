-- ShowIci: unclaimed venues in Laval (second batch). Public sources (venue sites, Tourisme Laval, Pouding chômeur, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Salle André-Mathieu','Event hall','475 Boulevard de l''Avenir','Laval-des-Rapides','Laval','H7N 5H9',st_setsrid(st_makepoint(-73.7194,45.56),4326)::geography,'Laval''s main concert hall, hosting touring singers, bands and comedians.

Principale salle de spectacle de Laval, qui accueille chanteurs, groupes et humoristes en tournée.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://www.salleandremathieu.com','450 667-2327','showici','showici:salle-andre-mathieu-laval',true,null),
('Maison des arts de Laval','Event hall','1395 Boulevard de la Concorde Ouest','Laval-des-Rapides','Laval','H7N 5W1',st_setsrid(st_makepoint(-73.7164,45.5584),4326)::geography,'City-run arts centre with an intimate theatre for concerts and shows.

Centre des arts municipal avec une salle intime pour concerts et spectacles.',array['Solo / duo','Bands']::text[],array['jazz','classical','folk']::text[],'https://www.laval.ca','450 662-4440','showici','showici:maison-des-arts-de-laval-laval',true,null),
('Resto Bar Brasse Rires','Bar','1790 Boulevard des Laurentides','Vimont','Laval','H7M 2P6',st_setsrid(st_makepoint(-73.7251,45.5997),4326)::geography,'Laval show bar with comedy and live entertainment most nights.

Bar-spectacle lavallois avec humour et divertissement en direct presque tous les soirs.',array['Stand-up comedy','Solo / duo','Bands']::text[],array['pop','Québec francophone']::text[],'https://www.brasse-rires.com','450 490-3405','showici','showici:resto-bar-brasse-rires-laval',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
