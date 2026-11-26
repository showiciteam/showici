"use client";

import { useRouter as useNextRouter } from "next/navigation";
import { useMemo } from "react";
import { useLang } from "./i18n";

/** next/navigation's router, but push/replace keep the visitor in their language. */
export function useRouter() {
  const router = useNextRouter();
  const { href } = useLang();
  return useMemo(
    () => ({ ...router, push: (path: string) => router.push(href(path)), replace: (path: string) => router.replace(href(path)) }),
    [router, href],
  );
}
