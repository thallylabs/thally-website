"use client";

import Link from "next/link";

import { ArrowRight, Guide, type IconComponent, Readiness, Structured } from "@/components/icons";
import { sectionTitleClassName } from "@/components/section-decor";
import KnowledgeFlowGraph from "@/components/sections/knowledge-flow-graph";
import { Button } from "@/components/ui/button";
import { DESTINATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

interface HeroFeatureSliderFeature {
  title: string;
  description: string;
  icon: IconComponent;
  color?: string;
  href?: string;
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
  className?: string;
}

const MAX_FEATURES = 3;

const defaultProps: HeroFeatureSliderProps = {
  heading: "Every product change. Every knowledge surface. Automatically in sync.",
  description:
    "Thally is the pipeline that keeps customer-facing knowledge aligned as your product evolves. It understands what changed, finds the documentation affected, and prepares updates for human review.",
  buttonPrimary: {
    text: "Create your docs site",
    href: DESTINATIONS.signup,
  },
  buttonSecondary: {
    text: "See how Thally works",
    href: "/features/track",
  },
  features: [
    {
      title: "The product is the source of truth",
      description: "Connect the repositories where product changes happen and the documentation those changes affect.",
      icon: Guide,
    },
    {
      title: "Understand before generating",
      description: "Thally looks for evidence, maps affected pages, and treats no change as a valid result.",
      icon: Structured,
    },
    {
      title: "Humans approve what ships",
      description: "Thally prepares the pull request, and your team decides what important communication lands.",
      icon: Readiness,
    },
  ],
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

const Hero = (props: Partial<HeroFeatureSliderProps>) => {
  const { heading, description, buttonPrimary, buttonSecondary, features, className } = {
    ...defaultProps,
    ...props,
  };

  const visibleFeatures = (features ?? []).slice(0, MAX_FEATURES);

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

            <div className="flex flex-1 flex-col justify-center gap-1 max-lg:pt-4">
              {visibleFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex w-full items-start gap-3 rounded-xl px-4 py-3.5 text-left lg:gap-4"
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-12 md:mt-20 lg:mt-24">
          <KnowledgeFlowGraph className="rounded-t-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
