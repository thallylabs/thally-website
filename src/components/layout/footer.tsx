import { Github } from "lucide-react";
import Link from "next/link";

import { ThallyMark } from "@/components/layout/logo";
import { DESTINATIONS, LEGAL_ENTITY_NAME, SOCIAL } from "@/lib/site";

const navigation = [
  {
    title: "Product",
    links: [
      { name: "Thally Track", href: "/features/track" },
      { name: "Automation", href: "/features/automation" },
      { name: "Content Graph", href: "/features/content-graph" },
      { name: "Agent Layer", href: "/features/agent-layer" },
      { name: "Migration & Hosting", href: "/features/migration-hosting" },
      { name: "Cloud Dashboard", href: "/features/cloud-dashboard" },
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

/**
 * Template footer: a charcoal rounded card floating over the night
 * illustration, with a big tagline, link columns, and a giant wordmark.
 */
export const Footer = () => {
  return (
    <footer className="bg-canvas relative overflow-hidden pt-[120px]">
      {/* Photographic backdrop */}
      <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[52px]">
        <img src="/template/footer-1-1.webp" alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000104]/70 via-[#000104]/85 to-[#000104]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1480px] px-5 pb-2">
        <div className="border-canvas-hairline mb-6 rounded-[30px] border bg-[#08090c] p-8 sm:p-14 lg:mt-[150px] lg:mb-10 lg:p-20">
          <h2 className="heading-section max-w-3xl text-white">Docs that keep up with your products.</h2>

          <div className="mt-20 flex flex-col justify-between gap-12 lg:mt-28 lg:flex-row">
            <div className="flex flex-col justify-end gap-5">
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                <Github className="size-5" />
              </a>
              <p className="max-w-xs text-sm text-[#afafaf]">
                The open-source engine behind Thally Cloud is MIT licensed. Your content stays in your repository.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-16">
              {navigation.map((column) => (
                <div key={column.title} className="flex flex-col gap-5">
                  <p className="text-lg font-medium text-white">{column.title}</p>
                  <ul className="flex flex-col gap-3.5">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-[15px] text-[#afafaf] transition-colors hover:text-white"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="text-sm text-[#afafaf]">© Thally. All rights reserved.</p>
            <p className="text-sm text-[#afafaf]">
              <a href={DESTINATIONS.signup} className="text-white underline-offset-4 hover:underline">
                Create your docs site
              </a>
            </p>
          </div>
        </div>

        {/* Giant wordmark, template .footer-logo-block */}
        <div aria-hidden className="pointer-events-none flex items-end justify-center gap-6 pb-4 select-none">
          <ThallyMark inverted className="size-[clamp(3rem,10vw,9rem)] opacity-95" />
          <span className="font-display text-[clamp(4rem,16vw,15rem)] leading-none font-semibold tracking-[-0.06em] text-white">
            Thally
          </span>
        </div>
      </div>
    </footer>
  );
};
