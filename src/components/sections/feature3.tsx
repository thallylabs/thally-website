"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { type ComponentType, useEffect, useRef, useState } from "react";

import { Code, Mcp, Search, Structured } from "@/components/icons";
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
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  content: { title: string; description: string; view: ComponentType };
}[] = [
  {
    id: "content-graph",
    title: "Content graph",
    description: "One MDX source, every format projected from it.",
    icon: Structured,
    content: {
      title: "Author once. Thally does the projections.",
      description:
        "Every page becomes a typed graph. Thally generates JSON, JSON-LD, Markdown, HTML, search, and embeddings from it, so you maintain one source instead of six.",
      view: ContentGraphView,
    },
  },
  {
    id: "search-answers",
    title: "Search & answers",
    description: "Hybrid search and grounded chat, one index.",
    icon: Search,
    content: {
      title: "Search and answers, on the same index.",
      description:
        "One ⌘K console combines full-text search, vector recall, and grounded answers. Each answer cites its source pages and says when the docs do not contain an answer.",
      view: SearchConsoleView,
    },
  },
  {
    id: "api-reference",
    title: "API reference",
    description: "Your OpenAPI spec, rendered live and in sync.",
    icon: Code,
    content: {
      title: "Drop in a spec, get a living reference.",
      description:
        "Generate parameter tables, schemas, code samples, and a Try-it console from your OpenAPI spec on every build.",
      view: ApiReferenceView,
    },
  },
  {
    id: "agent-endpoints",
    title: "Agent endpoints",
    description: "llms.txt, MCP, and per-page JSON by default.",
    icon: Mcp,
    content: {
      title: "Legible to every machine reader.",
      description:
        "Every deploy includes llms.txt, agent manifests, per-page JSON, and a remote MCP server at /api/mcp. Connect the endpoint to give agents direct access to your docs as tools.",
      view: ReadinessView,
    },
  },
];

export const Feature3 = () => {
  const reduce = useReducedMotion();
  const tabsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tabsRef, { amount: 0.4 });

  const [active, setActive] = useState(FEATURES[0].id);
  const [auto, setAuto] = useState(true);

  const cycling = auto && inView && !reduce;

  useEffect(() => {
    if (!cycling) return;
    const id = setTimeout(() => {
      setActive((current) => {
        const next = (FEATURES.findIndex((f) => f.id === current) + 1) % FEATURES.length;
        return FEATURES[next].id;
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
          description="Search, chat, the API reference, and agent endpoints all use the same content graph. Each reader gets the format it needs without a separate pipeline."
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
              const isActive = active === feature.id;
              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
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
                key={feature.id}
                value={feature.id}
              >
                <motion.div
                  className="flex h-full flex-col lg:min-h-[480px]"
                  initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="max-w-2xl p-5 text-lg text-balance lg:p-7">
                    <h3 className="font-display inline font-semibold">{feature.content.title} </h3>
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
