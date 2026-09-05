/**
 * Browser-component test configuration for the public website.
 *
 * Track result tests run in a visual JSDOM document so the same semantic
 * component shipped by Next.js can be exercised without a live Cloud account.
 */

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  // Tests only need CSS module class mappings. Next's Tailwind PostCSS plugin
  // is exercised by the production build and is not a Vite plugin.
  css: { postcss: { plugins: [] } },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
        url: "https://thally.io/features/track",
      },
    },
    setupFiles: ["./vitest.setup.ts"],
  },
});
