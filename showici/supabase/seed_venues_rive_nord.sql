-- ShowIci: unclaimed venues in the North Shore of Montréal (Rive-Nord). Public sources (venue sites, Pouding chômeur, Tourisme des Moulins, local guides, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Théâtre du Vieux-Terrebonne','Event hall','866 Rue Saint-Pierre','Vieux-Terrebonne','Terrebonne','J6W 1E5',st_setsrid(st_makepoint(-73.637,45.6926),4326)::geography,'Old Terrebonne''s main theatre for concerts, comedy and theatre.

Principal théâtre du Vieux-Terrebonne pour concerts, humour et théâtre.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://lanouvellesociete.com','450 492-4777','showici','showici:theatre-du-vieux-terrebonne-terrebonne',true,null),
('Le Moulinet','Event hall','950 Île-des-Moulins','Vieux-Terrebonne','Terrebonne','J6W 1E5',st_setsrid(st_makepoint(-73.6385,45.6927),4326)::geography,'Small performance hall on Île-des-Moulins for intimate shows.

Petite salle de spectacle sur l''Île-des-Moulins pour des spectacles intimes.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','jazz','Québec francophone']::text[],'https://lanouvellesociete.com','450 492-4777','showici','showici:le-moulinet-terrebonne',true,null),
('Pub St-Patrick','Pub','774 Rue Saint-Pierre','Vieux-Terrebonne','Terrebonne','J6W 1E6',st_setsrid(st_makepoint(-73.6347,45.6926),4326)::geography,'Irish pub in Old Terrebonne with bands, jazz and blues nights.

Pub irlandais du Vieux-Terrebonne avec groupes et soirées jazz et blues.',array['Bands','Solo / duo']::text[],array['rock','folk','jazz']::text[],'http://barstpatrick.com','450 964-7418','showici','showici:pub-st-patrick-terrebonne',true,null),
('Bières & Compagnie Terrebonne','Restaurant','2285 Chemin Gascon','Lachenaie','Terrebonne','J6X 4H3',st_setsrid(st_makepoint(-73.6653,45.7243),4326)::geography,'Beer pub with Wednesday piano-bar nights and live entertainment.

Pub de bières avec soirées piano-bar le mercredi et divertissement en direct.',array['Solo / duo']::text[],array['pop','jazz']::text[],'https://bieresetcompagnie.ca','450 492-3339','showici','showici:bieres-compagnie-terrebonne-terrebonne',true,null),
('L''Albatros Brasserie Artisanale','Brewery','2928 Chemin Sainte-Marie',null,'Mascouche','J7K 1N7',st_setsrid(st_makepoint(-73.6037,45.7485),4326)::geography,'Mascouche craft brewery with comedy Wednesdays and live music.

Brasserie artisanale de Mascouche avec mercredis d''humour et musique live.',array['Stand-up comedy','Solo / duo','Bands']::text[],array['folk','Québec francophone']::text[],'http://lalbatrosbrasserieartisanale.com','450 474-0033','showici','showici:l-albatros-brasserie-artisanale-mascouche',true,null),
('Théâtre Alphonse-Desjardins','Event hall','25 Allée de la Création',null,'Repentigny','J6A 0C2',st_setsrid(st_makepoint(-73.4501,45.7391),4326)::geography,'Repentigny''s modern performance hall for concerts and comedy.

Salle de spectacle moderne de Repentigny pour concerts et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://alphonse-desjardins.com','450 589-9198','showici','showici:theatre-alphonse-desjardins-repentigny',true,null),
('Cabaret BMO Sainte-Thérèse','Event hall','57 Rue Turgeon',null,'Sainte-Thérèse','J7E 3H4',st_setsrid(st_makepoint(-73.8398,45.6382),4326)::geography,'Cabaret-style hall run by Odyscène for concerts and comedy.

Salle de type cabaret gérée par Odyscène pour concerts et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://odyscene.com','450 434-4006','showici','showici:cabaret-bmo-sainte-therese-sainte-therese',true,null),
('Théâtre Lionel-Groulx','Event hall','100 Rue Duquet',null,'Sainte-Thérèse','J7E 3G6',st_setsrid(st_makepoint(-73.8426,45.6428),4326)::geography,'Odyscène''s large theatre for touring concerts and comedy.

Grand théâtre d''Odyscène pour concerts et humour en tournée.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','classical']::text[],'https://odyscene.com','450 434-4006','showici','showici:theatre-lionel-groulx-sainte-therese',true,null),
('Microbrasserie Le Saint-Graal','Brewery','32 Rue Turgeon',null,'Sainte-Thérèse','J7E 3H4',st_setsrid(st_makepoint(-73.8407,45.6385),4326)::geography,'Sainte-Thérèse brewpub with live shows.

Broue-pub de Sainte-Thérèse avec spectacles.',array['Bands','Solo / duo']::text[],array['rock','folk']::text[],'https://www.saintgraal.ca','450 818-6039','showici','showici:microbrasserie-le-saint-graal-sainte-therese',true,null),
('Hôtel Bonanza Bar','Bar','27 Rue Blainville Ouest',null,'Sainte-Thérèse','J7E 1X1',st_setsrid(st_makepoint(-73.8431,45.6395),4326)::geography,'Retro Las Vegas-style bar with DJ nights, karaoke, open mic and bands.

Bar rétro à la Las Vegas avec soirées DJ, karaoké, micro ouvert et groupes.',array['DJs','Bands','Solo / duo']::text[],array['pop','rock']::text[],'https://hotelbonanza.bar',null,'showici','showici:hotel-bonanza-bar-sainte-therese',true,null),
('Le Montecristo','Bar','10 Rue Blainville Ouest',null,'Sainte-Thérèse',null,st_setsrid(st_makepoint(-73.8422,45.6397),4326)::geography,'Sainte-Thérèse bar hosting local rock and metal shows.

Bar de Sainte-Thérèse qui accueille des spectacles rock et métal d''ici.',array['Bands']::text[],array['rock','punk','indie']::text[],null,null,'showici','showici:le-montecristo-sainte-therese',true,null),
('Prohibition Bar','Bar','32 Rue Blainville Ouest',null,'Sainte-Thérèse','J7E 1W9',st_setsrid(st_makepoint(-73.8429,45.6397),4326)::geography,'Beer bar in Sainte-Thérèse''s village with live music.

Bar à bières du village de Sainte-Thérèse avec musique live.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],'https://prohibitionbar.ca','450 951-9519','showici','showici:prohibition-bar-sainte-therese',true,null),
('Le BAM – Bière au menu','Bar','71 Montée Gagnon',null,'Bois-des-Filion','J6Z 4H3',st_setsrid(st_makepoint(-73.7613,45.6656),4326)::geography,'Beer bar hosting concerts, comedy nights and themed shows.

Bar à bières qui présente concerts, soirées d''humour et spectacles thématiques.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['jazz','country','rock']::text[],'https://biereaumenu.com','450 621-0611','showici','showici:le-bam-biere-au-menu-bois-des-filion',true,null),
('Le Petit Théâtre du Nord','Event hall','305 Chemin de la Grande-Côte',null,'Boisbriand','J7G 1B3',st_setsrid(st_makepoint(-73.8316,45.6108),4326)::geography,'Boisbriand theatre company with dinner theatre and seasonal shows.

Compagnie de théâtre de Boisbriand avec souper-théâtre et spectacles saisonniers.',array['Stand-up comedy','Solo / duo']::text[],array['Québec francophone','folk']::text[],'https://petittheatredunord.com','450 419-8755','showici','showici:le-petit-theatre-du-nord-boisbriand',true,null),
('Le Zénith Promutuel Assurance','Event hall','305 Avenue Mathers',null,'Saint-Eustache','J7P 4C1',st_setsrid(st_makepoint(-73.8773,45.58),4326)::geography,'Saint-Eustache concert hall for touring singers, bands and comedians.

Salle de spectacle de Saint-Eustache pour chanteurs, groupes et humoristes en tournée.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://lezenithsteustache.ca','450 485-0848','showici','showici:le-zenith-promutuel-assurance-saint-eustache',true,null),
('Le Cask Pub & Grill','Pub','587 20e Avenue',null,'Deux-Montagnes','J7R 6B2',st_setsrid(st_makepoint(-73.9148,45.543),4326)::geography,'Deux-Montagnes pub with live music, karaoke and trivia nights.

Pub de Deux-Montagnes avec musique live, karaoké et soirées quiz.',array['Bands','Solo / duo']::text[],array['rock','pop']::text[],'https://lecask.com','450 491-8191','showici','showici:le-cask-pub-grill-deux-montagnes',true,null),
('L''Usine Restaurant Bar','Restaurant','2939 Boulevard des Promenades',null,'Sainte-Marthe-sur-le-Lac','J0N 1P0',st_setsrid(st_makepoint(-73.931,45.5342),4326)::geography,'Resto-bar with chansonniers, DJs and a monthly comedy night.

Resto-bar avec chansonniers, DJ et soirée d''humour mensuelle.',array['Solo / duo','DJs','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'https://www.restolusine.com','450 974-4040','showici','showici:l-usine-restaurant-bar-sainte-marthe-sur-le-lac',true,null),
('Resto-Pub de la Montagne','Pub','1081 Chemin Principal',null,'Saint-Joseph-du-Lac','J0N 1M0',st_setsrid(st_makepoint(-74.006,45.5336),4326)::geography,'Country pub at the foot of the Oka hills with live music.

Pub de campagne au pied des collines d''Oka avec musique live.',array['Solo / duo','Bands']::text[],array['rock','country']::text[],'https://restopubdelamontagne.com','450 491-1144','showici','showici:resto-pub-de-la-montagne-saint-joseph-du-lac',true,null),
('Manigances – Brasserie d''Oka','Brewery','96 Rue Notre-Dame',null,'Oka','J0N 1E0',st_setsrid(st_makepoint(-74.0847,45.4625),4326)::geography,'Oka brewery with live shows, comedy and quiz nights.

Brasserie d''Oka avec spectacles, humour et soirées quiz.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','rock']::text[],'https://www.bieresmanigances.com','450 596-1515','showici','showici:manigances-brasserie-d-oka-oka',true,null),
('Brasserie Wilsy','Brewery','4600 Route 344',null,'Saint-Placide','J0V 2B0',st_setsrid(st_makepoint(-74.252,45.5357),4326)::geography,'Riverside brewery with live music on its terrace.

Brasserie au bord de l''eau avec musique live sur sa terrasse.',array['Solo / duo','Bands']::text[],array['folk','country']::text[],'https://www.wilsy.ca','438 887-3350','showici','showici:brasserie-wilsy-saint-placide',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
