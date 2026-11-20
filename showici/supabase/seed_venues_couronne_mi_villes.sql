-- ShowIci: unclaimed venues in Repentigny, Mascouche, Granby and Châteauguay. Public sources (venue and city sites, Tourisme Montérégie, Tourisme Terrebonne-Mascouche); geocoding © OpenStreetMap contributors.
insert into public.venues (name, type, street, area, city, postal_code, location, description, books, genres, website, phone, source, source_ref, published, owner) values
('Rouge Steakhouse','Restaurant','364 Rue Notre-Dame',null,'Repentigny','J6A 2S5',st_setsrid(st_makepoint(-73.45262,45.73308),4326)::geography,'Repentigny steakhouse with live bands, tribute acts and DJ nights on Fridays.

Steakhouse de Repentigny avec groupes, hommages et soirées DJ le vendredi.',array['Bands','DJs','Solo / duo']::text[],array['rock','pop','disco']::text[],'https://www.rouge-steak-house.com','450 704-2252','showici','showici:rouge-steakhouse-repentigny',true,null),
('Allegro – Bistro souper-spectacle','Restaurant','3091 Boulevard Mascouche',null,'Mascouche','J7K 3B7',st_setsrid(st_makepoint(-73.6001,45.74262),4326)::geography,'Mascouche bistro with a busy dinner-show calendar: tribute bands, country, disco and chanson.

Bistro de Mascouche avec un calendrier chargé de soupers-spectacles : hommages, country, disco et chanson.',array['Bands','Solo / duo']::text[],array['rock','country','Québec francophone']::text[],'https://restaurantallegro.ca','450 918-0609','showici','showici:allegro-bistro-souper-spectacle-mascouche',true,null),
('Théâtre l''Aparté','Event hall','1021 Rue Cowie',null,'Granby','J2G 8W8',st_setsrid(st_makepoint(-72.77331,45.39712),4326)::geography,'Intimate Granby hall programmed by the Palace de Granby for chanson, humour and theatre.

Salle intime de Granby programmée par le Palace : chanson, humour et théâtre.',array['Solo / duo','Stand-up comedy','Bands']::text[],array['Québec francophone','folk']::text[],'https://palacedegranby.com/theatre-laparte/','450 375-2262','showici','showici:theatre-l-aparte-granby',true,null),
('Pavillon de l''Île','Event hall','480 Boulevard d''Youville',null,'Châteauguay','J6J 5T9',st_setsrid(st_makepoint(-73.76712,45.38339),4326)::geography,'392-seat lakeside hall in Châteauguay with a year-round show season (Château Scènes), bistro and terrace.

Salle de 392 places au bord du lac à Châteauguay, avec une saison de spectacles à l''année (Château Scènes), bistro et terrasse.',array['Bands','Solo / duo','Stand-up comedy']::text[],array['pop','Québec francophone']::text[],'https://ville.chateauguay.qc.ca/spectacles-chateau-scenes/','450 698-3100','showici','showici:pavillon-de-l-ile-chateauguay',true,null)
on conflict (source_ref) where source_ref is not null do nothing;
