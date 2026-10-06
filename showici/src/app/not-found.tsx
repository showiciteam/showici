import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ivory p-8 text-center">
      <h1 className="h-display text-5xl">Nothing on stage here.</h1>
      <p className="text-slate">This page doesn&apos;t exist, or the show has ended.</p>
      <Link href="/" className="rounded-[10px] bg-navy px-5 py-3 font-bold text-white no-underline hover:text-white">Back to ShowIci</Link>
    </div>
  );
}
