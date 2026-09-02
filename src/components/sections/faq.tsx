"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { Plus } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const homeQuestions = [
  {
    question: "What is Thally?",
    answer:
      "Thally is the product knowledge layer for software teams. You create your documentation site on Thally, connect your product repositories, and connect the other surfaces that explain your product: website, help center, changelog. When the product changes, Thally finds every page the change affects and drafts the update as a pull request with the evidence attached. You review and merge.",
  },
  {
    question: "How is Thally different from other docs tools?",
    answer:
      "Other docs tools give you somewhere to write. Thally does the work that keeps what you wrote true, and not only in the docs. It reads merged product changes, traces them across docs, website, and help center, and drafts each fix alongside the diff that caused it. Your surfaces stop drifting apart between releases.",
  },
  {
    question: "Which surfaces can Thally keep current?",
    answer:
      "Documentation first: guides, API references, examples, and release notes in your docs repository. Connected surfaces run on the same pipeline: your marketing site, help center or support articles, and changelog. Each surface gets its own reviewable update, with the same evidence behind it.",
  },
  {
    question: "How does Thally decide what needs to change?",
    answer:
      "It starts from evidence: the diff, the pull request discussion, and any linked tickets. Every candidate page gets a confidence score and the sources that earned it. If the evidence does not support an update, Thally says so instead of inventing one.",
  },
  {
    question: "Will Thally publish something wrong on my website?",
    answer:
      "No. Thally never pushes to main and never publishes on its own. Every update is a pull request or a draft for your team to approve, with the diff that justified it attached. If you reject it, nothing changes. If you edit it, your edit is what ships.",
  },
  {
    question: "When does Thally run?",
    answer:
      "On every merge, when a pull request opens, or on a schedule you choose. You can also mention @thally on a pull request to ask for a specific update, and run drift sweeps across existing pages.",
  },
  {
    question: "How do I migrate from Mintlify, Docusaurus, or GitBook?",
    answer:
      "Give Thally Cloud your public docs URL, or run the create-thally-docs CLI against your repository. Thally converts your pages to MDX, rebuilds the navigation, and hands back a project you own. Nextra, VitePress, and Starlight migrate the same way.",
  },
  {
    question: "How can AI assistants read my docs?",
    answer:
      "Directly, with no scraping. Every deployed site ships a remote MCP server at /api/mcp, so assistants can search your docs, open pages, and follow your navigation as a tool. The same URLs also serve Markdown and JSON for anything that simply fetches. Keeping those pages current is the point: a stale page is now a wrong answer.",
  },
];

const pricingQuestions = [
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan includes one managed documentation site per workspace, pull-request previews, documentation analytics, and unlimited pages and readers. You can also self-host the MIT-licensed engine for free, including commercial use.",
  },
  {
    question: "How much does Thally Cloud cost?",
    answer:
      "Thally Cloud costs $199 per workspace each month, or the equivalent of $166 per month with $1,990 billed annually. Both options include three managed sites, unlimited connected product repositories, 10,000 shared monthly AI credits that roll over, five team members, and a 14-day trial.",
  },
  {
    question: "What happens when I need more capacity?",
    answer:
      "Add team members for $20 per month or $200 per year, and managed sites for $39 per month or $390 per year. A one-time $79 pack adds 10,000 AI credits. Credit packs never auto-recharge.",
  },
  {
    question: "Are documentation readers billed?",
    answer:
      "No. Public documentation readers are free and unlimited on every plan. Thally Cloud pricing applies to the workspace and its active team members, not the people reading your docs.",
  },
  {
    question: "Can I use my own hosting?",
    answer:
      "Yes. The open-source engine can run on Vercel, Netlify, Cloudflare, Docker, or another compatible host. The Free plan also includes managed hosting for one site per workspace. Thally does not take ownership of your repository or domain.",
  },
  {
    question: "What happens if I cancel Thally Cloud?",
    answer:
      "Your workspace returns to the Free plan at the end of the billing period. Its oldest managed site stays online with previews and analytics, while additional sites and paid-only services pause until you upgrade again. Your repository and the MIT-licensed engine remain yours.",
  },
  {
    question: "What is included with Enterprise?",
    answer:
      "Enterprise is tailored to each organization. It adds custom site, member, and AI allowances, security review, invoicing, custom contract terms, assisted migration planning, and priority rollout support.",
  },
];

/** Template faq-section: numbered accordion cards with rotating plus icons. */
export const FAQ = ({ context = "home" }: { context?: "home" | "pricing" }) => {
  const questions = context === "pricing" ? pricingQuestions : homeQuestions;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-canvas marketing-section-pad relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="mx-auto w-full max-w-[1296px] px-5">
        <div className="mx-auto mb-16 max-w-[628px] text-center">
          <SplitReveal as="h2" mode="chars" className="heading-section text-canvas-foreground">
            Frequently asked questions
          </SplitReveal>
          <Reveal delay={0.15} distance={20}>
            <p className="text-canvas-muted mt-5 text-lg">
              {context === "pricing"
                ? "Find answers about plans, billing, hosting, cancellation, and Enterprise support."
                : "What Thally does, which surfaces it keeps current, how it decides what to change, and how it fits the stack you already have."}
            </p>
          </Reveal>
        </div>

        <AccordionPrimitive.Root type="single" collapsible className="flex flex-col gap-6">
          {questions.map((item, i) => (
            <Reveal key={item.question} delay={0.1 + i * 0.05} distance={30}>
              <AccordionPrimitive.Item
                value={`item-${i}`}
                className="border-canvas-card-stroke group rounded-[24px] border"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-5 p-7 pb-5 text-left">
                    <span className="text-canvas-foreground text-lg tracking-[-0.04em] sm:text-xl">
                      <span className="text-canvas-muted-2 mr-2 font-mono text-sm">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      {item.question}
                    </span>
                    <span className="bg-canvas-card-stroke flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-data-[state=open]:rotate-45">
                      <Plus className="text-canvas-foreground size-5" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                  <p className="text-canvas-muted max-w-2xl px-7 pb-7">{item.answer}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            </Reveal>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
};
