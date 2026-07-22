import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Thally: One Source for Every Reader",
  description:
    "Learn how Thally helps you publish one documentation source for people and AI tools while keeping the source and hosting choices under your control.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
