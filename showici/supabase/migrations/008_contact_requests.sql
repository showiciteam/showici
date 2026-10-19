-- 008: "Contact" in the main menu. Messages to the ShowIci team, from members or visitors.
-- Saved here and listed in Admin → Contact messages. When a Resend key is in Vault (see 004) and an inbox
-- is set, each message is also emailed to the team:
--   insert into app_settings (key, value) values ('contact_inbox', '"hello@showici.com"')
--   on conflict (key) do update set value = excluded.value;

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  profile_id uuid default auth.uid() references public.profiles on delete set null,
  role text not null check (role in ('venue', 'performer', 'planner', 'business', 'press', 'other')),
  topic text not null check (char_length(topic) between 1 and 80),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200 and email like '%_@_%._%'),
  phone text check (char_length(phone) <= 40),
  message text not null check (char_length(message) between 1 and 3000),
  details jsonb not null default '{}'::jsonb check (pg_column_size(details) < 4000),
  page text check (char_length(page) <= 200),
  lang text check (lang in ('en', 'fr')),
  status text not null default 'new' check (status in ('new', 'answered', 'closed'))
);
create index if not exists contact_requests_status_idx on public.contact_requests (status, created_at desc);

alter table public.contact_requests enable row level security;
drop policy if exists "anyone can send" on public.contact_requests;
create policy "anyone can send" on public.contact_requests for insert to anon, authenticated
  with check (status = 'new' and (profile_id is null or profile_id = auth.uid()));
drop policy if exists "admin reads contact" on public.contact_requests;
create policy "admin reads contact" on public.contact_requests for select using (public.is_admin());
drop policy if exists "admin updates contact" on public.contact_requests;
create policy "admin updates contact" on public.contact_requests for update using (public.is_admin());
grant insert on public.contact_requests to anon, authenticated;
grant select, update on public.contact_requests to authenticated;

-- Simple anti-spam: at most 5 messages per email address per hour.
create or replace function public.contact_requests_limit()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from contact_requests where lower(email) = lower(new.email) and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'Too many messages, try again later';
  end if;
  new.status := 'new';
  return new;
end $$;
drop trigger if exists contact_requests_limit on public.contact_requests;
create trigger contact_requests_limit before insert on public.contact_requests
  for each row execute function public.contact_requests_limit();

-- Email the team (only once Resend and an inbox are configured). Reply-To is the sender, so replying just works.
create or replace function public.notify_contact_request()
returns trigger language plpgsql security definer set search_path = public, extensions as $$
declare
  v_key text;
  v_to text;
  v_esc text;
  v_details text := '';
  k text; v text;
begin
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'resend_api_key' limit 1;
  select trim(both '"' from value::text) into v_to from app_settings where key = 'contact_inbox';
  if v_key is null or coalesce(v_to, '') = '' then return new; end if;
  for k, v in select * from jsonb_each_text(new.details) loop
    v_details := v_details || '<br><b>' || k || ':</b> ' || replace(replace(v, '<', '&lt;'), '>', '&gt;');
  end loop;
  v_esc := replace(replace(replace(new.message, '&', '&amp;'), '<', '&lt;'), '>', '&gt;');
  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object('Authorization', 'Bearer ' || v_key, 'Content-Type', 'application/json'),
    body := jsonb_build_object(
      'from', 'ShowIci <hello@showici.com>',
      'to', jsonb_build_array(v_to),
      'reply_to', new.email,
      'subject', 'Contact: ' || new.topic || ' (' || new.role || ') from ' || new.name,
      'html', '<div style="font-family:Arial,sans-serif;color:#14213D;font-size:15px;line-height:1.5">'
        || '<b>' || replace(new.name, '<', '&lt;') || '</b> &lt;' || new.email || '&gt;' || coalesce(' · ' || nullif(new.phone, ''), '')
        || '<br><b>Who:</b> ' || new.role || '<br><b>Topic:</b> ' || replace(new.topic, '<', '&lt;') || v_details
        || '<p style="white-space:pre-line;background:#F5F0E6;padding:12px;border-radius:8px">' || v_esc || '</p>'
        || '<a href="https://www.showici.com/admin/contact">Open in ShowIci admin</a></div>'
    )
  );
  return new;
exception when others then
  return new; -- a failed email never loses the message, it's still saved
end $$;
revoke all on function public.notify_contact_request() from public, anon, authenticated;
drop trigger if exists contact_requests_notify on public.contact_requests;
create trigger contact_requests_notify after insert on public.contact_requests
  for each row execute function public.notify_contact_request();
