"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLang } from "@/lib/i18n";

/**
 * Same as next/link, but internal links stay in the current language:
 * href="/shows" points to /shows in French and /en/shows in English.
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { href: localHref } = useLang();
  return <NextLink href={typeof href === "string" ? localHref(href) : href} {...rest} />;
}
