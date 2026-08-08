import type { ReactNode } from "react";

type LegalOutlineItem = {
  href: `#${string}`;
  label: string;
};

type LegalOutlineGroup = {
  label: string;
  items: LegalOutlineItem[];
};

type LegalSummaryItem = {
  title: string;
  description: string;
};

type LegalPageProps = {
  documentLabel: string;
  title: string;
  description: string;
  updated: string;
  summary: LegalSummaryItem[];
  outline: LegalOutlineGroup[];
  children: ReactNode;
};

function Outline({ groups }: { groups: LegalOutlineGroup[] }) {
  return (
    <nav aria-label="On this page">
      <p className="text-foreground text-sm font-semibold">On this page</p>
      <div className="mt-5 space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="text-muted-foreground mb-2 text-[0.6875rem] font-semibold tracking-[0.12em] uppercase">
              {group.label}
            </p>
            <ul className="border-border space-y-1 border-l">
              {group.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:border-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background -ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-5 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export function LegalPage({ documentLabel, title, description, updated, summary, outline, children }: LegalPageProps) {
  return (
    <div className="border-border border-t">
      <header className="relative overflow-hidden border-b">
        <div
          aria-hidden="true"
          className="bg-primary/[0.035] absolute inset-x-0 top-0 h-64 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="relative container py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-sm font-semibold tracking-[0.12em] uppercase">
              Legal · {documentLabel}
            </p>
            <h1 className="font-display mt-5 text-4xl leading-[1.05] font-semibold tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8 text-pretty sm:text-xl">
              {description}
            </p>
            <p className="text-muted-foreground mt-7 text-sm">
              Last updated <span className="text-foreground font-medium">{updated}</span>
            </p>
          </div>

          <section aria-labelledby="summary-title" className="border-border mt-12 max-w-5xl border-y">
            <h2 id="summary-title" className="sr-only">
              At a glance
            </h2>
            <div className="grid md:grid-cols-2">
              {summary.map((item, index) => (
                <div
                  key={item.title}
                  className={`py-6 md:px-7 ${index % 2 === 0 ? "md:border-r" : ""} ${index >= 2 ? "border-t" : index === 1 ? "border-t md:border-t-0" : ""}`}
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-muted-foreground mt-2 max-w-md text-sm leading-6 text-pretty">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </header>

      <div className="container py-12 sm:py-16 lg:py-24">
        <details className="border-border bg-muted/35 mb-12 rounded-xl border p-5 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold">Browse this document</summary>
          <div className="mt-5">
            <Outline groups={outline} />
          </div>
        </details>

        <div className="grid items-start gap-14 lg:grid-cols-[13rem_minmax(0,46rem)] lg:justify-center xl:grid-cols-[14rem_minmax(0,48rem)] xl:gap-20">
          <aside className="sticky top-8 hidden max-h-[calc(100vh-4rem)] overflow-y-auto pr-3 lg:block">
            <Outline groups={outline} />
          </aside>

          <article className="legal-prose prose prose-lg dark:prose-invert max-w-none">{children}</article>
        </div>
      </div>
    </div>
  );
}
