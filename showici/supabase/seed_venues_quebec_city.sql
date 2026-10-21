-- ShowIci: 20 unclaimed venues in Québec City. Public sources (Destination Québec cité, venue sites, listings); OpenStreetMap data © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Pub Saint-Alexandre','Pub','1087 Rue Saint-Jean','Vieux-Québec','Québec','G1R 1S3',st_setsrid(st_makepoint(-71.21099,46.81364),4326)::geography,'Old Québec pub on Rue Saint-Jean with live music every night.

Pub du Vieux-Québec, rue Saint-Jean, avec musique en direct tous les soirs.',array['Solo / duo','Bands']::text[],array['Chansonnier','Pub rock']::text[],null,null,'showici','showici:pub-saint-alexandre-quebec',true,null),
('Pub Saint-Patrick','Pub','1200 Rue Saint-Jean','Vieux-Québec','Québec','G1R 1S8',st_setsrid(st_makepoint(-71.20895,46.81481),4326)::geography,'Irish pub in Old Québec with live music every night.

Pub irlandais du Vieux-Québec avec musique en direct tous les soirs.',array['Solo / duo','Bands']::text[],array['Celtic','Chansonnier']::text[],null,null,'showici','showici:pub-saint-patrick-quebec',true,null),
('Pub Chez Murphy''s','Pub','1095 Rue Saint-Jean','Vieux-Québec','Québec','G1R 4H2',st_setsrid(st_makepoint(-71.21087,46.81371),4326)::geography,'Irish pub on Rue Saint-Jean in Old Québec with live music every night.

Pub irlandais de la rue Saint-Jean, dans le Vieux-Québec, avec musique en direct tous les soirs.',array['Solo / duo','Bands']::text[],array['Celtic','Chansonnier']::text[],null,null,'showici','showici:pub-chez-murphy-s-quebec',true,null),
('Bistrot Le Pape-Georges','Bar','8 Rue du Cul-de-Sac','Vieux-Québec','Québec','G1K 8R1',st_setsrid(st_makepoint(-71.20329,46.81249),4326)::geography,'Wine bar in the lower town of Old Québec with live music Friday to Sunday, including blues.

Bar à vin de la basse-ville du Vieux-Québec avec musique en direct du vendredi au dimanche, notamment du blues.',array['Solo / duo']::text[],array['Blues','Acoustic']::text[],'https://bistrolepapegeorges.com',null,'showici','osm:n4331604389',true,null),
('Le Bijou','Bar','2 Rue Pierre-Olivier-Chauveau','Vieux-Québec','Québec','G1R 4J3',st_setsrid(st_makepoint(-71.20887,46.81446),4326)::geography,'Old Québec bar with live jazz on Tuesday, Thursday and Sunday.

Bar du Vieux-Québec avec jazz en direct les mardis, jeudis et dimanches.',array['Bands','Solo / duo']::text[],array['Jazz']::text[],'https://lebijou.ca',null,'showici','showici:le-bijou-quebec',true,null),
('Bar Ste-Angèle','Bar','26 Rue Sainte-Angèle','Vieux-Québec','Québec','G1R 4G4',st_setsrid(st_makepoint(-71.21167,46.81307),4326)::geography,'Small bar tucked off Rue Saint-Jean that presents jazz shows most nights.

Petit bar près de la rue Saint-Jean qui présente des spectacles de jazz presque tous les soirs.',array['Bands','Solo / duo']::text[],array['Jazz']::text[],null,null,'showici','showici:bar-ste-angele-quebec',true,null),
('Les Voûtes Grande Allée','Bar','680 Grande Allée Est','Grande Allée','Québec','G1R 3N8',st_setsrid(st_makepoint(-71.21604,46.80683),4326)::geography,'Popular Grande Allée boîte à chansons with chansonniers and sing-alongs every night.

Boîte à chansons populaire de la Grande Allée avec chansonniers tous les soirs.',array['Solo / duo']::text[],array['Chansonnier','Sing-along']::text[],null,null,'showici','showici:les-voutes-grande-allee-quebec',true,null),
('Taverne Grande Allée','Bar','585 Grande Allée Est','Grande Allée','Québec','G1R 3N8',st_setsrid(st_makepoint(-71.21696,46.80591),4326)::geography,'Tavern on Grande Allée that hosts live music, with a schedule that varies.

Taverne de la Grande Allée qui présente de la musique en direct selon un horaire variable.',array['Solo / duo','Bands']::text[],array['Chansonnier','Pop rock']::text[],'https://tavernegrandeallee.com',null,'showici','showici:taverne-grande-allee-quebec',true,null),
('Fou-Bar','Bar','525 Rue Saint-Jean','Saint-Jean-Baptiste','Québec','G1R 1P5',st_setsrid(st_makepoint(-71.22085,46.80952),4326)::geography,'Saint-Jean-Baptiste neighbourhood bar with evenings of live musicians.

Bar de quartier de Saint-Jean-Baptiste avec des soirées de musiciens en direct.',array['Bands','Solo / duo']::text[],array['Folk','Jazz','Indie']::text[],null,null,'showici','showici:fou-bar-quebec',true,null),
('Phoenix du Parvis','Bar','441 Rue du Parvis','Saint-Roch','Québec','G1K 9L6',st_setsrid(st_makepoint(-71.22318,46.81424),4326)::geography,'Saint-Roch bar with several rooms, including live music Thursday to Saturday and an 80s-style dance floor.

Bar de Saint-Roch à plusieurs ambiances, avec musique en direct du jeudi au samedi et une discothèque années 80.',array['Bands','Solo / duo','DJs']::text[],array['Pop rock','Retro']::text[],null,null,'showici','showici:phoenix-du-parvis-quebec',true,null),
('L''Anti Bar & Spectacles','Event hall','251 Rue Dorchester','Saint-Roch','Québec','G1K 5Z6',st_setsrid(st_makepoint(-71.22850,46.81560),4326)::geography,'Bar with a large show room that hosts concerts, Monday comedy nights and karaoke.

Bar avec une grande salle de spectacle qui accueille des concerts, des soirées d''humour le lundi et du karaoké.',array['Bands','Stand-up comedy']::text[],array['Rock','Indie','Comedy']::text[],null,null,'showici','showici:l-anti-bar-spectacles-quebec',true,null),
('Le Pantoum','Event hall','76 Rue Saint-Vallier Ouest','Saint-Sauveur','Québec','G1K 1J6',st_setsrid(st_makepoint(-71.23264,46.81139),4326)::geography,'Community-run music creation complex with a small concert room for local and touring indie acts.

Complexe de création musicale géré par une communauté de travailleurs culturels, avec une petite salle de concert pour la scène indépendante.',array['Bands','Solo / duo']::text[],array['Indie','Rock','Francophone']::text[],'https://lepantoum.com','418 564-6839','showici','showici:le-pantoum-quebec',true,null),
('Scanner Bistro','Bar','291 Rue Saint-Vallier Est','Saint-Roch','Québec','G1K 3P5',st_setsrid(st_makepoint(-71.22444,46.81180),4326)::geography,'Lower Town bar where bands play regularly, known for rock, punk and metal shows.

Bar de la basse-ville où des groupes se produisent régulièrement, reconnu pour ses spectacles rock, punk et métal.',array['Bands']::text[],array['Punk','Metal','Rock']::text[],'https://www.scannerbistro.com','418 523-1916','showici','showici:scanner-bistro-quebec',true,null),
('Le Drague Cabaret Club','Club','815 Rue Saint-Augustin','Saint-Jean-Baptiste','Québec','G1R 3N4',st_setsrid(st_makepoint(-71.21689,46.81103),4326)::geography,'LGBTQ+ club with a cabaret room for drag shows, dinner shows and weekend drag brunches.

Club LGBTQ+ avec une salle cabaret pour des spectacles de drag, des soupers-spectacles et des brunchs drag la fin de semaine.',array['DJs']::text[],array['Drag','Cabaret']::text[],'https://ledrague.com','418 649-7212','showici','showici:le-drague-cabaret-club-quebec',true,null),
('Bar Les Yeux Bleus','Bar','1117 Rue Saint-Jean','Vieux-Québec','Québec','G1R 1S3',st_setsrid(st_makepoint(-71.21049,46.81389),4326)::geography,'Hidden bar off Rue Saint-Jean, reached through an alley, with DJs every night.

Bar caché près de la rue Saint-Jean, accessible par une ruelle, avec des DJ tous les soirs.',array['DJs']::text[],array['Electronic','Hip-hop']::text[],'https://baryeuxbleus.com','418 204-0501','showici','showici:bar-les-yeux-bleus-quebec',true,null),
('Le Saint-Jean Comédie Club','Club','774 Rue Saint-Jean','Saint-Jean-Baptiste','Québec','G1R 1P9',st_setsrid(st_makepoint(-71.21769,46.81129),4326)::geography,'Comedy club and restaurant on Rue Saint-Jean with stand-up shows Tuesday to Saturday.

Comédie club et restaurant de la rue Saint-Jean avec des spectacles d''humour du mardi au samedi.',array['Stand-up comedy']::text[],array['Comedy']::text[],'https://lesaintjean.ca','581 891-9998','showici','showici:le-saint-jean-comedie-club-quebec',true,null),
('Le Dagobert','Club','600 Grande Allée Est','Grande Allée','Québec','G1R 2K5',st_setsrid(st_makepoint(-71.21682,46.80633),4326)::geography,'Grande Allée nightclub known for its DJ nights.

Boîte de nuit de la Grande Allée reconnue pour ses soirées DJ.',array['DJs']::text[],array['Dance','Pop']::text[],null,null,'showici','showici:le-dagobert-quebec',true,null),
('Grizzly Fuzz','Event hall','228 Rue Saint-Joseph Est','Saint-Roch','Québec','G1K 3A9',st_setsrid(st_makepoint(-71.22793,46.81323),4326)::geography,'Saint-Roch concert venue hosting local and touring acts across many genres.

Salle de concert de Saint-Roch qui accueille des artistes d''ici et de passage dans plusieurs styles.',array['Bands','Solo / duo']::text[],array['Rock','Indie','Hip-hop']::text[],null,null,'showici','showici:grizzly-fuzz-quebec',true,null),
('Bar-Spectacle Le Quartier de Lune 2.0','Bar','1096 3e Avenue','Limoilou','Québec','G1L 2X4',st_setsrid(st_makepoint(-71.23010,46.82713),4326)::geography,'Limoilou show bar on 3e Avenue with shows and events, music from every era and dancing.

Bar-spectacle de la 3e Avenue, dans Limoilou, avec spectacles et événements, musique de toutes les époques et danse.',array['Bands','Solo / duo','DJs']::text[],array['Retro','Pop rock']::text[],null,'418 523-4011','showici','showici:bar-spectacle-le-quartier-de-lune-2-0-quebec',true,null),
('Le Bateau de Nuit','Pub','275 Rue Saint-Jean','Saint-Jean-Baptiste','Québec','G1R 1N8',st_setsrid(st_makepoint(-71.22415,46.80828),4326)::geography,'Underground pub on Rue Saint-Jean known for live music and improv show nights.

Pub underground de la rue Saint-Jean reconnu pour ses soirées de musique et d''improvisation.',array['Bands','Solo / duo']::text[],array['Indie','Rock','Improv']::text[],null,null,'showici','showici:le-bateau-de-nuit-quebec',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
