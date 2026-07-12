import "./globals.css";

import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { ConditionalFooter } from "@/components/layout/conditional-footer";
import Navbar from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { OG_DESCRIPTION, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Thally",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI-native documentation",
    "documentation platform",
    "documentation for AI agents",
    "developer docs",
    "MDX",
    "OpenAPI",
    "llms.txt",
    "MCP server",
    "AI agents",
    "agentic search",
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/favicon/favicon-180.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    creator: SOCIAL.xHandle,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon/favicon-512.png`,
    width: 512,
    height: 512,
  },
  sameAs: [SOCIAL.github, SOCIAL.x],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: OG_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`font-sans ${jakarta.variable} ${inter.variable}`}>
      <body className="flex min-h-svh flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
