import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Learn why Thally publishes documentation for people and AI agents from one source, and how its open-source core keeps teams in control.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
