-- ShowIci: unclaimed venues in Montérégie (Beloeil, Sainte-Julie). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Centre culturel de Beloeil','Event hall','600 Rue Richelieu',null,'Beloeil','J3G 5E8',st_setsrid(st_makepoint(-73.20522,45.56028),4326)::geography,'Beloeil''s cultural centre by the Richelieu, presenting music, song, theatre and comedy.

Centre culturel de Beloeil au bord du Richelieu : musique, chanson, théâtre et humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','jazz']::text[],'https://beloeil.ca','450 464-4772','showici','showici:centre-culturel-de-beloeil-beloeil',true,null),
('Septembre Bistro Bar','Bar','919 Rue Laurier',null,'Beloeil','J3G 4K8',st_setsrid(st_makepoint(-73.20019,45.56954),4326)::geography,'Beloeil bistro-bar on Rue Laurier. Live shows not confirmed.

Bistro-bar de Beloeil sur la rue Laurier. Spectacles à confirmer.',array['Solo / duo']::text[],array['pop','Québec francophone']::text[],null,null,'showici','showici:septembre-bistro-bar-beloeil',true,null),
('La Broue Shop – Brasserie artisanale','Brewery','1950 Chemin du Fer-à-Cheval',null,'Sainte-Julie','J3E 2T6',st_setsrid(st_makepoint(-73.32771,45.57568),4326)::geography,'Sainte-Julie craft brewery and pub that hosts events and shows. Live shows not confirmed.

Brasserie artisanale et pub de Sainte-Julie qui accueille événements et spectacles. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','pop','Québec francophone']::text[],'http://broueshop.com','450 649-6669','showici','showici:la-broue-shop-brasserie-artisanale-sainte-julie',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
