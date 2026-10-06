import { AppHeader } from "@/components/Header";
import { getThreads } from "@/lib/data";
import { Inbox } from "./Inbox";

export const metadata = { title: "Messages · ShowIci" };

export default async function MessagesPage() {
  const threads = await getThreads();
  return (
    <>
      <AppHeader role="venue" name="[Your pub]" />
      <main className="wrap pb-12 pt-6">
        <Inbox threads={threads} />
      </main>
    </>
  );
}
