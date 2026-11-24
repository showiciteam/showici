import { headers } from "next/headers";
import { LANG_HEADER, PATH_HEADER, tr, type Lang } from "./locale";

/** Language of the current request, set by the middleware from the URL (/fr/…) or, on private pages, the visitor's choice. */
export async function getLang(): Promise<Lang> {
  return (await headers()).get(LANG_HEADER) === "fr" ? "fr" : "en";
}

/** Path without the /fr prefix (e.g. "/venues/abc"). */
export async function getBarePath(): Promise<string> {
  return (await headers()).get(PATH_HEADER) ?? "/";
}

/** For server components: const t = await getT(); t("Shows", "Spectacles"). */
export async function getT() {
  return tr(await getLang());
}

/** Title and description for a page in the request's language: export const generateMetadata = meta(["Shows", "Spectacles"], [...]). */
export function meta(title: [string, string], description?: [string, string]) {
  return async () => {
    const t = await getT();
    return { title: t(...title), ...(description ? { description: t(...description) } : {}) };
  };
}
