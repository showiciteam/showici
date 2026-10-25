"use client";

import { useEffect, useState } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { SOCIAL, SOCIAL_HANDLE, type SocialKey } from "@/lib/social";

/* Follow-us blocks, share helpers for artists and venues, and the "Find me on ShowIci" kit.
   Plain links only: no social widgets or embeds, so no third-party cookies (see the privacy policy). */

const ICON: Record<SocialKey, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14 8.5V7c0-.8.5-1.2 1.2-1.2H17V2.6h-2.6C11.7 2.6 10.5 4.3 10.5 6.8v1.7H8v3.3h2.5v9.6H14v-9.6h2.6l.4-3.3H14z" fill="currentColor" stroke="none" />,
};

export function SocialIcon({ k, size = 20 }: { k: SocialKey; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON[k]}
    </svg>
  );
}

/** Round icon links (footer and compact spots). */
export function SocialLinks({ tone = "light" }: { tone?: "light" | "dark" }) {
  const cls =
    tone === "dark"
      ? "border-navy-line text-white hover:bg-navy-soft hover:text-white"
      : "border-line-strong bg-white text-navy hover:bg-parchment hover:text-navy";
  return (
    <div className="flex gap-2">
      {SOCIAL.map((s) => (
        <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer me" aria-label={`ShowIci on ${s.label}`} title={`${s.label} ${SOCIAL_HANDLE}`} className={`flex h-10 w-10 items-center justify-center rounded-full border no-underline transition-colors ${cls}`}>
          <SocialIcon k={s.key} />
        </a>
      ))}
    </div>
  );
}

/** Labelled buttons: "Instagram", "Facebook". */
function FollowButtons({ tone }: { tone: "light" | "dark" }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {SOCIAL.map((s, i) => (
        <a
          key={s.key}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer me"
          className={`inline-flex min-h-11 items-center gap-2 rounded-[10px] px-[18px] py-3 text-[15px] font-bold no-underline transition-colors ${
            i === 0
              ? "bg-brass text-navy hover:bg-[#C8932F] hover:text-navy"
              : tone === "dark"
                ? "border border-navy-line text-white hover:bg-navy-soft hover:text-white"
                : "border border-line-strong bg-white text-navy hover:bg-parchment hover:text-navy"
          }`}
        >
          <SocialIcon k={s.key} size={18} />
          {s.label}
        </a>
      ))}
    </div>
  );
}

const BAND = {
  en: { eyebrow: "FOLLOW THE LOCAL SCENE", title: "New shows and artists every week", text: `Live shows, local artists to discover and the venues booking them, across Québec. Follow ${SOCIAL_HANDLE}.` },
  fr: { eyebrow: "SUIVEZ LA SCÈNE LOCALE", title: "De nouveaux spectacles et artistes chaque semaine", text: `Des spectacles en direct, des artistes d'ici à découvrir et les salles qui les accueillent, partout au Québec. Suivez ${SOCIAL_HANDLE}.` },
};

/** Big navy band for the home page. */
export function FollowBand() {
  const { lang } = useLang();
  const t = BAND[lang];
  return (
    <section className="wrap pt-16">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-[22px] bg-navy p-8 text-white">
        <div className="flex max-w-[620px] flex-col gap-1.5">
          <span className="text-xs font-bold tracking-[0.1em] text-brass">{t.eyebrow}</span>
          <h2 className="font-display text-[30px] font-extrabold leading-tight tracking-tight sm:text-[34px]">{t.title}</h2>
          <p className="text-[15px] text-on-navy">{t.text}</p>
        </div>
        <FollowButtons tone="dark" />
      </div>
    </section>
  );
}

type Context = "shows" | "about" | "spotlight" | "thanks";
const CARD: Record<Context, Record<Lang, { title: string; text: string }>> = {
  shows: {
    en: { title: "Never miss a show near you", text: `We share the best local shows every week on ${SOCIAL_HANDLE}.` },
    fr: { title: "Ne manquez aucun spectacle près de chez vous", text: `Nous partageons les meilleurs spectacles d'ici chaque semaine sur ${SOCIAL_HANDLE}.` },
  },
  about: {
    en: { title: "Join the community", text: `Follow ${SOCIAL_HANDLE} for new artists, venues and shows across Québec, and tag us in your posts.` },
    fr: { title: "Rejoignez la communauté", text: `Suivez ${SOCIAL_HANDLE} pour découvrir des artistes, des salles et des spectacles partout au Québec, et identifiez-nous dans vos publications.` },
  },
  spotlight: {
    en: { title: "Want to be in the spotlight?", text: `Every week we feature a local artist or venue on ${SOCIAL_HANDLE}. Follow us and tag ${SOCIAL_HANDLE} in your posts to be considered.` },
    fr: { title: "Envie d'être en vedette?", text: `Chaque semaine, nous mettons en vedette un artiste ou une salle d'ici sur ${SOCIAL_HANDLE}. Suivez-nous et identifiez ${SOCIAL_HANDLE} dans vos publications pour courir la chance d'être choisi.` },
  },
  thanks: {
    en: { title: "While you're here, follow us", text: `New shows, artists and venues every week on ${SOCIAL_HANDLE}.` },
    fr: { title: "Pendant que vous y êtes, suivez-nous", text: `De nouveaux spectacles, artistes et salles chaque semaine sur ${SOCIAL_HANDLE}.` },
  },
};

/** Smaller "follow us" box for the Shows, About and Spotlight pages and thank-you screens. */
export function FollowCard({ context, className = "" }: { context: Context; className?: string }) {
  const { lang } = useLang();
  const t = CARD[context][lang];
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-[#E2C98F] bg-brass-tint px-5 py-4 ${className}`}>
      <div className="flex max-w-[560px] flex-col gap-1">
        <strong className="text-[17px] text-navy">{t.title}</strong>
        <span className="text-[15px] text-ink-2">{t.text}</span>
      </div>
      <FollowButtons tone="light" />
    </div>
  );
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 2000);
    } catch {
      window.prompt("Copy this:", text);
    }
  };
  return { copied, copy };
}

/**
 * Share button with a small menu: the phone's share sheet (or copy link), Facebook,
 * and a ready-made Instagram caption that tags ShowIci.
 */
export function ShareMenu({ title, label, caption }: { title: string; label?: string; caption?: string }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [canShare, setCanShare] = useState(false); // phone share sheet; checked after load to avoid a server/client mismatch
  useEffect(() => setCanShare(typeof navigator.share === "function"), []);
  const { copied, copy } = useCopy();
  const T = {
    share: lang === "fr" ? "Partager" : "Share",
    link: lang === "fr" ? "Copier le lien" : "Copy link",
    native: lang === "fr" ? "Partager…" : "Share…",
    fb: lang === "fr" ? "Partager sur Facebook" : "Share on Facebook",
    ig: lang === "fr" ? "Copier un texte pour Instagram" : "Copy an Instagram caption",
    done: lang === "fr" ? "Copié ✓" : "Copied ✓",
    igHint: lang === "fr" ? "Collez-le dans votre publication ou story." : "Paste it in your post or story.",
  };
  const url = () => window.location.href.split("#")[0];
  const igText = () => `${caption ?? title}\n${url()}\n${SOCIAL_HANDLE} #ShowIci #scenelocale #Québec`;
  const item = "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[15px] text-navy no-underline hover:bg-parchment hover:text-navy";

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] border border-line-strong bg-white px-[18px] py-3 text-[15px] font-bold text-navy transition-colors hover:bg-parchment">
        {label ?? T.share} <span aria-hidden="true">▾</span>
      </button>
      {open && <button type="button" aria-label="Close" tabIndex={-1} className="fixed inset-0 z-40 cursor-default" onClick={() => setOpen(false)} />}
      {open && (
        <div className="absolute right-0 z-50 mt-2 flex w-[270px] flex-col rounded-[14px] border border-line bg-white p-1.5 shadow-xl">
          {canShare && (
            <button type="button" className={item} onClick={async () => { try { await navigator.share({ title, url: url() }); } catch {} setOpen(false); }}>
              <span aria-hidden="true" className="w-[18px] text-center">↗</span>{T.native}
            </button>
          )}
          <button type="button" className={item} onClick={() => copy("link", url())}>
            <span aria-hidden="true" className="w-[18px] text-center">⧉</span>{copied === "link" ? T.done : T.link}
          </button>
          <button type="button" className={item} onClick={() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url())}`, "_blank", "noopener,noreferrer,width=640,height=560"); setOpen(false); }}>
            <SocialIcon k="facebook" size={18} />{T.fb}
          </button>
          <button type="button" className={item} onClick={() => copy("ig", igText())}>
            <SocialIcon k="instagram" size={18} />
            <span className="flex flex-col">{copied === "ig" ? T.done : T.ig}<span className="text-xs text-muted">{T.igHint}</span></span>
          </button>
        </div>
      )}
    </div>
  );
}

const KIT = {
  en: {
    title: "Get more bookings: share your ShowIci page",
    text: "Put your page link in your Instagram and Facebook bio, and add the badge to your website.",
    linkLabel: "Your page",
    copyLink: "Copy link",
    bioLabel: "Ready-made bio line",
    bio: (url: string) => `Book us on ShowIci: ${url}`,
    copyBio: "Copy bio line",
    badgeLabel: "\"Find us on ShowIci\" badge",
    download: "Download badge",
    copyHtml: "Copy website code",
    tagTitle: `Tag ${SOCIAL_HANDLE}`,
    tagVenue: `Posting a show on Instagram or Facebook? Tag ${SOCIAL_HANDLE} and we'll share it with our followers. We also pick an artist or venue to feature every week.`,
    tagPerformer: `Playing a show or releasing something new? Tag ${SOCIAL_HANDLE} and we'll share it. We pick an artist or venue to feature every week.`,
    copied: "Copied ✓",
    unpublished: "Publish your page first, then share it here.",
  },
  fr: {
    title: "Plus de réservations : partagez votre page ShowIci",
    text: "Ajoutez le lien de votre page dans votre bio Instagram et Facebook, et le badge sur votre site Web.",
    linkLabel: "Votre page",
    copyLink: "Copier le lien",
    bioLabel: "Texte prêt pour votre bio",
    bio: (url: string) => `Réservez-nous sur ShowIci : ${url}`,
    copyBio: "Copier le texte",
    badgeLabel: "Badge « Trouvez-nous sur ShowIci »",
    download: "Télécharger le badge",
    copyHtml: "Copier le code pour site Web",
    tagTitle: `Identifiez ${SOCIAL_HANDLE}`,
    tagVenue: `Vous publiez un spectacle sur Instagram ou Facebook? Identifiez ${SOCIAL_HANDLE} et nous le partagerons avec nos abonnés. Chaque semaine, nous mettons aussi un artiste ou une salle en vedette.`,
    tagPerformer: `Vous avez un spectacle ou une nouveauté? Identifiez ${SOCIAL_HANDLE} et nous la partagerons. Chaque semaine, nous mettons un artiste ou une salle en vedette.`,
    copied: "Copié ✓",
    unpublished: "Publiez d'abord votre page, puis partagez-la ici.",
  },
};

/** Dashboard card for artists and venues: page link, bio line, website badge and the "tag us" tip. */
export function PromoteKit({ kind, id, siteUrl }: { kind: "performer" | "venue"; id: string | null; siteUrl: string }) {
  const { lang } = useLang();
  const t = KIT[lang];
  const { copied, copy } = useCopy();
  const badge = `${siteUrl}/badges/showici-badge-${lang}.svg`;
  const url = id ? `${siteUrl}/${kind === "venue" ? "venues" : "performers"}/${id}` : null;
  const html = url ? `<a href="${url}" target="_blank" rel="noopener"><img src="${badge}" alt="${lang === "fr" ? "Trouvez-nous sur ShowIci" : "Find us on ShowIci"}" width="200" height="60"></a>` : "";
  const small = "inline-flex min-h-10 items-center rounded-[10px] border border-line-strong bg-white px-3.5 py-2 text-sm font-bold text-navy hover:bg-parchment";

  return (
    <section className="card flex flex-col gap-4 p-[22px]">
      <div className="flex flex-col gap-1">
        <h2 className="h-display text-[22px]">{t.title}</h2>
        <p className="text-slate">{t.text}</p>
      </div>
      {url ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">{t.linkLabel}</span>
            <code className="break-all rounded-lg bg-parchment px-3 py-2 text-[13px]">{url}</code>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={small} onClick={() => copy("link", url)}>{copied === "link" ? t.copied : t.copyLink}</button>
              <button type="button" className={small} onClick={() => copy("bio", t.bio(url))}>{copied === "bio" ? t.copied : t.copyBio}</button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold">{t.badgeLabel}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/badges/showici-badge-${lang}.svg`} alt="" width={200} height={60} className="h-[60px] w-[200px]" />
            <div className="flex flex-wrap gap-2">
              <a href={`/badges/showici-badge-${lang}.svg`} download className={`${small} no-underline`}>{t.download}</a>
              <button type="button" className={small} onClick={() => copy("html", html)}>{copied === "html" ? t.copied : t.copyHtml}</button>
            </div>
          </div>
        </div>
      ) : (
        <p className="hint">{t.unpublished}</p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brass-tint px-4 py-3">
        <span className="max-w-[640px] text-[15px] text-ink-2"><strong className="text-navy">{t.tagTitle}.</strong> {kind === "venue" ? t.tagVenue : t.tagPerformer}</span>
        <SocialLinks />
      </div>
    </section>
  );
}

/** One-line "tag us" reminder (post-a-show form). */
export function TagUsTip() {
  const { lang } = useLang();
  return (
    <p className="flex flex-wrap items-center gap-2 rounded-xl bg-brass-tint px-4 py-3 text-[15px] text-ink-2">
      <SocialIcon k="instagram" size={18} />
      {lang === "fr"
        ? `Astuce : quand vous annoncez ce spectacle sur Instagram ou Facebook, identifiez ${SOCIAL_HANDLE} et nous le partagerons.`
        : `Tip: when you announce this show on Instagram or Facebook, tag ${SOCIAL_HANDLE} and we'll share it.`}
    </p>
  );
}
