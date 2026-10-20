import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/lib/legal";

export const metadata = { title: "Terms of use · Conditions d'utilisation · ShowIci", description: "The rules for using ShowIci, the Montréal platform connecting venues, event planners and performers." };

export default function Terms() {
  return <LegalPage doc={terms} other={{ href: "/privacy", en: "Privacy policy", fr: "Politique de confidentialité" }} />;
}
