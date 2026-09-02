import type { Metadata } from "next";

import About from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About Thally: Why It Exists",
  description:
    "Thally was built by a developer experience lead who spent years hunting for every page a product change made wrong. It now keeps docs, websites, and support content in sync.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
