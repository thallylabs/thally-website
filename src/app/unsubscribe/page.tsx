import type { Metadata } from "next";

import EmailPreferences from "@/components/sections/email-preferences";

export const metadata: Metadata = {
  title: "Email preferences",
  description: "Choose which emails Thally sends you, or unsubscribe from all optional email.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/unsubscribe",
  },
};

export default function Page() {
  return <EmailPreferences />;
}
