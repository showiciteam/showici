-- ShowIci: unclaimed venues in Gaspésie (Bonaventure, Chandler, Sainte-Anne-des-Monts, Cap-Chat). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Microbrasserie La Belle Aventure','Brewery','Avenue de Grand-Pré',null,'Bonaventure',null,st_setsrid(st_makepoint(-65.49105,48.04586),4326)::geography,'Bonaventure microbrewery. Live shows not confirmed.

Microbrasserie de Bonaventure. Spectacles à confirmer.',array['Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://www.labelleaventure.ca',null,'showici','showici:microbrasserie-la-belle-aventure-bonaventure',true,null),
('Salle Thomas-Morrissey','Event hall','155 Rue Mgr-Ross Ouest',null,'Chandler',null,st_setsrid(st_makepoint(-64.68565,48.35419),4326)::geography,'Chandler''s show hall.

Salle de spectacle de Chandler.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],null,'418 689-3307','showici','showici:salle-thomas-morrissey-chandler',true,null),
('Le Caméléon','Bar','210 Rue Commerciale Est',null,'Chandler',null,st_setsrid(st_makepoint(-64.66779,48.34757),4326)::geography,'Bar on Rue Commerciale in Chandler. Live shows not confirmed.

Bar de la rue Commerciale à Chandler. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','pop']::text[],null,null,'showici','showici:le-cameleon-chandler',true,null),
('Auberge festive Sea Shack','Bar','292 Boulevard Perron Est',null,'Sainte-Anne-des-Monts','G4V 3A7',st_setsrid(st_makepoint(-66.33062,49.17768),4326)::geography,'Seaside festive inn whose bar presents shows of all kinds.

Auberge festive au bord de la mer qui présente des spectacles en tout genre.',array['Bands','Solo / duo','DJs']::text[],array['rock','folk','electronic']::text[],'https://aubergefestive.com','418 763-2999','showici','showici:auberge-festive-sea-shack-sainte-anne-des-monts',true,null),
('Microbrasserie Le Malbord','Brewery','178 1re Avenue Ouest',null,'Sainte-Anne-des-Monts','G4V 1C9',st_setsrid(st_makepoint(-66.49634,49.12756),4326)::geography,'Haute-Gaspésie microbrewery with a tasting room and terrace. Live shows not confirmed.

Microbrasserie de Haute-Gaspésie avec salle de dégustation et terrasse. Spectacles à confirmer.',array['Solo / duo']::text[],array['folk','rock']::text[],'http://www.lemalbord.com','418 764-0022','showici','showici:microbrasserie-le-malbord-sainte-anne-des-monts',true,null),
('L''Abri de l''Anse','Bar','72 Rue Notre-Dame Est',null,'Cap-Chat','G0J 1G0',st_setsrid(st_makepoint(-66.66455,49.10208),4326)::geography,'Café, bar and bowling by the sea in Cap-Chat. Live shows not confirmed.

Café, bar et salle de quilles au bord de la mer à Cap-Chat. Spectacles à confirmer.',array['Solo / duo']::text[],array['folk','pop']::text[],null,'418 786-2420','showici','showici:l-abri-de-l-anse-cap-chat',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
