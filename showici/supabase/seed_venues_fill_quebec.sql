-- ShowIci: unclaimed venues in the Québec City area (L'Ancienne-Lorette, Wendake, Stoneham, Île d'Orléans, Donnacona, Saint-Raymond). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Bar Borsalino','Bar','1375 Rue Notre-Dame',null,'L''Ancienne-Lorette',null,st_setsrid(st_makepoint(-71.35311,46.79462),4326)::geography,'Neighbourhood bar in L''Ancienne-Lorette. Live shows not confirmed.

Bar de quartier à L''Ancienne-Lorette. Spectacles à confirmer.',array['Solo / duo']::text[],array['rock','Québec francophone']::text[],null,'418 871-4733','showici','showici:bar-borsalino-l-ancienne-lorette',true,null),
('Hôtel-Musée Premières Nations','Event hall','5 Place de la Rencontre',null,'Wendake','G0A 4V0',st_setsrid(st_makepoint(-71.35841,46.85691),4326)::geography,'Wendake hotel-museum with a lobby bar and cultural evenings. Live shows not confirmed.

Hôtel-musée de Wendake avec bar et soirées culturelles. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['folk','world']::text[],'https://hotelpremieresnations.ca','418 847-2222','showici','showici:hotel-musee-premieres-nations-wendake',true,null),
('La Souche Stoneham','Brewery','22 1re Avenue',null,'Stoneham-et-Tewkesbury','G3C 0K7',st_setsrid(st_makepoint(-71.36977,46.98806),4326)::geography,'Stoneham brewpub at the foot of the slopes, with musicians and shows.

Microbrasserie de Stoneham au pied des pentes, avec musiciens et spectacles.',array['Solo / duo','Bands']::text[],array['rock','folk','Québec francophone']::text[],'https://lasouche.ca','418 848-8529','showici','showici:la-souche-stoneham-stoneham-et-tewkesbury',true,null),
('Espace Félix-Leclerc','Event hall','1214 Chemin Royal',null,'Saint-Pierre-de-l''Île-d''Orléans','G0A 4E0',st_setsrid(st_makepoint(-71.09468,46.87555),4326)::geography,'Île d''Orléans venue honouring Félix Leclerc, presenting song and music shows.

Lieu de l''Île d''Orléans consacré à Félix Leclerc, qui présente des spectacles de chanson et de musique.',array['Solo / duo','Bands']::text[],array['Québec francophone','folk']::text[],'https://felixleclerc.com','418 828-1682','showici','showici:espace-felix-leclerc-saint-pierre-de-l-ile-d-orleans',true,null),
('Microbrasserie de l''Île d''Orléans – Pub Le Mitan','Brewery','2471 Chemin Royal',null,'Sainte-Famille','G0A 3P0',st_setsrid(st_makepoint(-70.96328,46.97302),4326)::geography,'Île d''Orléans microbrewery and pub. Live shows not confirmed.

Microbrasserie et pub de l''Île d''Orléans. Spectacles à confirmer.',array['Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://www.microorleans.com','418 829-0408','showici','showici:microbrasserie-de-l-ile-d-orleans-pub-le-mitan-sainte-famille',true,null),
('Salle Luc-Plamondon','Event hall','320 Rue de l''Église',null,'Donnacona',null,st_setsrid(st_makepoint(-71.72829,46.67984),4326)::geography,'Donnacona performance hall programmed by Art Spec Portneuf.

Salle de spectacle de Donnacona programmée par Art Spec Portneuf.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'http://www.artspecportneuf.com','418 285-0059','showici','showici:salle-luc-plamondon-donnacona',true,null),
('Microbrasserie Roquemont','Brewery','105 Grande Ligne',null,'Saint-Raymond','G3L 2Y4',st_setsrid(st_makepoint(-71.81517,46.89958),4326)::geography,'Saint-Raymond brewpub and hotel with bands Thursday to Saturday.

Microbrasserie-hôtel de Saint-Raymond avec groupes du jeudi au samedi.',array['Bands','Solo / duo']::text[],array['rock','Québec francophone','country']::text[],'https://www.roquemont.com','418 337-6734','showici','showici:microbrasserie-roquemont-saint-raymond',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
