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
      <Reveal className="art-scrim border-canvas-card-stroke relative isolate mx-auto w-full max-w-[1480px] overflow-hidden rounded-[50px] border px-6 py-20 sm:px-[160px] sm:py-[80px]">
        {/* The art is an element rather than a CSS background so it can be
            deferred: this panel is far below the fold, and as a background it
            was fetched at full priority while the hero was still painting.
            Positioned inline because `.art-scrim > *` stacks every child above
            the scrim, which is right for the copy and wrong for the art. */}
        <img
          src="/template/card-bg-2.webp"
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          style={{ position: "absolute", inset: 0, zIndex: -1 }}
          className="h-full w-full object-cover object-center"
        />
        <div className="relative mx-auto max-w-[560px]">
          <p className="subtitle-display text-center">
            Thally turns shipped code into shipped docs.{" "}
            <span className="linear-text">Every change lands exactly where it belongs.</span>
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
