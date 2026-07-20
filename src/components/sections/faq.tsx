import { SectionGrid, SectionHeader } from "@/components/section-decor";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const homeQuestions = [
  {
    question: "What is Thally?",
    answer:
      "Thally is a documentation platform for people and AI assistants. Write your documentation once, then publish a polished website for readers and reliable, structured content for AI tools. Thally can also draft documentation updates when your product changes.",
  },
  {
    question: "How is Thally different from other docs tools?",
    answer:
      "Most documentation tools focus only on the website people read. Thally also publishes versions that AI assistants can understand, checks every update for quality, and drafts documentation changes when your product changes.",
  },
  {
    question: "How do I migrate from Mintlify, Docusaurus, or GitBook?",
    answer:
      "Run one migration command with your current documentation repository. Thally detects Mintlify, Docusaurus, GitBook, Nextra, VitePress, Starlight, or plain Markdown, then converts your pages, rebuilds navigation, preserves redirects, and imports your API documentation.",
  },
  {
    question: "How does Thally keep my docs up to date?",
    answer:
      "Connect your product repository and Thally watches for changes that affect your documentation. When a pull request merges, Thally drafts the relevant documentation updates for your team to review. It never publishes changes without your approval.",
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
      "Yes. Deploy the open-source engine to Vercel, Netlify, Cloudflare, Docker, or another compatible host. Thally Cloud can also manage hosting without taking ownership of your repository or domain.",
  },
  {
    question: "What happens if I cancel Thally Cloud?",
    answer:
      "Your documentation repository and published site remain yours. Paid services stop at the end of the billing period, while the free self-hosted engine continues to build and serve your documentation.",
  },
  {
    question: "What is included with Enterprise?",
    answer:
      "Enterprise adds SAML and SCIM single sign-on, audit-log access, custom terms, hands-on migration support, priority support, and a dedicated account manager under a custom annual contract.",
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
