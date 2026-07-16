"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { ArrowRight } from "@/components/icons";
import { ThallyMark } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const principles = [
  {
    title: "One source",
    description: "Write in MDX and publish HTML, Markdown, JSON, and JSON-LD without maintaining separate copies.",
  },
  {
    title: "Git stays in charge",
    description: "Documentation lives beside the product, with changes reviewed through the pull-request workflow.",
  },
  {
    title: "Every reader gets a useful format",
    description: "People get a polished site while search tools, assistants, and agents get structured content.",
  },
  {
    title: "Hosting is your decision",
    description: "Self-host the open-source core or use Thally Cloud when you want the infrastructure managed for you.",
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
            Documentation should work for people and AI agents without becoming two separate products.
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
              Keep one source of truth. Give every reader the format it can use.
            </p>
          </motion.div>
        </div>

        <div className="mt-24 space-y-16 md:mt-32 md:space-y-24">
          <Reveal className="max-w-2xl lg:translate-x-24">
            <h2 className="font-display text-2xl leading-8 font-semibold md:text-3xl">
              Documentation is read in more places than a browser.
            </h2>
            <p className="mt-6 text-lg leading-8">
              Developers still visit documentation sites, but they also ask coding assistants, use search, and send
              agents to find answers on their behalf. Thally is built so those readers can use the same source instead
              of relying on a second, manually maintained knowledge base.
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

          <Reveal className="ml-auto max-w-2xl lg:-translate-x-24">
            <h2 className="font-display text-2xl leading-8 font-semibold md:text-3xl">
              Open source at the core, managed when it helps.
            </h2>
            <p className="mt-6 text-lg leading-8">
              Thally&apos;s core is available under the MIT license. You can self-host it, keep your content in Git, and
              move the site to the infrastructure you choose. Thally Cloud is the optional managed service for teams
              that want hosted infrastructure, AI answers, analytics, and workspace controls.
            </p>
          </Reveal>

          <Reveal className="border-border bg-card rounded-3xl border p-8 md:p-12">
            <div className="max-w-2xl">
              <p className="text-primary text-sm font-semibold tracking-widest uppercase">Who is behind Thally</p>
              <h2 className="font-display mt-4 text-2xl leading-8 font-semibold md:text-3xl">
                Thally is built and operated by Fairspleet LLC.
              </h2>
              <p className="text-muted-foreground mt-5 text-lg leading-8">
                We build Thally to make documentation easier to own, publish, and use across human and machine readers.
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
