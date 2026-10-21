-- ShowIci: second batch of unclaimed venues (Montréal, Laval, South Shore, North Shore). Public sources; OpenStreetMap data © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Le Baratineur','Restaurant','341 rue Saint-Charles Ouest','Vieux-Longueuil','Longueuil','J4K 0B7',st_setsrid(st_makepoint(-73.51959,45.52309),4326)::geography,'Bistro and cocktail bar with a comedy club room that hosts French-language stand-up nights, special comedy shows and open mics.

Bistro et bar à cocktails avec une salle de comédie club qui présente des soirées d''humour en français, des spectacles spéciaux et des open mics.',array['Stand-up comedy']::text[],array['Comedy','Open mic']::text[],null,null,'showici','showici:le-baratineur-longueuil',true,null),
('Joe Pub','Pub','3267 Grande Allée','Saint-Hubert','Longueuil','J4T 1V2',st_setsrid(st_makepoint(-73.47660,45.49731),4326)::geography,'Neighbourhood pub that hosts ticketed live band nights, including rock and metal tribute shows.

Pub de quartier qui présente des soirées de groupes en spectacle, dont des hommages rock et métal.',array['Bands']::text[],array['Rock','Metal','Tribute']::text[],null,null,'showici','osm:w755175603',true,null),
('Le Barrage – Brasseurs','Brewery','4200 chemin de la Savane','Saint-Hubert','Longueuil','J3Y 9G4',st_setsrid(st_makepoint(-73.43227,45.51275),4326)::geography,'Brewpub that hosts free acoustic music nights and comedy nights.

Broue-pub qui présente des soirées de musique acoustique gratuites et des soirées d''humour.',array['Solo / duo','Stand-up comedy']::text[],array['Acoustic','Comedy']::text[],null,null,'showici','osm:n11463662596',true,null),
('Le Balthazar DIX30','Pub','9180 boulevard Leduc','Quartier DIX30','Brossard','J4Y 0N7',st_setsrid(st_makepoint(-73.43735,45.44651),4326)::geography,'Craft beer pub in Quartier DIX30 that features live bands and DJs, and hosts ticketed comedy nights.

Pub de bières de microbrasserie du Quartier DIX30 qui accueille des groupes live et des DJ, ainsi que des soirées d''humour.',array['Bands','DJs','Stand-up comedy']::text[],array['Pop rock','Comedy']::text[],null,null,'showici','osm:w451114487',true,null),
('McKibbin''s Irish Pub DIX30','Pub','1705 avenue des Lumières','Quartier DIX30','Brossard','J4Y 0A5',st_setsrid(st_makepoint(-73.43886,45.44249),4326)::geography,'Irish pub in Quartier DIX30 listed by the local restaurant guide as offering live music.

Pub irlandais du Quartier DIX30 répertorié par le guide local des restaurants comme offrant de la musique live.',array['Bands','Solo / duo']::text[],array['Irish','Pub rock']::text[],'https://www.mckibbinsirishpub.com',null,'showici','osm:n3020376727',true,null),
('Jack Saloon DIX30','Bar','1720 avenue des Lumières','Quartier DIX30','Brossard','J4Y 0B3',st_setsrid(st_makepoint(-73.43931,45.44165),4326)::geography,'Saloon-style bar and grill in Quartier DIX30 that features DJs and live bands.

Bar-grill style saloon au Quartier DIX30 qui présente des DJ et des groupes live.',array['Bands','DJs']::text[],array['Country','Rock']::text[],null,null,'showici','osm:n3020376722',true,null),
('Bar Les Cousins','Bar','1020 rue du Lux','Brossard','Brossard','J4W 1G3',st_setsrid(st_makepoint(-73.48451,45.46959),4326)::geography,'Bar in Quartier DIX30 listed by the local restaurant guide as offering live music on select evenings.

Bar du Quartier DIX30 répertorié par le guide local des restaurants comme offrant de la musique live certains soirs.',array['Bands','Solo / duo']::text[],array['Live music']::text[],null,null,'showici','showici:bar-les-cousins-brossard',true,null),
('Le Célébrité','Bar','8095 boulevard Taschereau','Brossard','Brossard','J4Y 1A4',st_setsrid(st_makepoint(-73.46793,45.44919),4326)::geography,'Bar on boulevard Taschereau that presents live entertainment by local performers.

Bar du boulevard Taschereau qui présente des spectacles d''artistes de la région.',array['Solo / duo']::text[],array['Variety','Pop']::text[],null,null,'showici','osm:n2504941156',true,null),
('Don Frank Resto Bar','Restaurant','1155 boulevard de Rome','Brossard','Brossard','J4X 1X2',st_setsrid(st_makepoint(-73.49130,45.45691),4326)::geography,'Resto-bar listed by the local restaurant guide for its live salsa music nights.

Resto-bar répertorié par le guide local des restaurants pour ses soirées de salsa en musique live.',array['Bands']::text[],array['Salsa','Latin']::text[],null,null,'showici','showici:don-frank-resto-bar-brossard',true,null),
('La Nuit Shanghai','Club','105 promenade des Lanternes','Quartier DIX30','Brossard','J4Y 0L2',st_setsrid(st_makepoint(-73.43702,45.44696),4326)::geography,'1920s Shanghai-themed supper club and cabaret presenting burlesque and live musical shows.

Souper-spectacle et cabaret sur le thème du Shanghai des années 1920, avec spectacles burlesques et musicaux live.',array['Bands','Solo / duo']::text[],array['Cabaret','Burlesque']::text[],null,null,'showici','showici:la-nuit-shanghai-brossard',true,null),
('Café Ramses','Café','8500 boulevard Taschereau','Brossard','Brossard','J4X 1S2',st_setsrid(st_makepoint(-73.47338,45.44377),4326)::geography,'Café listed by the local restaurant guide as hosting live music and DJ nights.

Café répertorié par le guide local des restaurants pour ses soirées de musique live et de DJ.',array['Bands','DJs']::text[],array['Live music','DJ']::text[],null,null,'showici','osm:n8382143043',true,null),
('Pub Le Vieux','Pub','650 boulevard du Fort-Saint-Louis','Boucherville','Boucherville','J4B 1S9',st_setsrid(st_makepoint(-73.45088,45.61430),4326)::geography,'Resto-pub that hosts music shows, mostly rock tribute bands, along with themed nights and karaoke.

Resto-pub qui présente des spectacles de musique, surtout des hommages rock, en plus de soirées thématiques et de karaoké.',array['Bands']::text[],array['Rock','Tribute']::text[],null,null,'showici','showici:pub-le-vieux-boucherville',true,null),
('La Cage – Boucherville','Bar','1180 place Nobel','Boucherville','Boucherville','J4B 5L2',st_setsrid(st_makepoint(-73.44667,45.57109),4326)::geography,'Sports bar that has hosted ticketed stand-up comedy cabaret nights with dinner service.

Brasserie sportive qui a présenté des cabarets d''humour avec souper, sur billets.',array['Stand-up comedy']::text[],array['Comedy']::text[],null,null,'showici','osm:n8253410028',true,null),
('Bar 1250','Bar','1250 rue Roberval','Saint-Bruno-de-Montarville','Saint-Bruno-de-Montarville','J3V 5J2',st_setsrid(st_makepoint(-73.34630,45.52843),4326)::geography,'Bar that hosts ticketed live band nights, including hard rock and metal tribute shows.

Bar qui présente des soirées de groupes live, dont des hommages hard rock et métal.',array['Bands']::text[],array['Hard rock','Metal','Tribute']::text[],null,null,'showici','osm:n6713340884',true,null),
('Abreuvoir 132','Bar','1627 route 132','Varennes','Varennes','J3X 1P7',st_setsrid(st_makepoint(-73.41950,45.65577),4326)::geography,'Neighbourhood bar and show venue presenting rock, blues, country and tribute acts, an open jam night and stand-up comedy.

Bar de quartier et salle de spectacles qui présente du rock, du blues, du country, des hommages, un jam ouvert et de l''humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Rock','Blues','Country']::text[],null,null,'showici','showici:abreuvoir-132-varennes',true,null),
('Délires & Délices','Brewery','1626 rue Bourgogne','Chambly','Chambly','J3L 2Y7',st_setsrid(st_makepoint(-73.28785,45.44824),4326)::geography,'Microbrewery with an upstairs hall hosting concerts, tribute shows, comedy and drag nights.

Microbrasserie avec une salle à l''étage qui accueille concerts, hommages, humour et soirées drag.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Blues','Tribute','Comedy']::text[],null,null,'showici','showici:delires-delices-chambly',true,null),
('Vieux Bourgogne','Bar','1718 avenue Bourgogne','Chambly','Chambly','J3L 1Y8',st_setsrid(st_makepoint(-73.28482,45.44727),4326)::geography,'Bistro-bar with billiards that hosts live bands, DJ sets and karaoke.

Bistro-bar avec billards qui accueille des groupes live, des DJ et du karaoké.',array['Bands','DJs']::text[],array['Pop rock','DJ']::text[],null,null,'showici','osm:n2948706065',true,null),
('La Boîte – Spectacles et événements','Event hall','35 rue Saint-Jacques','Vieux-Saint-Jean','Saint-Jean-sur-Richelieu','J3B 2J6',st_setsrid(st_makepoint(-73.25172,45.30615),4326)::geography,'Small events venue presenting music tributes, live rock nights and stand-up comedy shows.

Petite salle d''événements qui présente des hommages musicaux, des soirées rock live et des spectacles d''humour.',array['Bands','Stand-up comedy']::text[],array['Tribute','Rock','Comedy']::text[],null,null,'showici','showici:la-boite-spectacles-et-evenements-saint-jean-sur-richelieu',true,null),
('Taverne la Soif','Bar','144 rue Richelieu','Vieux-Saint-Jean','Saint-Jean-sur-Richelieu','J3B 6V5',st_setsrid(st_makepoint(-73.25092,45.30505),4326)::geography,'Tavern on rue Richelieu that hosts ticketed live punk and rock shows.

Taverne de la rue Richelieu qui présente des spectacles punk et rock sur billets.',array['Bands']::text[],array['Punk','Rock']::text[],null,null,'showici','showici:taverne-la-soif-saint-jean-sur-richelieu',true,null),
('Cabaret-Théâtre du Vieux-Saint-Jean','Event hall','190 rue Laurier','Vieux-Saint-Jean','Saint-Jean-sur-Richelieu','J3B 6K5',st_setsrid(st_makepoint(-73.25629,45.30600),4326)::geography,'Intimate cabaret-style hall with a bar, presenting music and comedy shows and spotlighting emerging artists.

Salle intime de style cabaret avec bar, qui présente musique et humour et met en valeur la relève.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['Chanson','Jazz','Comedy']::text[],null,null,'showici','showici:cabaret-theatre-du-vieux-saint-jean-saint-jean-sur-richelieu',true,null),
('BLVD Bar & Gril','Bar','100 rue Kepler','Châteauguay','Châteauguay','J6K 3A4',st_setsrid(st_makepoint(-73.71283,45.36058),4326)::geography,'Bar and grill with a regular calendar of local bands, acoustic duos, tribute acts and an English stand-up comedy night.

Bar-grill avec un calendrier régulier de groupes locaux, de duos acoustiques, d''hommages et une soirée d''humour en anglais.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Classic rock','Acoustic','Tribute']::text[],null,null,'showici','osm:n8094395623',true,null),
('Ye Olde Orchard Pub & Grill Châteauguay','Pub','66 boulevard de Salaberry','Châteauguay','Châteauguay','J6J 4J3',st_setsrid(st_makepoint(-73.75148,45.36916),4326)::geography,'Pub and grill that advertises weekly live music, plus karaoke nights.

Pub-grill qui annonce de la musique live chaque semaine, en plus de soirées karaoké.',array['Bands','Solo / duo']::text[],array['Pub rock']::text[],null,null,'showici','showici:ye-olde-orchard-pub-grill-chateauguay-chateauguay',true,null),
('Le St-Paul Taverne Moderne','Bar','345 boulevard Taschereau','La Prairie','La Prairie','J5R 1T7',st_setsrid(st_makepoint(-73.49012,45.41473),4326)::geography,'Modern tavern known for chansonnier performances that also hosts comedy gala nights.

Taverne moderne connue pour ses chansonniers, qui présente aussi des galas d''humour.',array['Solo / duo','Stand-up comedy']::text[],array['Chansonnier','Comedy']::text[],null,null,'showici','showici:le-st-paul-taverne-moderne-la-prairie',true,null),
('House of Jazz','Restaurant','1639 Boulevard de l''Avenir','Chomedey','Laval','H7S 2N5',st_setsrid(st_makepoint(-73.72633,45.56608),4326)::geography,'Dinner-show venue presenting a different live jazz show each evening, plus occasional comedy nights.

Resto-spectacle qui présente un spectacle de jazz différent chaque soir, ainsi que des soirées d''humour occasionnelles.',array['Bands','Stand-up comedy']::text[],array['Jazz','Blues']::text[],null,'450 669-3000','showici','osm:n11244714561',true,null),
('Les Insulaires Microbrasseurs','Brewery','275 Boulevard de la Concorde Est','Pont-Viau','Laval','H7G 3X6',st_setsrid(st_makepoint(-73.68099,45.57701),4326)::geography,'Neighbourhood microbrewery hosting a weekly comedy night, one-hour stand-up sets and DJ parties for special occasions.

Microbrasserie de quartier qui accueille une soirée d''humour hebdomadaire, des spectacles d''humour d''une heure et des partys avec DJ pour les occasions spéciales.',array['Stand-up comedy','DJs']::text[],array['Comedy']::text[],null,null,'showici','osm:n12514207332',true,null),
('Bistro Le Rossignol','Restaurant','5580 Boulevard des Rossignols','Sainte-Rose','Laval','H7L 5X9',st_setsrid(st_makepoint(-73.76810,45.58270),4326)::geography,'Bistro with varied live programming including country and rock acts, tribute shows and monthly comedy nights.

Bistro à la programmation variée : artistes country et rock, spectacles hommage et soirées d''humour mensuelles.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Rock','Country','Tribute']::text[],null,null,'showici','showici:bistro-le-rossignol-laval',true,null),
('Le Poutine Bar','Bar','4750 Boulevard Sainte-Rose','Fabreville','Laval','H7R 5P8',st_setsrid(st_makepoint(-73.86264,45.55932),4326)::geography,'Poutine bar that hosts live music shows, karaoke nights, comedy shows and stand-up open mics.

Bar à poutine qui présente des spectacles de musique, des soirées karaoké, des spectacles d''humour et des open mics d''humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Comedy','Pop']::text[],null,null,'showici','showici:le-poutine-bar-laval',true,null),
('Jack Saloon Laval','Bar','4745 Boulevard Dagenais Ouest','Fabreville','Laval','H7R 5G4',st_setsrid(st_makepoint(-73.85574,45.55295),4326)::geography,'Western-themed resto-bar featuring singers, live rock bands and DJs, along with line dancing and karaoke nights.

Resto-bar western qui présente des chanteurs, des groupes rock et des DJ, en plus de soirées de danse en ligne et de karaoké.',array['Bands','Solo / duo','DJs']::text[],array['Country','Rock']::text[],null,null,'showici','showici:jack-saloon-laval-laval',true,null),
('Le Balthazar Centropolis','Pub','195 Promenade du Centropolis','Chomedey','Laval','H7T 2Z6',st_setsrid(st_makepoint(-73.74567,45.56207),4326)::geography,'Resto-pub with a posted schedule of live bands, acoustic solo and duo acts, DJs and karaoke nights.

Resto-pub avec un calendrier de groupes, d''artistes acoustiques en solo ou en duo, de DJ et de soirées karaoké.',array['Bands','Solo / duo','DJs']::text[],array['Pop','Rock','Acoustic']::text[],null,null,'showici','osm:n5224015427',true,null),
('Le Cabaret New-Yorkais','Club','910 Boulevard Jarry','Chomedey','Laval','H7V 3N4',st_setsrid(st_makepoint(-73.74980,45.54062),4326)::geography,'Retro speakeasy-style cabaret with weekend live music, themed tribute shows and a resident house band.

Cabaret rétro de style speakeasy avec musique live la fin de semaine, spectacles hommage thématiques et un band maison.',array['Bands','Solo / duo']::text[],array['Jazz','Rock','Soul']::text[],null,null,'showici','showici:le-cabaret-new-yorkais-laval',true,null),
('Restaurant LouisiNANA','Restaurant','140 Promenade du Centropolis','Chomedey','Laval','H7T 2Z6',st_setsrid(st_makepoint(-73.74466,45.56203),4326)::geography,'New Orleans-themed restaurant known for live entertainment, including jazz and blues.

Restaurant à thème Nouvelle-Orléans reconnu pour ses divertissements en direct, dont du jazz et du blues.',array['Bands']::text[],array['Jazz','Blues']::text[],null,null,'showici','osm:n11108898225',true,null),
('Bar L''Étalon','Bar','3496 Boulevard Dagenais Ouest','Fabreville','Laval','H7P 4V9',st_setsrid(st_makepoint(-73.81013,45.57649),4326)::geography,'Neighbourhood bar hosting ticketed tribute-band shows and occasional stand-up comedy nights.

Bar de quartier qui présente des spectacles hommage avec billets et, à l''occasion, des soirées d''humour.',array['Bands','Stand-up comedy']::text[],array['Rock','Metal','Tribute']::text[],null,null,'showici','osm:n4638412029',true,null),
('Madame Bovary Laval','Bar','1780 Avenue Pierre-Péladeau','Chomedey','Laval','H7T 2Y8',st_setsrid(st_makepoint(-73.74271,45.56153),4326)::geography,'Centropolis bistro-bar hosting a monthly dance night featuring konpa, zouk, afro and salsa music.

Bistro-bar du Centropolis qui accueille une soirée dansante mensuelle aux sons du konpa, du zouk, de l''afro et de la salsa.',array['DJs']::text[],array['Konpa','Zouk','Afro']::text[],null,null,'showici','showici:madame-bovary-laval-laval',true,null),
('Brasserie Mille-Îles','Brewery','1065 Rue des Forges','Terrebonne','Terrebonne','J6Y 1V2',st_setsrid(st_makepoint(-73.75716,45.69307),4326)::geography,'Brewery hosting ticketed stand-up comedy nights with Quebec comedians and a host.

Brasserie qui présente des soirées d''humour avec billets, avec des humoristes québécois et un animateur.',array['Stand-up comedy']::text[],array['Comedy']::text[],null,null,'showici','showici:brasserie-mille-iles-terrebonne',true,null),
('Ruisseau Noir','Brewery','271 Boulevard des Braves','Terrebonne','Terrebonne','J6W 1K2',st_setsrid(st_makepoint(-73.63728,45.69424),4326)::geography,'Microbrewery hosting ticketed stand-up comedy nights with Quebec comedians and a host.

Microbrasserie qui accueille des soirées d''humour avec billets, avec des humoristes québécois et un animateur.',array['Stand-up comedy']::text[],array['Comedy']::text[],null,null,'showici','osm:n12208856595',true,null),
('Cabaret Transit','Club','115 Rue Saint-Louis','Vieux-Terrebonne','Terrebonne','J6W 1Z8',st_setsrid(st_makepoint(-73.62338,45.69538),4326)::geography,'Cabaret venue hosting ticketed multi-band concerts by independent groups.

Cabaret qui présente des concerts avec billets réunissant plusieurs groupes indépendants.',array['Bands']::text[],array['Rock','Alternative']::text[],null,null,'showici','osm:n12211722450',true,null),
('Salle Le 1928','Event hall','1928 Chemin Gascon','Terrebonne','Terrebonne','J6X 4E3',st_setsrid(st_makepoint(-73.65855,45.71934),4326)::geography,'Hall hosting a monthly comedy night with local comedians, a host, a DJ and a bar.

Salle qui accueille une soirée d''humour mensuelle avec humoristes de la région, animateur, DJ et bar.',array['Stand-up comedy','DJs']::text[],array['Comedy']::text[],null,null,'showici','showici:salle-le-1928-terrebonne',true,null),
('Salle Le Foutoir','Club','805 Rue Saint-Pierre','Vieux-Terrebonne','Terrebonne','J6W 1C7',st_setsrid(st_makepoint(-73.63552,45.69272),4326)::geography,'Comedy room hosting stand-up open mics for new talent, plus frequent comedian work-in-progress shows.

Salle d''humour qui présente des open mics pour découvrir la relève, ainsi que de nombreux spectacles en rodage.',array['Stand-up comedy']::text[],array['Comedy']::text[],null,null,'showici','osm:n12208875405',true,null),
('La Ripaille','Bar','358 Rue Notre-Dame','Repentigny','Repentigny','J6A 8L1',st_setsrid(st_makepoint(-73.45370,45.73224),4326)::geography,'Brasserie hosting ticketed live shows, including touring rock, blues and country acts and comedy performances.

Brasserie qui présente des spectacles avec billets, notamment des artistes rock, blues et country en tournée et des spectacles d''humour.',array['Bands','Stand-up comedy']::text[],array['Rock','Blues','Country']::text[],null,null,'showici','showici:la-ripaille-repentigny',true,null),
('Cabaret Billard Le Patriote','Club','215 Rue Saint-Laurent','Saint-Eustache','Saint-Eustache','J7P 2V2',st_setsrid(st_makepoint(-73.87784,45.57505),4326)::geography,'Billiard hall and cabaret presenting ticketed tribute bands, concerts and stand-up comedy shows.

Salle de billard et cabaret qui présente des spectacles hommage, des concerts et des spectacles d''humour avec billets.',array['Bands','Stand-up comedy']::text[],array['Rock','Tribute']::text[],null,null,'showici','osm:n5940078485',true,null),
('La petite église Cabaret Spectacle','Event hall','271 Rue Saint-Eustache','Saint-Eustache','Saint-Eustache','J7R 2L9',st_setsrid(st_makepoint(-73.89726,45.55849),4326)::geography,'Cabaret-style performance venue hosting ticketed concerts, including shows by singer-songwriters.

Salle de spectacle de style cabaret qui présente des concerts avec billets, dont des spectacles d''auteurs-compositeurs-interprètes.',array['Solo / duo','Bands']::text[],array['Pop','Singer-songwriter']::text[],'https://lapetiteeglise.com',null,'showici','osm:n11544413124',true,null),
('Archibald Blainville','Brewery','1345 Boulevard Michèle-Bohec','Blainville','Blainville','J7C 0Y4',st_setsrid(st_makepoint(-73.91026,45.67902),4326)::geography,'Microbrewery pub offering live music, including chansonniers and live bands.

Microbrasserie qui propose de la musique live, avec des chansonniers et des groupes.',array['Bands','Solo / duo']::text[],array['Chansonnier','Pop','Rock']::text[],null,null,'showici','osm:w854350890',true,null),
('Le Balthazar Faubourg Boisbriand','Pub','2915 Promenade Saint-Antoine','Boisbriand','Boisbriand','J7H 0A2',st_setsrid(st_makepoint(-73.84830,45.62891),4326)::geography,'Resto-pub offering live bands, acoustic sets, karaoke, DJs and occasional comedy nights.

Resto-pub qui propose des groupes, des prestations acoustiques, du karaoké, des DJ et, à l''occasion, des soirées d''humour.',array['Bands','Solo / duo','DJs','Stand-up comedy']::text[],array['Pop','Rock','Acoustic']::text[],null,null,'showici','osm:n12052874129',true,null),
('La Toscadura','Event hall','4388 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Z5',st_setsrid(st_makepoint(-73.58491,45.51925),4326)::geography,'Former Spanish social club of about 300 capacity hosting DIY and punk shows, early-career artists, community events and themed parties.

Ancien club social espagnol d''environ 300 places qui accueille des spectacles DIY et punk, des artistes de la relève, des événements communautaires et des soirées thématiques.',array['Bands','DJs']::text[],array['Punk','Indie']::text[],null,null,'showici','showici:la-toscadura-montreal',true,null),
('P''tit Ours','Bar','5589 Avenue du Parc','Mile End','Montréal','H2V 4S8',st_setsrid(st_makepoint(-73.60270,45.52264),4326)::geography,'Room of about 70 seats run by the Casa del Popolo team, presenting solo sets, singer-songwriters, flamenco and some dance nights.

Salle d''environ 70 places gérée par l''équipe de la Casa del Popolo, qui présente des prestations solo, des auteurs-compositeurs, du flamenco et quelques soirées dansantes.',array['Solo / duo','Bands','DJs']::text[],array['Singer-songwriter','Flamenco']::text[],'https://casadelpopolo.com/en/info/ptit-ours',null,'showici','osm:n11973028683',true,null),
('Le Ministère','Club','4521 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2T 1R2',st_setsrid(st_makepoint(-73.58682,45.52045),4326)::geography,'A 288-capacity former bank with an all-ages licence that books bands and DJs and records and livestreams shows.

Ancienne banque de 288 places avec permis pour tous les âges, qui programme des groupes et des DJ et enregistre et diffuse des spectacles.',array['Bands','DJs']::text[],array['Indie','Electronic']::text[],'https://leministere.ca','514 666-2326','showici','osm:n13594303870',true,null),
('Le Système','Bar','7119 Rue Saint-Hubert','La Petite-Patrie','Montréal','H2S 2M9',st_setsrid(st_makepoint(-73.61250,45.54052),4326)::geography,'Wine-bar front room with an intimate back-room dance floor that showcases rising DJs and performers.

Bar à vin à l''avant et petite piste de danse à l''arrière qui met en valeur des DJ et des artistes de la relève.',array['DJs']::text[],array['Electronic']::text[],null,null,'showici','osm:n11229654156',true,null),
('Sora 45','Restaurant','1 Place Ville Marie','Downtown','Montréal','H3B 5K4',st_setsrid(st_makepoint(-73.56863,45.50158),4326)::geography,'Japanese restaurant on the 45th floor of Place Ville Marie that presents weekly live jazz evenings.

Restaurant japonais au 45e étage de la Place Ville Marie qui présente une soirée de jazz en direct chaque semaine.',array['Bands']::text[],array['Jazz']::text[],'https://www.sora45.com',null,'showici','osm:n14108152901',true,null),
('Le Balcon','Restaurant','463 Rue Sainte-Catherine Ouest','Quartier des spectacles','Montréal','H3B 1B1',st_setsrid(st_makepoint(-73.56837,45.50515),4326)::geography,'Supper club inside St. James United Church pairing a set menu with live soul, Motown, jazz and gospel performances.

Souper-spectacle dans l''église St. James qui jumelle un menu fixe à des prestations en direct de soul, Motown, jazz et gospel.',array['Bands']::text[],array['Soul','Jazz','Gospel']::text[],'https://www.lebalcon.ca',null,'showici','osm:n12645882901',true,null),
('Cabaret Berlin','Club','1982 Rue Sainte-Catherine Est','Centre-Sud','Montréal','H2K 2H7',st_setsrid(st_makepoint(-73.55093,45.52389),4326)::geography,'Club for goth, queer and fetish nightlife, with DJ nights ranging from industrial and cold wave to techno.

Club de la scène goth, queer et fétiche, avec des soirées DJ qui vont de l''industriel et de la cold wave à la techno.',array['DJs']::text[],array['Goth','Industrial','Techno']::text[],null,null,'showici','showici:cabaret-berlin-montreal',true,null),
('Champs','Bar','3956 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Y4',st_setsrid(st_makepoint(-73.57904,45.51657),4326)::geography,'Sports bar that hosts DJ nights alongside Drag Race watch parties and queer karaoke.

Bar sportif qui organise des soirées DJ, des visionnements de Drag Race et du karaoké queer.',array['DJs']::text[],array['Pop','Dance']::text[],null,null,'showici','osm:n1546645597',true,null),
('Bar Datcha','Bar','98 Avenue Laurier Ouest','Mile End','Montréal','H2T 2N4',st_setsrid(st_makepoint(-73.59358,45.52186),4326)::geography,'Candlelit bar with live jazz early in the evening, followed by DJs playing house, electro, funk and disco.

Bar à la chandelle avec du jazz en direct en début de soirée, puis des DJ qui font jouer de la house, de l''électro, du funk et du disco.',array['Bands','DJs']::text[],array['Jazz','House','Disco']::text[],null,null,'showici','showici:bar-datcha-montreal',true,null),
('Peel Pub','Pub','1196 Rue Peel','Downtown','Montréal','H3A 1T5',st_setsrid(st_makepoint(-73.57194,45.49940),4326)::geography,'Downtown sports pub hosting a weekly stand-up comedy open mic with professional and amateur comics.

Pub sportif du centre-ville qui présente un micro ouvert d''humour hebdomadaire avec des humoristes professionnels et amateurs.',array['Stand-up comedy']::text[],array['Comedy']::text[],null,null,'showici','osm:n393143427',true,null),
('Mayfair Tavern','Bar','22 Avenue de la Baie-de-Valois','West Island','Pointe-Claire','H9R 4B3',st_setsrid(st_makepoint(-73.79212,45.45044),4326)::geography,'West Island tavern where live bands and karaoke nights take over the stage on weekends.

Taverne de l''Ouest-de-l''Île où des groupes en direct et des soirées karaoké occupent la scène les fins de semaine.',array['Bands']::text[],array['Rock','Karaoke']::text[],null,null,'showici','osm:n13274490412',true,null),
('The Wheel Club','Bar','3373 Avenue Cavendish','Notre-Dame-de-Grâce','Montréal',null,st_setsrid(st_makepoint(-73.62788,45.46345),4326)::geography,'Longtime country and bluegrass club that now also books rock, jazz, tribute bands, emerging groups and student ensembles.

Club country et bluegrass de longue date qui programme aussi du rock, du jazz, des groupes hommage, des groupes émergents et des ensembles étudiants.',array['Bands']::text[],array['Country','Bluegrass','Rock']::text[],null,null,'showici','showici:the-wheel-club-montreal',true,null),
('Bootlegger L''Authentique','Bar','3481 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2X 2T6',st_setsrid(st_makepoint(-73.57039,45.51312),4326)::geography,'Speakeasy-style cocktail bar whose stage hosts jazz, blues, hip-hop and comedy.

Bar à cocktails de style speakeasy dont la scène accueille du jazz, du blues, du hip-hop et de l''humour.',array['Bands','Stand-up comedy']::text[],array['Jazz','Blues','Hip-hop']::text[],null,null,'showici','osm:n6814451587',true,null),
('Club Balattou','Club','4372 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Z5',st_setsrid(st_makepoint(-73.58456,45.51915),4326)::geography,'Intimate club since 1985 dedicated to African, Caribbean and world music, booking both emerging and established artists.

Club intime fondé en 1985 et consacré aux musiques africaines, caribéennes et du monde, avec des artistes émergents et établis.',array['Bands']::text[],array['African','Caribbean','World']::text[],null,null,'showici','osm:n13291089311',true,null),
('Grumpy''s Bar','Bar','1242 Rue Bishop','Downtown','Montréal','H3G 2E3',st_setsrid(st_makepoint(-73.57569,45.49607),4326)::geography,'No-frills downtown bar with live music, including folk jams, jazz nights and varied acts on weekends.

Bar sans prétention du centre-ville avec de la musique en direct, dont des jams folk, des soirées jazz et des artistes variés la fin de semaine.',array['Bands','Solo / duo']::text[],array['Folk','Jazz']::text[],'https://www.grumpysbar.ca',null,'showici','osm:n5162246330',true,null),
('Bar Notre-Dame-des-Quilles','Bar','32 Rue Beaubien Est','La Petite-Patrie','Montréal','H2S 1P8',st_setsrid(st_makepoint(-73.60797,45.53061),4326)::geography,'Bowling-lane bar where bands sometimes play late, with DJ sets from funk to goth and a queer-friendly open mic series.

Bar avec allées de quilles où des groupes jouent parfois en fin de soirée, avec des DJ du funk au goth et une série de micros ouverts queer.',array['Bands','DJs','Stand-up comedy']::text[],array['Funk','Goth','Open mic']::text[],'https://www.facebook.com/notredamedesquilles','514 757-7415','showici','osm:n3625893198',true,null),
('Bar Social','Bar','3819 Rue Wellington','Verdun','Verdun','H4G 1V3',st_setsrid(st_makepoint(-73.56690,45.46558),4326)::geography,'Wellington Street bar that hosts live concerts, drag shows, quiz nights and parties.

Bar de la rue Wellington qui présente des concerts en direct, des spectacles de drag, des soirées quiz et des partys.',array['Bands']::text[],array['Live music','Drag']::text[],'https://www.facebook.com/barsocialverdun',null,'showici','osm:n5381160624',true,null),
('Bar Rouge','Bar','5018 Boulevard Décarie','Notre-Dame-de-Grâce','Montréal','H3X 2H8',st_setsrid(st_makepoint(-73.62881,45.48314),4326)::geography,'Low-key neighbourhood bar offering live music, open mics and karaoke.

Bar de quartier sans prétention qui propose de la musique en direct, des micros ouverts et du karaoké.',array['Solo / duo']::text[],array['Open mic','Karaoke']::text[],null,null,'showici','showici:bar-rouge-montreal',true,null),
('Cunningham''s Pub','Pub','75 Rue Sainte-Anne','West Island','Sainte-Anne-de-Bellevue','H9X 1M1',st_setsrid(st_makepoint(-73.95083,45.40340),4326)::geography,'Waterfront-village pub in Sainte-Anne-de-Bellevue that hosts live music events with Quebec performers.

Pub du village de Sainte-Anne-de-Bellevue qui présente des événements de musique en direct avec des artistes québécois.',array['Bands','Solo / duo']::text[],array['Folk','Rock']::text[],null,null,'showici','showici:cunningham-s-pub-sainte-anne-de-bellevue',true,null),
('Piranha Bar','Bar','680 Rue Sainte-Catherine Ouest','Downtown','Montréal','H3B 1C2',st_setsrid(st_makepoint(-73.56991,45.50287),4326)::geography,'Gritty downtown bar with local rock and metal acts on its upstairs stage.

Bar brut du centre-ville qui présente des groupes rock et métal locaux sur sa scène à l''étage.',array['Bands']::text[],array['Rock','Metal']::text[],'https://www.piranhabar.ca','514 508-2116','showici','osm:n11004591762',true,null),
('3rd Floor Comedy Club','Club','2015 Rue Crescent','Downtown','Montréal','H3G 2C1',st_setsrid(st_makepoint(-73.57755,45.49826),4326)::geography,'Stand-up comedy club above a Crescent Street pub, presenting booked shows and open mic nights featuring Montréal comedians.

Club d''humour au-dessus d''un pub de la rue Crescent qui présente des spectacles d''humoristes montréalais et des micros ouverts.',array['Stand-up comedy']::text[],array['Comedy']::text[],null,null,'showici','showici:3rd-floor-comedy-club-montreal',true,null),
('Montreal Improv','Club','3716 Rue Notre-Dame Ouest','Saint-Henri','Montréal','H4C 1P5',st_setsrid(st_makepoint(-73.58153,45.47912),4326)::geography,'Saint-Henri venue for improv and stand-up comedy, with classes in a neighbouring space.

Salle de Saint-Henri consacrée à l''improvisation et au stand-up, avec des cours offerts dans un local voisin.',array['Stand-up comedy']::text[],array['Improv','Comedy']::text[],null,null,'showici','showici:montreal-improv-montreal',true,null),
('Théâtre Sainte-Catherine','Event hall','264 Rue Sainte-Catherine Est','Quartier latin','Montréal','H2X 1L4',st_setsrid(st_makepoint(-73.56146,45.51236),4326)::geography,'Café-bar theatre of about 100 seats hosting English and French improv, comedy, live music and cabaret nights.

Théâtre de type café-bar d''environ 100 places qui présente de l''impro en anglais et en français, de l''humour, de la musique et des cabarets.',array['Stand-up comedy','Bands']::text[],array['Improv','Comedy']::text[],null,null,'showici','osm:n3748071090',true,null),
('The Wiggle Room','Club','3874 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Y4',st_setsrid(st_makepoint(-73.57779,45.51608),4326)::geography,'Upstairs cabaret showroom primarily presenting burlesque, which also hosts comedy events.

Salle de cabaret à l''étage surtout consacrée au burlesque, qui accueille aussi des soirées d''humour.',array['Stand-up comedy']::text[],array['Burlesque','Comedy']::text[],null,null,'showici','osm:n5090194328',true,null),
('Jardin Nelson','Restaurant','407 Place Jacques-Cartier','Old Montréal','Montréal','H2Y 3B1',st_setsrid(st_makepoint(-73.55266,45.50795),4326)::geography,'Old Montréal restaurant with a courtyard where live jazz is played during its season, from early May through Thanksgiving.

Restaurant du Vieux-Montréal avec une cour où l''on joue du jazz en direct pendant sa saison, de début mai à l''Action de grâce.',array['Bands']::text[],array['Jazz']::text[],'https://jardinnelson.com','514 861-5731','showici','osm:n1016199628',true,null),
('Théâtre Fairmount','Event hall','5240 Avenue du Parc','Mile End','Montréal','H2V 4G7',st_setsrid(st_makepoint(-73.59851,45.52048),4326)::geography,'Small Mile End venue with a low stage that hosts touring and local indie artists.

Petite salle du Mile End avec une scène basse qui accueille des artistes indie locaux et en tournée.',array['Bands']::text[],array['Indie']::text[],null,null,'showici','showici:theatre-fairmount-montreal',true,null),
('Le Verre Bouteille','Bar','2112 Avenue du Mont-Royal Est','Plateau-Mont-Royal','Montréal','H2H 1J8',st_setsrid(st_makepoint(-73.57205,45.53540),4326)::geography,'Neighbourhood bar opened in 1942, presenting up to five shows a week, including jazz trios, songwriters and open jams.

Bar de quartier ouvert en 1942 qui présente jusqu''à cinq spectacles par semaine, dont des trios jazz, des auteurs-compositeurs et des jams ouverts.',array['Bands','Solo / duo']::text[],array['Jazz','Chanson']::text[],'https://www.verrebouteille.com','514 521-9409','showici','osm:n2498034449',true,null),
('Bily Kun','Bar','354 Avenue du Mont-Royal Est','Plateau-Mont-Royal','Montréal','H2T 1P9',st_setsrid(st_makepoint(-73.58316,45.52346),4326)::geography,'Plateau bar with live jazz and classical sets early in the evening, followed by DJs later at night.

Bar du Plateau avec du jazz et de la musique classique en direct en début de soirée, puis des DJ plus tard.',array['Bands','DJs']::text[],array['Jazz','Classical']::text[],null,null,'showici','osm:n810790669',true,null),
('Cabaret Lion d''Or','Event hall','1676 Rue Ontario Est','Centre-Sud','Montréal','H2K 4J4',st_setsrid(st_makepoint(-73.55955,45.52541),4326)::geography,'Historic cabaret hall presenting music from chanson to world music, theatre and cultural events, and serving as a launchpad for emerging artists.

Cabaret historique qui présente de la chanson aux musiques du monde, du théâtre et des événements culturels, en plus d''être un tremplin pour la relève.',array['Bands','Solo / duo']::text[],array['Chanson','World']::text[],'https://cabaretliondor.com','514 598-0709','showici','osm:n12026925409',true,null),
('Shaika Café','Café','5526 Rue Sherbrooke Ouest','Notre-Dame-de-Grâce','Montréal','H4A 1V9',st_setsrid(st_makepoint(-73.61234,45.47208),4326)::geography,'NDG café that hosts frequent evening events such as live music and open mic nights.

Café de NDG qui organise souvent des soirées comme des spectacles de musique et des micros ouverts.',array['Solo / duo']::text[],array['Acoustic','Open mic']::text[],null,null,'showici','showici:shaika-cafe-montreal',true,null),
('L''Abreuvoir','Bar','403 Rue Ontario Est','Quartier latin','Montréal','H2L 1N5',st_setsrid(st_makepoint(-73.56529,45.51624),4326)::geography,'Bar and terrace that hosts nightclub events, pub-style gatherings and comedy club performances.

Bar-terrasse qui accueille des soirées de type boîte de nuit, des rencontres de style pub et des spectacles d''humour.',array['DJs','Stand-up comedy']::text[],array['Comedy','Dance']::text[],'https://www.facebook.com/bar.abreuvoir','514 843-5469','showici','osm:n2337753859',true,null),
('Bar Spaghetti Western','Bar','6390 Rue Saint-Hubert','La Petite-Patrie','Montréal','H2S 1S7',st_setsrid(st_makepoint(-73.60255,45.53576),4326)::geography,'Western-themed bar offering bluegrass and country music, along with line dancing nights.

Bar à thème western qui propose du bluegrass et de la musique country, ainsi que des soirées de danse en ligne.',array['Bands']::text[],array['Country','Bluegrass']::text[],null,null,'showici','osm:n11215977063',true,null),
('Café Gitana','Restaurant','2080 Rue Saint-Denis','Quartier latin','Montréal','H2X 3K7',st_setsrid(st_makepoint(-73.56650,45.51636),4326)::geography,'Anatolian-style lounge on Saint-Denis Street that presents live music several nights a week.

Lounge d''inspiration anatolienne de la rue Saint-Denis qui présente de la musique en direct plusieurs soirs par semaine.',array['Bands']::text[],array['World']::text[],'https://cafegitana.ca','514 281-0090','showici','osm:n4345159689',true,null),
('Bottes & Whiskey','Bar','2047 Avenue du Mont-Royal Est','Plateau-Mont-Royal','Montréal','H2H 1J7',st_setsrid(st_makepoint(-73.57271,45.53512),4326)::geography,'Country-themed bar on Mont-Royal Avenue that hosts live country concerts.

Bar à thème country de l''avenue du Mont-Royal qui présente des concerts country en direct.',array['Bands']::text[],array['Country']::text[],null,null,'showici','osm:n426378324',true,null),
('Le Belmont','Club','4483 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Z5',st_setsrid(st_makepoint(-73.58602,45.52011),4326)::geography,'Two-room nightlife venue hosting live shows and DJ dance nights, with genres changing nightly from hip-hop to disco.

Boîte de nuit à deux salles qui présente des spectacles et des soirées DJ, avec des styles qui changent chaque soir, du hip-hop au disco.',array['Bands','DJs']::text[],array['Hip-hop','Reggaeton','Disco']::text[],null,null,'showici','osm:n1573682011',true,null),
('Le Salon Daomé','Club','4465 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Z5',st_setsrid(st_makepoint(-73.58583,45.52007),4326)::geography,'DJ-focused club dedicated to Montréal''s underground house and techno scene, with sets leaning toward deep house and electro.

Club axé sur les DJ et voué à la scène house et techno underground de Montréal, avec des sets surtout deep house et électro.',array['DJs']::text[],array['House','Techno']::text[],null,null,'showici','showici:le-salon-daome-montreal',true,null),
('Newspeak','Club','1403 Rue Sainte-Élisabeth','Quartier latin','Montréal','H2X 1L2',st_setsrid(st_makepoint(-73.56215,45.51246),4326)::geography,'Club focused on underground DJs and avant-garde electronic acts, including live performances.

Club axé sur les DJ underground et les artistes électroniques d''avant-garde, y compris des prestations en direct.',array['DJs','Bands']::text[],array['Electronic']::text[],'https://newspeakmtl.com','514 436-9029','showici','osm:n6005804263',true,null),
('Stereo','Club','858 Rue Sainte-Catherine Est','Le Village','Montréal','H2L 2E2',st_setsrid(st_makepoint(-73.55812,45.51600),4326)::geography,'After-hours house and techno club with an upstairs dance floor and a more conventional downstairs bar.

Club after-hours house et techno avec une piste de danse à l''étage et un bar plus classique au sous-sol.',array['DJs']::text[],array['House','Techno']::text[],null,null,'showici','osm:n4486771295',true,null),
('Club Unity','Club','1171 Rue Sainte-Catherine Est','Le Village','Montréal','H2L 3G8',st_setsrid(st_makepoint(-73.55646,45.51835),4326)::geography,'Village club with two dance floors and a rooftop terrace, featuring a rotating lineup of local and international DJs.

Club du Village avec deux pistes de danse et une terrasse sur le toit, où se succèdent des DJ locaux et internationaux.',array['DJs']::text[],array['House','Pop']::text[],null,null,'showici','osm:n2424892846',true,null),
('Flyjin','Restaurant','417 Rue Saint-Pierre','Old Montréal','Montréal','H2Y 2M4',st_setsrid(st_makepoint(-73.55654,45.50170),4326)::geography,'Japanese-fusion supper club where DJs take over after dinner service.

Souper-club de cuisine fusion japonaise où les DJ prennent le relais après le service du souper.',array['DJs']::text[],array['Dance']::text[],'https://www.flyjin.ca','438 396-8882','showici','osm:n4735368021',true,null),
('Magpie Magique','Bar','4670 Rue Saint-Denis','Plateau-Mont-Royal','Montréal','H2J 2L4',st_setsrid(st_makepoint(-73.58530,45.52489),4326)::geography,'1920s-style speakeasy with a hidden entrance where bands play on weekends.

Speakeasy de style années 1920 à l''entrée cachée où des groupes jouent la fin de semaine.',array['Bands']::text[],array['Jazz']::text[],null,null,'showici','showici:magpie-magique-montreal',true,null),
('Barbossa','Bar','3956A Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Y4',st_setsrid(st_makepoint(-73.57900,45.51664),4326)::geography,'Plateau bar, formerly Blizzarts, with a weekly rotation of DJs and live acts from reggae and house to live jazz.

Bar du Plateau, anciennement le Blizzarts, avec une rotation hebdomadaire de DJ et de prestations live, du reggae et de la house au jazz.',array['Bands','DJs']::text[],array['Jazz','Reggae','House']::text[],null,null,'showici','osm:n11265612651',true,null),
('Badin','Bar','2621 Rue Notre-Dame Ouest','Little Burgundy','Montréal',null,st_setsrid(st_makepoint(-73.57617,45.48248),4326)::geography,'Small listening lounge below HENI restaurant with vintage hi-fi, a vinyl DJ booth and weekly jazz nights.

Petit salon d''écoute sous le restaurant HENI avec chaîne hi-fi vintage, cabine DJ vinyle et soirée jazz chaque semaine.',array['DJs']::text[],array['Jazz','Vinyl']::text[],null,null,'showici','showici:badin-montreal',true,null),
('Goldies Bar','Bar','7425 Rue Saint-Jacques','Notre-Dame-de-Grâce','Montréal','H4B 1W6',st_setsrid(st_makepoint(-73.63714,45.45361),4326)::geography,'Unpretentious NDG bar whose jukebox-and-DJ setup draws crowds on weekend nights.

Bar sans prétention de NDG dont le juke-box et les DJ attirent les foules les soirs de fin de semaine.',array['DJs']::text[],array['Dance']::text[],null,'514 486-1433','showici','osm:n7865558032',true,null),
('Bar Leonor','Bar','1106B Boulevard Saint-Laurent','Chinatown','Montréal','H2Z 1J5',st_setsrid(st_makepoint(-73.56119,45.50853),4326)::geography,'Chinatown bar for up to 100 guests, with weekend DJ sets of house and hip-hop.

Bar du Quartier chinois pouvant accueillir 100 personnes, avec des DJ house et hip-hop la fin de semaine.',array['DJs']::text[],array['House','Hip-hop']::text[],null,null,'showici','showici:bar-leonor-montreal',true,null),
('Le Mal Nécessaire','Bar','1015 Rue Saint-Alexandre','Downtown','Montréal','H2Z 1N9',st_setsrid(st_makepoint(-73.56290,45.50317),4326)::geography,'Tiki-inspired cocktail bar with DJ sets later in the night.

Bar à cocktails d''inspiration tiki avec des DJ en fin de soirée.',array['DJs']::text[],array['Dance']::text[],'https://lemalnecessaire.com',null,'showici','osm:n11973468695',true,null),
('Le Dépanneur Café','Café','206 Rue Bernard Ouest','Mile End','Montréal','H2T 2K4',st_setsrid(st_makepoint(-73.60441,45.52471),4326)::geography,'Mile End café with daily live music, where musicians sign up on a whiteboard for one-hour daytime sets.

Café du Mile End avec de la musique tous les jours, où les musiciens s''inscrivent sur un tableau pour des prestations d''une heure en journée.',array['Solo / duo']::text[],array['Acoustic','Folk']::text[],null,'514 271-9357','showici','osm:n2084790270',true,null),
('Bar Bifteck','Bar','3702 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2X 2T6',st_setsrid(st_makepoint(-73.57438,45.51457),4326)::geography,'Long-running Saint-Laurent Boulevard bar known for its DJ and live music calendar.

Bar de longue date du boulevard Saint-Laurent reconnu pour sa programmation de DJ et de musique en direct.',array['DJs','Bands']::text[],array['Rock','Indie']::text[],null,'514 844-6211','showici','osm:n471063618',true,null),
('Vino Disco','Bar','1192 Boulevard Saint-Laurent','Quartier des spectacles','Montréal','H2X 0C8',st_setsrid(st_makepoint(-73.56287,45.50915),4326)::geography,'Wine bar with a custom sound system where DJs spin from 1970s disco to early-2000s tracks.

Bar à vin doté d''un système de son sur mesure où des DJ font jouer du disco des années 1970 jusqu''aux succès du début des années 2000.',array['DJs']::text[],array['Disco','Retro']::text[],null,null,'showici','osm:n11997966638',true,null),
('La Cale – Pub zéro déchet','Pub','6839 Rue Saint-Hubert','La Petite-Patrie','Montréal','H2S 2M7',st_setsrid(st_makepoint(-73.60844,45.53868),4326)::geography,'Zero-waste pub hosting events for emerging artists, including comedy nights, improv, book launches and live music.

Pub zéro déchet qui organise des événements pour la relève, dont des soirées d''humour, de l''impro, des lancements de livres et des spectacles.',array['Bands','Stand-up comedy']::text[],array['Comedy','Improv']::text[],'https://www.la-cale.com','514 360-0634','showici','osm:n11234786880',true,null),
('Huis Clos','Bar','7659 Rue Saint-Denis','Villeray','Montréal','H2R 2E7',st_setsrid(st_makepoint(-73.62244,45.54080),4326)::geography,'Villeray neighbourhood bar with themed nights such as rock and karaoke that has also hosted live concerts.

Bar de quartier de Villeray avec des soirées thématiques, comme rock et karaoké, qui a aussi présenté des concerts.',array['Bands']::text[],array['Rock','Karaoke']::text[],'https://www.huisclos.ca','514 419-8579','showici','osm:n5902621985',true,null),
('Blockhaus','Bar','3328 Rue Ontario Est','Hochelaga-Maisonneuve','Montréal','H1W 1P9',st_setsrid(st_makepoint(-73.54625,45.54255),4326)::geography,'Hochelaga cocktail bar with a terrace that lists concerts and DJ sets among its activities.

Bar à cocktails d''Hochelaga avec terrasse qui propose des concerts et des DJ.',array['Bands','DJs']::text[],array['Live music','DJ']::text[],null,null,'showici','showici:blockhaus-montreal',true,null),
('La Retenue','Bar','5615A Chemin de la Côte-des-Neiges','Côte-des-Neiges','Montréal','H3T 1Y8',st_setsrid(st_makepoint(-73.62614,45.49825),4326)::geography,'Côte-des-Neiges neighbourhood bar open late that lists concerts among its activities.

Bar de quartier de Côte-des-Neiges ouvert tard qui propose des concerts.',array['Bands']::text[],array['Live music']::text[],null,null,'showici','osm:n2510769590',true,null),
('Lady Davidson','Bar','3400 Rue Ontario Est','Hochelaga-Maisonneuve','Montréal','H1W 1P9',st_setsrid(st_makepoint(-73.54594,45.54302),4326)::geography,'Hochelaga show bar with pool tables that lists concerts among its activities.

Bar-spectacle d''Hochelaga avec tables de billard qui propose des concerts.',array['Bands']::text[],array['Live music']::text[],null,null,'showici','osm:n5111364859',true,null),
('Ye Olde Orchard Pub & Grill (Downtown)','Pub','1189 Rue de la Montagne','Downtown','Montréal','H3G 1Z2',st_setsrid(st_makepoint(-73.57351,45.49732),4326)::geography,'Downtown location of a Celtic-style pub group whose pubs are known for live music and pints.

Succursale du centre-ville d''un groupe de pubs d''inspiration celtique reconnus pour leur musique en direct et leurs bières.',array['Bands','Solo / duo']::text[],array['Celtic','Pub rock']::text[],null,null,'showici','showici:ye-olde-orchard-pub-grill-downtown-montreal',true,null),
('Muzique','Club','3781 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Y4',st_setsrid(st_makepoint(-73.57565,45.51542),4326)::geography,'Saint-Laurent Boulevard club with a dancehall, R&B and hip-hop room and a separate electronic music room.

Club du boulevard Saint-Laurent avec une salle dancehall, R&B et hip-hop et une autre salle de musique électronique.',array['DJs']::text[],array['Hip-hop','Dancehall','Electronic']::text[],'https://muziquemontreal.com','514 282-2224','showici','osm:n11265181044',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
