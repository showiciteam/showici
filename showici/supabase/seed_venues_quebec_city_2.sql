-- ShowIci: unclaimed venues in Québec City (second batch). Public sources (venue sites, Pouding chômeur, Québec Cité, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Le Bal du Lézard','Bar','1049 3e Avenue','Limoilou','Québec','G1L 2X3',st_setsrid(st_makepoint(-71.2303,46.82678),4326)::geography,'Limoilou''s long-running neighbourhood bar with a small stage for local bands.

Bar de quartier bien établi de Limoilou avec une petite scène pour les groupes d''ici.',array['Bands','Solo / duo']::text[],array['rock','indie','punk']::text[],'https://lebaldulezard.com',null,'showici','showici:le-bal-du-lezard-quebec',true,null),
('L''Ampli de Québec','Event hall','240 Rue Saint-Joseph Est, local 200','Saint-Roch','Québec','G1K 3A9',st_setsrid(st_makepoint(-71.22778,46.81326),4326)::geography,'Saint-Roch music hub with a showcase room for emerging Québec bands.

Pôle musical de Saint-Roch avec une salle de vitrine pour les groupes émergents de Québec.',array['Bands','Solo / duo']::text[],array['rock','indie','Québec francophone']::text[],'https://amplidequebec.com',null,'showici','showici:l-ampli-de-quebec-quebec',true,null),
('La Nef','Event hall','160 Rue Saint-Joseph Est','Saint-Roch','Québec','G1K 3A7',st_setsrid(st_makepoint(-71.22288,46.81503),4326)::geography,'Intimate concert hall in a former Saint-Roch church.

Salle de concert intime dans une ancienne église de Saint-Roch.',array['Bands','Solo / duo']::text[],array['folk','jazz','indie']::text[],'https://lanef.ca',null,'showici','showici:la-nef-quebec',true,null),
('Le Knock-Out','Bar','47 Rue Saint-Joseph Ouest','Saint-Sauveur','Québec','G1K 1W8',st_setsrid(st_makepoint(-71.23235,46.81161),4326)::geography,'Record store and bar in Saint-Sauveur with shows and DJ nights.

Disquaire et bar de Saint-Sauveur avec spectacles et soirées DJ.',array['Bands','DJs']::text[],array['punk','rock','indie']::text[],'https://leknockoutdisquaire.com',null,'showici','showici:le-knock-out-quebec',true,null),
('Impérial Bell','Event hall','252 Rue Saint-Joseph Est','Saint-Roch','Québec','G1K 3A9',st_setsrid(st_makepoint(-71.22772,46.81341),4326)::geography,'Historic Saint-Roch concert hall hosting touring and local acts.

Salle de concert historique de Saint-Roch qui accueille artistes en tournée et d''ici.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','pop','Québec francophone']::text[],'https://imperialbell.com',null,'showici','showici:imperial-bell-quebec',true,null),
('Bar Le Sacrilège','Bar','447 Rue Saint-Jean','Saint-Jean-Baptiste','Québec','G1R 1P3',st_setsrid(st_makepoint(-71.22176,46.80917),4326)::geography,'Saint-Jean Street bar with a garden terrace and live music.

Bar de la rue Saint-Jean avec terrasse-jardin et musique live.',array['Solo / duo','Bands']::text[],array['folk','indie','rock']::text[],'https://barlesacrilege.com',null,'showici','showici:bar-le-sacrilege-quebec',true,null),
('Ninkasi du Faubourg','Bar','811 Rue Saint-Jean','Saint-Jean-Baptiste','Québec','G1R 1R2',st_setsrid(st_makepoint(-71.21696,46.81121),4326)::geography,'Faubourg Saint-Jean bar known for its shows, open mics and Québec microbrews.

Bar du faubourg Saint-Jean reconnu pour ses spectacles, scènes ouvertes et bières de microbrasseries.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['indie','rock','Québec francophone']::text[],'https://ninkasi.ca',null,'showici','showici:ninkasi-du-faubourg-quebec',true,null),
('Brasserie artisanale La Korrigane','Brewery','380 Rue Dorchester','Saint-Roch','Québec','G1K 6A7',st_setsrid(st_makepoint(-71.22684,46.81379),4326)::geography,'Saint-Roch brewpub with occasional live music.

Broue-pub de Saint-Roch avec musique live à l''occasion.',array['Solo / duo','Bands']::text[],array['folk','indie']::text[],'https://korrigane.ca',null,'showici','showici:brasserie-artisanale-la-korrigane-quebec',true,null),
('La Charpente des Fauves','Brewery','206 Rue Christophe-Colomb Est','Saint-Roch','Québec','G1K 3S7',st_setsrid(st_makepoint(-71.22753,46.81107),4326)::geography,'Saint-Roch brewpub listed among Québec City''s music venues.

Broue-pub de Saint-Roch répertorié parmi les lieux de musique de Québec.',array['Solo / duo','Bands']::text[],array['folk','indie']::text[],'https://charpentedesfauves.com',null,'showici','showici:la-charpente-des-fauves-quebec',true,null),
('Les Maltcommodes','Brewery','3333 Rue du Carrefour','Beauport','Québec','G1C 5R9',st_setsrid(st_makepoint(-71.2177,46.86053),4326)::geography,'Beauport brewpub with music nights.

Broue-pub de Beauport avec soirées musicales.',array['Solo / duo','Bands']::text[],array['rock','folk']::text[],'https://lesmaltcommodes.com',null,'showici','showici:les-maltcommodes-quebec',true,null),
('Noctem Artisans Brasseurs','Brewery','438 Rue du Parvis','Saint-Roch','Québec','G1K 6H8',st_setsrid(st_makepoint(-71.22343,46.81417),4326)::geography,'Saint-Roch brewpub with DJ and music nights.

Broue-pub de Saint-Roch avec soirées DJ et musique.',array['Solo / duo','DJs']::text[],array['indie','electronic']::text[],'https://noctem.ca',null,'showici','showici:noctem-artisans-brasseurs-quebec',true,null),
('Le Lit Double – Bar & Bouffe','Bar','399 Rue Saint-Jean','Saint-Jean-Baptiste','Québec','G1R 1P3',st_setsrid(st_makepoint(-71.22235,46.80891),4326)::geography,'Saint-Jean Street bar-kitchen listed among the city''s music venues.

Bar-bouffe de la rue Saint-Jean répertorié parmi les lieux de musique de la ville.',array['Solo / duo','Bands']::text[],array['indie','folk']::text[],'https://lelitdouble.com',null,'showici','showici:le-lit-double-bar-bouffe-quebec',true,null),
('Palais Montcalm','Event hall','995 Place D''Youville','Vieux-Québec','Québec','G1R 3P1',st_setsrid(st_makepoint(-71.21337,46.8121),4326)::geography,'Québec City''s renowned concert hall at Place D''Youville.

Salle de concert réputée de Québec, place D''Youville.',array['Bands','Solo / duo']::text[],array['jazz','classical','pop']::text[],'https://palaismontcalm.ca',null,'showici','showici:palais-montcalm-quebec',true,null),
('Le Diamant','Event hall','966 Rue Saint-Jean','Vieux-Québec','Québec','G1R 1R5',st_setsrid(st_makepoint(-71.21441,46.81296),4326)::geography,'Robert Lepage''s multidisciplinary venue at Place D''Youville.

Lieu multidisciplinaire de Robert Lepage, place D''Youville.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://lediamant.ca',null,'showici','showici:le-diamant-quebec',true,null),
('Théâtre Petit Champlain','Event hall','68 Rue du Petit-Champlain','Vieux-Québec','Québec','G1K 4H4',st_setsrid(st_makepoint(-71.20363,46.81155),4326)::geography,'Intimate song and music hall in the Petit-Champlain quarter.

Salle intime de chanson et de musique dans le quartier Petit-Champlain.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['folk','Québec francophone','pop']::text[],'https://theatrepetitchamplain.com',null,'showici','showici:theatre-petit-champlain-quebec',true,null),
('Salle Albert-Rousseau','Event hall','2410 Chemin Sainte-Foy','Sainte-Foy','Québec',null,st_setsrid(st_makepoint(-71.28684,46.78666),4326)::geography,'Large Sainte-Foy performance hall with concerts and comedy.

Grande salle de spectacle de Sainte-Foy avec concerts et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://sallealbertrousseau.com',null,'showici','showici:salle-albert-rousseau-quebec',true,null),
('Théâtre Capitole','Event hall','972 Rue Saint-Jean','Vieux-Québec','Québec','G1R 1R5',st_setsrid(st_makepoint(-71.21426,46.81326),4326)::geography,'Historic theatre at Place D''Youville presenting concerts, comedy and musicals.

Théâtre historique de la place D''Youville qui présente concerts, humour et comédies musicales.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://theatrecapitole.com',null,'showici','showici:theatre-capitole-quebec',true,null),
('Le Café Tiers-Lieu','Restaurant','1300 8e Avenue','Limoilou','Québec','G1J 5L5',st_setsrid(st_makepoint(-71.22807,46.83089),4326)::geography,'Limoilou community café that hosts small concerts.

Café communautaire de Limoilou qui accueille de petits concerts.',array['Solo / duo']::text[],array['folk','jazz']::text[],null,null,'showici','showici:le-cafe-tiers-lieu-quebec',true,null),
('Pub des Borgia','Pub','12 Rue du Petit-Champlain','Vieux-Québec','Québec',null,st_setsrid(st_makepoint(-71.2036,46.8123),4326)::geography,'Petit-Champlain pub with live music.

Pub du Petit-Champlain avec musique live.',array['Solo / duo']::text[],array['folk','pop']::text[],'https://pubdesborgia.com',null,'showici','showici:pub-des-borgia-quebec',true,null),
('Resto-bar spectacle Le Bercail','Bar','387 Boulevard Armand-Paris','Beauport','Québec','G1C 7T2',st_setsrid(st_makepoint(-71.1842,46.87925),4326)::geography,'Beauport resto-bar with shows.

Resto-bar spectacle de Beauport.',array['Solo / duo','Bands']::text[],array['country','rock','Québec francophone']::text[],null,null,'showici','showici:resto-bar-spectacle-le-bercail-quebec',true,null),
('Grand Théâtre de Québec','Event hall','269 Boulevard René-Lévesque Est','Montcalm','Québec','G1R 2B3',st_setsrid(st_makepoint(-71.22173,46.80628),4326)::geography,'Québec City''s flagship performing-arts centre.

Principal centre des arts de la scène de Québec.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','classical','Québec francophone']::text[],'https://grandtheatre.qc.ca',null,'showici','showici:grand-theatre-de-quebec-quebec',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
