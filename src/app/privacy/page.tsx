import type { Metadata } from "next";

import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Thally collects, uses, and protects your data, on Cloud and when you self-host.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function Page() {
  return <PrivacyContent />;
}
