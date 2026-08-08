"use client";

import { Calendar, Link2, MessageSquare } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiClaude,
  SiCursor,
  SiGithubcopilot,
  SiGooglegemini,
  SiPerplexity,
  SiV0,
  SiWindsurf,
} from "react-icons/si";

import { Check, GitPullRequest } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS } from "@/lib/site";

const AGENTS: Array<{ name: string; icon: IconType }> = [
  { name: "Claude", icon: SiClaude },
  { name: "Cursor", icon: SiCursor },
  { name: "Copilot", icon: SiGithubcopilot },
  { name: "Perplexity", icon: SiPerplexity },
  { name: "Gemini", icon: SiGooglegemini },
  { name: "v0", icon: SiV0 },
  { name: "Windsurf", icon: SiWindsurf },
];

function AgentMarquee() {
  return (
    <div className="logos-marquee mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] flex overflow-hidden">
      {[false, true].map((hidden) => (
        <div
          key={String(hidden)}
          className="logos-marquee-track flex min-w-max shrink-0 items-center"
          aria-hidden={hidden || undefined}
        >
          {AGENTS.map((agent) => (
            <span key={agent.name} className="mr-10 flex shrink-0 items-center gap-2.5 text-white/80">
              <agent.icon className="size-6" aria-hidden />
              <span className="font-display text-xl font-semibold tracking-tight whitespace-nowrap">
                {agent.name}
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Hero CTA pair: primary signup plus the live Track demo. */
function HeroCtas() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={DESTINATIONS.signup}
        className="btn-sheen text-canvas inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-lg font-medium"
      >
        Get Started
      </a>
      <Link
        href="/features/track#demo"
        className="btn-sheen inline-flex items-center justify-center rounded-lg border border-[#606060] px-7 py-3.5 text-lg font-medium text-white"
      >
        Try Thally
      </Link>
    </div>
  );
}

/* --- Docs-task board collage, template Hero-Dashborad treatment ------- */

type Person = { initials: string; tint: string };

const PEOPLE: Record<string, Person> = {
  ada: { initials: "AO", tint: "#8a6f52" },
  jah: { initials: "JC", tint: "#4d5f80" },
  bot: { initials: "TB", tint: "#5a6340" },
  mei: { initials: "MR", tint: "#7a5068" },
};

function Avatars({ people }: { people: Person[] }) {
  return (
    <span className="flex -space-x-1.5">
      {people.map((person) => (
        <span
          key={person.initials}
          className="flex size-[18px] items-center justify-center rounded-full text-[8px] font-semibold text-white/90 ring-[1.5px] ring-[#101318]"
          style={{ background: person.tint }}
        >
          {person.initials}
        </span>
      ))}
    </span>
  );
}

function Chip({ label, tone }: { label: string; tone: "high" | "med" | "low" | "kind" }) {
  const tones = {
    high: "bg-[#c4788a]/18 text-[#e0a3ae]",
    med: "bg-[#c2a068]/18 text-[#dcc08e]",
    low: "bg-[#7d9c86]/18 text-[#a8c7b2]",
    kind: "bg-white/[0.07] text-white/55",
  } as const;
  return <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${tones[tone]}`}>{label}</span>;
}

function Meta({ links, comments, due }: { links?: number; comments?: number; due?: string }) {
  return (
    <span className="flex items-center gap-2.5 text-[10px] text-white/35">
      {due && (
        <span className="flex items-center gap-1">
          <Calendar className="size-3" />
          {due}
        </span>
      )}
      {links !== undefined && (
        <span className="flex items-center gap-1">
          <Link2 className="size-3" />
          {links}
        </span>
      )}
      {comments !== undefined && (
        <span className="flex items-center gap-1">
          <MessageSquare className="size-3" />
          {comments}
        </span>
      )}
    </span>
  );
}

function ProgressRow({ value, tint = "#a9b578" }: { value: number; tint?: string }) {
  return (
    <div className="mt-2.5">
      <div className="flex items-center justify-between text-[10px] text-white/35">
        <span>Progress</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: tint }} />
      </div>
    </div>
  );
}

/** Card header: label chips on the left, task id on the right. */
function CardHead({ chips, id }: { chips: Array<[string, "high" | "med" | "low" | "kind"]>; id: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex gap-1">
        {chips.map(([label, tone]) => (
          <Chip key={label} label={label} tone={tone} />
        ))}
      </span>
      <span className="font-mono text-[9px] text-white/25">{id}</span>
    </div>
  );
}

const cardBase =
  "rounded-xl border border-white/[0.08] bg-[#0f1216]/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

/**
 * Dense docs-task collage anchored to the card bottom, standing in for
 * the template's Hero-Dashborad.png with Thally content.
 */
/**
 * Docs-task board anchored to the card bottom, standing in for the
 * template's Hero-Dashborad.png with Thally content.
 */
function DashboardCollage() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-x-0 bottom-0" style={{ perspective: "1200px" }}>
      <motion.div
        initial={reduced ? false : { rotateX: 24, y: 60, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="grid translate-y-6 grid-cols-3 items-end gap-3 px-4"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Column 1 */}
        <div className="space-y-3">
          <div className={cardBase}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/40">This week</span>
              <span className="text-[10px] text-white/40 tabular-nums">4 of 6 done</span>
            </div>
            <ProgressRow value={68} />
            <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
              <Avatars people={[PEOPLE.ada, PEOPLE.jah, PEOPLE.bot, PEOPLE.mei]} />
              <Meta links={10} comments={2} />
            </div>
          </div>
          <div className={cardBase}>
            <CardHead chips={[["Medium", "med"], ["Guides", "kind"]]} id="D-199" />
            <p className="mt-2 text-[12px] leading-snug font-medium text-white/90">Update webhook guide</p>
            <p className="mt-1 text-[10px] leading-relaxed text-white/40">
              Per-project secrets shipped in <span className="font-mono text-white/55">#517</span>.
            </p>
            <ProgressRow value={60} />
            <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
              <Avatars people={[PEOPLE.jah, PEOPLE.mei]} />
              <Meta due="Thu" comments={13} />
            </div>
          </div>
        </div>

        {/* Column 2, elevated */}
        <div className="-translate-y-4 space-y-3">
          <div className={cardBase}>
            <CardHead chips={[["High", "high"], ["API ref", "kind"]]} id="D-202" />
            <p className="mt-2 flex items-center gap-1.5 text-[12px] leading-snug font-medium text-white/90">
              <GitPullRequest className="size-3.5 shrink-0 text-white/50" />
              Impact analysis
            </p>
            <p className="mt-1 font-mono text-[10px] text-white/40">feat: per-project webhook secrets</p>
            {/* Diff preview instead of an empty tile */}
            <div className="mt-2.5 space-y-1 rounded-lg bg-black/50 p-2.5 font-mono text-[9px] leading-[1.6]">
              <p className="text-[#c48b95]">- Secrets are shared across projects.</p>
              <p className="text-[#a9b578]">+ Each project has its own secret.</p>
              <p className="text-white/25">@@ guides/webhooks.mdx</p>
            </div>
            <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
              <Avatars people={[PEOPLE.bot, PEOPLE.ada, PEOPLE.jah]} />
              <Meta links={1} comments={8} />
            </div>
          </div>
          <div className={cardBase}>
            <CardHead chips={[["Low", "low"], ["Changelog", "kind"]]} id="D-201" />
            <p className="mt-2 text-[12px] leading-snug font-medium text-white/90">Draft release notes</p>
            <p className="mt-1 text-[10px] leading-relaxed text-white/40">Auth changes and new endpoints.</p>
            <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2.5">
              <Avatars people={[PEOPLE.mei]} />
              <Meta due="Fri" />
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <div className={cardBase}>
            <CardHead chips={[["High", "high"], ["Guides", "kind"]]} id="D-203" />
            <p className="mt-2 text-[12px] leading-snug font-medium text-white/90">Reverify auth guide</p>
            <p className="mt-1 text-[10px] leading-relaxed text-white/40">Drift sweep flagged 3 sections.</p>
            <div className="mt-2.5 space-y-1.5 border-t border-white/[0.06] pt-2.5">
              {[
                ["Refresh tokens", true],
                ["Session limits", false],
                ["Error codes", false],
              ].map(([item, done]) => (
                <p
                  key={String(item)}
                  className={`flex items-center gap-2 text-[10px] ${done ? "text-white/30 line-through" : "text-white/60"}`}
                >
                  {done ? (
                    <Check className="size-3 shrink-0 text-[#a9b578]" />
                  ) : (
                    <span className="size-3 shrink-0 rounded-[3px] border border-white/25" />
                  )}
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <Avatars people={[PEOPLE.ada]} />
              <Meta due="Mon" links={2} />
            </div>
          </div>
          <div className={`${cardBase} border-[#7d8a9c]/20 bg-[#0d1116]/95`}>
            <CardHead chips={[["Review", "low"], ["Docs PR", "kind"]]} id="#84" />
            <p className="mt-2 font-mono text-[12px] leading-snug font-medium text-white/90">docs: webhook secrets</p>
            <p className="mt-1 text-[10px] leading-relaxed text-white/40">Drafted by Thally, awaiting review.</p>
            <div className="mt-2.5 flex items-center gap-1.5 border-t border-white/[0.06] pt-2.5">
              <span className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[9px] text-white/50">+42</span>
              <span className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[9px] text-white/50">-11</span>
              <span className="ml-auto">
                <Avatars people={[PEOPLE.bot, PEOPLE.jah]} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


const Hero = () => {
  return (
    <section className="bg-canvas px-2.5 pt-2 sm:px-5">
      {/* One continuous card: single illustration spanning both halves */}
      <div className="border-canvas-card-stroke relative mx-auto min-h-[560px] w-full max-w-[1860px] overflow-hidden rounded-[35px] border lg:min-h-[900px]">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-[position:50%_72%]"
          style={{ backgroundImage: "url(/template/background.webp)" }}
        />
        {/* Legibility washes: darker toward the headline side and base */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/20" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* minmax(0,…) so the columns keep the 48/52 split: bare fr tracks
            floor at min-content, and the split heading's inline-block words
            inflate that enough to squeeze the collage column in half. */}
        <div className="relative grid min-h-[inherit] lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)]">
          {/* Left: headline, capture form, trusted marquee */}
          <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-[70px]">
            <div className="max-w-[560px]">
            <SplitReveal as="h1" mode="words" onMount className="heading-hero text-white" stagger={0.4}>
              Every product change. Every knowledge surface. Automatically in sync.
            </SplitReveal>

            <Reveal delay={0.5} distance={30} className="mt-6">
              <p className="text-xl tracking-[-0.04em] text-white">Docs that keep up with your products</p>
              <div className="mt-5">
                <HeroCtas />
              </div>
            </Reveal>
          </div>

          <div className="relative mt-10 max-w-[560px]">
            <Reveal delay={0.7} distance={20}>
              <p className="mb-6 text-white">Built for the AI tools your readers already use</p>
              <AgentMarquee />
            </Reveal>
          </div>
        </div>

          {/* Right: the dashboard collage over the shared scene */}
          <div className="relative hidden lg:block">
            <DashboardCollage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
