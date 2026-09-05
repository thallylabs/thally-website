"use client";

import Link from "next/link";
import { useState } from "react";

import { Check, ChevronsUpDown } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface FeatureSection {
  category: string;
  features: {
    name: string;
    free: string | boolean;
    cloud: string | boolean;
    enterprise: string | boolean;
  }[];
}

const pricingPlans = [
  {
    name: "Free",
    href: DESTINATIONS.signup,
    buttonText: "Start free",
    recommended: false,
  },
  {
    name: "Thally Cloud",
    href: DESTINATIONS.signup,
    buttonText: "Start 14-day trial",
    recommended: true,
  },
  {
    name: "Enterprise",
    href: DESTINATIONS.sales,
    buttonText: "Talk to sales",
    recommended: false,
  },
];

const comparisonFeatures: FeatureSection[] = [
  {
    category: "Usage",
    features: [
      {
        name: "Documentation pages and readers",
        free: "Unlimited",
        cloud: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Documentation sites",
        free: "1 managed",
        cloud: "3 included",
        enterprise: "Custom",
      },
      {
        name: "AI credits per month",
        free: "Bring your own key",
        cloud: "10,000 + rollover",
        enterprise: "Custom",
      },
      {
        name: "Workspace members",
        free: "Owner only",
        cloud: "5 included · $20/mo extra",
        enterprise: "Custom",
      },
      {
        name: "Additional managed sites",
        free: false,
        cloud: "$39/mo or $390/yr",
        enterprise: "Custom",
      },
      {
        name: "Credit packs",
        free: false,
        cloud: "10,000 for $79",
        enterprise: "Custom",
      },
      {
        name: "Connected product repositories",
        free: false,
        cloud: "Unlimited",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    category: "Features",
    features: [
      {
        name: "Markdown and reusable components",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Pages built for people and AI tools",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Built-in connections for AI assistants",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Interactive API documentation",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "AI answers with source links",
        free: false,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Documentation quality checks",
        free: false,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Docs agent with your own AI key",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Thally Track",
        free: false,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Managed hosting",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Pull-request previews",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Documentation analytics",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Custom domains",
        free: false,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Workspace permissions",
        free: false,
        cloud: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        name: "Community help",
        free: true,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Priority help from our team",
        free: false,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Custom security and contract review",
        free: false,
        cloud: false,
        enterprise: true,
      },
    ],
  },
];

const planCtaClasses = (recommended: boolean) =>
  cn(
    "inline-flex w-fit items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
    recommended
      ? "text-canvas bg-white hover:bg-white/90"
      : "border-canvas-stroke text-canvas-foreground border hover:bg-white/5",
  );

/** Template comparison table: dark night canvas, hairline rows. */
const Pricing2 = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Thally Cloud

  return (
    <section className="bg-canvas pb-16 md:pb-28 lg:pb-32">
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground text-center">
          Compare plans
        </SplitReveal>
        <Reveal delay={0.15} className="mt-10 lg:mt-16">
          <PlanHeaders selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
          <div className="mt-6 lg:mt-10">
            <FeatureSections selectedPlan={selectedPlan} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const PlanHeaders = ({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: number;
  onPlanChange: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile View */}
      <div className="border-canvas-hairline border-b md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between py-4">
            <CollapsibleTrigger
              className="text-canvas-foreground flex min-h-11 items-center gap-2"
              aria-label="Toggle pricing plans"
            >
              <h3 className="text-2xl font-medium tracking-tight">{pricingPlans[selectedPlan].name}</h3>
              <ChevronsUpDown
                className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <Link
              href={pricingPlans[selectedPlan].href}
              className={planCtaClasses(pricingPlans[selectedPlan].recommended)}
            >
              {pricingPlans[selectedPlan].buttonText}
            </Link>
          </div>
          <CollapsibleContent className="flex flex-col space-y-2 p-2">
            {pricingPlans.map(
              (plan, index) =>
                index !== selectedPlan && (
                  <button
                    type="button"
                    key={index}
                    className="border-canvas-card-stroke text-canvas-foreground rounded-lg border bg-white/5 px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10"
                    onClick={() => {
                      onPlanChange(index);
                      setIsOpen(false);
                    }}
                  >
                    {plan.name}
                  </button>
                ),
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop View */}
      <div className="border-canvas-hairline grid grid-cols-[2fr_1fr_1fr_1fr] border-b pb-6 max-md:hidden">
        <div></div>
        {pricingPlans.map((plan, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-canvas-foreground mb-4 text-2xl font-medium tracking-tight">{plan.name}</h3>
            <Link href={plan.href} className={planCtaClasses(plan.recommended)}>
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureSections = ({ selectedPlan }: { selectedPlan: number }) => (
  <>
    {comparisonFeatures.map((section, sectionIndex) => (
      <div key={sectionIndex} className="mb-8">
        <div className="rounded-lg bg-white/[0.04] px-3 py-4">
          <h3 className="text-canvas-foreground text-lg font-medium tracking-tight">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="border-canvas-hairline grid grid-cols-2 border-b py-2 max-md:last:border-b-0 md:grid-cols-[2fr_1fr_1fr_1fr]"
          >
            <span className="text-canvas-foreground flex items-center px-3 py-3 font-medium">{feature.name}</span>
            {/* Mobile View - Only Selected Plan */}
            <div className="md:hidden">
              <div className="text-canvas-muted flex items-center gap-1 py-3">
                {(() => {
                  const value = [feature.free, feature.cloud, feature.enterprise][selectedPlan];
                  return typeof value === "boolean" ? (
                    value ? (
                      <Check className="text-canvas-accent size-5" />
                    ) : null
                  ) : (
                    <div className="flex items-center gap-1">
                      <Check className="text-canvas-accent size-4" />
                      <span>{value}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
            {/* Desktop View - All Plans */}
            <div className="hidden md:col-span-3 md:grid md:grid-cols-3">
              {[feature.free, feature.cloud, feature.enterprise].map((value, i) => (
                <div key={i} className="text-canvas-muted flex items-center py-3">
                  {typeof value === "boolean" ? (
                    value ? (
                      <Check className="text-canvas-accent size-5" />
                    ) : null
                  ) : (
                    <div className="flex items-center gap-1">
                      <Check className="text-canvas-accent size-4" />
                      <span>{value}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);

export default Pricing2;
