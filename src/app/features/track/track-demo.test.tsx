/**
 * Regression coverage for the trust signals on completed public Track runs.
 *
 * These tests use only browser-safe response fields. Installation authority,
 * prompts, and collected repository contents must never enter this component.
 */

import { readFileSync } from "node:fs";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TrackDemo } from "./track-demo";

const SOURCE_REVISION = "1111111111111111111111111111111111111111";
const DESTINATION_REVISION = "2222222222222222222222222222222222222222";
const FIRST_INPUT_IDENTITY = `sha256:${"a".repeat(64)}`;
const SECOND_INPUT_IDENTITY = `sha256:${"b".repeat(64)}`;
const GAP_ID = "gap-0123456789abcdef";

interface ResultOptions {
  assessmentStatus?: "analyzed" | "reused";
  destinationRevision?: string;
  gapId?: string;
  includeProvenance?: boolean;
  inputIdentity?: string;
  sourceRevision?: string;
}

function completedSession({
  assessmentStatus = "analyzed",
  destinationRevision = DESTINATION_REVISION,
  gapId = GAP_ID,
  includeProvenance = true,
  inputIdentity = FIRST_INPUT_IDENTITY,
  sourceRevision = SOURCE_REVISION,
}: ResultOptions = {}) {
  const notice =
    assessmentStatus === "reused"
      ? "The source and destination revisions are unchanged, so Track reused the prior assessment instead of asking the model again."
      : "This assessment is tied to the source and destination revisions shown. Changed revisions may produce a different result.";

  return {
    accountLogin: "octo-org",
    canAnalyze: false,
    latestRun: {
      completedAt: "2026-09-05T02:00:00.000Z",
      createdAt: "2026-09-05T01:59:00.000Z",
      error: null,
      id: "run-public-1",
      progress: { phase: "completed" },
      result: {
        ...(includeProvenance
          ? {
              assessment: { notice, status: assessmentStatus },
              inputIdentity,
            }
          : {}),
        brief: "One documentation gap needs review.",
        coveredPullRequestCount: 0,
        findingsCount: 1,
        pullRequests: [
          {
            findings: [
              {
                ...(includeProvenance ? { id: gapId } : {}),
                affectedPage: "docs/authentication.mdx",
                confidence: "high",
                draft: { after: "Use the session token.", before: "Use the API token." },
                evidence: ["The merged change replaces API tokens with session tokens."],
                gap: "stale",
                headline: "Authentication guide uses the old token",
                impact: "Readers would send the wrong credential.",
                surface: "octo-org/docs",
              },
            ],
            pullRequest: {
              baseBranch: "main",
              filesChanged: 2,
              mergedAt: "2026-09-05T01:30:00.000Z",
              ...(includeProvenance ? { mergeCommitSha: sourceRevision } : {}),
              number: 42,
              repository: "octo-org/product",
              title: "Replace API tokens",
              url: "https://github.com/octo-org/product/pull/42",
            },
            summary: "The change affects authentication guidance.",
            unverifiedFindings: 0,
          },
        ],
        surfaces: [
          {
            defaultBranch: "main",
            isThallySite: true,
            kind: "docs",
            pagesInspected: ["docs/authentication.mdx"],
            repository: "octo-org/docs",
            ...(includeProvenance ? { revision: destinationRevision } : {}),
          },
        ],
      },
      status: "completed",
    },
    repositories: [],
    status: "completed",
  };
}

function mockSession(session = completedSession()) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify(session), { headers: { "Content-Type": "application/json" } })),
  );
}

describe("completed Track result trust signals", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/features/track");
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders a new assessment with exact provenance and an accessible gap deep link", async () => {
    window.history.replaceState({}, "", `/features/track#${GAP_ID}`);
    mockSession();

    const { container } = render(<TrackDemo />);

    expect(await screen.findByRole("heading", { name: "Revisions checked for this result" })).toBeVisible();
    expect(screen.getByText("New assessment")).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("Changed revisions may produce a different result.");
    expect(screen.getByText(FIRST_INPUT_IDENTITY)).toBeVisible();
    expect(screen.getByText(SOURCE_REVISION)).toBeVisible();
    expect(screen.getByText(DESTINATION_REVISION)).toBeVisible();
    expect(await screen.findByText("What changed")).toBeVisible();
    expect(screen.getAllByText(GAP_ID)).toHaveLength(2);
    expect(document.getElementById(GAP_ID)).toHaveAttribute("aria-controls", "track-finding-detail");

    const audit = await axe.run(container, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
      rules: { "color-contrast": { enabled: false } },
    });
    expect(audit.violations).toEqual([]);
  });

  it("labels a reused assessment and preserves its stable gap URL", async () => {
    mockSession(completedSession({ assessmentStatus: "reused" }));
    render(<TrackDemo />);

    expect(await screen.findByText("Reused assessment")).toBeVisible();
    expect(screen.getByText(/reused the prior assessment/)).toBeVisible();

    fireEvent.click(document.getElementById(GAP_ID)!);
    expect(window.location.hash).toBe(`#${GAP_ID}`);
    expect(screen.getAllByText(GAP_ID)).toHaveLength(2);
  });

  it("shows changed evidence as a newly analyzed input", async () => {
    const nextSourceRevision = "3333333333333333333333333333333333333333";
    const nextDestinationRevision = "4444444444444444444444444444444444444444";
    mockSession(
      completedSession({
        destinationRevision: nextDestinationRevision,
        inputIdentity: SECOND_INPUT_IDENTITY,
        sourceRevision: nextSourceRevision,
      }),
    );
    render(<TrackDemo />);

    expect(await screen.findByText("New assessment")).toBeVisible();
    expect(screen.getByText(SECOND_INPUT_IDENTITY)).toBeVisible();
    expect(screen.queryByText(FIRST_INPUT_IDENTITY)).not.toBeInTheDocument();
    expect(screen.getByText(nextSourceRevision)).toBeVisible();
    expect(screen.getByText(nextDestinationRevision)).toBeVisible();
  });

  it("renders historical results that predate additive provenance fields", async () => {
    mockSession(completedSession({ includeProvenance: false }));
    render(<TrackDemo />);

    expect(await screen.findByText("One documentation gap needs review.")).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Revisions checked for this result" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Authentication guide uses the old token/ })).toBeVisible();
  });

  it("keeps long identities in a single responsive column on narrow screens", () => {
    const stylesheet = readFileSync("src/app/features/track/track-page.module.css", "utf8");
    expect(stylesheet).toMatch(
      /@media \(max-width: 47\.9375rem\)[\s\S]*\.provenanceGrid\s*\{\s*grid-template-columns: minmax\(0, 1fr\);/,
    );
    expect(stylesheet).toMatch(/\.provenanceGrid code\s*\{[\s\S]*overflow-wrap: anywhere;/);
  });
});
