"use client";

import { useState } from "react";
import { Chip } from "@/components/ui";

export function RequestFilters() {
  const [cat, setCat] = useState("All events");
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2.5">
      {["All events", "Quinceañeras", "Birthdays", "Weddings", "Corporate"].map((c) => <Chip key={c} on={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
      <span className="flex-1" />
      <label className="flex items-center gap-2 text-sm font-bold">Sort
        <select className="input w-auto py-2.5"><option>Newest first</option><option>Soonest date</option><option>Closest</option><option>Highest budget</option></select>
      </label>
    </div>
  );
}
