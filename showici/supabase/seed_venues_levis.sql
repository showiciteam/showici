-- ShowIci: unclaimed venues in Lévis. Public sources (venue sites, Pouding chômeur, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Bar le Cluster','Bar','9320 Boulevard Guillaume-Couture',null,'Lévis','G6V 9R2',st_setsrid(st_makepoint(-71.11425,46.82274),4326)::geography,'Lévis show bar with live bands.

Bar-spectacle de Lévis avec groupes live.',array['Bands','Solo / duo']::text[],array['rock','pop','country']::text[],'https://leclusterbarspectacle.com',null,'showici','showici:bar-le-cluster-levis',true,null),
('Le Corsaire Microbrasserie','Brewery','5955 Rue Saint-Laurent','Vieux-Lévis','Lévis','G6V 3P5',st_setsrid(st_makepoint(-71.18709,46.80952),4326)::geography,'Old Lévis brewpub with music nights.

Broue-pub du Vieux-Lévis avec soirées musicales.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://corsairemicro.ca',null,'showici','showici:le-corsaire-microbrasserie-levis',true,null),
('L''Autre-Gare','Bar','5995 Rue Saint-Laurent','Vieux-Lévis','Lévis','G6V 3P5',st_setsrid(st_makepoint(-71.18766,46.81077),4326)::geography,'Old Lévis bar by the ferry listed among the area''s music venues.

Bar du Vieux-Lévis près du traversier répertorié parmi les lieux de musique.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],null,null,'showici','showici:l-autre-gare-levis',true,null),
('Taverne La Barricade','Bar','59 Côte du Passage',null,'Lévis','G6V 5S8',st_setsrid(st_makepoint(-71.1833,46.80634),4326)::geography,'Lévis tavern with live music.

Taverne de Lévis avec musique live.',array['Bands','Solo / duo']::text[],array['rock','punk']::text[],null,null,'showici','showici:taverne-la-barricade-levis',true,null),
('Vieux Bureau de Poste','Event hall','2172 Chemin du Fleuve','Saint-Romuald','Lévis',null,st_setsrid(st_makepoint(-71.24006,46.75792),4326)::geography,'Saint-Romuald show venue in the former post office.

Salle de spectacle de Saint-Romuald dans l''ancien bureau de poste.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','Québec francophone','jazz']::text[],'https://vieuxbureaudeposte.com',null,'showici','showici:vieux-bureau-de-poste-levis',true,null),
('L''Anglicane','Event hall','33 Rue Wolfe','Vieux-Lévis','Lévis',null,st_setsrid(st_makepoint(-71.18451,46.80813),4326)::geography,'253-seat Old Lévis concert hall in a former Anglican church, known for its acoustics.

Salle de 253 places du Vieux-Lévis dans une ancienne église anglicane, reconnue pour son acoustique.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['folk','Québec francophone','pop']::text[],'https://anglicane.spectaclesendirect.com',null,'showici','showici:l-anglicane-levis',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
