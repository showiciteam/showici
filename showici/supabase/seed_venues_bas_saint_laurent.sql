-- ShowIci: unclaimed venues in the Bas-Saint-Laurent. Public sources (venue sites, Tourisme Bas-Saint-Laurent, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Bar Le Campus','Bar','149 Rue de l''Évêché Ouest',null,'Rimouski','G5L 4H4',st_setsrid(st_makepoint(-68.52914,48.4452),4326)::geography,'Downtown Rimouski student bar with shows and DJ nights.

Bar étudiant du centre-ville de Rimouski avec spectacles et soirées DJ.',array['Bands','Solo / duo','DJs']::text[],array['rock','pop','indie']::text[],null,null,'showici','showici:bar-le-campus-rimouski',true,null),
('Coop des Bains Publics','Bar','53 Rue Saint-Germain Est',null,'Rimouski','G5L 1A3',st_setsrid(st_makepoint(-68.52502,48.45223),4326)::geography,'Co-op bar and show venue in downtown Rimouski with an eclectic concert programme.

Bar coopératif et salle de spectacle du centre-ville de Rimouski à la programmation éclectique.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['indie','rock','folk']::text[],null,null,'showici','showici:coop-des-bains-publics-rimouski',true,null),
('Taverne 666','Bar','45 Rue Saint-Germain Est',null,'Rimouski','G5L 1A3',st_setsrid(st_makepoint(-68.52559,48.45181),4326)::geography,'Rimouski rock tavern on Saint-Germain Street that hosts rock and metal shows.

Taverne rock de la rue Saint-Germain à Rimouski qui présente des spectacles rock et métal.',array['Bands']::text[],array['rock','metal','punk']::text[],null,null,'showici','showici:taverne-666-rimouski',true,null),
('La P''tite Grenouille Rimouski','Bar','100 Rue Saint-Germain Ouest',null,'Rimouski','G5L 4B6',st_setsrid(st_makepoint(-68.53278,48.44951),4326)::geography,'Rimouski boîte à chansons with singer-songwriters and party nights.

Boîte à chansons de Rimouski avec chansonniers et soirées festives.',array['Solo / duo']::text[],array['pop','Québec francophone','folk']::text[],'https://laptitegrenouille.ca',null,'showici','showici:la-p-tite-grenouille-rimouski-rimouski',true,null),
('Microbrasserie Le Bien, le Malt','Brewery','141 Avenue Belzile',null,'Rimouski','G5L 3E5',st_setsrid(st_makepoint(-68.52343,48.45335),4326)::geography,'Rimouski brewpub known for its beers and its small live shows.

Broue-pub de Rimouski reconnu pour ses bières et ses petits spectacles.',array['Solo / duo','Bands']::text[],array['folk','jazz','indie']::text[],'https://lebienlemalt.com',null,'showici','showici:microbrasserie-le-bien-le-malt-rimouski',true,null),
('Spect''Art Rimouski – Salle Desjardins-Telus','Event hall','25 Rue Saint-Germain Ouest',null,'Rimouski','G5L 4B4',st_setsrid(st_makepoint(-68.52828,48.45034),4326)::geography,'Rimouski''s main performing-arts presenter and concert hall.

Principal diffuseur en arts de la scène et salle de concert de Rimouski.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://spectart.com',null,'showici','showici:spect-art-rimouski-salle-desjardins-telus-rimouski',true,null),
('Théâtre du Bic','Event hall','50 Route du Golf-du-Bic','Le Bic','Rimouski','G0L 1B0',st_setsrid(st_makepoint(-68.70617,48.3741),4326)::geography,'Performing-arts centre in Le Bic that creates and presents theatre and shows.

Centre des arts de la scène au Bic qui crée et présente théâtre et spectacles.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','Québec francophone']::text[],'https://theatredubic.com','418 736-4141','showici','showici:theatre-du-bic-rimouski',true,null),
('Sunset Bar Spectacle','Bar','400 Rue Lafontaine',null,'Rivière-du-Loup','G5R 3B4',st_setsrid(st_makepoint(-69.53512,47.83062),4326)::geography,'Rivière-du-Loup show bar on Lafontaine Street.

Bar-spectacle de la rue Lafontaine à Rivière-du-Loup.',array['Bands','Solo / duo']::text[],array['rock','pop','country']::text[],null,null,'showici','showici:sunset-bar-spectacle-riviere-du-loup',true,null),
('La P''tite Grenouille Rivière-du-Loup','Bar','403 Rue Lafontaine',null,'Rivière-du-Loup','G5R 3B6',st_setsrid(st_makepoint(-69.53471,47.8306),4326)::geography,'Rivière-du-Loup bar and boîte à chansons with live singers most nights.

Bar et boîte à chansons de Rivière-du-Loup avec chansonniers la plupart des soirs.',array['Solo / duo']::text[],array['pop','Québec francophone','folk']::text[],'https://laptitegrenouille.ca',null,'showici','showici:la-p-tite-grenouille-riviere-du-loup-riviere-du-loup',true,null),
('Centre culturel Berger','Event hall','85 Rue Sainte-Anne',null,'Rivière-du-Loup','G5R 5C2',st_setsrid(st_makepoint(-69.54018,47.82721),4326)::geography,'Rivière-du-Loup''s main hall, programmed by RDL en spectacles.

Principale salle de Rivière-du-Loup, programmée par RDL en spectacles.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://rdlenspectacles.com','418 867-6666','showici','showici:centre-culturel-berger-riviere-du-loup',true,null),
('Microbrasserie Tête d''Allumette','Brewery','265 Route 132 Ouest',null,'Saint-André-de-Kamouraska','G0L 2H0',st_setsrid(st_makepoint(-69.75734,47.64284),4326)::geography,'Riverside microbrewery in Kamouraska with a terrace and summer shows.

Microbrasserie au bord du fleuve au Kamouraska avec terrasse et spectacles l''été.',array['Solo / duo','Bands']::text[],array['folk','rock','Québec francophone']::text[],'https://tetedallumette.com',null,'showici','showici:microbrasserie-tete-d-allumette-saint-andre-de-kamouraska',true,null),
('Microbrasserie Le Caveau','Brewery','21 Rue Pelletier',null,'Trois-Pistoles','G0L 4K0',st_setsrid(st_makepoint(-69.17533,48.12447),4326)::geography,'Trois-Pistoles brewpub that hosts concerts.

Broue-pub de Trois-Pistoles qui accueille des concerts.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone','rock']::text[],'https://caveau3pistoles.com',null,'showici','showici:microbrasserie-le-caveau-trois-pistoles',true,null),
('Le Barachois','Bar','200 Rue du Barachois',null,'Matane','G4W 3N1',st_setsrid(st_makepoint(-67.53069,48.85314),4326)::geography,'Matane bar by the river mouth.

Bar de Matane près de l''embouchure de la rivière.',array['Solo / duo','Bands']::text[],array['pop','rock']::text[],null,null,'showici','showici:le-barachois-matane',true,null),
('Arts et Spectacles Matanie','Event hall','305 Rue de la Gare',null,'Matane','G4W 3J2',st_setsrid(st_makepoint(-67.53648,48.84493),4326)::geography,'Official performing-arts presenter for La Matanie, programming concerts and comedy in Matane.

Diffuseur officiel en arts de la scène de La Matanie, qui programme concerts et humour à Matane.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://asm-matanie.ca','418 562-6611','showici','showici:arts-et-spectacles-matanie-matane',true,null),
('Microbrasserie La Captive','Brewery','140 Boulevard Saint-Benoît Ouest',null,'Amqui','G5J 2E8',st_setsrid(st_makepoint(-67.43374,48.46564),4326)::geography,'Amqui brewpub in the Matapédia valley with shows.

Broue-pub d''Amqui, dans la vallée de la Matapédia, avec spectacles.',array['Solo / duo','Bands']::text[],array['folk','rock','Québec francophone']::text[],'https://lacaptive.ca',null,'showici','showici:microbrasserie-la-captive-amqui',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
