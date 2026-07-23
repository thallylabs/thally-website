"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Cloud, GitPullRequest, Mcp, Negotiation, Overview, Track } from "@/components/icons";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme-toggle";
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
  const pathname = usePathname();

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
          description: "See which documentation may be affected by a merged product change.",
          icon: Track,
        },
        {
          title: "Automation",
          href: "/#automation",
          description: "Connect repos so Thally can draft reviewable docs updates when they are needed.",
          icon: GitPullRequest,
        },
        {
          title: "Content Graph",
          href: "/#features",
          description: "Write once in MDX and publish HTML, JSON, JSON-LD, and Markdown.",
          icon: Negotiation,
        },
        {
          title: "Agent Layer",
          href: "/#workflows",
          description: "Make your docs easier for AI tools to find and use with llms.txt, MCP, and grounded answers.",
          icon: Mcp,
        },
        {
          title: "Migration & Hosting",
          href: "/#migrate",
          description: "Start a new site, connect a Thally project, or migrate your existing docs.",
          icon: Cloud,
        },
        {
          title: "Cloud Dashboard",
          href: "/#dashboard",
          description: "Manage your sites, analytics, team, AI answers, and updates drafted by Thally.",
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

  const bgColor = "bg-popover";

  return (
    <header className={cn("relative z-50 overflow-x-clip", bgColor)}>
      <div className="max-w-9xl container">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" aria-label="Thally home">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden items-center lg:flex">
            <NavigationMenuList className="gap-2">
              {ITEMS.map((link) =>
                link.dropdownItems ? (
                  <NavigationMenuItem key={link.label}>
                    <NavigationMenuTrigger className="text-foreground bg-transparent font-medium lg:text-base">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[460px] grid-cols-2 gap-1 p-3">
                        {link.dropdownItems.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="hover:bg-accent focus:bg-accent flex flex-row items-start gap-3 rounded-lg p-3 leading-none no-underline outline-hidden transition-colors select-none"
                              >
                                <span className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-md">
                                  <item.icon className="size-4" />
                                </span>
                                <div className="space-y-1">
                                  <div className="text-sm leading-none font-semibold">{item.title}</div>
                                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
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
                        "text-foreground px-3 py-2 font-medium lg:text-base",
                        pathname === link.href && "text-muted-foreground",
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
          <div className="flex items-center gap-2.5">
            <Link href={DESTINATIONS.signup} className="hidden lg:block">
              <Button variant="ghost" className="text-muted-foreground">
                Create site
              </Button>
            </Link>
            <Link
              href={DESTINATIONS.login}
              className={`transition-opacity duration-300 ${isMenuOpen ? "max-lg:pointer-events-none max-lg:opacity-0" : "opacity-100"}`}
            >
              <Button variant="outline">Log in</Button>
            </Link>
            <div
              className={`transition-opacity duration-300 ${isMenuOpen ? "max-lg:pointer-events-none max-lg:opacity-0" : "opacity-100"}`}
            >
              <ThemeToggle />
            </div>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              className="text-muted-foreground relative flex size-8 lg:hidden"
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
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "absolute inset-0 top-full container flex h-[calc(100vh-64px)] flex-col transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "visible translate-x-0 opacity-100" : "invisible translate-x-full opacity-0",
          bgColor,
        )}
      >
        <div className="mt-8 space-y-2">
          <Link href={DESTINATIONS.signup} className="block" onClick={() => setIsMenuOpen(false)}>
            <Button size="sm" className="w-full">
              Create your docs site
            </Button>
          </Link>
          <Link href={DESTINATIONS.login} className="block" onClick={() => setIsMenuOpen(false)}>
            <Button size="sm" className="w-full" variant="outline">
              Log in
            </Button>
          </Link>
        </div>
        <nav className="mt-3 flex flex-1 flex-col gap-6">
          {ITEMS.map((link) =>
            link.dropdownItems ? (
              <div key={link.label}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="text-foreground flex w-full items-center justify-between text-lg tracking-[-0.36px]"
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
                      className="hover:bg-accent flex items-start gap-3 rounded-md p-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      <span className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-md">
                        <item.icon className="size-4" />
                      </span>
                      <div>
                        <div className="text-foreground font-medium">{item.title}</div>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
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
                  "text-foreground text-lg tracking-[-0.36px]",
                  pathname === link.href && "text-muted-foreground",
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
