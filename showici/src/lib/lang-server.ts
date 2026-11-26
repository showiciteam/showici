import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isLang, localize, DEFAULT_LANG, LANG_HEADER, type Lang } from "./lang";
import { translator } from "./tr";

export async function requestLang(): Promise<Lang> {
  const value = (await headers()).get(LANG_HEADER) ?? undefined;
  return isLang(value) ? value : DEFAULT_LANG;
}

/** redirect() that keeps the visitor in their language. */
export async function localRedirect(path: string): Promise<never> {
  redirect(localize(path, await requestLang()));
}

/** tr("English text") for server components on the signed-in screens. See lib/tr.ts. */
export async function serverTr() {
  return translator(await requestLang());
}
