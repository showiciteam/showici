-- ShowIci: unclaimed venues in Gaspésie and the Îles-de-la-Madeleine. Public sources (venue sites, Pouding chômeur, Tourisme Gaspésie, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Bistro-Bar Le Brise-Bise','Bar','135 Rue de la Reine',null,'Gaspé','G4X 1T5',st_setsrid(st_makepoint(-64.48423,48.82921),4326)::geography,'Gaspé''s best-known live-music bistro-bar.

Le bistro-bar de musique live le plus connu de Gaspé.',array['Bands','Solo / duo']::text[],array['rock','folk','Québec francophone']::text[],'https://brisebise.ca',null,'showici','showici:bistro-bar-le-brise-bise-gaspe',true,null),
('Centre de création et de diffusion de Gaspé','Event hall','85 Boulevard de Gaspé',null,'Gaspé','G4X 2R8',st_setsrid(st_makepoint(-64.47866,48.83724),4326)::geography,'Gaspé''s performing-arts presenter and hall.

Diffuseur et salle de spectacle de Gaspé.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'https://centredecreationdiffusiondegaspe.com',null,'showici','showici:centre-de-creation-et-de-diffusion-de-gaspe-gaspe',true,null),
('Théâtre de la Vieille Forge','Event hall','4 Rue de la Longue-Pointe',null,'Petite-Vallée',null,st_setsrid(st_makepoint(-65.04583,49.22252),4326)::geography,'Petite-Vallée theatre at the heart of the Festival en chanson.

Théâtre de Petite-Vallée au cœur du Festival en chanson.',array['Bands','Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://theatredelavieilleforge.com',null,'showici','showici:theatre-de-la-vieille-forge-petite-vallee',true,null),
('La Vieille Usine de l''Anse-à-Beaufils','Event hall','55 Rue à Bonfils','L''Anse-à-Beaufils','Percé','G0C 1G0',st_setsrid(st_makepoint(-64.30835,48.47262),4326)::geography,'Concert hall and café in a former fish plant at L''Anse-à-Beaufils.

Salle de spectacle et café dans une ancienne usine de poisson à L''Anse-à-Beaufils.',array['Bands','Solo / duo']::text[],array['folk','indie','Québec francophone']::text[],'https://lavieilleusine.qc.ca',null,'showici','showici:la-vieille-usine-de-l-anse-a-beaufils-perce',true,null),
('Microbrasserie Pit Caribou','Brewery','27 Rue de l''Anse','L''Anse-à-Beaufils','Percé','G0C 1G0',st_setsrid(st_makepoint(-64.30887,48.47158),4326)::geography,'Gaspé Peninsula brewery at L''Anse-à-Beaufils.

Microbrasserie gaspésienne à L''Anse-à-Beaufils.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://pitcaribou.com',null,'showici','showici:microbrasserie-pit-caribou-perce',true,null),
('Le Naufrageur','Brewery','586 Boulevard Perron',null,'Carleton-sur-Mer','G0C 1J0',st_setsrid(st_makepoint(-66.12552,48.10405),4326)::geography,'Carleton-sur-Mer brewpub with summer shows.

Broue-pub de Carleton-sur-Mer avec spectacles l''été.',array['Solo / duo','Bands']::text[],array['folk','rock','Québec francophone']::text[],'https://lenaufrageur.com',null,'showici','showici:le-naufrageur-carleton-sur-mer',true,null),
('Au Quai des Arts','Event hall','774 Boulevard Perron',null,'Carleton-sur-Mer','G0C 1J0',st_setsrid(st_makepoint(-66.10757,48.10164),4326)::geography,'Carleton-sur-Mer performing-arts centre with a theatre and studio hall.

Centre des arts de la scène de Carleton-sur-Mer avec théâtre et studio.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'https://quaidesarts.ca',null,'showici','showici:au-quai-des-arts-carleton-sur-mer',true,null),
('Salle de spectacles régionale Desjardins','Event hall','99 Place Suzanne-Guité',null,'New Richmond','G0C 2B0',st_setsrid(st_makepoint(-65.86186,48.16186),4326)::geography,'New Richmond''s regional performance hall.

Salle de spectacles régionale de New Richmond.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'https://spectaclesnewrichmond.com',null,'showici','showici:salle-de-spectacles-regionale-desjardins-new-richmond',true,null),
('Bar La Mansarde','Bar','143 Avenue Fraser',null,'Matane','G4W 3G9',st_setsrid(st_makepoint(-67.52952,48.84689),4326)::geography,'Matane bar with live shows.

Bar de Matane avec spectacles.',array['Bands','Solo / duo']::text[],array['rock','pop']::text[],'https://barlamansarde.com',null,'showici','showici:bar-la-mansarde-matane',true,null),
('À l''abri de la Tempête','Brewery','286 Chemin Coulombe','L''Étang-du-Nord','Les Îles-de-la-Madeleine',null,st_setsrid(st_makepoint(-61.9475,47.35089),4326)::geography,'Magdalen Islands microbrewery with 5 à 7 live music.

Microbrasserie des Îles-de-la-Madeleine avec 5 à 7 en musique.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone']::text[],'https://alabridelatempete.com',null,'showici','showici:a-l-abri-de-la-tempete-les-iles-de-la-madeleine',true,null),
('Au Vieux Treuil','Event hall','971 Chemin de La Grave','Havre-Aubert','Les Îles-de-la-Madeleine','G4T 9C8',st_setsrid(st_makepoint(-61.83636,47.2367),4326)::geography,'Concert hall on La Grave site in Havre-Aubert.

Salle de spectacle du site de La Grave à Havre-Aubert.',array['Bands','Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://auvieuxtreuil.ca',null,'showici','showici:au-vieux-treuil-les-iles-de-la-madeleine',true,null),
('L''Îlot café buvette','Bar','143 Chemin Principal','Cap-aux-Meules','Les Îles-de-la-Madeleine','G4T 1C4',st_setsrid(st_makepoint(-61.86717,47.37676),4326)::geography,'Cap-aux-Meules café-buvette with small concerts.

Café-buvette de Cap-aux-Meules avec petits concerts.',array['Solo / duo']::text[],array['folk','indie']::text[],'https://lilotcafebuvette.com',null,'showici','showici:l-ilot-cafe-buvette-les-iles-de-la-madeleine',true,null),
('Aux Pas Perdus','Restaurant','169 Chemin Principal','Cap-aux-Meules','Les Îles-de-la-Madeleine','G4T 1C4',st_setsrid(st_makepoint(-61.86717,47.37676),4326)::geography,'Cap-aux-Meules bistro and guesthouse with live music.

Bistro et auberge de Cap-aux-Meules avec musique live.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone']::text[],'https://pasperdus.com',null,'showici','showici:aux-pas-perdus-les-iles-de-la-madeleine',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
