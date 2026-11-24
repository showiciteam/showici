"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLang } from "@/lib/i18n";

/**
 * next/link that keeps the visitor in their language: on French pages, "/venues" becomes "/fr/venues".
 * Import it as `Link` in place of next/link.
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const { href: local } = useLang();
  return <NextLink href={typeof href === "string" ? local(href) : href} {...rest} />;
}
