import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Thally: Documentation That Keeps Up",
  description:
    "Meet the team behind Thally, the documentation platform for machine-readable publishing and review-gated maintenance.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
