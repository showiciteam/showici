"use client";

import { Chip } from "./ui";

/** Multi-select chips bound to a string array. */
export function ChipGroup({ legend, hint, options, value, onChange, single }: {
  legend: string;
  hint?: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  single?: boolean;
}) {
  const toggle = (o: string) =>
    single ? onChange([o]) : onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  return (
    <fieldset>
      <legend className="mb-2.5 text-sm font-bold">{legend} {hint && <span className="hint">{hint}</span>}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => <Chip key={o} on={value.includes(o)} onClick={() => toggle(o)}>{o}</Chip>)}
      </div>
    </fieldset>
  );
}

export function FormCard({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="card flex scroll-mt-6 flex-col gap-[18px] p-7">
      <h2 className="h-display text-[26px]">{title}</h2>
      {children}
    </section>
  );
}

export function Notice({ kind, children }: { kind: "ok" | "error" | "info"; children: React.ReactNode }) {
  const cls = kind === "ok" ? "bg-success text-success-ink" : kind === "error" ? "bg-[#FBE5E2] text-[#8A1F17]" : "bg-brass-tint text-navy";
  return <div role="status" className={`rounded-xl px-4 py-3 text-sm font-medium ${cls}`}>{children}</div>;
}

export function Dropzone({ files, onFiles, hint }: { files: File[]; onFiles: (f: File[]) => void; hint: string }) {
  return (
    <div className="flex flex-col gap-3">
      <label
        className="flex cursor-pointer flex-col items-center gap-2.5 rounded-2xl border-2 border-dashed border-line-strong bg-ivory p-8 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles([...files, ...Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"))].slice(0, 12));
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8A6417" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 16V4" /><path d="M7 9l5-5 5 5" /><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
        <span className="text-[17px] font-bold">Drag photos here, or <span className="text-brass-dark underline">browse your files</span></span>
        <span className="hint">{hint}</span>
        <input
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="sr-only"
          onChange={(e) => onFiles([...files, ...Array.from(e.target.files ?? [])].slice(0, 12))}
        />
      </label>
      {files.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
          {files.map((f, i) => (
            <div key={f.name + i} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ph-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
              {i === 0 && <span className="absolute left-2 top-2 rounded-md bg-navy px-2 py-1 text-[11px] font-bold text-white">COVER</span>}
              <button type="button" aria-label={`Remove ${f.name}`} onClick={() => onFiles(files.filter((_, j) => j !== i))} className="absolute right-1.5 top-1.5 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-navy">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
