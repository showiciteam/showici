-- ShowIci: unclaimed venues in Drummondville and Centre-du-Québec. Public sources (venue sites, Tourisme Centre-du-Québec, Tourisme Victoriaville, Le Point de Vente, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Le Baboune Bar Tapas','Bar','104 Rue Marchand','Centre-ville','Drummondville','J2C 4M9',st_setsrid(st_makepoint(-72.48779,45.88424),4326)::geography,'Festive tapas bar in downtown Drummondville mixing food, drinks and shows.

Bar à tapas festif du centre-ville de Drummondville où se mêlent repas, cocktails et spectacles.',array['Solo / duo','Bands','DJs']::text[],array['pop','rock','Québec francophone']::text[],'https://lebaboune.ca','819 850-0607','showici','showici:le-baboune-bar-tapas-drummondville',true,null),
('Espace Mandeville','Event hall','232 Rue Dorion','Centre-ville','Drummondville','J2C 1T9',st_setsrid(st_makepoint(-72.48976,45.88321),4326)::geography,'Intimate Drummondville venue presenting concerts and the weekly Mardis de l''humour comedy nights.

Salle intime de Drummondville qui présente des concerts et les Mardis de l''humour.',array['Bands','Stand-up comedy','Solo / duo']::text[],array['indie','rock','Québec francophone']::text[],null,null,'showici','showici:espace-mandeville-drummondville',true,null),
('Maison des arts Desjardins Drummondville','Event hall','175 Rue Ringuet','Centre-ville','Drummondville','J2C 2P7',st_setsrid(st_makepoint(-72.50068,45.87715),4326)::geography,'Drummondville''s main performing arts centre, presenting touring concerts, comedy and theatre.

Principal diffuseur de Drummondville, qui présente concerts, humour et théâtre en tournée.',array['Bands','Stand-up comedy','Solo / duo']::text[],array['pop','Québec francophone','classical']::text[],'https://artsdrummondville.com',null,'showici','showici:maison-des-arts-desjardins-drummondville-drummondville',true,null),
('L''Établi Brasserie Urbaine','Brewery','154 Rue Lindsay','Centre-ville','Drummondville','J2C 4L1',st_setsrid(st_makepoint(-72.49142,45.88499),4326)::geography,'Urban brewpub on Lindsay Street that hosts bands and events.

Brasserie urbaine de la rue Lindsay qui accueille des groupes et des événements.',array['Bands','Solo / duo']::text[],array['rock','folk','indie']::text[],'https://letablibrasserie.com',null,'showici','showici:l-etabli-brasserie-urbaine-drummondville',true,null),
('Bar Le Christal','Bar','313 Rue Saint-Jean',null,'Drummondville','J2B 5L5',st_setsrid(st_makepoint(-72.48447,45.87663),4326)::geography,'Drummondville bar with chansonniers and live music nights.

Bar de Drummondville avec chansonniers et soirées de musique live.',array['Solo / duo','Bands']::text[],array['rock','country','Québec francophone']::text[],null,null,'showici','showici:bar-le-christal-drummondville',true,null),
('Pub La Sainte Paix','Pub','224 Rue Hériot','Centre-ville','Drummondville','J2C 1K1',st_setsrid(st_makepoint(-72.48859,45.88514),4326)::geography,'Downtown Drummondville pub on Hériot Street that sells tickets for its own shows.

Pub du centre-ville de Drummondville, rue Hériot, qui présente ses propres spectacles.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','indie','folk']::text[],'https://saintepaix.com',null,'showici','showici:pub-la-sainte-paix-drummondville',true,null),
('Bar Café Ô Saint-Fred','Bar','266 Rue Brock','Centre-ville','Drummondville','J2C 1M4',st_setsrid(st_makepoint(-72.48749,45.88387),4326)::geography,'Café-bar near Saint-Frédéric street in downtown Drummondville with chansonnier nights.

Café-bar près de la rue Saint-Frédéric, au centre-ville de Drummondville, avec soirées chansonniers.',array['Solo / duo']::text[],array['Québec francophone','pop','folk']::text[],null,null,'showici','showici:bar-cafe-o-saint-fred-drummondville',true,null),
('Aubier Microbrasserie','Brewery','150 Rue Girouard','Centre-ville','Drummondville','J2C 4M8',st_setsrid(st_makepoint(-72.4887,45.88492),4326)::geography,'Downtown Drummondville microbrewery that hosts shows and events.

Microbrasserie du centre-ville de Drummondville qui accueille spectacles et événements.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://aubiermicrobrasserie.com',null,'showici','showici:aubier-microbrasserie-drummondville',true,null),
('Resto-Bar Le Vieux St-Charles','Bar','800 Boulevard Foucault','Saint-Charles','Drummondville','J2C 1A7',st_setsrid(st_makepoint(-72.47109,45.90302),4326)::geography,'Neighbourhood resto-bar in Drummondville''s Saint-Charles sector with ticketed shows.

Resto-bar de quartier du secteur Saint-Charles à Drummondville avec spectacles en billetterie.',array['Bands','Solo / duo']::text[],array['rock','country','Québec francophone']::text[],null,null,'showici','showici:resto-bar-le-vieux-st-charles-drummondville',true,null),
('Bar Le Cocotier','Bar','2272 Boulevard Mercure',null,'Drummondville','J2B 3R5',st_setsrid(st_makepoint(-72.45612,45.85182),4326)::geography,'Drummondville karaoke bar.

Bar karaoké de Drummondville.',array['Trivia / karaoke hosts','Solo / duo']::text[],array['pop','rock']::text[],null,null,'showici','showici:bar-le-cocotier-drummondville',true,null),
('Bar Terrasse du Boulevard Lemire','Club','1930 Boulevard Lemire',null,'Drummondville','J2B 7M4',st_setsrid(st_makepoint(-72.5015,45.86568),4326)::geography,'Drummondville nightclub with a large terrace.

Boîte de nuit de Drummondville avec grande terrasse.',array['DJs','Bands']::text[],array['pop','electronic','country']::text[],null,null,'showici','showici:bar-terrasse-du-boulevard-lemire-drummondville',true,null),
('Xcentrik Rooftop','Club','235 Rue Hériot','Centre-ville','Drummondville','J2C 6X5',st_setsrid(st_makepoint(-72.48886,45.88507),4326)::geography,'Rooftop bar in downtown Drummondville with DJ 5-to-7s and private events.

Bar sur le toit au centre-ville de Drummondville avec 5 à 7 DJ et événements privés.',array['DJs','Solo / duo']::text[],array['electronic','pop']::text[],'https://xcentrik.ca',null,'showici','showici:xcentrik-rooftop-drummondville',true,null),
('Le Carré 150','Event hall','150 Rue Notre-Dame Est','Centre-ville','Victoriaville','G6P 3Z6',st_setsrid(st_makepoint(-71.95522,46.05699),4326)::geography,'Victoriaville''s performing arts centre, presenting concerts, comedy and theatre.

Salle de spectacle de Victoriaville qui présente concerts, humour et théâtre.',array['Bands','Stand-up comedy','Solo / duo']::text[],array['pop','Québec francophone','rock']::text[],'https://lecarre150.com',null,'showici','showici:le-carre-150-victoriaville',true,null),
('Cactus Resto-Bar','Bar','139 Boulevard des Bois-Francs Sud',null,'Victoriaville','G6P 4S4',st_setsrid(st_makepoint(-71.94818,46.05696),4326)::geography,'Warm Victoriaville resto-bar with a regular show programme.

Resto-bar chaleureux de Victoriaville avec une programmation régulière de spectacles.',array['Solo / duo','Bands']::text[],array['rock','pop','Québec francophone']::text[],'https://cactusrestobar.com',null,'showici','showici:cactus-resto-bar-victoriaville',true,null),
('Complexe Évasion','Bar','19 Boulevard des Bois-Francs Sud',null,'Victoriaville','G6P 4S2',st_setsrid(st_makepoint(-71.95019,46.05827),4326)::geography,'Victoriaville entertainment complex with a grill, lounge and the O''Connell Irish pub.

Complexe de divertissement de Victoriaville avec grill, lounge et le pub irlandais O''Connell.',array['Bands','Solo / duo','DJs']::text[],array['rock','pop','country']::text[],'https://levasion.com',null,'showici','showici:complexe-evasion-victoriaville',true,null),
('Le Nash''ville','Bar','633 Boulevard Jutras Est',null,'Victoriaville','G6P 7H4',st_setsrid(st_makepoint(-71.93703,46.05946),4326)::geography,'Country destination in Victoriaville: resto-bar, line dancing and live shows.

Destination country de Victoriaville : resto-bar, danse en ligne et spectacles.',array['Bands','Solo / duo']::text[],array['country']::text[],'https://lenashville.com',null,'showici','showici:le-nash-ville-victoriaville',true,null),
('Microbrasserie l''Hermite','Brewery','187 Rue Notre-Dame Est','Centre-ville','Victoriaville','G6P 3Z8',st_setsrid(st_makepoint(-71.95504,46.05692),4326)::geography,'Downtown Victoriaville microbrewery hosting events such as drag nights and shows.

Microbrasserie du centre-ville de Victoriaville qui présente des événements comme des soirées drag et des spectacles.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','rock','indie']::text[],'https://microhermite.com',null,'showici','showici:microbrasserie-l-hermite-victoriaville',true,null),
('Bar Tabou','Bar','575 Boulevard des Bois-Francs Sud',null,'Victoriaville','G6P 5X5',st_setsrid(st_makepoint(-71.93487,46.04915),4326)::geography,'Victoriaville bar with chansonnier nights.

Bar de Victoriaville avec soirées chansonniers.',array['Solo / duo']::text[],array['Québec francophone','pop','rock']::text[],null,null,'showici','showici:bar-tabou-victoriaville',true,null),
('Bar Chez Bidou','Club','11 Rue Tourigny',null,'Victoriaville','G6P 4C5',st_setsrid(st_makepoint(-71.95882,46.05486),4326)::geography,'Victoriaville nightclub.

Boîte de nuit de Victoriaville.',array['DJs']::text[],array['pop','electronic']::text[],null,null,'showici','showici:bar-chez-bidou-victoriaville',true,null),
('Multi-Brasses','Brewery','1209 Rue Saint-Joseph',null,'Tingwick','J0A 1L0',st_setsrid(st_makepoint(-71.94351,45.88111),4326)::geography,'Village microbrewery in Tingwick.

Microbrasserie de village à Tingwick.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://multi-brasses.com',null,'showici','showici:multi-brasses-tingwick',true,null),
('Bar Versejoie','Bar','1525 Avenue Saint-Luc',null,'Plessisville','G6L 2P5',st_setsrid(st_makepoint(-71.77025,46.21924),4326)::geography,'Plessisville bar with live music nights.

Bar de Plessisville avec soirées de musique live.',array['Bands','Solo / duo']::text[],array['rock','country','Québec francophone']::text[],null,null,'showici','showici:bar-versejoie-plessisville',true,null),
('La Maison Musicale de Warwick','Event hall','11 Rue Boulanger',null,'Warwick','J0A 1M0',st_setsrid(st_makepoint(-71.99217,45.94869),4326)::geography,'Intimate concert hall in Warwick with a year-round concert programme.

Salle de concert intime à Warwick avec une programmation toute l''année.',array['Bands','Solo / duo']::text[],array['folk','classical','jazz']::text[],'https://maisonmusicalewarwick.com',null,'showici','showici:la-maison-musicale-de-warwick-warwick',true,null),
('Salle Kingsey','Event hall','356 Boulevard Marie-Victorin',null,'Kingsey Falls','J0A 1B0',st_setsrid(st_makepoint(-72.07629,45.84971),4326)::geography,'Performing arts hall in Kingsey Falls presenting concerts and comedy.

Salle de spectacle de Kingsey Falls qui présente concerts et humour.',array['Bands','Stand-up comedy','Solo / duo']::text[],array['Québec francophone','pop','folk']::text[],'https://sallekingsey.com',null,'showici','showici:salle-kingsey-kingsey-falls',true,null),
('Resto-bières le Thymbré','Pub','157 Rue du Curé-Brassard',null,'Nicolet','J3T 1E6',st_setsrid(st_makepoint(-72.61787,46.22726),4326)::geography,'Gastropub in Nicolet with local beers and a festive atmosphere.

Pub de gastronomie locale à Nicolet, avec bières d''ici et ambiance festive.',array['Solo / duo']::text[],array['folk','pop']::text[],'https://lethymbre.com',null,'showici','showici:resto-bieres-le-thymbre-nicolet',true,null),
('Charlie Bar','Bar','4850 Avenue Lamothe','Saint-Grégoire','Bécancour',null,st_setsrid(st_makepoint(-72.50844,46.27058),4326)::geography,'Bécancour bar with live entertainment.

Bar de Bécancour avec divertissement live.',array['Solo / duo','Bands']::text[],array['rock','country']::text[],null,null,'showici','showici:charlie-bar-becancour',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
