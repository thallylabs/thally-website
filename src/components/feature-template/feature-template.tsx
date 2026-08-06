"use client";

/**
 * Shared feature-page building blocks for the marketing design system:
 * feature.html: the banner with a glass-framed visual that tilts in on
 * scroll under a drifting comet, the sticky-stacking pastel process
 * cards with their numbered rail, the growth/quote panels, and the
 * partner logo grid.
 */

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { type ReactNode, useRef, useState } from "react";
import {
  SiClaude,
  SiCursor,
  SiGithubcopilot,
  SiGooglegemini,
  SiPerplexity,
  SiV0,
  SiWindsurf,
} from "react-icons/si";

import { ArrowRight, Plus } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Banner                                                              */
/* ------------------------------------------------------------------ */

type Cta = { label: string; href: string };

const TRUSTED_LOGOS = [
  { name: "Claude", Icon: SiClaude },
  { name: "Cursor", Icon: SiCursor },
  { name: "Copilot", Icon: SiGithubcopilot },
  { name: "Perplexity", Icon: SiPerplexity },
  { name: "Gemini", Icon: SiGooglegemini },
  { name: "v0", Icon: SiV0 },
  { name: "Windsurf", Icon: SiWindsurf },
];

export function FeatureBanner({
  title,
  titleAccent,
  description,
  primaryCta,
  secondaryCta,
  finePrint,
  trustedLine = "Trusted by the AI tools your readers already use",
  showTrusted = true,
  children,
}: {
  title: string;
  /** Muted second clause rendered after the title, template style. */
  titleAccent?: string;
  description: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  trustedLine?: string;
  /** Template banners carry a trusted-logos marquee under the CTA. */
  showTrusted?: boolean;
  finePrint?: string;
  /** Visual placed inside the glass banner frame. */
  children?: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center 0.6"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, 0]);

  return (
    <section className="bg-canvas relative overflow-hidden rounded-b-[60px] pt-[70px] pb-[120px]">
      {/* Night backdrop rising from the bottom, blurred like the template */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[70%]">
        <img
          src="/template/scene-bg.webp"
          alt=""
          className="h-full w-full object-cover object-top blur-[5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000104] via-[#000104]/35 to-transparent" />
      </div>

      {/* Drifting comet, template .bg-particle 30s loop */}
      {!reduced && (
        <motion.img
          src="/template/comet.webp"
          alt=""
          aria-hidden
          initial={{ y: "-110%", opacity: 0 }}
          animate={{ y: ["-110%", "160%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 2 }}
          className="pointer-events-none absolute top-0 right-[8%] -z-10 w-[38%] max-w-[560px]"
        />
      )}

      {/* Glowing edge streaks, template banner light lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] left-[7%] h-[440px] w-[3px] rounded-full bg-gradient-to-b from-transparent via-sky-300/50 to-transparent blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[34%] right-[6%] h-[380px] w-[3px] rounded-full bg-gradient-to-b from-transparent via-amber-200/40 to-transparent blur-[1px]"
      />

      <div className="mx-auto w-full max-w-[1480px] px-5">
        <div className="mx-auto mb-[60px] flex max-w-[1240px] flex-col items-center gap-8 text-center">
          <h1 className="heading-hero max-w-4xl text-white">
            <SplitReveal as="span" mode="words" onMount>
              {title}
            </SplitReveal>
            {titleAccent && (
              <>
                <br />
                <span className="text-white/50">
                  <SplitReveal as="span" mode="words" onMount delay={0.25}>
                    {titleAccent}
                  </SplitReveal>
                </span>
              </>
            )}
          </h1>
          <Reveal delay={0.35} distance={24}>
            <p className="mx-auto max-w-2xl text-lg text-[#afafaf]">{description}</p>
          </Reveal>
          <Reveal delay={0.5} distance={20} className="flex flex-col items-center gap-4">
            <span className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={primaryCta.href}
                className="btn-sheen text-canvas inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-medium"
              >
                {primaryCta.label}
                <ArrowRight className="size-5" />
              </a>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 text-lg font-medium text-white/80 transition-colors hover:text-white"
                >
                  {secondaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </span>
            {finePrint && <p className="text-sm text-[#7c7b79]">{finePrint}</p>}
          </Reveal>

          {/* Trusted logo marquee, template .feature-logo-block */}
          {showTrusted && (
            <Reveal delay={0.65} distance={16} className="w-full max-w-[588px]">
              <p className="mb-6 text-[15px] text-[#afafaf]">{trustedLine}</p>
              <div className="logos-marquee mask-[linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] flex overflow-hidden">
                {[false, true].map((hidden) => (
                  <div
                    key={String(hidden)}
                    className="logos-marquee-track flex min-w-max shrink-0 items-center"
                    aria-hidden={hidden || undefined}
                  >
                    {TRUSTED_LOGOS.map((logo) => (
                      <span key={logo.name} className="mr-10 flex shrink-0 items-center gap-2 text-white/70">
                        <logo.Icon className="size-5" aria-hidden />
                        <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">
                          {logo.name}
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Glass banner frame with the template's perspective tilt-in */}
        {children && (
          <div ref={frameRef} style={{ perspective: "100vw" }}>
            <motion.div
              style={{ rotateX, transformStyle: "preserve-3d" }}
              className="mx-auto w-full max-w-[1318px] rounded-[24px] border-[0.83px] border-white/16 bg-[#1c1b1d]/45 p-[13px] backdrop-blur-2xl"
            >
              <div className="overflow-hidden rounded-[14px]">{children}</div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dense banner board, template Hero/Feature kanban collage            */
/* ------------------------------------------------------------------ */

export type BoardChip = { label: string; tone: "high" | "med" | "low" | "purple" | "kind" };

export type BoardCard =
  | {
      kind: "task";
      chips: BoardChip[];
      id?: string;
      title: string;
      desc?: string;
      progress?: number;
      avatars?: number;
      links?: number;
      comments?: number;
      mono?: boolean;
    }
  | {
      kind: "checklist";
      chips: BoardChip[];
      id?: string;
      title: string;
      desc?: string;
      items: Array<{ label: string; done?: boolean }>;
    }
  | { kind: "visual"; chips?: BoardChip[]; id?: string; icon: ReactNode; title: string; desc?: string }
  | { kind: "summary"; progress: number; avatars?: number; links?: number; comments?: number }
  | { kind: "filler"; h?: number };

const CHIP_TONES: Record<BoardChip["tone"], string> = {
  high: "bg-[#ff8da1]/20 text-[#ffb3c0]",
  med: "bg-[#ffd58a]/20 text-[#ffe0a8]",
  low: "bg-[#8ecf9a]/20 text-[#b2e0bb]",
  purple: "bg-[#b9a3e2]/20 text-[#cdbcec]",
  kind: "bg-white/10 text-white/70",
};

const AVATAR_TINTS = ["#e8b28b", "#a3b9e2", "#9fd9b4", "#d9a3c9", "#e2d5a3"];

function BoardAvatars({ count = 3 }: { count?: number }) {
  return (
    <span className="flex -space-x-1.5">
      {AVATAR_TINTS.slice(0, count).map((tint) => (
        <span key={tint} className="size-5 rounded-full border border-black/40" style={{ background: tint }} />
      ))}
    </span>
  );
}

function BoardMeta({ links, comments }: { links?: number; comments?: number }) {
  if (links === undefined && comments === undefined) return null;
  return (
    <span className="flex items-center gap-2.5 text-[10px] text-white/45">
      {links !== undefined && <span>&#128279; {links}</span>}
      {comments !== undefined && <span>&#128172; {comments}</span>}
    </span>
  );
}

function BoardCardView({ card }: { card: BoardCard }) {
  const base = "rounded-xl border border-white/10 bg-[#101318]/95 p-3.5";

  if (card.kind === "filler") {
    return <div className="rounded-xl border border-white/5 bg-white/[0.015]" style={{ height: card.h ?? 160 }} />;
  }

  if (card.kind === "summary") {
    return (
      <div className={base}>
        <div className="flex items-center justify-between text-[10px] text-white/45">
          <span>Progress</span>
          <span>{card.progress}%</span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="bg-canvas-accent h-full rounded-full" style={{ width: `${card.progress}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <BoardAvatars count={card.avatars ?? 4} />
          <BoardMeta links={card.links} comments={card.comments} />
        </div>
      </div>
    );
  }

  if (card.kind === "visual") {
    return (
      <div className={base}>
        {card.chips && (
          <div className="flex items-center justify-between">
            <span className="flex gap-1">
              {card.chips.map((chip) => (
                <span
                  key={chip.label}
                  className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", CHIP_TONES[chip.tone])}
                >
                  {chip.label}
                </span>
              ))}
            </span>
            {card.id && <span className="text-[10px] text-white/40">{card.id}</span>}
          </div>
        )}
        <div className="mt-2.5 flex items-center justify-center rounded-lg bg-black py-7">{card.icon}</div>
        <p className="mt-2.5 text-[13px] font-semibold text-white">{card.title}</p>
        {card.desc && <p className="mt-0.5 text-[11px] text-white/50">{card.desc}</p>}
      </div>
    );
  }

  if (card.kind === "checklist") {
    return (
      <div className={base}>
        <div className="flex items-center justify-between">
          <span className="flex gap-1">
            {card.chips.map((chip) => (
              <span
                key={chip.label}
                className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", CHIP_TONES[chip.tone])}
              >
                {chip.label}
              </span>
            ))}
          </span>
          {card.id && <span className="text-[10px] text-white/40">{card.id}</span>}
        </div>
        <p className="mt-2 text-[13px] font-semibold text-white">{card.title}</p>
        {card.desc && <p className="mt-0.5 text-[11px] text-white/50">{card.desc}</p>}
        <div className="mt-2.5 space-y-1.5 border-t border-white/8 pt-2.5">
          {card.items.map((item) => (
            <p key={item.label} className="flex items-center gap-2 text-[11px] text-white/60">
              {item.done ? (
                <span className="text-canvas-accent text-[11px] leading-none">&#10003;</span>
              ) : (
                <span className="size-3 shrink-0 rounded-full border border-white/30" />
              )}
              {item.label}
            </p>
          ))}
          <p className="flex items-center gap-2 text-[11px] text-white/40">
            <Plus className="size-3" /> Add subtask
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={base}>
      <div className="flex items-center justify-between">
        <span className="flex gap-1">
          {card.chips.map((chip) => (
            <span
              key={chip.label}
              className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", CHIP_TONES[chip.tone])}
            >
              {chip.label}
            </span>
          ))}
        </span>
        {card.id && <span className="text-[10px] text-white/40">{card.id}</span>}
      </div>
      <p className={cn("mt-2 text-[13px] font-semibold text-white", card.mono && "font-mono font-normal")}>
        {card.title}
      </p>
      {card.desc && <p className="mt-0.5 text-[11px] text-white/50">{card.desc}</p>}
      {card.progress !== undefined && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between text-[10px] text-white/45">
            <span>Progress</span>
            <span>{card.progress}%</span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="bg-canvas-accent h-full rounded-full" style={{ width: `${card.progress}%` }} />
          </div>
        </div>
      )}
      <div className="mt-2.5 flex items-center justify-between">
        {card.avatars !== undefined && <BoardAvatars count={card.avatars} />}
        <BoardMeta links={card.links} comments={card.comments} />
      </div>
    </div>
  );
}

/**
 * Dense four-column masonry board for the banner frame, matching the
 * template's floor-to-ceiling kanban collage: varied card types, dim
 * filler cards for texture, per-column offsets, clipped at the bottom.
 */
export function BannerBoard({ columns }: { columns: BoardCard[][] }) {
  const offsets = ["translate-y-6", "-translate-y-3", "translate-y-2", "-translate-y-6"];
  return (
    <div className="max-h-[640px] overflow-hidden bg-[#07090d]">
      <div className="grid grid-cols-2 items-start gap-3 p-4 sm:p-6 lg:grid-cols-4">
        {columns.map((column, i) => (
          <div key={i} className={cn("flex flex-col gap-3", offsets[i % offsets.length])}>
            {column.map((card, j) => (
              <BoardCardView key={j} card={card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky pastel process cards                                         */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  visual?: ReactNode;
};

const PROCESS_TINTS = ["#ffeec3", "#f5ffdc", "#f3efff"];

export function ProcessCards({ title, steps }: { title?: string; steps: ProcessStep[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 0.35", "end 0.9"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      className="relative rounded-[60px] py-[120px]"
      style={{
        backgroundImage: "url(/template/feature-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "50% 100%",
      }}
    >
      <div ref={railRef} className="mx-auto w-full max-w-[1480px] px-5">
        {title && (
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-cream-foreground mb-14 text-center">
            {title}
          </SplitReveal>
        )}

        {/* Sticky number rail, template .process-number-block */}
        <div className="sticky top-[110px] z-20 mb-10 flex gap-10 max-sm:gap-4">
          {steps.map((step, i) => (
            <span key={step.label} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-[33px] items-center justify-center rounded-full border text-sm transition-colors duration-500",
                  active === i
                    ? "border-[#38332d] text-[#0a0a0a]"
                    : "border-[#b4afaf] text-[#afafaf]",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-xl tracking-[-0.04em] transition-colors duration-500",
                  active === i ? "text-[#0a0a0a]" : "text-[#afafaf]",
                )}
              >
                {step.label}
              </span>
            </span>
          ))}
        </div>

        {/* Stacking cards */}
        <div className="flex flex-col gap-20">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="sticky top-[170px] flex justify-between gap-14 rounded-[35px] border border-white/45 p-10 max-lg:flex-col max-sm:p-6"
              style={{ backgroundColor: PROCESS_TINTS[i % PROCESS_TINTS.length], minHeight: 460 }}
            >
              <div className="flex max-w-[655px] flex-col justify-between gap-10">
                <div className="flex flex-col gap-6 text-[#38332d]">
                  <h3 className="font-display text-4xl tracking-[-0.04em] sm:text-5xl">{step.title}</h3>
                  <p className="font-display text-2xl font-light tracking-[-0.04em] sm:text-[28px]">
                    {step.subtitle}
                  </p>
                </div>
                <p className="border-t border-black/10 pt-6 text-[15px] leading-relaxed tracking-[-0.03em] text-[#7c7b79]">
                  {step.description}
                </p>
              </div>
              {step.visual && <div className="w-full max-w-[431px] shrink-0 max-lg:max-w-none">{step.visual}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Growth / quote panels                                               */
/* ------------------------------------------------------------------ */

export function QuotePanels({
  title,
  media,
  quote,
  quoteAttribution,
  wideQuote,
  wideAttribution,
}: {
  title: string;
  /** Large media/demo card occupying the left column. */
  media: ReactNode;
  quote: string;
  quoteAttribution?: string;
  wideQuote: string;
  wideAttribution?: string;
}) {
  return (
    <section className="bg-canvas py-[120px]">
      <div className="mb-[60px] border-b border-white/18 pb-[60px]">
        <SplitReveal as="h2" mode="chars" className="heading-section mx-auto max-w-3xl px-5 text-center text-white">
          {title}
        </SplitReveal>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] gap-2.5 px-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="border-canvas-card-stroke relative min-h-[420px] overflow-hidden rounded-[50px] border">
          {media}
        </Reveal>

        <Reveal
          delay={0.2}
          className="border-canvas-card-stroke flex min-h-[420px] flex-col justify-between gap-14 rounded-[32px] border p-8"
          style={{
            backgroundImage: "url(/template/text-container-2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "50%",
          }}
        >
          <p className="subtitle-display linear-text">&ldquo;{quote}&rdquo;</p>
          {quoteAttribution && <p className="text-sm text-white/70">{quoteAttribution}</p>}
        </Reveal>

        <Reveal
          delay={0.3}
          className="border-canvas-card-stroke flex flex-col items-center gap-6 rounded-[50px] border p-12 text-center sm:p-[100px] lg:col-span-2"
          style={{
            backgroundImage: "url(/template/bg-2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "50%",
          }}
        >
          <p className="subtitle-display max-w-3xl text-white">&ldquo;{wideQuote}&rdquo;</p>
          {wideAttribution && <p className="text-sm text-white/60">{wideAttribution}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Partner strip                                                       */
/* ------------------------------------------------------------------ */

export function PartnerStrip({
  title,
  items,
}: {
  title: string;
  items: Array<{ name: string; icon: ReactNode }>;
}) {
  return (
    <section className="bg-canvas pt-[120px] pb-[60px]">
      <SplitReveal as="h2" mode="chars" className="heading-section mx-auto mb-14 max-w-3xl px-5 text-center text-white">
        {title}
      </SplitReveal>
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 sm:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.name}
            className={cn(
              "border-canvas-card-stroke flex items-center justify-center gap-3 px-8 py-11 opacity-50 transition-opacity duration-300 hover:opacity-100",
              (i + 1) % 3 !== 0 && "sm:border-r",
              (i + 1) % 2 !== 0 && "max-sm:border-r",
            )}
          >
            <span aria-hidden className="[&>svg]:size-6 text-white">
              {item.icon}
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-white">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
