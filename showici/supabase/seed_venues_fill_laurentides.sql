-- ShowIci: unclaimed venues in Mirabel. Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Microbrasserie L''Entêté','Brewery','Chemin Charles',null,'Mirabel','J7J 1S3',st_setsrid(st_makepoint(-73.97257,45.67524),4326)::geography,'Mirabel microbrewery and taproom. Live shows not confirmed.

Microbrasserie et salle de dégustation à Mirabel. Spectacles à confirmer.',array['Solo / duo']::text[],array['rock','folk']::text[],null,null,'showici','showici:microbrasserie-l-entete-mirabel',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
