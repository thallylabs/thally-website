"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Cloud, GitPullRequest, Mcp, Overview, Structured, Track } from "@/components/icons";
import { ThallyMark } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
      dropdownItems: [
        {
          title: "Thally Track",
          href: "/features/track",
          description: "See which documentation may be affected when your product changes.",
          icon: Track,
        },
        {
          title: "Automation",
          href: "/features/automation",
          description: "Connect repos so Thally can draft updates on every merge.",
          icon: GitPullRequest,
        },
        {
          title: "Content Graph",
          href: "/features/content-graph",
          description: "Write once in MDX and publish HTML, JSON, and machine formats.",
          icon: Structured,
        },
        {
          title: "Agent Layer",
          href: "/features/agent-layer",
          description: "Make your docs easier for AI tools to read and reason about.",
          icon: Mcp,
        },
        {
          title: "Migration & Hosting",
          href: "/features/migration-hosting",
          description: "Start a new site, connect a repo, and let Thally host it.",
          icon: Cloud,
        },
        {
          title: "Cloud Dashboard",
          href: "/features/cloud-dashboard",
          description: "Manage your sites, analytics, team, and AI context in one place.",
          icon: Overview,
        },
      ],
    },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: DESTINATIONS.docs },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-canvas sticky top-0 z-50 overflow-x-clip pt-3 pb-1">
      <div className="mx-auto w-full max-w-[1480px] px-2.5 sm:px-5">
        <motion.div
          style={scrub ? { width: pillWidth, backgroundColor: pillBg } : undefined}
          className={cn(
            "border-canvas-hairline relative mx-auto min-w-[860px] rounded-2xl border shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] backdrop-blur-xl max-lg:w-full",
            !scrub && "bg-canvas/80",
          )}
        >
          <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
            {/* Logo */}
            <Link href="/" aria-label="Thally home" className="flex shrink-0 items-center gap-2">
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
                      <NavigationMenuContent className="border-canvas-hairline bg-canvas text-canvas-foreground border">
                        <ul className="grid w-[460px] grid-cols-2 gap-1 p-3">
                          {link.dropdownItems.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={item.href}
                                  className="flex flex-row items-start gap-3 rounded-lg p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-white/5 focus:bg-white/5"
                                >
                                  <span className="bg-canvas-accent/10 text-canvas-accent flex size-8 shrink-0 items-center justify-center rounded-md">
                                    <item.icon className="size-4" />
                                  </span>
                                  <div className="space-y-1">
                                    <div className="text-canvas-foreground text-sm leading-none font-semibold">
                                      {item.title}
                                    </div>
                                    <p className="text-canvas-muted line-clamp-2 text-sm leading-snug">
                                      {item.description}
                                    </p>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
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
                className="text-canvas-muted relative flex size-8 lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
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
          "bg-canvas absolute inset-0 top-full flex h-[calc(100vh-64px)] flex-col px-5 transition-all duration-300 ease-in-out lg:hidden",
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
                      className="flex items-start gap-3 rounded-md p-2 hover:bg-white/5"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      <span className="bg-canvas-accent/10 text-canvas-accent flex size-8 shrink-0 items-center justify-center rounded-md">
                        <item.icon className="size-4" />
                      </span>
                      <div>
                        <div className="text-canvas-foreground font-medium">{item.title}</div>
                        <p className="text-canvas-muted text-sm">{item.description}</p>
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
