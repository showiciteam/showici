/**
 * Terms of use and privacy policy, in French and English.
 * Plain data so the text can be edited without touching the page layout.
 * Each section: a heading and paragraphs; a paragraph starting with "- " is shown as a bullet.
 */

export type LegalDoc = { title: string; updated: string; intro: string; sections: { h: string; p: string[] }[] };

const UPDATED_EN = "Last updated: October 25, 2026";
const UPDATED_FR = "Dernière mise à jour : 25 octobre 2026";
const PRIVACY_EMAIL = "privacy@showici.com";

export const terms: Record<"en" | "fr", LegalDoc> = {
  en: {
    title: "Terms of use",
    updated: UPDATED_EN,
    intro: "These terms explain how ShowIci works and what we expect from everyone who uses it. By creating an account or using the site, you agree to them. Please read them, along with our Privacy policy.",
    sections: [
      { h: "1. Who we are", p: ["ShowIci (“ShowIci”, “we”) is an online platform based in Montréal, Québec, that helps venues, event planners and performers (bands, DJs, comedians, magicians, dancers and other acts) find each other, and lets the public browse upcoming shows. You can reach us with the Contact link on any page."] },
      { h: "2. Your account", p: [
        "- You must be at least 18 years old to create an account.",
        "- The information you give us must be accurate and kept up to date. A venue or act listing must be created by someone authorized to represent it.",
        "- You are responsible for keeping your password secret and for what happens under your account. Tell us right away if you think someone else is using it.",
        "- One person or business may not create accounts to get around a limit, a suspension or a review.",
      ] },
      { h: "3. What ShowIci does, and what it doesn't", p: [
        "ShowIci is a meeting place. We show profiles, listings and shows, and we let members message each other. We are not an agent, employer, promoter or party to any agreement you make with another member.",
        "- Bookings, fees, deposits, contracts, cancellations, equipment, permits, insurance and taxes are agreed and handled directly between the venue or planner and the performer.",
        "- ShowIci does not take payments between members and charges no commission on bookings.",
        "- We do not check every listing, review or message, and we don't guarantee that a member will show up, perform or pay as agreed. Use your judgment, put important details in writing and meet in public or professional settings.",
      ] },
      { h: "4. Venues and shows", p: [
        "- Shows you post must be real and up to date. Edit or cancel a show as soon as plans change.",
        "- When you add a performer who is on ShowIci to a show, they receive a booking request. Until they accept, the show is listed as “Artist TBA” and their name and profile are not shown. Never list an act publicly that has not agreed to perform.",
        "- Your venue's address, photos and description are public so people can find your shows.",
        "- To help artists find places to play, ShowIci may list a venue before its owner joins, using public business information (name, address, public phone number, website) from OpenStreetMap and the venue's own pages. These pages are marked as not claimed. The owner can claim the page for free to manage it, or ask us to correct or remove it through Contact. A claim is approved only once we have confirmed that the person manages the venue.",
      ] },
      { h: "5. Performers", p: [
        "- Your profile must describe your own act. Only post photos, videos and music you have the right to share, and only answer requests you can really fulfil.",
        "- Your phone number stays private: it is never shown on your profile. Only your home city is public; we place you near it on the map, never at an exact address.",
      ] },
      { h: "6. Messages and contacts", p: [
        "- Use messages for real booking conversations. No spam, advertising, mass messages or harassment.",
        "- To keep contact details private until both sides are ready, phone numbers and email addresses typed into messages may be hidden automatically.",
        "- Free accounts may be limited in how many new conversations they can start per day. Replies in existing conversations are not limited.",
        "- We can email you when you get a new message. You can turn these emails off in your inbox.",
      ] },
      { h: "7. Reviews", p: ["Reviews must be honest, based on a real experience and only written after talking with that member on ShowIci. Don't review yourself, someone you're close to or a competitor, and don't offer or accept anything in exchange for a review. We may remove reviews that break these rules."] },
      { h: "8. Your content", p: [
        "You keep ownership of what you post (text, photos, logos, video links, reviews). You give ShowIci a free, non-exclusive, worldwide licence to host, display, reproduce and adapt it (for example, resizing a photo) to run ShowIci and to promote ShowIci and your listing, including on our social media pages. This licence ends when you delete the content or your account, except for copies already shared publicly and reasonable backup copies.",
        "You confirm you have the rights needed for everything you post, including the consent of identifiable people in your photos and videos.",
      ] },
      { h: "9. What's not allowed", p: [
        "- False, misleading or impersonating profiles, listings, shows or reviews.",
        "- Content that is illegal, hateful, threatening, sexually explicit or that infringes someone else's rights.",
        "- Collecting other members' information, scraping the site, or using it to send unsolicited messages.",
        "- Trying to get around safety features, limits or contact masking, or interfering with how the site works.",
      ] },
      { h: "10. Reports, moderation and suspension", p: ["You can report a conversation or a member. We may review content, hide or remove it, limit features, or suspend or close an account that breaks these terms or puts others at risk. When reasonable, we'll tell you why. You can close your account at any time by contacting us."] },
      { h: "11. Plans and prices", p: ["ShowIci is free during its launch period. We may introduce paid plans later. We will announce prices and what each plan includes at least 30 days in advance, and you will never be charged unless you choose a paid plan and agree to its price."] },
      { h: "12. Other services", p: ["ShowIci uses or links to other services, such as YouTube videos, maps from OpenStreetMap and ticketing sites. Their own terms apply, and we are not responsible for their content or availability."] },
      { h: "13. Our responsibility", p: [
        "We work to keep ShowIci available and accurate, but the site is provided “as is” and may have interruptions or errors.",
        "To the extent permitted by law, ShowIci is not responsible for agreements between members, for a member's conduct or no-show, or for indirect losses such as lost income. Nothing in these terms limits rights you have under the Québec Consumer Protection Act or other laws that cannot be waived.",
      ] },
      { h: "14. Changes", p: ["We may update these terms. If a change is important, we will tell you by email or on the site at least 30 days before it applies. If you keep using ShowIci after that, the new terms apply; if you don't agree, you can close your account."] },
      { h: "15. Applicable law and language", p: [
        "These terms are governed by the laws of Québec and the federal laws of Canada that apply there. Any dispute will be heard in the judicial district of Montréal, subject to your rights as a consumer.",
        "These terms are available in French and English. In case of a difference, the French version prevails.",
      ] },
      { h: "16. Contact", p: [`Questions about these terms: use the Contact link at the bottom of any page. For privacy questions, write to ${PRIVACY_EMAIL}.`] },
    ],
  },
  fr: {
    title: "Conditions d'utilisation",
    updated: UPDATED_FR,
    intro: "Ces conditions expliquent le fonctionnement de ShowIci et ce que nous attendons de toutes les personnes qui l'utilisent. En créant un compte ou en utilisant le site, vous les acceptez. Veuillez les lire, ainsi que notre Politique de confidentialité.",
    sections: [
      { h: "1. Qui nous sommes", p: ["ShowIci (« ShowIci », « nous ») est une plateforme en ligne basée à Montréal (Québec) qui aide les salles, les organisateurs d'événements et les artistes (groupes, DJ, humoristes, magiciens, danseurs et autres numéros) à se trouver, et qui permet au public de consulter les spectacles à venir. Vous pouvez nous joindre par le lien Contact au bas de chaque page."] },
      { h: "2. Votre compte", p: [
        "- Vous devez avoir au moins 18 ans pour créer un compte.",
        "- Les renseignements que vous fournissez doivent être exacts et à jour. Une fiche de salle ou d'artiste doit être créée par une personne autorisée à la représenter.",
        "- Vous êtes responsable de garder votre mot de passe secret et de ce qui se fait à partir de votre compte. Avisez-nous sans délai si vous croyez que quelqu'un d'autre l'utilise.",
        "- Une même personne ou entreprise ne peut pas créer de comptes pour contourner une limite, une suspension ou un avis.",
      ] },
      { h: "3. Ce que fait ShowIci, et ce qu'il ne fait pas", p: [
        "ShowIci est un lieu de rencontre. Nous affichons des profils, des fiches et des spectacles, et nous permettons aux membres de s'écrire. Nous ne sommes ni agent, ni employeur, ni promoteur, ni partie aux ententes que vous concluez avec un autre membre.",
        "- Les réservations, cachets, dépôts, contrats, annulations, équipements, permis, assurances et taxes sont convenus et gérés directement entre la salle ou l'organisateur et l'artiste.",
        "- ShowIci ne perçoit aucun paiement entre membres et ne prend aucune commission sur les réservations.",
        "- Nous ne vérifions pas chaque fiche, avis ou message, et nous ne garantissons pas qu'un membre se présentera, jouera ou paiera comme convenu. Faites preuve de jugement, mettez les détails importants par écrit et rencontrez-vous dans des lieux publics ou professionnels.",
      ] },
      { h: "4. Salles et spectacles", p: [
        "- Les spectacles que vous publiez doivent être réels et à jour. Modifiez ou annulez un spectacle dès que les plans changent.",
        "- Lorsque vous ajoutez à un spectacle un artiste inscrit sur ShowIci, il reçoit une demande de réservation. Tant qu'il n'a pas accepté, le spectacle est affiché « Artist TBA » (artiste à confirmer) et son nom et son profil ne sont pas montrés. N'annoncez jamais publiquement un artiste qui n'a pas accepté de jouer.",
        "- L'adresse, les photos et la description de votre salle sont publiques pour qu'on puisse trouver vos spectacles.",
        "- Pour aider les artistes à trouver où jouer, ShowIci peut afficher une salle avant que son propriétaire s'inscrive, à partir de renseignements d'entreprise publics (nom, adresse, numéro de téléphone public, site web) provenant d'OpenStreetMap et des pages de la salle. Ces pages sont indiquées comme non réclamées. Le propriétaire peut réclamer la page gratuitement pour la gérer, ou nous demander de la corriger ou de la retirer par le lien Contact. Une réclamation n'est approuvée qu'après avoir confirmé que la personne gère la salle.",
      ] },
      { h: "5. Artistes", p: [
        "- Votre profil doit présenter votre propre numéro. Ne publiez que des photos, vidéos et pièces musicales que vous avez le droit de partager, et ne répondez qu'aux demandes que vous pouvez réellement honorer.",
        "- Votre numéro de téléphone reste privé : il n'est jamais affiché sur votre profil. Seule votre ville est publique; nous vous plaçons près de celle-ci sur la carte, jamais à une adresse exacte.",
      ] },
      { h: "6. Messages et contacts", p: [
        "- Utilisez les messages pour de vraies discussions de réservation. Pas de pourriel, de publicité, d'envois massifs ni de harcèlement.",
        "- Pour garder les coordonnées privées jusqu'à ce que les deux parties soient prêtes, les numéros de téléphone et adresses courriel écrits dans les messages peuvent être masqués automatiquement.",
        "- Les comptes gratuits peuvent être limités dans le nombre de nouvelles conversations par jour. Les réponses dans les conversations existantes ne sont pas limitées.",
        "- Nous pouvons vous écrire par courriel quand vous recevez un nouveau message. Vous pouvez désactiver ces courriels dans votre boîte de réception.",
      ] },
      { h: "7. Avis", p: ["Les avis doivent être honnêtes, fondés sur une expérience réelle et rédigés seulement après avoir échangé avec ce membre sur ShowIci. N'évaluez pas votre propre compte, un proche ou un concurrent, et n'offrez ni n'acceptez rien en échange d'un avis. Nous pouvons retirer les avis qui ne respectent pas ces règles."] },
      { h: "8. Votre contenu", p: [
        "Vous restez propriétaire de ce que vous publiez (textes, photos, logos, liens vidéo, avis). Vous accordez à ShowIci une licence gratuite, non exclusive et mondiale pour l'héberger, l'afficher, le reproduire et l'adapter (par exemple, redimensionner une photo) afin d'exploiter ShowIci et de promouvoir ShowIci et votre fiche, y compris sur nos réseaux sociaux. Cette licence prend fin lorsque vous supprimez le contenu ou votre compte, sauf pour les copies déjà partagées publiquement et les copies de sauvegarde raisonnables.",
        "Vous confirmez détenir les droits nécessaires pour tout ce que vous publiez, y compris le consentement des personnes reconnaissables sur vos photos et vidéos.",
      ] },
      { h: "9. Ce qui est interdit", p: [
        "- Les profils, fiches, spectacles ou avis faux, trompeurs ou usurpant une identité.",
        "- Le contenu illégal, haineux, menaçant, sexuellement explicite ou qui porte atteinte aux droits d'autrui.",
        "- Recueillir les renseignements d'autres membres, extraire automatiquement le contenu du site ou l'utiliser pour envoyer des messages non sollicités.",
        "- Tenter de contourner les mesures de sécurité, les limites ou le masquage des coordonnées, ou nuire au fonctionnement du site.",
      ] },
      { h: "10. Signalements, modération et suspension", p: ["Vous pouvez signaler une conversation ou un membre. Nous pouvons examiner du contenu, le masquer ou le retirer, limiter des fonctions, ou suspendre ou fermer un compte qui enfreint ces conditions ou met d'autres personnes en danger. Lorsque c'est raisonnable, nous vous en expliquerons la raison. Vous pouvez fermer votre compte en tout temps en nous écrivant."] },
      { h: "11. Forfaits et prix", p: ["ShowIci est gratuit pendant sa période de lancement. Des forfaits payants pourraient être offerts plus tard. Nous annoncerons les prix et le contenu de chaque forfait au moins 30 jours à l'avance, et aucun montant ne vous sera facturé sans que vous ayez choisi un forfait payant et accepté son prix."] },
      { h: "12. Autres services", p: ["ShowIci utilise ou renvoie vers d'autres services, comme les vidéos YouTube, les cartes d'OpenStreetMap et des sites de billetterie. Leurs propres conditions s'appliquent, et nous ne sommes pas responsables de leur contenu ni de leur disponibilité."] },
      { h: "13. Notre responsabilité", p: [
        "Nous nous efforçons de garder ShowIci disponible et exact, mais le site est offert « tel quel » et peut connaître des interruptions ou des erreurs.",
        "Dans la mesure permise par la loi, ShowIci n'est pas responsable des ententes entre membres, du comportement ou de l'absence d'un membre, ni des pertes indirectes comme une perte de revenus. Rien dans ces conditions ne limite les droits que vous confèrent la Loi sur la protection du consommateur du Québec ou d'autres lois auxquelles on ne peut renoncer.",
      ] },
      { h: "14. Modifications", p: ["Nous pouvons mettre à jour ces conditions. Si un changement est important, nous vous en aviserons par courriel ou sur le site au moins 30 jours avant son entrée en vigueur. Si vous continuez d'utiliser ShowIci par la suite, les nouvelles conditions s'appliquent; si vous ne les acceptez pas, vous pouvez fermer votre compte."] },
      { h: "15. Loi applicable et langue", p: [
        "Ces conditions sont régies par les lois du Québec et les lois fédérales du Canada qui s'y appliquent. Tout litige sera entendu dans le district judiciaire de Montréal, sous réserve de vos droits à titre de consommateur.",
        "Ces conditions sont offertes en français et en anglais. En cas de divergence, la version française prévaut.",
      ] },
      { h: "16. Nous joindre", p: [`Questions sur ces conditions : utilisez le lien Contact au bas de chaque page. Pour toute question de confidentialité, écrivez à ${PRIVACY_EMAIL}.`] },
    ],
  },
};

export const privacy: Record<"en" | "fr", LegalDoc> = {
  en: {
    title: "Privacy policy",
    updated: UPDATED_EN,
    intro: "This policy explains what personal information ShowIci collects, why, who it's shared with, how long we keep it and how to exercise your rights. It follows Québec's Act respecting the protection of personal information in the private sector (Law 25) and Canada's PIPEDA.",
    sections: [
      { h: "1. Person in charge", p: [`ShowIci's Privacy Officer (person in charge of the protection of personal information) is responsible for how we handle your information. Contact: ${PRIVACY_EMAIL}. ShowIci is based in Montréal, Québec.`] },
      { h: "2. What we collect", p: [
        "- Account: your name, email address, password (stored encrypted by our authentication provider; we never see it), the type of account you chose and your language.",
        "- Public profile or listing: act or venue name, description, styles, photos, logo, video links, social media and website links, city, and for venues the street address and booking details. This information is meant to be public.",
        "- Private details: your phone number. It is never shown on your profile.",
        "- Location: for venues, the address you enter; for performers, your home city. Performers appear on the map near their city, never at an exact address.",
        "- Activity: shows you post, booking requests and answers, event requests (event type, date, city, number of guests, budget, notes), saved profiles, reviews and reports.",
        "- Messages: conversations between members, which we store so they can be read in your inbox. Phone numbers and emails typed in messages may be hidden automatically.",
        "- Contact form: what you write to us and the details you choose to add (name, email, phone, company, etc.).",
        "- Venue claims: when you claim a venue page, your name, role at the venue, email and phone number, used only to confirm the claim.",
        "- Venues listed before their owner joins: public business information about the venue (name, address, public phone number, website), taken from OpenStreetMap and the venue's own pages. It is about the business, not about a person.",
        "- Technical: a login session cookie needed to keep you signed in, your language choice saved in your browser, and the basic connection logs (IP address, browser, time) that our hosting providers keep for security.",
        "- Site statistics (Google Analytics): how the site is used (pages viewed, approximate location from your IP address, device and browser, how you arrived). We use it to see which pages help people and to improve ShowIci, not for advertising. Google Analytics cookies are only set if you accept them. If you don't, Google only receives anonymous measurements without cookies, which can't recognize you from one visit to the next. You can change your choice anytime with \"Cookie settings\" at the bottom of every page.",
        "Apart from those public venue listings, we collect this information directly from you when you fill in a form or use the site. We don't buy information about you, and we don't use advertising cookies. Google Analytics cookies are only used if you accept them.",
      ] },
      { h: "3. Why we use it", p: [
        "- To create and secure your account and let you sign in and reset your password.",
        "- To show your public profile, listing and shows, and to help people find them by area, style and distance.",
        "- To let members contact each other and to send booking requests and new-message emails (which you can turn off).",
        "- To answer your messages to us, moderate content, handle reports and prevent fraud and abuse.",
        "- To understand how the site is used and improve it, using aggregated information.",
        "We only use your information for these purposes or others you consent to. We do not sell or rent personal information.",
      ] },
      { h: "4. Who sees it", p: [
        "- The public: everything in your public profile or listing, your shows, and reviews you write (with your display name).",
        "- Other members: your messages to them, your booking requests and answers, and event request details for performers looking for gigs.",
        "- ShowIci administrators: only as needed to run the site, answer you, moderate and investigate reports.",
        "- Service providers that host or process information for us, under contract and only for that purpose (see section 5).",
        "- Authorities, if the law requires it.",
      ] },
      { h: "5. Service providers and storage outside Québec", p: [
        "We use trusted providers to run ShowIci. Some of them store or process information outside Québec, mainly in the United States:",
        "- Supabase: database, sign-in and file storage (photos, logos).",
        "- Vercel: website hosting.",
        "- Resend: sending emails (sign-up confirmation, password reset, new-message alerts).",
        "- Google (Google Analytics): site statistics (cookies only for visitors who accept them). Google keeps this data for the period set in our account, 14 months at most.",
        "- OpenStreetMap and komoot (Photon): map images and address suggestions. What you type in an address field is sent to suggest matches.",
        "- YouTube (Google): videos load from YouTube when you press play.",
        "- Cloudflare (cdnjs) and Noembed: map code and video titles.",
        "Before using a provider, we assess whether it protects information adequately, and we only share what it needs. Information stored outside Québec may be accessible to authorities of that country under its laws.",
      ] },
      { h: "6. How long we keep it", p: [
        "- Account, profile, listing and messages: while your account is open. When you close it, we delete or anonymize them within 30 days, except reviews and reports, which may be kept up to one year to handle disputes and abuse.",
        "- Contact form messages: up to two years after the last exchange.",
        "- Backups and hosting logs: deleted automatically on the providers' schedule, usually within 30 to 90 days.",
      ] },
      { h: "7. Security", p: ["We use encrypted connections (HTTPS), encrypted password storage, database access rules so each member only sees what they're allowed to, and limited administrator access. No system is perfectly secure; if a confidentiality incident creates a risk of serious injury, we will notify the Commission d'accès à l'information and the people concerned, as required by law, and keep a record of incidents."] },
      { h: "8. Your rights", p: [
        "You can:",
        "- see and change most of your information yourself in your profile or dashboard;",
        "- ask to access the personal information we hold about you and how it's used;",
        "- ask us to correct it, or to delete it and close your account;",
        "- withdraw a consent you gave (for example, new-message emails);",
        "- ask for your information in a structured, commonly used format;",
        "- ask us to stop spreading your information or to de-index it, where the law allows.",
        `To make a request, write to ${PRIVACY_EMAIL}. We may need to confirm your identity. We answer within 30 days. If you're not satisfied, you can complain to the Commission d'accès à l'information du Québec (cai.gouv.qc.ca) or the Office of the Privacy Commissioner of Canada (priv.gc.ca).`,
      ] },
      { h: "9. Age", p: ["ShowIci is meant for people 18 and older. We don't knowingly collect information from minors. If you think a minor has created an account, tell us and we will delete it."] },
      { h: "10. Changes", p: ["We may update this policy. If a change is important, we'll tell you by email or on the site before it applies, and ask for your consent again when the law requires it. The date at the top shows the latest version."] },
      { h: "11. Contact", p: [`Privacy Officer, ShowIci, Montréal (Québec) · ${PRIVACY_EMAIL}`] },
    ],
  },
  fr: {
    title: "Politique de confidentialité",
    updated: UPDATED_FR,
    intro: "Cette politique explique quels renseignements personnels ShowIci recueille, pourquoi, avec qui ils sont communiqués, combien de temps nous les conservons et comment exercer vos droits. Elle respecte la Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25) et la LPRPDE fédérale.",
    sections: [
      { h: "1. Personne responsable", p: [`Le responsable de la protection des renseignements personnels de ShowIci veille à la façon dont nous traitons vos renseignements. Pour le joindre : ${PRIVACY_EMAIL}. ShowIci est basé à Montréal (Québec).`] },
      { h: "2. Ce que nous recueillons", p: [
        "- Compte : votre nom, votre adresse courriel, votre mot de passe (conservé chiffré par notre fournisseur d'authentification; nous ne le voyons jamais), le type de compte choisi et votre langue.",
        "- Profil ou fiche publique : nom de l'artiste ou de la salle, description, styles, photos, logo, liens vidéo, réseaux sociaux et site web, ville, et pour les salles, l'adresse et les détails de réservation. Ces renseignements sont destinés à être publics.",
        "- Renseignements privés : votre numéro de téléphone. Il n'est jamais affiché sur votre profil.",
        "- Localisation : pour les salles, l'adresse saisie; pour les artistes, leur ville. Les artistes apparaissent sur la carte près de leur ville, jamais à une adresse exacte.",
        "- Activité : spectacles publiés, demandes de réservation et réponses, demandes d'événement (type, date, ville, nombre d'invités, budget, notes), profils sauvegardés, avis et signalements.",
        "- Messages : les conversations entre membres, que nous conservons pour qu'elles s'affichent dans votre boîte de réception. Les numéros et courriels écrits dans les messages peuvent être masqués automatiquement.",
        "- Formulaire de contact : ce que vous nous écrivez et les détails que vous choisissez d'ajouter (nom, courriel, téléphone, entreprise, etc.).",
        "- Réclamation d'une salle : lorsque vous réclamez la page d'une salle, votre nom, votre rôle à la salle, votre courriel et votre numéro de téléphone, utilisés seulement pour confirmer la réclamation.",
        "- Salles affichées avant l'inscription de leur propriétaire : des renseignements d'entreprise publics sur la salle (nom, adresse, numéro de téléphone public, site web), tirés d'OpenStreetMap et des pages de la salle. Ils concernent l'entreprise, pas une personne.",
        "- Données techniques : un témoin (cookie) de session nécessaire pour rester connecté, votre choix de langue enregistré dans votre navigateur, et les journaux de connexion de base (adresse IP, navigateur, heure) conservés par nos hébergeurs pour la sécurité.",
        "- Statistiques du site (Google Analytics) : l'utilisation du site (pages consultées, emplacement approximatif selon votre adresse IP, appareil et navigateur, provenance de la visite). Nous nous en servons pour savoir quelles pages sont utiles et améliorer ShowIci, jamais pour la publicité. Les témoins Google Analytics ne sont activés que si vous les acceptez. Sinon, Google ne reçoit que des mesures anonymes sans témoins, qui ne permettent pas de vous reconnaître d'une visite à l'autre. Vous pouvez changer votre choix en tout temps avec « Témoins » au bas de chaque page.",
        "Sauf pour ces fiches de salles publiques, nous recueillons ces renseignements directement auprès de vous lorsque vous remplissez un formulaire ou utilisez le site. Nous n'achetons pas de renseignements sur vous et n'utilisons pas de témoins publicitaires. Les témoins Google Analytics ne sont utilisés que si vous les acceptez.",
      ] },
      { h: "3. Pourquoi nous les utilisons", p: [
        "- Créer et protéger votre compte, et vous permettre de vous connecter et de réinitialiser votre mot de passe.",
        "- Afficher votre profil, votre fiche et vos spectacles publics, et aider les gens à les trouver par secteur, style et distance.",
        "- Permettre aux membres de communiquer entre eux et envoyer les demandes de réservation et les courriels de nouveau message (que vous pouvez désactiver).",
        "- Répondre à vos messages, modérer le contenu, traiter les signalements et prévenir la fraude et les abus.",
        "- Comprendre l'utilisation du site et l'améliorer, à partir de données regroupées.",
        "Nous n'utilisons vos renseignements qu'à ces fins ou à d'autres fins auxquelles vous consentez. Nous ne vendons ni ne louons aucun renseignement personnel.",
      ] },
      { h: "4. Qui y a accès", p: [
        "- Le public : tout ce qui figure dans votre profil ou votre fiche publique, vos spectacles et les avis que vous rédigez (avec votre nom affiché).",
        "- Les autres membres : vos messages, vos demandes de réservation et réponses, et les détails des demandes d'événement pour les artistes qui cherchent des contrats.",
        "- Les administrateurs de ShowIci : seulement au besoin pour exploiter le site, vous répondre, modérer et examiner les signalements.",
        "- Les fournisseurs de services qui hébergent ou traitent des renseignements pour nous, par contrat et seulement à cette fin (voir la section 5).",
        "- Les autorités, si la loi l'exige.",
      ] },
      { h: "5. Fournisseurs et conservation hors du Québec", p: [
        "Nous faisons appel à des fournisseurs de confiance pour exploiter ShowIci. Certains conservent ou traitent des renseignements à l'extérieur du Québec, principalement aux États-Unis :",
        "- Supabase : base de données, connexion et stockage de fichiers (photos, logos).",
        "- Vercel : hébergement du site.",
        "- Resend : envoi des courriels (confirmation d'inscription, réinitialisation du mot de passe, avis de nouveau message).",
        "- Google (Google Analytics) : statistiques du site (témoins seulement pour les visiteurs qui les acceptent). Google conserve ces données pendant la durée réglée dans notre compte, au plus 14 mois.",
        "- OpenStreetMap et komoot (Photon) : images de carte et suggestions d'adresses. Ce que vous tapez dans un champ d'adresse est transmis pour proposer des résultats.",
        "- YouTube (Google) : les vidéos se chargent depuis YouTube lorsque vous appuyez sur lecture.",
        "- Cloudflare (cdnjs) et Noembed : code de la carte et titres des vidéos.",
        "Avant de recourir à un fournisseur, nous évaluons s'il protège adéquatement les renseignements, et nous ne lui communiquons que ce dont il a besoin. Les renseignements conservés hors du Québec peuvent être accessibles aux autorités de ce pays selon ses lois.",
      ] },
      { h: "6. Durée de conservation", p: [
        "- Compte, profil, fiche et messages : tant que votre compte est ouvert. À sa fermeture, nous les supprimons ou les anonymisons dans les 30 jours, sauf les avis et signalements, qui peuvent être conservés jusqu'à un an pour régler les litiges et les abus.",
        "- Messages du formulaire de contact : jusqu'à deux ans après le dernier échange.",
        "- Sauvegardes et journaux d'hébergement : supprimés automatiquement selon le calendrier des fournisseurs, habituellement en 30 à 90 jours.",
      ] },
      { h: "7. Sécurité", p: ["Nous utilisons des connexions chiffrées (HTTPS), un stockage chiffré des mots de passe, des règles d'accès à la base de données pour que chaque membre ne voie que ce qui lui est permis, et un accès administrateur limité. Aucun système n'est parfaitement sûr; si un incident de confidentialité présente un risque de préjudice sérieux, nous aviserons la Commission d'accès à l'information et les personnes concernées, comme l'exige la loi, et tiendrons un registre des incidents."] },
      { h: "8. Vos droits", p: [
        "Vous pouvez :",
        "- consulter et modifier vous-même la plupart de vos renseignements dans votre profil ou tableau de bord;",
        "- demander l'accès aux renseignements personnels que nous détenons sur vous et à la façon dont ils sont utilisés;",
        "- demander leur rectification, ou leur suppression et la fermeture de votre compte;",
        "- retirer un consentement donné (par exemple, les courriels de nouveau message);",
        "- obtenir vos renseignements dans un format structuré et couramment utilisé;",
        "- demander que nous cessions de diffuser vos renseignements ou que nous les désindexions, lorsque la loi le permet.",
        `Pour faire une demande, écrivez à ${PRIVACY_EMAIL}. Nous pourrions devoir confirmer votre identité. Nous répondons dans les 30 jours. Si vous n'êtes pas satisfait, vous pouvez porter plainte auprès de la Commission d'accès à l'information du Québec (cai.gouv.qc.ca) ou du Commissariat à la protection de la vie privée du Canada (priv.gc.ca).`,
      ] },
      { h: "9. Âge", p: ["ShowIci s'adresse aux personnes de 18 ans et plus. Nous ne recueillons pas sciemment de renseignements sur des mineurs. Si vous croyez qu'une personne mineure a créé un compte, avisez-nous et nous le supprimerons."] },
      { h: "10. Modifications", p: ["Nous pouvons mettre cette politique à jour. Si un changement est important, nous vous en aviserons par courriel ou sur le site avant son entrée en vigueur, et nous redemanderons votre consentement lorsque la loi l'exige. La date en haut indique la version en vigueur."] },
      { h: "11. Nous joindre", p: [`Responsable de la protection des renseignements personnels, ShowIci, Montréal (Québec) · ${PRIVACY_EMAIL}`] },
    ],
  },
};
