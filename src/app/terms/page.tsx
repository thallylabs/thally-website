import type { Metadata } from "next";

import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that govern Thally Cloud and other hosted Thally services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function Page() {
  return <TermsContent />;
}
