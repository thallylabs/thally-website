import { SectionGrid, SectionHeader } from "@/components/section-decor";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const leftQuestions = [
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
    question: "Can Thally write docs for me?",
    answer:
      "Yes. Give Thally an instruction or connect it to a product change. It drafts a focused documentation update in your team’s style and sends it for review. Thally never publishes the change without your approval.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Thally is MIT licensed and free to self-host forever, including for commercial use. Paid plans add managed hosting, cited AI answers, automatic draft updates when your product changes, and shared workspace features.",
  },
];

const rightQuestions = [
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
  {
    question: "How does the AI chat avoid hallucinating?",
    answer:
      "The AI answers only from your published documentation and links to the exact source pages. If your docs do not contain an answer, it says so instead of guessing.",
  },
  {
    question: "Where can I deploy Thally?",
    answer:
      "Deploy with Vercel, Netlify, Cloudflare, Docker, or as a static website. You can also use Thally Cloud. In every case, your documentation remains in a repository you own.",
  },
  {
    question: "What's in the admin dashboard?",
    answer:
      "The dashboard shows reader analytics, branding controls, documentation quality checks, and draft updates waiting for review. Cloud teams also get secure sign-in and workspace permissions for owners, editors, and viewers.",
  },
  {
    question: "Does Thally support multiple languages?",
    answer:
      "Yes. One command translates your site while preserving code samples, components, and URLs. Each language gets pages that search engines can find, a built-in language switcher, and sensible fallbacks when a translation is missing.",
  },
];

const allQuestions = [...leftQuestions, ...rightQuestions];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allQuestions.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const FAQ = () => {
  return (
    <section className="relative pb-16 md:pb-28 lg:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SectionGrid className="opacity-10" mask="radial-gradient(ellipse_at_bottom,black,transparent_70%)" />
      <div className="relative container mx-auto lg:max-w-5xl">
        <SectionHeader
          title="Frequently asked questions"
          description="Quick answers about migration, automation, agents, self-hosting, and how Thally fits your stack."
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
