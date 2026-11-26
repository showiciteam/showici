import { getAppSettings } from "@/lib/dashboard";
import { ContactsCap, LimitsSwitch } from "../AdminActions";

export const metadata = { title: "Settings · Admin · ShowIci" };

export default async function AdminSettings() {
  const settings = await getAppSettings();
  return (
    <>
      <h1 className="h-display text-[34px]">Settings and plan limits</h1>
      <p className="-mt-3 text-slate">During the free launch, limits stay off and everyone can contact as many people as they like.</p>
      <LimitsSwitch initial={settings.limitsOn} />
      <ContactsCap initial={settings.dailyContacts} />
    </>
  );
}
