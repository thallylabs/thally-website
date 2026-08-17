"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS } from "@/lib/site";

export const Dashboard = () => {
  return (
    <section id="operate" className="bg-canvas relative overflow-hidden pt-20 sm:pt-28 pb-0">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6">
        {/* Header (no eyebrow, matching requested headline and subhead) */}
        <div className="mx-auto max-w-4xl text-center">
          <SplitReveal as="h2" mode="words" className="heading-section text-white">
            Ship the code. Docs follow.
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80 sm:text-xl">
              See what is live, what changed, and what needs attention across every documentation site.
            </p>
          </Reveal>

          {/* Action CTAs using consistent site button styles */}
          <Reveal delay={0.25} distance={15} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={DESTINATIONS.signup}
              className="btn-sheen text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-lg font-medium"
            >
              Create your docs site
              <ArrowRight className="size-5" />
            </a>
            <Link
              href="/features/cloud-dashboard"
              className="btn-sheen inline-flex items-center justify-center gap-2 rounded-lg border border-[#606060] px-7 py-3.5 text-lg font-medium text-white transition-colors hover:border-white"
            >
              <span>Explore Thally Cloud</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        {/* Large, expansive Dashboard mock visual with Linear-style black gradient fade */}
        <Reveal delay={0.35} distance={30} className="relative mt-12 sm:mt-16">
          <div className="relative mx-auto w-full max-w-[1500px]">
            {/* Linear-style smooth gradient mask */}
            <div
              className="relative overflow-hidden"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src="/images/dashboard-operate-mock.png"
                alt="Thally Cloud Dashboard showing oba workspace, Agent readiness score, changes checked, publish activity, site at a glance, and recent activity"
                width={1800}
                height={1000}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1600px) 100vw, 1500px"
              />
            </div>
            {/* Soft gradient blend at bottom edge */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
