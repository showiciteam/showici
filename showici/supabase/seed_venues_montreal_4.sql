-- ShowIci: more unclaimed venues in Montréal. Public sources (venue sites, Cult MTL, Tourisme Montréal, Laugh It Off MTL, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Apartment 200','Club','3643 Boulevard Saint-Laurent','Plateau','Montréal','H2X 2V5',st_setsrid(st_makepoint(-73.57325,45.51462),4326)::geography,'Saint-Laurent club with DJs, arcade games and pool tables.

Club du boulevard Saint-Laurent avec DJ, jeux d''arcade et billards.',array['DJs']::text[],array['hip-hop','electronic','pop']::text[],'https://www.apt200.com',null,'showici','showici:apartment-200-montreal',true,null),
('Place des Arts','Event hall','175 Rue Sainte-Catherine Ouest','Quartier des spectacles','Montréal','H5B 1E5',st_setsrid(st_makepoint(-73.56654,45.5084),4326)::geography,'Québec''s largest performing-arts complex: concerts, opera, dance and comedy across several halls.

Le plus grand complexe culturel du Québec : concerts, opéra, danse et humour dans plusieurs salles.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['classical','pop','jazz']::text[],'https://www.placedesarts.com','514 842-2112','showici','showici:place-des-arts-montreal',true,null),
('New City Gas','Club','950 Rue Ottawa','Griffintown','Montréal','H3C 1S4',st_setsrid(st_makepoint(-73.55752,45.49513),4326)::geography,'Griffintown event venue and club in a former gas plant, hosting EDM and DJ nights.

Club et salle d''événements de Griffintown dans une ancienne usine à gaz, avec soirées EDM et DJ.',array['DJs']::text[],array['electronic']::text[],'https://www.newcitygas.com',null,'showici','showici:new-city-gas-montreal',true,null),
('Memento','Brewery','2471 Rue Saint-Patrick','Pointe-Saint-Charles','Montréal','H3K 1B3',st_setsrid(st_makepoint(-73.57013,45.48171),4326)::geography,'Lachine Canal brewery and arcade bar with comedy nights and open mics.

Microbrasserie et bar d''arcade au bord du canal de Lachine, avec soirées d''humour et micros ouverts.',array['Stand-up comedy','DJs']::text[],array['comedy']::text[],'https://www.brasseriememento.com','514 307-1604','showici','showici:memento-montreal',true,null),
('Pub Saint-Paul','Pub','Rue Saint-Paul Est','Vieux-Montréal','Montréal','H2Y 1J1',st_setsrid(st_makepoint(-73.55264,45.50693),4326)::geography,'Old Montréal pub with live music and a weekly comedy night upstairs.

Pub du Vieux-Montréal avec musique live et soirée d''humour hebdomadaire à l''étage.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','pop']::text[],null,null,'showici','showici:pub-saint-paul-montreal',true,null),
('Bocadillo','Restaurant','3677 Boulevard Saint-Laurent','Plateau','Montréal','H2X 2T6',st_setsrid(st_makepoint(-73.57393,45.51465),4326)::geography,'Venezuelan restaurant-bar with live Latin and Spanish music.

Resto-bar vénézuélien avec musique latine et espagnole en direct.',array['Bands','Solo / duo','DJs']::text[],array['latin','world']::text[],'https://www.bocadillomtl.com','514 508-7172','showici','showici:bocadillo-montreal',true,null),
('La Marche à côté','Bar','5043 Rue Saint-Denis','Plateau','Montréal','H2J 1E5',st_setsrid(st_makepoint(-73.58873,45.5268),4326)::geography,'Saint-Denis bar with a calendar of jazz, country and world music shows.

Bar de la rue Saint-Denis avec un calendrier de spectacles jazz, country et musiques du monde.',array['Bands','Solo / duo']::text[],array['jazz','country','world']::text[],'https://www.lamarcheacote.net',null,'showici','showici:la-marche-a-cote-montreal',true,null),
('Petit Campus','Club','57 Rue Prince-Arthur Est','Plateau','Montréal','H2X 1B3',st_setsrid(st_makepoint(-73.57218,45.51454),4326)::geography,'Smaller concert room downstairs from Café Campus, for shows and dance nights.

Petite salle sous le Café Campus, pour concerts et soirées dansantes.',array['Bands','DJs']::text[],array['rock','indie','pop']::text[],'https://www.cafecampus.com',null,'showici','showici:petit-campus-montreal',true,null),
('Théâtre Rialto','Event hall','5723 Avenue du Parc','Mile End','Montréal','H2V 4H2',st_setsrid(st_makepoint(-73.60495,45.52359),4326)::geography,'Restored 1924 theatre on Avenue du Parc hosting concerts, comedy and events.

Théâtre restauré de 1924 sur l''avenue du Parc, pour concerts, humour et événements.',array['Bands','Solo / duo','Stand-up comedy','DJs']::text[],array['indie','pop','electronic']::text[],'https://www.theatrerialto.ca',null,'showici','showici:theatre-rialto-montreal',true,null),
('Brasserie Beaubien','Bar','73 Rue Beaubien Est','Petite-Patrie','Montréal','H2S 1R1',st_setsrid(st_makepoint(-73.60774,45.53121),4326)::geography,'Neighbourhood bar since 1924 with a booking calendar for local bands.

Bar de quartier depuis 1924, avec une programmation de groupes d''ici.',array['Bands','Solo / duo','DJs']::text[],array['rock','indie','Québec francophone']::text[],'https://www.brasseriebeaubien.com','514 495-8141','showici','showici:brasserie-beaubien-montreal',true,null),
('Chapelle historique du Bon-Pasteur','Event hall','100 Rue Sherbrooke Est','Plateau','Montréal','H2X 1C3',st_setsrid(st_makepoint(-73.56856,45.51329),4326)::geography,'Historic chapel turned concert hall for classical, jazz and new music.

Chapelle historique devenue salle de concert : classique, jazz et musique actuelle.',array['Solo / duo','Bands']::text[],array['classical','jazz']::text[],null,null,'showici','showici:chapelle-historique-du-bon-pasteur-montreal',true,null),
('Salle Pierre-Mercure','Event hall','300 Boulevard De Maisonneuve Est','Quartier latin','Montréal','H2X 3X6',st_setsrid(st_makepoint(-73.56226,45.51364),4326)::geography,'UQAM''s 800-seat hall at the Centre Pierre-Péladeau for concerts, dance and comedy.

Salle de 800 places de l''UQAM au Centre Pierre-Péladeau : concerts, danse et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['classical','jazz','pop']::text[],'https://pierre-mercure.uqam.ca','514 987-6919','showici','showici:salle-pierre-mercure-montreal',true,null),
('Bar Nacarat','Bar','900 Boulevard René-Lévesque Ouest','Centre-ville','Montréal','H3B 4A5',st_setsrid(st_makepoint(-73.56848,45.5002),4326)::geography,'Fairmont Le Reine Elizabeth''s bar and terrace with live Latin and big-band jazz.

Bar et terrasse du Fairmont Le Reine Elizabeth avec jazz latin et big band en direct.',array['Bands','Solo / duo']::text[],array['jazz','latin']::text[],'https://www.barnacarat.com','514 879-6802','showici','showici:bar-nacarat-montreal',true,null),
('Salle Bourgie','Event hall','1339 Rue Sherbrooke Ouest','Centre-ville','Montréal','H3G 2E8',st_setsrid(st_makepoint(-73.57969,45.49913),4326)::geography,'Concert hall in a former church at the Montréal Museum of Fine Arts, for classical and jazz.

Salle de concert dans une ancienne église du Musée des beaux-arts de Montréal : classique et jazz.',array['Solo / duo','Bands']::text[],array['classical','jazz']::text[],'https://www.mbam.qc.ca/en/bourgie-hall/',null,'showici','showici:salle-bourgie-montreal',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
