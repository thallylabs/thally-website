"use client";

import Link from "next/link";

import { ArrowRight, Leaf } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";

/**
 * A wide statement panel on the night-landscape art.
 *
 * The line used to sit in quotation marks with nobody attached to it, which
 * reads as a testimonial nobody said. It is Thally's own claim, so it is set
 * as a statement. The pill beside it was staged under a decorative cursor
 * pointing at nothing; it is a real link now, and the section has somewhere
 * to send the reader.
 */
export function QuoteCard() {
  return (
    <section className="bg-canvas px-2.5 pb-[120px] sm:px-5">
      <Reveal
        className="art-scrim border-canvas-card-stroke relative mx-auto w-full max-w-[1480px] overflow-hidden rounded-[50px] border px-6 py-20 sm:px-[160px] sm:py-[80px]"
        style={{
          backgroundImage: "url(/template/card-bg-2.webp)",
          backgroundSize: "cover",
          backgroundPosition: "50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative mx-auto max-w-[560px]">
          <p className="subtitle-display text-center">
            A feature ships, and your team should not have to hunt for every page that now says something wrong.{" "}
            <span className="linear-text">Thally does the detective work.</span>
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/features/track"
              className="group/pill text-canvas inline-flex items-center gap-2 rounded-full bg-white py-2.5 pr-4 pl-3.5 text-[13px] font-semibold tracking-wide"
            >
              <Leaf className="size-4" />
              Thally Track
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/pill:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
