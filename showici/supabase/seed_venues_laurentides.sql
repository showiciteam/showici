-- ShowIci: unclaimed venues in the Laurentides (Saint-Jérôme, Val-David, Sainte-Agathe, Mont-Tremblant and nearby). Public sources (venue sites, Pouding chômeur, Tourisme Laurentides, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Gare 422','Restaurant','422 Boulevard Monseigneur-Dubois',null,'Saint-Jérôme','J7Y 3L8',st_setsrid(st_makepoint(-74.01596,45.77947),4326)::geography,'Saint-Jérôme restaurant-bar with regular live music nights.

Resto-bar de Saint-Jérôme avec soirées de musique live régulières.',array['Solo / duo','Bands']::text[],array['rock','pop','Québec francophone']::text[],'https://gare422.com','450 700-2956','showici','showici:gare-422-saint-jerome',true,null),
('St George''s Taverne','Bar','97 Rue Saint-Georges',null,'Saint-Jérôme','J7Z 4Z4',st_setsrid(st_makepoint(-74.00172,45.77133),4326)::geography,'Downtown Saint-Jérôme tavern with karaoke, improv and comedy nights in its Salle Point G next door.

Taverne du centre-ville de Saint-Jérôme avec karaoké, impro et soirées d''humour dans sa Salle Point G voisine.',array['Stand-up comedy','Solo / duo']::text[],array['pop','rock']::text[],'https://stgeorgestaverne.ca','450 436-6446','showici','showici:st-george-s-taverne-saint-jerome',true,null),
('Théâtre Gilles-Vigneault','Event hall','118 Rue de la Gare',null,'Saint-Jérôme','J7Z 0J1',st_setsrid(st_makepoint(-74.00165,45.77614),4326)::geography,'Saint-Jérôme''s main performance hall, programmed by En Scène.

Principale salle de spectacle de Saint-Jérôme, programmée par En Scène.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://theatregillesvigneault.com',null,'showici','showici:theatre-gilles-vigneault-saint-jerome',true,null),
('Bistro Bar du Parc','Bar','380 Boulevard Lajeunesse Ouest',null,'Saint-Jérôme','J7Y 4E5',st_setsrid(st_makepoint(-74.02412,45.78678),4326)::geography,'Saint-Jérôme bistro-bar that hosts live music.

Bistro-bar de Saint-Jérôme qui accueille de la musique live.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],null,null,'showici','showici:bistro-bar-du-parc-saint-jerome',true,null),
('Dieu du Ciel! Saint-Jérôme','Brewery','259 Rue de Villemure',null,'Saint-Jérôme',null,st_setsrid(st_makepoint(-74.00145,45.7753),4326)::geography,'Saint-Jérôme pub of the well-known Dieu du Ciel! brewery, listed as a music venue.

Pub de Saint-Jérôme de la réputée brasserie Dieu du Ciel!, répertorié comme lieu de musique.',array['Solo / duo','Bands']::text[],array['folk','indie']::text[],'https://dieuduciel.com',null,'showici','showici:dieu-du-ciel-saint-jerome-saint-jerome',true,null),
('Microbrasserie Le Baril Roulant','Brewery','2434 Rue de l''Église',null,'Val-David','J0T 2N0',st_setsrid(st_makepoint(-74.20875,46.02854),4326)::geography,'Val-David brewpub and long-running Laurentides live-music spot.

Broue-pub de Val-David et lieu de musique live bien établi dans les Laurentides.',array['Bands','Solo / duo']::text[],array['rock','folk','Québec francophone']::text[],'https://barilroulant.com',null,'showici','showici:microbrasserie-le-baril-roulant-val-david',true,null),
('Bistro Le Mouton Noir','Bar','2301 Rue de l''Église',null,'Val-David','J0T 2N0',st_setsrid(st_makepoint(-74.21225,46.02663),4326)::geography,'Val-David bistro-bar with a weekly programme of concerts.

Bistro-bar de Val-David avec une programmation hebdomadaire de concerts.',array['Bands','Solo / duo']::text[],array['rock','folk','blues']::text[],'https://bistromoutonnoir.com',null,'showici','showici:bistro-le-mouton-noir-val-david',true,null),
('Les Saboteurs','Restaurant','2510 Rue de l''Église',null,'Val-David','J0T 2N0',st_setsrid(st_makepoint(-74.20646,46.03019),4326)::geography,'Val-David café-restaurant-bar that hosts concerts and themed evenings.

Café-resto-bar de Val-David qui présente concerts et soirées thématiques.',array['Solo / duo','Bands']::text[],array['folk','indie']::text[],'https://lessaboteurs.com',null,'showici','showici:les-saboteurs-val-david',true,null),
('Théâtre du Marais','Event hall','1121 10e Avenue',null,'Val-Morin','J0T 2R0',st_setsrid(st_makepoint(-74.18692,46.00717),4326)::geography,'Intimate Val-Morin theatre presenting concerts, theatre and comedy.

Théâtre intime de Val-Morin qui présente concerts, théâtre et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['folk','jazz','Québec francophone']::text[],'https://theatredumarais.com','819 322-1414','showici','showici:theatre-du-marais-val-morin',true,null),
('Théâtre Le Patriote','Event hall','258 Rue Saint-Venant',null,'Sainte-Agathe-des-Monts','J8C 2Z7',st_setsrid(st_makepoint(-74.28498,46.0308),4326)::geography,'Historic Sainte-Agathe theatre presenting music, comedy and theatre year-round.

Théâtre historique de Sainte-Agathe qui présente musique, humour et théâtre toute l''année.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://theatrepatriote.com','819 326-3655','showici','showici:theatre-le-patriote-sainte-agathe-des-monts',true,null),
('Microbrasserie La Diable','Brewery','117 Chemin de Kandahar',null,'Mont-Tremblant','J8E 1B1',st_setsrid(st_makepoint(-74.58652,46.21228),4326)::geography,'Brewpub in the Tremblant pedestrian village.

Broue-pub du village piétonnier de Tremblant.',array['Solo / duo','Bands']::text[],array['rock','folk']::text[],'https://microladiable.com','819 681-4546','showici','showici:microbrasserie-la-diable-mont-tremblant',true,null),
('Le P''tit Caribou','Bar','125 Chemin de Kandahar',null,'Mont-Tremblant','J8E 1E2',st_setsrid(st_makepoint(-74.5864,46.21188),4326)::geography,'Tremblant village après-ski bar known for bands and DJ nights.

Bar d''après-ski du village de Tremblant, connu pour ses groupes et soirées DJ.',array['Bands','DJs']::text[],array['rock','pop']::text[],'https://ptitcaribou.com',null,'showici','showici:le-p-tit-caribou-mont-tremblant',true,null),
('Le Shack','Restaurant','3035 Chemin de la Chapelle',null,'Mont-Tremblant','J8E 1E1',st_setsrid(st_makepoint(-74.58646,46.21338),4326)::geography,'Tremblant village resto-bar with live music.

Resto-bar du village de Tremblant avec musique live.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],'https://leshack.com',null,'showici','showici:le-shack-mont-tremblant',true,null),
('Le Saint-Sau Pub Gourmand','Pub','236 Rue Principale',null,'Saint-Sauveur','J0R 1R0',st_setsrid(st_makepoint(-74.15765,45.89431),4326)::geography,'Saint-Sauveur pub with more than 200 concerts a year, seven nights a week.

Pub de Saint-Sauveur qui présente plus de 200 concerts par année, sept soirs sur sept.',array['Bands','Solo / duo']::text[],array['rock','blues','Québec francophone']::text[],'https://lesaintsau.com','450 227-0218','showici','showici:le-saint-sau-pub-gourmand-saint-sauveur',true,null),
('Café Morin','Restaurant','42 Rue Morin',null,'Sainte-Adèle','J8B 2P7',st_setsrid(st_makepoint(-74.13591,45.95163),4326)::geography,'Sainte-Adèle café and show venue with more than 200 shows a year, dinner-shows and Sunday boîte à chansons.

Café et salle de spectacle de Sainte-Adèle avec plus de 200 spectacles par année, souper-spectacles et boîte à chansons le dimanche.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','Québec francophone','pop']::text[],'https://cafemorin.com',null,'showici','showici:cafe-morin-sainte-adele',true,null),
('Le Shawbridge','Pub','3023 Boulevard du Curé-Labelle',null,'Prévost','J0R 1T0',st_setsrid(st_makepoint(-74.07655,45.87321),4326)::geography,'Prévost pub listed among the Laurentides'' live-music spots.

Pub de Prévost répertorié parmi les lieux de musique live des Laurentides.',array['Solo / duo','Bands']::text[],array['rock','folk']::text[],'https://shawbridge.ca',null,'showici','showici:le-shawbridge-prevost',true,null),
('Radis Noir, pub nordique et café','Pub','728 Chemin de Sainte-Anne-des-Lacs',null,'Sainte-Anne-des-Lacs','J0R 1B0',st_setsrid(st_makepoint(-74.1242,45.86218),4326)::geography,'Nordic pub-café in Sainte-Anne-des-Lacs that hosts small concerts.

Pub-café nordique de Sainte-Anne-des-Lacs qui accueille de petits concerts.',array['Solo / duo']::text[],array['folk','indie']::text[],'https://radisnoir.ca',null,'showici','showici:radis-noir-pub-nordique-et-cafe-sainte-anne-des-lacs',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
