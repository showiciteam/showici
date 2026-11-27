import type { Lang } from "./lang";
import type { Tone } from "./types";

export interface NewsArticleText {
  category: string;
  title: string;
  /** Title shown in search results and link previews. */
  seoTitle: string;
  /** Meta description. */
  description: string;
  dek: string;
  date: string;
  read: string;
  /** Byline, e.g. "The ShowIci team". */
  author: string;
  keywords: string[];
  sections: { heading?: string; paragraphs: string[] }[];
  tagline: string;
}

export interface NewsArticle extends Record<Lang, NewsArticleText> {
  slug: string;
  /** ISO date, for search engines and the sitemap. */
  published: string;
  tone: Tone;
}

/** Published News articles, newest first. Each one lives at /news/<slug> (French) and /en/news/<slug> (English). */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "the-story-behind-showici",
    published: "2026-11-27",
    tone: "ph-1",
    fr: {
      category: "Communauté",
      title: "ShowIci : parce que le talent d’ici mérite d’être vu",
      seoTitle: "ShowIci : une scène pour le talent d’ici",
      description: "Découvrez l’histoire de ShowIci, une plateforme québécoise qui relie artistes, salles et organisateurs pour faire rayonner le talent d’ici.",
      dek: "ShowIci est né d’un amour de la musique et de l’envie de rendre le talent d’ici plus facile à découvrir. Voici l’histoire du projet, pourquoi il existe et ce que nous espérons bâtir avec la communauté artistique du Québec.",
      date: "27 novembre 2026",
      read: "4 min de lecture",
      author: "L’équipe ShowIci",
      keywords: [
        "artistes locaux Québec",
        "spectacles",
        "musique d’ici",
        "réserver un artiste",
        "ShowIci",
        "scène musicale montréalaise"
      ],
      sections: [
        {
          paragraphs: [
            "Derrière chaque spectacle, il y a une histoire. Derrière chaque artiste, il y a une personne qui mérite qu’on lui donne sa chance.",
            "ShowIci est né d’un amour de la musique, d’une admiration pour les gens créatifs et d’une question qui me trottait dans la tête depuis un bon moment : pourquoi est-ce encore si difficile pour les artistes d’ici de trouver des occasions de se produire?",
            "Le Québec compte une communauté artistique incroyable. Des musiciens qui jouent dans les petits bars de quartier aux humoristes qui peaufinent leur prochain numéro, il y a du talent partout. Pourtant, beaucoup d’entre eux restent peu connus en dehors de leur entourage.",
            "En même temps, des salles cherchent des artistes, des gens organisent des événements privés et des communautés ont envie de vivre quelque chose de différent.",
            "Malgré toute la technologie à notre disposition, mettre ces gens en contact n’est pas toujours simple.",
            "C’est de là qu’est venue l’idée de ShowIci."
          ]
        },
        {
          heading: "D’une idée à quelque chose de concret",
          paragraphs: [
            "ShowIci ne s’est pas fait du jour au lendemain. C’est une idée qui m’habitait depuis longtemps avant que j’aie enfin l’occasion et les outils pour la concrétiser.",
            "Mon parcours professionnel est en technologie, mais ce qui motive ce projet est beaucoup plus personnel. J’ai toujours aimé la musique et les gens qui se consacrent à créer quelque chose que d’autres peuvent apprécier.",
            "Au fil des ans, les progrès technologiques m’ont permis de transformer ce qui n’était qu’une idée en quelque chose de tangible.",
            "Mais la technologie n’est que l’outil. Ce sont les gens qui en sont la raison d’être."
          ]
        },
        {
          heading: "Rendre le talent d’ici plus facile à découvrir",
          paragraphs: [
            "Pensez à tous ces artistes incroyables dont vous n’avez peut-être jamais entendu parler, simplement parce que vous ne saviez pas où les trouver.",
            "Un musicien qui joue à quelques rues de chez vous. Un groupe qui répète chaque semaine en espérant décrocher sa prochaine date. Un humoriste à la recherche d’un nouveau public, ou un magicien qui pourrait rendre un anniversaire inoubliable.",
            "Ces gens font partie de nos communautés.",
            "ShowIci a été créé pour les aider à gagner en visibilité, qu’ils fassent leurs premiers pas sur scène ou qu’ils peaufinent leur art depuis des années.",
            "Les artistes peuvent créer leur propre profil, partager des photos et des vidéos, présenter leur travail et communiquer directement avec les gens qui souhaitent les engager.",
            "Les salles peuvent découvrir de nouveaux talents, promouvoir leurs prochains spectacles et faire connaître leur programmation à un plus large public.",
            "Et pour quiconque organise un mariage, un anniversaire, une activité d’entreprise ou un événement communautaire, trouver des artistes d’ici devient un peu plus facile."
          ]
        },
        {
          heading: "Ce que les artistes gagnent devrait leur revenir",
          paragraphs: [
            "Dès le départ, il était important pour moi de ne pas créer un autre intermédiaire qui prend un pourcentage du cachet des artistes.",
            "Être artiste comporte déjà son lot de défis. Entre les répétitions, l’équipement, les déplacements et les innombrables heures consacrées à développer son art, il y a énormément de travail que le public ne voit pas.",
            "ShowIci ne prend aucune commission sur les réservations.",
            "Les artistes et les organisateurs communiquent directement, négocient eux-mêmes leur cachet et décident de ce qui leur convient le mieux.",
            "La plateforme est là pour faciliter le contact, pas pour s’interposer."
          ]
        },
        {
          heading: "Plus que de la musique",
          paragraphs: [
            "Même si mon amour de la musique est à l’origine de ShowIci, la créativité va bien au-delà de la musique.",
            "Musiciens, groupes, DJ, humoristes, magiciens, danseurs et autres artistes de la scène ont tous leur place ici.",
            "Je voulais aussi que ShowIci reflète la réalité du Québec, c’est pourquoi la plateforme est offerte en français et en anglais.",
            "Basé à Montréal, le projet est ouvert aux artistes et aux salles de partout dans la province. Il y a un talent incroyable bien au-delà de nos grandes villes, et la géographie ne devrait empêcher personne d’être découvert."
          ]
        },
        {
          heading: "Apprendre à connaître les gens derrière les spectacles",
          paragraphs: [
            "Une autre partie du projet qui m’enthousiasme particulièrement, c’est ShowIci À l’affiche.",
            "Au moyen d’entrevues et de conversations avec des artistes et des salles d’ici, je veux leur donner l’occasion de raconter leur histoire.",
            "Comment ont-ils commencé? Qu’est-ce qui les inspire? À quels défis ont-ils fait face? Sur quoi travaillent-ils en ce moment?",
            "Parfois, connaître l’histoire derrière un artiste nous fait apprécier son spectacle encore davantage.",
            "La participation est sans frais et sans engagement. C’est simplement une autre façon d’offrir un peu plus de visibilité au talent d’ici et de célébrer les gens qui font de notre communauté artistique ce qu’elle est."
          ]
        },
        {
          heading: "Un projet qui continue de grandir",
          paragraphs: [
            "ShowIci n’est pas un projet terminé, et je ne prétends pas avoir toutes les réponses.",
            "Je le bâtis en écoutant les commentaires, en faisant des erreurs, en apprenant et en améliorant les choses au fur et à mesure.",
            "Certaines des meilleures idées viennent des conversations avec les artistes et les propriétaires de salles eux-mêmes. Après tout, c’est pour eux que cette plateforme est conçue.",
            "Je ne veux pas que ShowIci devienne un autre site où l’on crée un profil pour ensuite l’oublier. Je veux que ce soit utile. Un endroit où l’on revient parce qu’il aide à découvrir des talents, à trouver des occasions ou simplement à profiter de ce qui se passe dans sa propre communauté."
          ]
        },
        {
          heading: "Encourager la scène d’ici, ça commence par être là",
          paragraphs: [
            "Pas besoin d’être artiste ou propriétaire de salle pour faire partie de ce projet.",
            "Allez voir un spectacle près de chez vous. Découvrez un nouveau groupe. Partagez le profil d’un artiste. Visitez une salle qui présente des spectacles. Parlez à vos amis d’un artiste que vous avez aimé.",
            "Ces petits gestes comptent plus qu’on ne le pense.",
            "Derrière chaque spectacle d’ici, il y a des gens qui ont investi leur temps, leur énergie et leur passion pour faire vivre une expérience aux autres.",
            "ShowIci, c’est ma façon de contribuer à cette communauté.",
            "Il reste encore beaucoup de travail, mais voir cette idée devenir réalité m’a donné encore plus de raisons de continuer.",
            "Et je n’ai pas l’intention de m’arrêter maintenant."
          ]
        }
      ],
      tagline: "Découvrez local. Encouragez local. Vivez local."
    },
    en: {
      category: "Community",
      title: "ShowIci: Because Local Talent Deserves to Be Seen",
      seoTitle: "ShowIci: Giving Québec’s Local Talent a Stage",
      description: "Discover the story behind ShowIci, a Québec platform connecting local artists, venues and event organizers while supporting local talent.",
      dek: "ShowIci started with a love of music and a desire to make local talent easier to discover. Here’s the story behind the project, why it exists and what we hope to build together with Québec’s artistic community.",
      date: "November 27, 2026",
      read: "4 min read",
      author: "The ShowIci team",
      keywords: [
        "Québec local artists",
        "live entertainment",
        "local music",
        "artist bookings",
        "ShowIci",
        "Montréal music scene"
      ],
      sections: [
        {
          paragraphs: [
            "Behind every performance, there is a story. Behind every artist, there is someone who deserves an opportunity.",
            "ShowIci started with a love of music, an appreciation for creative people and a question that had been on my mind for quite some time: why is it still so difficult for local artists to find opportunities to perform?",
            "Québec has an incredible artistic community. From musicians performing in small neighbourhood bars to comedians working on their next routine, there are talented people everywhere. Yet so many of them remain relatively unknown outside their immediate circles.",
            "At the same time, there are venues looking for entertainment, people organizing private events and communities looking for something different to experience.",
            "Somehow, despite all the technology available to us, connecting these people isn't always easy.",
            "That's where the idea for ShowIci came from."
          ]
        },
        {
          heading: "From an idea to something real",
          paragraphs: [
            "ShowIci didn't happen overnight. It was an idea that stayed with me for a long time before I finally had the opportunity and the tools to bring it to life.",
            "My professional background is in technology, but the motivation behind this project is something much more personal. I've always appreciated music and the people who dedicate themselves to creating something that others can enjoy.",
            "Over the years, advances in technology have made it possible for me to take what was once an idea and turn it into something tangible.",
            "But technology is only the tool. The people are the reason."
          ]
        },
        {
          heading: "Making local talent easier to discover",
          paragraphs: [
            "Think about how many incredible artists you may never have heard of simply because you didn't know where to find them.",
            "A musician performing just a few streets away from your home. A band rehearsing every week, hoping to find its next opportunity. A comedian looking for a new audience or a magician who could make someone's birthday unforgettable.",
            "These people are part of our communities.",
            "ShowIci was created to help them become more visible, whether they're taking their first steps as performers or have spent years developing their craft.",
            "Artists can create their own profiles, share photographs and videos, introduce their work and connect directly with people interested in booking them.",
            "Venues can discover new talent, promote upcoming performances and introduce their programming to a wider audience.",
            "And for anyone organizing a wedding, a birthday, a corporate gathering or a community event, discovering local entertainment becomes a little easier."
          ]
        },
        {
          heading: "What artists earn should belong to them",
          paragraphs: [
            "One thing that was important to me from the beginning was not creating another intermediary that takes a percentage of an artist's performance fee.",
            "Being an artist already comes with enough challenges. Between rehearsals, equipment, transportation and the countless hours spent developing a craft, there is a lot of work that audiences rarely see.",
            "ShowIci does not take commissions on bookings.",
            "Artists and organizers communicate directly, negotiate their own fees and decide what works best for them.",
            "The platform exists to facilitate that connection, not to stand in the middle of it."
          ]
        },
        {
          heading: "More than music",
          paragraphs: [
            "Although my love of music was one of the inspirations behind ShowIci, creativity goes far beyond music.",
            "Musicians, bands, DJs, comedians, magicians, dancers and other live performers all have a place here.",
            "I also wanted ShowIci to reflect the reality of Québec, which is why the platform is available in both French and English.",
            "Based in Montréal, the project is open to artists and venues throughout the province. Incredible talent exists far beyond our largest cities, and geography shouldn't be a barrier to being discovered."
          ]
        },
        {
          heading: "Getting to know the people behind the performances",
          paragraphs: [
            "Another part of this project that I'm particularly excited about is ShowIci Spotlight.",
            "Through interviews and conversations with local artists and venues, I want to give people an opportunity to share their stories.",
            "How did they get started? What inspires them? What challenges have they faced? What are they working on next?",
            "Sometimes, knowing the story behind an artist makes you appreciate their performance even more.",
            "There are no fees or obligations to participate. It's simply another way to give local talent some additional visibility and celebrate the people who make our artistic community what it is."
          ]
        },
        {
          heading: "A project that is still growing",
          paragraphs: [
            "ShowIci is not a finished project, and I don't pretend to have all the answers.",
            "I'm building it, listening to feedback, making mistakes, learning and improving things along the way.",
            "Some of the most valuable ideas come from conversations with artists and venue owners themselves. After all, they're the people this platform is being built for.",
            "I don't want ShowIci to become another website where people create a profile and eventually forget about it. I want it to be something useful. Something people come back to because it helps them discover talent, find opportunities or simply enjoy what is happening in their own community."
          ]
        },
        {
          heading: "Supporting local starts with showing up",
          paragraphs: [
            "You don't have to be an artist or a venue owner to be part of this project.",
            "Attend a local show. Discover a new band. Share an artist's profile. Visit a venue hosting live entertainment. Tell your friends about a performer you enjoyed.",
            "These small actions matter more than we sometimes realize.",
            "Behind every local performance are people who have invested their time, energy and passion into creating an experience for others.",
            "ShowIci is my way of contributing to that community.",
            "There's still a lot of work ahead, but seeing this idea become a reality has given me even more reasons to keep going.",
            "And I don't want to stop now."
          ]
        }
      ],
      tagline: "Discover local. Support local. Experience local."
    }
  },
];

export const getNewsArticle = (slug: string) => NEWS_ARTICLES.find((a) => a.slug === slug);
