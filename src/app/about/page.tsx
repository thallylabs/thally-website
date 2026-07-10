import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet the team behind Thally, the AI-native documentation platform serving machines and humans from one source.",
};

export default function AboutPage() {
  return <About />;
}
