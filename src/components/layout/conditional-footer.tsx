"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/footer";

const AUTH_PATHS = ["/login", "/signup"];

export function ConditionalFooter() {
  const pathname = usePathname();

  if (AUTH_PATHS.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
