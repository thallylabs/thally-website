import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Thally: Product Knowledge in Sync",
  description:
    "Why Thally exists: every product change creates communication work across docs, website content, agent skills, and other Git repositories. Thally finds the affected surfaces and prepares the updates.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
