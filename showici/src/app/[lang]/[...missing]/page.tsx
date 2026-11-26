import { notFound } from "next/navigation";

/** Any address that matches no page shows the ShowIci "not found" page in the right language. */
export default function Missing() {
  notFound();
}
