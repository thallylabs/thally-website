"use client";

import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";

/**
 * Founder statement on the night-landscape art.
 *
 * Pre-launch, the most credible proof on the page is the person who lived
 * the problem at companies the reader has heard of. The panel used to carry
 * an unattributed slogan; it now carries a first-person line with a name on
 * it and sends the reader to the full story.
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
        <div className="relative mx-auto max-w-[760px]">
          <blockquote>
            <p className="subtitle-display text-center text-white">
              I spent most of my career in developer experience, and at every company the job was the same: a feature
              shipped, and I went hunting for every page that now said something wrong.{" "}
              <span className="linear-text">Thally is the tool I wished I had.</span>
            </p>

            <footer className="mt-8 text-center text-sm tracking-wide text-white/70">
              <span className="block text-white/90">Ekene Eze</span>
              <span className="mt-1 block">
                Founder, Thally. Previously developer experience at Flutterwave, Netlify, and LI.FI.
              </span>
            </footer>
          </blockquote>

          <div className="mt-8 flex justify-center">
            <Link
              href="/about"
              className="group/pill text-canvas inline-flex items-center gap-2 rounded-full bg-white py-2.5 pr-4 pl-4 text-[13px] font-semibold tracking-wide"
            >
              Why Thally exists
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/pill:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
