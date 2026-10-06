import { Button } from "@/components/ui";

export const metadata = { title: "Pricing · ShowIci" };

const plans = [
  { name: "Free", price: "$0", sub: "For everyone getting started", badge: null, border: "border-line", features: ["Full profile with photos and videos", "Post shows and event requests", "Basic search: area, radius, type of act", "2 new contacts per day"], cta: "Start free", variant: "secondary" as const },
  { name: "Performer Pro", price: "[$PRICE]", sub: "Get booked more often", badge: "For performers", border: "border-2 border-navy", features: ["Everything in Free", "Unlimited contacts", "Every search filter", "See all event requests first", "Profile stats"], cta: "Coming after launch", variant: "primary" as const },
  { name: "Venue Pro", price: "[$PRICE]", sub: "Fill your calendar faster", badge: "For venues", border: "border-2 border-brass", features: ["Everything in Free", "Unlimited contacts", "Every search filter, including availability by date", "Featured shows on the public listings"], cta: "Coming after launch", variant: "secondary" as const },
];

const faqs = [
  ["Does ShowIci take a commission on bookings?", "No. You agree on the fee and payment directly. ShowIci only connects you."],
  ["What counts as a contact?", "Starting a new conversation with someone. Replying in an existing conversation is always free."],
  ["I'm planning a quinceañera. Do I pay?", "No. Posting event requests and messaging performers is free for event planners."],
];

export default function PricingPage() {
  return (
    <div className="wrap pb-[72px] pt-12">
      <div className="mx-auto mb-9 flex max-w-[720px] flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-brass-tint px-3.5 py-1.5 text-sm font-bold text-navy-deep">Everything is free during our launch in Greater Montréal</span>
        <h1 className="h-display text-[48px]">Simple plans. Zero commission.</h1>
        <p className="text-lg text-slate">You keep 100% of what you agree on. We never take a cut of a booking. Event planners always use ShowIci for free.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
        {plans.map((p) => (
          <div key={p.name} className={`relative flex flex-col gap-4 rounded-[20px] bg-white p-7 ${p.border}`}>
            {p.badge && <span className="absolute -top-3.5 left-6 rounded-full bg-navy px-3 py-1 text-[13px] font-bold text-white">{p.badge}</span>}
            <span className="h-display text-2xl">{p.name}</span>
            <span><span className="h-display text-[44px]">{p.price}</span>{p.price !== "$0" && <span className="hint text-[15px]"> / month</span>}</span>
            <span className="hint text-[15px]">{p.sub}</span>
            {p.features.map((f) => <div key={f} className="text-ink-2">✓ {f}</div>)}
            <Button href="/signup" variant={p.variant} className="mt-auto">{p.cta}</Button>
          </div>
        ))}
      </div>
      <section className="mx-auto mt-14 flex max-w-[820px] flex-col gap-3">
        <h2 className="h-display mb-1.5 text-[30px]">Questions</h2>
        {faqs.map(([q, a], i) => (
          <details key={q} open={i === 0} className="rounded-[14px] border border-line bg-white px-5 py-[18px]">
            <summary className="cursor-pointer font-bold">{q}</summary>
            <p className="mt-2.5 text-slate">{a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
