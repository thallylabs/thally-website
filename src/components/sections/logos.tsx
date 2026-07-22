"use client";

import { Marquee, MarqueeContent, MarqueeItem } from "@/components/kibo-ui/marquee";

const AGENTS = ["Claude", "Cursor", "ChatGPT", "Copilot", "Perplexity", "Gemini", "v0", "Windsurf"];

export default function Logos() {
  return (
    <section className="bg-background overflow-hidden py-12 md:py-20 lg:py-24">
      <p className="text-muted-foreground container mb-8 text-center text-sm font-medium tracking-wide">
        Built for the AI tools your readers already use
      </p>
      <Marquee className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-2">
        <MarqueeContent speed={35}>
          {AGENTS.map((agent) => (
            <MarqueeItem key={agent} className="mx-8 md:mx-12">
              <span className="font-display text-muted-foreground/70 text-2xl font-semibold tracking-tight whitespace-nowrap">
                {agent}
              </span>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </section>
  );
}
