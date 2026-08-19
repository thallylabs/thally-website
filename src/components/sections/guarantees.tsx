"use client";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

const GUARANTEES = [
  {
    title: "Your content stays in your repository",
    body: "Your documentation remains as source files in your repository. There is nothing to export because we never hold the source.",
    tag: "Source files in Git",
  },
  {
    title: "The publishing engine is open source",
    body: "The engine behind Thally Cloud is available on GitHub under the MIT license. You can host it yourself at any time.",
    tag: "MIT licensed",
  },
  {
    title: "Self-hosting stays available",
    body: "Clone the repository and deploy the open-source engine wherever Next.js runs. Managed hosting is a service, not a content lock-in.",
    tag: "Deploy anywhere",
  },
  {
    title: "Your domain stays under your control",
    body: "Thally never takes ownership of your domain. Use it wherever you deploy the site.",
    tag: "Your domain",
  },
  {
    title: "Cancellation leaves you with the source",
    body: "Your repository and the MIT-licensed engine remain yours. If Cloud hosting ends, you can deploy the site elsewhere.",
    tag: "No exit tax",
  },
  {
    title: "Humans approve important communication",
    body: "Thally prepares reviewable work. Your team keeps judgment and publishing authority.",
    tag: "Human review",
  },
  {
    title: "Understand before generating",
    body: "Thally finds what changed, gathers evidence, and maps the affected knowledge before drafting new words.",
    tag: "Evidence first",
  },
  {
    title: "A no-change result is valid",
    body: "Thally reports when no documentation update is needed instead of inventing one.",
    tag: "No busywork",
  },
];

function GuaranteeCard({ item }: { item: (typeof GUARANTEES)[number] }) {
  return (
    <div className="w-[min(340px,calc(100vw-2.5rem))] shrink-0 rounded-[25px] border border-white bg-[#f6f2ea]/90 p-6 sm:w-[430px]">
      <p className="text-canvas-cream-foreground text-base leading-relaxed font-medium">{item.title}</p>
      <p className="text-canvas-cream-muted mt-2.5 text-sm leading-relaxed">{item.body}</p>
      <div className="mt-5 border-t border-[#bdbdbd] pt-4">
        <span className="text-canvas-cream-foreground/70 text-[11px] font-semibold tracking-widest uppercase">
          {item.tag}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse }: { items: typeof GUARANTEES; reverse?: boolean }) {
  return (
    <div className="guarantee-marquee flex overflow-hidden">
      {[false, true].map((hidden) => (
        <div
          key={String(hidden)}
          aria-hidden={hidden || undefined}
          className={cn("guarantee-marquee-track flex min-w-max shrink-0 gap-2.5 pr-2.5", reverse && "reverse")}
        >
          {items.map((item) => (
            <GuaranteeCard key={item.title} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Template "testimonial-section": a light rounded band over the pastel
 * illustration with two counter-scrolling marquee rows of glass cards.
 * Carries Thally's no-lock-in guarantees instead of testimonials.
 */
export function Guarantees() {
  return (
    <section className="bg-canvas px-2.5 sm:px-5">
      <div className="relative mx-auto max-w-[1480px] overflow-hidden rounded-[52px]">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/template/ready-made-bg.webp)" }}
        />
        {/* The band used to sit under a white wash, which read as a hole in a
            dark page. Scrim it down instead, weighted toward the bright sky at
            the top; the cream cards carry their own light. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/62 via-black/50 to-black/44" />

        <div className="marketing-section-pad relative">
          <div className="mx-auto max-w-3xl px-5 text-center">
            <SplitReveal as="h2" mode="chars" className="heading-section text-white">
              Proof over promises
            </SplitReveal>
            <Reveal delay={0.15} distance={24}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
                Pay for the service. Keep the source. Thally Cloud never takes ownership of your content, repository,
                engine, or domain.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 space-y-2.5">
            <MarqueeRow items={GUARANTEES.slice(0, 4)} />
            <MarqueeRow items={GUARANTEES.slice(4)} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}
