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
import { SiClaude, SiCursor, SiGithubcopilot, SiGooglegemini, SiPerplexity, SiV0, SiWindsurf } from "react-icons/si";

import { ArrowRight, Check } from "@/components/icons";
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

function TrustedMarquee() {
  return (
    <div className="logos-marquee flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
      {[false, true].map((hidden) => (
        <div
          key={String(hidden)}
          className="logos-marquee-track flex min-w-max shrink-0 items-center"
          aria-hidden={hidden || undefined}
        >
          {TRUSTED_LOGOS.map((logo) => (
            <span key={logo.name} className="mr-10 flex shrink-0 items-center gap-2 text-white/70">
              <logo.Icon className="size-5" aria-hidden />
              <span className="font-display text-lg font-semibold tracking-tight whitespace-nowrap">{logo.name}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function FeatureBanner({
  title,
  titleAccent,
  description,
  primaryCta,
  secondaryCta,
  finePrint,
  trustedLine = "Trusted by the AI tools your readers already use",
  showTrusted = true,
  layout = "centered",
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
  /** How the copy and the board are arranged. */
  layout?: "centered" | "split" | "reverse" | "offset" | "stage" | "bleed";
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
        <img src="/template/scene-bg.webp" alt="" className="h-full w-full object-cover object-top blur-[5px]" />
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
        className="pointer-events-none absolute top-[10%] left-[7%] h-[440px] w-[3px] rounded-full bg-gradient-to-b from-transparent via-[#a9b578]/45 to-transparent blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[34%] right-[6%] h-[380px] w-[3px] rounded-full bg-gradient-to-b from-transparent via-amber-200/40 to-transparent blur-[1px]"
      />

      <div
        className={cn(
          "mx-auto w-full px-5",
          layout === "split" ? "max-w-[1560px]" : "max-w-[1480px]",
          layout === "bleed" && "lg:overflow-hidden",
        )}
      >
        <div
          className={cn(
            layout === "bleed"
              ? "grid items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr]"
              : layout === "split" || layout === "reverse"
                ? "grid items-center gap-14 lg:grid-cols-[1fr_1fr]"
                : layout === "offset"
                  ? "mb-[60px] grid max-w-[1240px] items-end gap-10 lg:grid-cols-[1.15fr_1fr]"
                  : layout === "stage"
                    ? "mx-auto mb-[70px] flex max-w-[860px] flex-col items-center gap-7 text-center"
                    : "mx-auto mb-[60px] flex max-w-[1240px] flex-col items-center gap-8 text-center",
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-8",
              layout === "centered" || layout === "stage" ? "items-center" : "items-start text-left",
              layout === "bleed" && "lg:pr-4",
              layout === "reverse" && "lg:order-last",
            )}
          >
            <h1
              className={cn(
                "heading-hero text-white",
                layout === "centered"
                  ? "max-w-4xl"
                  : layout === "stage"
                    ? "max-w-3xl"
                    : layout === "bleed"
                      ? "max-w-[420px]"
                      : "max-w-[620px]",
              )}
            >
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
              <p
                className={cn(
                  "text-lg text-[#afafaf]",
                  layout === "centered" || layout === "stage" ? "mx-auto max-w-2xl" : "max-w-xl",
                )}
              >
                {description}
              </p>
            </Reveal>
            <Reveal
              delay={0.5}
              distance={20}
              className={cn(
                "flex flex-col gap-4",
                layout === "centered" || layout === "stage" ? "items-center" : "items-start",
              )}
            >
              <span
                className={cn(
                  "flex flex-wrap items-center gap-4",
                  (layout === "centered" || layout === "stage") && "justify-center",
                )}
              >
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
                    className="inline-flex min-h-11 items-center gap-2 px-2 text-lg font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {secondaryCta.label}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </span>
              {finePrint && <p className="text-sm text-[#7c7b79]">{finePrint}</p>}
            </Reveal>

            {/* Trusted logo marquee; the offset layout moves it beside the copy. */}
            {showTrusted && layout !== "offset" && (
              <Reveal delay={0.65} distance={16} className="w-full max-w-[588px]">
                <p className="mb-6 text-[15px] text-[#afafaf]">{trustedLine}</p>
                <TrustedMarquee />
              </Reveal>
            )}
          </div>

          {/* Offset layout: logos sit in the second column, board runs full width below. */}
          {layout === "offset" && showTrusted && (
            <Reveal delay={0.65} distance={16} className="w-full max-w-[520px] lg:justify-self-end">
              <p className="mb-6 text-[15px] text-[#afafaf]">{trustedLine}</p>
              <TrustedMarquee />
            </Reveal>
          )}

          {/* Split and reverse: the board sits beside the copy. */}
          {(layout === "split" || layout === "reverse" || layout === "bleed") && children && (
            <div
              ref={frameRef}
              style={{ perspective: "100vw" }}
              className={cn(layout === "reverse" && "lg:order-first", layout === "bleed" && "lg:-mr-[12vw]")}
            >
              <motion.div
                style={{ rotateX, transformStyle: "preserve-3d" }}
                className="overflow-hidden rounded-[24px] border-[0.83px] border-white/16"
              >
                {children}
              </motion.div>
            </div>
          )}
        </div>

        {/* Full-width board for the centered, offset, and stage layouts */}
        {layout !== "split" && layout !== "reverse" && layout !== "bleed" && children && (
          <div ref={frameRef} style={{ perspective: "100vw" }}>
            <motion.div
              style={{ rotateX, transformStyle: "preserve-3d" }}
              className={cn(
                "mx-auto w-full overflow-hidden rounded-[24px] border-[0.83px] border-white/16",
                layout === "offset" ? "max-w-[1480px]" : layout === "stage" ? "max-w-none" : "max-w-[1318px]",
              )}
            >
              {children}
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

/**
 * One hairline treatment for every chip. The five-tone pastel palette this
 * replaced was doing project-tracker cosplay: the label already carries the
 * meaning, so colour was only adding noise.
 */
const CHIP_CLASS = "rounded-full border border-white/12 px-2.5 py-1 text-[11px] font-medium text-white/60";

const CARD_SURFACE =
  "rounded-[20px] border border-white/[0.09] bg-[#0a0c10]/85 p-5 backdrop-blur-xl " +
  "shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)]";

function BoardChips({ chips, id }: { chips?: BoardChip[]; id?: string }) {
  if (!chips?.length && !id) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="flex min-w-0 flex-wrap gap-1.5">
        {chips?.map((chip) => (
          <span key={chip.label} className={CHIP_CLASS}>
            {chip.label}
          </span>
        ))}
      </span>
      {id && <span className="font-mono text-[11px] text-white/25">{id}</span>}
    </div>
  );
}

function BoardTitle({ children, mono }: { children: ReactNode; mono?: boolean }) {
  return (
    <p
      className={cn(
        "mt-3.5 text-[15px] leading-snug font-medium tracking-[-0.01em] break-words text-white",
        mono && "font-mono text-[14px] font-normal",
      )}
    >
      {children}
    </p>
  );
}

function BoardDesc({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-[13px] leading-relaxed break-words text-white/45">{children}</p>;
}

function BoardCardView({ card }: { card: BoardCard }) {
  // Texture-only kinds render nothing; BannerBoard drops them before layout.
  if (card.kind === "summary" || card.kind === "filler") return null;

  if (card.kind === "visual") {
    return (
      <div className={CARD_SURFACE}>
        <BoardChips chips={card.chips} id={card.id} />
        {/* The icon sits in the card itself. It used to live in a black well
            captioned "preview", which read as a placeholder left in by mistake. */}
        <span className="text-canvas-accent mt-4 flex size-9 items-center justify-center">{card.icon}</span>
        <BoardTitle>{card.title}</BoardTitle>
        {card.desc && <BoardDesc>{card.desc}</BoardDesc>}
      </div>
    );
  }

  if (card.kind === "checklist") {
    return (
      <div className={CARD_SURFACE}>
        <BoardChips chips={card.chips} id={card.id} />
        <BoardTitle>{card.title}</BoardTitle>
        {card.desc && <BoardDesc>{card.desc}</BoardDesc>}
        <div className="mt-4 space-y-2.5 border-t border-white/[0.07] pt-4">
          {card.items.map((item) => (
            <p
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 text-[13px] break-words",
                item.done ? "text-white/70" : "text-white/40",
              )}
            >
              {item.done ? (
                <Check className="text-canvas-accent size-3.5 shrink-0" />
              ) : (
                <span className="size-3.5 shrink-0 rounded-full border border-white/20" />
              )}
              {item.label}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={CARD_SURFACE}>
      <BoardChips chips={card.chips} id={card.id} />
      <BoardTitle mono={card.mono}>{card.title}</BoardTitle>
      {card.desc && <BoardDesc>{card.desc}</BoardDesc>}
    </div>
  );
}

/** Cards that exist only as texture or decoration, dropped before layout. */
const isRendered = (card: BoardCard) => card.kind !== "filler" && card.kind !== "summary";

/** Rough rendered height of a card, in arbitrary units, for balancing columns. */
function cardWeight(card: BoardCard): number {
  if (card.kind === "checklist") return 2 + 0.5 * card.items.length + (card.desc ? 0.4 : 0);
  if (card.kind === "visual") return 2.4 + (card.desc ? 0.4 : 0);
  return 1.6 + (card.kind === "task" && card.desc ? 0.4 : 0);
}

/**
 * Deal cards across `count` columns, keeping the columns a similar height.
 *
 * The pages author four source columns padded with filler, so once the filler
 * is dropped the original grouping leaves columns holding a single card. Every
 * real card is redealt rather than truncating the extra columns, so no page
 * loses content, and each card goes to the shortest column so the board does
 * not end in a ragged corner.
 */
function dealColumns(columns: BoardCard[][], count: number): BoardCard[][] {
  const dealt: BoardCard[][] = Array.from({ length: count }, () => []);
  const heights = new Array<number>(count).fill(0);

  for (const card of columns.flat().filter(isRendered)) {
    const target = heights.indexOf(Math.min(...heights));
    dealt[target].push(card);
    heights[target] += cardWeight(card);
  }
  return dealt.filter((column) => column.length > 0);
}

/**
 * The banner board: a few real cards, generously sized, staggered by column.
 *
 * It used to be a dense four-column kanban collage padded out with dim skeleton
 * cards, invented teammate avatars, and progress bars. Those read as an
 * unfinished loading state and buried the one line on each card that carries
 * meaning, so the board now shows fewer, larger, fully-rendered cards and
 * nothing that is only there to fill space.
 */
export function BannerBoard({ columns, dense = false }: { columns: BoardCard[][]; dense?: boolean }) {
  const offsets = ["translate-y-8", "-translate-y-4", "translate-y-3"];
  // A board beside the copy has half the width, so it deals into two columns.
  const shown = dealColumns(columns, dense ? 2 : 3);

  return (
    <div
      className={cn("bg-[#07090d]", dense ? "max-h-[540px]" : "max-h-[660px]")}
      // Fades out rather than slicing a card in half at the frame's edge.
      style={{
        maskImage: "linear-gradient(to bottom, #000 68%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 68%, transparent 100%)",
      }}
    >
      <div
        className={cn(
          "grid items-start gap-4 p-5 sm:gap-5 sm:p-8",
          dense ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {shown.map((column, i) => (
          <div key={i} className={cn("flex flex-col gap-4 sm:gap-5", offsets[i % offsets.length])}>
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
        {/* Scrolls rather than overflowing once the labels stop fitting. */}
        <div className="sticky top-[110px] z-20 mb-10 flex [scrollbar-width:none] gap-10 overflow-x-auto [-ms-overflow-style:none] max-sm:gap-3 [&::-webkit-scrollbar]:hidden">
          {steps.map((step, i) => (
            <span key={step.label} className="flex shrink-0 items-center gap-3 max-sm:gap-2">
              <span
                className={cn(
                  "flex size-[33px] shrink-0 items-center justify-center rounded-full border text-sm transition-colors duration-500 max-sm:size-7 max-sm:text-xs",
                  active === i ? "border-[#38332d] text-[#0a0a0a]" : "border-[#b4afaf] text-[#afafaf]",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-xl tracking-[-0.04em] whitespace-nowrap transition-colors duration-500 max-sm:text-[15px]",
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
                  <h3 className="font-display text-3xl tracking-[-0.04em] break-words min-[400px]:text-4xl sm:text-5xl">
                    {step.title}
                  </h3>
                  <p className="font-display text-2xl font-light tracking-[-0.04em] sm:text-[28px]">{step.subtitle}</p>
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
          className="art-scrim border-canvas-card-stroke relative flex min-h-[420px] flex-col justify-between gap-14 overflow-hidden rounded-[32px] border p-8"
          style={{
            backgroundImage: "url(/template/text-container-2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "50%",
          }}
        >
          {/* The caption is a kicker, not a speaker: it belongs above the
              claim, where it frames what follows instead of trailing it like
              an attribution nobody gave. */}
          <div className="flex flex-col gap-4">
            {quoteAttribution && (
              <p className="text-[13px] font-medium tracking-[0.14em] text-white/40 uppercase">{quoteAttribution}</p>
            )}
            <p className="subtitle-display linear-text">{quote}</p>
          </div>
        </Reveal>

        <Reveal
          delay={0.3}
          className="art-scrim border-canvas-card-stroke relative flex flex-col items-center gap-6 overflow-hidden rounded-[50px] border p-12 text-center sm:p-[100px] lg:col-span-2"
          style={{
            backgroundImage: "url(/template/bg-2.webp)",
            backgroundSize: "cover",
            backgroundPosition: "50%",
          }}
        >
          {wideAttribution && (
            <p className="text-[13px] font-medium tracking-[0.14em] text-white/40 uppercase">{wideAttribution}</p>
          )}
          <p className="subtitle-display max-w-3xl text-white">{wideQuote}</p>
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
  description,
  items,
}: {
  title: string;
  description?: string;
  items: Array<{ name: string; icon: ReactNode }>;
}) {
  return (
    <section className="bg-canvas pt-[120px] pb-[60px]">
      <SplitReveal
        as="h2"
        mode="chars"
        className={cn("heading-section mx-auto max-w-3xl px-5 text-center text-white", description ? "mb-6" : "mb-14")}
      >
        {title}
      </SplitReveal>
      {description && (
        <Reveal delay={0.15} distance={20} className="mx-auto mb-14 max-w-2xl px-5 text-center">
          <p className="text-lg leading-relaxed text-white/65">{description}</p>
        </Reveal>
      )}
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
            <span aria-hidden className="text-white [&>svg]:size-6">
              {item.icon}
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-white">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
