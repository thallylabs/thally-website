import { SectionGrid, SectionHeader } from "@/components/section-decor";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const homeQuestions = [
  {
    question: "What is Thally?",
    answer:
      "Thally is a documentation platform for publishing one source for people and AI tools. Start a new site or bring your existing docs, then connect product repositories if you want Track to draft reviewable updates.",
  },
  {
    question: "How is Thally different from other docs tools?",
    answer:
      "Thally keeps the documentation source and publishing engine under your control. The same content serves people and AI tools, and Track can draft docs PRs from relevant merged product changes after you connect the repositories.",
  },
  {
    question: "How do I migrate from Mintlify, Docusaurus, or GitBook?",
    answer:
      "In Thally Cloud, choose the migration path and provide your public docs site. For a local migration, run the create-thally-docs CLI against a GitHub repository. Thally converts supported pages to MDX and rebuilds the navigation.",
  },
  {
    question: "How does Thally keep my docs up to date?",
    answer:
      "First publish or connect a Thally docs site. Then choose the product repositories Track should watch. When a relevant pull request merges, Track can draft a documentation update for review. It can also decide that no docs change is needed, and it never merges by itself.",
  },
  {
    question: "How does Thally check documentation quality?",
    answer:
      "Every build receives a 0 to 100 quality score. Thally checks whether people and AI tools can find, read, and understand each page, then shows you what needs attention. You can prevent lower-quality changes from publishing and ask Thally to draft the fixes.",
  },
  {
    question: "How can AI assistants read my docs?",
    answer:
      "Every Thally site automatically publishes versions of your documentation that AI assistants can read reliably. Assistants can search your docs, open pages, and follow your navigation without scraping the visual website.",
  },
];

const pricingQuestions = [
  {
    question: "Is there a free plan?",
    answer:
      "Yes. Thally is MIT licensed and free to self-host forever, including commercial use, with unlimited documentation pages and readers.",
  },
  {
    question: "How much does Thally Cloud cost?",
    answer:
      "Thally Cloud costs $60 per workspace each month, or $50 per workspace each month on an annual subscription billed monthly. Both options include three team members and a 14-day trial.",
  },
  {
    question: "Are documentation readers billed?",
    answer:
      "No. Public documentation readers are free and unlimited on every plan. Thally Cloud pricing applies to the workspace and its active team members, not the people reading your docs.",
  },
  {
    question: "Can I use my own hosting?",
    answer:
      "Yes. The open-source engine can run on Vercel, Netlify, Cloudflare, Docker, or another compatible host. Thally Cloud is the managed-hosting path and does not take ownership of your repository or domain.",
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

export const FAQ = ({ context = "home" }: { context?: "home" | "pricing" }) => {
  const questions = context === "pricing" ? pricingQuestions : homeQuestions;
  const midpoint = Math.ceil(questions.length / 2);
  const leftQuestions = questions.slice(0, midpoint);
  const rightQuestions = questions.slice(midpoint);
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
    <section className="relative pb-16 md:pb-28 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SectionGrid className="opacity-10" mask="radial-gradient(ellipse_at_bottom,black,transparent_70%)" />
      <div className="relative container mx-auto lg:max-w-5xl">
        <SectionHeader
          title="Frequently asked questions"
          description={
            context === "pricing"
              ? "Clear answers about plans, billing, hosting, cancellation, and Enterprise support."
              : "Quick answers about migration, automation, agents, self-hosting, and how Thally fits your stack."
          }
          align="center"
          layout="stack"
          className="mx-auto"
        />

        <div className="mt-8 grid gap-x-12 md:mt-12 md:grid-cols-2 lg:mt-16">
          <Accordion type="single" collapsible className="text-muted-foreground border-border border-t">
            {leftQuestions.map((item, i) => (
              <AccordionItem key={i} value={`left-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion collapsible type="single" className="text-muted-foreground border-border md:border-t">
            {rightQuestions.map((item, i) => (
              <AccordionItem key={i} value={`right-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
