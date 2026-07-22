const AGENTS = ["Claude", "Cursor", "ChatGPT", "Copilot", "Perplexity", "Gemini", "v0", "Windsurf"];

function AgentNames({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="logos-marquee-track flex min-w-max shrink-0 items-center" aria-hidden={hidden || undefined}>
      {AGENTS.map((agent) => (
        <span
          key={agent}
          className="font-display text-muted-foreground/70 px-8 text-2xl font-semibold tracking-tight whitespace-nowrap md:px-12"
        >
          {agent}
        </span>
      ))}
    </div>
  );
}

export default function Logos() {
  return (
    <section className="bg-background overflow-hidden py-12 md:py-20 lg:py-24">
      <p className="text-muted-foreground container mb-8 text-center text-sm font-medium tracking-wide">
        Built for the AI tools your readers already use
      </p>
      <div className="logos-marquee mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] flex overflow-hidden py-2">
        <AgentNames />
        <AgentNames hidden />
      </div>
    </section>
  );
}
