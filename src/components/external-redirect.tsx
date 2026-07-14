"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export function ExternalRedirect({ destination, label }: { destination: string; label: string }) {
  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <section className="flex flex-1 items-center justify-center px-4 py-20 text-center">
      <div>
        <p className="text-muted-foreground mb-5">Taking you to {label}…</p>
        <Button asChild>
          <a href={destination}>Continue to {label}</a>
        </Button>
      </div>
    </section>
  );
}
