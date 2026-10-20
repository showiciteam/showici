/**
 * Text of the About page (www.showici.com/about), in English and French.
 * Plain data so the wording can be edited without touching the layout.
 * The FAQ is also published as structured data for search engines, so keep answers factual.
 */
export type AboutCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  missionTitle: string;
  mission: string[];
  whoTitle: string;
  who: { h: string; p: string }[];
  howTitle: string;
  how: { h: string; steps: string[] }[];
  valuesTitle: string;
  values: { h: string; p: string }[];
  whereTitle: string;
  where: string;
  faqTitle: string;
  faq: [string, string][];
  ctaTitle: string;
  cta: { label: string; href: string }[];
};

export const about: Record<"en" | "fr", AboutCopy> = {
  en: {
    eyebrow: "About ShowIci",
    title: "What is ShowIci?",
    lede: "ShowIci is a bilingual platform that connects local artists with local venues and event planners across Québec, starting in Greater Montréal. Musicians, bands, DJs, magicians, stand-up comedians and other live acts get a place to be seen. Pubs, bars, restaurants and event planners get an easy way to find the right act for their stage.",
    missionTitle: "Our mission: give local talent a stage",
    mission: [
      "Québec is full of talented performers who are hard to find. Great bands play the same two bars, comedians wait for open mics, and magicians are booked by word of mouth. Meanwhile, venues and families who want live entertainment don't know where to look.",
      "ShowIci brings them together. We give local artists a professional profile, real visibility and a steady way to meet the venues and people who want to book them, so they can play more, earn more and grow their audience. We take no commission on bookings: what an artist earns stays with the artist.",
    ],
    whoTitle: "Who ShowIci is for",
    who: [
      { h: "Local artists", p: "Solo musicians, bands, DJs, mariachis, singers, magicians, stand-up comedians, dancers and other live acts, whether you're starting out or have played for years." },
      { h: "Venues", p: "Pubs, bars, restaurants, breweries, cafés and halls that want live entertainment and need reliable acts that fit their room, their crowd and their budget." },
      { h: "Event planners", p: "Anyone planning a wedding, birthday, quinceañera, office party or community event who wants a local act instead of a playlist." },
    ],
    howTitle: "How it works",
    how: [
      { h: "For artists", steps: ["Create your profile with photos, videos, your style, repertoire and where you're willing to travel.", "Get found by venues and event planners searching by type of act, style and region.", "Receive booking requests and messages, accept the ones that fit, and agree on the details directly."] },
      { h: "For venues", steps: ["Create your venue page and post your upcoming shows.", "Search artists by type of act, style, repertoire and distance, and watch their videos.", "Message them or send a booking request for a date. Your shows appear on ShowIci's public listings."] },
      { h: "For event planners", steps: ["Post an event request with your date, area and the kind of act you want.", "Browse artists and message the ones you like.", "Agree on the fee and details directly with the performer. Your exact address stays private."] },
    ],
    valuesTitle: "What we believe in",
    values: [
      { h: "Local first", p: "Every artist and venue on ShowIci is from here. Booking local keeps money, culture and opportunity in our communities." },
      { h: "Zero commission", p: "Fees are agreed directly between the artist and the venue or planner. ShowIci never takes a cut of a booking." },
      { h: "Every kind of act", p: "Rock bands and jazz trios, DJs and mariachis, magicians and stand-up comedians: ShowIci is built for the whole range of live entertainment." },
      { h: "French and English", p: "ShowIci works in both languages, so everyone in Québec can use it comfortably." },
      { h: "Respect and privacy", p: "Phone numbers and emails stay hidden in messages until both sides are ready, and artists choose which requests to accept." },
    ],
    whereTitle: "Where we are",
    where: "ShowIci is based in Montréal and covers the whole province of Québec. We're starting in Greater Montréal (Montréal, Laval, Longueuil and the surrounding area), and artists and venues in Québec City, Gatineau, Sherbrooke, Trois-Rivières, Saguenay and every other region can join and be found too.",
    faqTitle: "Questions about ShowIci",
    faq: [
      ["What is ShowIci?", "ShowIci is a bilingual online platform that connects local artists (musicians, bands, DJs, magicians, stand-up comedians and other live acts) with venues and event planners across Québec, starting in Greater Montréal."],
      ["Who can join ShowIci?", "Artists, venues and event planners anywhere in Québec, aged 18 or older."],
      ["Does ShowIci take a commission?", "No. Artists and venues or planners agree on the fee and payment directly. ShowIci never takes a percentage of a booking."],
      ["What kinds of artists are on ShowIci?", "Solo musicians, bands, DJs, mariachis, singers, magicians, stand-up comedians, dancers and other live acts."],
      ["How do venues find artists on ShowIci?", "Venues search by type of act, style, repertoire and region, watch artists' videos, then message them or send a booking request for a date."],
      ["Is ShowIci available in French?", "Yes. ShowIci works in French and English. Use the FR / EN switch at the top of any page."],
    ],
    ctaTitle: "Join the local scene",
    cta: [
      { label: "I'm an artist", href: "/register/performer" },
      { label: "I run a venue", href: "/register/venue" },
      { label: "I'm planning an event", href: "/request" },
    ],
  },
  fr: {
    eyebrow: "À propos de ShowIci",
    title: "Qu'est-ce que ShowIci?",
    lede: "ShowIci est une plateforme bilingue qui met en relation les artistes d'ici avec les salles et les organisateurs d'événements partout au Québec, à commencer par le Grand Montréal. Musiciens, groupes, DJ, magiciens, humoristes et autres artistes de scène y trouvent une vitrine. Les pubs, bars, restaurants et organisateurs y trouvent facilement le bon numéro pour leur scène.",
    missionTitle: "Notre mission : donner une scène aux talents d'ici",
    mission: [
      "Le Québec regorge d'artistes talentueux qu'on a du mal à trouver. De bons groupes jouent toujours dans les deux mêmes bars, des humoristes attendent les soirées d'humour de la relève et des magiciens sont engagés de bouche à oreille. Pendant ce temps, les salles et les familles qui veulent du divertissement en direct ne savent pas où chercher.",
      "ShowIci les réunit. Nous offrons aux artistes d'ici un profil professionnel, une vraie visibilité et un moyen simple de rencontrer les salles et les gens qui veulent les engager, pour qu'ils jouent plus, gagnent plus et élargissent leur public. Nous ne prenons aucune commission sur les réservations : ce qu'un artiste gagne lui revient.",
    ],
    whoTitle: "À qui s'adresse ShowIci",
    who: [
      { h: "Artistes d'ici", p: "Musiciens solo, groupes, DJ, mariachis, chanteurs, magiciens, humoristes, danseurs et autres artistes de scène, que vous débutiez ou que vous jouiez depuis des années." },
      { h: "Salles", p: "Pubs, bars, restaurants, microbrasseries, cafés et salles qui veulent du divertissement en direct et des artistes fiables adaptés à leur espace, à leur public et à leur budget." },
      { h: "Organisateurs d'événements", p: "Toute personne qui prépare un mariage, un anniversaire, une quinceañera, une fête de bureau ou un événement communautaire et qui préfère un artiste d'ici à une liste de lecture." },
    ],
    howTitle: "Comment ça marche",
    how: [
      { h: "Pour les artistes", steps: ["Créez votre profil avec photos, vidéos, votre style, votre répertoire et la distance que vous êtes prêt à parcourir.", "Soyez trouvé par les salles et les organisateurs qui cherchent par type de numéro, style et région.", "Recevez des demandes de réservation et des messages, acceptez celles qui vous conviennent et réglez les détails directement."] },
      { h: "Pour les salles", steps: ["Créez la page de votre salle et publiez vos spectacles à venir.", "Cherchez des artistes par type de numéro, style, répertoire et distance, et regardez leurs vidéos.", "Écrivez-leur ou envoyez une demande de réservation pour une date. Vos spectacles s'affichent dans le calendrier public de ShowIci."] },
      { h: "Pour les organisateurs", steps: ["Publiez une demande avec votre date, votre secteur et le type de numéro recherché.", "Parcourez les profils d'artistes et écrivez à ceux qui vous plaisent.", "Convenez du cachet et des détails directement avec l'artiste. Votre adresse exacte reste privée."] },
    ],
    valuesTitle: "Ce en quoi nous croyons",
    values: [
      { h: "L'achat local d'abord", p: "Tous les artistes et toutes les salles de ShowIci sont d'ici. Engager local garde l'argent, la culture et les occasions dans nos communautés." },
      { h: "Aucune commission", p: "Le cachet se négocie directement entre l'artiste et la salle ou l'organisateur. ShowIci ne prend jamais de pourcentage sur une réservation." },
      { h: "Tous les genres de numéros", p: "Groupes rock et trios jazz, DJ et mariachis, magiciens et humoristes : ShowIci est conçu pour toute la gamme du divertissement en direct." },
      { h: "En français et en anglais", p: "ShowIci fonctionne dans les deux langues, pour que tout le monde au Québec puisse l'utiliser facilement." },
      { h: "Respect et confidentialité", p: "Les numéros de téléphone et les courriels restent masqués dans les messages jusqu'à ce que les deux parties soient prêtes, et les artistes choisissent les demandes qu'ils acceptent." },
    ],
    whereTitle: "Où nous sommes",
    where: "ShowIci est basé à Montréal et couvre toute la province de Québec. Nous commençons par le Grand Montréal (Montréal, Laval, Longueuil et les environs), et les artistes et salles de Québec, Gatineau, Sherbrooke, Trois-Rivières, Saguenay et de toutes les autres régions peuvent aussi s'inscrire et être trouvés.",
    faqTitle: "Questions sur ShowIci",
    faq: [
      ["Qu'est-ce que ShowIci?", "ShowIci est une plateforme en ligne bilingue qui met en relation les artistes d'ici (musiciens, groupes, DJ, magiciens, humoristes et autres artistes de scène) avec les salles et les organisateurs d'événements partout au Québec, à commencer par le Grand Montréal."],
      ["Qui peut s'inscrire sur ShowIci?", "Les artistes, les salles et les organisateurs d'événements de partout au Québec, âgés de 18 ans ou plus."],
      ["ShowIci prend-il une commission?", "Non. Les artistes et les salles ou organisateurs conviennent du cachet et du paiement directement. ShowIci ne prend jamais de pourcentage sur une réservation."],
      ["Quels types d'artistes trouve-t-on sur ShowIci?", "Des musiciens solo, des groupes, des DJ, des mariachis, des chanteurs, des magiciens, des humoristes, des danseurs et d'autres artistes de scène."],
      ["Comment les salles trouvent-elles des artistes sur ShowIci?", "Les salles cherchent par type de numéro, style, répertoire et région, regardent les vidéos des artistes, puis leur écrivent ou envoient une demande de réservation pour une date."],
      ["ShowIci est-il offert en anglais?", "Oui. ShowIci fonctionne en français et en anglais. Utilisez le bouton FR / EN en haut de chaque page."],
    ],
    ctaTitle: "Rejoignez la scène locale",
    cta: [
      { label: "Je suis artiste", href: "/register/performer" },
      { label: "J'ai une salle", href: "/register/venue" },
      { label: "J'organise un événement", href: "/request" },
    ],
  },
};
