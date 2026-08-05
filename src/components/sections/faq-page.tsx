"use client";

import { SearchX, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ArrowRight, Search } from "@/components/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { type Category, type FAQItem, faqItems } from "@/components/sections/faq-page-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    <Accordion type="single" collapsible className={cn("flex w-full flex-col gap-4", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={`${item.category}-${item.question}`}
          value={`${item.category}-${index}`}
          className="border-canvas-card-stroke rounded-[24px] border"
        >
          <AccordionTrigger className="text-canvas-foreground px-6 py-5 text-start text-[0.9375rem] font-medium hover:no-underline">
            {showCategory ? (
              <span className="flex flex-col gap-1.5">
                <span className="text-canvas-muted-2 text-[0.6875rem] font-semibold tracking-[0.06em] uppercase">
                  {item.category}
                </span>
                <span>{item.question}</span>
              </span>
            ) : (
              item.question
            )}
          </AccordionTrigger>
          <AccordionContent className="text-canvas-muted px-6 pb-6 text-sm leading-[1.6]">
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
      <section className="bg-canvas border-canvas-hairline relative overflow-hidden border-b py-16 md:pt-[5.5rem] md:pb-16">
        <div className="relative container text-center">
          <SplitReveal
            as="h1"
            mode="words"
            onMount
            className="heading-section text-canvas-foreground text-balance"
          >
            Find the answer you need
          </SplitReveal>
          <p className="text-canvas-muted mx-auto mt-[1.125rem] max-w-xl text-lg leading-[1.55] text-pretty">
            Search Thally questions or browse plans, security, product features, and team setup by topic.
          </p>

          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="text-canvas-muted-2 pointer-events-none absolute top-1/2 left-4 size-[1.125rem] -translate-y-1/2" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions…"
              aria-label="Search questions"
              className="border-canvas-card-stroke text-canvas-foreground placeholder:text-canvas-muted-2 h-[3.125rem] w-full rounded-2xl border bg-white/10 py-[0.9375rem] pr-11 pl-[2.875rem] text-[0.9375rem] transition-[border-color,background-color] duration-200 outline-none focus:border-white/40 focus:bg-white/15"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-canvas-muted hover:text-canvas-foreground absolute top-1/2 right-3 flex size-[1.625rem] -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-canvas relative">
        <div className="container pt-16 pb-[7.5rem]">
          {isSearching ? (
            <div className="mx-auto max-w-[47.5rem]">
              <p className="text-canvas-muted mb-1 text-sm font-medium">
                {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"} for &ldquo;{query.trim()}
                &rdquo;
              </p>

              {filteredItems.length > 0 ? (
                <FAQAccordion items={filteredItems} showCategory className="mt-4" />
              ) : (
                <div className="text-canvas-muted py-[4.5rem] text-center">
                  <SearchX className="mx-auto mb-3.5 size-[1.875rem]" />
                  <p className="text-[0.9375rem]">
                    No questions match your search. Try a different term or{" "}
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="text-canvas-foreground font-semibold underline underline-offset-3"
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
                <p className="text-canvas-muted-2 mb-3 text-xs font-semibold tracking-[0.08em] uppercase">Topics</p>
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
                              ? "border-canvas-foreground text-canvas-foreground"
                              : "border-canvas-hairline text-canvas-muted hover:text-canvas-foreground",
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
                      <div className="mb-5">
                        <h2 className="heading-card text-canvas-foreground">{category}</h2>
                        <p className="text-canvas-muted mt-1.5 text-sm leading-normal">
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

      <section className="bg-canvas relative overflow-hidden pb-32">
        <div className="container">
          <div className="border-canvas-card-stroke relative overflow-hidden rounded-[32px] border px-6 py-12 text-center sm:px-12 sm:py-14">
            <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4">
              <h2 className="heading-card text-canvas-foreground">Need a hand?</h2>
              <p className="text-canvas-muted text-[1.0625rem] leading-[1.55]">
                If you can&apos;t find what you need, contact our team or ask the grounded AI assistant in the docs. We
                usually reply within one business day.
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium transition-colors hover:bg-white/90"
                >
                  Contact support
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={DESTINATIONS.docs}
                  className="border-canvas-card-stroke text-canvas-foreground inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-medium transition-colors hover:bg-white/10"
                >
                  Read the docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
