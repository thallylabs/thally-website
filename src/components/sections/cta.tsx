"use client";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS } from "@/lib/site";

/**
 * Closing CTA section: subtle night sky background with olive bloom,
 * tightened vertical padding for seamless transition from the Dashboard visual.
 */
export function CTA() {
  return (
    <section className="relative z-[1] overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-24">
      {/* Background: blurred dusk sky under a night -> olive gradient */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-b-[52px]">
        <img
          src="/template/cta-bg.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-[5px]"
        />
        <div
          className="absolute inset-0 mix-blend-hard-light"
          style={{ backgroundImage: "linear-gradient(#000104 40%, rgba(115,121,56,0.55))" }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1260px] px-5">
        <div className="mx-auto max-w-[800px] text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            Ready to keep your docs in sync?
          </SplitReveal>
          <Reveal delay={0.2} distance={24}>
            <p className="mt-4 text-lg text-white/85">
              Start for free with MIT-licensed open source, or let Thally Cloud handle hosting, AI answers, and
              automated updates.
            </p>
          </Reveal>
          <Reveal delay={0.35} distance={16} className="mt-8">
            <a
              href={DESTINATIONS.signup}
              className="btn-sheen text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-lg font-medium"
            >
              Create your docs site
              <ArrowRight className="size-5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
