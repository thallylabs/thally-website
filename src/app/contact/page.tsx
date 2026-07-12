import type { Metadata } from "next";

import Contact from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Thally team about migration, self-hosting, Enterprise SSO, or anything else. Sales and support reply within a business day.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <Contact />;
}
