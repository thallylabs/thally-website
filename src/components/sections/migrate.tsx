"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { SectionGrid, SectionHeader } from "@/components/section-decor";

const SOURCES = ["Mintlify", "Docusaurus", "GitBook", "Nextra", "VitePress", "Starlight", "Plain Markdown"];

const TARGETS = ["Vercel", "Netlify", "Cloudflare", "Docker", "Static export"];

const TERMINAL_LINES: { text: string; tone: "cmd" | "ok" | "next" }[] = [
  { text: "npx create-thally migrate github.com/acme/docs", tone: "cmd" },
  { text: "Detected Mintlify (mint.json)", tone: "ok" },
  { text: "52 pages converted to clean MDX", tone: "ok" },
  { text: "Navigation rebuilt, redirects carried over", tone: "ok" },
  { text: "OpenAPI spec wired to the API Reference tab", tone: "ok" },
  { text: "cd acme-docs && npm run dev", tone: "next" },
];

export const Migrate = () => {
  const reduce = useReducedMotion();

  return (
    <section id="migrate" className="section-padding relative">
      <SectionGrid className="opacity-15" mask="linear-gradient(to bottom,black,transparent_70%)" />

      <div className="relative container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              title="Move in with one command. Leave whenever you want."
              description="The migrator detects your current platform, converts every page to clean MDX, rebuilds the navigation, carries your redirects, and wires up your OpenAPI spec. No manual copying, no reformatting."
              layout="stack"
            />

            <div className="mt-8">
              <p className="text-muted-foreground text-sm font-medium">Migrates from</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SOURCES.map((source) => (
                  <li
                    key={source}
                    className="border-border bg-card rounded-full border px-3.5 py-1.5 text-sm font-medium"
                  >
                    {source}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="text-muted-foreground text-sm font-medium">Deploys to</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {TARGETS.map((target) => (
                  <li key={target} className="flex items-center gap-1.5 text-sm font-medium">
                    <Check className="size-3.5" style={{ color: "var(--chart-5)" }} strokeWidth={2.5} />
                    {target}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
                Your docs are a Next.js repo you own, MIT licensed. There is no hosted middleman to outgrow and
                nothing to export your way out of later.
              </p>
            </div>
          </div>

          <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
            <div className="border-border flex items-center gap-1.5 border-b px-4 py-3">
              <span className="bg-border size-2.5 rounded-full" />
              <span className="bg-border size-2.5 rounded-full" />
              <span className="bg-border size-2.5 rounded-full" />
              <span className="text-muted-foreground ml-2 font-mono text-[11px]">migrate.sh</span>
            </div>
            <div className="space-y-2.5 p-5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
              {TERMINAL_LINES.map((line, i) => (
                <motion.p
                  key={line.text}
                  className="flex items-start gap-2"
                  initial={reduce ? undefined : { opacity: 0, x: -6 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3, delay: i * 0.12 }}
                >
                  {line.tone === "cmd" && (
                    <>
                      <span className="text-muted-foreground select-none">$</span>
                      <span className="font-semibold">{line.text}</span>
                    </>
                  )}
                  {line.tone === "ok" && (
                    <>
                      <span className="select-none" style={{ color: "var(--chart-5)" }}>
                        ✓
                      </span>
                      <span className="text-muted-foreground">{line.text}</span>
                    </>
                  )}
                  {line.tone === "next" && (
                    <>
                      <span className="select-none" style={{ color: "var(--chart-2)" }}>
                        →
                      </span>
                      <span style={{ color: "var(--chart-2)" }}>{line.text}</span>
                    </>
                  )}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
