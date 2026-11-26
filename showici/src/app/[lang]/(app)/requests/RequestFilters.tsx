"use client";

import { useTr } from "@/lib/i18n";
import { useState } from "react";
import { Chip } from "@/components/ui";

export function RequestFilters() {
  const tr = useTr();
  const [cat, setCat] = useState("All events");
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2.5">
      {["All events", "Quinceañeras", "Birthdays", "Weddings", "Corporate"].map((c) => <Chip key={c} on={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
      <span className="flex-1" />
      <label className="flex items-center gap-2 text-sm font-bold">Sort
        <select className="input w-auto py-2.5"><option value="Newest first">{tr("Newest first")}</option><option value="Soonest date">{tr("Soonest date")}</option><option value="Closest">{tr("Closest")}</option><option value="Highest budget">{tr("Highest budget")}</option></select>
      </label>
    </div>
  );
}
