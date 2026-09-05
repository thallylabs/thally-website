"use client";

import Link from "next/link";
import { useState } from "react";

import { Check } from "@/components/icons";
import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DESTINATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

interface PricingPlan {
  accent: string;
  annualBillingNote: string;
  annualPrice: string;
  annualUnit?: string;
  cta: string;
  features: string[];
  href: string;
  monthlyBillingNote: string;
  monthlyPrice: string;
  monthlyUnit?: string;
  name: string;
  popular: boolean;
  tagline: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    tagline: "Publish one documentation site at no cost",
    monthlyPrice: "$0",
    annualPrice: "$0",
    monthlyUnit: "forever",
    annualUnit: "forever",
    monthlyBillingNote: "MIT licensed · no card required",
    annualBillingNote: "MIT licensed · no card required",
    features: [
      "1 managed documentation site",
      "Pull-request previews",
      "Documentation analytics",
      "Unlimited pages and readers",
      "HTML, Markdown, JSON, and JSON-LD",
      "Optional MIT-licensed self-hosting",
    ],
    cta: "Start free",
    href: DESTINATIONS.signup,
    popular: false,
    accent: "var(--chart-3)",
  },
  {
    name: "Thally Cloud",
    tagline: "Add automation, scale, and team controls",
    monthlyPrice: "$199",
    annualPrice: "$166",
    monthlyUnit: "per workspace / month",
    annualUnit: "per workspace / month",
    monthlyBillingNote: "$199 billed monthly",
    annualBillingNote: "$1,990 billed annually · save $398",
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
    cta: "Start 14-day trial",
    href: DESTINATIONS.signup,
    popular: true,
    accent: "var(--chart-1)",
  },
  {
    name: "Enterprise",
    tagline: "Shape security and support around your needs",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    monthlyBillingNote: "Tailored annual agreement",
    annualBillingNote: "Tailored annual agreement",
    features: [
      "Everything in Thally Cloud",
      "Custom site, member, and AI allowances",
      "Security review and invoicing",
      "Custom contract and support terms",
      "Assisted migration planning",
      "Priority rollout support",
    ],
    cta: "Talk to sales",
    href: DESTINATIONS.sales,
    popular: false,
    accent: "var(--chart-5)",
  },
] as const;

export default function Pricing({ headerTag = "h2" }: { headerTag?: "h1" | "h2" }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="relative py-16 md:py-28 lg:py-32">
      <SectionGrid className="opacity-15" />
      <SectionLines />

      <div className="relative container">
        <SectionHeader
          eyebrow={headerTag === "h2" ? "Plans" : undefined}
          title="Start free. Add Thally Cloud when you need more."
          description="Start with one managed site, pull-request previews, and analytics for $0. Choose Thally Cloud for three managed sites, five team members, AI answers, Track, custom domains, and team roles."
          align="center"
          layout="stack"
          as={headerTag}
        />

        <div className="mt-6 flex justify-center">
          <div className="border-border bg-muted inline-flex items-center rounded-lg border p-1">
            <button
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                !isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
              )}
              onClick={() => setIsAnnual(false)}
              type="button"
            >
              Monthly
            </button>
            <div className="sr-only">
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle annual subscription" />
            </div>
            <button
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isAnnual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
              )}
              onClick={() => setIsAnnual(true)}
              type="button"
            >
              Annual <span className="text-chart-5 ml-1 text-xs">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:mt-14 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const billingNote = isAnnual ? plan.annualBillingNote : plan.monthlyBillingNote;
            const priceUnit = isAnnual ? plan.annualUnit : plan.monthlyUnit;

            return (
              <article
                className={cn(
                  "bg-card relative flex min-h-[34rem] flex-col overflow-hidden rounded-3xl border p-6 shadow-sm md:p-7",
                  plan.popular ? "border-primary/35 shadow-[0_22px_70px_-48px_hsl(var(--primary))]" : "border-border",
                )}
                key={plan.name}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{plan.tagline}</p>
                  </div>
                  {plan.popular ? (
                    <span className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-[0.65rem] font-semibold tracking-wide uppercase">
                      Recommended
                    </span>
                  ) : null}
                </div>

                <div className="mt-8 min-h-24">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-tight tabular-nums">{price}</span>
                    {priceUnit ? <span className="text-muted-foreground pb-1 text-sm">{priceUnit}</span> : null}
                  </div>
                  <p className="text-muted-foreground mt-2 text-xs">{billingNote}</p>
                </div>

                <Button asChild variant={plan.popular ? "default" : "outline"} size="lg" className="mt-5 w-full">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>

                <div className="border-border my-7 border-t" />
                <ul className="space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0" style={{ color: plan.accent }} />
                      <span className="text-muted-foreground leading-5">{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-xs leading-5">
          Prices are in USD per workspace. Extra members are $20 per month or $200 per year, extra managed sites are $39
          per month or $390 per year, and 10,000-credit packs are $79 one time. Documentation readers are always free.
        </p>
      </div>
    </section>
  );
}
