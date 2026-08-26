"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  Account,
  Cloud,
  Docs,
  GitBranch,
  GitPullRequest,
  Guide,
  Mcp,
  Overview,
  Structured,
  Team,
  Terminal,
  Track,
} from "@/components/icons";
import { ThallyMark } from "@/components/layout/logo";
import { useRenderTier } from "@/components/motion/use-render-tier";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { prefersCheapCompositing } from "@/lib/render-tier";
import { DESTINATIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // Template "Header Scroll" (a-52): the pill contracts continuously
  // with scroll position until it reaches its persistent width, while
  // the background fades to #19181b and the wordmark collapses.
  const { scrollY } = useScroll();
  const pillWidth = useTransform(scrollY, [0, 520], ["100%", "75%"]);
  const pillBg = useTransform(scrollY, [0, 520], ["rgba(25, 24, 27, 0)", "rgba(25, 24, 27, 0.97)"]);
  const wordmarkOpacity = useTransform(scrollY, [0, 380], [1, 0]);
  const wordmarkWidth = useTransform(scrollY, [0, 380], ["3.4rem", "0rem"]);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const scrub = isDesktop && !reduced;
  // The pill sits over the animating hero field, so its backdrop blur is
  // recomputed on every frame the canvas paints. That is the most expensive
  // thing on the software raster path, so machines that cannot afford it get
  // an opaque pill instead: the pill's own background fades in with scroll
  // anyway, which is most of the effect.
  const cheapCompositing = prefersCheapCompositing(useRenderTier());

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const ITEMS = [
    {
      label: "Features",
      href: "/#features",
      eyebrow: "Explore the platform",
      dropdownItems: [
        {
          title: "Thally Track",
          href: "/features/track",
          description: "See what a product change affects.",
          icon: Track,
        },
        {
          title: "Automation",
          href: "/features/automation",
          description: "Draft doc updates on every merge.",
          icon: GitPullRequest,
        },
        {
          title: "Content Graph",
          href: "/features/content-graph",
          description: "One MDX source, every output format.",
          icon: Structured,
        },
        {
          title: "Agent Layer",
          href: "/features/agent-layer",
          description: "Built to be read by AI tools.",
          icon: Mcp,
        },
        {
          title: "Migration & Hosting",
          href: "/features/migration-hosting",
          description: "Move your docs over, hosted by Thally.",
          icon: Cloud,
        },
        {
          title: "Cloud Dashboard",
          href: "/features/cloud-dashboard",
          description: "Analytics, theming, roles, AI context.",
          icon: Overview,
        },
      ],
    },
    { label: "Pricing", href: "/pricing" },
    {
      label: "Resources",
      href: "/blog",
      eyebrow: "Read, learn, and reach us",
      // Column order, not row order: the panel fills top to bottom, so the
      // documentation entries stack on the left and the company ones on the right.
      dropdownItems: [
        {
          title: "Documentation",
          href: DESTINATIONS.docs,
          description: "Everything, from install to MCP.",
          icon: Docs,
        },
        {
          title: "Quickstart",
          href: DESTINATIONS.docsQuickstart,
          description: "Publish your first site in minutes.",
          icon: Terminal,
        },
        {
          title: "Guides",
          href: DESTINATIONS.docsGuides,
          description: "Configuration, theming, and CI.",
          icon: Guide,
        },
        {
          title: "Components",
          href: DESTINATIONS.docsComponents,
          description: "The blocks your pages are built from.",
          icon: Structured,
        },
        {
          title: "Changelog",
          href: DESTINATIONS.docsChangelog,
          description: "What shipped, release by release.",
          icon: GitBranch,
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Product notes and docs practice.",
          icon: Docs,
        },
        {
          title: "About",
          href: "/about",
          description: "Who is building Thally, and why.",
          icon: Team,
        },
        {
          title: "Contact",
          href: "/contact",
          description: "Talk to us about your rollout.",
          icon: Account,
        },
      ],
    },
  ];

  return (
    <header className="bg-canvas sticky top-0 z-50 overflow-x-clip pt-3 pb-1">
      <div className="mx-auto w-full max-w-[1480px] px-2.5 sm:px-5">
        <motion.div
          style={scrub ? { width: pillWidth, backgroundColor: pillBg } : undefined}
          className={cn(
            "border-canvas-hairline relative mx-auto w-full rounded-2xl border shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] lg:min-w-[860px]",
            cheapCompositing ? "bg-canvas/95" : "backdrop-blur-xl",
            !scrub && !cheapCompositing && "bg-canvas/80",
          )}
        >
          <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Thally home"
              className="-my-1 flex min-h-10 shrink-0 items-center gap-2 lg:my-0 lg:min-h-0"
            >
              <ThallyMark inverted />
              <motion.span
                style={scrub ? { opacity: wordmarkOpacity, width: wordmarkWidth } : undefined}
                className="font-display overflow-hidden text-xl font-semibold tracking-tight whitespace-nowrap text-white"
              >
                Thally
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
              <NavigationMenuList className="gap-1">
                {ITEMS.map((link) =>
                  link.dropdownItems ? (
                    <NavigationMenuItem key={link.label}>
                      <NavigationMenuTrigger className="text-canvas-muted hover:text-canvas-foreground data-[state=open]:text-canvas-foreground rounded-lg bg-transparent text-[15px] font-medium tracking-[-0.02em] hover:bg-white/5 focus:bg-white/5 data-[state=open]:bg-white/5">
                        {link.label}
                      </NavigationMenuTrigger>
                      {/* Centred on the menu, not the trigger, and sized in px:
                          the pill animates its own width on scroll, so a
                          percentage-width panel would shrink along with it. */}
                      <NavigationMenuContent className="left-1/2 mt-3 w-[680px] -translate-x-1/2">
                        <div className="border-canvas-hairline rounded-[20px] border bg-[#0a0c10]/85 p-8 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                          <p className="text-canvas-muted-2 mb-6 text-[11px] font-medium tracking-[0.14em] uppercase">
                            {link.eyebrow}
                          </p>
                          {/* Column-major so each column is a coherent group,
                              rather than the two alternating down the rows. */}
                          <ul
                            className="grid grid-flow-col gap-x-12 gap-y-1"
                            style={{
                              gridTemplateRows: `repeat(${Math.ceil(link.dropdownItems.length / 2)}, minmax(0, auto))`,
                            }}
                          >
                            {link.dropdownItems.map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={item.href}
                                    className="group/item -mx-3 flex items-start gap-3.5 rounded-xl px-3 py-3 no-underline outline-hidden select-none"
                                  >
                                    <item.icon className="mt-0.5 size-[18px] shrink-0 text-white/30 transition-colors duration-200 group-hover/item:text-white/70" />
                                    <span className="block">
                                      <span className="block text-[15px] font-medium tracking-[-0.01em] text-white/85 transition-colors duration-200 group-hover/item:text-white">
                                        {item.title}
                                      </span>
                                      <span className="text-canvas-muted-2 mt-1 block text-[13px] leading-snug transition-colors duration-200 group-hover/item:text-white/55">
                                        {item.description}
                                      </span>
                                    </span>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-canvas-muted hover:text-canvas-foreground rounded-lg px-3 py-2 text-[15px] font-medium tracking-[-0.02em] transition-colors hover:bg-white/5",
                          pathname === link.href && "text-canvas-foreground bg-white/8",
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Link href={DESTINATIONS.login} className="hidden lg:block">
                <Button variant="ghost" className="text-canvas-muted hover:text-canvas-foreground hover:bg-white/5">
                  Log in
                </Button>
              </Link>
              <Link
                href={DESTINATIONS.signup}
                className={`transition-opacity duration-300 ${isMenuOpen ? "max-lg:pointer-events-none max-lg:opacity-0" : "opacity-100"}`}
              >
                <Button className="btn-sheen text-canvas rounded-lg bg-white font-semibold">Get started</Button>
              </Link>

              {/* Hamburger Menu Button (Mobile Only) */}
              <button
                className="text-canvas-muted relative -my-1 -mr-1.5 flex size-10 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
                <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
                  ></span>
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
                  ></span>
                  <span
                    aria-hidden="true"
                    className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "bg-canvas absolute inset-x-0 top-full bottom-auto flex h-[calc(100dvh-64px)] flex-col overflow-y-auto px-5 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "visible translate-x-0 opacity-100" : "invisible translate-x-full opacity-0",
        )}
      >
        <div className="mt-8 space-y-2">
          <Link href={DESTINATIONS.signup} className="block" onClick={() => setIsMenuOpen(false)}>
            <Button size="sm" className="text-canvas w-full bg-white font-semibold hover:bg-white/90">
              Create your docs site
            </Button>
          </Link>
          <Link href={DESTINATIONS.login} className="block" onClick={() => setIsMenuOpen(false)}>
            <Button
              size="sm"
              className="border-canvas-stroke text-canvas-foreground w-full bg-transparent hover:bg-white/5"
              variant="outline"
            >
              Log in
            </Button>
          </Link>
        </div>
        <nav className="mt-3 flex flex-1 flex-col gap-6 overflow-y-auto pb-10">
          {ITEMS.map((link) =>
            link.dropdownItems ? (
              <div key={link.label}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="text-canvas-foreground flex w-full items-center justify-between text-lg tracking-[-0.36px]"
                  aria-label={`${link.label} menu`}
                  aria-expanded={openDropdown === link.label}
                >
                  {link.label}
                </button>
                <div
                  className={cn(
                    "ml-1 space-y-3 overflow-hidden transition-all",
                    openDropdown === link.label ? "mt-3 max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  {link.dropdownItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-start gap-3.5 rounded-xl p-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      <item.icon className="mt-0.5 size-[18px] shrink-0 text-white/30" />
                      <div>
                        <div className="font-medium text-white/85">{item.title}</div>
                        <p className="text-canvas-muted-2 mt-1 text-sm leading-snug">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-canvas-foreground text-lg tracking-[-0.36px]",
                  pathname === link.href && "text-canvas-muted",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
