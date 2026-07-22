"use client";

import Link from "next/link";
import { useState } from "react";

import { Check, ChevronsUpDown } from "@/components/icons";
import { DESTINATIONS } from "@/lib/site";

import { Button } from "../ui/button";
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
    href: DESTINATIONS.docsQuickstart,
    button: {
      text: "Read the quickstart",
      variant: "outline" as const,
    },
  },
  {
    name: "Thally Cloud",
    href: DESTINATIONS.signup,
    button: {
      text: "Start 14-day trial",
      variant: "outline" as const,
    },
  },
  {
    name: "Enterprise",
    href: DESTINATIONS.sales,
    button: {
      text: "Talk to sales",
      variant: "outline" as const,
    },
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
        free: "Self-hosted",
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
        free: true,
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
        name: "Thally-drafted updates",
        free: false,
        cloud: true,
        enterprise: true,
      },
      {
        name: "Managed hosting",
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

const Pricing2 = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Thally Cloud

  return (
    <section className="pb-16 md:pb-28 lg:pb-32">
      <div className="container">
        <PlanHeaders selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} />
        <div className="mt-6 lg:mt-12">
          <FeatureSections selectedPlan={selectedPlan} />
        </div>
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
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between py-4">
            <CollapsibleTrigger className="flex items-center gap-2" aria-label="Toggle pricing plans">
              <h3 className="text-2xl font-semibold">{pricingPlans[selectedPlan].name}</h3>
              <ChevronsUpDown
                className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <Button asChild variant="outline" size="sm">
              <Link href={pricingPlans[selectedPlan].href}>{pricingPlans[selectedPlan].button.text}</Link>
            </Button>
          </div>
          <CollapsibleContent className="flex flex-col space-y-2 p-2">
            {pricingPlans.map(
              (plan, index) =>
                index !== selectedPlan && (
                  <Button
                    size="lg"
                    variant="secondary"
                    key={index}
                    onClick={() => {
                      onPlanChange(index);
                      setIsOpen(false);
                    }}
                  >
                    {plan.name}
                  </Button>
                ),
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop View */}
      <div className="grid grid-cols-4 max-md:hidden">
        <div className="col-span-1"></div>
        {pricingPlans.map((plan, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
            <Button asChild variant="outline" className="w-fit">
              <Link href={plan.href}>{plan.button.text}</Link>
            </Button>
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
        <div className="bg-muted-foreground/5 px-2 py-4">
          <h3 className="text-lg font-semibold">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="text-primary/90 grid grid-cols-2 border-b py-2 font-medium max-md:last:border-b-0 md:grid-cols-4"
          >
            <span className="flex items-center py-3">{feature.name}</span>
            {/* Mobile View - Only Selected Plan */}
            <div className="md:hidden">
              <div className="flex items-center gap-1 py-3">
                {(() => {
                  const value = [feature.free, feature.cloud, feature.enterprise][selectedPlan];
                  return typeof value === "boolean" ? (
                    value ? (
                      <Check className="text-primary/80 size-5" />
                    ) : null
                  ) : (
                    <div className="flex items-center gap-1">
                      <Check className="text-primary/80 size-4" />
                      <span>{value}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
            {/* Desktop View - All Plans */}
            <div className="hidden md:col-span-3 md:grid md:grid-cols-3">
              {[feature.free, feature.cloud, feature.enterprise].map((value, i) => (
                <div key={i} className="flex items-center py-3">
                  {typeof value === "boolean" ? (
                    value ? (
                      <Check className="text-primary/80 size-5" />
                    ) : null
                  ) : (
                    <div className="flex items-center gap-1">
                      <Check className="text-primary/80 size-4" />
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
