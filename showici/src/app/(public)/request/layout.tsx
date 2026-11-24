import { meta } from "@/lib/lang";

export const generateMetadata = meta(
  ["Find entertainment for your event · ShowIci", "Trouvez des artistes pour votre événement · ShowIci"],
  ["Post your wedding, birthday, quinceañera or party once and get messages from local bands, DJs, comedians and magicians.", "Publiez votre mariage, anniversaire, quinceañera ou fête une seule fois et recevez des messages de groupes, DJ, humoristes et magiciens d'ici."],
);

export default function RequestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
