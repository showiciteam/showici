"use client";

import { useState } from "react";
import { Chip } from "@/components/ui";
import { useLang } from "@/lib/i18n";

export function ShowsFilters() {
  const { tr } = useLang();
  const [when, setWhen] = useState("This weekend");
  const whenFr: Record<string, string> = { Tonight: "Ce soir", "This weekend": "Ce week-end", "Next 7 days": "7 prochains jours", "Pick a date": "Choisir une date" };
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2.5">
      {["Tonight", "This weekend", "Next 7 days", "Pick a date"].map((w) => (
        <Chip key={w} on={when === w} onClick={() => setWhen(w)}>{tr(w, whenFr[w])}</Chip>
      ))}
      <span className="h-7 w-px bg-line" />
      <label className="flex items-center gap-2 text-sm font-bold">{tr("Type", "Type")}
        <select className="input w-auto py-2.5"><option>{tr("All", "Tous")}</option><option>{tr("Live music", "Musique live")}</option><option>{tr("Comedy", "Humour")}</option><option>{tr("DJ nights", "Soirées DJ")}</option><option>{tr("Magic", "Magie")}</option></select>
      </label>
      <label className="flex items-center gap-2 text-sm font-bold">{tr("Genre", "Style")}
        <select className="input w-auto py-2.5"><option>{tr("All genres", "Tous les styles")}</option><option>Rock</option><option>Jazz</option><option>Blues</option><option>Folk / trad</option></select>
      </label>
      <label className="flex items-center gap-2 text-sm font-bold">{tr("Within", "Rayon")}
        <select className="input w-auto py-2.5" defaultValue="50"><option value="10">10 km</option><option value="25">25 km</option><option value="50">50 km</option></select>
      </label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-[18px] w-[18px] accent-navy" />{tr("Free entry only", "Entrée libre seulement")}</label>
    </div>
  );
}
