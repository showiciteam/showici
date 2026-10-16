# ShowIci auth emails

Paste each file into Supabase → Authentication → Emails (Templates). Subjects:

| Template | Subject |
|---|---|
| Confirm signup | Confirm your ShowIci email / Confirmez votre courriel |
| Reset password | Reset your ShowIci password / Nouveau mot de passe |
| Change email address | Confirm your new ShowIci email |
| Magic link | Your ShowIci sign-in link |

Sender: custom SMTP through Resend (smtp.resend.com, port 465, user `resend`, password = Resend API key),
sender `ShowIci <hello@showici.com>`. The showici.com domain must be verified in Resend first.
