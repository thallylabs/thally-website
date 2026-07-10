"use client";

import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  LifeBuoy,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { SectionGrid, SectionLines } from "@/components/section-decor";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Category = "Support" | "Account" | "Features" | "Security" | "Other";

interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

const categoryMeta: Record<Category, { icon: typeof LifeBuoy; description: string; accent: string }> = {
  Support: {
    icon: LifeBuoy,
    description: "Plans, onboarding, and getting help from our team.",
    accent: "var(--chart-1)",
  },
  Account: {
    icon: User,
    description: "Invites, billing, roles, and account settings.",
    accent: "var(--chart-2)",
  },
  Features: {
    icon: Sparkles,
    description: "Formats, search, AI answers, and the API reference.",
    accent: "var(--chart-3)",
  },
  Security: {
    icon: Shield,
    description: "Self-hosting, SSO, compliance, and data handling.",
    accent: "var(--chart-5)",
  },
  Other: {
    icon: HelpCircle,
    description: "Migrations, refunds, and everything else.",
    accent: "var(--chart-4)",
  },
};

const faqItems: FAQItem[] = [
  {
    category: "Support",
    question: "Is there a free version?",
    answer:
      "Yes. Thally is MIT-licensed and free to self-host forever — unlimited pages, readers, and commercial use, no credit card required. Paid plans add managed hosting and team features.",
  },
  {
    category: "Support",
    question: "How do I get help if I get stuck?",
    answer:
      "Every plan includes community support on Discord and GitHub, plus searchable documentation. Cloud plans add priority support from a real person, and Enterprise customers get a dedicated account manager.",
  },
  {
    category: "Support",
    question: "What are your support hours?",
    answer:
      "Support is staffed Monday to Friday across US and EU time zones, with a typical first response under four hours on paid plans.",
  },
  {
    category: "Account",
    question: "How do I invite my team?",
    answer:
      "Open Settings → Members, paste in a list of email addresses, and pick a role — Owner, Editor, or Viewer. Invited teammates land straight in the right project.",
  },
  {
    category: "Account",
    question: "Can I change plans later?",
    answer:
      "Any time. Upgrades take effect immediately and downgrades apply at the end of your billing period — no emails required. You can also export everything and move to self-hosting whenever you like.",
  },
  {
    category: "Account",
    question: "What happens if I forget my password?",
    answer:
      "Use the “Forgot password” link on the login screen and we’ll email you a secure reset link. SSO users sign in through their identity provider.",
  },
  {
    category: "Features",
    question: "Which formats does every page ship in?",
    answer:
      "Each page is served as JSON, JSON-LD, and Markdown for machines, and as semantic HTML for readers, from the same URL, chosen by a content-negotiation header. Search indexes and embeddings are generated from the same graph.",
  },
  {
    category: "Features",
    question: "What can Thally AI do?",
    answer:
      "Thally AI answers questions with retrieval-grounded chat that cites the exact pages it quotes, and it can draft docs PRs from changes in your product repo — all opt-in and reviewable.",
  },
  {
    category: "Features",
    question: "How does the API reference work?",
    answer:
      "Drop an OpenAPI spec into your project and Thally generates endpoint pages with parameter tables, schemas, code samples, and an interactive Try-it console — regenerated on every build.",
  },
  {
    category: "Security",
    question: "Can I self-host Thally?",
    answer:
      "Yes — the whole engine is MIT-licensed and deploys anywhere with one command. There's no database; configuration is committed to git, so your docs stay entirely on infrastructure you control.",
  },
  {
    category: "Security",
    question: "Do you support SSO?",
    answer:
      "SAML and SCIM single sign-on are available on the Enterprise plan, alongside audit logs and role-based access with Owner, Editor, and Viewer roles.",
  },
  {
    category: "Security",
    question: "How is my data protected on Cloud?",
    answer:
      "All data is encrypted in transit (TLS 1.2+) and at rest (AES-256). We run regular backups and undergo independent penetration testing.",
  },
  {
    category: "Other",
    question: "Can I migrate from another docs tool?",
    answer:
      "Yes. The CLI migrates existing Markdown and MDX content, and the built-in link and anchor checks validate everything before you switch DNS.",
  },
  {
    category: "Other",
    question: "Do you offer refunds?",
    answer:
      "If Thally isn’t the right fit within your first 30 days on a paid plan, contact us and we’ll refund your most recent payment.",
  },
  {
    category: "Other",
    question: "Where can I see what you’re shipping?",
    answer:
      "Our public changelog is RSS-backed and updated with every release, so you — and your feed reader — can always see what just shipped.",
  },
];

const categories = Object.keys(categoryMeta) as Category[];

const helpLinks = [
  {
    title: "Contact support",
    description: "Reach a real person — we usually reply within a day.",
    href: "/contact",
    icon: MessageCircle,
  },
  {
    title: "Documentation",
    description: "Guides, API reference, and setup walkthroughs.",
    href: "#",
    icon: BookOpen,
  },
  {
    title: "Changelog",
    description: "See what shipped in the latest release — RSS included.",
    href: "#",
    icon: Sparkles,
  },
];

function FAQAccordion({ items, showCategory = false }: { items: FAQItem[]; showCategory?: boolean }) {
  if (items.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center px-6 py-16 text-center">
        <Search className="mb-4 size-8 opacity-40" />
        <p className="font-medium">No questions match your search.</p>
        <p className="mt-1 text-sm">Try a different keyword or browse by category.</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={`${item.category}-${item.question}`}
          value={`${item.category}-${i}`}
          className="border-border border-b px-6 last:border-0"
        >
          <AccordionTrigger className="py-5 text-start text-base font-medium hover:no-underline">
            <span className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              {showCategory && (
                <span
                  className="text-muted-foreground inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium"
                  style={{ borderColor: `color-mix(in oklab, ${categoryMeta[item.category].accent} 35%, transparent)` }}
                >
                  {item.category}
                </span>
              )}
              <span>{item.question}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export const FAQPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Support");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(normalized) ||
        item.answer.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized),
    );
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <section className="relative py-16 md:py-28 lg:py-32">
      <SectionGrid className="opacity-15" />
      <SectionLines />

      <div className="relative container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Answers for every part of Thally
            </h1>
            <p className="text-muted-foreground text-lg text-balance">
              Browse by topic or search below — plans, security, features, and getting your team up and running.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions..."
              className="bg-background h-11 pl-10"
              aria-label="Search FAQ"
            />
          </div>
        </div>

        {isSearching ? (
          <div className="border-border bg-card mt-10 overflow-hidden rounded-2xl border md:mt-14">
            <div className="border-border flex items-center justify-between border-b px-6 py-4">
              <p className="text-sm font-medium">
                {filteredItems.length} result{filteredItems.length === 1 ? "" : "s"} for &ldquo;{query.trim()}&rdquo;
              </p>
              <Button variant="ghost" size="sm" onClick={() => setQuery("")}>
                Clear search
              </Button>
            </div>
            <FAQAccordion items={filteredItems} showCategory />
          </div>
        ) : (
          <Tabs
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as Category)}
            orientation="vertical"
            className="mt-10 flex gap-6 max-lg:flex-col md:mt-14 lg:gap-10"
          >
            <TabsList className="bg-muted/60 flex h-auto w-full justify-start overflow-x-auto rounded-2xl p-1.5 lg:max-w-xs lg:flex-col lg:overflow-visible">
              {categories.map((category) => {
                const meta = categoryMeta[category];
                const Icon = meta.icon;
                const count = faqItems.filter((item) => item.category === category).length;

                return (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground w-full min-w-[220px] flex-1 justify-start rounded-xl px-4 py-3 text-start whitespace-normal transition-colors duration-300 data-[state=active]:shadow-sm lg:px-5 lg:py-4"
                  >
                    <div className="flex w-full items-start gap-3">
                      <div
                        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `color-mix(in oklab, ${meta.accent} 14%, transparent)`,
                          color: meta.accent,
                        }}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h2 className="font-display font-semibold">{category}</h2>
                          <span className="text-muted-foreground text-xs">{count}</span>
                        </div>
                        <p className="text-muted-foreground mt-1 text-sm text-pretty">{meta.description}</p>
                      </div>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => {
              const meta = categoryMeta[category];
              const Icon = meta.icon;
              const items = faqItems.filter((item) => item.category === category);

              return (
                <TabsContent
                  key={category}
                  value={category}
                  className="bg-card m-0 flex-1 overflow-hidden rounded-2xl border"
                >
                  <div
                    className="border-border flex items-start gap-4 border-b px-6 py-5"
                    style={{
                      background: `linear-gradient(135deg, color-mix(in oklab, ${meta.accent} 8%, transparent), transparent 55%)`,
                    }}
                  >
                    <div
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `color-mix(in oklab, ${meta.accent} 16%, transparent)`,
                        color: meta.accent,
                      }}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-semibold tracking-tight">{category}</h2>
                      <p className="text-muted-foreground mt-1 text-sm">{meta.description}</p>
                    </div>
                  </div>
                  <FAQAccordion items={items} />
                </TabsContent>
              );
            })}
          </Tabs>
        )}

        <div className="mt-16 md:mt-20">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Still need help?</h2>
              <p className="text-muted-foreground mt-1">
                Our team is here if you can&apos;t find what you&apos;re looking for.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {helpLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    "group border-border bg-muted/40 hover:bg-muted/70 flex flex-col rounded-2xl border p-5 transition-colors",
                  )}
                >
                  <Icon className="text-primary size-5" />
                  <h3 className="font-display mt-4 font-semibold">{link.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm text-pretty">{link.description}</p>
                  <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
