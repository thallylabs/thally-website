"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { ShaderField } from "@/components/experience/shader-field";
import { ArrowRight, Guide, type IconComponent, Readiness, Structured } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DESTINATIONS, SOCIAL } from "@/lib/site";
import { cn } from "@/lib/utils";

interface HeroFeature {
  title: string;
  description: string;
  icon: IconComponent;
}

interface HeroImage {
  src: string;
  alt: string;
}

const SLIDE_INTERVAL_MS = 5000;
const CROSSFADE_DURATION = 0.9;
const CROSSFADE_EASE = [0.22, 1, 0.36, 1] as const;

const HEADING = "AI-native documentation for agents and humans.";

const FEATURES: HeroFeature[] = [
  {
    title: "Structured for machines",
    description: "Every route returns JSON, JSON-LD, or Markdown on request, so agents can read without scraping.",
    icon: Structured,
  },
  {
    title: "Typeset for humans",
    description: "The same source becomes semantic HTML that is clear, fast, and easy to navigate.",
    icon: Guide,
  },
  {
    title: "Scored for agent-readiness",
    description: "Get a deterministic 0 to 100 grade on every build. Gate CI and let the agent draft the fixes.",
    icon: Readiness,
  },
];

const IMAGES: HeroImage[] = [
  { src: "/images/hero2.png", alt: "A Thally page served as structured JSON for AI agents" },
  { src: "/images/hero1.png", alt: "The same Thally page, typeset for human readers" },
  { src: "/images/hero3.png", alt: "Thally agent-readiness report" },
];

const heroImageClassName =
  "border-border absolute top-0 left-0 w-full rounded-t-2xl rounded-b-none border border-b-0 object-cover object-left-top";

export default function ExperienceHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const crossfadeTransition = reduceMotion ? { duration: 0 } : { duration: CROSSFADE_DURATION, ease: CROSSFADE_EASE };

  useEffect(() => {
    if (isHovered) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [isHovered]);

  const words = HEADING.split(" ");

  return (
    <section className="bg-accent relative mx-2.5 mt-2.5 overflow-hidden rounded-t-2xl rounded-b-4xl lg:mx-4">
      <ShaderField
        className="opacity-55 dark:opacity-100"
        colors={{ bg: "var(--accent)", ink: "var(--chart-3)", glow: "var(--chart-1)" }}
      />
      <div
        aria-hidden
        className="from-accent pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t to-transparent"
      />

      <div className="relative pt-32">
        <div className="container mx-auto">
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noreferrer"
            className="border-border/80 bg-background/60 text-muted-foreground hover:text-foreground hero-rise inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur transition-colors"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="relative flex size-1.5">
              <span className="bg-chart-1 absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
              <span className="bg-chart-1 relative inline-flex size-1.5 rounded-full" />
            </span>
            Open source and MIT licensed
          </a>

          <div className="mt-6 flex flex-col justify-between gap-8 md:gap-14 lg:flex-row">
            <div className="flex-1">
              <h1 className="font-display text-foreground max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {words.map((word, i) => (
                  <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
                    <span className="hero-rise inline-block" style={{ animationDelay: `${0.1 + i * 0.045}s` }}>
                      {word}
                      {i < words.length - 1 ? " " : ""}
                    </span>
                  </span>
                ))}
              </h1>

              <p
                className="text-muted-foreground hero-rise mt-5 max-w-2xl text-xl font-medium text-pretty md:text-2xl"
                style={{ animationDelay: "0.45s" }}
              >
                One MDX source serves AI agents and human readers from the same URL. When your product changes, Thally
                drafts the docs PR.
              </p>

              <div
                className="hero-rise mt-8 flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"
                style={{ animationDelay: "0.58s" }}
              >
                <Button asChild size="lg" className="cta-shine w-full sm:w-auto">
                  <a href={DESTINATIONS.signup}>
                    Start free
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="bg-background/60 w-full backdrop-blur sm:w-auto"
                >
                  <a href={DESTINATIONS.docs}>Read the docs</a>
                </Button>
              </div>
            </div>

            <div
              className="hero-rise flex flex-1 flex-col justify-center gap-1 max-lg:pt-4"
              style={{ animationDelay: "0.4s" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setActiveIndex(0);
              }}
            >
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeIndex === index;
                return (
                  <button
                    key={feature.title}
                    type="button"
                    className={cn(
                      "hover:bg-background/60 flex w-full cursor-default items-start gap-3 rounded-xl px-4 py-3.5 text-left backdrop-blur-[2px] transition-colors lg:gap-4",
                      isActive && "bg-background/60",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                  >
                    <span className="text-primary flex h-6 w-5 shrink-0 items-center justify-center lg:h-7 lg:w-6">
                      <Icon className="size-3.5 lg:size-4" strokeWidth={2.25} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-foreground leading-6 font-semibold lg:leading-7">{feature.title}</h3>
                      <p className="text-muted-foreground mt-0.5 max-w-sm text-sm text-balance">
                        {feature.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-12 md:mt-20 lg:mt-24" style={{ perspective: "1400px" }}>
          <div className="hero-shot relative aspect-video w-full overflow-hidden rounded-t-2xl shadow-[0_-18px_60px_-30px_rgb(0_0_0/0.35)]">
            {IMAGES.map((image, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={image.src}
                  className={cn("absolute inset-0", !isActive && "pointer-events-none")}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={crossfadeTransition}
                  style={{ zIndex: isActive ? 10 : 0 }}
                  aria-hidden={!isActive}
                >
                  <img src={image.src} alt={image.alt} className={heroImageClassName} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
