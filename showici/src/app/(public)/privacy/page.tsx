import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/lib/legal";

export const metadata = { title: "Privacy policy · Politique de confidentialité · ShowIci", description: "What personal information ShowIci collects, why, and how to exercise your rights under Québec's Law 25." };

export default function Privacy() {
  return <LegalPage doc={privacy} other={{ href: "/terms", en: "Terms of use", fr: "Conditions d'utilisation" }} />;
}
