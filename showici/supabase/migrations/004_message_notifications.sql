-- 004: in-app chat stays the channel; email only tells people they have a new message.
-- Emails go out from the database (pg_net -> Resend) so they also cover the first message
-- sent by start_conversation. Nothing is sent until a Resend key is stored in Vault:
--   select vault.create_secret('<your Resend API key>', 'resend_api_key');

create extension if not exists pg_net with schema extensions;

alter table public.conversation_members
  add column if not exists last_read_at timestamptz,
  add column if not exists last_notified_at timestamptz;

alter table public.profiles
  add column if not exists email_on_message boolean not null default true;

-- Called by the inbox when a conversation is open on screen.
create or replace function public.mark_conversation_read(p_conversation uuid)
returns void language sql security definer set search_path = public as $$
  update conversation_members set last_read_at = now()
  where conversation_id = p_conversation and profile_id = auth.uid();
$$;
revoke all on function public.mark_conversation_read(uuid) from public, anon;
grant execute on function public.mark_conversation_read(uuid) to authenticated;

-- Lets a signed-in person turn the emails on or off for themselves.
create or replace function public.set_email_on_message(p_on boolean)
returns void language sql security definer set search_path = public as $$
  update profiles set email_on_message = p_on where id = auth.uid();
$$;
revoke all on function public.set_email_on_message(boolean) from public, anon;
grant execute on function public.set_email_on_message(boolean) to authenticated;

-- One email per conversation at most every 30 minutes, and none while the
-- recipient has had the conversation open in the last 5 minutes.
create or replace function public.notify_new_message()
returns trigger language plpgsql security definer set search_path = public, extensions as $$
declare
  r record;
  v_key text;
  v_sender text;
  v_site text := 'https://www.showici.com';
  v_from text := 'ShowIci <messages@showici.com>';
  v_html text;
begin
  select decrypted_secret into v_key from vault.decrypted_secrets where name = 'resend_api_key' limit 1;
  if v_key is null then return new; end if;
  select coalesce(nullif(trim(display_name), ''), 'A ShowIci member') into v_sender from profiles where id = new.sender_id;
  v_sender := replace(replace(replace(coalesce(v_sender, 'A ShowIci member'), '&', '&amp;'), '<', '&lt;'), '>', '&gt;');

  for r in
    select m.profile_id, u.email
    from conversation_members m
    join auth.users u on u.id = m.profile_id
    join profiles p on p.id = m.profile_id
    where m.conversation_id = new.conversation_id
      and m.profile_id <> new.sender_id
      and p.email_on_message
      and u.email is not null
      and (m.last_notified_at is null or m.last_notified_at < now() - interval '30 minutes')
      and (m.last_read_at is null or m.last_read_at < now() - interval '5 minutes')
  loop
    v_html := '<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#14213D">'
      || '<p style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#A87A22;margin:0 0 12px">ShowIci</p>'
      || '<h1 style="font-size:22px;margin:0 0 12px">' || v_sender || ' sent you a message</h1>'
      || '<p style="font-size:15px;line-height:1.5;margin:0 0 20px">Read it and reply in your ShowIci inbox. / ' || v_sender || ' vous a écrit sur ShowIci.</p>'
      || '<a href="' || v_site || '/messages?c=' || new.conversation_id || '" style="display:inline-block;background:#14213D;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:10px">Open the conversation</a>'
      || '<p style="font-size:12px;color:#6B7387;margin:24px 0 0">You get this email when someone messages you on ShowIci. You can turn these emails off in your inbox.</p>'
      || '</div>';
    perform net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object('Authorization', 'Bearer ' || v_key, 'Content-Type', 'application/json'),
      body := jsonb_build_object(
        'from', v_from,
        'to', jsonb_build_array(r.email),
        'subject', replace(replace(replace(v_sender, '&amp;', '&'), '&lt;', '<'), '&gt;', '>') || ' sent you a message on ShowIci',
        'html', v_html
      )
    );
    update conversation_members set last_notified_at = now()
    where conversation_id = new.conversation_id and profile_id = r.profile_id;
  end loop;
  return new;
exception when others then
  return new; -- a failed email must never block the chat message
end;
$$;
revoke all on function public.notify_new_message() from public, anon, authenticated;

drop trigger if exists messages_notify on public.messages;
create trigger messages_notify after insert on public.messages
  for each row execute function public.notify_new_message();
