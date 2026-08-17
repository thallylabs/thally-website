"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

export const Migrate = () => {
  return (
    <section id="migrate" className="bg-canvas px-2.5 py-12 sm:px-5 sm:py-20 lg:py-28">
      {/* Scenic Container */}
      <div className="border-canvas-card-stroke relative mx-auto w-full max-w-[1860px] overflow-hidden rounded-[35px] border p-6 sm:p-10 lg:p-16 shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
        {/* Landscape background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-[position:50%_60%]"
          style={{ backgroundImage: "url(/template/ready-made-bg.webp)" }}
        />
        {/* Gradient scrims for high contrast and seamless integration */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/80" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1560px]">
          {/* Header area */}
          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <SplitReveal as="h2" mode="words" className="heading-section text-white">
                Bring your existing docs to Thally.
              </SplitReveal>
            </div>
            <Reveal delay={0.2} distance={20}>
              <p className="text-lg leading-relaxed text-white/85 sm:text-xl">
                Use Thally Cloud to migrate a public docs site, or run the CLI against a GitHub repository. Either path creates editable MDX and a Thally project you control.
              </p>
            </Reveal>
          </div>

          {/* Large expansive Migration Mock Visual with smooth bottom fade */}
          <Reveal delay={0.3} distance={30} className="relative mx-auto w-full max-w-[1400px]">
            <div
              className="relative overflow-hidden drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)]"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
              }}
            >
              <Image
                src="/images/migration-mock.png"
                alt="Migration workflow: Import from Mintlify, GitBook, Docusaurus, Starlight, VitePress, Nextra, Markdown via CLI and deploy to Vercel, Netlify, Cloudflare, Docker"
                width={1800}
                height={1000}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1600px) 100vw, 1400px"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
