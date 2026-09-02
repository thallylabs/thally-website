"use client";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

const GUARANTEES = [
  {
    title: "Every update carries its evidence",
    body: "Each pull request shows what changed, where the information came from, and why the update was necessary. You verify before you merge.",
    tag: "Evidence first",
  },
  {
    title: "A no-change result is valid",
    body: "Thally reports when a page does not need to change instead of inventing an update to look busy.",
    tag: "No busywork",
  },
  {
    title: "Humans approve everything that ships",
    body: "Thally never pushes to main and never publishes on its own. Your team keeps judgment and publishing authority on every surface.",
    tag: "Human review",
  },
  {
    title: "Thally never invents product behavior",
    body: "Drafts are grounded in the diff, the pull request, and the linked tickets. If the evidence is not there, the words are not either.",
    tag: "Grounded in the diff",
  },
  {
    title: "Your content stays in your repositories",
    body: "Docs, website, and help center content remain as source files where they live today. There is nothing to export because we never hold the source.",
    tag: "Source files in Git",
  },
  {
    title: "The publishing engine is open source",
    body: "The engine behind Thally Cloud is available on GitHub under the MIT license. You can host it yourself at any time.",
    tag: "MIT licensed",
  },
  {
    title: "Your surfaces stay under your control",
    body: "Thally never takes ownership of your domain, your website, or your help center. It proposes updates into the tools you already use.",
    tag: "Your domain, your tools",
  },
  {
    title: "Cancellation leaves you with the source",
    body: "Your repositories and the MIT-licensed engine remain yours. If Cloud hosting ends, you can deploy the site elsewhere.",
    tag: "No exit tax",
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
 * Carries Thally's evidence and no-lock-in guarantees instead of testimonials.
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
              Evidence first. Your surfaces stay yours.
            </SplitReveal>
            <Reveal delay={0.15} distance={24}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
                The goal is not to replace the people who own your docs, website, or help center. It is to hand them the
                update, with proof, before a customer finds the gap.
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
