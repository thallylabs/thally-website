"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

export const Migrate = () => {
  const reduced = useReducedMotion();

  return (
    <section id="migrate" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="relative mx-auto max-w-[1560px]">
        {/* Header area over the pinned scenic backdrop */}
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <SplitReveal as="h2" mode="words" className="heading-section text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Bring your existing docs to Thally.
            </SplitReveal>
          </div>
          <Reveal delay={0.2} distance={20}>
            <p className="text-lg leading-relaxed text-white/90 sm:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Use Thally Cloud to migrate a public docs site, or run the CLI against a GitHub repository. Either path creates editable MDX and a Thally project you control.
            </p>
          </Reveal>
        </div>

        {/* New high-resolution Migration Mock Visual animated with spring entrance and floating elevation */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[1440px]"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-black/40 p-2 sm:p-4 backdrop-blur-xl shadow-[0_32px_90px_rgba(0,0,0,0.85)]">
            <div
              className="relative overflow-hidden rounded-[22px]"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src="/images/migration-mock.png"
                alt="Migration workflow: Import from Mintlify, GitBook, Docusaurus, Starlight, VitePress, Nextra, Markdown via CLI and deploy to Vercel, Netlify, Cloudflare, Docker"
                width={1800}
                height={1000}
                priority
                className="h-auto w-full object-contain"
                sizes="(max-width: 1600px) 100vw, 1440px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
