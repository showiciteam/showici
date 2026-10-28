-- ShowIci: unclaimed venues in Sherbrooke and the Eastern Townships (Estrie). Public sources (venue sites, Tourisme Cantons-de-l'Est, Le Point de Vente, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('La Petite Boîte Noire','Event hall','58 Rue Meadow','Centre-ville','Sherbrooke','J1H 1M8',st_setsrid(st_makepoint(-71.89069,45.40341),4326)::geography,'Intimate downtown Sherbrooke venue for alternative music and local and emerging artists, plus comedy, storytelling and literary nights.

Petite salle intime du centre-ville de Sherbrooke consacrée à la musique alternative et aux artistes locaux et émergents, avec aussi de l''humour, du conte et des soirées littéraires.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['indie','alternative','folk']::text[],'https://lapetiteboitenoire.com','819 300-2353','showici','showici:la-petite-boite-noire-sherbrooke',true,null),
('Le Murdoch','Bar','180 Rue Galt Ouest','Centre-ville','Sherbrooke','J1H 1X9',st_setsrid(st_makepoint(-71.88753,45.39362),4326)::geography,'Sherbrooke rock bar and stage known for punk, metal and tribute-band nights.

Bar rock de Sherbrooke reconnu pour ses soirées punk, métal et ses spectacles hommage.',array['Bands']::text[],array['rock','punk','metal']::text[],null,null,'showici','showici:le-murdoch-sherbrooke',true,null),
('Le Boq (Boquébière)','Brewery','50 Rue Wellington Nord','Centre-ville','Sherbrooke','J1H 5B7',st_setsrid(st_makepoint(-71.89045,45.40237),4326)::geography,'Downtown microbrewery and show venue with a weekly jazz jam, DJ nights, comedy, improv, karaoke and concerts.

Microbrasserie et salle de spectacle du centre-ville avec jam jazz hebdomadaire, soirées DJ, humour, impro, karaoké et concerts.',array['Bands','DJs','Stand-up comedy','Trivia / karaoke hosts']::text[],array['jazz','electronic','rock']::text[],'https://boquebiere.com','819 542-1311','showici','showici:le-boq-boquebiere-sherbrooke',true,null),
('Siboire Dépôt','Brewery','80 Rue du Dépôt','Centre-ville','Sherbrooke','J1H 5G1',st_setsrid(st_makepoint(-71.88838,45.40049),4326)::geography,'Sherbrooke''s flagship craft brewpub in the old train station, which has hosted comedy nights and events.

Brasserie artisanale phare de Sherbrooke, dans l''ancienne gare, qui a accueilli des soirées d''humour et des événements.',array['Stand-up comedy','Solo / duo']::text[],array['folk','pop']::text[],'https://siboire.ca',null,'showici','showici:siboire-depot-sherbrooke',true,null),
('Siboire Jacques-Cartier','Brewery','40 Boulevard Jacques-Cartier Sud',null,'Sherbrooke','J1J 2Z2',st_setsrid(st_makepoint(-71.91832,45.39788),4326)::geography,'Siboire''s second Sherbrooke brewpub, near Lac des Nations, with a large terrace.

Deuxième broue-pub Siboire à Sherbrooke, près du lac des Nations, avec grande terrasse.',array['Solo / duo']::text[],array['folk','pop']::text[],'https://siboire.ca',null,'showici','showici:siboire-jacques-cartier-sherbrooke',true,null),
('La Mare au Diable','Brewery','151 Rue King Ouest','Centre-ville','Sherbrooke','J1H 1P4',st_setsrid(st_makepoint(-71.89165,45.40097),4326)::geography,'Downtown Sherbrooke brewpub on King Street, a long-time gathering spot for craft beer fans.

Broue-pub du centre-ville de Sherbrooke sur la rue King, rendez-vous de longue date des amateurs de bière artisanale.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://lamareaudiable.ca',null,'showici','showici:la-mare-au-diable-sherbrooke',true,null),
('Le Refuge des Brasseurs','Brewery','2155 Rue Galt Ouest',null,'Sherbrooke','J1K 1K3',st_setsrid(st_makepoint(-71.92595,45.38718),4326)::geography,'Neighbourhood microbrewery and pub in west Sherbrooke.

Microbrasserie et pub de quartier dans l''ouest de Sherbrooke.',array['Solo / duo']::text[],array['folk','rock']::text[],'https://refugedesbrasseurs.ca',null,'showici','showici:le-refuge-des-brasseurs-sherbrooke',true,null),
('Golden Lion Pub & Brewery','Pub','6 Rue College','Lennoxville','Sherbrooke','J1M 1T4',st_setsrid(st_makepoint(-71.88497,45.36437),4326)::geography,'Lennoxville''s landmark pub and Quebec''s oldest craft brewery, a favourite of Bishop''s students with live bands.

Pub emblématique de Lennoxville et plus ancienne microbrasserie du Québec, populaire auprès des étudiants de Bishop''s, avec groupes en spectacle.',array['Bands','Solo / duo']::text[],array['rock','folk','blues']::text[],null,null,'showici','showici:golden-lion-pub-brewery-sherbrooke',true,null),
('The Gait (Bishop''s Arches Brewery Pub)','Pub','2600 Rue College','Lennoxville','Sherbrooke','J1M 1Z7',st_setsrid(st_makepoint(-71.84136,45.36123),4326)::geography,'Campus pub at Bishop''s University, home of the Bishop''s Arches brewery, with DJ nights and student events.

Pub du campus de l''Université Bishop''s, maison de la brasserie Bishop''s Arches, avec soirées DJ et événements étudiants.',array['DJs','Bands']::text[],array['pop','rock']::text[],null,null,'showici','showici:the-gait-bishop-s-arches-brewery-pub-sherbrooke',true,null),
('La P''tite Grenouille','Bar','154 Rue Wellington Sud','Centre-ville','Sherbrooke','J1H 5C7',st_setsrid(st_makepoint(-71.88849,45.399),4326)::geography,'Boîte à chansons in downtown Sherbrooke with chansonniers Thursday to Saturday and a festive sing-along crowd.

Boîte à chansons du centre-ville de Sherbrooke avec chansonniers du jeudi au samedi et une foule festive.',array['Solo / duo']::text[],array['Québec francophone','pop','rock']::text[],'https://laptitegrenouille.ca',null,'showici','showici:la-p-tite-grenouille-sherbrooke',true,null),
('Resto Bar Le Figaro','Bar','1863 Rue Galt Est',null,'Sherbrooke','J1G 3H6',st_setsrid(st_makepoint(-71.85286,45.4058),4326)::geography,'Country-rock resto-bar in east Sherbrooke with shows and karaoke nights.

Resto-bar country rock de l''est de Sherbrooke avec spectacles et soirées karaoké.',array['Solo / duo','Trivia / karaoke hosts']::text[],array['country','rock']::text[],'https://www.lefigaro.ca',null,'showici','showici:resto-bar-le-figaro-sherbrooke',true,null),
('OMG Resto','Restaurant','1175 Rue King Ouest',null,'Sherbrooke','J1H 1S6',st_setsrid(st_makepoint(-71.90675,45.39918),4326)::geography,'Sherbrooke restaurant that hosts special shows several times a year, including comedy work-in-progress nights.

Restaurant de Sherbrooke qui présente des spectacles spéciaux plusieurs fois par année, dont des rodages d''humour.',array['Stand-up comedy','Solo / duo']::text[],array['pop']::text[],'https://omgresto.com','819 823-7001','showici','showici:omg-resto-sherbrooke',true,null),
('Resto Bar Chez Stanley','Bar','1180 Rue King Est',null,'Sherbrooke','J1G 1E4',st_setsrid(st_makepoint(-71.86267,45.40802),4326)::geography,'East-end Sherbrooke resto-bar with chansonniers and events.

Resto-bar de l''est de Sherbrooke avec chansonniers et événements.',array['Solo / duo']::text[],array['Québec francophone','pop','rock']::text[],'https://restobarchezstanley.com',null,'showici','showici:resto-bar-chez-stanley-sherbrooke',true,null),
('Pub La Cachette','Pub','4270 Rue Bertrand-Fabi',null,'Sherbrooke','J1N 1X6',st_setsrid(st_makepoint(-71.96299,45.38107),4326)::geography,'Neighbourhood pub in west Sherbrooke with chansonnier nights.

Pub de quartier dans l''ouest de Sherbrooke avec soirées chansonniers.',array['Solo / duo']::text[],array['pop','rock']::text[],null,null,'showici','showici:pub-la-cachette-sherbrooke',true,null),
('Bar Honky Tonk','Bar','128 Rue Wellington Sud','Centre-ville','Sherbrooke','J1H 5C7',st_setsrid(st_makepoint(-71.88899,45.39954),4326)::geography,'Western dive bar in downtown Sherbrooke with live music and line dancing.

Dive bar western du centre-ville de Sherbrooke avec musique live et danse en ligne.',array['Bands','Solo / duo']::text[],array['country','rock']::text[],null,null,'showici','showici:bar-honky-tonk-sherbrooke',true,null),
('Le Circa Lounge','Club','128 Rue Wellington Sud','Centre-ville','Sherbrooke','J1H 5C7',st_setsrid(st_makepoint(-71.88899,45.39954),4326)::geography,'Downtown Sherbrooke lounge with DJ nights Thursday to Saturday.

Lounge du centre-ville de Sherbrooke avec soirées DJ du jeudi au samedi.',array['DJs']::text[],array['electronic','hip-hop','pop']::text[],null,null,'showici','showici:le-circa-lounge-sherbrooke',true,null),
('Pub Willard','Pub','1600 Rue Denault',null,'Sherbrooke','J1H 2R2',st_setsrid(st_makepoint(-71.9143,45.3887),4326)::geography,'Sherbrooke neighbourhood pub with evening entertainment.

Pub de quartier de Sherbrooke avec divertissement en soirée.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],null,null,'showici','showici:pub-willard-sherbrooke',true,null),
('Espace Muzeau','Other','58 Rue Wellington Nord','Centre-ville','Sherbrooke','J1H 5B7',st_setsrid(st_makepoint(-71.89072,45.40241),4326)::geography,'Small downtown Sherbrooke space presenting intimate concerts and experimental music.

Petit espace du centre-ville de Sherbrooke qui présente des concerts intimes et de la musique expérimentale.',array['Bands','Solo / duo']::text[],array['experimental','jazz','folk']::text[],'https://espacemuzeau.github.io',null,'showici','showici:espace-muzeau-sherbrooke',true,null),
('Théâtre Granada','Event hall','53 Rue Wellington Nord','Centre-ville','Sherbrooke','J1H 5A9',st_setsrid(st_makepoint(-71.89107,45.40229),4326)::geography,'Historic 1929 theatre on Wellington Street presenting concerts and comedy.

Théâtre historique de 1929 sur la rue Wellington qui présente concerts et humour.',array['Bands','Stand-up comedy','Solo / duo']::text[],array['rock','pop','Québec francophone']::text[],'https://theatregranada.com','819 565-5656','showici','showici:theatre-granada-sherbrooke',true,null),
('La Confrérie Artisans Brasseurs','Brewery','3570 Rue Rousseau',null,'Sherbrooke','J1L 2E1',st_setsrid(st_makepoint(-71.95259,45.40862),4326)::geography,'Sherbrooke craft brewery with a taproom.

Microbrasserie artisanale de Sherbrooke avec salon de dégustation.',array['Solo / duo']::text[],array['folk','rock']::text[],'https://confreriebrasseurs.com',null,'showici','showici:la-confrerie-artisans-brasseurs-sherbrooke',true,null),
('La Buvette du Centro','Bar','117 Rue Wellington Nord','Centre-ville','Sherbrooke','J1H 5B9',st_setsrid(st_makepoint(-71.89181,45.40316),4326)::geography,'Downtown Wellington Street bistro-bar.

Bistro-bar de la rue Wellington, au centre-ville.',array['Solo / duo','DJs']::text[],array['pop','indie']::text[],'https://labuvette.ca',null,'showici','showici:la-buvette-du-centro-sherbrooke',true,null),
('Salle Maurice-O''Bready','Event hall','2500 Boulevard de l''Université',null,'Sherbrooke','J1K 2R1',st_setsrid(st_makepoint(-71.94027,45.37677),4326)::geography,'The Université de Sherbrooke cultural centre''s main hall, presenting touring concerts, comedy and theatre.

Salle principale du Centre culturel de l''Université de Sherbrooke, qui présente concerts, humour et théâtre en tournée.',array['Bands','Stand-up comedy','Solo / duo']::text[],array['pop','Québec francophone','classical']::text[],'https://www.centrecultureludes.ca',null,'showici','showici:salle-maurice-o-bready-sherbrooke',true,null),
('PMF Boîte de nuit','Club','184 Ruelle Whiting','Centre-ville','Sherbrooke','J1H 5W1',st_setsrid(st_makepoint(-71.89175,45.40434),4326)::geography,'Downtown Sherbrooke nightclub and show venue with DJ nights, themed parties and guest artists.

Boîte de nuit et salle de spectacle du centre-ville de Sherbrooke avec soirées DJ, soirées thématiques et artistes invités.',array['DJs','Bands']::text[],array['electronic','hip-hop','pop']::text[],null,null,'showici','showici:pmf-boite-de-nuit-sherbrooke',true,null),
('Vieux Clocher de Magog','Event hall','64 Rue Merry Nord',null,'Magog','J1X 2E6',st_setsrid(st_makepoint(-72.15525,45.26746),4326)::geography,'Renowned Magog theatre in a former church, a key stop for Québec comedians'' run-in shows and touring singers.

Salle réputée de Magog dans une ancienne église, arrêt incontournable des rodages d''humoristes et des tournées de chanteurs.',array['Stand-up comedy','Bands','Solo / duo']::text[],array['Québec francophone','pop','folk']::text[],'https://vieuxclocher.com','819 847-0470','showici','showici:vieux-clocher-de-magog-magog',true,null),
('Microbrasserie La Memphré','Brewery','12 Rue Merry Sud',null,'Magog','J1X 3K9',st_setsrid(st_makepoint(-72.15533,45.26625),4326)::geography,'Magog''s original brewpub on Merry Street.

Broue-pub pionnier de Magog, rue Merry.',array['Solo / duo']::text[],array['folk','rock']::text[],'https://microbrasserielamemphre.com','819 843-3405','showici','showici:microbrasserie-la-memphre-magog',true,null),
('Des Cantons Microbrasserie','Brewery','20 Rue Merry Sud',null,'Magog','J1X 3N2',st_setsrid(st_makepoint(-72.15552,45.26518),4326)::geography,'Craft brewery and pub in downtown Magog.

Microbrasserie et pub au centre-ville de Magog.',array['Solo / duo']::text[],array['folk','rock']::text[],'https://microbrasseriedescantons.com',null,'showici','showici:des-cantons-microbrasserie-magog',true,null),
('Pub le Chalet','Pub','125 Rue Plage des Cantons',null,'Magog','J1X 0M4',st_setsrid(st_makepoint(-72.17586,45.2716),4326)::geography,'Lakeside pub on Lake Memphrémagog with regular events.

Pub au bord du lac Memphrémagog avec événements réguliers.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],'https://publechalet.com',null,'showici','showici:pub-le-chalet-magog',true,null),
('Liquor Store Resto Club','Club','276 Rue Principale Ouest',null,'Magog','J1X 2A5',st_setsrid(st_makepoint(-72.15091,45.26544),4326)::geography,'Magog resto-club with live bands on the terrace and DJs on its dance floor at night.

Resto-club de Magog avec groupes live sur la terrasse et DJ sur la piste de danse en soirée.',array['Bands','DJs']::text[],array['rock','pop','electronic']::text[],'https://liquorstoremagog.ca','819 868-4279','showici','showici:liquor-store-resto-club-magog',true,null),
('Café St-Michel','Bar','503 Rue Principale Ouest',null,'Magog','J1X 2B2',st_setsrid(st_makepoint(-72.15519,45.26672),4326)::geography,'Magog bar with a regular programme of shows.

Bar de Magog avec une programmation régulière de spectacles.',array['Solo / duo','Bands']::text[],array['rock','pop','Québec francophone']::text[],'https://cafestmichel.com',null,'showici','showici:cafe-st-michel-magog',true,null),
('Pilsen Restaurant & Pub','Pub','55 Rue Main',null,'North Hatley','J0B 2C0',st_setsrid(st_makepoint(-71.97314,45.27616),4326)::geography,'Waterfront pub on Lake Massawippi in the village of North Hatley.

Pub au bord du lac Massawippi, au cœur du village de North Hatley.',array['Solo / duo']::text[],array['folk','blues']::text[],'https://pilsen.ca',null,'showici','showici:pilsen-restaurant-pub-north-hatley',true,null),
('La Cie Vilandre','Brewery','3050 Chemin Capelton',null,'North Hatley','J0B 2C0',st_setsrid(st_makepoint(-71.97387,45.27838),4326)::geography,'Microbrewery and pub near North Hatley.

Microbrasserie et pub près de North Hatley.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://lacievilandre.com',null,'showici','showici:la-cie-vilandre-north-hatley',true,null),
('Pavillon des arts et de la culture de Coaticook','Event hall','116 Rue Wellington',null,'Coaticook','J1A 2H7',st_setsrid(st_makepoint(-71.80376,45.13389),4326)::geography,'Coaticook''s performing arts centre presenting concerts, café-concerts and comedy.

Diffuseur de Coaticook qui présente concerts, cafés-concerts et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Québec francophone','folk','pop']::text[],'https://pavilloncoaticook.com','819 849-6371','showici','showici:pavillon-des-arts-et-de-la-culture-de-coaticook-coaticook',true,null),
('Microbrasserie Coaticook (Hop Station)','Brewery','1007 Rue Child',null,'Coaticook','J1A 2S5',st_setsrid(st_makepoint(-71.80031,45.15702),4326)::geography,'Coaticook brewpub that hosts concerts, some co-presented with the Pavillon des arts.

Broue-pub de Coaticook qui accueille des concerts, certains présentés avec le Pavillon des arts.',array['Bands','Solo / duo']::text[],array['rock','metal','folk']::text[],'https://microbrasseriecoaticook.ca',null,'showici','showici:microbrasserie-coaticook-hop-station-coaticook',true,null),
('La Knowlton Co','Brewery','576 Chemin Knowlton','Knowlton','Lac-Brome','J0E 1V0',st_setsrid(st_makepoint(-72.53925,45.21285),4326)::geography,'Microbrewery and restaurant in Knowlton.

Microbrasserie et restaurant à Knowlton.',array['Solo / duo']::text[],array['folk','rock']::text[],'https://laknowltonco.com',null,'showici','showici:la-knowlton-co-lac-brome',true,null),
('Théâtre Lac-Brome','Event hall','9 Chemin du Mont-Echo','Knowlton','Lac-Brome','J0E 1V0',st_setsrid(st_makepoint(-72.51061,45.21615),4326)::geography,'Bilingual theatre in Knowlton presenting concerts, comedy and theatre year-round.

Théâtre bilingue de Knowlton qui présente concerts, humour et théâtre toute l''année.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['folk','jazz','pop']::text[],'https://theatrelacbrome.ca','450 242-2270','showici','showici:theatre-lac-brome-lac-brome',true,null),
('L''Ardoise – Coopérative brassicole','Brewery','445 Rue Principale Nord',null,'Richmond','J0B 2H0',st_setsrid(st_makepoint(-72.14381,45.66233),4326)::geography,'Co-op brewpub in Richmond that hosts concert series.

Coopérative brassicole de Richmond qui présente des séries de concerts.',array['Bands','Solo / duo']::text[],array['folk','rock']::text[],null,null,'showici','showici:l-ardoise-cooperative-brassicole-richmond',true,null),
('Bistro Brandy Creek','Restaurant','713 Rue St-Joseph',null,'Valcourt','J0E 2L0',st_setsrid(st_makepoint(-72.31517,45.49994),4326)::geography,'Valcourt bistro with a chansonnier series every other Friday.

Bistro de Valcourt avec une série de chansonniers un vendredi sur deux.',array['Solo / duo']::text[],array['Québec francophone','pop']::text[],'https://brandycreek.ca',null,'showici','showici:bistro-brandy-creek-valcourt',true,null),
('Le P''tit Bonheur de Saint-Camille','Event hall','162 Rue Miquelon',null,'Saint-Camille','J0A 1G0',st_setsrid(st_makepoint(-71.70373,45.68365),4326)::geography,'Celebrated rural cultural centre and café in Saint-Camille presenting concerts and shows.

Centre culturel rural réputé de Saint-Camille, avec café, qui présente concerts et spectacles.',array['Bands','Solo / duo']::text[],array['folk','Québec francophone','jazz']::text[],'https://ptitbonheur.org',null,'showici','showici:le-p-tit-bonheur-de-saint-camille-saint-camille',true,null),
('Sissi Buvette','Bar','5140 Rue Foster',null,'Waterloo','J0E 2N0',st_setsrid(st_makepoint(-72.51663,45.34562),4326)::geography,'Buvette at Au Loup in Waterloo with regular live music evenings.

Buvette du Au Loup à Waterloo avec soirées de musique live régulières.',array['Solo / duo','Bands']::text[],array['folk','jazz','indie']::text[],null,null,'showici','showici:sissi-buvette-waterloo',true,null),
('Madame Fortin – Bière & Bouffe','Restaurant','4920 Rue Foster',null,'Waterloo','J0E 2N0',st_setsrid(st_makepoint(-72.51604,45.34399),4326)::geography,'Waterloo beer bistro with acoustic live music every Sunday.

Bistro bière de Waterloo avec musique acoustique tous les dimanches.',array['Solo / duo']::text[],array['folk','pop']::text[],'https://madamefortin.ca',null,'showici','showici:madame-fortin-biere-bouffe-waterloo',true,null),
('Cabaret Eastman','Event hall','4 Chemin George-Bonnallie',null,'Eastman','J0E 1P0',st_setsrid(st_makepoint(-72.30481,45.30238),4326)::geography,'Cabaret-style venue in Eastman presenting concerts and comedy.

Salle de type cabaret à Eastman qui présente concerts et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Québec francophone','folk','pop']::text[],null,null,'showici','showici:cabaret-eastman-eastman',true,null),
('Brasserie 11 Comtés','Brewery','225 Rue Pope',null,'Cookshire-Eaton','J0B 1M0',st_setsrid(st_makepoint(-71.63361,45.40965),4326)::geography,'Craft brewery and taproom in Cookshire-Eaton.

Brasserie artisanale et salon de dégustation à Cookshire-Eaton.',array['Solo / duo']::text[],array['folk','rock']::text[],null,null,'showici','showici:brasserie-11-comtes-cookshire-eaton',true,null),
('Rock Island Bar Cafino','Bar','240 Rue Dufferin','Rock Island','Stanstead','J0B 3E2',st_setsrid(st_makepoint(-72.09849,45.00711),4326)::geography,'Border-town bar in Stanstead''s Rock Island sector.

Bar du secteur Rock Island à Stanstead, à la frontière.',array['Bands','Solo / duo']::text[],array['rock','country']::text[],null,null,'showici','showici:rock-island-bar-cafino-stanstead',true,null),
('Resto Bar Rive Sud','Bar','150 Rue Angus Sud',null,'East Angus','J0B 1R0',st_setsrid(st_makepoint(-71.66645,45.47522),4326)::geography,'East Angus resto-bar with regular show nights.

Resto-bar d''East Angus avec soirées spectacles régulières.',array['Bands','Solo / duo']::text[],array['rock','country','Québec francophone']::text[],'https://resto-bar-rive-sud.ca','819 832-4555','showici','showici:resto-bar-rive-sud-east-angus',true,null),
('Auberge Sutton Brouërie','Brewery','27 Rue Principale Sud',null,'Sutton','J0E 2K0',st_setsrid(st_makepoint(-72.6153,45.10529),4326)::geography,'Brewpub and inn in the village of Sutton that has hosted jazz nights.

Brouërie et auberge au cœur du village de Sutton qui a accueilli des soirées jazz.',array['Solo / duo','Bands']::text[],array['jazz','folk']::text[],'https://aubergesuttonbrouerie.com','450 538-0005','showici','showici:auberge-sutton-brouerie-sutton',true,null),
('Bistro-bar La Débarque','Bar','150 Rue Champlain',null,'Bromont','J2L 1A2',st_setsrid(st_makepoint(-72.63919,45.30169),4326)::geography,'Après-ski bistro-bar at the foot of Mont Bromont with outdoor concerts.

Bistro-bar après-ski au pied du mont Bromont avec concerts extérieurs.',array['Bands','DJs']::text[],array['indie','pop']::text[],null,null,'showici','showici:bistro-bar-la-debarque-bromont',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
