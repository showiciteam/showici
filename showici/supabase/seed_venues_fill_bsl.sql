-- ShowIci: unclaimed venues in Bas-Saint-Laurent (La Pocatière, Kamouraska, Témiscouata, Causapscal). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Salle André-Gagnon','Event hall','140 4e Avenue',null,'La Pocatière','G0R 1Z0',st_setsrid(st_makepoint(-70.04057,47.36721),4326)::geography,'Performance hall at the Cégep de La Pocatière, with a yearly season of shows.

Salle de spectacle du Cégep de La Pocatière avec une saison annuelle.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','classical']::text[],null,null,'showici','showici:salle-andre-gagnon-la-pocatiere',true,null),
('Microbrasserie La Baleine Endiablée','Brewery','229 Route 132',null,'Rivière-Ouelle','G0L 2C0',st_setsrid(st_makepoint(-69.99551,47.45644),4326)::geography,'Brewery, restaurant and real performance hall near La Pocatière, with artists from Québec and France.

Microbrasserie, resto et vraie salle de spectacle près de La Pocatière, avec des artistes du Québec et de France.',array['Bands','Solo / duo']::text[],array['Québec francophone','folk','rock']::text[],'https://www.baleineendiablee.com','418 371-0758','showici','showici:microbrasserie-la-baleine-endiablee-riviere-ouelle',true,null),
('BeauLieu culturel du Témiscouata','Event hall','2448 Rue Commerciale Sud',null,'Témiscouata-sur-le-Lac','G0L 1X0',st_setsrid(st_makepoint(-68.79221,47.61242),4326)::geography,'Cultural venue with a show hall and a pub in Témiscouata-sur-le-Lac.

Lieu culturel avec salle de spectacle et pub à Témiscouata-sur-le-Lac.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['Québec francophone','folk','pop']::text[],'https://blct.ca','418 899-2528','showici','showici:beaulieu-culturel-du-temiscouata-temiscouata-sur-le-lac',true,null),
('Bar Laser','Bar','35 Rue Saint-Jean-Baptiste',null,'Causapscal',null,st_setsrid(st_makepoint(-67.22456,48.35462),4326)::geography,'Bar in the heart of Causapscal. Live shows not confirmed.

Bar au cœur de Causapscal. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','country']::text[],null,'418 756-5011','showici','showici:bar-laser-causapscal',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
