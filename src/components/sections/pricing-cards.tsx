"use client";

import { useState } from "react";

import { ArrowRight, Check } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  tagline: string;
  monthly: string;
  annual: string;
  monthlyNote: string;
  annualNote: string;
  priceSuffix?: string;
  cta: { label: string; href: string };
  features: string[];
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Free",
    tagline: "Run Thally on your infrastructure",
    monthly: "$0",
    annual: "$0",
    monthlyNote: "MIT licensed · no card required",
    annualNote: "MIT licensed · no card required",
    priceSuffix: "forever",
    cta: { label: "Read the quickstart", href: DESTINATIONS.docsQuickstart },
    features: [
      "Unlimited pages and readers",
      "Pages built for people and AI tools",
      "Fast search across all your docs",
      "Deploy to any hosting provider",
      "Commercial use under the MIT license",
    ],
  },
  {
    name: "Thally Cloud",
    tagline: "Let Thally manage hosting and services",
    monthly: "$60",
    annual: "$50",
    monthlyNote: "$60 billed monthly",
    annualNote: "$50 billed monthly on an annual subscription",
    priceSuffix: "per workspace / month",
    cta: { label: "Start 14-day trial", href: DESTINATIONS.signup },
    recommended: true,
    features: [
      "Everything in Free",
      "Managed hosting for your Thally sites",
      "10,000 AI credits per month",
      "AI answers with links to the source",
      "Thally-drafted updates for relevant merged changes",
      "Documentation analytics and quality checks",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Shape security and support around your needs",
    monthly: "Custom",
    annual: "Custom",
    monthlyNote: "Annual contract · invoiced",
    annualNote: "Annual contract · invoiced",
    cta: { label: "Talk to sales", href: DESTINATIONS.sales },
    features: [
      "Everything in Thally Cloud",
      "Security and identity requirements scoped with your team",
      "Custom contract and support terms",
      "Hands-on migration planning",
      "Dedicated rollout support",
    ],
  },
];

/** Template pricing-section: dark night canvas, hairline cards. */
export function PricingCards({ headerTag = "h2" }: { headerTag?: "h1" | "h2" }) {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="bg-canvas marketing-section-pad relative">
      <div className="mx-auto w-full max-w-[1480px] px-5">
        <div className="mx-auto max-w-3xl text-center">
          <SplitReveal as={headerTag} mode="chars" className="heading-section text-canvas-foreground">
            Start free. Add Cloud when you need it.
          </SplitReveal>
          <Reveal delay={0.15} distance={24}>
            <p className="text-canvas-muted mx-auto mt-5 max-w-2xl text-lg">
              Run Thally&apos;s MIT-licensed engine on your infrastructure for $0. Choose Thally Cloud for managed
              hosting, cited AI answers, drafted updates, analytics, and a shared workspace.
            </p>
          </Reveal>

          <Reveal
            delay={0.25}
            distance={16}
            className="border-canvas-card-stroke mt-8 inline-flex items-center gap-1 rounded-full border bg-white/10 p-1 backdrop-blur-lg"
          >
            {(["Monthly", "Annual"] as const).map((label) => {
              const isAnnual = label === "Annual";
              const selected = annual === isAnnual;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAnnual(isAnnual)}
                  aria-pressed={selected}
                  className={cn(
                    "inline-flex min-h-10 items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    selected ? "text-canvas bg-white" : "text-canvas-muted hover:text-canvas-foreground",
                  )}
                >
                  {label}
                  {isAnnual && (
                    <span className={cn("ml-1.5 text-xs", selected ? "text-canvas/60" : "text-canvas-muted-2")}>
                      Save 17%
                    </span>
                  )}
                </button>
              );
            })}
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={0.15 + i * 0.12}
              className={cn(
                "border-canvas-card-stroke flex flex-col rounded-[24px] border p-2.5 pb-10",
                tier.recommended && "bg-white/[0.03]",
              )}
            >
              {/* Bordered title row, template .pricing-card-title-wrap */}
              <div className="border-canvas-card-stroke flex items-center justify-between gap-2.5 rounded-2xl border p-5">
                <h3 className="text-canvas-foreground text-lg font-medium tracking-tight">{tier.name}</h3>
                {tier.recommended && (
                  <span className="border-canvas-card-stroke text-canvas-foreground rounded-[20px] border bg-white/15 px-2.5 py-1 text-xs backdrop-blur-xl">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-canvas-muted mt-4 px-5 text-sm">{tier.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2 px-5">
                <span className="text-canvas-foreground font-display text-5xl tracking-[-0.04em]">
                  {annual ? tier.annual : tier.monthly}
                </span>
                {tier.priceSuffix && <span className="text-canvas-muted text-sm">{tier.priceSuffix}</span>}
              </div>
              <p className="text-canvas-muted-2 mt-2 px-5 text-xs">{annual ? tier.annualNote : tier.monthlyNote}</p>

              <div className="mt-7 px-2.5">
                <a
                  href={tier.cta.href}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-lg font-medium transition-colors",
                    tier.recommended
                      ? "text-canvas bg-white hover:bg-white/90"
                      : "border-canvas-stroke text-canvas-foreground border hover:bg-white/5",
                  )}
                >
                  {tier.cta.label}
                  <ArrowRight className="size-4" />
                </a>
              </div>

              <ul className="mt-8 space-y-2.5 px-5">
                {tier.features.map((feature) => (
                  <li key={feature} className="text-canvas-muted flex items-start gap-2.5">
                    <Check className="text-canvas-accent mt-1 size-4 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <p className="text-canvas-muted-2 mt-8 text-center text-sm">
          Prices are in USD per workspace. Documentation readers are always free.
        </p>
      </div>
    </section>
  );
}
