"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function AvailabilityToggle() {
  const [on, setOn] = useState(true);
  return (
    <section className="card flex flex-col gap-3.5 p-[22px]">
      <div className="flex items-center justify-between gap-3">
        <span className="flex flex-col gap-0.5"><strong>Available for gigs</strong><span className="hint">{on ? "Shown in searches" : "Hidden from searches"}</span></span>
        <button type="button" role="switch" aria-checked={on} aria-label="Available for gigs" onClick={() => setOn(!on)} className={`relative h-[30px] w-[52px] flex-none rounded-full ${on ? "bg-navy" : "bg-line-strong"}`}>
          <span className={`absolute top-[3px] h-6 w-6 rounded-full bg-white transition-all ${on ? "right-[3px]" : "left-[3px]"}`} />
        </button>
      </div>
      <Button variant="secondary">Block out dates</Button>
    </section>
  );
}
