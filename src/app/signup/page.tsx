import type { Metadata } from "next";

import { ExternalRedirect } from "@/components/external-redirect";
import { DESTINATIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your Thally Cloud account and start a 14-day trial.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Signup() {
  return <ExternalRedirect destination={DESTINATIONS.signup} label="Thally Cloud" />;
}
