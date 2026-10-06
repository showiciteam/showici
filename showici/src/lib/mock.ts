// Sample data used until Supabase is connected. Names in [brackets] are placeholders.
import type { BigEvent, EventRequest, NewsPost, Performer, Show, Story, Thread, Venue } from "./types";

export const performers: Performer[] = [
  {
    id: "p1", name: "[Band name]", initials: "RB", actType: "Band", genres: ["Rock", "Pop", "80s / 90s"],
    repertoire: "Covers", base: "Montréal", travelKm: 50, distanceKm: 4, eventTypes: ["Pubs and bars", "Private parties", "Quinceañeras"],
    languages: ["Français", "English"], members: 4, setLength: "2 × 45 min", feeRange: "$300 – $600", rating: 4.9, reviewCount: 12,
    verified: true, available: true, bio: "[Bio written by the performer: who they are, the vibe of the show, the crowds they love playing for.]",
    videos: [
      { title: "[Live at a pub: full set highlights]", length: "4:12", featured: true },
      { title: "[80s and 90s medley]", length: "6:30" },
      { title: "[Private party highlights]", length: "3:48" },
    ],
    tone: "ph-1", map: { x: "48%", y: "52%" },
  },
  {
    id: "p2", name: "[Magician name]", initials: "MG", actType: "Magician", genres: ["Close-up magic"],
    repertoire: "Originals", base: "Laval", travelKm: 40, distanceKm: 18, eventTypes: ["Private parties", "Quinceañeras", "Kids' parties"],
    languages: ["Français", "Español"], members: 1, setLength: "1 hour", feeRange: "$300 – $600", rating: 4.8, reviewCount: 7,
    verified: true, available: true, bio: "[Bio: close-up magic for parties, quinceañeras and bars.]",
    videos: [{ title: "[Close-up routine]", length: "3:20", featured: true }], tone: "ph-3", map: { x: "28%", y: "30%" },
  },
  {
    id: "p3", name: "[Comedian name]", initials: "SC", actType: "Stand-up comedy", genres: ["Comedy"],
    repertoire: "Originals", base: "Rosemont", travelKm: 30, distanceKm: 7, eventTypes: ["Pubs and bars", "Corporate events"],
    languages: ["Français", "English"], members: 1, setLength: "45 min", feeRange: "Under $300", rating: 4.8, reviewCount: 9,
    verified: false, available: true, bio: "[Bio: bilingual stand-up comedian.]",
    videos: [{ title: "[Bilingual set excerpt]", length: "5:02", featured: true }], tone: "ph-5", map: { x: "35%", y: "44%" },
  },
  {
    id: "p4", name: "[DJ name]", initials: "DJ", actType: "DJ", genres: ["Latin", "Pop", "Electronic"],
    repertoire: "Covers", base: "Brossard", travelKm: 60, distanceKm: 12, eventTypes: ["Weddings", "Private parties", "Quinceañeras"],
    languages: ["Français", "English", "Español"], members: 1, setLength: "3 hours +", feeRange: "$600 – $1,000", rating: 4.7, reviewCount: 15,
    verified: true, available: true, bio: "[Bio: DJ for weddings and parties.]",
    videos: [{ title: "[Wedding party mix]", length: "4:45", featured: true }], tone: "ph-2", map: { x: "56%", y: "58%" },
  },
  {
    id: "p5", name: "[Duo name]", initials: "AD", actType: "Duo", genres: ["Folk / trad québécois", "Pop"],
    repertoire: "Both", base: "Saint-Jérôme", travelKm: 80, distanceKm: 46, eventTypes: ["Pubs and bars", "Restaurants", "Weddings"],
    languages: ["Français"], members: 2, setLength: "2 × 45 min", feeRange: "$300 – $600", rating: 4.9, reviewCount: 6,
    verified: true, available: false, bio: "[Bio: acoustic duo.]",
    videos: [{ title: "[Acoustic set]", length: "5:40", featured: true }], tone: "ph-4", map: { x: "66%", y: "44%" },
  },
];

export const venues: Venue[] = [
  {
    id: "v1", name: "[Pub name]", type: "Pub", area: "Plateau-Mont-Royal", city: "Montréal", distanceKm: 3, capacity: "50 – 150 people",
    books: ["Bands", "Solo / duo", "Stand-up"], genres: ["Rock", "Blues", "Folk / trad"], nights: "Thu – Sat", leadTime: "2 – 4 weeks ahead",
    feeRange: "$200 – $500", equipment: ["PA / sound system", "Microphones", "Small stage", "Parking for load-in"], openToNewActs: true,
    rating: 4.8, description: "[Venue description: the vibe, the crowd, what live nights are like.]", tone: "ph-2", map: { x: "44%", y: "40%" },
  },
  {
    id: "v2", name: "[Bar name]", type: "Bar", area: "Verdun", city: "Montréal", distanceKm: 9, capacity: "Under 50",
    books: ["Bands", "Stand-up"], genres: ["Rock", "Comedy"], nights: "Fri – Sat", leadTime: "Last minute is fine", feeRange: "Door split / tips",
    equipment: ["PA / sound system", "Microphones"], openToNewActs: true, rating: 4.6, description: "[Venue description.]", tone: "ph-3", map: { x: "38%", y: "58%" },
  },
  {
    id: "v3", name: "[Microbrasserie name]", type: "Brewery", area: "Saint-Jérôme", city: "Saint-Jérôme", distanceKm: 45, capacity: "150+",
    books: ["Bands", "Solo / duo"], genres: ["Folk / trad", "Rock"], nights: "Sat", leadTime: "1 – 3 months", feeRange: "$500 – $1,000",
    equipment: ["PA / sound system", "Stage lighting"], openToNewActs: false, rating: 4.7, description: "[Venue description.]", tone: "ph-4", map: { x: "22%", y: "24%" },
  },
  {
    id: "v4", name: "[Bistro name]", type: "Restaurant", area: "Laval", city: "Laval", distanceKm: 17, capacity: "50 – 150 people",
    books: ["Solo / duo"], genres: ["Jazz", "Pop"], nights: "Wed – Sun", leadTime: "2 – 4 weeks ahead", feeRange: "$200 – $500",
    equipment: ["Piano / keyboard", "Microphones"], openToNewActs: true, rating: 4.5, description: "[Venue description.]", tone: "ph-5", map: { x: "60%", y: "36%" },
  },
];

export const shows: Show[] = [
  { id: "s1", performerId: "p1", venueId: "v1", title: "[Band name] at [Pub name]", genre: "Rock covers", dayLabel: "Friday, October 9", day: "FRI", date: "9", longDate: "Friday, October 9", doors: "8:00 pm", time: "9:00 pm", entry: "Free entry", tone: "ph-1" },
  { id: "s2", performerId: "p3", venueId: "v2", title: "[Comedian name] live", genre: "Stand-up", dayLabel: "Friday, October 9", day: "FRI", date: "9", longDate: "Friday, October 9", doors: "8:00 pm", time: "8:30 pm", entry: "$10 cover", tone: "ph-2", ticketUrl: "#" },
  { id: "s3", performerId: "p5", venueId: "v4", title: "[Duo name] acoustic night", genre: "Folk / trad", dayLabel: "Saturday, October 10", day: "SAT", date: "10", longDate: "Saturday, October 10", doors: "6:30 pm", time: "7:00 pm", entry: "Free entry", tone: "ph-3" },
  { id: "s4", performerId: "p4", venueId: "v2", title: "2000s night with [DJ name]", genre: "DJ · 2000s", dayLabel: "Saturday, October 10", day: "SAT", date: "10", longDate: "Saturday, October 10", doors: "9:30 pm", time: "10:00 pm", entry: "$5 cover", tone: "ph-4" },
];

export const bigEvents: BigEvent[] = [
  { id: "b1", category: "Concert", name: "[Headliner] world tour", venue: "[Arena name]", day: "FRI", date: "16", time: "8:00 pm", price: "From [$price]", tone: "ph-1", url: "#" },
  { id: "b2", category: "Comedy", name: "[Comedian] live", venue: "[Theatre name]", day: "SAT", date: "17", time: "7:30 pm", price: "From [$price]", tone: "ph-2", url: "#" },
  { id: "b3", category: "Theatre", name: "[Touring musical]", venue: "[Theatre name]", day: "TUE", date: "20", time: "7:00 pm", price: "From [$price]", tone: "ph-3", url: "#" },
  { id: "b4", category: "Sports", name: "[Home team] vs [Away team]", venue: "[Arena name]", day: "THU", date: "22", time: "7:00 pm", price: "From [$price]", tone: "ph-4", url: "#" },
  { id: "b5", category: "Concert", name: "[Band] with special guests", venue: "[Concert hall]", day: "SAT", date: "24", time: "8:30 pm", price: "From [$price]", tone: "ph-5", url: "#" },
  { id: "b6", category: "Family", name: "[Family show]", venue: "[Venue name]", day: "SUN", date: "25", time: "2:00 pm", price: "From [$price]", tone: "ph-1", url: "#" },
  { id: "b7", category: "Festival", name: "[Winter festival]", venue: "[Park name]", day: "FRI", date: "30", time: "All weekend", price: "From [$price]", tone: "ph-2", url: "#" },
  { id: "b8", category: "Concert", name: "[Singer] in concert", venue: "[Concert hall]", day: "SAT", date: "31", time: "8:00 pm", price: "From [$price]", tone: "ph-3", url: "#" },
];

export const eventRequests: EventRequest[] = [
  { id: "r1", type: "Quinceañera", date: "Sat, Mar 20", city: "Laval", guests: "75 – 150 guests", wants: "Band + DJ", budget: "$600 – $1,000", language: "Español", note: "[Planner note: live band for the first hour, then a DJ for dancing. Sound system needed.]", postedAgo: "2 h ago", replies: "[N]", tone: "ph-1" },
  { id: "r2", type: "Birthday", date: "Sat, Nov 7", city: "Brossard", guests: "25 – 75 guests", wants: "Band", budget: "$300 – $600", language: "Français", note: "[Planner note: 50th birthday, 80s and 90s rock.]", postedAgo: "5 h ago", replies: "[N]", tone: "ph-2" },
  { id: "r3", type: "Wedding", date: "Sat, May 15", city: "Montréal", guests: "150+ guests", wants: "Band", budget: "$1,000 – $2,000", language: "FR + EN", note: "[Planner note: cocktail hour and dinner set.]", postedAgo: "yesterday", replies: "[N]", tone: "ph-3" },
  { id: "r4", type: "House party", date: "Fri, Oct 30", city: "Rosemont", guests: "Under 25", wants: "Acoustic duo", budget: "Under $300", language: "English", note: "[Planner note: Halloween party in the backyard.]", postedAgo: "yesterday", replies: "[N]", tone: "ph-4" },
  { id: "r5", type: "Corporate", date: "Thu, Dec 10", city: "Griffintown", guests: "75 – 150 guests", wants: "Band or DJ", budget: "$1,000 – $2,000", language: "FR + EN", note: "[Planner note: office holiday party.]", postedAgo: "2 days ago", replies: "[N]", tone: "ph-5" },
  { id: "r6", type: "Birthday", date: "Sun, Nov 15", city: "Terrebonne", guests: "25 – 75 guests", wants: "Band", budget: "$300 – $600", language: "Français", note: "[Planner note: surprise party, classic rock.]", postedAgo: "3 days ago", replies: "[N]", tone: "ph-2" },
];

export const stories: Story[] = [
  { slug: "twenty-years-of-friday-nights", category: "Performer", city: "Montréal", title: "[Band name]: twenty years of Friday nights", dek: "[How a cover band became a neighbourhood institution.]", date: "Oct 2", read: "6 min read", photo: "[Band photo]", tone: "ph-1", video: true },
  { slug: "why-pub-books-live-music", category: "Venue owner", city: "Verdun", title: "Why [Pub name] books live music every week", dek: "[A pub owner on what live shows do for a room and a business.]", date: "Sep 25", read: "5 min read", photo: "[Pub interior]", tone: "ph-2", video: false },
  { slug: "magician-parties-and-bars", category: "Performer", city: "Laval", title: "The magician who works birthday parties and bars", dek: "[Close-up magic, quinceañeras and learning to read a crowd.]", date: "Sep 18", read: "4 min read", photo: "[Magician portrait]", tone: "ph-3", video: true },
  { slug: "planning-a-quinceanera", category: "Event planner", city: "Brossard", title: "Planning a quinceañera with live entertainment", dek: "[A family shares what they looked for and what made the night.]", date: "Sep 11", read: "7 min read", photo: "[Party photo]", tone: "ph-5", video: false },
  { slug: "a-night-with-the-sound-tech", category: "Behind the scenes", city: "Montréal", title: "A night with the sound tech", dek: "[What happens before the first song, from load-in to line check.]", date: "Sep 4", read: "5 min read", photo: "[Mixing desk]", tone: "ph-4", video: true },
  { slug: "stand-up-in-two-languages", category: "Performer", city: "Rosemont", title: "Stand-up in two languages", dek: "[A comedian on writing jokes that land in French and English.]", date: "Aug 28", read: "6 min read", photo: "[Comedian on stage]", tone: "ph-1", video: true },
];

export const news: NewsPost[] = [
  { id: "n1", category: "Platform updates", title: "Performers can now feature their best YouTube video", dek: "[What changed on profiles and how to set your featured video.]", date: "[Date]", tone: "ph-2" },
  { id: "n2", category: "Events", title: "Open-mic night at [Venue name], hosted by ShowIci", dek: "[Details of a community event for performers to meet venues.]", date: "[Date]", tone: "ph-3" },
  { id: "n3", category: "Local scene", title: "The busiest nights for live music this season", dek: "[A look at when venues book most, from ShowIci listings.]", date: "[Date]", tone: "ph-4" },
  { id: "n4", category: "New cities", title: "[Next city]: sign-ups open for venues and performers", dek: "[Announcement of the next city launch and how to join early.]", date: "[Date]", tone: "ph-5" },
  { id: "n5", category: "Press", title: "ShowIci in the news", dek: "[Coverage of ShowIci in local media, with links.]", date: "[Date]", tone: "ph-1" },
];

export const threads: Thread[] = [
  { id: "t1", name: "[Band name]", initials: "B", when: "10:24", last: "Gig proposal: Fri, Oct 23", tone: "ph-2" },
  { id: "t2", name: "[Comedian name]", initials: "S", when: "Yesterday", last: "Sounds great, see you Thursday!", tone: "ph-5" },
  { id: "t3", name: "[Duo name]", initials: "D", when: "Sat", last: "Here is our set list…", tone: "ph-4" },
  { id: "t4", name: "[DJ name]", initials: "J", when: "Oct 1", last: "Thanks for the great night!", tone: "ph-3" },
];
