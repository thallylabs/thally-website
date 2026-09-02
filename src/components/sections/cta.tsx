"use client";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS } from "@/lib/site";

/**
 * Template cta-section: night sky with an olive bloom, centered heading,
 * white CTA, and a large product frame that overhangs into the footer.
 */
export function CTA() {
  return (
    <section className="relative z-[1] overflow-hidden pt-[120px]">
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
        <div className="mx-auto mb-20 max-w-[800px] text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-white">
            Ship the code. Docs follow.
          </SplitReveal>
          <Reveal delay={0.2} distance={24}>
            <p className="mt-4 text-lg text-white/85">
              Keep shipping without letting your docs fall behind. Thally drafts the updates; your team approves what
              ships.
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

        {/* Product frame overhanging into the footer */}
        <Reveal delay={0.2} className="border-canvas-card-stroke -mb-[200px] rounded-[40px] border p-3">
          <div className="overflow-hidden rounded-[28px] bg-black/40 backdrop-blur-xl">
            <img
              src="/images/cloud-dashboard-dark-2000.webp"
              alt="Thally Cloud dashboard home showing readiness, activity, and site status"
              className="w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
