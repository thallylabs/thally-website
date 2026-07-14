import type { Metadata } from "next";

import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Thally handles personal data across thally.io and Thally Cloud.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function Page() {
  return <PrivacyContent />;
}
