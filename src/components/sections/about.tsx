"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { ThallyMark } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const principles = [
  {
    title: "The product is the source of truth",
    description: "Customer-facing knowledge should follow what the product does, not drift into a separate reality.",
  },
  {
    title: "Understand before generating",
    description: "Find what changed, gather evidence, and map the affected knowledge before drafting new words.",
  },
  {
    title: "Evidence before confidence",
    description:
      "Show why an update is needed, which sources support it, and when no communication change is required.",
  },
  {
    title: "Humans approve important communication",
    description: "Thally prepares reviewable work. Your team keeps judgment and publishing authority.",
  },
];

function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const About = () => {
  const reduce = useReducedMotion();

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container">
        <Reveal className="max-w-3xl lg:translate-x-24">
          <p className="text-primary mb-4 text-sm font-semibold tracking-widest uppercase">About Thally</p>
          <h1 className="font-display max-w-[760px] text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Software ships faster than customer-facing knowledge can follow.
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <motion.div
            className="from-primary relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br to-[color-mix(in_oklab,var(--chart-1)_65%,var(--primary))] lg:min-h-[460px]"
            initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden
              className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] opacity-30"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <ThallyMark inverted className="size-28 opacity-90 md:size-36" />
          </motion.div>

          <motion.div
            className="border-border bg-card flex min-h-[240px] flex-col justify-between rounded-3xl border p-8 lg:min-h-0"
            initial={reduce ? undefined : { opacity: 0, x: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">The premise</p>
            <p className="font-display mt-10 text-2xl leading-8 font-semibold text-balance">
              Every product change. Every knowledge surface. Automatically in sync.
            </p>
          </motion.div>
        </div>

        <div className="mt-24 space-y-16 md:mt-32 md:space-y-24">
          <Reveal className="max-w-2xl lg:translate-x-24">
            <h2 className="font-display text-2xl leading-8 font-semibold md:text-3xl">
              Every product change creates communication work.
            </h2>
            <p className="mt-6 text-lg leading-8">
              Documentation, SDK references, release notes, examples, tutorials, and AI context are usually maintained
              separately. Teams have to rediscover what changed, decide which surfaces are affected, and repeat the same
              update across each one. No system owns that understanding.
            </p>
          </Reveal>

          <Reveal className="ml-auto max-w-2xl lg:-translate-x-24">
            <h2 className="font-display text-2xl leading-8 font-semibold md:text-3xl">
              Thally is the pipeline, not another destination.
            </h2>
            <p className="mt-6 text-lg leading-8">
              Documentation platforms, wikis, content management systems, and knowledge bases store what a team already
              knows. Thally connects product evolution to customer-facing knowledge. It discovers the communication work
              a change creates, prioritizes it, and prepares the right updates for review.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                className="border-border bg-card rounded-2xl border p-6 md:p-8"
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="font-display text-xl font-semibold">{principle.title}</h3>
                <p className="text-muted-foreground mt-3 leading-7">{principle.description}</p>
              </motion.article>
            ))}
          </div>

          <Reveal className="max-w-2xl lg:translate-x-24">
            <h2 className="font-display text-2xl leading-8 font-semibold md:text-3xl">
              Documentation is the first surface.
            </h2>
            <p className="mt-6 text-lg leading-8">
              Thally&apos;s first job is narrow: understand how a product change affects documentation and help teams
              keep those pages synchronized. The publishing engine is available under the MIT license, content stays in
              Git, and humans review the updates. Each accepted review and correction improves the product-specific
              understanding behind future changes.
            </p>
          </Reveal>

          <Reveal className="ml-auto max-w-2xl lg:-translate-x-24">
            <h2 className="font-display text-2xl leading-8 font-semibold md:text-3xl">
              The long-term goal is a synchronized knowledge ecosystem.
            </h2>
            <p className="mt-6 text-lg leading-8">
              Teams should not have to remember every place a product change needs to be explained. As Thally expands,
              shipping the product should surface the work across documentation, SDK references, examples, tutorials,
              release notes, AI context, and the knowledge surfaces still to come.
            </p>
          </Reveal>

          <Reveal className="border-border bg-card rounded-3xl border p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase">Who is behind Thally</p>
              <h2 className="font-display mt-4 text-2xl leading-8 font-semibold md:text-3xl">
                Thally is built and operated by Fairspleet LLC.
              </h2>
              <p className="text-muted-foreground mt-5 text-lg leading-8">
                We build Thally so product evolution is continuously reflected everywhere customers learn about it.
                Contact us directly with questions about the product, support, or company.
              </p>
              <Button asChild variant="outline" size="lg" className="mt-8">
                <Link href="/contact">
                  <span className="flex items-center gap-2 text-start">
                    Contact Thally
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
