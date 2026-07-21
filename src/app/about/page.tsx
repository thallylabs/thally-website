import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Thally: AI-Native Documentation",
  description:
    "Meet the team behind Thally, the AI-native documentation platform serving AI agents and humans from one source.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
