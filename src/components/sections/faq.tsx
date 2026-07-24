import { SectionGrid, SectionHeader } from "@/components/section-decor";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const homeQuestions = [
  {
    question: "What is Thally?",
    answer:
      "Thally is a product knowledge synchronization pipeline. It connects product changes to customer-facing knowledge, identifies what needs to change, and prepares reviewable updates. Documentation is the first surface.",
  },
  {
    question: "How is Thally different from other docs tools?",
    answer:
      "Most docs tools are destinations where teams write and store knowledge. Thally adds the pipeline between the product and those destinations. It understands what changed, finds the affected documentation, and drafts only the updates that evidence supports.",
  },
  {
    question: "How do I migrate from Mintlify, Docusaurus, or GitBook?",
    answer:
      "In Thally Cloud, provide your public docs URL to start a migration. To migrate locally, run the create-thally-docs CLI against a GitHub repository. Thally converts supported pages to MDX and rebuilds the navigation.",
  },
  {
    question: "How does Thally keep my docs up to date?",
    answer:
      "First publish or connect a Thally docs site. Then choose the product repositories Track should watch. When a relevant pull request merges, Track evaluates the change, identifies affected pages, and can draft an update for review. No change is a valid result, and Thally never merges by itself.",
  },
  {
    question: "How does Thally check documentation quality?",
    answer:
      "Every build receives a 0 to 100 quality score. Thally checks whether people and AI tools can find, read, and understand each page, then shows you what needs attention. You can prevent lower-quality changes from publishing and ask Thally to draft the fixes.",
  },
  {
    question: "How can AI assistants read my docs?",
    answer:
      "Every Thally page can return HTML, JSON, JSON-LD, or Markdown from the same source. AI assistants can search your docs, open pages, and follow your navigation without scraping the visual website.",
  },
  {
    question: "Does Thally update every knowledge surface today?",
    answer:
      "Not yet. Documentation is the first surface, including the guides, API references, examples, and release notes maintained in your docs repository. The product is designed to expand from that wedge into the wider knowledge ecosystem around your product.",
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
              ? "Find answers about plans, billing, hosting, cancellation, and Enterprise support."
              : "Find answers about product change intelligence, documentation automation, migration, AI tools, and how Thally fits your stack."
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
