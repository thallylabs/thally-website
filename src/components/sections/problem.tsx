"use client";

import { BannerBoard, type BoardCard, QuotePanels } from "@/components/feature-template/feature-template";
import { Search } from "@/components/icons";

const columns: BoardCard[][] = [
  [
    {
      kind: "task",
      chips: [
        { label: "Product notes", tone: "kind" },
        { label: "Source", tone: "low" },
      ],
      id: "01",
      title: "What was meant to ship?",
      desc: "Read the product brief and tickets, then compare them with the merged change.",
    },
    {
      kind: "task",
      chips: [
        { label: "Git diff", tone: "kind" },
        { label: "Evidence", tone: "low" },
      ],
      id: "02",
      title: "What actually changed?",
      desc: "Check the changelog, code diff, tests, and pull request discussion.",
    },
  ],
  [
    {
      kind: "checklist",
      chips: [
        { label: "Impact", tone: "kind" },
        { label: "Manual review", tone: "low" },
      ],
      id: "03",
      title: "Which public surfaces are now out of step?",
      desc: "Someone still has to find every place where customers learn about the product.",
      items: [
        { label: "API reference" },
        { label: "Quickstart guide" },
        { label: "Website" },
        { label: "Help center" },
        { label: "Old code samples" },
        { label: "Integration guides" },
      ],
    },
  ],
  [
    {
      kind: "visual",
      chips: [{ label: "The hidden task", tone: "kind" }],
      id: "04",
      icon: <Search className="size-8" />,
      title: "Six surfaces, no shared owner",
      desc: "Most teams update the docs and stop there because another release is already waiting.",
    },
  ],
];

export function Problem() {
  return (
    <QuotePanels
      title="You know the drill."
      media={
        <div className="h-full bg-[#07090d]">
          <BannerBoard columns={columns} dense />
        </div>
      }
      quoteAttribution="The work before the work"
      quote="A feature ships. Then someone has to work out what changed and every public place that now says something wrong."
      wideQuote="You read product notes, tickets, changelogs, and the diff, then check the docs, website, help center, code samples, and integration guides. Thally does that detective work before it drafts a word."
    />
  );
}
