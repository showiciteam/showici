-- ShowIci: unclaimed venues in Montérégie towns (Saint-Hyacinthe, Granby, Saint-Jean, Valleyfield, Vaudreuil, Sorel-Tracy). Public sources (venue sites, Pouding chômeur, Tourisme Montérégie, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Le Zaricot','Bar','1460 Rue des Cascades',null,'Saint-Hyacinthe','J2S 3H5',st_setsrid(st_makepoint(-72.94537,45.62494),4326)::geography,'Saint-Hyacinthe''s best-known show bar, with concerts and comedy downtown.

Le bar-spectacle le plus connu de Saint-Hyacinthe, avec concerts et humour au centre-ville.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','indie','Québec francophone']::text[],'https://lezaricot.com',null,'showici','showici:le-zaricot-saint-hyacinthe',true,null),
('Centre des arts Juliette-Lassonde','Event hall','1705 Rue Saint-Antoine',null,'Saint-Hyacinthe','J2S 9E2',st_setsrid(st_makepoint(-72.94612,45.62303),4326)::geography,'Saint-Hyacinthe''s performing-arts centre and concert hall.

Centre des arts de la scène et salle de concert de Saint-Hyacinthe.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://centredesarts.ca',null,'showici','showici:centre-des-arts-juliette-lassonde-saint-hyacinthe',true,null),
('Le Palace de Granby','Event hall','135 Rue Principale',null,'Granby','J2G 2V1',st_setsrid(st_makepoint(-72.7248,45.39926),4326)::geography,'Granby''s historic show hall on Principale Street.

Salle de spectacle historique de la rue Principale à Granby.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://palacedegranby.com',null,'showici','showici:le-palace-de-granby-granby',true,null),
('Microbrasserie Le Grimoire','Brewery','1546 Rue Principale',null,'Granby','J2J 0S6',st_setsrid(st_makepoint(-72.80857,45.42526),4326)::geography,'Granby brewpub with a music programme.

Broue-pub de Granby avec une programmation musicale.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://grimoire.biz',null,'showici','showici:microbrasserie-le-grimoire-granby',true,null),
('Louis'' Pub','Pub','151 Rue Principale',null,'Granby','J2G 2V5',st_setsrid(st_makepoint(-72.72563,45.3996),4326)::geography,'Downtown Granby pub with live music.

Pub du centre-ville de Granby avec musique live.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],'https://louispub.com',null,'showici','showici:louis-pub-granby',true,null),
('Brasserie La Ferme','Brewery','101 Chemin Meunier',null,'Shefford','J2M 1H5',st_setsrid(st_makepoint(-72.57211,45.38312),4326)::geography,'Farm brewery near Granby with a terrace and concerts.

Brasserie à la ferme près de Granby avec terrasse et concerts.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone']::text[],'https://brasserielaferme.ca',null,'showici','showici:brasserie-la-ferme-shefford',true,null),
('La Galoche – Pub bistronomie','Pub','1000 Route 116',null,'Acton Vale','J0H 1A0',st_setsrid(st_makepoint(-72.60008,45.64428),4326)::geography,'Acton Vale gastropub listed among the region''s music venues.

Pub bistronomique d''Acton Vale répertorié parmi les lieux de musique de la région.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],'https://lagaloche.ca',null,'showici','showici:la-galoche-pub-bistronomie-acton-vale',true,null),
('Théâtre des Deux Rives','Event hall','30 Boulevard du Séminaire Nord',null,'Saint-Jean-sur-Richelieu','J3B 5J4',st_setsrid(st_makepoint(-73.26985,45.29746),4326)::geography,'Saint-Jean-sur-Richelieu theatre programmed by SPEC du Haut-Richelieu.

Théâtre de Saint-Jean-sur-Richelieu programmé par SPEC du Haut-Richelieu.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://spec.qc.ca',null,'showici','showici:theatre-des-deux-rives-saint-jean-sur-richelieu',true,null),
('Le 164 Comédie Club','Club','164 Rue Richelieu',null,'Saint-Jean-sur-Richelieu','J3B 6X4',st_setsrid(st_makepoint(-73.25092,45.30539),4326)::geography,'Comedy club in Old Saint-Jean, 100% stand-up.

Club d''humour du Vieux-Saint-Jean, 100 % humour.',array['Stand-up comedy']::text[],array['pop']::text[],'https://le164comedieclub.com','450 358-3949','showici','showici:le-164-comedie-club-saint-jean-sur-richelieu',true,null),
('Brasserie de l''Ouest','Bar','400 Boulevard du Séminaire Nord',null,'Saint-Jean-sur-Richelieu','J3B 5L2',st_setsrid(st_makepoint(-73.26672,45.31149),4326)::geography,'Saint-Jean brasserie with singers, country dancing and DJ nights.

Brasserie de Saint-Jean avec chanteurs, danse country et soirées DJ.',array['Solo / duo','DJs']::text[],array['country','pop']::text[],'https://brasseriedelouest.com','450 348-7279','showici','showici:brasserie-de-l-ouest-saint-jean-sur-richelieu',true,null),
('Le Joker Pub Ludique','Pub','24 Rue Nicholson',null,'Salaberry-de-Valleyfield','J6T 6M5',st_setsrid(st_makepoint(-74.13189,45.25598),4326)::geography,'Valleyfield board-game pub that hosts music nights.

Pub ludique de Valleyfield qui accueille des soirées musicales.',array['Solo / duo','Bands']::text[],array['rock','indie']::text[],'https://jokerpub.ca',null,'showici','showici:le-joker-pub-ludique-salaberry-de-valleyfield',true,null),
('Microbrasserie du Vieux-Canal','Brewery','299 Rue Victoria',null,'Salaberry-de-Valleyfield','J6T 1A9',st_setsrid(st_makepoint(-74.1469,45.25279),4326)::geography,'Downtown Valleyfield brewpub with live music.

Broue-pub du centre-ville de Valleyfield avec musique live.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://microduvieuxcanal.com',null,'showici','showici:microbrasserie-du-vieux-canal-salaberry-de-valleyfield',true,null),
('La Factrie, café culturel','Bar','17 Rue du Marché',null,'Salaberry-de-Valleyfield','J6T 1P1',st_setsrid(st_makepoint(-74.1324,45.25485),4326)::geography,'Valleyfield cultural café with concerts and open stages.

Café culturel de Valleyfield avec concerts et scènes ouvertes.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','indie','Québec francophone']::text[],'https://lafactrie.org',null,'showici','showici:la-factrie-cafe-culturel-salaberry-de-valleyfield',true,null),
('Salle Albert-Dumouchel','Event hall','169 Rue Champlain',null,'Salaberry-de-Valleyfield','J6T 1X6',st_setsrid(st_makepoint(-74.13293,45.25265),4326)::geography,'Valleyfield''s main concert hall, programmed by Valspec.

Principale salle de spectacle de Valleyfield, programmée par Valspec.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://valspec.com',null,'showici','showici:salle-albert-dumouchel-salaberry-de-valleyfield',true,null),
('McKibbin''s Irish Pub Vaudreuil','Pub','3036 Boulevard de la Gare',null,'Vaudreuil-Dorion','J7V 0H1',st_setsrid(st_makepoint(-74.05493,45.39525),4326)::geography,'Vaudreuil location of the Irish pub chain, with live bands.

Succursale de Vaudreuil de la chaîne de pubs irlandais, avec groupes live.',array['Bands','Solo / duo']::text[],array['rock','folk']::text[],'https://mckibbinsirishpub.com',null,'showici','showici:mckibbin-s-irish-pub-vaudreuil-vaudreuil-dorion',true,null),
('Microbrasserie Trois-Lacs','Brewery','434 Rue Aimé-Vincent',null,'Vaudreuil-Dorion','J7V 5V5',st_setsrid(st_makepoint(-74.05171,45.40414),4326)::geography,'Vaudreuil-Dorion microbrewery listed among Suroît music venues.

Microbrasserie de Vaudreuil-Dorion répertoriée parmi les lieux de musique du Suroît.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://3lacs.com',null,'showici','showici:microbrasserie-trois-lacs-vaudreuil-dorion',true,null),
('Brasserie Barabas','Brewery','377 Route 132',null,'Sainte-Barbe','J0S 1P0',st_setsrid(st_makepoint(-74.17843,45.17273),4326)::geography,'Sainte-Barbe brewery with a terrace and music.

Brasserie de Sainte-Barbe avec terrasse et musique.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://barabas.beer',null,'showici','showici:brasserie-barabas-sainte-barbe',true,null),
('Cardinal Brewing','Brewery','466 Rue Main',null,'Hudson','J0P 1H0',st_setsrid(st_makepoint(-74.14113,45.45899),4326)::geography,'Hudson brewpub with live music.

Broue-pub d''Hudson avec musique live.',array['Solo / duo','Bands']::text[],array['folk','rock','blues']::text[],'https://cardinalhudson.com',null,'showici','showici:cardinal-brewing-hudson',true,null),
('Azimut Diffusion','Event hall','28 Rue du Roi',null,'Sorel-Tracy','J3P 4M4',st_setsrid(st_makepoint(-73.11739,46.04536),4326)::geography,'Sorel-Tracy''s major performing-arts presenter, with shows in cabaret and theatre settings.

Diffuseur majeur de Sorel-Tracy, avec spectacles en formule cabaret et théâtre.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://azimutdiffusion.com',null,'showici','showici:azimut-diffusion-sorel-tracy',true,null),
('Bar 525','Bar','525 Boulevard Fiset',null,'Sorel-Tracy',null,st_setsrid(st_makepoint(-73.08372,46.02899),4326)::geography,'Sorel-Tracy bar that hosts weekend shows.

Bar de Sorel-Tracy qui présente des spectacles la fin de semaine.',array['Bands','Solo / duo']::text[],array['rock','pop']::text[],null,null,'showici','showici:bar-525-sorel-tracy',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
