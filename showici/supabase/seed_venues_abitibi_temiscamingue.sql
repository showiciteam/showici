-- ShowIci: unclaimed venues in Abitibi-Témiscamingue. Public sources (venue sites, Tourisme Abitibi-Témiscamingue, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Cabaret de la Dernière Chance','Bar','146 8e Rue',null,'Rouyn-Noranda','J9X 2A6',st_setsrid(st_makepoint(-79.01752,48.24831),4326)::geography,'Rouyn-Noranda''s best-known show bar, a fixture of the FME festival, with indie, rock and punk bands on its small stage.

Le bar-spectacle le plus connu de Rouyn-Noranda, incontournable du FME, avec des groupes indie, rock et punk sur sa petite scène.',array['Bands','Solo / duo']::text[],array['rock','indie','punk']::text[],null,null,'showici','showici:cabaret-de-la-derniere-chance-rouyn-noranda',true,null),
('Le Petit Théâtre du Vieux Noranda','Event hall','112 7e Rue',null,'Rouyn-Noranda','J9X 1Z9',st_setsrid(st_makepoint(-79.01605,48.24735),4326)::geography,'Intimate multidisciplinary hall in Old Noranda presenting concerts, theatre, circus and family shows.

Salle multidisciplinaire intime du Vieux-Noranda qui présente concerts, théâtre, cirque et spectacles jeunesse.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','folk','Québec francophone']::text[],'https://petittheatre.org','819 797-6436','showici','showici:le-petit-theatre-du-vieux-noranda-rouyn-noranda',true,null),
('Agora des Arts','Event hall','37 7e Rue',null,'Rouyn-Noranda','J9X 1Z6',st_setsrid(st_makepoint(-79.01667,48.24658),4326)::geography,'Rouyn-Noranda''s performing-arts presenter, programming concerts, comedy and theatre in its own hall and at the Théâtre du cuivre.

Diffuseur en arts de la scène de Rouyn-Noranda qui programme concerts, humour et théâtre dans sa salle et au Théâtre du cuivre.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','folk','Québec francophone']::text[],'https://agoradesarts.com','819 797-0800','showici','showici:agora-des-arts-rouyn-noranda',true,null),
('Théâtre du cuivre','Event hall','145 Rue Taschereau Ouest',null,'Rouyn-Noranda',null,st_setsrid(st_makepoint(-79.02459,48.23714),4326)::geography,'725-seat municipal theatre hosting some 40 touring concerts, comedy and theatre shows a year.

Théâtre municipal de 725 places qui accueille une quarantaine de concerts, spectacles d''humour et pièces de tournée par année.',array['Bands','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],null,'819 797-7133','showici','showici:theatre-du-cuivre-rouyn-noranda',true,null),
('Microbrasserie Le Trèfle Noir','Brewery','145 Rue Principale',null,'Rouyn-Noranda','J9X 4P3',st_setsrid(st_makepoint(-79.019,48.2392),4326)::geography,'Downtown Rouyn-Noranda brewpub that hosts concerts, including during the FME festival.

Broue-pub du centre-ville de Rouyn-Noranda qui accueille des concerts, notamment pendant le FME.',array['Bands','Solo / duo']::text[],array['rock','folk','indie']::text[],'https://letreflenoir.com','819 762-6611','showici','showici:microbrasserie-le-trefle-noir-rouyn-noranda',true,null),
('Café-Bar L''Abstracto','Bar','144 Rue Perreault Est',null,'Rouyn-Noranda','J9X 3C4',st_setsrid(st_makepoint(-79.01562,48.2381),4326)::geography,'Cosy downtown café-bar that hosts small concerts and FME showcases.

Café-bar chaleureux du centre-ville qui accueille de petits concerts et des vitrines du FME.',array['Solo / duo','Bands']::text[],array['indie','folk','jazz']::text[],null,null,'showici','showici:cafe-bar-l-abstracto-rouyn-noranda',true,null),
('Microbrasserie Le Prospecteur','Brewery','585 3e Avenue',null,'Val-d''Or','J9P 1S6',st_setsrid(st_makepoint(-77.78265,48.1008),4326)::geography,'Val-d''Or brewpub on 3e Avenue with occasional live music.

Broue-pub de la 3e Avenue à Val-d''Or avec musique live à l''occasion.',array['Solo / duo','Bands']::text[],array['folk','rock','Québec francophone']::text[],'https://microleprospecteur.ca',null,'showici','showici:microbrasserie-le-prospecteur-val-d-or',true,null),
('Bar Bistro L''Entracte','Bar','139 Avenue Perreault',null,'Val-d''Or','J9P 2G9',st_setsrid(st_makepoint(-77.77303,48.09589),4326)::geography,'Downtown Val-d''Or bistro-bar next to the Capitol cinema, with music nights and events.

Bistro-bar du centre-ville de Val-d''Or, voisin du cinéma Capitol, avec soirées musicales et événements.',array['Solo / duo','Bands']::text[],array['pop','rock','Québec francophone']::text[],'https://barbistrolentracte.com','819 825-9078','showici','showici:bar-bistro-l-entracte-val-d-or',true,null),
('Bar Rendez-Vous','Club','888 3e Avenue','Place du Québec','Val-d''Or','J9P 5E6',st_setsrid(st_makepoint(-77.78925,48.10354),4326)::geography,'Val-d''Or nightclub at Place du Québec with cocktails, shows and DJ nights.

Boîte de nuit de Val-d''Or, à la Place du Québec, avec cocktails, spectacles et soirées DJ.',array['Bands','Solo / duo','DJs']::text[],array['pop','rock','country']::text[],'https://barrendezvous.ca',null,'showici','showici:bar-rendez-vous-val-d-or',true,null),
('Théâtre Télébec','Event hall','125 Rue Self',null,'Val-d''Or','J9P 3N2',st_setsrid(st_makepoint(-77.78806,48.09334),4326)::geography,'Val-d''Or''s main performance hall, hosting touring concerts, comedy and theatre.

Principale salle de spectacle de Val-d''Or, qui accueille concerts, humour et théâtre en tournée.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],null,null,'showici','showici:theatre-telebec-val-d-or',true,null),
('Théâtre des Eskers','Event hall','152 14e Avenue Est',null,'Amos','J9T 2G1',st_setsrid(st_makepoint(-78.11126,48.56537),4326)::geography,'Amos''s performance hall (up to 650 seats, or cabaret style) presenting more than 50 shows a year.

Salle de spectacle d''Amos (jusqu''à 650 places, ou en formule cabaret) qui présente plus de 50 spectacles par année.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://cultureamos.ca/lieux-culturels/theatre-des-eskers','819 732-9233','showici','showici:theatre-des-eskers-amos',true,null),
('O''Shack','Bar','21 1re Avenue Est',null,'Amos','J9T 1H2',st_setsrid(st_makepoint(-78.11485,48.57205),4326)::geography,'Downtown Amos bar listed among the town''s live-entertainment spots.

Bar du centre-ville d''Amos répertorié parmi les lieux de divertissement de la ville.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],null,null,'showici','showici:o-shack-amos',true,null),
('Bar L''Alambic','Bar','77 5e Avenue Est',null,'La Sarre','J9Z 1L1',st_setsrid(st_makepoint(-79.20286,48.80535),4326)::geography,'La Sarre tasting bar (60+ whiskies, Québec microbrews) with intimate music nights.

Bar de dégustation de La Sarre (60 whiskys et plus, bières de microbrasseries québécoises) avec soirées musicales intimes.',array['Solo / duo']::text[],array['folk','blues','jazz']::text[],'https://baralambic.com',null,'showici','showici:bar-l-alambic-la-sarre',true,null),
('La Brute du Coin','Brewery','635 2e Rue Est',null,'La Sarre','J9Z 3M2',st_setsrid(st_makepoint(-79.2004,48.78956),4326)::geography,'La Sarre microbrewery and pub with a room for events.

Microbrasserie et pub de La Sarre avec salle pour événements.',array['Solo / duo','Bands']::text[],array['rock','folk']::text[],'https://labruteducoin.com',null,'showici','showici:la-brute-du-coin-la-sarre',true,null),
('Barbe Broue Microbrasserie','Brewery','19 Rue Sainte-Anne',null,'Ville-Marie','J9V 2B6',st_setsrid(st_makepoint(-79.44104,47.33075),4326)::geography,'Témiscamingue brewpub on Ville-Marie''s main street, born with its own show stage.

Broue-pub témiscamien sur la rue principale de Ville-Marie, né avec sa propre scène de spectacles.',array['Solo / duo','Bands']::text[],array['folk','rock','Québec francophone']::text[],'https://barbebroue.ca','819 629-7442','showici','showici:barbe-broue-microbrasserie-ville-marie',true,null),
('Le Rift','Event hall','42 Rue Sainte-Anne',null,'Ville-Marie','J9V 2B7',st_setsrid(st_makepoint(-79.43869,47.33125),4326)::geography,'Ville-Marie''s cultural centre with a performance hall, cinema and gallery, presenting concerts and shows.

Centre culturel de Ville-Marie avec salle de spectacle, cinéma et galerie, qui présente concerts et spectacles.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['folk','pop','Québec francophone']::text[],'https://lerift.ca',null,'showici','showici:le-rift-ville-marie',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
