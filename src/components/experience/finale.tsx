"use client";

import { useState } from "react";

import { ShaderField } from "@/components/experience/shader-field";
import { ArrowRight, Check, Copy } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { DESTINATIONS } from "@/lib/site";

const COMMAND = "npx create-thally migrate github.com/acme/docs";

export function Finale() {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access denied; the command is still selectable.
    }
  }

  return (
    <section className="bg-accent relative mx-2.5 mb-2.5 overflow-hidden rounded-4xl lg:mx-4">
      <ShaderField
        className="opacity-60 dark:opacity-100"
        colors={{ bg: "var(--accent)", ink: "var(--chart-3)", glow: "var(--chart-1)" }}
        speed={1.25}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--accent)_95%)]"
      />

      <div className="reveal-rise relative container flex flex-col items-center py-24 text-center md:py-36">
        <h2 className="font-display text-foreground max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
          Ship docs that every reader can actually read.
        </h2>
        <p className="text-muted-foreground mt-5 max-w-xl text-lg font-medium text-pretty md:text-xl">
          Humans, agents, crawlers, and answer engines. One source, one URL, zero drift. Free to self-host forever.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="cta-shine w-full sm:w-auto">
            <a href={DESTINATIONS.signup}>
              Start free
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button variant="outline" asChild size="lg" className="bg-background/60 w-full backdrop-blur sm:w-auto">
            <a href={DESTINATIONS.docsQuickstart}>Read the quickstart</a>
          </Button>
        </div>

        <button
          type="button"
          onClick={copyCommand}
          className="border-border/80 bg-background/70 text-muted-foreground hover:text-foreground group mt-10 inline-flex max-w-full items-center gap-3 rounded-full border px-4 py-2 font-mono text-xs backdrop-blur transition-colors sm:text-sm"
          aria-label={copied ? "Command copied" : `Copy command: ${COMMAND}`}
        >
          <span className="text-chart-1 select-none" aria-hidden>
            $
          </span>
          <span className="truncate">{COMMAND}</span>
          {copied ? (
            <Check className="text-chart-1 size-3.5 shrink-0" />
          ) : (
            <Copy className="size-3.5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
          )}
        </button>
        <p className="text-muted-foreground/80 mt-3 text-xs">
          Brings your Mintlify, Docusaurus, or GitBook site over in one command.
        </p>
      </div>
    </section>
  );
}
