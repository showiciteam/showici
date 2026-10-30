-- ShowIci: unclaimed venues in Nord-du-Québec. Public sources (venue sites, Carrefour des arts, La Sentinelle, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Auditorium La Porte-du-Nord','Event hall','265 Rue Lanctôt',null,'Chibougamau','G8P 1E3',st_setsrid(st_makepoint(-74.3724,49.9207),4326)::geography,'Chibougamau''s auditorium, where the city presents touring concerts, comedy and theatre.

Auditorium de Chibougamau où la Ville présente concerts, humour et théâtre en tournée.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','country']::text[],'https://www.ville.chibougamau.qc.ca',null,'showici','showici:auditorium-la-porte-du-nord-chibougamau',true,null),
('Pub La Chaumière','Pub','571 3e Rue',null,'Chibougamau','G8P 1N8',st_setsrid(st_makepoint(-74.3656,49.9138),4326)::geography,'Chibougamau pub and bistro on 3e Rue.

Pub-bistro de Chibougamau sur la 3e Rue.',array['Solo / duo','Bands']::text[],array['rock','Québec francophone']::text[],null,'418 748-4818','showici','showici:pub-la-chaumiere-chibougamau',true,null),
('Pub Royal Bar','Pub','502 3e Rue',null,'Chibougamau','G8P 1N9',st_setsrid(st_makepoint(-74.3631,49.9135),4326)::geography,'Downtown Chibougamau resto-pub.

Resto-pub du centre-ville de Chibougamau.',array['Solo / duo','Bands']::text[],array['rock','Québec francophone']::text[],null,'418 930-9938','showici','showici:pub-royal-bar-chibougamau',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
