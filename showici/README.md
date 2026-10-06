# ShowIci

The ShowIci website: venues, event planners and local performers, connected city by city. Built with Next.js (React), TypeScript and Tailwind CSS, with Supabase for accounts, data, messaging and photo storage.

The site works right away in **demo mode** with sample data. Add the Supabase keys and it switches to the real database automatically.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Every page works with sample data, and the forms show a "Demo mode" message instead of saving.

## 2. Hosting: what I recommend

| Piece | Service | Cost to start | Notes |
| --- | --- | --- | --- |
| Website | **Vercel** (made by the creators of Next.js) | Free Hobby plan for testing; **Pro at $20/month** once ShowIci makes money | Hobby is for personal, non-commercial projects only |
| Database, logins, messages, photos | **Supabase** | Free plan for testing; **Pro at $25/month** for launch | Free projects pause after 1 week without activity, so move to Pro before real users join |
| Domain | Your registrar (showici.com / showici.ca) | You already own or will buy these | Point DNS to Vercel |
| Emails | Your own sending setup (SublimeSending) or Supabase's built-in email for testing | — | Add SPF/DKIM/DMARC on showici.com |

Your current WHC/cPanel hosting can stay for WordPress (News and Spotlight Time, if you want to run those there), but it isn't suited to this app.

## 3. Set up Supabase (about 15 minutes)

1. Create a free account at https://supabase.com and click **New project** (choose the Canada (Central) region).
2. Open **SQL Editor → New query**, paste the whole of `supabase/schema.sql`, and click **Run**. This creates all tables, privacy rules, the distance search, the daily contact limit and photo storage.
3. Go to **Project Settings → API** and copy the **Project URL** and the **anon public** key.
4. In this folder, copy `.env.example` to `.env.local` and paste them in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
5. Restart `npm run dev`. Sign-up, login, registrations, event requests, show posting and reviews now save for real.

## 4. Put it online with Vercel (about 10 minutes)

1. Put this folder on GitHub (free account; GitHub Desktop makes it point-and-click).
2. At https://vercel.com, click **Add New → Project** and pick the repository.
3. Under **Environment Variables**, add the same keys as `.env.local` (and `TICKETMASTER_API_KEY` when you have it).
4. Click **Deploy**. Every time you push a change to GitHub, the site updates by itself.
5. In Vercel → **Settings → Domains**, add `showici.com`, then follow the DNS instructions at your registrar.

## 5. What's where

```
src/app/(public)/     Public pages: home, shows, big events, performers, venues, pricing, Spotlight Time, news, event request
src/app/(auth)/       Log in, sign up
src/app/(flow)/       Full performer and venue registration
src/app/(app)/        Dashboards, post a show, event requests, messages, reviews, admin
src/app/api/big-events  Ticketmaster Discovery API feed (uses sample events until a key is added)
src/components/       Header, footer, cards, map, form pieces
src/lib/data.ts       Reads from Supabase, falls back to sample data (src/lib/mock.ts)
src/lib/actions.ts    Sign-up, login, saving forms, messages (with phone/email masking)
src/lib/i18n.tsx      French / English text for the menu and homepage
supabase/schema.sql   The full database
```

## 6. Built in

- Three account types (venue, performer, event planner) with their own registration and dashboards
- Distance search ("within 50 km") using PostGIS in Supabase
- Messaging where phone numbers and emails are hidden automatically (in the database too)
- Daily contact limit for free plans: **off** during launch; turn on with the `plan_limits_enabled` setting in Supabase
- Private event requests visible only to signed-in performers
- YouTube video showcase on performer profiles and photo uploads
- Reviews, verification badges and an admin page
- Big events page ready for the Ticketmaster Discovery API and affiliate links
- French/English toggle (menu, homepage and footer so far)

## 7. Next steps for a developer

- Finish French translations for the remaining pages (add keys in `src/lib/i18n.tsx`)
- Replace the city lookup in `src/lib/geo.ts` with a geocoding API (Mapbox or Google) and the illustrated maps with a real map
- Connect dashboards and the inbox to live Supabase data (the database and write functions are ready)
- Add Stripe for the v2 subscriptions
- Write the Terms of use and Privacy policy (Québec Law 25)
