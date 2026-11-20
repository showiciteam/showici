-- ShowIci cleanup (Nov 2026): hide venues reported permanently closed and drop dead or hijacked website links.
-- Reversible: set published = true again if a venue reopens.
-- Closed: Peel Pub (bankruptcy, June 2025, CBC); Montreal Improv (closed 2020, CBC); La Tulipe (shut down, CTV);
-- Diving Bell Social Club (closed over noise complaints, CTV); Le Cagibi (closed for good, MTL Blog).
update public.venues set published = false
where owner is null and city = 'Montréal'
  and name in ('Peel Pub','Montreal Improv','La Tulipe','Diving Bell Social Club','Le Cagibi');

-- Websites now parked, suspended, spam or owned by another business.
update public.venues set website = null
where website ~* '(leptitbar\.ca|berceemicrobrasserie\.com|xcentrik\.ca|multi-brasses\.com|barilroulant\.com|grumpysbar\.ca|comedyworks\.com|lecagibi\.ca|divingbellsocial\.com)';
