"use client";

import type { MotionValue } from "motion/react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";

import styles from "./automation.module.css";

function BranchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v5.256a2.251 2.251 0 1 0 1.5 0V5.372Zm6.5.622a2.25 2.25 0 1 0-1.5 0v.281a1.75 1.75 0 0 1-1.75 1.75h-2.5a3.25 3.25 0 0 0-1.75.51V8.5c.56-.32 1.2-.5 1.75-.5h2.5A3.25 3.25 0 0 0 11.5 4.75v-.756ZM4.25 13.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm6.5-9.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
    </svg>
  );
}

function GaugeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1a7 7 0 1 0 7 7h-1.5A5.5 5.5 0 1 1 8 2.5V1Z" />
      <path d="M8 8 12.5 3.5l-1-1L7 7Z" />
    </svg>
  );
}

function PullRequestIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="#3fb950" aria-hidden="true">
      <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v5.256a2.251 2.251 0 1 0 1.5 0V5.372Zm6.5.622a2.25 2.25 0 1 0-1.5 0v.281a1.75 1.75 0 0 1-1.75 1.75h-2.5a3.25 3.25 0 0 0-1.75.51V8.5c.56-.32 1.2-.5 1.75-.5h2.5A3.25 3.25 0 0 0 11.5 4.75v-.756ZM4.25 13.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm6.5-9.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
    </svg>
  );
}

type NavItem = "home" | "readiness" | "analytics" | "track" | "deployments";

function NavIcon({ name }: { name: NavItem }) {
  const shared = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...shared}>
      {name === "home" && (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </>
      )}
      {name === "readiness" && <path d="M20 6 9 17l-5-5" />}
      {name === "analytics" && (
        <>
          <path d="M3 3v16a2 2 0 0 0 2 2h16" />
          <path d="M7 15l4-4 3 3 5-5" />
        </>
      )}
      {name === "track" && (
        <>
          <path d="M12 20a8 8 0 1 0-8-8" />
          <path d="m4 12 3 3" />
          <path d="M12 8v4l3 2" />
        </>
      )}
      {name === "deployments" && (
        <>
          <path d="M12 22a10 10 0 1 0-10-10" />
          <circle cx="12" cy="12" r="3" />
          <path d="m16 8-4 4" />
        </>
      )}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Status({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className={styles.status}>
      <span className={styles.statusDot} style={{ background: color }} />
      {children}
    </span>
  );
}

function GitHubDemo() {
  return (
    <div className={styles.githubWindow} aria-hidden="true">
      <div className={cn(styles.anim, styles.composer)}>
        <div className={styles.composerTitle}>
          <span className={styles.avatar}>EO</span>
          <span>Add a comment</span>
        </div>
        <div className={styles.composerShell}>
          <div className={styles.composerTabs}>
            <span className={cn(styles.githubTab, styles.githubTabActive)}>Write</span>
            <span className={styles.githubTab}>Preview</span>
            <span className={styles.toolbar}>
              <span className={styles.tool}>H</span>
              <span className={styles.tool}>B</span>
              <span className={styles.tool} style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                I
              </span>
              <span className={styles.tool}>≡</span>
              <span className={cn(styles.tool, styles.mono)}>{"<>"}</span>
              <span className={styles.tool}>⌁</span>
              <span className={styles.tool}>@</span>
            </span>
          </div>
          <div className={styles.commentField}>
            <span className={styles.typed}>
              <span className={styles.mention}>@thally</span> document this. The swap widget now supports TRON and SOL.
            </span>
          </div>
          <div className={styles.composerMeta}>
            <span>Markdown is supported</span>
            <span>Paste, drop, or click to add files</span>
          </div>
        </div>
        <div className={styles.composerActions}>
          <span className={cn(styles.githubButton, styles.closeButton)}>
            <span className={styles.closeIcon}>⑂</span> Close pull request
          </span>
          <span className={cn(styles.githubButton, styles.commentButton)}>Comment</span>
        </div>
      </div>

      <div className={cn(styles.githubCard, styles.anim, styles.posted)}>
        <div className={styles.githubHeader}>
          <span className={styles.avatar}>EO</span>
          <strong>ekene</strong>
          <span>commented now</span>
          <span className={styles.more}>···</span>
        </div>
        <div className={styles.postedBody}>
          <span className={styles.mention}>@thally</span> document this. The swap widget now supports TRON and SOL.
        </div>
      </div>

      <div className={cn(styles.anim, styles.working)}>
        <span className={styles.botAvatar}>
          <Image src="/images/logo-white.svg" width={11} height={11} alt="" />
        </span>
        <strong>thally-labs</strong>
        <span className={styles.botLabel}>Bot</span>
        <span>drafting the update</span>
        <span className={styles.workingDots}>
          <span />
          <span />
          <span />
        </span>
      </div>

      <div className={cn(styles.githubCard, styles.anim, styles.botReply)}>
        <div className={styles.githubHeader}>
          <span className={styles.botAvatar}>
            <Image src="/images/logo-white.svg" width={11} height={11} alt="" />
          </span>
          <strong>thally-labs</strong>
          <span className={styles.botLabel}>Bot</span>
          <span>commented now</span>
          <span className={styles.authorLabel}>Author</span>
        </div>
        <div className={styles.botCopy}>
          Documents <span className={styles.githubLink}>acme/swap-widget#482</span>. Drafted and validated by Thally
          Track. Please review before merging.
        </div>
        <div className={styles.prCard}>
          <PullRequestIcon />
          <div className={styles.prCopy}>
            <p className={styles.prTitle}>
              docs: add TRON and SOL to supported networks <span className={styles.prNumber}>#483</span>
            </p>
            <p className={cn(styles.prMeta, styles.mono)}>thally/agent-482 → main · +38 −6</p>
          </div>
          <span className={styles.openStatus}>
            <Status color="#3fb950">Open, awaiting review</Status>
          </span>
        </div>
        <div className={styles.prChecks}>
          <Status color="#3fb950">thally check passed</Status>
          <Status color="#3fb950">Preview deployed</Status>
        </div>
      </div>
    </div>
  );
}

const NAV_ITEMS: { id: NavItem; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "readiness", label: "Readiness" },
  { id: "analytics", label: "Analytics" },
  { id: "track", label: "Track" },
  { id: "deployments", label: "Deployments" },
];

function CloudShell({ active, breadcrumb, children }: { active: NavItem; breadcrumb: string; children: ReactNode }) {
  return (
    <div className={styles.appFrame} aria-hidden="true">
      <div className={styles.cloudShell}>
        <aside className={styles.sidebar}>
          <div className={styles.workspace}>
            <Image src="/images/logo.svg" width={24} height={24} alt="" />
            <span className={styles.workspaceName}>acme</span>
          </div>
          <div className={styles.navLabel}>Site</div>
          <div className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <span key={item.id} className={cn(styles.navItem, item.id === active && styles.navItemActive)}>
                <NavIcon name={item.id} />
                {item.label}
              </span>
            ))}
          </div>
        </aside>
        <div className={styles.cloudMain}>
          <div className={styles.cloudTopbar}>
            <span>
              Thally Cloud <span className={styles.breadcrumbDivider}>/</span> <strong>{breadcrumb}</strong>
            </span>
            <span className={styles.search}>
              <SearchIcon /> Search <kbd>⌘ K</kbd>
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

const REPOSITORIES = [
  ["acme/swap-widget", "TypeScript", styles.checkboxOne],
  ["acme/payments-api", "Go", styles.checkboxTwo],
  ["acme/wallet-sdk", "Python", styles.checkboxThree],
  ["acme/internal-tools", "Rust", ""],
] as const;

function TrackDemo() {
  return (
    <CloudShell active="track" breadcrumb="Track">
      <div className={styles.cloudPage} style={{ position: "relative" }}>
        <div className={styles.trackSetup}>
          <h4 className={styles.cloudTitle}>Track</h4>
          <p className={styles.cloudIntro}>Track evaluates merged changes in the product repos you select.</p>
          <div className={styles.paperCard}>
            {REPOSITORIES.map(([repository, language, checkedClass]) => (
              <div className={styles.paperRow} key={repository}>
                <span className={cn(styles.checkbox, checkedClass)}>
                  <i className={styles.checkboxMark}>✓</i>
                </span>
                <span className={cn(styles.mono, styles.repoName)}>{repository}</span>
                <span className={styles.repoLanguage}>{language}</span>
              </div>
            ))}
          </div>
          <div className={styles.watchActions}>
            <span className={cn(styles.cloudButton, styles.cloudButtonPrimary, styles.watchButton)}>Watch 3 repos</span>
          </div>
        </div>

        <div className={styles.trackActivity}>
          <div className={styles.activityHeading}>
            <h4 className={styles.cloudTitle}>Track</h4>
            <span>3 repos watched</span>
          </div>
          <div className={cn(styles.paperCard, styles.activityCard)}>
            <div className={cn(styles.paperRow, styles.activityOne)}>
              <Status color="#b7b4a6">
                <span className="sr-only">Merged</span>
              </Status>
              <div className={styles.activityCopy}>
                <p>
                  PR #91 merged in <span className={cn(styles.mono, styles.repoName)}>acme/payments-api</span>
                </p>
                <p className={styles.activitySubcopy}>feat: retry failed webhooks with backoff</p>
              </div>
              <span className={styles.activityTime}>just now</span>
            </div>
            <div className={cn(styles.paperRow, styles.activityTwo)}>
              <div className={styles.trackEvaluation}>
                <Image src="/images/logo.svg" width={16} height={16} alt="" />
                <div className={styles.activityCopy}>
                  <p>Track evaluated the change</p>
                  <p className={styles.activitySubcopy}>2 affected pages found · update drafted</p>
                </div>
              </div>
              <div className={styles.sweep}>
                <span className={styles.sweepFill} />
              </div>
            </div>
            <div className={cn(styles.paperRow, styles.activityThree)}>
              <Status color="var(--paper-green)">
                <span className="sr-only">Ready</span>
              </Status>
              <div className={styles.activityCopy}>
                <p>Docs PR opened for your review</p>
                <p className={cn(styles.activitySubcopy, styles.mono)}>docs: document webhook retry policy · +24 −3</p>
              </div>
              <span className={styles.reviewLink}>Review</span>
            </div>
          </div>
        </div>
      </div>
    </CloudShell>
  );
}

function Meter({ value }: { value: 40 | 100 }) {
  return (
    <div className={cn(styles.meter, value === 100 ? styles.meterFull : styles.meterPartial)}>
      <span className={styles.meterTrack}>
        <i className={styles.meterFill} />
      </span>
      <span className={styles.meterNumber}>{value}</span>
    </div>
  );
}

function ReadinessCheck({
  title,
  description,
  value,
  warning = false,
  children,
}: {
  title: string;
  description: string;
  value: 40 | 100;
  warning?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={styles.check}>
      <div className={styles.checkRow}>
        <div className={styles.checkCopy}>
          <div className={styles.checkTitle}>
            {title}
            <span className={cn(styles.indicator, warning ? styles.indicatorWarning : styles.indicatorOk)} />
          </div>
          <div className={styles.checkDescription}>{description}</div>
        </div>
        <Meter value={value} />
      </div>
      {children}
    </div>
  );
}

const FINDINGS = [
  ["/guides/quickstart", "Two heading levels skipped; body under 120 words"],
  ["/sdk/configuration", "Code sample present but no explanation of options"],
  ["/changelog", "Latest entry is a stub, one line with no detail"],
] as const;

function ReadinessDemo() {
  return (
    <CloudShell active="readiness" breadcrumb="Agent readiness">
      <div className={styles.cloudPage}>
        <div className={styles.readinessHeader}>
          <h4 className={styles.cloudTitle}>Agent readiness</h4>
          <div className={styles.readinessActions}>
            <span className={cn(styles.cloudButton, styles.cloudButtonGhost)}>JSON report</span>
            <span className={cn(styles.cloudButton, styles.cloudButtonPrimary)}>Recalculate</span>
          </div>
        </div>

        <div className={styles.readinessSummary}>
          <div className={styles.score}>
            <div className={styles.scoreRing}>
              <svg viewBox="0 0 84 84">
                <circle className={styles.ringBackground} cx="42" cy="42" r="37" />
                <circle className={styles.ringForeground} cx="42" cy="42" r="37" />
              </svg>
              <span className={styles.scoreNumber}>91</span>
            </div>
            <div>
              <div className={styles.grade}>
                Grade <strong>A</strong>
              </div>
              <p className={styles.gradeCopy}>Analyzed 5 published pages from the live site.</p>
            </div>
          </div>
          <div className={styles.readinessStats}>
            <div className={styles.readinessStat}>
              <div className={styles.statLabel}>Checks passing</div>
              <div className={styles.statValue}>
                5<span className={styles.statDenominator}> / 6</span>
              </div>
              <div className={cn(styles.statMeta, styles.warningMeta)}>
                <span className={cn(styles.indicator, styles.indicatorWarning)} />1 needs attention
              </div>
            </div>
            <div className={styles.readinessStat}>
              <div className={styles.statLabel}>Pages needing attention</div>
              <div className={styles.statValue}>3</div>
              <div className={cn(styles.statMeta, styles.forestMeta)}>Review pages</div>
            </div>
          </div>
        </div>

        <div className={styles.checks}>
          <ReadinessCheck title="Structured data coverage" description="5/5 pages emit valid JSON-LD" value={100} />
          <ReadinessCheck
            title="Content quality"
            description="2/5 pages have substantive, structured content"
            value={40}
            warning
          >
            <div className={styles.checkDetail}>
              <div className={styles.findingPages}>
                {FINDINGS.map(([path, why]) => (
                  <div className={styles.findingRow} key={path}>
                    <span className={styles.findingPath}>{path}</span>
                    <span className={styles.findingWhy}>{why}</span>
                    <span className={styles.openPage}>Open page</span>
                  </div>
                ))}
              </div>
              <div className={styles.fixBar}>
                <span className={styles.fixNote}>
                  Thally can draft the missing content and open a pull request against{" "}
                  <span className={styles.mono}>acme/docs</span>.
                </span>
                <span className={styles.fixOpened}>
                  <span className={cn(styles.indicator, styles.indicatorOk)} />
                  Fix PR opened: docs: fill quality gaps · +64 −11 · awaiting your review
                </span>
                <span className={cn(styles.cloudButton, styles.cloudButtonPrimary, styles.fixButton)}>Send fix PR</span>
              </div>
            </div>
          </ReadinessCheck>
          <ReadinessCheck
            title="Machine readability"
            description="5/5 pages resolve as JSON, Markdown, and JSON-LD"
            value={100}
          />
        </div>
      </div>
    </CloudShell>
  );
}

function FeatureCard({
  index,
  eyebrow,
  icon,
  title,
  description,
  visual,
  caption,
  track = false,
  lift,
  scale,
  opacity,
  filter,
}: {
  index: 0 | 1 | 2;
  eyebrow: string;
  icon: ReactNode;
  title: string;
  description: string;
  visual: ReactNode;
  caption: string;
  track?: boolean;
  lift?: MotionValue<number>;
  scale?: MotionValue<number>;
  opacity?: MotionValue<number>;
  filter?: MotionValue<string>;
}) {
  return (
    <motion.article
      className={cn(styles.stackCard, styles[`stackCard${index + 1}` as keyof typeof styles])}
      style={{ y: lift, scale, opacity, filter }}
    >
      <div className={styles.feature}>
        <div className={styles.featureCopy}>
          <div className={styles.eyebrow}>
            <span className={cn(styles.eyebrowIcon, track && styles.eyebrowTrack)}>{icon}</span>
            {eyebrow}
          </div>
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureDescription}>{description}</p>
        </div>
        <div className={styles.featureVisual}>
          {visual}
          <p className={styles.caption}>{caption}</p>
        </div>
      </div>
    </motion.article>
  );
}

function DeckStage({
  index,
  children,
}: {
  index: 1 | 2;
  children: (motion: {
    lift?: MotionValue<number>;
    scale?: MotionValue<number>;
    opacity?: MotionValue<number>;
    filter?: MotionValue<string>;
  }) => ReactNode;
}) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 155,
    damping: 27,
    mass: 0.42,
    restDelta: 0.0005,
  });

  const lift = useTransform(progress, [0.08, 0.72, 0.94], [72, 0, 0]);
  const scale = useTransform(progress, [0.08, 0.72], [0.992, 1]);
  const cardOpacity = useTransform(progress, [0.08, 0.46, 0.72], [0.86, 0.97, 1]);
  const cardFilter = useTransform(progress, [0.08, 0.72], ["blur(1px)", "blur(0px)"]);
  const cueOpacity = useTransform(progress, [0, 0.12, 0.82, 1], [0, 0.7, 0.7, 0]);
  const cueProgress = useTransform(progress, [0.1, 0.78], [0, 1]);

  return (
    <>
      <div ref={spacerRef} className={styles.deckSpacer} aria-hidden="true">
        {!reduce && (
          <motion.div className={styles.deckCue} style={{ opacity: cueOpacity }}>
            <span className={styles.deckCueLabel}>0{index + 1}</span>
            <span className={styles.deckCueTrack}>
              <motion.i style={{ scaleY: cueProgress }} />
            </span>
          </motion.div>
        )}
      </div>
      {children(reduce ? {} : { lift, scale, opacity: cardOpacity, filter: cardFilter })}
    </>
  );
}

export function Automation() {
  return (
    <section id="automation" className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.rule} aria-hidden="true">
          <span className={styles.ruleLine} />
          <span>+</span>
          <span className={styles.ruleLine} />
        </div>

        <div className={styles.hero}>
          <h2 className={styles.title}>One product change. The right knowledge updates.</h2>
          <p className={styles.lede}>
            Track evaluates merged changes from the product repositories you choose, finds the documentation affected,
            and drafts an update only when the evidence says one is needed. Your team decides what lands.
          </p>
        </div>

        <div className={styles.stack}>
          <FeatureCard
            index={0}
            eyebrow="TAG IT"
            icon="@"
            title="Request a docs update from GitHub."
            description="In a connected GitHub repo, mention @thally on an issue or pull request to request a reviewable docs update."
            visual={<GitHubDemo />}
            caption="A no-change result is valid. Thally never pushes to main."
          />
          <DeckStage index={1}>
            {({ lift, scale, opacity, filter }) => (
              <FeatureCard
                index={1}
                eyebrow="THALLY TRACK"
                icon={<BranchIcon className="size-3.5" />}
                title="Thally maps merged product changes to affected knowledge."
                description="Choose the product repos Thally should watch. Track gathers evidence, finds affected docs, and drafts an update only when one is needed."
                visual={<TrackDemo />}
                caption="Ship to any watched repo: the right docs PR follows."
                track
                lift={lift}
                scale={scale}
                opacity={opacity}
                filter={filter}
              />
            )}
          </DeckStage>
          <DeckStage index={2}>
            {({ lift, scale, opacity, filter }) => (
              <FeatureCard
                index={2}
                eyebrow="SCORE IT"
                icon={<GaugeIcon className="size-3.5" />}
                title="Turn quality findings into fix PRs."
                description="The readiness report identifies the pages lowering your score. Ask Thally to prepare reviewable fixes for the findings it can resolve."
                visual={<ReadinessDemo />}
                caption="The readiness report in Thally Cloud: every deduction links to the page behind it."
                lift={lift}
                scale={scale}
                opacity={opacity}
                filter={filter}
              />
            )}
          </DeckStage>
        </div>
      </div>
    </section>
  );
}
