"use client";

import { useState } from "react";
import { Chip } from "@/components/ui";

export function EventFilters() {
  const [cat, setCat] = useState("All");
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {["All", "Concerts", "Festivals", "Comedy", "Theatre", "Family", "Sports"].map((c) => (
        <Chip key={c} on={cat === c} onClick={() => setCat(c)}>{c}</Chip>
      ))}
      <span className="flex-1" />
      <label className="flex items-center gap-2 text-sm font-bold">When
        <select className="input w-auto py-2.5"><option>This month</option><option>Next 3 months</option><option>This weekend</option></select>
      </label>
      <label className="flex items-center gap-2 text-sm font-bold">Within
        <select className="input w-auto py-2.5" defaultValue="50"><option value="25">25 km</option><option value="50">50 km</option><option value="100">100 km</option></select>
      </label>
    </div>
  );
}
