"use client";

import Link from "next/link";
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
  monthlySuffix?: string;
  annualSuffix?: string;
  cta: { label: string; href: string };
  features: string[];
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Free",
    tagline: "Publish one documentation site at no cost",
    monthly: "$0",
    annual: "$0",
    monthlyNote: "MIT licensed · no card required",
    annualNote: "MIT licensed · no card required",
    monthlySuffix: "forever",
    annualSuffix: "forever",
    cta: { label: "Start free", href: DESTINATIONS.signup },
    features: [
      "1 managed documentation site",
      "Pull-request previews",
      "Documentation analytics",
      "Unlimited pages and readers",
      "HTML, Markdown, JSON, and JSON-LD",
      "Optional MIT-licensed self-hosting",
    ],
  },
  {
    name: "Thally Cloud",
    tagline: "Add automation, scale, and team controls",
    monthly: "$199",
    annual: "$166",
    monthlyNote: "$199 billed monthly",
    annualNote: "$1,990 billed annually · save $398",
    monthlySuffix: "per workspace / month",
    annualSuffix: "per workspace / month",
    cta: { label: "Start 14-day trial", href: DESTINATIONS.signup },
    recommended: true,
    features: [
      "Everything in Free",
      "3 managed documentation sites",
      "5 team members included",
      "Unlimited connected product repositories",
      "10,000 shared AI credits each month",
      "Unused credits roll over while subscribed",
      "AI answers and Thally Track",
      "Custom domains and team roles",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Shape security and support around your needs",
    monthly: "Custom",
    annual: "Custom",
    monthlyNote: "Tailored annual agreement",
    annualNote: "Tailored annual agreement",
    cta: { label: "Talk to sales", href: DESTINATIONS.sales },
    features: [
      "Everything in Thally Cloud",
      "Custom site, member, and AI allowances",
      "Security review and invoicing",
      "Custom contract and support terms",
      "Assisted migration planning",
      "Priority rollout support",
    ],
  },
];

/** Template pricing-section: dark night canvas, hairline cards. */
/**
 * Signup tiers leave for the app; Enterprise goes to the contact form, so the
 * link has to be a real client navigation rather than a full page load.
 */
function TierCta({ tier }: { tier: Tier }) {
  const className = cn(
    "flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-lg font-medium transition-colors",
    tier.recommended
      ? "text-canvas bg-white hover:bg-white/90"
      : "border-canvas-stroke text-canvas-foreground border hover:bg-white/5",
  );
  const label = (
    <>
      {tier.cta.label}
      <ArrowRight className="size-4" />
    </>
  );

  return tier.cta.href.startsWith("/") ? (
    <Link href={tier.cta.href} className={className}>
      {label}
    </Link>
  ) : (
    <a href={tier.cta.href} className={className}>
      {label}
    </a>
  );
}

export function PricingCards({ headerTag = "h2" }: { headerTag?: "h1" | "h2" }) {
  const [annual, setAnnual] = useState(true);
  // Tier names sit one level under the section header. Hard-coding h3 skipped a
  // level on /pricing, where this section supplies the page's h1.
  const TierHeading = headerTag === "h1" ? "h2" : "h3";

  return (
    <section id="pricing" className="bg-canvas marketing-section-pad relative">
      <div className="mx-auto w-full max-w-[1480px] px-5">
        <div className="mx-auto max-w-3xl text-center">
          <SplitReveal as={headerTag} mode="chars" className="heading-section text-canvas-foreground">
            Start free. Add Cloud when you need it.
          </SplitReveal>
          <Reveal delay={0.15} distance={24}>
            <p className="text-canvas-muted mx-auto mt-5 max-w-2xl text-lg">
              Start with one managed site, pull-request previews, and analytics for $0. Choose Thally Cloud for three
              managed sites, five team members, AI answers, Track, custom domains, and team roles.
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
                <TierHeading className="text-canvas-foreground text-lg font-medium tracking-tight">
                  {tier.name}
                </TierHeading>
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
                {(annual ? tier.annualSuffix : tier.monthlySuffix) && (
                  <span className="text-canvas-muted text-sm">{annual ? tier.annualSuffix : tier.monthlySuffix}</span>
                )}
              </div>
              <p className="text-canvas-muted-2 mt-2 px-5 text-xs">{annual ? tier.annualNote : tier.monthlyNote}</p>

              <div className="mt-7 px-2.5">
                <TierCta tier={tier} />
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

        <p className="text-canvas-muted-2 mx-auto mt-8 max-w-4xl text-center text-sm leading-6">
          Need more capacity? Add members for $20 per month or $200 per year, managed sites for $39 per month or $390
          per year, and 10,000-credit packs for $79 one time. Credit packs never auto-recharge.
        </p>
      </div>
    </section>
  );
}
