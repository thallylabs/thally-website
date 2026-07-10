import "./globals.css";

import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { ConditionalFooter } from "@/components/layout/conditional-footer";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Thally — Documentation for machines and humans",
    template: "%s | Thally",
  },
  description:
    "Thally is the AI-native documentation platform for machines and humans. Every page is structured as JSON, JSON-LD, and Markdown for AI agents and typeset for people, from one URL. A docs agent turns product changes into reviewed PRs. Migrate from Mintlify, Docusaurus, or GitBook in one command. Self-hosted, open, MIT.",
  keywords: [
    "documentation platform",
    "developer docs",
    "MDX",
    "OpenAPI",
    "llms.txt",
    "MCP server",
    "AI agents",
    "docs as code",
    "docs automation",
    "documentation pull requests",
    "Mintlify alternative",
    "Docusaurus alternative",
    "GitBook alternative",
    "docs migration",
    "agent readiness score",
    "open source",
  ],
  authors: [{ name: "Thally" }],
  creator: "Thally",
  publisher: "Thally",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Thally — Documentation for machines and humans",
    description:
      "One source, read perfectly by machines and humans. JSON, JSON-LD & Markdown for agents; HTML for people, from the same URL. And when your product ships, Thally drafts the docs PR.",
    siteName: "Thally",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thally — Documentation for machines and humans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thally — Documentation for machines and humans",
    description:
      "One source, read perfectly by machines and humans. JSON, JSON-LD & Markdown for agents; HTML for people, from the same URL. And when your product ships, Thally drafts the docs PR.",
    creator: "@thallydocs",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`font-sans ${jakarta.variable} ${inter.variable}`}>
      <body className="flex min-h-svh flex-col antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
