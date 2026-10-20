-- ShowIci: first batch of unclaimed Montréal venues (public sources: OpenStreetMap, venue websites, public guides).
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Bar de Courcelle','Bar','4685 Rue Notre-Dame Ouest','Saint-Henri','Montréal','H4C 1S7',st_setsrid(st_makepoint(-73.58881,45.47290),4326)::geography,'Neighbourhood bar in Saint-Henri known for live bands early in the week and an open mic night.

Bar de quartier de Saint-Henri reconnu pour ses groupes en début de semaine et sa soirée micro ouvert.',array['Bands','Solo / duo']::text[],array['Indie','Folk']::text[],null,null,'showici','osm:n12194354011',true,null),
('Casa del Popolo','Bar','4873 Boulevard Saint-Laurent','Mile End','Montréal','H2T 1R5',st_setsrid(st_makepoint(-73.59056,45.52217),4326)::geography,'Café, bar and intimate stage on Saint-Laurent, a Mile End institution for indie, folk and experimental shows.

Café, bar et petite scène sur Saint-Laurent, une institution du Mile End pour les spectacles indie, folk et expérimentaux.',array['Bands','Solo / duo','DJs']::text[],array['Indie','Folk','Experimental']::text[],'https://casadelpopolo.com','514 284-3804','showici','osm:n1570292450',true,null),
('La Sala Rossa','Event hall','4848 Boulevard Saint-Laurent','Mile End','Montréal','H2T 1R5',st_setsrid(st_makepoint(-73.59043,45.52180),4326)::geography,'Roughly 250-capacity hall above a Spanish restaurant, hosting indie rock, jazz, flamenco and spoken word.

Salle d''environ 250 places au-dessus d''un restaurant espagnol : rock indie, jazz, flamenco et spoken word.',array['Bands','Solo / duo']::text[],array['Indie','Jazz','World']::text[],'https://casadelpopolo.com/en/info/la-sala-rossa',null,'showici','osm:n2084779406',true,null),
('L''Escogriffe','Bar','4461 Rue Saint-Denis','Plateau-Mont-Royal','Montréal','H2J 2L2',st_setsrid(st_makepoint(-73.58226,45.52384),4326)::geography,'Small Plateau bar and stage for punk, indie and underground bands.

Petit bar-spectacle du Plateau pour les groupes punk, indie et underground.',array['Bands']::text[],array['Punk','Indie','Rock']::text[],'https://www.facebook.com/lescomontreal','514 842-7244','showici','osm:n2496131090',true,null),
('Turbo Haüs','Bar','2040 Rue Saint-Denis','Quartier latin','Montréal','H2X 3K8',st_setsrid(st_makepoint(-73.56592,45.51605),4326)::geography,'Rock and punk bar on Saint-Denis with regular concerts and DJ nights.

Bar rock et punk sur Saint-Denis avec concerts réguliers et soirées DJ.',array['Bands','DJs']::text[],array['Punk','Rock','Metal']::text[],'https://www.turbohaus.ca','514 379-6363','showici','osm:n11004970512',true,null),
('Quai des Brumes','Bar','4481 Rue Saint-Denis','Plateau-Mont-Royal','Montréal','H2J 2L2',st_setsrid(st_makepoint(-73.58251,45.52392),4326)::geography,'Long-running Plateau bar with live shows in its upstairs and main rooms.

Bar emblématique du Plateau qui présente des spectacles dans ses salles.',array['Bands','Solo / duo']::text[],array['Rock','Blues','Folk']::text[],'https://www.quaidesbrumes.ca','514 499-0467','showici','osm:n2496131104',true,null),
('Barfly','Bar','4062 Boulevard Saint-Laurent','Plateau-Mont-Royal','Montréal','H2W 1Y4',st_setsrid(st_makepoint(-73.57994,45.51705),4326)::geography,'Tiny dive bar on the Main known for nightly blues, bluegrass and rock.

Petit bar sans prétention sur le boulevard Saint-Laurent, connu pour le blues, le bluegrass et le rock.',array['Bands','Solo / duo']::text[],array['Blues','Bluegrass','Rock']::text[],null,null,'showici','osm:n1573455214',true,null),
('Bar Le Ritz PDB','Bar','179 Rue Jean-Talon Ouest','Mile-Ex','Montréal','H2R 0C2',st_setsrid(st_makepoint(-73.62036,45.53273),4326)::geography,'Mile-Ex bar and venue hosting live music and DJ nights.

Bar et salle du Mile-Ex qui accueille concerts et soirées DJ.',array['Bands','DJs']::text[],array['Indie','Hip-hop','Electronic']::text[],'https://www.barleritzpdb.com',null,'showici','osm:n6046786900',true,null),
('Ausgang Plaza','Club','6524 Rue Saint-Hubert','Petite-Patrie','Montréal','H2S 1S7',st_setsrid(st_makepoint(-73.60374,45.53631),4326)::geography,'Venue on Plaza Saint-Hubert for live music and dance parties.

Salle de la Plaza Saint-Hubert pour concerts et soirées dansantes.',array['Bands','DJs']::text[],array['Indie','Electronic']::text[],null,null,'showici','showici:ausgang-plaza',true,null),
('Café Campus','Club','57 Rue Prince-Arthur Est','Quartier latin','Montréal','H2X 1B3',st_setsrid(st_makepoint(-73.57218,45.51454),4326)::geography,'Prince-Arthur venue with concerts and dance nights, a long-time student favourite.

Salle de la rue Prince-Arthur avec concerts et soirées dansantes, populaire auprès des étudiants depuis longtemps.',array['Bands','DJs']::text[],array['Rock','Pop','Francophone']::text[],'https://www.cafecampus.com','514 844-1010','showici','osm:n458918546',true,null),
('Café Résonance','Café','5175 Avenue du Parc','Mile End','Montréal','H2V 4G3',st_setsrid(st_makepoint(-73.59719,45.52041),4326)::geography,'Café and bar on Parc with jazz and modern music most nights.

Café-bar de l''avenue du Parc avec du jazz et de la musique actuelle presque tous les soirs.',array['Solo / duo','Bands']::text[],array['Jazz','Experimental']::text[],null,null,'showici','showici:cafe-resonance',true,null),
('Bistro à Jojo','Pub','1627 Rue Saint-Denis','Quartier latin','Montréal','H2X 3K4',st_setsrid(st_makepoint(-73.56307,45.51502),4326)::geography,'Classic blues joint in the Latin Quarter with live music every night.

Bar blues classique du Quartier latin avec musique live tous les soirs.',array['Bands']::text[],array['Blues','Rock']::text[],'https://www.bistroajojo.com','514 843-5015','showici','osm:n1429426106',true,null),
('Dièse Onze','Bar','4115 Rue Saint-Denis','Plateau-Mont-Royal','Montréal','H2W 2M7',st_setsrid(st_makepoint(-73.57692,45.52141),4326)::geography,'Basement jazz club on the Plateau with music nightly.

Club de jazz en sous-sol sur le Plateau, musique tous les soirs.',array['Bands','Solo / duo']::text[],array['Jazz']::text[],'https://dieseonze.com','514 223-3543','showici','osm:n6525867485',true,null),
('Upstairs Jazz Bar & Grill','Bar','1254 Rue Mackay','Downtown','Montréal','H3G 2H4',st_setsrid(st_makepoint(-73.57684,45.49560),4326)::geography,'Downtown jazz club and restaurant on Mackay.

Club de jazz et restaurant du centre-ville, rue Mackay.',array['Bands','Solo / duo']::text[],array['Jazz']::text[],'https://upstairsjazz.com','514 931-6808','showici','osm:n6525867285',true,null),
('Cabaret Jazz L''Entracte','Bar','1112 Rue Sainte-Catherine Ouest','Downtown','Montréal','H3B 1H4',st_setsrid(st_makepoint(-73.57299,45.49956),4326)::geography,'Non-profit downtown jazz venue that showcases emerging local musicians alongside established players.

Salle de jazz sans but lucratif au centre-ville qui met en valeur la relève locale aux côtés de musiciens établis.',array['Bands','Solo / duo']::text[],array['Jazz']::text[],null,null,'showici','showici:cabaret-jazz-l-entracte',true,null),
('Lovebird','Bar','101 Rue de la Capitale','Old Montréal','Montréal','H2Y 1Z3',st_setsrid(st_makepoint(-73.55420,45.50380),4326)::geography,'Old Montréal cocktail bar with live jazz, soul and acoustic music several nights a week.

Bar à cocktails du Vieux-Montréal avec jazz, soul et acoustique plusieurs soirs par semaine.',array['Solo / duo','Bands']::text[],array['Jazz','Soul','Acoustic']::text[],null,null,'showici','showici:lovebird',true,null),
('Modavie','Restaurant','1 Rue Saint-Paul Ouest','Old Montréal','Montréal','H2Y 1Y6',st_setsrid(st_makepoint(-73.55396,45.50548),4326)::geography,'Old Montréal bistro and wine bar with live jazz, blues and R&B.

Bistro et bar à vin du Vieux-Montréal avec jazz, blues et R&B en direct.',array['Solo / duo','Bands']::text[],array['Jazz','Blues','R&B']::text[],null,null,'showici','showici:modavie',true,null),
('Hurley''s Irish Pub','Pub','1225 Rue Crescent','Downtown','Montréal','H3G 2A9',st_setsrid(st_makepoint(-73.57484,45.49687),4326)::geography,'Crescent Street Irish pub known for traditional live music every night.

Pub irlandais de la rue Crescent reconnu pour sa musique traditionnelle tous les soirs.',array['Bands','Solo / duo']::text[],array['Celtic','Folk']::text[],null,null,'showici','osm:n1199285545',true,null),
('Le Vieux Dublin','Pub','636 Rue Cathcart','Downtown','Montréal','H3B 3C4',st_setsrid(st_makepoint(-73.56865,45.50298),4326)::geography,'Downtown Irish pub and restaurant with live music.

Pub et restaurant irlandais du centre-ville avec musique live.',array['Bands','Solo / duo']::text[],array['Celtic','Rock']::text[],null,null,'showici','osm:n1205171430',true,null),
('McLean''s Pub','Pub','1210 Rue Peel','Downtown','Montréal','H3A 1T5',st_setsrid(st_makepoint(-73.57214,45.49952),4326)::geography,'Downtown pub with live music, DJs, karaoke and comedy.

Pub du centre-ville avec musique live, DJ, karaoké et humour.',array['Bands','DJs','Stand-up comedy']::text[],array['Rock','Pop']::text[],'https://www.mcleanspub.com',null,'showici','osm:n1290835184',true,null),
('Honey Martin Pub','Pub','5916 Rue Sherbrooke Ouest','Notre-Dame-de-Grâce','Montréal','H4A 1X9',st_setsrid(st_makepoint(-73.61892,45.46873),4326)::geography,'NDG neighbourhood pub known for its regular live music.

Pub de quartier de NDG reconnu pour ses soirées de musique live.',array['Bands','Solo / duo']::text[],array['Folk','Rock','Celtic']::text[],null,null,'showici','showici:honey-martin-pub',true,null),
('Brutopia','Pub','1219 Rue Crescent','Downtown','Montréal','H3G 2A9',st_setsrid(st_makepoint(-73.57446,45.49668),4326)::geography,'Crescent Street brewpub with live music and a weekly open mic.

Microbrasserie de la rue Crescent avec musique live et micro ouvert hebdomadaire.',array['Bands','Solo / duo']::text[],array['Rock','Folk']::text[],null,null,'showici','osm:n988366394',true,null),
('McKibbin''s Irish Pub','Pub','1426 Rue Bishop','Downtown','Montréal','H3G 2E4',st_setsrid(st_makepoint(-73.57723,45.49682),4326)::geography,'Downtown Irish pub on Bishop with live music and an English comedy night.

Pub irlandais de la rue Bishop avec musique live et une soirée d''humour en anglais.',array['Bands','Stand-up comedy']::text[],array['Celtic','Rock']::text[],null,null,'showici','osm:n1192154422',true,null),
('Brass Door Pub','Pub','2171 Rue Crescent','Downtown','Montréal','H3G 2C1',st_setsrid(st_makepoint(-73.57855,45.49872),4326)::geography,'Crescent Street pub that hosts live music.

Pub de la rue Crescent qui présente de la musique live.',array['Bands','Solo / duo']::text[],array['Rock','Pop']::text[],null,null,'showici','showici:brass-door-pub',true,null),
('Pub West Shefford','Pub','1562 Avenue du Mont-Royal Est','Plateau-Mont-Royal','Montréal','H2J 1Y9',st_setsrid(st_makepoint(-73.57557,45.53168),4326)::geography,'Mont-Royal Avenue pub with concerts and a French stand-up night.

Pub de l''avenue du Mont-Royal avec concerts et une soirée d''humour en français.',array['Bands','Stand-up comedy']::text[],array['Rock','Folk']::text[],null,null,'showici','osm:n5702960700',true,null),
('Le Sainte-Élisabeth','Pub','1412 Rue Sainte-Élisabeth','Quartier latin','Montréal','H2X 1L2',st_setsrid(st_makepoint(-73.56229,45.51231),4326)::geography,'Latin Quarter pub with a famous ivy-covered terrace that hosts live music.

Pub du Quartier latin à la célèbre terrasse couverte de lierre, avec musique live.',array['Bands','Solo / duo']::text[],array['Rock','Folk']::text[],'https://ste-elisabeth.com','514 286-4302','showici','osm:n1205310350',true,null),
('Chez Ernest – Comptoir de curiosités','Bar','6596 Rue Saint-Hubert','Petite-Patrie','Montréal','H2S 2M3',st_setsrid(st_makepoint(-73.60500,45.53687),4326)::geography,'Quirky Petite-Patrie bar with concerts and a Monday comedy night.

Bar original de la Petite-Patrie avec concerts et une soirée d''humour le lundi.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Indie','Folk']::text[],'https://chezernest.ca','514 270-7775','showici','osm:n11215982151',true,null),
('Brasserie des Patriotes','Bar','3363 Rue Ontario Est','Hochelaga-Maisonneuve','Montréal','H1W 1P8',st_setsrid(st_makepoint(-73.54634,45.54293),4326)::geography,'Hochelaga bar with live music and stand-up nights.

Bar d''Hochelaga avec musique live et soirées d''humour.',array['Bands','Stand-up comedy']::text[],array['Rock','Francophone']::text[],null,'514 521-0691','showici','osm:n5111366528',true,null),
('Le Record bar & vinyles','Bar','7622 Rue Saint-Hubert','Villeray','Montréal','H2R 2N6',st_setsrid(st_makepoint(-73.62014,45.54376),4326)::geography,'Villeray bar and record shop with live music and vinyl DJ nights.

Bar et disquaire de Villeray avec musique live et soirées vinyles.',array['Bands','DJs']::text[],array['Rock','Soul','Funk']::text[],null,null,'showici','osm:n6299465185',true,null),
('Palco','Bar','4019 Rue Wellington','Verdun','Montréal','H4G 1V3',st_setsrid(st_makepoint(-73.56708,45.46355),4326)::geography,'Verdun bar on Wellington Street that hosts concerts.

Bar de la rue Wellington à Verdun qui présente des concerts.',array['Bands','Solo / duo']::text[],array['Rock','Pop']::text[],null,null,'showici','showici:palco',true,null),
('L''Hémisphère Gauche','Bar','221 Rue Beaubien Est','Petite-Patrie','Montréal','H2S 1R9',st_setsrid(st_makepoint(-73.60680,45.53221),4326)::geography,'Petite-Patrie bar and stage for local bands and songwriters.

Bar-spectacle de la Petite-Patrie pour groupes et auteurs-compositeurs d''ici.',array['Bands','Solo / duo']::text[],array['Indie','Folk','Jazz']::text[],'https://www.hemispheregauche.com','514 278-6693','showici','osm:n1536070983',true,null),
('Grozépa','Bar','5885 Avenue Papineau','Rosemont','Montréal','H2G 2W5',st_setsrid(st_makepoint(-73.59079,45.54060),4326)::geography,'Neighbourhood bar on Papineau that hosts live music.

Bar de quartier de l''avenue Papineau qui présente de la musique live.',array['Bands','Solo / duo']::text[],array['Rock','Folk']::text[],null,null,'showici','showici:grozepa',true,null),
('Espace Tétro Coop','Bar','8628 Rue Hochelaga','Mercier','Montréal','H1L 2M4',st_setsrid(st_makepoint(-73.52015,45.60048),4326)::geography,'Co-op bar and community space in Mercier with concerts.

Bar coopératif et espace communautaire de Mercier avec concerts.',array['Bands','Solo / duo']::text[],array['Indie','Folk']::text[],null,null,'showici','showici:espace-tetro-coop',true,null),
('L''Espace Public – Brasseurs de quartier','Brewery','2287 Avenue Letourneux','Hochelaga-Maisonneuve','Montréal','H1V 2N9',st_setsrid(st_makepoint(-73.54385,45.55420),4326)::geography,'Hochelaga neighbourhood brewpub that hosts concerts.

Microbrasserie de quartier d''Hochelaga qui accueille des concerts.',array['Bands','Solo / duo']::text[],array['Folk','Rock']::text[],null,null,'showici','osm:n9800261297',true,null),
('Benelux','Brewery','245 Rue Sherbrooke Ouest','Quartier latin','Montréal','H2X 1X7',st_setsrid(st_makepoint(-73.57102,45.50959),4326)::geography,'Craft brewery bar on Sherbrooke that hosts concerts.

Brasserie artisanale de la rue Sherbrooke qui présente des concerts.',array['Bands','Solo / duo']::text[],array['Indie','Folk']::text[],'https://brasseriebenelux.com','514 543-9750','showici','osm:n1573497823',true,null),
('Benelux Verdun','Brewery','4026 Rue Wellington','Verdun','Montréal','H4G 1V3',st_setsrid(st_makepoint(-73.56682,45.46344),4326)::geography,'Verdun location of the Benelux brewery, with a Monday stand-up night.

Succursale de Verdun de la brasserie Benelux, avec une soirée d''humour le lundi.',array['Bands','Stand-up comedy']::text[],array['Indie','Folk']::text[],'https://brasseriebenelux.com/wellington','514 508-5592','showici','osm:n2319605488',true,null),
('Birra','Brewery','7129 Boulevard Saint-Laurent','Petite-Patrie','Montréal','H2S 0B2',st_setsrid(st_makepoint(-73.61733,45.53436),4326)::geography,'House-brewed beer bar near Jean-Talon Market that hosts live music.

Bar à bières maison près du marché Jean-Talon qui présente de la musique live.',array['Bands','Solo / duo']::text[],array['Rock','Folk']::text[],'https://birra.ca','514 447-3154','showici','osm:n6185263885',true,null),
('L''Entre2','Bar','1738 Rue Saint-Denis','Quartier latin','Montréal','H2X 3K4',st_setsrid(st_makepoint(-73.56503,45.51550),4326)::geography,'Latin Quarter bar on Saint-Denis that hosts live music.

Bar du Quartier latin sur Saint-Denis qui présente de la musique live.',array['Bands','Solo / duo']::text[],array['Rock','Pop']::text[],null,null,'showici','showici:l-entre2',true,null),
('La Rockette','Bar','4479 Rue Saint-Denis','Plateau-Mont-Royal','Montréal','H2J 2L2',st_setsrid(st_makepoint(-73.58248,45.52390),4326)::geography,'Rock bar on Saint-Denis with live bands and DJ nights.

Bar rock de la rue Saint-Denis avec groupes et soirées DJ.',array['Bands','DJs']::text[],array['Rock']::text[],null,'514 845-9010','showici','osm:n4654823871',true,null),
('Le P''tit Bar','Bar','3451 Rue Saint-Denis','Plateau-Mont-Royal','Montréal','H2X 3L2',st_setsrid(st_makepoint(-73.56836,45.51751),4326)::geography,'Intimate Saint-Denis bar known for chanson, folk and acoustic sets.

Petit bar intime de la rue Saint-Denis connu pour la chanson, le folk et l''acoustique.',array['Solo / duo','Bands']::text[],array['Francophone','Folk','Jazz']::text[],'https://leptitbar.ca','514 281-9124','showici','osm:n11999027785',true,null),
('Taverne Normandie','Bar','1295 Rue Atateken','Centre-Sud','Montréal','H2L 3K9',st_setsrid(st_makepoint(-73.55647,45.51731),4326)::geography,'Centre-Sud tavern that hosts concerts.

Taverne du Centre-Sud qui présente des concerts.',array['Bands','Solo / duo']::text[],array['Rock','Folk']::text[],'https://taverne-normandie.ca','514 303-4013','showici','osm:n2941232765',true,null),
('Mythos Ouzeri','Restaurant','5318 Avenue du Parc','Mile End','Montréal','H2V 4G7',st_setsrid(st_makepoint(-73.59990,45.52094),4326)::geography,'Greek restaurant on Parc with house bands on Friday and Saturday nights.

Restaurant grec de l''avenue du Parc avec orchestre maison les vendredis et samedis soir.',array['Bands']::text[],array['Greek','World']::text[],null,null,'showici','showici:mythos-ouzeri',true,null),
('Pub Quartier Latin & Bordel Comédie Club','Club','330 Rue Ontario Est','Quartier latin','Montréal','H2X 1H6',st_setsrid(st_makepoint(-73.56536,45.51499),4326)::geography,'Pub and comedy club with French stand-up shows every day.

Pub et club d''humour avec des spectacles de stand-up en français tous les jours.',array['Stand-up comedy']::text[],array['Comedy']::text[],'https://pubquartierlatin.com','514 845-3301','showici','osm:n2633960911',true,null),
('The Comedy Nest','Club','2313 Rue Sainte-Catherine Ouest','Downtown','Montréal','H3H 1N2',st_setsrid(st_makepoint(-73.58511,45.49027),4326)::geography,'Montréal''s long-running English comedy club.

Club d''humour anglophone bien établi à Montréal.',array['Stand-up comedy']::text[],array['Comedy']::text[],'https://comedynest.com','514 932-6378','showici','osm:n6696932174',true,null),
('Le Terminal Comédie Club','Club','1875 Avenue du Mont-Royal Est','Plateau-Mont-Royal','Montréal','H2H 1J3',st_setsrid(st_makepoint(-73.57395,45.53379),4326)::geography,'French comedy club on Mont-Royal Avenue with shows several nights a week.

Club d''humour francophone de l''avenue du Mont-Royal, plusieurs soirs par semaine.',array['Stand-up comedy']::text[],array['Comedy']::text[],null,null,'showici','osm:n5852327885',true,null),
('Bar Le Jockey','Bar','1309 Rue Saint-Zotique Est','Rosemont','Montréal','H2S 1M6',st_setsrid(st_makepoint(-73.60310,45.54181),4326)::geography,'Rosemont bar with a Monday French stand-up night.

Bar de Rosemont avec une soirée d''humour en français le lundi.',array['Stand-up comedy','Bands']::text[],array['Comedy']::text[],null,null,'showici','showici:bar-le-jockey',true,null),
('Broue Pub Brouhaha','Pub','10295 Avenue Papineau','Ahuntsic','Montréal','H2C 1T3',st_setsrid(st_makepoint(-73.65307,45.56832),4326)::geography,'Ahuntsic brewpub with a weekly French stand-up night.

Broue pub d''Ahuntsic avec une soirée d''humour en français chaque semaine.',array['Stand-up comedy','Bands']::text[],array['Comedy','Rock']::text[],null,null,'showici','showici:broue-pub-brouhaha',true,null),
('L''Île Noire','Pub','1649 Rue Saint-Denis','Quartier latin','Montréal','H2X 3K4',st_setsrid(st_makepoint(-73.56332,45.51524),4326)::geography,'Scotch pub on Saint-Denis with stand-up comedy nights.

Pub à scotch de la rue Saint-Denis avec soirées d''humour.',array['Stand-up comedy','Bands']::text[],array['Comedy']::text[],'https://www.ilenoire.com','514 982-0866','showici','osm:n4722962652',true,null),
('Vices & Versa','Pub','6631 Boulevard Saint-Laurent','Petite-Patrie','Montréal','H2S 3C5',st_setsrid(st_makepoint(-73.61056,45.53134),4326)::geography,'Craft beer pub near Jean-Talon with a Monday stand-up night.

Pub de bières artisanales près de Jean-Talon avec une soirée d''humour le lundi.',array['Stand-up comedy']::text[],array['Comedy']::text[],'https://www.vicesetversa.com','514 272-2498','showici','osm:n1536070986',true,null),
('Melrose','Bar','6548 Boulevard Saint-Laurent','Petite-Patrie','Montréal','H2S 3C5',st_setsrid(st_makepoint(-73.61035,45.53086),4326)::geography,'Little Italy bar with French and English stand-up nights.

Bar de la Petite-Italie avec soirées d''humour en français et en anglais.',array['Stand-up comedy']::text[],array['Comedy']::text[],null,null,'showici','showici:melrose',true,null),
('Brasseur de Montréal','Brewery','1485 Rue Ottawa','Griffintown','Montréal','H3C 1S9',st_setsrid(st_makepoint(-73.56447,45.48967),4326)::geography,'Griffintown microbrewery with a monthly comedy night.

Microbrasserie de Griffintown avec une soirée d''humour mensuelle.',array['Stand-up comedy','Bands']::text[],array['Comedy']::text[],'https://brasseurdemontreal.com',null,'showici','osm:n2092562034',true,null),
('Les Foufounes Électriques','Club','87 Rue Sainte-Catherine Est','Quartier des spectacles','Montréal','H2X 1K9',st_setsrid(st_makepoint(-73.56307,45.51099),4326)::geography,'Legendary alternative bar and concert venue on Sainte-Catherine East.

Bar alternatif et salle de concert légendaire de la rue Sainte-Catherine Est.',array['Bands','DJs']::text[],array['Punk','Metal','Rock']::text[],null,null,'showici','osm:n1296620055',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
