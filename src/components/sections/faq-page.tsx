"use client";

import { SearchX, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ArrowRight, Search } from "@/components/icons";
import { SectionGrid } from "@/components/section-decor";
import { type Category, type FAQItem, faqItems } from "@/components/sections/faq-page-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DESTINATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const categoryMeta: Record<Category, { id: string; description: string }> = {
  Support: {
    id: "support",
    description: "Plans, onboarding, and getting help from our team.",
  },
  Account: {
    id: "account",
    description: "Invites, billing, roles, and account settings.",
  },
  Features: {
    id: "features",
    description: "Formats, search, AI answers, and the API reference.",
  },
  Security: {
    id: "security",
    description: "Self-hosting, SSO, compliance, and data handling.",
  },
  Other: {
    id: "other",
    description: "Migrations, refunds, and everything else.",
  },
};

const categories = Object.keys(categoryMeta) as Category[];

function FAQAccordion({
  items,
  showCategory = false,
  className,
}: {
  items: FAQItem[];
  showCategory?: boolean;
  className?: string;
}) {
  return (
    <Accordion type="single" collapsible className={cn("border-border w-full border-t", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={`${item.category}-${item.question}`}
          value={`${item.category}-${index}`}
          className="border-border"
        >
          <AccordionTrigger className="py-4 text-start text-sm font-medium hover:no-underline">
            {showCategory ? (
              <span className="flex flex-col gap-1.5">
                <span className="text-muted-foreground text-[0.6875rem] font-semibold tracking-[0.06em] uppercase">
                  {item.category}
                </span>
                <span>{item.question}</span>
              </span>
            ) : (
              item.question
            )}
          </AccordionTrigger>
          <AccordionContent className="text-foreground pb-4 text-sm leading-[1.6]">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export const FAQPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Support");
  const sectionRefs = useRef<Partial<Record<Category, HTMLElement | null>>>({});

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const filteredItems = useMemo(() => {
    if (!normalizedQuery) return [];

    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(normalizedQuery) || item.answer.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  useEffect(() => {
    if (isSearching) return;

    const updateActiveCategory = () => {
      const marker = window.scrollY + 160;
      let current = categories[0];

      categories.forEach((category) => {
        const section = sectionRefs.current[category];
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= marker) current = category;
      });

      setActiveCategory(current);
    };

    window.addEventListener("scroll", updateActiveCategory, { passive: true });
    updateActiveCategory();

    return () => window.removeEventListener("scroll", updateActiveCategory);
  }, [isSearching]);

  const scrollToCategory = (category: Category) => {
    const section = sectionRefs.current[category];
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <section className="border-border relative overflow-hidden border-b py-16 md:pt-[5.5rem] md:pb-16">
        <SectionGrid className="[mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_68%)] opacity-40" />

        <div className="relative container text-center">
          <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-balance">
            Find the answer you need
          </h1>
          <p className="text-muted-foreground mx-auto mt-[1.125rem] max-w-xl text-lg leading-[1.55] text-pretty">
            Search Thally questions or browse plans, security, product features, and team setup by topic.
          </p>

          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-[1.125rem] -translate-y-1/2" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions…"
              aria-label="Search questions"
              className="border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-ring/60 focus:ring-ring/20 h-[3.125rem] w-full rounded-lg border py-[0.9375rem] pr-11 pl-[2.875rem] text-[0.9375rem] shadow-sm transition-[border-color,box-shadow] duration-200 outline-none focus:ring-3"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="bg-muted text-muted-foreground hover:text-foreground absolute top-1/2 right-3 flex size-[1.625rem] -translate-y-1/2 items-center justify-center rounded-full transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container pt-16 pb-[7.5rem]">
          {isSearching ? (
            <div className="mx-auto max-w-[47.5rem]">
              <p className="text-muted-foreground mb-1 text-sm font-medium">
                {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"} for &ldquo;{query.trim()}
                &rdquo;
              </p>

              {filteredItems.length > 0 ? (
                <FAQAccordion items={filteredItems} showCategory className="mt-2" />
              ) : (
                <div className="text-muted-foreground py-[4.5rem] text-center">
                  <SearchX className="mx-auto mb-3.5 size-[1.875rem]" />
                  <p className="text-[0.9375rem]">
                    No questions match your search. Try a different term or{" "}
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="text-foreground font-semibold underline underline-offset-3"
                    >
                      browse all topics
                    </button>
                    .
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-[13.75rem_minmax(0,1fr)] items-start gap-[4.5rem] max-[860px]:grid-cols-1 max-[860px]:gap-8">
              <nav className="sticky top-24 max-[860px]:static" aria-label="FAQ topics">
                <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.08em] uppercase">Topics</p>
                <ul className="flex list-none flex-col p-0 max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:gap-2">
                  {categories.map((category) => {
                    const isActive = category === activeCategory;
                    const count = faqItems.filter((item) => item.category === category).length;

                    return (
                      <li key={category} className="max-[860px]:shrink-0">
                        <button
                          type="button"
                          onClick={() => scrollToCategory(category)}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "flex w-full items-center justify-between gap-2.5 border-l-2 bg-transparent px-3 py-[0.5625rem] text-left text-sm font-medium transition-colors duration-150 max-[860px]:rounded-full max-[860px]:border max-[860px]:px-3.5 max-[860px]:py-[0.4375rem]",
                            isActive
                              ? "border-foreground text-foreground"
                              : "border-border text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {category}
                          <span className="text-xs font-medium tabular-nums opacity-70">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex min-w-0 flex-col gap-14">
                {categories.map((category) => {
                  const items = faqItems.filter((item) => item.category === category);

                  return (
                    <section
                      key={category}
                      id={categoryMeta[category].id}
                      ref={(element) => {
                        sectionRefs.current[category] = element;
                      }}
                      className="scroll-mt-24"
                    >
                      <div className="mb-2">
                        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{category}</h2>
                        <p className="text-muted-foreground mt-1.5 text-sm leading-normal">
                          {categoryMeta[category].description}
                        </p>
                      </div>
                      <FAQAccordion items={items} />
                    </section>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden pb-32">
        <div className="container">
          <div className="border-border bg-card relative overflow-hidden rounded-xl border px-6 py-12 text-center shadow-sm sm:px-12 sm:py-14">
            <SectionGrid className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-40" />
            <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4">
              <h2 className="font-display text-3xl font-semibold tracking-[-0.02em]">Need a hand?</h2>
              <p className="text-muted-foreground text-[1.0625rem] leading-[1.55]">
                If you can&apos;t find what you need, contact our team or ask the grounded AI assistant in the docs. We
                usually reply within one business day.
              </p>
              <div className="mt-1 flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href="/contact">
                    Contact support
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={DESTINATIONS.docs}>Read the docs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
