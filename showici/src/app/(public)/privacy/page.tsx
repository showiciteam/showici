import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/lib/legal";
import { meta } from "@/lib/lang";

export const generateMetadata = meta(
  ["Privacy policy · ShowIci", "Politique de confidentialité · ShowIci"],
  ["What personal information ShowIci collects, why, and how to exercise your rights under Québec's Law 25.", "Les renseignements personnels que ShowIci recueille, pourquoi, et comment exercer vos droits selon la Loi 25."],
);

export default function Privacy() {
  return <LegalPage doc={privacy} other={{ href: "/terms", en: "Terms of use", fr: "Conditions d'utilisation" }} />;
}
