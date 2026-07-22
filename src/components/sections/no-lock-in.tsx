import { SectionGrid, SectionLines } from "@/components/section-decor";

const guarantees = [
  {
    number: "01",
    title: "Your content stays in your repository",
    description:
      "Your documentation remains as source files in your repository. There is nothing to export because we never hold the source.",
  },
  {
    number: "02",
    title: "The publishing engine is open source",
    description:
      "The engine behind Thally Cloud is available on GitHub under the MIT open-source license. You can host it yourself at any time.",
  },
  {
    number: "03",
    title: "Self-hosting stays available",
    description:
      "Clone the repository and deploy the open-source engine wherever Next.js runs. Managed hosting is a service, not a content lock-in.",
  },
  {
    number: "04",
    title: "Your domain stays under your control",
    description: "Thally never takes ownership of your domain. Use it wherever you deploy the site.",
  },
  {
    number: "05",
    title: "Cancellation leaves you with the source",
    description:
      "Your repository and the MIT-licensed engine remain yours. If Cloud hosting ends, you can deploy the site elsewhere.",
  },
];

export function NoLockIn() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
      <SectionGrid className="opacity-10" mask="linear-gradient(to_bottom,black,transparent_78%)" />
      <SectionLines />

      <div className="relative container">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 xl:gap-32">
          <div className="lg:pt-3">
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Designed for flexibility
            </p>
            <h2 className="font-display mt-5 max-w-xl text-4xl leading-[1.03] font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">
              Pay for the service. Keep the source.
            </h2>
            <p className="text-muted-foreground mt-7 max-w-lg text-lg leading-relaxed text-pretty md:text-xl">
              Thally Cloud provides hosting and paid services without taking ownership of your content, repository,
              publishing engine, or domain.
            </p>

            <div
              className="mt-14 max-w-lg md:mt-20"
              aria-label="Your repository can deploy through Thally Cloud or anywhere else"
            >
              <div className="border-border border-y py-5">
                <p className="text-muted-foreground text-xs tracking-wide uppercase">The part you always own</p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="font-mono text-sm font-medium">Your documentation repository</span>
                  <span className="text-chart-5 text-sm font-medium">Source files in Git</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-5">
                <div>
                  <p className="text-muted-foreground text-xs">Deploy with</p>
                  <p className="mt-1 text-sm font-semibold">Thally Cloud</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Or run</p>
                  <p className="mt-1 text-sm font-semibold">The open-source engine</p>
                </div>
              </div>
            </div>
          </div>

          <ol className="border-border border-t">
            {guarantees.map(({ number, title, description }) => (
              <li
                key={number}
                className="border-border grid gap-3 border-b py-7 sm:grid-cols-[3rem_1fr] sm:gap-5 md:py-9"
              >
                <span className="text-muted-foreground pt-0.5 font-mono text-xs">{number}</span>
                <div className="max-w-xl">
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty md:text-base">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
