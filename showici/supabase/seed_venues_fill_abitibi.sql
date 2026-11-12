-- ShowIci: unclaimed venues in Abitibi-Témiscamingue (Témiscaming, Malartic, Senneterre). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Salle Dottori','Event hall','20 Rue Humphrey',null,'Témiscaming','J0Z 3R0',st_setsrid(st_makepoint(-79.09334,46.72177),4326)::geography,'Témiscaming''s show hall, with a ticketed season of concerts and comedy.

Salle de spectacle de Témiscaming avec une saison de concerts et d''humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','country']::text[],'https://www.temiscaming.net','819 627-3230','showici','showici:salle-dottori-temiscaming',true,null),
('Théâtre Meglab','Event hall','550 4e Avenue',null,'Malartic','J0Y 1Z0',st_setsrid(st_makepoint(-78.12244,48.14151),4326)::geography,'300-seat theatre in Malartic with a cabaret setup for music, comedy, magic and dance.

Théâtre de 300 places à Malartic, formule cabaret possible : musique, humour, magie et danse.',array['Bands','Solo / duo','Stand-up comedy','Magicians']::text[],array['pop','Québec francophone','rock']::text[],'https://malartic.quebec','819 757-3611','showici','showici:theatre-meglab-malartic',true,null),
('Salle Aqua-Spec','Event hall','73 Boulevard des Érables',null,'Senneterre','J0Y 2M0',st_setsrid(st_makepoint(-77.2333,48.3833),4326)::geography,'Senneterre''s auditorium. Live shows not confirmed.

Auditorium de Senneterre. Spectacles à confirmer.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'https://www.ville.senneterre.qc.ca','819 737-8854','showici','showici:salle-aqua-spec-senneterre',true,null),
('Aux Deux Frérots','Bar','682 10e Avenue',null,'Senneterre','J0Y 2M0',st_setsrid(st_makepoint(-77.24354,48.39008),4326)::geography,'Senneterre bar on 10e Avenue. Live shows not confirmed.

Bar de Senneterre sur la 10e Avenue. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','country','Québec francophone']::text[],null,'819 737-2940','showici','showici:aux-deux-frerots-senneterre',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
