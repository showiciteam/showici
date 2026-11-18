-- ShowIci: unclaimed venues in Côte-Nord, Gaspésie, Bas-Saint-Laurent, Charlevoix and Lac-Saint-Jean (Les Escoumins, Forestville, Paspébiac, Kamouraska, Les Éboulements, Mont-Joli, Roberval). Public sources (venue and town sites, ROSEQ, regional media and tourism listings); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Kiboikoi – Café bar culturel','Bar','319 Route 138',null,'Les Escoumins','G0T 1K0',st_setsrid(st_makepoint(-69.4041,48.35343),4326)::geography,'Café-bar and cultural venue in Les Escoumins that presents concerts and shows.

Café-bar culturel des Escoumins qui présente concerts et spectacles.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone','rock']::text[],'https://www.kiboikoi.com','581 322-1221','showici','showici:kiboikoi-cafe-bar-culturel-les-escoumins',true,null),
('Pavillon des arts de Forestville','Event hall','16 5e Avenue',null,'Forestville','G0T 1E0',st_setsrid(st_makepoint(-69.07883,48.74145),4326)::geography,'195-seat performance hall run by the Comité de spectacles de Forestville, with a season of concerts and comedy.

Salle de 195 places gérée par le Comité de spectacles de Forestville, avec une saison de concerts et d''humour.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','country']::text[],'https://www.csforestville.com','581 991-7421','showici','showici:pavillon-des-arts-de-forestville-forestville',true,null),
('Centre culturel de Paspébiac','Event hall','7 Boulevard Gérard-D.-Levesque Est',null,'Paspébiac','G0C 2K0',st_setsrid(st_makepoint(-65.24822,48.03004),4326)::geography,'300-person multipurpose hall in Paspébiac with free Saturday-night shows.

Salle polyvalente de 300 personnes à Paspébiac, avec les Samedis spectacles gratuits.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone','folk']::text[],'https://centre-culturel.villepaspebiac.ca','418 752-2277','showici','showici:centre-culturel-de-paspebiac-paspebiac',true,null),
('La Baleine Endiablée – Pub Kamouraska','Pub','68 Avenue Morel',null,'Kamouraska','G0L 1M0',st_setsrid(st_makepoint(-69.86772,47.56646),4326)::geography,'Kamouraska village pub opened in 2024 by La Baleine Endiablée microbrewery. Live shows not confirmed.

Pub du village de Kamouraska ouvert en 2024 par la microbrasserie La Baleine Endiablée. Spectacles à confirmer.',array['Solo / duo']::text[],array['folk','Québec francophone']::text[],'https://www.baleineendiablee.com',null,'showici','showici:la-baleine-endiablee-pub-kamouraska-kamouraska',true,null),
('Scènes Sismiques','Event hall','1939 Route du Fleuve',null,'Les Éboulements','G0A 2M0',st_setsrid(st_makepoint(-70.26357,47.50442),4326)::geography,'Seasonal live-arts and theatre venue on the Route du Fleuve in Les Éboulements.

Lieu saisonnier d''arts vivants et de théâtre sur la route du Fleuve aux Éboulements.',array['Solo / duo','Bands','Stand-up comedy']::text[],array['folk','Québec francophone','jazz']::text[],null,'438 878-1751','showici','showici:scenes-sismiques-les-eboulements',true,null),
('Château Landry','Event hall','1588 Boulevard Jacques-Cartier',null,'Mont-Joli','G5H 1W4',st_setsrid(st_makepoint(-68.18858,48.58625),4326)::geography,'Mont-Joli heritage house hosting the free summer Mardis musicaux.

Maison patrimoniale de Mont-Joli qui accueille les Mardis musicaux gratuits l''été.',array['Solo / duo','Bands']::text[],array['folk','Québec francophone','jazz']::text[],null,null,'showici','showici:chateau-landry-mont-joli',true,null),
('Salle Lionel-Villeneuve','Event hall','720 Boulevard Saint-Joseph',null,'Roberval','G8H 2L2',st_setsrid(st_makepoint(-72.22086,48.51562),4326)::geography,'Roberval hall hosting the Apéro Show series and other concerts.

Salle de Roberval qui accueille les Apéro Show et d''autres concerts.',array['Solo / duo','Bands']::text[],array['Québec francophone','folk','pop']::text[],'https://www.roberval.ca',null,'showici','showici:salle-lionel-villeneuve-roberval',true,null),
('Auditorium Fernand-Bilodeau','Event hall','171 Boulevard de la Jeunesse',null,'Roberval','G8H 2N9',st_setsrid(st_makepoint(-72.22744,48.50165),4326)::geography,'Roberval''s main auditorium, presenting touring concerts and comedy.

Principal auditorium de Roberval, qui présente concerts et humour en tournée.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'https://www.roberval.ca',null,'showici','showici:auditorium-fernand-bilodeau-roberval',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
