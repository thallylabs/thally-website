import type { Metadata } from "next";

import Contact from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact Thally Sales and Support",
  description:
    "Tell the Thally team what you need help with, from migration and self-hosting to Enterprise SSO. We usually reply within one business day.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <Contact />;
}
