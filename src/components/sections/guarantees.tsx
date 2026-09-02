"use client";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

const GUARANTEES = [
  {
    title: "Every update carries its evidence",
    body: "Each pull request shows what changed, where the information came from, and why the update was necessary. You verify before you merge.",
    tag: "Evidence attached",
  },
  {
    title: "A human approves every surface",
    body: "Docs, website, and help center: Thally drafts, your team publishes. Nothing goes live on any surface without review.",
    tag: "Human review",
  },
  {
    title: "Understand before generating",
    body: "Thally works out what a change means and maps the affected surfaces before drafting a single word.",
    tag: "Evidence first",
  },
  {
    title: "A no-change result is valid",
    body: "When the evidence shows nothing needs to change, Thally says so instead of inventing an update.",
    tag: "No busywork",
  },
  {
    title: "Your content stays where it lives",
    body: "Docs and website content remain in your repositories. Help center content remains in your support platform. Thally does not become the system of record.",
    tag: "You own the source",
  },
  {
    title: "The publishing engine is open source",
    body: "The engine behind Thally Cloud is available on GitHub under the MIT license. You can host it yourself at any time.",
    tag: "MIT licensed",
  },
  {
    title: "Your domain stays under your control",
    body: "Thally never takes ownership of your domain. You keep the domain and the source behind every page.",
    tag: "Your domain",
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
                The goal is not to replace the people who create great documentation. It is to remove the detective
                work, and to leave judgment and publishing authority with your team.
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
