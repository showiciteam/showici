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
src/app/[lang]/(public)/  Public pages: home, shows, big events, artists, venues, private events, Spotlight, news, about
src/app/[lang]/(auth)/    Log in, sign up, password reset
src/app/[lang]/(flow)/    Full artist and venue registration
src/app/[lang]/(app)/     Dashboards, post a show, event requests, messages, reviews, admin
src/app/api/big-events    Ticketmaster Discovery API feed (uses sample events until a key is added)
src/app/sitemap.ts        Sitemap with the French and English address of every page
src/middleware.ts         Languages (French at /, English at /en) and login checks
src/components/           Header, footer, cards, page sections, map, form pieces
src/lib/lang.ts           Languages and URL helpers; src/lib/i18n.tsx has the words shared by the header and footer
src/lib/labels.ts         French names for act types, styles and venue types stored in English in the database
src/lib/seo.ts            Title, description, canonical and French/English alternates for each page
src/lib/data.ts           Reads from Supabase, falls back to sample data (src/lib/mock.ts)
src/lib/actions.ts        Sign-up, login, saving forms, messages (with phone/email masking)
src/app/globals.css       Colours (ink, accent red, paper) and shared styles
public/images/            Stage photos used in page headers: replace with your own photos, same file names
public/llms.txt           Short description of ShowIci for AI assistants and search tools
supabase/schema.sql       The full database
```

### Languages

French is the main language and lives at the root (showici.com/salles…). English lives under /en.
Each page keeps its text in a small `copy = { fr: {…}, en: {…} }` object at the top of its file, so wording changes happen in one place.
Links use `@/components/Link`, which keeps visitors in their language automatically.

## 6. Built in

- Three account types (venue, performer, event planner) with their own registration and dashboards
- Distance search ("within 50 km") using PostGIS in Supabase
- Messaging where phone numbers and emails are hidden automatically (in the database too)
- Daily contact limit for free plans: **off** during launch; turn on with the `plan_limits_enabled` setting in Supabase
- Private event requests visible only to signed-in performers
- YouTube video showcase on performer profiles and photo uploads
- Reviews, verification badges and an admin page
- Big events page ready for the Ticketmaster Discovery API and affiliate links
- French and English versions of every public page, each with its own address for search engines

## 7. Next steps for a developer

- Translate the dashboards, registration forms and admin pages (still in English)
- Replace the city lookup in `src/lib/geo.ts` with a geocoding API (Mapbox or Google) and the illustrated maps with a real map
- Connect dashboards and the inbox to live Supabase data (the database and write functions are ready)
- Add Stripe for the v2 subscriptions
- Write the Terms of use and Privacy policy (Québec Law 25)
