"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
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

/** Email-capture pill matching the template form: glass input + white button. */
function CaptureForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="relative"
      onSubmit={(event) => {
        event.preventDefault();
        const target = new URL(DESTINATIONS.signup);
        if (email) target.searchParams.set("email", email);
        window.location.href = target.toString();
      }}
    >
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Type your work email"
        aria-label="Work email"
        className="min-h-[76px] w-full rounded-[15px] border border-white/15 bg-white/15 pr-[220px] pl-4 text-white backdrop-blur-2xl placeholder:text-white/70 focus:border-white focus:outline-none max-sm:pr-4"
      />
      <div className="absolute inset-y-0 right-0 flex p-2 max-sm:hidden">
        <button
          type="submit"
          className="btn-sheen text-canvas flex items-center rounded-lg bg-white px-5 text-lg font-medium"
        >
          Create your docs site
        </button>
      </div>
      <button
        type="submit"
        className="btn-sheen text-canvas mt-2 w-full rounded-lg bg-white px-5 py-3 text-lg font-medium sm:hidden"
      >
        Create your docs site
      </button>
    </form>
  );
}

/* --- Dashboard collage, template Hero-Dashborad treatment ------------- */

function Avatars({ tints }: { tints: string[] }) {
  return (
    <span className="flex -space-x-1.5">
      {tints.map((tint) => (
        <span key={tint} className="size-5 rounded-full border border-black/40" style={{ background: tint }} />
      ))}
    </span>
  );
}

function Chip({ label, tone }: { label: string; tone: "high" | "med" | "low" | "kind" }) {
  const tones = {
    high: "bg-[#ff8da1]/20 text-[#ffb3c0]",
    med: "bg-[#ffd58a]/20 text-[#ffe0a8]",
    low: "bg-[#8ecf9a]/20 text-[#b2e0bb]",
    kind: "bg-white/10 text-white/70",
  } as const;
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tones[tone]}`}>{label}</span>;
}

function Meta({ links, comments }: { links: number; comments: number }) {
  return (
    <span className="flex items-center gap-2.5 text-[10px] text-white/45">
      <span>&#128279; {links}</span>
      <span>&#128172; {comments}</span>
    </span>
  );
}

function ProgressRow({ value, tint = "#c6f24e" }: { value: number; tint?: string }) {
  return (
    <div className="mt-2.5">
      <div className="flex items-center justify-between text-[10px] text-white/45">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: tint }} />
      </div>
    </div>
  );
}

const cardBase = "rounded-xl border border-white/10 bg-[#101318]/95 p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

/**
 * Dense docs-task collage anchored to the card bottom, standing in for
 * the template's Hero-Dashborad.png with Thally content.
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
              <span className="text-[10px] text-white/45">Progress</span>
              <span className="text-[10px] text-white/45">68%</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="bg-canvas-accent h-full w-2/3 rounded-full" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <Avatars tints={["#e8b28b", "#a3b9e2", "#9fd9b4", "#d9a3c9"]} />
              <Meta links={10} comments={2} />
            </div>
          </div>
          <div className={cardBase}>
            <div className="flex items-center justify-between">
              <span className="flex gap-1">
                <Chip label="Medium" tone="med" />
                <Chip label="Guides" tone="kind" />
              </span>
              <span className="text-[10px] text-white/40">D-199</span>
            </div>
            <p className="mt-2 text-[13px] font-semibold text-white">Update webhook guide</p>
            <p className="mt-0.5 text-[11px] text-white/50">Per-project secrets shipped in #517.</p>
            <ProgressRow value={60} />
            <div className="mt-2 flex items-center justify-between">
              <Avatars tints={["#a3b9e2", "#9fd9b4"]} />
              <Meta links={2} comments={13} />
            </div>
          </div>
        </div>

        {/* Column 2, elevated like the template's flower card */}
        <div className="-translate-y-4 space-y-3">
          <div className={cardBase}>
            <div className="flex items-center justify-between">
              <span className="flex gap-1">
                <Chip label="High" tone="high" />
                <Chip label="API ref" tone="kind" />
              </span>
              <span className="text-[10px] text-white/40">D-202</span>
            </div>
            <div className="mt-2.5 flex items-center justify-center rounded-lg bg-black py-6">
              <GitPullRequest className="text-canvas-accent size-10" />
            </div>
            <p className="mt-2.5 text-[13px] font-semibold text-white">Impact analysis</p>
            <p className="mt-0.5 text-[11px] text-white/50">feat: per-project webhook secrets</p>
            <div className="mt-2 flex items-center justify-between">
              <Avatars tints={["#e8b28b", "#d9a3c9", "#a3b9e2"]} />
              <Meta links={1} comments={8} />
            </div>
          </div>
          <div className={cardBase}>
            <div className="flex items-center justify-between">
              <span className="flex gap-1">
                <Chip label="Low" tone="low" />
                <Chip label="Changelog" tone="kind" />
              </span>
              <span className="text-[10px] text-white/40">D-201</span>
            </div>
            <p className="mt-2 text-[13px] font-semibold text-white">Draft release notes</p>
            <p className="mt-0.5 text-[11px] text-white/50">Auth changes and new endpoints.</p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-3">
          <div className={cardBase}>
            <div className="flex items-center justify-between">
              <span className="flex gap-1">
                <Chip label="High" tone="high" />
                <Chip label="Guides" tone="kind" />
              </span>
              <span className="text-[10px] text-white/40">D-203</span>
            </div>
            <p className="mt-2 text-[13px] font-semibold text-white">Reverify auth guide</p>
            <p className="mt-0.5 text-[11px] text-white/50">Drift sweep flagged 3 sections.</p>
            <div className="mt-2.5 space-y-1.5">
              {["Refresh tokens", "Session limits", "Error codes"].map((item, i) => (
                <p key={item} className="flex items-center gap-2 text-[11px] text-white/60">
                  {i === 0 ? (
                    <Check className="text-canvas-accent size-3" />
                  ) : (
                    <span className="size-3 rounded-full border border-white/30" />
                  )}
                  {item}
                </p>
              ))}
              <p className="flex items-center gap-2 text-[11px] text-white/40">
                <span className="text-sm leading-none">+</span> Add subtask
              </p>
            </div>
          </div>
          <div className={`${cardBase} border-[#b9a3e2]/25 bg-[#171225]/95`}>
            <div className="flex items-center justify-between">
              <span className="flex gap-1">
                <Chip label="Review" tone="low" />
                <Chip label="Docs PR" tone="kind" />
              </span>
              <span className="text-[10px] text-white/40">#84</span>
            </div>
            <p className="mt-2 text-[13px] font-semibold text-white">docs: webhook secrets</p>
            <p className="mt-0.5 text-[11px] text-white/50">Drafted by Thally, awaiting review.</p>
            <ProgressRow value={40} tint="#b9a3e2" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const Hero = () => {
  return (
    <section className="bg-canvas px-2.5 pt-2 sm:px-5">
      <div className="mx-auto grid w-full max-w-[1860px] gap-2.5 lg:grid-cols-[48fr_52fr]">
        {/* Left card: headline over the night illustration */}
        <div className="border-canvas-card-stroke relative flex min-h-[560px] flex-col justify-between overflow-hidden rounded-[35px] border p-6 sm:p-10 lg:min-h-[900px] lg:p-[70px]">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-[position:18%_100%]"
            style={{ backgroundImage: "url(/template/background.webp)" }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/10" />

          <div className="relative max-w-[560px]">
            <SplitReveal as="h1" mode="words" onMount className="heading-hero text-white" stagger={0.4}>
              Every product change. Every knowledge surface. Automatically in sync.
            </SplitReveal>

            <Reveal delay={0.5} distance={30} className="mt-6">
              <p className="text-xl tracking-[-0.04em] text-white">Docs that keep up with the product</p>
              <div className="mt-5">
                <CaptureForm />
              </div>
              <div className="mt-3">
                <Link
                  href="/features/track"
                  className="text-sm font-medium text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  See how Thally works
                </Link>
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

        {/* Right card: illustration with the dashboard collage */}
        <div className="border-canvas-card-stroke relative hidden min-h-[900px] overflow-hidden rounded-[35px] border lg:block">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-[position:82%_38%]"
            style={{ backgroundImage: "url(/template/background.webp)" }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/30" />
          <DashboardCollage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
