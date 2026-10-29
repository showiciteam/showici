import { redirect } from "next/navigation";

// The pricing page is off for now: links to /pricing go to the home page instead (a temporary redirect).
// The page itself is kept in PricingView.tsx; to bring it back, render <PricingView /> here again
// and re-add the footer link (components/Footer.tsx) and the sitemap entry (app/sitemap.ts).
export default function PricingPage() {
  redirect("/");
}
