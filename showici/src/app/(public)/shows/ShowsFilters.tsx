"use client";

import { useState } from "react";
import { Chip } from "@/components/ui";

export function ShowsFilters() {
  const [when, setWhen] = useState("This weekend");
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2.5">
      {["Tonight", "This weekend", "Next 7 days", "Pick a date"].map((w) => (
        <Chip key={w} on={when === w} onClick={() => setWhen(w)}>{w}</Chip>
      ))}
      <span className="h-7 w-px bg-line" />
      <label className="flex items-center gap-2 text-sm font-bold">Type
        <select className="input w-auto py-2.5"><option>All</option><option>Live music</option><option>Comedy</option><option>DJ nights</option><option>Magic</option></select>
      </label>
      <label className="flex items-center gap-2 text-sm font-bold">Genre
        <select className="input w-auto py-2.5"><option>All genres</option><option>Rock</option><option>Jazz</option><option>Blues</option><option>Folk / trad</option></select>
      </label>
      <label className="flex items-center gap-2 text-sm font-bold">Within
        <select className="input w-auto py-2.5" defaultValue="50"><option value="10">10 km</option><option value="25">25 km</option><option value="50">50 km</option></select>
      </label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-[18px] w-[18px] accent-navy" />Free entry only</label>
    </div>
  );
}
