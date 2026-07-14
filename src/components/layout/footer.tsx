import { Github, Twitter } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { SectionGrid } from "@/components/section-decor";
import { Button } from "@/components/ui/button";
import { DESTINATIONS, SOCIAL } from "@/lib/site";

const navigation = [
  {
    title: "Product",
    links: [
      { name: "Automation", href: "/#automation" },
      { name: "Features", href: "/#features" },
      { name: "Migration", href: "/#migrate" },
      { name: "Admin dashboard", href: "/#dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Documentation", href: DESTINATIONS.docs },
      { name: "FAQ", href: "/faq" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of service", href: "/terms" },
      { name: "Privacy policy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: SOCIAL.github, label: "GitHub" },
  { icon: Twitter, href: SOCIAL.x, label: "X" },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground dark:border-border relative overflow-hidden border-t border-transparent">
      <SectionGrid className="[mask-image:linear-gradient(to_bottom,black,transparent)] opacity-10" />

      <div className="relative container">
        <div className="border-primary-foreground/15 dark:border-border flex flex-col items-start gap-8 border-b py-14 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="flex items-center gap-4">
            <Logo
              inverted
              hideWordmark
              markClassName="size-7"
              className="text-primary-foreground dark:text-foreground"
            />
            <h2 className="font-display max-w-md text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
              Docs every reader can trust.
            </h2>
          </div>
          <Button asChild variant="secondary" size="lg">
            <Link href={DESTINATIONS.signup}>Start free</Link>
          </Button>
        </div>

        <nav className="border-primary-foreground/15 dark:border-border grid grid-cols-2 gap-y-10 border-b py-12 sm:grid-cols-4 md:py-16">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold tracking-wide uppercase opacity-70">{section.title}</h3>
              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground dark:text-muted-foreground dark:hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 py-8">
          <p className="text-primary-foreground/60 dark:text-muted-foreground text-sm">
            © Thally - All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link
                aria-label={link.label}
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 dark:border-border dark:text-foreground dark:hover:bg-accent flex size-9 items-center justify-center rounded-full border transition-colors"
              >
                <link.icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
