-- 005: show the ShowIci logo at the top of the "new message" email.
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
      || '<img src="' || v_site || '/logo.png" alt="ShowIci" width="180" height="59" style="display:block;border:0;margin:0 0 18px">'
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
