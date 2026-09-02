"use client";

import { usePathname } from "next/navigation";

import { isChromelessPath } from "@/components/layout/chromeless-paths";
import Navbar from "@/components/layout/navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();

  if (isChromelessPath(pathname)) {
    return null;
  }

  return <Navbar />;
}
