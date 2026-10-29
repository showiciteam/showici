-- ShowIci: unclaimed venues in Montréal (third batch). Public sources (venue sites, venue sites, Pouding chômeur, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Le National','Event hall','1220 Rue Sainte-Catherine Est','Ville-Marie','Montréal',null,st_setsrid(st_makepoint(-73.55585,45.51859),4326)::geography,'Historic Centre-Sud theatre turned concert hall.

Théâtre historique du Centre-Sud devenu salle de concert.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','indie','hip-hop']::text[],'https://lenational.ca',null,'showici','showici:le-national-montreal',true,null),
('La Tulipe','Event hall','4530 Avenue Papineau','Plateau-Mont-Royal','Montréal',null,st_setsrid(st_makepoint(-73.57539,45.53306),4326)::geography,'Plateau concert hall in a former theatre.

Salle de concert du Plateau dans un ancien théâtre.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','indie','electronic']::text[],'https://latulipe.ca',null,'showici','showici:la-tulipe-montreal',true,null),
('Club Soda','Event hall','1225 Boulevard Saint-Laurent','Ville-Marie','Montréal','H2X 2S6',st_setsrid(st_makepoint(-73.56333,45.50979),4326)::geography,'Quartier des spectacles concert hall and Montréal institution.

Salle de concert du Quartier des spectacles et institution montréalaise.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','pop','hip-hop']::text[],'https://clubsoda.ca',null,'showici','showici:club-soda-montreal',true,null),
('Théâtre Beanfield','Event hall','2490 Rue Notre-Dame Ouest','Le Sud-Ouest','Montréal','H3J 1N5',st_setsrid(st_makepoint(-73.57507,45.48289),4326)::geography,'Little Burgundy''s historic theatre (formerly the Corona) hosting concerts.

Théâtre historique de la Petite-Bourgogne (anciennement le Corona) qui accueille des concerts.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','indie','pop']::text[],'https://theatrebeanfield.ca',null,'showici','showici:theatre-beanfield-montreal',true,null),
('Théâtre Plaza','Event hall','6505 Rue Saint-Hubert','Rosemont–La Petite-Patrie','Montréal','H2S 2M5',st_setsrid(st_makepoint(-73.60314,45.53643),4326)::geography,'Plaza Saint-Hubert theatre turned concert venue.

Théâtre de la Plaza Saint-Hubert devenu salle de spectacle.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['indie','rock','electronic']::text[],'https://theatreplaza.ca',null,'showici','showici:theatre-plaza-montreal',true,null),
('Café Cléopâtre','Club','1230 Boulevard Saint-Laurent','Ville-Marie','Montréal',null,st_setsrid(st_makepoint(-73.56347,45.50952),4326)::geography,'Legendary cabaret on the Main hosting burlesque, rock and comedy nights upstairs.

Cabaret légendaire de la Main avec burlesque, rock et humour à l''étage.',array['Bands','Stand-up comedy']::text[],array['rock','punk','pop']::text[],null,null,'showici','showici:cafe-cleopatre-montreal',true,null),
('O Patro Vys','Event hall','356 Avenue du Mont-Royal Est','Plateau-Mont-Royal','Montréal','H2T 1P9',st_setsrid(st_makepoint(-73.58311,45.52343),4326)::geography,'Mont-Royal Avenue upstairs venue for indie and alternative shows.

Salle à l''étage de l''avenue du Mont-Royal pour spectacles indie et alternatifs.',array['Bands','Solo / duo']::text[],array['indie','rock','punk']::text[],'https://opatrovys.com',null,'showici','showici:o-patro-vys-montreal',true,null),
('Bar Le Swimming','Bar','3643 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal',null,st_setsrid(st_makepoint(-73.57325,45.51462),4326)::geography,'Saint-Laurent Boulevard pool hall and show bar.

Salle de billard et bar-spectacle du boulevard Saint-Laurent.',array['Bands','DJs']::text[],array['rock','indie','hip-hop']::text[],null,null,'showici','showici:bar-le-swimming-montreal',true,null),
('Le Petit Medley','Bar','6206 Rue Saint-Hubert','Rosemont–La Petite-Patrie','Montréal','H2S 2M2',st_setsrid(st_makepoint(-73.60023,45.5347),4326)::geography,'Petite-Patrie bar with a showcase stage for emerging bands.

Bar de la Petite-Patrie avec une scène pour la relève.',array['Bands','Solo / duo']::text[],array['rock','folk','Québec francophone']::text[],null,null,'showici','showici:le-petit-medley-montreal',true,null),
('Diving Bell Social Club','Bar','3956 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Y3',st_setsrid(st_makepoint(-73.57904,45.51657),4326)::geography,'Upstairs Plateau venue for indie shows, comedy and film nights.

Salle à l''étage du Plateau pour spectacles indie, humour et cinéma.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['indie','folk','punk']::text[],'https://divingbellsocial.com',null,'showici','showici:diving-bell-social-club-montreal',true,null),
('Le Cagibi','Bar','5490 Boulevard Saint-Laurent','Mile End','Montréal',null,st_setsrid(st_makepoint(-73.59884,45.52565),4326)::geography,'Mile End café-bar with small concerts and readings.

Café-bar du Mile End avec petits concerts et lectures.',array['Solo / duo','Bands']::text[],array['folk','indie','jazz']::text[],'https://lecagibi.ca',null,'showici','showici:le-cagibi-montreal',true,null),
('Comedy Works','Club','1238 Rue Bishop','Ville-Marie','Montréal','H3G 2E3',st_setsrid(st_makepoint(-73.57569,45.4961),4326)::geography,'Downtown comedy club with open mics and English stand-up.

Club d''humour du centre-ville avec scènes ouvertes et humour anglophone.',array['Stand-up comedy']::text[],array['pop']::text[],'https://comedyworks.com',null,'showici','showici:comedy-works-montreal',true,null),
('Brasserie Le Cheval Blanc','Brewery','809 Rue Ontario Est','Ville-Marie','Montréal',null,st_setsrid(st_makepoint(-73.56437,45.51824),4326)::geography,'Montréal''s first brewpub, in the Centre-Sud.

Premier broue-pub de Montréal, dans le Centre-Sud.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://lechevalblanc.ca',null,'showici','showici:brasserie-le-cheval-blanc-montreal',true,null),
('Le Saint-Bock','Brewery','1749 Rue Saint-Denis','Ville-Marie','Montréal','H2X 3K4',st_setsrid(st_makepoint(-73.56463,45.51578),4326)::geography,'Latin Quarter brewpub on Saint-Denis Street.

Broue-pub du Quartier latin, rue Saint-Denis.',array['Solo / duo','DJs']::text[],array['rock','pop']::text[],'https://saintbock.com',null,'showici','showici:le-saint-bock-montreal',true,null),
('Bar Waverly','Bar','5550 Boulevard Saint-Laurent','Mile End','Montréal','H2T 1S8',st_setsrid(st_makepoint(-73.59918,45.52575),4326)::geography,'Mile End bar with live music and DJs.

Bar du Mile End avec musique live et DJ.',array['Solo / duo','Bands','DJs']::text[],array['jazz','indie','folk']::text[],null,null,'showici','showici:bar-waverly-montreal',true,null),
('L''Astral','Event hall','305 Rue Sainte-Catherine Ouest','Ville-Marie','Montréal','H2X 2A3',st_setsrid(st_makepoint(-73.56678,45.50676),4326)::geography,'Jazz Festival hall in the Maison du Festival.

Salle du Festival de jazz à la Maison du Festival.',array['Bands','Solo / duo']::text[],array['jazz','pop','folk']::text[],'https://equipespectra.ca',null,'showici','showici:l-astral-montreal',true,null),
('MTELUS','Event hall','59 Rue Sainte-Catherine Est','Ville-Marie','Montréal','H2X 1K5',st_setsrid(st_makepoint(-73.5634,45.51061),4326)::geography,'Large historic concert hall in the Quartier des spectacles.

Grande salle de concert historique du Quartier des spectacles.',array['Bands']::text[],array['rock','pop','hip-hop']::text[],'https://mtelus.com',null,'showici','showici:mtelus-montreal',true,null),
('L''Olympia','Event hall','1004 Rue Sainte-Catherine Est','Ville-Marie','Montréal','H2L 2G2',st_setsrid(st_makepoint(-73.5569,45.51694),4326)::geography,'Historic Village theatre turned concert hall.

Théâtre historique du Village devenu salle de concert.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','pop','hip-hop']::text[],'https://olympiamontreal.com',null,'showici','showici:l-olympia-montreal',true,null),
('Bar Darling','Bar','4328 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal',null,st_setsrid(st_makepoint(-73.58406,45.51884),4326)::geography,'Plateau resto-bar with live music and DJs.

Resto-bar du Plateau avec musique live et DJ.',array['Solo / duo','DJs']::text[],array['jazz','indie']::text[],'https://restobardarling.com',null,'showici','showici:bar-darling-montreal',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
