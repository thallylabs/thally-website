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
  cta: string;
  features: string[];
  href: string;
  monthlyBillingNote: string;
  monthlyPrice: string;
  name: string;
  popular: boolean;
  priceUnit?: string;
  tagline: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    tagline: "Own and run the engine yourself",
    monthlyPrice: "$0",
    annualPrice: "$0",
    priceUnit: "forever",
    monthlyBillingNote: "MIT licensed · no card required",
    annualBillingNote: "MIT licensed · no card required",
    features: [
      "Unlimited pages and readers",
      "HTML, Markdown, JSON, and JSON-LD",
      "Remote MCP server and hybrid search",
      "Deploy to any hosting provider",
      "Commercial use included",
    ],
    cta: "Read the quickstart",
    href: DESTINATIONS.docsQuickstart,
    popular: false,
    accent: "var(--chart-3)",
  },
  {
    name: "Thally Cloud",
    tagline: "Managed services for growing teams",
    monthlyPrice: "$60",
    annualPrice: "$50",
    priceUnit: "per workspace / month",
    monthlyBillingNote: "$60 billed monthly · 3 team members included",
    annualBillingNote: "$600 billed annually · 3 team members included",
    features: [
      "Everything in Free",
      "Managed hosting or connected hosting",
      "Thally AI answers and docs analytics",
      "Thally Track and readiness gates",
      "Three team members in any role included",
      "Additional members: $20/month or $200/year",
    ],
    cta: "Start 14-day trial",
    href: DESTINATIONS.signup,
    popular: true,
    accent: "var(--chart-1)",
  },
  {
    name: "Enterprise",
    tagline: "Security and support tailored to you",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    monthlyBillingNote: "Annual contract · invoiced",
    annualBillingNote: "Annual contract · invoiced",
    features: [
      "Everything in Thally Cloud",
      "SAML SSO and SCIM provisioning",
      "Audit-log access and custom terms",
      "Migration and priority support",
      "Dedicated account manager",
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
          title="Start free. Add Thally Cloud when you want it."
          description="Your documentation engine stays open source. Pay only when your team needs managed infrastructure, AI answers, automation, and shared workspace controls."
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
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle annual billing" />
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
                    {plan.priceUnit ? (
                      <span className="text-muted-foreground pb-1 text-sm">{plan.priceUnit}</span>
                    ) : null}
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
          Prices are in USD per workspace. Thally Cloud includes three team members regardless of role. Each additional
          active member or pending invitation is $20 monthly or $200 annually. Documentation readers are always free.
        </p>
      </div>
    </section>
  );
}
