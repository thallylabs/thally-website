"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { ThallyMark } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const OFFICE_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop";

const stats = [
  { value: "MIT", label: "Open source, yours forever" },
  { value: "12k+", label: "Docs sites running Thally" },
  { value: "98/100", label: "Median agent-readiness score" },
  { value: "<50ms", label: "Search, resolved client-side" },
];

const team = [
  {
    name: "Elias Chen",
    role: "Co-founder & CEO",
    image: "/images/testimonials/tomas-berg.jpg",
  },
  {
    name: "Maya Sullivan",
    role: "Co-founder & CTO",
    image: "/images/testimonials/amara-okafor.jpg",
  },
  {
    name: "James Okonkwo",
    role: "Head of Product",
    image: "/images/testimonials/daniel-reyes.jpg",
  },
  {
    name: "Sofia Andersson",
    role: "Head of Design",
    image: "/images/testimonials/priya-nair.jpg",
  },
  {
    name: "Noah Patel",
    role: "Engineering Lead",
    image: "/images/testimonials/sam-whitfield.jpg",
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
    <>
      <section className="bg-background py-24 md:py-32">
        <div className="container">
          <Reveal className="max-w-2xl lg:translate-x-24">
            <h1 className="font-display max-w-[640px] flex-1 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
              We&apos;re Thally. We build documentation for the readers docs never had.
            </h1>
          </Reveal>

          {/* Hero imagery: branded poster (back), office photo (middle), tagline card (front) */}
          <div className="relative mt-12 min-h-[280px] lg:min-h-[500px]">
            <motion.div
              className="from-primary relative z-10 flex aspect-video w-full max-w-[770px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br to-[color-mix(in_oklab,var(--chart-1)_65%,var(--primary))]"
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
              <ThallyMark inverted className="size-28 opacity-90" />
            </motion.div>

            <motion.div
              className="border-background absolute top-10 left-[58%] z-20 hidden aspect-[4/5] w-[max(16vw,200px)] overflow-hidden rounded-2xl border-4 shadow-xl lg:block xl:left-[56%] xl:w-[240px]"
              initial={reduce ? undefined : { opacity: 0, x: 32, y: -12 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={OFFICE_IMAGE} alt="Thally team workspace" fill className="object-cover" sizes="240px" />
            </motion.div>

            <motion.div
              className="border-background bg-card absolute top-[46%] left-[68%] z-30 hidden aspect-[1.5/1.4] w-[max(18vw,220px)] items-center justify-center rounded-2xl border-4 shadow-xl lg:flex xl:left-[66%]"
              initial={reduce ? undefined : { opacity: 0, y: 40 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-display px-6 text-center text-lg font-semibold text-balance">
                One source. Read perfectly by machines and humans.
              </p>
            </motion.div>

            {/* Mobile office photo — sits between poster and narrative */}
            <motion.div
              className="border-background relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border-4 lg:hidden"
              initial={reduce ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <Image src={OFFICE_IMAGE} alt="Thally team workspace" fill className="object-cover" sizes="100vw" />
            </motion.div>
          </div>

          {/* Narrative */}
          <Reveal className="mt-28 max-w-xl lg:mt-10 lg:translate-x-24">
            <p className="text-lg leading-7">
              The way documentation gets read has changed — but most docs tools haven&apos;t. Half your readers are now
              AI agents scraping HTML that was never meant for them. We think machines deserve first-class docs, from
              the same source your human readers already trust.
            </p>
          </Reveal>

          <div className="mt-6 space-y-6 md:mt-8 md:space-y-8 lg:mt-10 lg:space-y-10">
            <Reveal className="font-display max-w-xl text-2xl leading-8 font-semibold md:text-3xl lg:translate-x-24">
              We were always told docs tooling stopped at rendered pages.
            </Reveal>
            <Reveal className="max-w-xl text-lg lg:translate-x-24" delay={0.08}>
              <p>
                We&apos;ve spent our careers gluing docs stacks together — a static site generator here, a search
                vendor there, a chat widget, and sync scripts holding it all in line. Every format drifted from the
                last. We wanted to start from the opposite end: one typed content graph, with every human and machine
                format projected from it — never maintained by hand.
              </p>
            </Reveal>

            <div className="grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:py-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="border-border bg-card rounded-2xl border p-6"
                  initial={reduce ? undefined : { opacity: 0, y: 20 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-display text-primary text-4xl font-semibold tracking-tight">{s.value}</div>
                  <div className="text-muted-foreground mt-2 text-sm">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <Reveal className="ml-auto max-w-xl text-lg leading-7 lg:-translate-x-24">
              <p>
                Thally is open source under the MIT license — self-host it anywhere, own every byte, and commercialize
                freely. Search, chat, the API reference, and the agent layer aren&apos;t integrations; they&apos;re the
                same graph, read six different ways.
              </p>
            </Reveal>

            <Reveal className="font-display ml-auto max-w-xl text-2xl leading-8 font-semibold md:text-3xl lg:-translate-x-24">
              We&apos;re a small, deliberate team — not your standard tech startup.
            </Reveal>
            <Reveal className="ml-auto max-w-xl text-lg leading-7 lg:-translate-x-24" delay={0.08}>
              <p>
                We&apos;re founder- and team-owned, sustainable, and intentionally small. Over time we&apos;ll make this
                page more polished, but right now we&apos;re focused on shipping for our customers. If you&apos;d like
                to build with us, check out our open roles:
              </p>
              <Button asChild variant="outline" size="lg" className="mt-6 md:mt-8 lg:mt-10">
                <Link href="#">
                  <span className="flex items-center gap-2 text-start">
                    View open roles
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding border-border border-t">
        <div className="container">
          <Reveal>
            <h2 className="font-display max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              Meet the team behind Thally
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg text-lg">
              A small team across six time zones, united by one obsession: docs that stay true for every reader —
              human or machine.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {team.map((member, i) => (
              <motion.article
                key={member.name}
                className="group"
                initial={reduce ? undefined : { opacity: 0, y: 28 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="border-border relative aspect-[4/5] overflow-hidden rounded-2xl border">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
