"use client";

import { ArrowRight, BookOpen, Braces, Gauge, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { sectionTitleClassName } from "@/components/section-decor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroFeatureSliderImage = Image & {
  label?: string;
};

interface HeroFeatureSliderFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  href?: string;
}

interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}

interface HeroFeatureSliderProps {
  heading: string;
  description?: string;
  buttonPrimary?: {
    text: string;
    href: string;
  };
  buttonSecondary?: {
    text: string;
    href: string;
  };
  features?: HeroFeatureSliderFeature[];
  images: [HeroFeatureSliderImage, ...HeroFeatureSliderImage[]];
  className?: string;
}

const MAX_FEATURES = 3;
const SLIDE_INTERVAL_MS = 5000;
const CROSSFADE_DURATION = 0.9;
const CROSSFADE_EASE = [0.22, 1, 0.36, 1] as const;

const heroImageClassName =
  "border-border absolute top-0 left-0 w-full rounded-t-2xl rounded-b-none border border-b-0 object-cover object-left-top";

const defaultProps: HeroFeatureSliderProps = {
  heading: "AI-native documentation for agents and humans.",
  description:
    "One MDX source serves AI agents and human readers from the same URL. And when your product changes, Thally drafts the docs PR.",
  buttonPrimary: {
    text: "Start free",
    href: "/signup",
  },
  buttonSecondary: {
    text: "View pricing",
    href: "/pricing",
  },
  features: [
    {
      title: "Structured for machines",
      description: "Every route returns JSON, JSON-LD, or Markdown on request. No scraping, ever.",
      icon: Braces,
    },
    {
      title: "Typeset for humans",
      description: "The same source, rendered as semantic HTML your readers actually enjoy.",
      icon: BookOpen,
    },
    {
      title: "Scored for agent-readiness",
      description: "A deterministic 0 to 100 grade on every build. Gate CI on it, and let the agent PR the fixes.",
      icon: Gauge,
    },
  ],
  images: [
    {
      src: "/images/hero2.png",
      alt: "A Thally page served as structured JSON for AI agents",
      label: "Structured for machines",
    },
    {
      src: "/images/hero1.png",
      alt: "The same Thally page, typeset for human readers",
      label: "Typeset for humans",
    },
    {
      src: "/images/hero3.png",
      alt: "Thally agent-readiness report",
      label: "Agent-readiness",
    },
  ],
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

const Hero = (props: Partial<HeroFeatureSliderProps>) => {
  const { heading, description, buttonPrimary, buttonSecondary, features, images, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleFeatures = (features ?? []).slice(0, MAX_FEATURES);
  const heroImages = images.slice(0, MAX_FEATURES);
  const slideCount = heroImages.length;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const crossfadeTransition = reduceMotion ? { duration: 0 } : { duration: CROSSFADE_DURATION, ease: CROSSFADE_EASE };

  useEffect(() => {
    if (isHovered || slideCount <= 1) return;

    const interval = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [isHovered, slideCount]);

  return (
    <section className={cn("bg-accent relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-4xl lg:mx-4", className)}>
      <div className="pt-32">
        <div className="container mx-auto">
          <div className="flex flex-col justify-between gap-8 md:gap-14 lg:flex-row">
            <div className="flex-1">
              <h1 className={cn(sectionTitleClassName, "text-foreground max-w-3xl text-pretty lg:text-6xl")}>
                {heading}
              </h1>

              {description && (
                <p className="text-muted-foreground mt-5 max-w-2xl text-xl font-medium text-pretty md:text-2xl">
                  {description}
                </p>
              )}

              <div className="mt-8 flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                {buttonPrimary &&
                  (isExternalHref(buttonPrimary.href) ? (
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <a href={buttonPrimary.href}>
                        {buttonPrimary.text}
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link href={buttonPrimary.href}>
                        {buttonPrimary.text}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  ))}
                {buttonSecondary &&
                  (isExternalHref(buttonSecondary.href) ? (
                    <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
                      <a href={buttonSecondary.href}>{buttonSecondary.text}</a>
                    </Button>
                  ) : (
                    <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
                      <Link href={buttonSecondary.href}>{buttonSecondary.text}</Link>
                    </Button>
                  ))}
              </div>
            </div>

            <div
              className="flex flex-1 flex-col justify-center gap-1 max-lg:pt-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setActiveImageIndex(0);
              }}
            >
              {visibleFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeImageIndex === index;
                return (
                  <button
                    key={feature.title}
                    type="button"
                    className={cn(
                      "hover:bg-background/50 flex w-full cursor-default items-start gap-3 rounded-xl px-4 py-3.5 text-left transition-colors lg:gap-4",
                      isActive && "bg-background/50",
                    )}
                    onMouseEnter={() => setActiveImageIndex(index)}
                    onFocus={() => setActiveImageIndex(index)}
                    onClick={() => setActiveImageIndex(index)}
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

        <div className="container mx-auto mt-12 md:mt-20 lg:mt-24">
          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
            {heroImages.map((heroImage, index) => {
              const isActive = activeImageIndex === index;

              return (
                <motion.div
                  key={heroImage.src}
                  className={cn("absolute inset-0", !isActive && "pointer-events-none")}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={crossfadeTransition}
                  style={{ zIndex: isActive ? 10 : 0 }}
                  aria-hidden={!isActive}
                >
                  {heroImage.srcDark ? (
                    <>
                      <img src={heroImage.src} alt={heroImage.alt} className={cn(heroImageClassName, "dark:hidden")} />
                      <img
                        src={heroImage.srcDark}
                        alt={heroImage.alt}
                        className={cn(heroImageClassName, "hidden dark:block")}
                      />
                    </>
                  ) : (
                    <img src={heroImage.src} alt={heroImage.alt} className={heroImageClassName} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
