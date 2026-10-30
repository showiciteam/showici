-- ShowIci: unclaimed venues in Mont-Laurier. Public sources (venue sites, Pouding chômeur, Tourisme Laurentides, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Espace Théâtre Muni-Spec','Event hall','543 Rue du Pont',null,'Mont-Laurier',null,st_setsrid(st_makepoint(-75.5014,46.5527),4326)::geography,'Mont-Laurier''s performance hall for concerts, comedy and theatre.

Salle de spectacle de Mont-Laurier pour concerts, humour et théâtre.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','folk']::text[],null,'819 623-1222','showici','showici:espace-theatre-muni-spec-mont-laurier',true,null),
('Brasserie Le Bistro Resto-Pub','Pub','489 Boulevard Albiny-Paquette',null,'Mont-Laurier','J9L 1K8',st_setsrid(st_makepoint(-75.4976,46.5501),4326)::geography,'Mont-Laurier resto-pub with chansonniers, live music and special events.

Resto-pub de Mont-Laurier avec chansonniers, musique live et soirées spéciales.',array['Solo / duo','Bands']::text[],array['rock','Québec francophone']::text[],'https://brasserielebistro.com','819 623-6012','showici','showici:brasserie-le-bistro-resto-pub-mont-laurier',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
