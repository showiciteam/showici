-- 011: readable venue addresses. /venues/bar-de-courcelle-montreal instead of /venues/<uuid>.
-- Old id links keep working: the venue page redirects them to the slug.
-- A slug is set once (from the name and city) and doesn't change when the venue is renamed, so links stay stable.

create or replace function public.showici_slug(t text) returns text
language sql immutable as $$
  select trim(both '-' from regexp_replace(
    lower(translate(coalesce(t, ''),
      'ÀÁÂÃÄÅàáâãäåÇçÈÉÊËèéêëÌÍÎÏìíîïÑñÒÓÔÕÖòóôõöÙÚÛÜùúûüÝýÿŒœÆæ',
      'AAAAAAaaaaaaCcEEEEeeeeIIIIiiiiNnOOOOOoooooUUUUuuuuYyyOoAa')),
    '[^a-z0-9]+', '-', 'g'))
$$;

alter table public.venues add column if not exists slug text;

-- Existing venues: name + city, with -2, -3… when two venues would get the same address.
with base as (
  select id, coalesce(nullif(public.showici_slug(name || ' ' || coalesce(city, '')), ''), 'venue') as b, created_at
  from public.venues where slug is null
), numbered as (
  select id, b, row_number() over (partition by b order by created_at, id) as n from base
)
update public.venues v
set slug = case when n.n = 1 then n.b else n.b || '-' || n.n end
from numbered n
where v.id = n.id;

create unique index if not exists venues_slug_key on public.venues (slug);

-- New venues (sign-ups, claims, seed files) get their slug automatically.
create or replace function public.venues_set_slug() returns trigger
language plpgsql as $$
declare
  base text;
  candidate text;
  i int := 1;
begin
  if new.slug is not null and new.slug <> '' then
    return new;
  end if;
  base := coalesce(nullif(public.showici_slug(new.name || ' ' || coalesce(new.city, '')), ''), 'venue');
  candidate := base;
  while exists (select 1 from public.venues where slug = candidate and id <> new.id) loop
    i := i + 1;
    candidate := base || '-' || i;
  end loop;
  new.slug := candidate;
  return new;
end $$;

drop trigger if exists venues_slug on public.venues;
create trigger venues_slug before insert or update on public.venues
  for each row execute function public.venues_set_slug();

-- The public view lists venue columns via v.*, fixed when the view is created: recreate it to pick up slug.
drop view if exists public.venues_view;
create view public.venues_view as
select v.*, st_y(v.location::geometry) as lat, st_x(v.location::geometry) as lng,
  (select round(avg(r.rating)::numeric, 1) from reviews r where v.owner is not null and r.subject_id = v.owner) as rating
from venues v where v.published;
grant select on public.venues_view to anon, authenticated;

notify pgrst, 'reload schema';
