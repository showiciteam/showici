-- ShowIci: unclaimed venues in Côte-Nord (Les Bergeronnes, Fermont). Public sources (venue and town sites, regional tourism listings, OpenStreetMap); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Le Hangar Festif','Event hall','Rue de la Mer',null,'Les Bergeronnes',null,st_setsrid(st_makepoint(-69.54755,48.23266),4326)::geography,'Festive hall by the sea in Les Bergeronnes. Live shows not confirmed.

Salle festive au bord de la mer aux Bergeronnes. Spectacles à confirmer.',array['Bands','Solo / duo']::text[],array['folk','rock','Québec francophone']::text[],null,null,'showici','showici:le-hangar-festif-les-bergeronnes',true,null),
('Salle Aurora – Centre multifonctionnel','Event hall','50 Le Carrefour',null,'Fermont','G0G 1J0',st_setsrid(st_makepoint(-67.0892,52.79865),4326)::geography,'Fermont''s show hall in the multifunction centre, programmed by the Comité de spectacles.

Salle de spectacle de Fermont au centre multifonctionnel, programmée par le Comité de spectacles.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','rock']::text[],'https://www.villedefermont.qc.ca','418 287-5411','showici','showici:salle-aurora-centre-multifonctionnel-fermont',true,null),
('Pub Le Réphil','Pub','Le Carrefour',null,'Fermont','G0G 1J0',st_setsrid(st_makepoint(-67.08633,52.79886),4326)::geography,'Pub inside Fermont''s Carrefour. Live shows not confirmed.

Pub dans le Carrefour de Fermont. Spectacles à confirmer.',array['Solo / duo','Bands']::text[],array['rock','country']::text[],null,null,'showici','showici:pub-le-rephil-fermont',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
