-- ShowIci: unclaimed venues in Chaudière-Appalaches (Thetford Mines, Montmagny, Saint-Georges). Public sources (venue sites, Pouding chômeur, Tourisme Chaudière-Appalaches, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Le Vitrail – Espace culturel','Event hall','1254 Boulevard Sainte-Marthe',null,'Thetford Mines','G6G 4H9',st_setsrid(st_makepoint(-71.307,46.0935),4326)::geography,'Former church turned concert hall in Thetford Mines.

Ancienne église transformée en salle de concert à Thetford Mines.',array['Solo / duo','Bands']::text[],array['classical','folk','Québec francophone']::text[],null,'418 333-6992','showici','showici:le-vitrail-espace-culturel-thetford-mines',true,null),
('La Baraque – Pub et divertissements','Pub','137 Rue Notre-Dame Ouest',null,'Thetford Mines','G6G 1J4',st_setsrid(st_makepoint(-71.3021,46.0892),4326)::geography,'Thetford Mines pub with shows and sports nights.

Pub de Thetford Mines avec spectacles et soirées sportives.',array['Bands','Solo / duo']::text[],array['rock','Québec francophone']::text[],null,null,'showici','showici:la-baraque-pub-et-divertissements-thetford-mines',true,null),
('Salle Promutuel Assurance','Event hall','29 Rue Saint-Jean-Baptiste Est',null,'Montmagny','G5V 1J6',st_setsrid(st_makepoint(-70.5614,46.9797),4326)::geography,'Montmagny''s main hall, programmed by Les Arts de la scène de Montmagny.

Principale salle de Montmagny, programmée par Les Arts de la scène de Montmagny.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','country']::text[],'https://www.adls.ca','418 241-5799','showici','showici:salle-promutuel-assurance-montmagny',true,null),
('Salle Alphonse-Desjardins du Cégep Beauce-Appalaches','Event hall','1055 116e Rue Est',null,'Saint-Georges',null,st_setsrid(st_makepoint(-70.6689,46.1287),4326)::geography,'Cégep concert hall in Saint-Georges programmed by Les Amants de la scène.

Salle du cégep à Saint-Georges programmée par Les Amants de la scène.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],null,'418 228-8896','showici','showici:salle-alphonse-desjardins-du-cegep-beauce-appalaches-saint-georges',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
