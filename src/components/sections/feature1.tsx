"use client";

import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";

const FEATURES = [
  {
    id: "guide",
    number: "01",
    label: "Product guides",
    description: "Write clean MDX with Steps, Tabs, Cards, Mermaid, callouts, and more.",
  },
  {
    id: "api",
    number: "02",
    label: "API reference",
    description: "Drop in an OpenAPI spec for parameter tables, samples, and a live Try-it console.",
  },
  {
    id: "changelog",
    number: "03",
    label: "Changelog & search",
    description: "Ship RSS changelogs, hybrid search, versioning, and translations from the same source.",
  },
] as const;

type FeatureId = (typeof FEATURES)[number]["id"];

const contentTransition = { type: "spring" as const, duration: 0.38, bounce: 0 };

const WORKSPACE_FILES: Record<FeatureId, string> = {
  guide: "quickstart.mdx",
  api: "openapi.yaml",
  changelog: "changelog.md",
};

function GuideDemo() {
  const steps = [
    ["1", "Install the CLI", "npm i -g thally"],
    ["2", "Write in MDX", "<Steps> <Tabs> <Card>"],
    ["3", "Preview locally", "thally dev"],
  ];

  return (
    <div className="mx-auto max-w-md py-4 md:py-8">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Quickstart.mdx</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">Build your first guide</h3>
      <div className="mt-8 space-y-0">
        {steps.map(([number, title, code], index) => (
          <div key={number} className="relative grid grid-cols-[2rem_1fr] gap-3 pb-7 last:pb-0">
            {index < steps.length - 1 && (
              <span aria-hidden className="bg-border absolute top-7 bottom-0 left-[15px] w-px" />
            )}
            <span className="border-border bg-background relative z-[1] flex size-8 items-center justify-center rounded-lg border font-mono text-xs">
              {number}
            </span>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <code className="bg-muted text-muted-foreground mt-2 inline-block rounded-md px-2 py-1 font-mono text-xs">
                {code}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApiDemo() {
  return (
    <div className="mx-auto max-w-md py-4 md:py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">API reference</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">Rotate access token</h3>
        </div>
        <span className="bg-chart-1/15 text-chart-5 rounded-md px-2 py-1 font-mono text-xs font-semibold">POST</span>
      </div>
      <div className="border-border mt-8 overflow-hidden rounded-xl border">
        <div className="border-border flex items-center gap-3 border-b px-4 py-3">
          <span className="bg-chart-1/15 text-chart-5 rounded px-2 py-0.5 font-mono text-[10px] font-semibold">
            POST
          </span>
          <code className="font-mono text-xs">/v1/tokens/rotate</code>
        </div>
        <div className="bg-muted/35 p-4 font-mono text-xs leading-6">
          <div className="flex items-center justify-between font-sans">
            <span className="text-xs font-semibold">Response</span>
            <span className="bg-chart-5/10 text-chart-5 rounded px-2 py-0.5 text-[10px] font-semibold">
              200 OK · 84ms
            </span>
          </div>
          <pre className="text-muted-foreground mt-4 overflow-hidden">{`{\n  "token": "thly_9f2c…",\n  "expires_in": 86400\n}`}</pre>
        </div>
      </div>
    </div>
  );
}

function ChangelogDemo() {
  return (
    <div className="mx-auto max-w-md py-4 md:py-8">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Changelog</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-tight">Webhook delivery retries</h3>
        <span className="bg-chart-1/15 text-chart-5 rounded-md px-2 py-1 font-mono text-xs font-semibold">v2.4</span>
      </div>
      <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
        Exponential backoff, a dead-letter queue, and per-event logs make failed deliveries easy to find and replay.
      </p>
      <div className="border-border mt-8 border-y py-4">
        <div className="border-border bg-background flex items-center gap-3 rounded-lg border px-4 py-3">
          <span aria-hidden className="text-muted-foreground text-sm">
            ⌕
          </span>
          <span className="text-sm font-medium">rotate tokens</span>
          <kbd className="border-border bg-muted text-muted-foreground ml-auto rounded border px-1.5 py-0.5 font-mono text-[10px]">
            ⌘ K
          </kbd>
        </div>
        <p className="text-muted-foreground mt-3 text-xs">12 results across guides, API reference, and changelog.</p>
      </div>
    </div>
  );
}

function WorkspaceContent({ feature }: { feature: FeatureId }) {
  return (
    <>
      {feature === "guide" && <GuideDemo />}
      {feature === "api" && <ApiDemo />}
      {feature === "changelog" && <ChangelogDemo />}
    </>
  );
}

function WorkspaceWindow({ feature }: { feature: FeatureId }) {
  return (
    <div className="border-border bg-secondary/45 rounded-[1.25rem] border p-1.5">
      <div className="border-border bg-card min-h-[30rem] overflow-hidden rounded-[calc(1.25rem-6px)] border">
        <div className="border-border flex items-center gap-1.5 border-b px-4 py-3">
          <span className="bg-muted-foreground/20 size-2.5 rounded-full" />
          <span className="bg-muted-foreground/20 size-2.5 rounded-full" />
          <span className="bg-muted-foreground/20 size-2.5 rounded-full" />
          <span className="text-muted-foreground ml-2 font-mono text-[11px]">{WORKSPACE_FILES[feature]}</span>
          <span className="text-muted-foreground/60 ml-auto font-mono text-[10px]">docs.thally.io</span>
        </div>
        <div className="px-6 py-7 sm:px-10">
          <WorkspaceContent feature={feature} />
        </div>
      </div>
    </div>
  );
}

function MobileFeatureDemo({ active, reduce }: { active: FeatureId; reduce: boolean | null }) {
  return (
    <div className="border-border bg-secondary/45 rounded-[1.25rem] border p-1.5 lg:hidden">
      <div className="border-border bg-card min-h-[30rem] overflow-hidden rounded-[calc(1.25rem-6px)] border">
        <div className="border-border flex items-center gap-1.5 border-b px-4 py-3">
          <span className="bg-muted-foreground/20 size-2.5 rounded-full" />
          <span className="bg-muted-foreground/20 size-2.5 rounded-full" />
          <span className="bg-muted-foreground/20 size-2.5 rounded-full" />
          <span className="text-muted-foreground ml-2 font-mono text-[11px]">docs.thally.io</span>
        </div>
        <div className="px-6 py-7 sm:px-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? undefined : { opacity: 0, y: -6, filter: "blur(3px)" }}
              transition={contentTransition}
            >
              <WorkspaceContent feature={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function WorkspaceCard({
  feature,
  index,
  active,
  progress,
  reduce,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
  active: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const relative = useTransform(progress, (value) => Math.min(value * 2.4, 2) - index);
  const x = useTransform(relative, (value) => {
    const distance = Math.min(Math.abs(value), 2);
    const amount = 52 * distance + 10 * distance * distance;
    return value < 0 ? amount : -amount;
  });
  const y = useTransform(relative, (value) => {
    const distance = Math.min(Math.abs(value), 2);
    const amount = 34 * distance + 7 * distance * distance;
    return value < 0 ? amount : -amount;
  });
  const rotate = useTransform(relative, (value) => -value * 4.5);
  const scale = useTransform(relative, (value) => 1 - Math.min(Math.abs(value), 1.6) * 0.045);
  const opacity = useTransform(relative, (value) => Math.max(0.34, 1 - Math.min(Math.abs(value), 1.6) * 0.35));
  const filter = useTransform(relative, (value) => `blur(${Math.min(2.2, Math.abs(value) * 1.2)}px)`);
  const isActive = index === active;

  return (
    <article
      aria-hidden={!isActive}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
      style={{ zIndex: isActive ? 3 : index < active ? 1 : 2, pointerEvents: isActive ? "auto" : "none" }}
    >
      <motion.div
        className="will-change-[transform,opacity,filter]"
        style={reduce ? { opacity: isActive ? 1 : 0 } : { x, y, rotate, scale, opacity, filter }}
      >
        <WorkspaceWindow feature={feature.id} />
      </motion.div>
    </article>
  );
}

function WorkspaceDeck({
  active,
  progress,
  reduce,
}: {
  active: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  return (
    <div className="relative hidden min-h-[34rem] lg:block" aria-live="polite">
      {FEATURES.map((feature, index) => {
        return (
          <WorkspaceCard
            key={feature.id}
            feature={feature}
            index={index}
            active={active}
            progress={progress}
            reduce={reduce}
          />
        );
      })}
      <p className="text-muted-foreground absolute right-3 bottom-0 font-mono text-[11px]">
        {String(active + 1).padStart(2, "0")} / 03
      </p>
    </div>
  );
}

export const Feature1 = () => {
  const [active, setActive] = useState<FeatureId>("guide");
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.4, restDelta: 0.0005 });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduce) return;
    const nextIndex = Math.min(FEATURES.length - 1, Math.round(Math.min(progress * 2.4, 2)));
    setActive((current) => (current === FEATURES[nextIndex].id ? current : FEATURES[nextIndex].id));
  });

  const activeIndex = FEATURES.findIndex((feature) => feature.id === active);

  const selectFeature = (feature: FeatureId, index: number) => {
    setActive(feature);
    if (reduce || !sectionRef.current || window.innerWidth < 1024) return;

    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollRange = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = Math.min(index / 2.4, 1);
    window.scrollTo({ top: sectionTop + scrollRange * targetProgress, behavior: "auto" });
  };

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className={`relative ${reduce ? "py-20 md:py-32" : "py-20 md:py-32 lg:h-[280vh] lg:py-0"}`}
    >
      <SectionGrid className="opacity-15" mask="linear-gradient(to_bottom,black,transparent_78%)" />
      <SectionLines />

      <div
        className={`relative container ${reduce ? "" : "lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:items-center"}`}
      >
        <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              title="Every page your product needs, from one source"
              description="Guides, API references, and changelogs are projections of the same typed content graph—written once in MDX and never maintained by hand."
              layout="stack"
            />

            <div className="border-border mt-10 border-t md:mt-14">
              {FEATURES.map((feature, index) => {
                const selected = active === feature.id;
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => selectFeature(feature.id, index)}
                    aria-pressed={selected}
                    className="border-border group grid w-full grid-cols-[2.5rem_1fr] gap-3 border-b py-5 text-left active:scale-[0.99]"
                  >
                    <span className="text-muted-foreground pt-1 font-mono text-[11px]">{feature.number}</span>
                    <span>
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-base font-semibold">{feature.label}</span>
                        <motion.span
                          aria-hidden
                          animate={{ opacity: selected ? 1 : 0, x: selected ? 0 : -4 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="text-chart-5 text-sm"
                        >
                          →
                        </motion.span>
                      </span>
                      <span className="text-muted-foreground mt-1 block max-w-md text-sm leading-relaxed">
                        {feature.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <MobileFeatureDemo active={active} reduce={reduce} />
          <WorkspaceDeck active={activeIndex} progress={smoothProgress} reduce={reduce} />
        </div>
      </div>
    </section>
  );
};
