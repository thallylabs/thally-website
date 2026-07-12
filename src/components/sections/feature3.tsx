"use client";

import { Bot, Braces, Search, Workflow } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { type ComponentType, useEffect, useRef, useState } from "react";

import {
  ApiReferenceView,
  ContentGraphView,
  ReadinessView,
  SearchConsoleView,
} from "@/components/illustrations/thally-ui";
import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AUTO_ADVANCE_MS = 7000;

const FEATURES: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  content: { title: string; description: string; view: ComponentType };
}[] = [
  {
    title: "Content graph",
    description: "One MDX source, every format projected from it.",
    icon: Workflow,
    content: {
      title: "Author once. Thally does the projections.",
      description:
        "Every page is parsed into a typed graph. JSON, JSON-LD, Markdown, HTML, search, and embeddings are all generated from it, never maintained by hand. One source of truth, no drift.",
      view: ContentGraphView,
    },
  },
  {
    title: "Search & answers",
    description: "Hybrid search and grounded chat, one index.",
    icon: Search,
    content: {
      title: "Search and answers, on the same index.",
      description:
        "A single ⌘K console spans full-text search, vector recall, and a grounded answer engine. Every reply cites the pages it came from, and it refuses to guess.",
      view: SearchConsoleView,
    },
  },
  {
    title: "API reference",
    description: "Your OpenAPI spec, rendered live and in sync.",
    icon: Braces,
    content: {
      title: "Drop in a spec, get a living reference.",
      description:
        "Parameter tables, request and response schemas, code samples, and a Try-it console, regenerated on every build so the reference never drifts from the API.",
      view: ApiReferenceView,
    },
  },
  {
    title: "Agent endpoints",
    description: "llms.txt, MCP, and per-page JSON by default.",
    icon: Bot,
    content: {
      title: "Legible to every machine reader.",
      description:
        "llms.txt, agent manifests, and per-page JSON ship with every deploy. Every site is also a remote MCP server at /api/mcp: attach it to any agent and your docs become native tools.",
      view: ReadinessView,
    },
  },
];

export const Feature3 = () => {
  const reduce = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tabsRef, { amount: 0.4 });

  const [active, setActive] = useState(FEATURES[0].title);
  const [auto, setAuto] = useState(true);

  const cycling = auto && inView && !reduce;

  useEffect(() => {
    if (!cycling) return;
    const id = setTimeout(() => {
      setActive((current) => {
        const next = (FEATURES.findIndex((f) => f.title === current) + 1) % FEATURES.length;
        return FEATURES[next].title;
      });
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, cycling]);

  return (
    <section id="workflows" className="bg-accent relative py-16 md:py-24 lg:py-32">
      <SectionGrid className="opacity-20" />
      <SectionLines />
      <div className="relative container">
        <SectionHeader
          title="One graph, read six different ways"
          description="There's no glue code between search, chat, the API reference, and the agent layer. They're the same content graph, projected for whoever is reading."
        />

        <Tabs
          ref={tabsRef}
          value={active}
          onValueChange={(value) => {
            setActive(value);
            setAuto(false);
          }}
          orientation="vertical"
          className="mt-8 flex gap-4 max-lg:flex-col-reverse md:mt-12 lg:mt-20"
        >
          <TabsList className="bg-muted flex h-auto justify-start overflow-x-auto rounded-xl p-1.5 lg:basis-1/4 lg:flex-col">
            {FEATURES.map((feature) => {
              const isActive = active === feature.title;
              return (
                <TabsTrigger
                  key={feature.title}
                  value={feature.title}
                  className="group text-muted-foreground data-[state=active]:text-foreground relative w-full min-w-[200px] flex-1 justify-start rounded-lg px-4 py-3 text-start whitespace-normal data-[state=active]:bg-transparent data-[state=active]:shadow-none lg:px-6 lg:py-4"
                >
                  {isActive && (
                    <motion.span
                      layoutId="feature-tab-highlight"
                      className="border-border bg-background absolute inset-0 rounded-lg border shadow-sm"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 34 }}
                    />
                  )}
                  <div className="relative">
                    <feature.icon className="text-muted-foreground group-data-[state=active]:text-primary size-7 transition-colors duration-300 md:size-8" />
                    <h3 className="font-display mt-3 font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{feature.description}</p>
                  </div>
                  {isActive && cycling && (
                    <span className="bg-border absolute inset-x-4 bottom-2 h-0.5 overflow-hidden rounded-full lg:inset-x-6">
                      <motion.span
                        key={active}
                        className="bg-primary/60 absolute inset-0 origin-left rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                      />
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {FEATURES.map((feature) => {
            const View = feature.content.view;
            return (
              <TabsContent
                className="border-border bg-card m-0 flex-1 overflow-hidden rounded-2xl border"
                key={feature.title}
                value={feature.title}
              >
                <motion.div
                  className="flex h-full flex-col lg:min-h-[480px]"
                  initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="max-w-2xl p-5 text-lg text-balance lg:p-7">
                    <h4 className="font-display inline font-semibold">{feature.content.title} </h4>
                    <span className="text-muted-foreground font-medium text-pretty">{feature.content.description}</span>
                  </div>
                  <div className="bg-muted/50 border-border flex flex-1 flex-col justify-center border-t p-4 lg:p-6">
                    <View />
                  </div>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
