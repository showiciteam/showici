-- ShowIci: unclaimed venues in Longueuil, Laval and Gatineau. Public sources (venue and city sites, Tourisme Outaouais, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Théâtre de la Ville','Event hall','150 Rue De Gentilly Est',null,'Longueuil','J4H 4A9',st_setsrid(st_makepoint(-73.49507,45.53612),4326)::geography,'Longueuil''s main performing-arts centre, with concerts, comedy and theatre in the Salle Pratt & Whitney Canada and Salle Jean-Louis-Millette.

Principal diffuseur de Longueuil : concerts, humour et théâtre dans les salles Pratt & Whitney Canada et Jean-Louis-Millette.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','jazz']::text[],'https://www.theatredelaville.qc.ca','450 670-1616','showici','showici:theatre-de-la-ville-longueuil',true,null),
('La Distillerie – Vieux-Longueuil','Bar','105 Rue Saint-Charles Ouest','Vieux-Longueuil','Longueuil','J4H 1C7',st_setsrid(st_makepoint(-73.50924,45.53941),4326)::geography,'Cocktail pub on the pedestrian Rue Saint-Charles in Vieux-Longueuil. Live shows not confirmed.

Pub à cocktails sur la rue Saint-Charles piétonne, dans le Vieux-Longueuil. Spectacles à confirmer.',array['DJs','Solo / duo']::text[],array['pop','electronic']::text[],'https://www.pubdistillerie.com','450 912-1302','showici','showici:la-distillerie-vieux-longueuil-longueuil',true,null),
('Théâtre Marcellin-Champagnat','Event hall','1275 Avenue du Collège','Saint-Vincent-de-Paul','Laval','H7C 1W8',st_setsrid(st_makepoint(-73.64959,45.61571),4326)::geography,'Laval theatre hall hosting concerts, comedy and theatre productions.

Salle de Laval qui accueille concerts, humour et théâtre.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'https://theatremc.ca',null,'showici','showici:theatre-marcellin-champagnat-laval',true,null),
('Bar Le Riverside','Bar','298 Boulevard Sainte-Rose','Sainte-Rose','Laval','H7L 1M3',st_setsrid(st_makepoint(-73.79177,45.61116),4326)::geography,'Bar in Vieux-Sainte-Rose by the Rivière des Mille Îles. Live shows not confirmed.

Bar du Vieux-Sainte-Rose au bord de la rivière des Mille Îles. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','Québec francophone']::text[],null,null,'showici','showici:bar-le-riverside-laval',true,null),
('Maison de la culture de Gatineau – Salle Odyssée','Event hall','855 Boulevard de la Gappe',null,'Gatineau','J8T 8H9',st_setsrid(st_makepoint(-75.68193,45.48489),4326)::geography,'Gatineau''s main performance hall, with song, comedy, theatre and cabaret shows.

Principale salle de Gatineau : chanson, humour, théâtre et cabaret.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','country']::text[],'https://www.maisondelaculture.ca','819 243-2525','showici','showici:maison-de-la-culture-de-gatineau-salle-odyssee-gatineau',true,null),
('La P''tite Grenouille de Gatineau','Bar','9 Rue Aubry','Hull','Gatineau','J8X 2H1',st_setsrid(st_makepoint(-75.71577,45.42674),4326)::geography,'Boîte à chansons in Hull with chansonniers and singalong nights.

Boîte à chansons de Hull avec chansonniers et soirées où tout le monde chante.',array['Solo / duo']::text[],array['Québec francophone','pop','rock']::text[],null,null,'showici','showici:la-p-tite-grenouille-de-gatineau-gatineau',true,null),
('Salle Jean-Despréz','Event hall','25 Rue Laurier','Hull','Gatineau','J8X 4C8',st_setsrid(st_makepoint(-75.71095,45.42791),4326)::geography,'City-run performance hall in the Maison du Citoyen in Hull.

Salle de spectacle municipale à la Maison du citoyen, à Hull.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','classical']::text[],'https://www.gatineau.ca',null,'showici','showici:salle-jean-desprez-gatineau',true,null),
('Cabaret La Basoche','Event hall','120 Rue Principale','Aylmer','Gatineau','J9H 3M3',st_setsrid(st_makepoint(-75.84399,45.39449),4326)::geography,'Intimate cabaret hall in Vieux-Aylmer''s cultural centre for chanson, folk and comedy.

Cabaret intime au centre culturel du Vieux-Aylmer : chanson, folk et humour.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['Québec francophone','folk','jazz']::text[],null,null,'showici','showici:cabaret-la-basoche-gatineau',true,null),
('Théâtre de l''Île','Event hall','1 Rue Wellington','Hull','Gatineau','J8X 2H3',st_setsrid(st_makepoint(-75.72467,45.42551),4326)::geography,'Gatineau''s municipal theatre on an island in Hull.

Théâtre municipal de Gatineau, sur une île à Hull.',array['Stand-up comedy','Solo / duo']::text[],array['Québec francophone']::text[],'https://www.gatineau.ca',null,'showici','showici:theatre-de-l-ile-gatineau',true,null),
('Brasserie du Bas-Canada','Brewery','455 Boulevard de la Gappe, local 103',null,'Gatineau','J8T 8N7',st_setsrid(st_makepoint(-75.69971,45.47895),4326)::geography,'Gatineau microbrewery and taproom with vinyl DJ nights. Live shows not confirmed.

Microbrasserie de Gatineau avec soirées DJ vinyle. Spectacles à confirmer.',array['DJs','Solo / duo']::text[],array['electronic','rock']::text[],'https://www.brasseriebascanada.com','819 525-6162','showici','showici:brasserie-du-bas-canada-gatineau',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
