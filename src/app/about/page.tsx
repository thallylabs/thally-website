import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Thally: Product Knowledge in Sync",
  description:
    "Why Thally exists: every product change creates communication work. Thally finds that work and keeps customer-facing knowledge synchronized, starting with documentation.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
