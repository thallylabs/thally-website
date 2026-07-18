import Link from "next/link";

import { ArrowLeft } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-28 text-center lg:min-h-[80vh] lg:py-32">
      <div className="relative z-10 max-w-2xl">
        <h1 className="font-display from-foreground to-foreground/70 relative mb-6 bg-linear-to-br bg-clip-text py-2 text-5xl font-bold text-transparent sm:text-6xl lg:text-7xl">
          Page not found
        </h1>

        <p className="text-muted-foreground mb-10 text-xl">
          We couldn&apos;t find this page. It may have moved, or the URL may be incorrect.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="group min-w-[200px] gap-2">
            <Link href="/">
              <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[200px]">
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
