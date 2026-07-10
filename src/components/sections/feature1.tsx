import Image from "next/image";

import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";

const SOLUTIONS = [
  {
    industry: "Product guides",
    headline: "Write guides in MDX with 25+ built-in components: Steps, Tabs, Cards, Mermaid, and more.",
    image: "/images/solutions/moritz-lange-sGGFcc7wrp4-unsplash.jpg",
    stat: "4 formats from one source",
    accent: "var(--chart-5)",
  },
  {
    industry: "API reference",
    headline: "Drop in an OpenAPI spec and get parameter tables, code samples, and a live Try-it console.",
    image: "/images/solutions/redd-francisco-3iLBNFje3oM-unsplash.jpg",
    stat: "Zero drift from your spec",
    accent: "var(--chart-2)",
  },
  {
    industry: "Changelog, search & more",
    headline: "RSS-backed changelogs, hybrid ⌘K search, versioning, and one-command translation to any locale.",
    image: "/images/solutions/caleb-ruiter-EmEQ6kK_5P0-unsplash.jpg",
    stat: "Search resolves in under 50ms",
    accent: "var(--chart-1)",
  },
];

export const Feature1 = () => {
  return (
    <section id="solutions" className="section-padding relative">
      <SectionGrid className="opacity-25" />
      <SectionLines />

      <div className="relative container">
        <SectionHeader
          title="Every page your product needs, from one source"
          description="Product guides, API references, and changelogs are all projections of the same typed content graph, written once in MDX and never maintained by hand."
        />

        <div className="mt-10 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {SOLUTIONS.map((item) => (
            <article
              key={item.industry}
              className="group border-border bg-card relative overflow-hidden rounded-2xl border"
            >
              <div className="relative aspect-3/4 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.industry}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/5" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6">
                  <span className="text-primary-foreground/80 text-xs font-medium tracking-wide uppercase">
                    {item.industry}
                  </span>
                  <p className="text-primary-foreground mt-2 text-xl leading-snug font-semibold text-balance lg:text-2xl">
                    {item.headline}
                  </p>
                  <p className="text-primary-foreground/75 mt-4 text-sm">{item.stat}</p>
                </div>
              </div>
              <div
                aria-hidden
                className="absolute top-4 right-4 size-8 border-t border-r"
                style={{ borderColor: `color-mix(in oklab, ${item.accent} 40%, transparent)` }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
