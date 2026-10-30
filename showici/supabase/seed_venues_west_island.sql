-- ShowIci: unclaimed venues in the West Island of Montréal. Public sources (venue sites, local guides, Yellow Pages, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Salle Pauline-Julien','Event hall','15615 Boulevard Gouin Ouest','Sainte-Geneviève','Montréal',null,st_setsrid(st_makepoint(-73.8691,45.4836),4326)::geography,'West Island concert hall at Cégep Gérald-Godin for music and comedy.

Salle de spectacle de l''Ouest-de-l''Île au Cégep Gérald-Godin pour musique et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','jazz']::text[],'http://www.pauline-julien.com','514 626-7887','showici','showici:salle-pauline-julien-montreal',true,null),
('Stewart Hall Cultural Centre','Event hall','176 Chemin du Bord-du-Lac-Lakeshore','West Island','Pointe-Claire','H9S 4E5',st_setsrid(st_makepoint(-73.8082,45.4345),4326)::geography,'Lakeside cultural centre in Pointe-Claire with a concert series.

Centre culturel au bord du lac à Pointe-Claire avec une série de concerts.',array['Solo / duo','Bands']::text[],array['classical','jazz','folk']::text[],'https://www.pointe-claire.ca/en/stewart-hall-cultural-centre/','514 630-1220','showici','showici:stewart-hall-cultural-centre-pointe-claire',true,null),
('McKibbin''s Irish Pub Pointe-Claire','Pub','6361 Route Transcanadienne','West Island','Pointe-Claire','H9R 5A5',st_setsrid(st_makepoint(-73.8377,45.4583),4326)::geography,'Irish pub with local bands on weekends.

Pub irlandais avec groupes d''ici les fins de semaine.',array['Bands','Solo / duo']::text[],array['rock','folk','pop']::text[],'https://www.mckibbinsirishpub.com','514 693-1580','showici','showici:mckibbin-s-irish-pub-pointe-claire-pointe-claire',true,null),
('Calistoga Grill','Restaurant','235 Boulevard Saint-Jean','West Island','Pointe-Claire','H9R 3J1',st_setsrid(st_makepoint(-73.8203,45.4551),4326)::geography,'Pointe-Claire grill with live music, including blues nights, most of the week.

Grill de Pointe-Claire avec musique live, dont des soirées blues, presque toute la semaine.',array['Solo / duo','Bands']::text[],array['jazz','rock','pop']::text[],null,'514 630-7577','showici','showici:calistoga-grill-pointe-claire',true,null),
('Duke & Devine''s Irish Pub','Pub','479 Boulevard Beaconsfield','West Island','Beaconsfield','H9W 4C3',st_setsrid(st_makepoint(-73.8814,45.4199),4326)::geography,'Beaconsfield Irish pub with frequent live bands.

Pub irlandais de Beaconsfield avec groupes en direct fréquents.',array['Bands','Solo / duo']::text[],array['rock','folk']::text[],null,'514 694-6731','showici','showici:duke-devine-s-irish-pub-beaconsfield',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
