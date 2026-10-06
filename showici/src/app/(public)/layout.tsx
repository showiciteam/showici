import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSessionUser, homeFor } from "@/lib/session";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  return (
    <>
      <Header user={user ? { name: user.name, home: homeFor[user.role] } : null} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
