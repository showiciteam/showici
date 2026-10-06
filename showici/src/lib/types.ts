export type Tone = "ph-1" | "ph-2" | "ph-3" | "ph-4" | "ph-5";

export interface Performer {
  id: string;
  name: string;
  initials: string;
  actType: string;
  genres: string[];
  repertoire: "Covers" | "Originals" | "Both";
  base: string;
  travelKm: number;
  distanceKm: number;
  eventTypes: string[];
  languages: string[];
  members: number;
  setLength: string;
  feeRange: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  available: boolean;
  bio: string;
  videos: { title: string; length: string; featured?: boolean; url?: string }[];
  tone: Tone;
  map: { x: string; y: string };
}

export interface Venue {
  id: string;
  name: string;
  type: string;
  area: string;
  city: string;
  distanceKm: number;
  capacity: string;
  books: string[];
  genres: string[];
  nights: string;
  leadTime: string;
  feeRange: string;
  equipment: string[];
  openToNewActs: boolean;
  rating: number;
  description: string;
  tone: Tone;
  map: { x: string; y: string };
}

export interface Show {
  id: string;
  performerId: string;
  venueId: string;
  title: string;
  genre: string;
  dayLabel: string;
  day: string;
  date: string;
  longDate: string;
  doors: string;
  time: string;
  entry: string;
  tone: Tone;
  ticketUrl?: string;
}

export interface BigEvent {
  id: string;
  category: string;
  name: string;
  venue: string;
  day: string;
  date: string;
  time: string;
  price: string;
  tone: Tone;
  url: string;
}

export interface EventRequest {
  id: string;
  type: string;
  date: string;
  city: string;
  guests: string;
  wants: string;
  budget: string;
  language: string;
  note: string;
  postedAgo: string;
  replies: string;
  tone: Tone;
  /** Profile id of the planner who posted it (live data only). */
  plannerId?: string;
}

export interface Story {
  slug: string;
  category: string;
  city: string;
  title: string;
  dek: string;
  date: string;
  read: string;
  photo: string;
  tone: Tone;
  video: boolean;
}

export interface NewsPost {
  id: string;
  category: string;
  title: string;
  dek: string;
  date: string;
  tone: Tone;
}

export interface Thread {
  id: string;
  name: string;
  initials: string;
  when: string;
  last: string;
  tone: Tone;
  /** Live data only: the other person's profile id and a short description (role, event). */
  otherId?: string;
  subtitle?: string;
}

export interface Message {
  id: string;
  fromMe: boolean;
  text: string;
  kind?: "text" | "proposal" | "notice";
}
