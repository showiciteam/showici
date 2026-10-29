-- ShowIci: unclaimed venues in Lanaudière (Joliette and nearby). Public sources (venue sites, Pouding chômeur, Tourisme Lanaudière, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Centre culturel Desjardins','Event hall','20 Rue Saint-Charles-Borromée Sud',null,'Joliette','J6E 4T1',st_setsrid(st_makepoint(-73.43783,46.0263),4326)::geography,'Joliette''s main performance centre, presenting concerts, comedy and theatre.

Principal centre de diffusion de Joliette, qui présente concerts, humour et théâtre.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://spectaclesjoliette.com',null,'showici','showici:centre-culturel-desjardins-joliette',true,null),
('Microbrasserie Albion','Brewery','408 Boulevard Manseau',null,'Joliette','J6E 3E1',st_setsrid(st_makepoint(-73.43951,46.02539),4326)::geography,'Downtown Joliette brewpub with live music.

Broue-pub du centre-ville de Joliette avec musique live.',array['Solo / duo','Bands']::text[],array['folk','rock','Québec francophone']::text[],'https://brasseriealbion.com',null,'showici','showici:microbrasserie-albion-joliette',true,null),
('Hôtel Château Joliette','Bar','450 Rue Saint-Thomas',null,'Joliette','J6E 3R1',st_setsrid(st_makepoint(-73.43333,46.02341),4326)::geography,'Joliette hotel whose bar hosts chansonnier nights.

Hôtel de Joliette dont le bar accueille des soirées de chansonniers.',array['Solo / duo']::text[],array['pop','Québec francophone']::text[],'https://chateaujoliette.com',null,'showici','showici:hotel-chateau-joliette-joliette',true,null),
('Café culturel de la Chasse-galerie','Event hall','1255 Rue Notre-Dame',null,'Lavaltrie','J5T 1R7',st_setsrid(st_makepoint(-73.28058,45.88112),4326)::geography,'Lavaltrie cultural café presenting concerts and shows, also at the Garage à Simon.

Café culturel de Lavaltrie qui présente concerts et spectacles, aussi au Garage à Simon.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['folk','Québec francophone','jazz']::text[],'https://chasse-galerie.ca',null,'showici','showici:cafe-culturel-de-la-chasse-galerie-lavaltrie',true,null),
('Théâtre Hector-Charland','Event hall','225 Boulevard de l''Ange-Gardien',null,'L''Assomption',null,st_setsrid(st_makepoint(-73.42217,45.82917),4326)::geography,'L''Assomption''s performance hall, presenting concerts, comedy and theatre.

Salle de spectacle de L''Assomption qui présente concerts, humour et théâtre.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://hector-charland.com',null,'showici','showici:theatre-hector-charland-l-assomption',true,null),
('Le Pub 205','Pub','205 Rue Saint-Jacques',null,'Saint-Jacques','J0K 2R0',st_setsrid(st_makepoint(-73.57649,45.95199),4326)::geography,'Saint-Jacques pub hosting traditional music, comedy and song nights.

Pub de Saint-Jacques qui accueille musique traditionnelle, humour et chansons.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','Québec francophone']::text[],null,null,'showici','showici:le-pub-205-saint-jacques',true,null),
('Microbrasserie du Taureau','Brewery','862 Rue Brassard',null,'Saint-Michel-des-Saints','J0K 3B0',st_setsrid(st_makepoint(-73.91631,46.67402),4326)::geography,'Haute-Matawinie brewpub in Saint-Michel-des-Saints that hosts concerts.

Broue-pub de Saint-Michel-des-Saints, en Haute-Matawinie, qui accueille des concerts.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://microdutaureau.ca',null,'showici','showici:microbrasserie-du-taureau-saint-michel-des-saints',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
