"use client";

import { useEffect, useId, useRef, useState } from "react";

/** What the form gets back when someone picks a suggestion. */
export type PickedPlace = { street: string; city: string; postal: string; province: string; lat: number; lng: number; label: string };

type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: { name?: string; housenumber?: string; street?: string; city?: string; district?: string; locality?: string; county?: string; postcode?: string; state?: string; countrycode?: string; type?: string };
};

const PROVINCES: Record<string, string> = {
  Quebec: "QC", Québec: "QC", Ontario: "ON", "British Columbia": "BC", Alberta: "AB", Manitoba: "MB", Saskatchewan: "SK",
  "Nova Scotia": "NS", "New Brunswick": "NB", "Newfoundland and Labrador": "NL", "Prince Edward Island": "PE",
  Yukon: "YT", "Northwest Territories": "NT", Nunavut: "NU",
  "Colombie-Britannique": "BC", "Nouvelle-Écosse": "NS", "Nouveau-Brunswick": "NB", "Terre-Neuve-et-Labrador": "NL",
  "Île-du-Prince-Édouard": "PE", "Territoires du Nord-Ouest": "NT",
};

function toPlace(f: PhotonFeature): PickedPlace {
  const p = f.properties;
  const [lng, lat] = f.geometry.coordinates;
  const road = p.street ?? (p.type === "street" ? p.name : undefined);
  const street = road ? [p.housenumber, road].filter(Boolean).join(" ") : "";
  const city = p.city ?? p.locality ?? p.district ?? (p.type === "city" || p.type === "town" || p.type === "village" ? p.name : undefined) ?? p.county ?? "";
  const province = (p.state && PROVINCES[p.state]) || p.state || "";
  const postal = (p.postcode ?? "").toUpperCase();
  const label = [street || p.name, city, province, postal].filter(Boolean).filter((x, i, a) => a.indexOf(x) === i).join(", ");
  return { street, city, postal, province, lat, lng, label };
}

/**
 * Text input with Canadian address suggestions (free OpenStreetMap search via Photon).
 * mode "address" suggests street addresses; mode "city" suggests cities and towns.
 * Typing freely still works; picking a suggestion also gives exact coordinates.
 */
export function AddressAutocomplete({ value, onChange, onPick, mode = "address", placeholder, required, className = "input" }: {
  value: string;
  onChange: (v: string) => void;
  onPick: (p: PickedPlace) => void;
  mode?: "address" | "city";
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  const [items, setItems] = useState<PickedPlace[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const typed = useRef(false);
  const listId = useId();

  useEffect(() => {
    const q = value.trim();
    if (!typed.current || q.length < 3) {
      setItems([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const layers = mode === "city" ? "&layer=city&layer=district&layer=locality" : "&layer=house&layer=street";
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=8&lang=fr${layers}&bbox=-141.1,41.6,-52.5,83.2&lat=45.5019&lon=-73.5674`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) return;
        const data = (await res.json()) as { features?: PhotonFeature[] };
        const seen = new Set<string>();
        const list = (data.features ?? [])
          .filter((f) => f.properties.countrycode === "CA")
          .map(toPlace)
          .filter((p) => p.label && !seen.has(p.label) && seen.add(p.label))
          .slice(0, 6);
        setItems(list);
        setActive(-1);
        setOpen(list.length > 0);
      } catch {
        // offline or aborted: the field still works as plain text
      }
    }, 300);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [value, mode]);

  const pick = (p: PickedPlace) => {
    typed.current = false;
    setOpen(false);
    setItems([]);
    onPick(p);
  };

  return (
    <span className="relative block">
      <input
        value={value}
        required={required}
        placeholder={placeholder}
        className={`${className} w-full`}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        onChange={(e) => {
          typed.current = true;
          onChange(e.target.value);
        }}
        onFocus={() => items.length && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (!open || !items.length) return;
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % items.length); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
          else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(items[active]); }
          else if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && (
        <ul id={listId} role="listbox" className="absolute left-0 right-0 top-full z-30 mt-1 max-h-72 overflow-auto rounded-xl border border-line-strong bg-white py-1 text-[15px] font-normal shadow-lg">
          {items.map((p, i) => (
            <li
              key={p.label}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); pick(p); }}
              onMouseEnter={() => setActive(i)}
              className={`cursor-pointer px-3.5 py-2 text-ink-2 ${i === active ? "bg-parchment" : ""}`}
            >
              📍 {p.label}
            </li>
          ))}
          <li className="px-3.5 pb-1 pt-1.5 text-[11px] text-muted">Suggestions © OpenStreetMap contributors</li>
        </ul>
      )}
    </span>
  );
}
