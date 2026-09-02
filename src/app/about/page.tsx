import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Thally: The Founder Story",
  description:
    "Why Thally exists: after years keeping docs, websites, and help centers current by hand at Flutterwave, Netlify, and LI.FI, its founder built the product knowledge layer for software teams.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
