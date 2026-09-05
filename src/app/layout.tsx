import "./globals.css";

import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { ConditionalNavbar } from "@/components/layout/conditional-navbar";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ThemeProvider } from "@/components/theme-provider";
import {
  LEGAL_ENTITY_NAME,
  OG_DESCRIPTION,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL,
  SOCIAL_PREVIEW_DESCRIPTION,
  SOCIAL_PREVIEW_TITLE,
} from "@/lib/site";
import { socialPreviewImage } from "@/lib/social-preview";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const GOOGLE_ANALYTICS_ID = "G-T2YRHCMWFN";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Thally",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "product knowledge synchronization",
    "product change intelligence",
    "product knowledge graph",
    "customer-facing knowledge",
    "knowledge synchronization pipeline",
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
  publisher: LEGAL_ENTITY_NAME,
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
    title: SOCIAL_PREVIEW_TITLE,
    description: SOCIAL_PREVIEW_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    images: [socialPreviewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_PREVIEW_TITLE,
    description: SOCIAL_PREVIEW_DESCRIPTION,
    images: [socialPreviewImage],
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    other: {
      ...(process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : {}),
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: LEGAL_ENTITY_NAME,
  legalName: LEGAL_ENTITY_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "348 Business Bay",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon/favicon-512.png`,
    width: 512,
    height: 512,
  },
  sameAs: [SOCIAL.github],
  contactPoint: {
    "@type": "ContactPoint",
    email: "team@thally.io",
    contactType: "sales and support",
    availableLanguage: ["English"],
  },
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
        <GoogleAnalytics measurementId={GOOGLE_ANALYTICS_ID} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {/* The rebuilt marketing design is dark-first, matching the template. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          storageKey="thally-theme"
          disableTransitionOnChange
        >
          <SmoothScroll />
          <ConditionalNavbar />
          <main className="flex flex-1 flex-col">{children}</main>
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
