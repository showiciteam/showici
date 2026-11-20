-- ShowIci: more unclaimed venues in Québec City. Public sources (venue sites, Québec Cité, Vraiment Québec, Carrera Café journal, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('La Piazz – Boîte à chansons','Bar','641 Grande Allée Est','Colline parlementaire','Québec','G1R 3N8',st_setsrid(st_makepoint(-71.21619,46.80634),4326)::geography,'Grande Allée boîte à chansons with chansonniers seven nights a week.

Boîte à chansons de la Grande Allée avec chansonniers sept soirs sur sept.',array['Solo / duo']::text[],array['Québec francophone','pop','rock']::text[],'https://www.lapiazz.ca','418 262-7019','showici','showici:la-piazz-boite-a-chansons-quebec',true,null),
('Dorsay Pub Britannique','Pub','65 Rue de Buade','Vieux-Québec','Québec','G1R 4A2',st_setsrid(st_makepoint(-71.20727,46.81361),4326)::geography,'Old Québec British pub with chansonniers in summer and Celtic sessions.

Pub britannique du Vieux-Québec avec chansonniers l''été et sessions celtiques.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone','rock']::text[],'https://www.dorsaypubbritannique.com','418 694-1582','showici','showici:dorsay-pub-britannique-quebec',true,null),
('Carrera Café','Restaurant','72 Boulevard Champlain','Petit-Champlain','Québec','G1R 4A8',st_setsrid(st_makepoint(-71.2033,46.811),4326)::geography,'Petit-Champlain café with music sessions in its stone cellar some evenings.

Café du Petit-Champlain avec sessions musicales certains soirs dans sa cave de pierre.',array['Solo / duo']::text[],array['jazz','folk']::text[],'https://carreracafe.ca',null,'showici','showici:carrera-cafe-quebec',true,null),
('Méduse – Salle Multi','Event hall','650 Côte d''Abraham','Saint-Roch','Québec','G1K 1A1',st_setsrid(st_makepoint(-71.22133,46.81269),4326)::geography,'Arts co-op in Saint-Roch whose Salle Multi hosts experimental, electronic and jazz performances.

Coopérative culturelle de Saint-Roch dont la Salle Multi accueille performances expérimentales, électro et jazz.',array['Bands','Solo / duo','DJs']::text[],array['electronic','jazz','experimental']::text[],'https://meduse.org','418 640-9218','showici','showici:meduse-salle-multi-quebec',true,null),
('L''Autre Zone','Bar','1096 3e Avenue','Limoilou','Québec','G1L 2W9',st_setsrid(st_makepoint(-71.23008,46.82717),4326)::geography,'Limoilou bar on 3e Avenue with DJ nights and concerts.

Bar de la 3e Avenue à Limoilou avec soirées DJ et concerts.',array['DJs','Bands']::text[],array['electronic','rock']::text[],null,null,'showici','showici:l-autre-zone-quebec',true,null),
('Bar Le Saint-Laurent – Château Frontenac','Bar','1 Rue des Carrières','Vieux-Québec','Québec','G1R 4P5',st_setsrid(st_makepoint(-71.20514,46.81182),4326)::geography,'The Château Frontenac''s piano bar, with live jazz on Friday nights.

Piano-bar du Château Frontenac, avec jazz en direct le vendredi soir.',array['Solo / duo']::text[],array['jazz']::text[],'https://www.fairmont.com/frontenac-quebec/',null,'showici','showici:bar-le-saint-laurent-chateau-frontenac-quebec',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
