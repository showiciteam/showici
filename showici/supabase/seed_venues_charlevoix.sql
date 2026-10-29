-- ShowIci: unclaimed venues in Charlevoix. Public sources (venue sites, Pouding chômeur, Tourisme Charlevoix, local listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Auberge La Fascine – bistro culturel','Restaurant','1064 Chemin des Coudriers',null,'L''Isle-aux-Coudres','G0A 1X0',st_setsrid(st_makepoint(-70.38741,47.41842),4326)::geography,'Island inn and cultural bistro with shows on L''Isle-aux-Coudres.

Auberge et bistro culturel avec spectacles à L''Isle-aux-Coudres.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone']::text[],'https://lafascine.com',null,'showici','showici:auberge-la-fascine-bistro-culturel-l-isle-aux-coudres',true,null),
('Auberge musicale Pour un Instant','Restaurant','187 Rue Saint-Raphaël',null,'La Malbaie','G5A 2N6',st_setsrid(st_makepoint(-70.11117,47.65995),4326)::geography,'La Malbaie bistro-crêperie and musical inn with intimate concerts.

Bistro-crêperie et auberge musicale de La Malbaie avec concerts intimes.',array['Solo / duo']::text[],array['folk','jazz','Québec francophone']::text[],null,null,'showici','showici:auberge-musicale-pour-un-instant-la-malbaie',true,null),
('Club Nairn','Bar','162 Rue Lapointe',null,'Clermont','G4A 1J4',st_setsrid(st_makepoint(-70.22927,47.6993),4326)::geography,'Clermont club listed among Charlevoix music venues.

Club de Clermont répertorié parmi les lieux de musique de Charlevoix.',array['Bands','Solo / duo']::text[],array['rock','country']::text[],null,null,'showici','showici:club-nairn-clermont',true,null),
('Domaine Forget','Event hall','5 Rang Saint-Antoine',null,'Saint-Irénée','G0T 1V0',st_setsrid(st_makepoint(-70.20806,47.56379),4326)::geography,'Charlevoix music academy and festival with a concert hall overlooking the river.

Académie et festival de musique de Charlevoix avec salle de concert face au fleuve.',array['Bands','Solo / duo']::text[],array['classical','jazz']::text[],'https://domaineforget.com',null,'showici','showici:domaine-forget-saint-irenee',true,null),
('Les Balcons – Auberge & Bistro culturel','Restaurant','63 Rue Ambroise-Fafard',null,'Baie-Saint-Paul','G3Z 2J7',st_setsrid(st_makepoint(-70.50661,47.43855),4326)::geography,'Baie-Saint-Paul inn and cultural bistro with live shows.

Auberge et bistro culturel de Baie-Saint-Paul avec spectacles.',array['Solo / duo','Bands']::text[],array['folk','indie','Québec francophone']::text[],'https://lesbalcons.ca',null,'showici','showici:les-balcons-auberge-bistro-culturel-baie-saint-paul',true,null),
('Mont Café Bistro','Restaurant','318 Rue Saint-Laurent',null,'Saint-Siméon','G0T 1X0',st_setsrid(st_makepoint(-69.87789,47.84464),4326)::geography,'Saint-Siméon café-bistro with music nights.

Café-bistro de Saint-Siméon avec soirées musicales.',array['Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://montcafebistro.com',null,'showici','showici:mont-cafe-bistro-saint-simeon',true,null),
('Microbrasserie Charlevoix','Brewery','6 Rue Paul-René-Tremblay',null,'Baie-Saint-Paul','G3Z 3E4',st_setsrid(st_makepoint(-70.5221,47.44605),4326)::geography,'Baie-Saint-Paul microbrewery and brewpub.

Microbrasserie et broue-pub de Baie-Saint-Paul.',array['Solo / duo','Bands']::text[],array['folk','rock']::text[],'https://microbrasserie.com',null,'showici','showici:microbrasserie-charlevoix-baie-saint-paul',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
