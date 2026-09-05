/** Browser-component test configuration for the public website. */

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  // Tests only need CSS module mappings. Next exercises Tailwind in builds.
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
