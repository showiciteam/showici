-- ShowIci: unclaimed venues in Saguenay–Lac-Saint-Jean. Public sources (venue sites, Tourisme Saguenay–Lac-Saint-Jean, Le Point de Vente, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('La Voie Maltée Chicoutimi','Brewery','224 Rue des Laurentides','Chicoutimi','Saguenay','G7H 7X8',st_setsrid(st_makepoint(-71.06432,48.39919),4326)::geography,'Chicoutimi brewpub institution with a stage where local musicians and comedians perform regularly.

Broue-pub institution de Chicoutimi avec une scène où se produisent régulièrement musiciens et humoristes d''ici.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','folk','Québec francophone']::text[],'https://lavoiemaltee.com',null,'showici','showici:la-voie-maltee-chicoutimi-saguenay',true,null),
('Taverne Racine (Le Corner)','Bar','422 Rue Racine Est','Chicoutimi','Saguenay','G7H 4R4',st_setsrid(st_makepoint(-71.05544,48.42815),4326)::geography,'Downtown Chicoutimi tavern on Racine Street, listed among Québec''s independent show venues.

Taverne du centre-ville de Chicoutimi, rue Racine, répertoriée parmi les salles indépendantes du Québec.',array['Bands','Solo / duo']::text[],array['rock','indie','punk']::text[],null,null,'showici','showici:taverne-racine-le-corner-saguenay',true,null),
('Bar Le Centenaire','Bar','320 Rue Racine Est','Chicoutimi','Saguenay','G7H 1S6',st_setsrid(st_makepoint(-71.05892,48.42747),4326)::geography,'Racine Street bar in downtown Chicoutimi.

Bar de la rue Racine, au centre-ville de Chicoutimi.',array['Solo / duo','DJs']::text[],array['pop','rock']::text[],null,null,'showici','showici:bar-le-centenaire-saguenay',true,null),
('Bar à Pitons de la Maison Price','Bar','110 Rue Price Ouest','Chicoutimi','Saguenay','G7J 1G8',st_setsrid(st_makepoint(-71.07232,48.42535),4326)::geography,'Arcade-bar in Chicoutimi''s historic Maison Price that also hosts shows and spoken-word nights.

Bar à pitons dans la Maison Price historique de Chicoutimi qui accueille aussi spectacles et soirées de slam.',array['Stand-up comedy','Solo / duo','Bands']::text[],array['indie','folk']::text[],'https://barapitons.com',null,'showici','showici:bar-a-pitons-de-la-maison-price-saguenay',true,null),
('Bar Spectacle Le Bunker','Bar','564 Boulevard du Saguenay Ouest','Chicoutimi','Saguenay','G7J 1H4',st_setsrid(st_makepoint(-71.08482,48.4325),4326)::geography,'Chicoutimi show bar known for rock, punk and metal concerts.

Bar-spectacle de Chicoutimi connu pour ses concerts rock, punk et métal.',array['Bands']::text[],array['rock','metal','punk']::text[],null,null,'showici','showici:bar-spectacle-le-bunker-saguenay',true,null),
('La Nuit des Temps','Event hall','377 Rue Racine Est','Chicoutimi','Saguenay','G7H 1S8',st_setsrid(st_makepoint(-71.05679,48.42788),4326)::geography,'Show venue on Racine Street presenting concerts and comedy, also available for rental.

Salle de spectacle de la rue Racine qui présente concerts et humour, aussi offerte en location.',array['Bands','Stand-up comedy','Solo / duo']::text[],array['rock','pop','Québec francophone']::text[],'https://lanuitdestemps.ca',null,'showici','showici:la-nuit-des-temps-saguenay',true,null),
('Bistro Café Summum','Bar','250 Rue Racine Est','Chicoutimi','Saguenay','G7H 1R9',st_setsrid(st_makepoint(-71.06024,48.42753),4326)::geography,'Relaxed Racine Street bistro-bar with a varied programme of jazz, blues and pop-rock.

Bistro-bar décontracté de la rue Racine avec une programmation variée : jazz, blues et pop-rock.',array['Solo / duo','Bands']::text[],array['jazz','blues','rock']::text[],null,null,'showici','showici:bistro-cafe-summum-saguenay',true,null),
('Le Sous-Bois','Club','405 Rue Racine Est','Chicoutimi','Saguenay','G7H 1S8',st_setsrid(st_makepoint(-71.05566,48.42803),4326)::geography,'Downtown Chicoutimi club with DJ sets.

Club du centre-ville de Chicoutimi avec soirées DJ.',array['DJs']::text[],array['electronic','hip-hop']::text[],null,null,'showici','showici:le-sous-bois-saguenay',true,null),
('Le Murdock','Pub','815 Rue Murdock','Chicoutimi','Saguenay','G7H 3Z5',st_setsrid(st_makepoint(-71.04482,48.41581),4326)::geography,'Traditional Chicoutimi pub with a fireplace.

Pub traditionnel de Chicoutimi avec foyer.',array['Solo / duo']::text[],array['folk','rock']::text[],null,null,'showici','showici:le-murdock-saguenay',true,null),
('Le Calypso','Event hall','3812 Rue d''Auteuil','Jonquière','Saguenay','G7X 0C2',st_setsrid(st_makepoint(-71.24804,48.40883),4326)::geography,'Independent Jonquière presenter with shows, dinner-shows and tribute acts, plus hall rental.

Diffuseur indépendant de Jonquière avec spectacles, soupers-spectacles et hommages, et location de salle.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','rock','Québec francophone']::text[],'https://lecalypso.ca','418 542-1136','showici','showici:le-calypso-saguenay',true,null),
('L''Envol','Pub','2406 Rue Saint-Dominique','Jonquière','Saguenay','G7X 6K6',st_setsrid(st_makepoint(-71.25539,48.41171),4326)::geography,'Festive Jonquière pub on Saint-Dominique Street that presents shows.

Pub festif de la rue Saint-Dominique à Jonquière qui présente des spectacles.',array['Bands','Solo / duo']::text[],array['indie','rock','folk']::text[],'https://cafebarlenvol.com',null,'showici','showici:l-envol-saguenay',true,null),
('Théâtre Palace Arvida','Event hall','1900 Boulevard Mellon','Arvida','Saguenay','G7S 3H4',st_setsrid(st_makepoint(-71.18223,48.42897),4326)::geography,'Historic Arvida theatre presenting concerts and comedy (Diffusion Saguenay).

Théâtre historique d''Arvida qui présente concerts et humour (Diffusion Saguenay).',array['Bands','Stand-up comedy','Solo / duo']::text[],array['pop','rock','Québec francophone']::text[],null,null,'showici','showici:theatre-palace-arvida-saguenay',true,null),
('Hopera Microbrasserie','Brewery','2377 Rue Saint-Dominique','Jonquière','Saguenay','G7X 6L4',st_setsrid(st_makepoint(-71.2536,48.41379),4326)::geography,'Jonquière brewpub and pizzeria on Saint-Dominique Street.

Microbrasserie et pizzeria de la rue Saint-Dominique à Jonquière.',array['Solo / duo']::text[],array['folk','rock']::text[],'https://hopera.ca',null,'showici','showici:hopera-microbrasserie-saguenay',true,null),
('Brasserie Port-Alfred','Brewery','531 1re Rue','La Baie','Saguenay',null,st_setsrid(st_makepoint(-70.89007,48.33804),4326)::geography,'La Baie brewpub, resto-pub and show venue with regular rock nights.

Microbrasserie, resto-pub et salle de spectacle de La Baie avec soirées rock régulières.',array['Bands','Solo / duo']::text[],array['rock','folk','Québec francophone']::text[],'https://brasserieportalfred.ca',null,'showici','showici:brasserie-port-alfred-saguenay',true,null),
('Vieux Théâtre de La Baie','Event hall','300 Boulevard de la Grande-Baie Nord','La Baie','Saguenay','G7B 3K3',st_setsrid(st_makepoint(-70.88223,48.33796),4326)::geography,'Historic theatre in La Baie presenting concerts and comedy.

Théâtre historique de La Baie qui présente concerts et humour.',array['Bands','Stand-up comedy','Solo / duo']::text[],array['pop','Québec francophone','folk']::text[],null,null,'showici','showici:vieux-theatre-de-la-baie-saguenay',true,null),
('Microbrasserie du Pavillon Noir','Brewery','756 Rue des Croisières','La Baie','Saguenay','G7B 2X3',st_setsrid(st_makepoint(-70.88011,48.34332),4326)::geography,'Craft brewery by the cruise wharf in La Baie.

Microbrasserie près du quai des croisières à La Baie.',array['Solo / duo']::text[],array['folk','rock']::text[],'https://microdupav.ca',null,'showici','showici:microbrasserie-du-pavillon-noir-saguenay',true,null),
('Le Saint-Fût','Brewery','253 Rue du Saguenay',null,'Saint-Fulgence','G0V 1S0',st_setsrid(st_makepoint(-70.90293,48.44982),4326)::geography,'Co-op microbrewery in Saint-Fulgence on the Saguenay fjord.

Microbrasserie coopérative de Saint-Fulgence, au bord du fjord du Saguenay.',array['Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://lesaintfut.com',null,'showici','showici:le-saint-fut-saint-fulgence',true,null),
('Bistro de l''Anse','Bar','319 Rue Saint-Jean-Baptiste',null,'L''Anse-Saint-Jean','G0V 1J0',st_setsrid(st_makepoint(-70.19619,48.23997),4326)::geography,'A fixture of the Saguenay cultural scene that turns into a concert hall once a week, home of La Chasse-Pinte beers.

Incontournable de la scène culturelle du Saguenay qui se transforme en salle de concert une fois par semaine, maison des bières La Chasse-Pinte.',array['Bands','Solo / duo']::text[],array['folk','Québec francophone','blues']::text[],null,null,'showici','showici:bistro-de-l-anse-l-anse-saint-jean',true,null),
('Le Café du Clocher','Bar','19 Rue Saint-Joseph Sud','Centre-ville','Alma','G8B 3E2',st_setsrid(st_makepoint(-71.65137,48.55106),4326)::geography,'Alma''s downtown show bar, with touring and local bands and a dedicated booking contact.

Bar-spectacle du centre-ville d''Alma, avec groupes en tournée et locaux et un contact booking dédié.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','indie','Québec francophone']::text[],'https://cafeduclocheralma.com','418 662-4801','showici','showici:le-cafe-du-clocher-alma',true,null),
('Bar Le Perroquet','Bar','427 Rue Collard','Centre-ville','Alma','G8B 1N1',st_setsrid(st_makepoint(-71.6488,48.54809),4326)::geography,'Downtown Alma bar.

Bar du centre-ville d''Alma.',array['Solo / duo','DJs']::text[],array['pop','rock']::text[],null,null,'showici','showici:bar-le-perroquet-alma',true,null),
('Microbrasserie Lion Bleu','Brewery','45 Rue Saint-Joseph','Centre-ville','Alma','G8B 3E2',st_setsrid(st_makepoint(-71.6521,48.55001),4326)::geography,'Alma microbrewery that mixes art, music and beer.

Microbrasserie d''Alma qui marie art, musique et bière.',array['Solo / duo','Bands']::text[],array['folk','indie']::text[],'https://microlionbleu.com',null,'showici','showici:microbrasserie-lion-bleu-alma',true,null),
('Bercée Microbrasserie','Brewery','150 Route d''Hébertville',null,'Hébertville','G8N 1M8',st_setsrid(st_makepoint(-71.68564,48.38465),4326)::geography,'Microbrewery in an ancestral house in Hébertville with a tasting room and terrace.

Microbrasserie dans une maison ancestrale d''Hébertville, avec salon de dégustation et terrasse.',array['Solo / duo']::text[],array['folk']::text[],'https://berceemicrobrasserie.com',null,'showici','showici:bercee-microbrasserie-hebertville',true,null),
('Microbrasserie du Lac Saint-Jean','Brewery','120 Rue de la Plage',null,'Saint-Gédéon','G0W 2P0',st_setsrid(st_makepoint(-71.78031,48.4905),4326)::geography,'The Lac-Saint-Jean''s first microbrewery (2007), with a bistro, terrace and summer shows.

Première microbrasserie du Lac-Saint-Jean (2007), avec bistro, terrasse et spectacles l''été.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone']::text[],'https://microdulac.com',null,'showici','showici:microbrasserie-du-lac-saint-jean-saint-gedeon',true,null),
('Microbrasserie La Chouape','Brewery','1134 Boulevard du Sacré-Coeur',null,'Saint-Félicien','G8K 2R1',st_setsrid(st_makepoint(-72.44488,48.65194),4326)::geography,'Saint-Félicien microbrewery and pub.

Microbrasserie et pub de Saint-Félicien.',array['Solo / duo']::text[],array['folk','rock']::text[],'https://lachouape.com',null,'showici','showici:microbrasserie-la-chouape-saint-felicien',true,null),
('Vox Populi','Bar','1460 Boulevard Wallberg',null,'Dolbeau-Mistassini','G8L 1H4',st_setsrid(st_makepoint(-72.2292,48.87923),4326)::geography,'Co-op show bar in Dolbeau-Mistassini, a regional institution since 1986.

Bar-spectacle coopératif de Dolbeau-Mistassini, institution régionale depuis 1986.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['rock','indie','Québec francophone']::text[],'https://voxpopuli.ca',null,'showici','showici:vox-populi-dolbeau-mistassini',true,null),
('Microbrasserie Le Coureur des Bois','Brewery','1551 Boulevard Wallberg',null,'Dolbeau-Mistassini','G8L 1H7',st_setsrid(st_makepoint(-72.23025,48.87979),4326)::geography,'Dolbeau-Mistassini microbrewery and bistro-bar with a big, lively terrace.

Microbrasserie et bistro-bar de Dolbeau-Mistassini avec une grande terrasse animée.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://microlecoureurdesbois.com','418 979-1197','showici','showici:microbrasserie-le-coureur-des-bois-dolbeau-mistassini',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
