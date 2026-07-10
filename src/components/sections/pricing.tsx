"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    tagline: "Self-host everything, forever",
    monthlyPrice: "$0",
    annualPrice: "$0",
    features: [
      "MIT licensed, commercial use OK",
      "Unlimited pages & readers",
      "All four output formats + MCP server",
      "⌘K hybrid search",
      "Docs agent with your own API key",
    ],
    cta: "Get started",
    accent: "var(--chart-3)",
  },
  {
    name: "Cloud",
    tagline: "Managed hosting for growing teams",
    monthlyPrice: "$8",
    annualPrice: "$60",
    monthlyPerUnit: "per editor / mo",
    annualPerUnit: "per editor / yr",
    features: [
      "Thally AI answers & chat",
      "Thally Track + one-click GitHub App",
      "Agent-readiness CI checks",
      "Admin dashboard & docs analytics",
      "Owner, Editor & Viewer roles",
    ],
    cta: "Start 14-day trial",
    popular: true,
    accent: "var(--chart-1)",
  },
  {
    name: "Enterprise",
    tagline: "For regulated & large orgs",
    monthlyPrice: "$15",
    annualPrice: "$120",
    monthlyPerUnit: "per editor / mo",
    annualPerUnit: "per editor / yr",
    features: [
      "SAML & SCIM SSO",
      "Audit log & 99.9% uptime SLA",
      "Self-hosted with support",
      "Dedicated account manager",
      "Custom onboarding",
    ],
    cta: "Talk to sales",
    accent: "var(--chart-5)",
  },
];

export default function Pricing({ headerTag = "h2" }: { headerTag?: "h1" | "h2" }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="relative py-16 md:py-28 lg:py-32">
      <SectionGrid className="opacity-15" />
      <SectionLines />

      <div className="relative container">
        <SectionHeader
          eyebrow={headerTag === "h2" ? "Plans" : undefined}
          title="Free to self-host, simple to scale"
          description="Thally is open source. Run it yourself forever, and upgrade when you want managed hosting, AI answers, and enterprise controls. No surprise fees."
          align="center"
          layout="stack"
          as={headerTag}
        />
        <div className="mt-4 flex justify-center">
          <div className="border-border bg-muted inline-flex items-center gap-3 rounded-full border px-4 py-2">
            <span className={cn("text-sm font-medium", !isAnnual && "text-foreground")}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle annual billing" />
            <span className={cn("text-sm font-medium", isAnnual && "text-foreground")}>
              Annual <span className="text-chart-5 text-xs">(save 37%)</span>
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:mt-12 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={cn(plan.popular && "lg:scale-[1.04]")}>
              <Card
                className={cn(
                  "relative flex h-full flex-col",
                  plan.popular ? "border-primary/40 shadow-md" : "border-border",
                )}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: plan.accent }}
                  >
                    Most popular
                  </span>
                )}

                <CardHeader className="pb-4">
                  <h3 className="text-2xl font-semibold">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.tagline}</p>
                  <div className="mt-4">
                    <p className="text-3xl font-semibold tracking-tight">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </p>
                    {(plan.monthlyPerUnit || plan.annualPerUnit) && (
                      <p className="text-muted-foreground mt-1 text-sm">
                        {isAnnual ? plan.annualPerUnit : plan.monthlyPerUnit}
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-6">
                  <Button variant={plan.popular ? "default" : "outline"} size="lg" className="w-full">
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0" style={{ color: plan.accent }} />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
