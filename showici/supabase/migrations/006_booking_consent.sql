-- 006: a venue can't put a ShowIci act on a show without the act agreeing.
-- Picking an act sends them a booking request in their ShowIci inbox. Until they accept, the show is
-- public as "Artist TBA" (the site hides the act's name and profile link). Acts accept or decline from
-- their dashboard; the venue gets a message back either way.

alter table public.shows add column if not exists performer_status text not null default 'none';
alter table public.shows drop constraint if exists shows_performer_status_check;
alter table public.shows add constraint shows_performer_status_check
  check (performer_status in ('none', 'pending', 'accepted', 'declined'));

-- Shows already linked to an act need that act's OK too (no messages are sent for these).
update public.shows set performer_status = 'pending' where performer_id is not null and performer_status = 'none';
update public.shows s set performer_status = 'accepted'
  from public.performers p, public.venues v
  where s.performer_id = p.id and s.venue_id = v.id and p.owner = v.owner and s.performer_status = 'pending';

-- Venues can't mark their own request as accepted: only the act's owner (or an admin) changes the answer.
create or replace function public.shows_guard_performer()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_perf_owner uuid;
  v_venue_owner uuid;
begin
  if new.performer_id is null then
    new.performer_status := 'none';
    return new;
  end if;
  select owner into v_perf_owner from performers where id = new.performer_id;
  if tg_op = 'INSERT' or new.performer_id is distinct from old.performer_id then
    select owner into v_venue_owner from venues where id = new.venue_id;
    -- Booking your own act needs no request.
    new.performer_status := case when v_perf_owner is not null and v_perf_owner = v_venue_owner then 'accepted' else 'pending' end;
    return new;
  end if;
  if new.performer_status is distinct from old.performer_status
     and auth.uid() is not null and auth.uid() is distinct from v_perf_owner and not public.is_admin() then
    new.performer_status := old.performer_status;
  end if;
  return new;
end $$;
revoke all on function public.shows_guard_performer() from public, anon, authenticated;

drop trigger if exists shows_guard_performer on public.shows;
create trigger shows_guard_performer before insert or update on public.shows
  for each row execute function public.shows_guard_performer();

-- Inbox messages: the request to the act, and the answer back to the venue.
create or replace function public.shows_booking_messages()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_venue_owner uuid; v_venue_name text;
  v_perf_owner uuid; v_perf_name text;
  v_from uuid; v_to uuid; v_body text; v_conv uuid; v_when text;
begin
  if new.performer_id is null then return new; end if;
  select owner, name into v_venue_owner, v_venue_name from venues where id = new.venue_id;
  select owner, name into v_perf_owner, v_perf_name from performers where id = new.performer_id;
  if v_venue_owner is null or v_perf_owner is null or v_venue_owner = v_perf_owner then return new; end if;
  v_when := to_char(new.starts_at at time zone 'America/Toronto', 'FMDay, FMMonth FMDD "at" FMHH12:MI AM');

  if new.performer_status = 'pending'
     and (tg_op = 'INSERT' or new.performer_id is distinct from old.performer_id) then
    v_from := v_venue_owner; v_to := v_perf_owner;
    v_body := 'Booking request: ' || v_venue_name || ' wants to list ' || v_perf_name || ' for a show on ' || v_when
      || '. Until you accept, the show is listed as "Artist TBA". Accept or decline it under Booking requests on your dashboard, or reply here with questions.';
  elsif tg_op = 'UPDATE' and new.performer_status in ('accepted', 'declined')
        and old.performer_status is distinct from new.performer_status then
    v_from := v_perf_owner; v_to := v_venue_owner;
    v_body := case when new.performer_status = 'accepted'
      then 'Booking accepted: ' || v_perf_name || ' confirmed the show on ' || v_when || '. Their name and profile now appear on the listing.'
      else 'Booking declined: ' || v_perf_name || ' declined the show on ' || v_when || '. It stays listed as "Artist TBA" until you pick another act.' end;
  else
    return new;
  end if;

  select m1.conversation_id into v_conv
  from conversation_members m1 join conversation_members m2 on m2.conversation_id = m1.conversation_id
  where m1.profile_id = v_from and m2.profile_id = v_to
  limit 1;
  if v_conv is null then
    insert into conversations (created_by) values (v_from) returning id into v_conv;
    insert into conversation_members (conversation_id, profile_id) values (v_conv, v_from), (v_conv, v_to);
  end if;
  insert into messages (conversation_id, sender_id, body) values (v_conv, v_from, v_body);
  return new;
exception when others then
  return new; -- a failed message must never block saving the show
end $$;
revoke all on function public.shows_booking_messages() from public, anon, authenticated;

drop trigger if exists shows_booking_messages on public.shows;
create trigger shows_booking_messages after insert or update of performer_id, performer_status on public.shows
  for each row execute function public.shows_booking_messages();

-- The act answers a request.
create or replace function public.respond_booking(p_show uuid, p_accept boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not exists (
    select 1 from shows s join performers p on p.id = s.performer_id
    where s.id = p_show and p.owner = auth.uid()
  ) then
    raise exception 'This booking request is not yours';
  end if;
  update shows set performer_status = case when p_accept then 'accepted' else 'declined' end where id = p_show;
end $$;
revoke all on function public.respond_booking(uuid, boolean) from public, anon;
grant execute on function public.respond_booking(uuid, boolean) to authenticated;

-- Requests for the signed-in act (drafts included, so they can answer before the show goes live).
create or replace function public.my_booking_requests()
returns table (show_id uuid, venue_id uuid, venue_name text, venue_area text, venue_city text, title text,
               starts_at timestamptz, performer_status text, show_status text)
language sql stable security definer set search_path = public as $$
  select s.id, s.venue_id, v.name, v.area, v.city,
         nullif(case when s.title = s.performer_name then '' else s.title end, ''),
         s.starts_at, s.performer_status, s.status::text
  from shows s
  join performers p on p.id = s.performer_id
  join venues v on v.id = s.venue_id
  where p.owner = auth.uid()
    and v.owner <> auth.uid()
    and s.status::text <> 'cancelled'
    and s.starts_at > now() - interval '1 day'
    and s.performer_status in ('pending', 'accepted', 'declined')
  order by (s.performer_status = 'pending') desc, s.starts_at
  limit 30;
$$;
revoke all on function public.my_booking_requests() from public, anon;
grant execute on function public.my_booking_requests() to authenticated;
