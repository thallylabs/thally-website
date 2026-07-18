import type { Metadata } from "next";

import { ExternalRedirect } from "@/components/external-redirect";
import { DESTINATIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Thally Cloud account.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Login() {
  return <ExternalRedirect destination={DESTINATIONS.login} label="Thally Cloud" />;
}
