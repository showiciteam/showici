-- ShowIci: unclaimed venues in the Côte-Nord. Public sources (venue sites, Tourisme Côte-Nord, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Café-théâtre Graffiti','Event hall','50 Chemin des Îles','Île McCormick','Port-Cartier',null,st_setsrid(st_makepoint(-66.86582,50.01977),4326)::geography,'Intimate café-théâtre on Île McCormick presenting more than forty shows a year.

Café-théâtre intime de l''île McCormick qui présente plus de quarante spectacles par année.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['folk','rock','Québec francophone']::text[],'http://legraffiti.ca','418 766-0101','showici','showici:cafe-theatre-graffiti-port-cartier',true,null),
('Salle Jean-Marc-Dion','Event hall','546 Boulevard Laure',null,'Sept-Îles','G4R 1X7',st_setsrid(st_makepoint(-66.37683,50.21443),4326)::geography,'Sept-Îles''s 800-seat concert hall, open year-round with a full performing-arts season.

Salle de 800 places de Sept-Îles, ouverte toute l''année avec une saison complète en arts de la scène.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://sallejmd.com','418 962-0100','showici','showici:salle-jean-marc-dion-sept-iles',true,null),
('La P''tite Grenouille Sept-Îles','Bar','247 Avenue Brochu',null,'Sept-Îles','G4R 2W3',st_setsrid(st_makepoint(-66.3797,50.20176),4326)::geography,'Sept-Îles boîte à chansons with singer-songwriters and party nights.

Boîte à chansons de Sept-Îles avec chansonniers et soirées festives.',array['Solo / duo']::text[],array['pop','Québec francophone','folk']::text[],'https://laptitegrenouille.ca',null,'showici','showici:la-p-tite-grenouille-sept-iles-sept-iles',true,null),
('Microbrasserie La Compagnie','Brewery','15 Rue du Père-Divet',null,'Sept-Îles','G4R 5B6',st_setsrid(st_makepoint(-66.38769,50.20741),4326)::geography,'Sept-Îles microbrewery and pub.

Microbrasserie et pub de Sept-Îles.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://microlacompagnie.com','418 961-2337','showici','showici:microbrasserie-la-compagnie-sept-iles',true,null),
('Edgar Café Bar','Bar','490 Avenue Arnaud',null,'Sept-Îles','G4R 3B4',st_setsrid(st_makepoint(-66.38803,50.20597),4326)::geography,'Café-bar on Sept-Îles''s waterfront avenue Arnaud.

Café-bar de l''avenue Arnaud, face au fleuve à Sept-Îles.',array['Solo / duo']::text[],array['folk','jazz']::text[],'https://edgarcafebar.com','418 968-6789','showici','showici:edgar-cafe-bar-sept-iles',true,null),
('Centre des arts de Baie-Comeau','Event hall','1660 Rue de Bretagne',null,'Baie-Comeau','G5C 3S3',st_setsrid(st_makepoint(-68.26021,49.20433),4326)::geography,'Baie-Comeau''s 840-seat theatre, plus the 500-person Espace Alcoa for events.

Théâtre de 840 places de Baie-Comeau, avec l''Espace Alcoa pour 500 personnes.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'http://centredesartsbc.com','418 295-2500','showici','showici:centre-des-arts-de-baie-comeau-baie-comeau',true,null),
('Microbrasserie St-Pancrace','Brewery','55 Place La Salle',null,'Baie-Comeau','G4Z 3A8',st_setsrid(st_makepoint(-68.1528,49.22132),4326)::geography,'Baie-Comeau brewpub that regularly hosts shows.

Broue-pub de Baie-Comeau qui accueille régulièrement des spectacles.',array['Solo / duo','Bands']::text[],array['rock','folk','Québec francophone']::text[],'https://stpancrace.com',null,'showici','showici:microbrasserie-st-pancrace-baie-comeau',true,null),
('Café du Fjord','Bar','152 Rue du Bateau-Passeur',null,'Tadoussac','G0T 2A0',st_setsrid(st_makepoint(-69.72277,48.14308),4326)::geography,'Tadoussac café-bar known for its summer concerts and festival nights.

Café-bar de Tadoussac connu pour ses concerts estivaux et ses soirées de festival.',array['Bands','Solo / duo']::text[],array['folk','rock','Québec francophone']::text[],null,null,'showici','showici:cafe-du-fjord-tadoussac',true,null),
('Microbrasserie Tadoussac','Brewery','145 Rue du Bord-de-l''Eau',null,'Tadoussac','G0T 2A0',st_setsrid(st_makepoint(-69.71774,48.13997),4326)::geography,'Waterfront microbrewery in Tadoussac.

Microbrasserie au bord de l''eau à Tadoussac.',array['Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://microtadoussac.com',null,'showici','showici:microbrasserie-tadoussac-tadoussac',true,null),
('La Shed-à-Morue','Event hall','951 Rue de la Berge',null,'Havre-Saint-Pierre',null,st_setsrid(st_makepoint(-63.60835,50.23763),4326)::geography,'Havre-Saint-Pierre screening and show hall in a former fish shed, with summer Soirées Cayennes for local talent.

Salle de diffusion de Havre-Saint-Pierre dans une ancienne shed à morue, avec les Soirées Cayennes estivales pour les talents d''ici.',array['Bands','Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://tourismehsp.com/quoi-faire/arts-et-culture/la-shed-a-morue/','418 538-1836','showici','showici:la-shed-a-morue-havre-saint-pierre',true,null),
('L''Échouerie Café-Bistro','Restaurant','55 Allée des Galets',null,'Natashquan',null,st_setsrid(st_makepoint(-61.82053,50.18183),4326)::geography,'Beachside café-bistro in Natashquan that doubles as a performance hall.

Café-bistro en bord de plage à Natashquan qui sert aussi de salle de spectacle.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone']::text[],'https://www.destinationnatashquan.com','418 726-6005','showici','showici:l-echouerie-cafe-bistro-natashquan',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
