"use client";

import { RefreshCw as RotateCcw } from "@/components/icons";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  SiAstro,
  SiCloudflare,
  SiDocker,
  SiDocusaurus,
  SiGitbook,
  SiMarkdown,
  SiMintlify,
  SiNetlify,
  SiNextra,
  SiVercel,
  SiVitepress,
} from "react-icons/si";

import { ThallyMark } from "@/components/layout/logo";
import { SectionGrid, SectionHeader } from "@/components/section-decor";
import { cn } from "@/lib/utils";

const COMMAND = "npx create-thally migrate github.com/acme/docs";
const FINAL_LINE = "cd acme-docs && npm run dev";

const STEPS = [
  { running: "Detecting current platform", done: "Detected Mintlify (mint.json)" },
  { running: "Converting pages to MDX", done: "52 pages converted to clean MDX" },
  { running: "Rebuilding navigation", done: "Navigation rebuilt, redirects carried over" },
  { running: "Wiring OpenAPI spec", done: "OpenAPI spec wired to the API Reference tab" },
];

/* Orbit ring radius as a percentage of the container, per-chip nudged for organic rhythm. */
const ORBIT_RADIUS = 40;

const SOURCES = [
  { name: "Mintlify", Icon: SiMintlify, color: "#0D9373", angle: -90, r: 1 },
  { name: "Docusaurus", Icon: SiDocusaurus, color: "#3ECC5F", angle: -38, r: 0.95 },
  { name: "GitBook", Icon: SiGitbook, color: "#3884FF", angle: 14, r: 1.03 },
  { name: "Nextra", Icon: SiNextra, color: undefined, angle: 64, r: 0.94 },
  { name: "VitePress", Icon: SiVitepress, color: "#646CFF", angle: 118, r: 1.01 },
  { name: "Starlight", Icon: SiAstro, color: "#BC52EE", angle: 166, r: 0.96 },
  { name: "Markdown", Icon: SiMarkdown, color: undefined, angle: -144, r: 1.04 },
];

const TARGETS = [
  { name: "Vercel", Icon: SiVercel, color: undefined },
  { name: "Netlify", Icon: SiNetlify, color: "#00C7B7" },
  { name: "Cloudflare", Icon: SiCloudflare, color: "#F38020" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
];

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function Spinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % SPINNER_FRAMES.length), 80);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="w-4 shrink-0 text-white/45 select-none" aria-hidden>
      {SPINNER_FRAMES[frame]}
    </span>
  );
}

function Caret({ blink }: { blink: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "-mb-0.5 ml-1 inline-block h-3.5 w-[7px] bg-white/60",
        blink && "animate-[caret-blink_1.1s_steps(1)_infinite]",
      )}
    />
  );
}

function MigrationTerminal() {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.45 });

  const [typed, setTyped] = useState(0);
  const [doneSteps, setDoneSteps] = useState(0);
  const [stepRunning, setStepRunning] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>((resolve) => timers.push(setTimeout(resolve, ms)));

    (async () => {
      setTyped(0);
      setDoneSteps(0);
      setStepRunning(false);
      setFinalVisible(false);

      await wait(600);
      for (let i = 1; i <= COMMAND.length; i++) {
        if (cancelled) return;
        setTyped(i);
        await wait(COMMAND[i - 1] === " " ? 64 : 26);
      }

      await wait(450);
      setStepRunning(true);
      for (let s = 0; s < STEPS.length; s++) {
        if (cancelled) return;
        setDoneSteps(s);
        await wait(640 + s * 90);
        setDoneSteps(s + 1);
      }
      setStepRunning(false);

      await wait(320);
      if (!cancelled) setFinalVisible(true);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce, runId]);

  const typedCount = reduce ? COMMAND.length : typed;
  const stepsDone = reduce ? STEPS.length : doneSteps;
  const showFinal = reduce ? true : finalVisible;
  const isTyping = !reduce && inView && typed < COMMAND.length;

  return (
    <div ref={cardRef} className="border-border bg-secondary/50 rounded-[1.25rem] border p-1.5 shadow-sm">
      <div className="overflow-hidden rounded-[calc(1.25rem-6px)] border border-white/10 bg-[oklch(0.23_0.02_155)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-2 font-mono text-[11px] text-white/50">migrate.sh</span>
          {showFinal && !reduce && (
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setRunId((r) => r + 1)}
              aria-label="Replay migration demo"
              className="ml-auto rounded-md p-1 text-white/40 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 hover:text-white/80 active:scale-[0.96]"
            >
              <RotateCcw className="size-3.5" />
            </motion.button>
          )}
        </div>

        <div className="min-h-[232px] space-y-2.5 p-5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
          <p className="flex items-start gap-2">
            <span className="text-white/40 select-none">$</span>
            <span className="font-semibold break-all text-white/90">
              {COMMAND.slice(0, typedCount)}
              {!showFinal && <Caret blink={!isTyping} />}
            </span>
          </p>

          {STEPS.map((step, i) => {
            if (i < stepsDone) {
              return (
                <p key={step.done} className="flex items-start gap-2">
                  <motion.span
                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className="w-4 shrink-0 select-none"
                    style={{ color: "var(--chart-1)" }}
                  >
                    ✓
                  </motion.span>
                  <span className="text-white/70">{step.done}</span>
                </p>
              );
            }
            if (stepRunning && i === stepsDone) {
              return (
                <motion.p
                  key={step.running}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Spinner />
                  <span className="text-white/50">{step.running}…</span>
                </motion.p>
              );
            }
            return null;
          })}

          {showFinal && (
            <motion.p
              className="flex items-start gap-2"
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: "var(--chart-1)" }}
            >
              <span className="w-4 shrink-0 select-none">→</span>
              <span>
                {FINAL_LINE}
                {!reduce && <Caret blink />}
              </span>
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

function MigrationOrbit() {
  const reduce = useReducedMotion();

  return (
    <div
      className="group relative mx-auto mt-4 aspect-square w-full max-w-[26rem]"
      role="img"
      aria-label="Mintlify, Docusaurus, GitBook, Nextra, VitePress, Starlight, and plain Markdown orbiting the Thally logo"
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, color-mix(in oklab, var(--chart-2) 16%, transparent), transparent 70%)",
        }}
      />

      <motion.svg
        aria-hidden
        viewBox="0 0 100 100"
        className="text-border absolute inset-0 size-full"
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <circle
          cx="50"
          cy="50"
          r={ORBIT_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.4"
          strokeDasharray="2.5 4"
        />
      </motion.svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          <div className="border-border bg-secondary/70 rounded-full border p-2 shadow-sm">
            <div className="border-border bg-card flex size-20 items-center justify-center rounded-full border shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <ThallyMark className="size-9" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 animate-[orbit-spin_100s_linear_infinite] group-hover:[animation-play-state:paused]">
        {SOURCES.map((source, i) => {
          const rad = (source.angle * Math.PI) / 180;
          const left = 50 + ORBIT_RADIUS * source.r * Math.cos(rad);
          const top = 50 + ORBIT_RADIUS * source.r * Math.sin(rad);
          return (
            <div
              key={source.name}
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="animate-[orbit-spin-reverse_100s_linear_infinite] group-hover:[animation-play-state:paused]">
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.6, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.15 + i * 0.07 }}
                >
                  <span className="border-border bg-card flex items-center gap-2 rounded-full border py-1.5 pr-1.5 pl-1.5 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 sm:pr-3.5 sm:pl-3">
                    <source.Icon
                      className={cn("size-4 shrink-0", !source.color && "text-foreground")}
                      style={source.color ? { color: source.color } : undefined}
                      aria-hidden
                    />
                    <span className="hidden text-xs font-medium whitespace-nowrap sm:inline">{source.name}</span>
                  </span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const Migrate = () => {
  return (
    <section id="migrate" className="section-padding relative">
      <SectionGrid className="opacity-15" mask="linear-gradient(to bottom,black,transparent_70%)" />

      <div className="relative container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              title="Move in with one command. Leave whenever you want."
              description="The migrator detects your current platform, converts every page to clean MDX, rebuilds the navigation, carries your redirects, and wires up your OpenAPI spec. No manual copying, no reformatting."
              layout="stack"
            />
            <MigrationOrbit />
          </div>

          <div>
            <MigrationTerminal />

            <div className="mt-8">
              <p className="text-muted-foreground text-sm font-medium">Deploys to</p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                {TARGETS.map((target) => (
                  <li key={target.name} className="flex items-center gap-2 text-sm font-medium">
                    <target.Icon
                      className={cn("size-4 shrink-0", !target.color && "text-foreground")}
                      style={target.color ? { color: target.color } : undefined}
                      aria-hidden
                    />
                    {target.name}
                  </li>
                ))}
                <li className="text-sm font-medium">Static export</li>
              </ul>
              <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed">
                Your docs are a Next.js repo you own, MIT licensed. There is no hosted middleman to outgrow and nothing
                to export your way out of later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
