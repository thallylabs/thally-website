/**
 * Browser regressions for choosing an OAuth-proven GitHub App installation.
 *
 * The website may send an opaque installation ID back to Cloud, but must not
 * display it or treat account metadata as an authorization proof.
 */

import { readFileSync } from "node:fs";

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { TrackDemo } from "./track-demo";

const PERSONAL_INSTALLATION = {
  accessManagementUrl: "https://github.com/settings/installations/11",
  accountKind: "personal" as const,
  accountLogin: "alex",
  installationId: 11,
  repositoryVisibility: "selected_repositories" as const,
};

const ORGANIZATION_INSTALLATION = {
  accessManagementUrl: "https://github.com/organizations/acme/settings/installations/22",
  accountKind: "organization" as const,
  accountLogin: "acme",
  installationId: 22,
  repositoryVisibility: "all_repositories" as const,
};

const CHOICES = {
  accessManagement: {
    message: "If an account is missing, install or manage Thally's GitHub access for that account.",
    url: "https://github.com/apps/thally-labs/installations/new",
  },
  installations: [PERSONAL_INSTALLATION, ORGANIZATION_INSTALLATION],
};

function repository(fullName: string) {
  return {
    defaultBranch: "main",
    fullName,
    htmlUrl: `https://github.com/${fullName}`,
    isPrivate: false,
  };
}

function sessionFor(accountLogin: string) {
  return {
    accountLogin,
    canAnalyze: true,
    latestRun: null,
    repositories: [repository(`${accountLogin}/product`), repository(`${accountLogin}/docs`)],
    status: "connected",
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" }, status });
}

describe("Track GitHub installation choice", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/features/track?github=select_installation#demo");
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it.each([
    ["personal", PERSONAL_INSTALLATION, "alex/docs", "acme/docs"],
    ["organization", ORGANIZATION_INSTALLATION, "acme/docs", "alex/docs"],
  ])(
    "connects the explicit %s account even when repository names overlap",
    async (_, choice, visibleRepo, hiddenRepo) => {
      const requests: Array<{
        body: unknown;
        credentials?: RequestCredentials;
        headers: Headers;
        method: string;
        url: string;
      }> = [];
      vi.stubGlobal(
        "fetch",
        vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
          const url = input.toString();
          const method = init?.method ?? "GET";
          requests.push({
            body: init?.body ? JSON.parse(String(init.body)) : null,
            credentials: init?.credentials,
            headers: new Headers(init?.headers),
            method,
            url,
          });
          if (url.endsWith("/api/track/demo/github/installations") && method === "GET") {
            return jsonResponse(CHOICES);
          }
          if (url.endsWith("/api/track/demo/github/installations") && method === "POST") {
            return jsonResponse({ installation: choice });
          }
          if (url.endsWith("/api/track/demo/session")) return jsonResponse(sessionFor(choice.accountLogin));
          throw new Error(`Unexpected request: ${method} ${url}`);
        }),
      );

      render(<TrackDemo />);
      fireEvent.click(
        await screen.findByRole("button", {
          name: `Use ${choice.accountLogin}, ${choice.accountKind === "organization" ? "Organization" : "Personal account"}, ${choice.repositoryVisibility === "all_repositories" ? "All repositories" : "Selected repositories only"}`,
        }),
      );

      expect(await screen.findByText(`Connected to ${choice.accountLogin}`)).toBeVisible();
      const listRequest = requests.find(
        (request) => request.method === "GET" && request.url.endsWith("/api/track/demo/github/installations"),
      );
      expect(listRequest?.credentials).toBe("include");
      expect(listRequest?.headers.get("accept")).toBe("application/json");
      const selectionRequest = requests.find((request) => request.method === "POST");
      expect(selectionRequest?.body).toEqual({ installationId: choice.installationId });
      expect(selectionRequest).toMatchObject({
        credentials: "include",
        method: "POST",
        url: "https://app.thally.io/api/track/demo/github/installations",
      });
      expect(selectionRequest?.headers.get("content-type")).toBe("application/json");
      expect(selectionRequest?.headers.get("x-thally-track-demo")).toBe("track-v2");

      fireEvent.click(screen.getByRole("button", { name: /Continue/ }));
      expect(await screen.findByText(visibleRepo)).toBeVisible();
      expect(screen.queryByText(hiddenRepo)).not.toBeInTheDocument();
    },
  );

  it("renders personal and organization choices with accessible labels", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse(CHOICES)),
    );
    const { container } = render(<TrackDemo />);

    const personalChoice = await screen.findByRole("button", {
      name: "Use alex, Personal account, Selected repositories only",
    });
    const organizationChoice = screen.getByRole("button", {
      name: "Use acme, Organization, All repositories",
    });
    expect(personalChoice).toHaveTextContent("Selected repositories only");
    expect(organizationChoice).toHaveTextContent("All repositories");
    expect(screen.queryByText("11")).not.toBeInTheDocument();
    expect(screen.queryByText("22")).not.toBeInTheDocument();

    const audit = await axe.run(container, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
      rules: { "color-contrast": { enabled: false } },
    });
    expect(audit.violations).toEqual([]);
  });

  it("offers recovery when the chooser has expired", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse(
          {
            accessManagement: CHOICES.accessManagement,
            error: "GitHub installation selection expired. Authorize GitHub again.",
          },
          401,
        ),
      ),
    );
    render(<TrackDemo />);

    expect(await screen.findByRole("alert")).toHaveTextContent("selection expired");
    expect(screen.getByRole("button", { name: "Authorize GitHub again" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Manage GitHub access" })).toHaveAttribute(
      "href",
      CHOICES.accessManagement.url,
    );
  });

  it("uses chooser-stage account recovery when Cloud rejects an unavailable installation", async () => {
    const requests: Array<{ method: string; url: string }> = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
        const method = init?.method ?? "GET";
        const url = input.toString();
        requests.push({ method, url });
        if (url.endsWith("/api/track/demo/github/installations") && method === "GET") {
          return jsonResponse(CHOICES);
        }
        if (url.endsWith("/api/track/demo/github/installations") && method === "POST") {
          return jsonResponse(
            {
              accessManagement: {
                message:
                  "This installation is unavailable or no longer grants your GitHub user repository access. Manage access, then try again.",
                url: ORGANIZATION_INSTALLATION.accessManagementUrl,
              },
              error: "That GitHub installation is unavailable or has no authorized repositories.",
            },
            403,
          );
        }
        throw new Error(`Unexpected request: ${method} ${url}`);
      }),
    );
    render(<TrackDemo />);
    fireEvent.click(await screen.findByRole("button", { name: "Use acme, Organization, All repositories" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("unavailable or has no authorized repositories");
    expect(
      screen.getByText(
        "This installation is unavailable or no longer grants your GitHub user repository access. Manage access, then try again.",
      ),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Manage GitHub access" })).toHaveAttribute(
      "href",
      ORGANIZATION_INSTALLATION.accessManagementUrl,
    );
    expect(screen.getByRole("button", { name: "Try this account again" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Authorize GitHub again" })).toBeVisible();
    expect(requests).toEqual([
      { method: "GET", url: "https://app.thally.io/api/track/demo/github/installations" },
      { method: "POST", url: "https://app.thally.io/api/track/demo/github/installations" },
    ]);
  });

  it("retries a transient choice-list failure", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ error: "GitHub installation choices are temporarily unavailable." }, 502))
      .mockResolvedValueOnce(jsonResponse(CHOICES));
    vi.stubGlobal("fetch", fetchMock);
    render(<TrackDemo />);

    fireEvent.click(await screen.findByRole("button", { name: "Try loading accounts again" }));
    expect(
      await screen.findByRole("button", { name: "Use alex, Personal account, Selected repositories only" }),
    ).toBeVisible();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("keeps the one-installation callback on the existing fast path", async () => {
    window.history.replaceState({}, "", "/features/track?github=connected#demo");
    const fetchMock = vi.fn(async (_input: string | URL | Request) => jsonResponse(sessionFor("alex")));
    vi.stubGlobal("fetch", fetchMock);
    render(<TrackDemo />);

    expect(await screen.findByText("Connected to alex")).toBeVisible();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe("https://app.thally.io/api/track/demo/session");
  });

  it("awaits Cloud cancellation and keeps a prior session cleared after reload", async () => {
    let hasPriorSession = true;
    let resolveCancellation!: (response: Response) => void;
    const cancellation = new Promise<Response>((resolve) => {
      resolveCancellation = resolve;
    });
    const requests: Array<{
      body: BodyInit | null | undefined;
      credentials?: RequestCredentials;
      headers: Headers;
      method: string;
      url: string;
    }> = [];
    const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const method = init?.method ?? "GET";
      const url = input.toString();
      requests.push({
        body: init?.body,
        credentials: init?.credentials,
        headers: new Headers(init?.headers),
        method,
        url,
      });
      if (url.endsWith("/api/track/demo/github/installations") && method === "GET") {
        return jsonResponse(CHOICES);
      }
      if (url.endsWith("/api/track/demo/github/installations") && method === "DELETE") {
        const response = await cancellation;
        hasPriorSession = false;
        return response;
      }
      if (url.endsWith("/api/track/demo/session") && method === "GET") {
        return hasPriorSession
          ? jsonResponse(sessionFor("prior-account"))
          : jsonResponse({ error: "Connect GitHub to run Track." }, 401);
      }
      throw new Error(`Unexpected request: ${method} ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);
    const firstRender = render(<TrackDemo />);

    fireEvent.click(await screen.findByRole("button", { name: "Cancel account selection" }));
    expect(await screen.findByText("Cancelling account selection...")).toBeVisible();
    expect(
      screen.queryByText("GitHub account selection cancelled. No Track demo account is connected."),
    ).not.toBeInTheDocument();
    expect(window.location.search).toBe("?github=select_installation");

    const cancelRequest = requests.find((request) => request.method === "DELETE");
    expect(cancelRequest).toMatchObject({
      body: undefined,
      credentials: "include",
      method: "DELETE",
      url: "https://app.thally.io/api/track/demo/github/installations",
    });
    expect(cancelRequest?.headers.get("x-thally-track-demo")).toBe("track-v2");
    expect(cancelRequest?.headers.has("content-type")).toBe(false);

    await act(async () => {
      resolveCancellation(new Response(null, { status: 204 }));
    });

    expect(
      await screen.findByText("GitHub account selection cancelled. No Track demo account is connected."),
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Use alex, Personal account, Selected repositories only" }),
    ).not.toBeInTheDocument();
    expect(window.location.search).toBe("");

    firstRender.unmount();
    window.history.replaceState({}, "", "/features/track#demo");
    render(<TrackDemo />);

    expect(await screen.findByRole("button", { name: "Connect GitHub and choose repos" })).toBeVisible();
    expect(screen.queryByText("Connected to prior-account")).not.toBeInTheDocument();
    expect(requests.filter((request) => request.method === "GET")).toHaveLength(2);
  });

  it("does not claim cancellation when the Cloud reset fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(CHOICES))
      .mockResolvedValueOnce(jsonResponse({ error: "GitHub installation reset is temporarily unavailable." }, 502))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
    render(<TrackDemo />);

    fireEvent.click(await screen.findByRole("button", { name: "Cancel account selection" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("reset is temporarily unavailable");
    expect(
      screen.queryByText("GitHub account selection cancelled. No Track demo account is connected."),
    ).not.toBeInTheDocument();
    expect(window.location.search).toBe("?github=select_installation");

    fireEvent.click(screen.getByRole("button", { name: "Try cancelling again" }));
    expect(
      await screen.findByText("GitHub account selection cancelled. No Track demo account is connected."),
    ).toBeVisible();
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("keeps a cancelled OAuth callback out of the chooser", async () => {
    window.history.replaceState({}, "", "/features/track?github=cancelled#demo");
    const fetchMock = vi.fn(async (_input: string | URL | Request) =>
      jsonResponse({ error: "Connect GitHub to run Track." }, 401),
    );
    vi.stubGlobal("fetch", fetchMock);
    render(<TrackDemo />);

    expect(await screen.findByText("GitHub connection was cancelled. No repository access was granted.")).toBeVisible();
    expect(screen.queryByRole("heading", { name: "Choose the GitHub account to use" })).not.toBeInTheDocument();
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe("https://app.thally.io/api/track/demo/session");
  });

  it("stacks chooser actions at the narrow-screen breakpoint", () => {
    const stylesheet = readFileSync("src/app/features/track/track-page.module.css", "utf8");
    expect(stylesheet).toMatch(/@media \(max-width: 620px\)[\s\S]*\.installationChoice\s*\{\s*flex-direction: column;/);
    expect(stylesheet).toMatch(
      /@media \(max-width: 620px\)[\s\S]*\.installationManageLink\s*\{[\s\S]*border-top: 1px solid/,
    );
  });
});
