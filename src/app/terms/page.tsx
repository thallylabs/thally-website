import type { Metadata } from "next";

import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that govern your use of Thally Cloud and the MIT-licensed self-hosted platform.",
  alternates: {
    canonical: "/terms",
  },
};

export default function Page() {
  return <TermsContent />;
}
