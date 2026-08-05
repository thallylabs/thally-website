"use client";

import { Leaf } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

/**
 * Template quote interlude: a wide rounded card over the night
 * illustration with a large centered statement and a floating badge.
 */
export function QuoteCard() {
  return (
    <section className="bg-canvas px-2.5 pb-4 sm:px-5">
      <Reveal className="relative mx-auto w-full max-w-[1480px] overflow-hidden rounded-[28px]">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-[position:50%_78%]"
          style={{ backgroundImage: "url(/template/background.webp)" }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/60" />
        <div className="relative flex min-h-[380px] flex-col items-center justify-center px-6 py-20 text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section max-w-3xl text-white">
            Thally turns shipped code into shipped docs.
          </SplitReveal>
          <Reveal delay={0.3} distance={20}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
              Every change lands exactly where it belongs, with the evidence to prove it.
            </p>
          </Reveal>
          <Reveal
            delay={0.5}
            distance={16}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2"
          >
            <Leaf className="text-canvas size-4" />
            <span className="text-canvas text-xs font-semibold tracking-widest uppercase">
              Product change intelligence
            </span>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
