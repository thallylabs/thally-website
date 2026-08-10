"use client";

import { Leaf } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";

/**
 * Template .feature-quote-block: a wide rounded-[50px] card on the
 * night-landscape art with a large gradient quote and the floating
 * cursor + pill particle at its edge.
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
          <p className="subtitle-display linear-text text-center">
            &ldquo;Thally turns shipped code into shipped docs. Every change lands exactly where it belongs&rdquo;
          </p>

          {/* Floating cursor + pill, template .feature-decorative-particle */}
          <div aria-hidden className="absolute -right-6 -bottom-14 select-none sm:-right-28">
            <svg width="25" height="27" viewBox="0 0 25 27" fill="none" className="ml-1">
              <path
                d="M1.3 3.5C1.1 2 2.6 0.85 4 1.48L4.1 1.54L23.1 12C24.7 12.87 24.3 15.22 22.5 15.55L12.9 17.36L8.1 25.11C7.2 26.62 4.9 26.16 4.6 24.4L1.3 3.5Z"
                fill="#0E121B"
                stroke="white"
                strokeWidth="2.6"
              />
            </svg>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2">
              <Leaf className="text-canvas size-3.5" />
              <span className="text-canvas text-[11px] font-bold tracking-wider uppercase">Thally Track</span>
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
