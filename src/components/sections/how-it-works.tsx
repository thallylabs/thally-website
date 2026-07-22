import { BookOpen, Github, GitPullRequest, Radar } from "lucide-react";

import { SectionGrid, SectionHeader, SectionLines } from "@/components/section-decor";

const STEPS = [
  {
    title: "Choose a source",
    description: "Start fresh, connect an existing Thally repository, or migrate a public documentation site.",
    icon: BookOpen,
  },
  {
    title: "Publish from GitHub",
    description: "Thally creates or connects the documentation repository and publishes the site.",
    icon: Github,
  },
  {
    title: "Connect product repos",
    description: "After the site is live, choose the repositories, branches, and paths Track should watch.",
    icon: Radar,
  },
  {
    title: "Review docs changes",
    description: "For relevant merged product PRs, Thally prepares a docs PR. Your team decides what lands.",
    icon: GitPullRequest,
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding relative">
      <SectionGrid className="opacity-15" />
      <SectionLines />

      <div className="relative container">
        <SectionHeader
          eyebrow="How Thally works"
          title="First publish the docs. Then keep them current."
          description="Thally first creates, connects, or migrates the docs site. Once it is live, Track can watch product repositories and prepare review-gated updates."
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="border-border bg-card relative rounded-2xl border p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-muted-foreground font-mono text-xs">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
