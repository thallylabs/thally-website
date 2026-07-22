"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowRight, Guide, type IconComponent, Readiness, Structured } from "@/components/icons";
import { sectionTitleClassName } from "@/components/section-decor";
import { Button } from "@/components/ui/button";
import { DESTINATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeroFeatureSliderImage = Image & {
  label?: string;
};

interface HeroFeatureSliderFeature {
  title: string;
  description: string;
  icon: IconComponent;
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
  heading: "Docs that keep up with the product.",
  description:
    "Start a new docs site or bring your existing docs to Thally. When the site is live, connect product repos so Thally can draft reviewable updates when the docs need to change.",
  buttonPrimary: {
    text: "Create your docs site",
    href: DESTINATIONS.signup,
  },
  buttonSecondary: {
    text: "See how Thally updates docs",
    href: "#automation",
  },
  features: [
    {
      title: "Start fresh or bring your docs",
      description: "Create a new site, connect an existing Thally project, or migrate your current docs.",
      icon: Guide,
    },
    {
      title: "One source for every reader",
      description: "Publish polished HTML for people and structured JSON, JSON-LD, and Markdown for AI tools.",
      icon: Structured,
    },
    {
      title: "Updates stay reviewable",
      description: "Connect product repos, then review every docs PR Thally drafts from relevant merged changes.",
      icon: Readiness,
    },
  ],
  images: [
    {
      src: "/images/hero1.png",
      alt: "A Thally documentation site published from a GitHub repository",
      label: "Your site",
    },
    {
      src: "/images/hero2.png",
      alt: "The same Thally page served as structured JSON for AI tools",
      label: "Every reader",
    },
    {
      src: "/images/hero3.png",
      alt: "Thally agent-readiness report",
      label: "Review before publishing",
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
                      <span className="text-foreground block leading-6 font-semibold lg:leading-7">
                        {feature.title}
                      </span>
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
            <AnimatePresence initial={false} mode="sync">
              {heroImages.map((heroImage, index) => {
                if (activeImageIndex !== index) return null;
                return (
                  <motion.div
                    key={heroImage.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={crossfadeTransition}
                  >
                    <NextImage
                      src={heroImage.src}
                      alt={heroImage.alt}
                      className={heroImageClassName}
                      fill
                      sizes="(max-width: 768px) 100vw, 1200px"
                      priority={index === 0}
                      quality={82}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
