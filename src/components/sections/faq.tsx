"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { Plus } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";

const homeQuestions = [
  {
    question: "What is Thally?",
    answer:
      "Thally keeps your documentation in step with your product. It watches the changes your team merges, works out which pages they affect, and opens the update as a pull request with the evidence attached. You review and merge, the same way you ship code.",
  },
  {
    question: "How is Thally different from other docs tools?",
    answer:
      "Other docs tools give you somewhere to write. Thally does the work that keeps what you wrote true. It reads merged product changes, finds the pages they contradict, and drafts the fix alongside the diff that caused it. Your docs stop drifting between releases without anyone having to chase them.",
  },
  {
    question: "How do I migrate from Mintlify, Docusaurus, or GitBook?",
    answer:
      "Give Thally Cloud your public docs URL, or run the create-thally-docs CLI against your repository. Thally converts your pages to MDX, rebuilds the navigation, and hands back a project you own. Nextra, VitePress, and Starlight migrate the same way.",
  },
  {
    question: "How does Thally keep my docs up to date?",
    answer:
      "Publish or connect a docs site, then pick the product repositories Thally Track should watch. Every relevant merge gets read, mapped to the pages it affects, and turned into a reviewable documentation PR. Track tells you when nothing needs changing, and nothing reaches your readers without your approval.",
  },
  {
    question: "How does Thally check documentation quality?",
    answer:
      "Every build gets a 0 to 100 agent readiness score for whether people and AI tools can find, read, and understand each page. Gate your CI on it to stop regressions at the pull request, and ask Thally to open the PR that fixes whatever it flagged.",
  },
  {
    question: "How can AI assistants read my docs?",
    answer:
      "Directly, with no scraping. Every deployed site ships a remote MCP server at /api/mcp, so assistants can search your docs, open pages, and follow your navigation as a tool. The same URLs also serve Markdown and JSON for anything that simply fetches.",
  },
  {
    question: "What does Thally cover today?",
    answer:
      "Documentation, end to end: the guides, API references, examples, and release notes in your docs repository. That is where drift costs you the most, so it is where Thally goes deepest. The wider knowledge surfaces around your product are next on the same pipeline.",
  },
];

const pricingQuestions = [
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Free plan includes one managed documentation site per workspace, free hosting, a custom domain, agent-readiness checks, and unlimited pages and readers. You can also self-host the MIT-licensed engine for free, including commercial use.",
  },
  {
    question: "How much does Thally Cloud cost?",
    answer:
      "Thally Cloud costs $60 per workspace each month, or $50 per workspace each month on an annual subscription billed monthly. Both options include 10,000 AI credits per month, three team members, and a 14-day trial.",
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
      "Your documentation repository and the MIT-licensed engine remain yours. Paid Cloud services stop at the end of the billing period. If Cloud hosts the site, deploy the repository elsewhere before managed hosting ends.",
  },
  {
    question: "What is included with Enterprise?",
    answer:
      "Enterprise is scoped with each customer. Talk to us about security, identity, migration, support, and contract requirements for your organization.",
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
                : "What Thally does, how it keeps your docs current, what migration takes, and how it fits the stack you already have."}
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
