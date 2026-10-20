import { PricingView } from "./PricingView";

const TITLE = "Pricing · Prix · ShowIci";
const DESCRIPTION = "ShowIci is free during its launch in Greater Montréal: every feature, unlimited contacts and zero commission for venues, performers and event planners.";
const SHARE_TITLE = "ShowIci is free: no fees, no commission";
// Setting openGraph here replaces the site-wide one, so the share picture is listed again.
const IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "ShowIci · Book local talent for every stage" };
const SHARE_DESCRIPTION = "Venues, performers and event planners in Greater Montréal use every ShowIci feature for free during the launch. Unlimited contacts, zero commission.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // What Facebook, WhatsApp, LinkedIn, iMessage and X show when this page is shared.
  openGraph: {
    type: "website",
    siteName: "ShowIci",
    url: "/pricing",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    locale: "en_CA",
    alternateLocale: ["fr_CA"],
    images: [IMAGE],
  },
  twitter: { card: "summary_large_image", title: SHARE_TITLE, description: SHARE_DESCRIPTION, images: [IMAGE] },
};

export default function PricingPage() {
  return <PricingView />;
}
