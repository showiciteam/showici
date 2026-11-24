import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/lib/legal";
import { meta } from "@/lib/lang";

export const generateMetadata = meta(
  ["Terms of use · ShowIci", "Conditions d'utilisation · ShowIci"],
  ["The rules for using ShowIci, the Québec platform connecting venues, event planners and performers.", "Les règles d'utilisation de ShowIci, la plateforme québécoise qui relie salles, organisateurs d'événements et artistes."],
);

export default function Terms() {
  return <LegalPage doc={terms} other={{ href: "/privacy", en: "Privacy policy", fr: "Politique de confidentialité" }} />;
}
