/** Shared browser shims and assertions for website component tests. */

import "@testing-library/jest-dom/vitest";

import { vi } from "vitest";

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  configurable: true,
  value: vi.fn(),
});

Object.defineProperty(window, "scrollTo", {
  configurable: true,
  value: vi.fn(),
});
