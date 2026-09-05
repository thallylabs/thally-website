"use client";

/**
 * Live pre-signup Track run.
 *
 * The static website holds no GitHub or model credential. It uses the
 * credentialed, installation-bound API exposed by Thally Cloud: connect the
 * GitHub App, choose product repositories and customer-facing surfaces, start
 * one background run, poll it, and read the findings. Saying yes to drafting
 * pull requests hands the run into registration through a one-time link.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Account,
  ArrowRight,
  Check,
  Docs,
  ExternalLink,
  GitBranch,
  GitPullRequest,
  Globe,
  Guide,
  RefreshCw,
  Track,
  Workspace,
} from "@/components/icons";

import styles from "./track-page.module.css";

const CLOUD_API = (process.env.NEXT_PUBLIC_THALLY_CLOUD_API_URL || "https://app.thally.io").replace(/\/$/, "");

/**
 * Whether a credentialed call to the Cloud API can succeed from this origin.
 *
 * Same origin always works; otherwise only the deployed thally.io sites are
 * allowlisted. Local and preview builds are not, so an unprompted probe from
 * one only produces a console error.
 */
function canReachCloudApi(): boolean {
  if (typeof window === "undefined") return false;
  const { origin, hostname } = window.location;
  if (origin === CLOUD_API) return true;
  return hostname === "thally.io" || hostname.endsWith(".thally.io");
}

const API_VERSION_HEADER = "track-v2";
const STEP_NAMES = [
  "Connect GitHub",
  "Product repositories",
  "Customer-facing surfaces",
  "Run Track",
  "What Track found",
];
const PRODUCT_REPOSITORY_LIMIT = 3;
const SURFACE_LIMIT = 3;
const PULL_REQUEST_LIMIT = 5;
const POLL_INTERVAL_MS = 2_500;

type SurfaceKind = "docs" | "website" | "support" | "other";

const SURFACE_KINDS: Array<{ kind: SurfaceKind; label: string; hint: string }> = [
  { kind: "docs", label: "Docs", hint: "Reference and guides" },
  { kind: "website", label: "Website", hint: "Marketing pages, pricing, blog" },
  { kind: "support", label: "Support", hint: "Help center and articles" },
  { kind: "other", label: "Other", hint: "Any customer-facing content" },
];

interface RepositoryOption {
  defaultBranch: string;
  fullName: string;
  htmlUrl: string;
  isPrivate: boolean;
}

interface TrackInstallationChoice {
  accessManagementUrl: string;
  accountKind: "personal" | "organization";
  accountLogin: string;
  installationId: number;
  repositoryVisibility: "all_repositories" | "selected_repositories";
}

interface AccessManagement {
  message: string;
  url: string;
}

interface InstallationChoicesResponse {
  accessManagement: AccessManagement;
  installations: TrackInstallationChoice[];
}

interface InstallationChoiceErrorResponse {
  accessManagement?: AccessManagement;
  error?: string;
}

interface SurfaceSelection {
  kind: SurfaceKind;
  repository: string;
}

interface TrackFinding {
  affectedPage: string;
  confidence: "high" | "medium" | "low";
  draft: { after: string; before: string };
  evidence: string[];
  gap: "missing" | "stale" | "inconsistent";
  headline: string;
  impact: string;
  surface: string;
}

interface PullRequestSummary {
  baseBranch: string;
  filesChanged: number;
  mergedAt: string;
  number: number;
  repository: string;
  title: string;
  url: string;
}

interface PullRequestAnalysis {
  findings: TrackFinding[];
  pullRequest: PullRequestSummary;
  summary: string;
  unverifiedFindings: number;
}

interface SurfaceSummary extends SurfaceSelection {
  defaultBranch: string;
  isThallySite: boolean;
  pagesInspected: string[];
}

interface RunResult {
  brief: string;
  coveredPullRequestCount: number;
  findingsCount: number;
  pullRequests: PullRequestAnalysis[];
  surfaces: SurfaceSummary[];
}

interface TrackRun {
  completedAt: string | null;
  createdAt: string;
  error: string | null;
  id: string;
  progress: {
    message?: string;
    phase?: "queued" | "collecting" | "analyzing" | "completed" | "failed";
    pullRequestsAnalyzed?: number;
    pullRequestsTotal?: number;
  };
  result: RunResult | null;
  status: "queued" | "running" | "completed" | "failed";
}

interface TrackSession {
  accountLogin: string;
  canAnalyze: boolean;
  latestRun: TrackRun | null;
  repositories: RepositoryOption[];
  status: "connected" | "analyzing" | "completed" | "failed";
}

type SessionState = "loading" | "disconnected" | "connected" | "error";
type HandoffState = "idle" | "loading" | "declined" | "error";
type InstallationChoiceState =
  | "idle"
  | "loading"
  | "ready"
  | "submitting"
  | "expired"
  | "unavailable"
  | "error"
  | "cancelling"
  | "cancel_error"
  | "cancelled";

function GitHubMark() {
  return (
    <svg aria-hidden="true" className={styles.githubMark} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function surfaceIcon(kind: SurfaceKind) {
  if (kind === "docs") return <Docs />;
  if (kind === "website") return <Globe />;
  if (kind === "support") return <Guide />;
  return <Track />;
}

function surfaceLabel(kind: SurfaceKind): string {
  return SURFACE_KINDS.find((entry) => entry.kind === kind)?.label ?? "Content";
}

function RepoOption({
  icon,
  isDisabled,
  isSelected,
  onSelect,
  repository,
}: {
  icon: "docs" | "product";
  isDisabled?: boolean;
  isSelected: boolean;
  onSelect: () => void;
  repository: RepositoryOption;
}) {
  const RepoIcon = icon === "docs" ? Docs : GitBranch;
  return (
    <button
      aria-pressed={isSelected}
      className={`${styles.repoOption} ${isSelected ? styles.repoOptionSelected : ""}`}
      disabled={isDisabled && !isSelected}
      onClick={onSelect}
      type="button"
    >
      <span className={styles.repoIcon}>
        <RepoIcon />
      </span>
      <span className={styles.repoText}>
        <span className={styles.repoName}>{repository.fullName}</span>
        <span className={styles.repoDescription}>
          {repository.isPrivate ? "Private" : "Public"} repository · default branch {repository.defaultBranch}
        </span>
      </span>
      <span aria-hidden="true" className={styles.selectionIcon}>
        {isSelected ? <Check /> : null}
      </span>
    </button>
  );
}

async function responseError(response: Response, fallback: string): Promise<string> {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  return body?.error || fallback;
}

function safeGitHubUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.origin === "https://github.com" && !url.username && !url.password ? url.toString() : null;
  } catch {
    return null;
  }
}

function installationKindLabel(kind: TrackInstallationChoice["accountKind"]): string {
  return kind === "organization" ? "Organization" : "Personal account";
}

function repositoryVisibilityLabel(visibility: TrackInstallationChoice["repositoryVisibility"]): string {
  return visibility === "all_repositories" ? "All repositories" : "Selected repositories only";
}

function installationAccessibleLabel(installation: TrackInstallationChoice): string {
  return `Use ${installation.accountLogin}, ${installationKindLabel(installation.accountKind)}, ${repositoryVisibilityLabel(installation.repositoryVisibility)}`;
}

function formatMergedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function confidenceClass(confidence: TrackFinding["confidence"]): string {
  return confidence === "medium"
    ? styles.findingDotMedium
    : confidence === "low"
      ? styles.findingDotLow
      : styles.findingDotHigh;
}

function gapDescription(gap: TrackFinding["gap"]): string {
  if (gap === "missing") return "Not mentioned anywhere on this surface.";
  if (gap === "stale") return "This page describes the old behavior.";
  return "This surface disagrees with another one.";
}

export function TrackDemo() {
  const [step, setStep] = useState(0);
  const [sessionState, setSessionState] = useState<SessionState>("loading");
  const [session, setSession] = useState<TrackSession | null>(null);
  const [productRepositories, setProductRepositories] = useState<string[]>([]);
  const [surfaces, setSurfaces] = useState<SurfaceSelection[]>([]);
  const [run, setRun] = useState<TrackRun | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFinding, setActiveFinding] = useState<{ finding: number; pullRequest: number } | null>(null);
  const [handoffState, setHandoffState] = useState<HandoffState>("idle");
  const [installationChoiceState, setInstallationChoiceState] = useState<InstallationChoiceState>("idle");
  const [installationChoices, setInstallationChoices] = useState<TrackInstallationChoice[]>([]);
  const [installationAccessManagement, setInstallationAccessManagement] = useState<AccessManagement | null>(null);
  const [installationError, setInstallationError] = useState<string | null>(null);
  const [installationNotice, setInstallationNotice] = useState<string | null>(null);
  const [selectedInstallationId, setSelectedInstallationId] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const findingDetailRef = useRef<HTMLElement>(null);

  const goToStep = useCallback((nextStep: number) => {
    setStep(nextStep);
    window.requestAnimationFrame(() => {
      const top = stageRef.current?.getBoundingClientRect().top;
      if (typeof top === "number" && Math.abs(top) > 120) {
        window.scrollTo({ top: top + window.scrollY - 88, behavior: "smooth" });
      }
    });
  }, []);

  /**
   * The initial probe runs before the reader has asked for anything, so a
   * failure there means "not connected", not "something went wrong". Only
   * a retry the reader triggered surfaces an error. A run that is still
   * executing, or finished while the page was away, is resumed in place.
   */
  const loadSession = useCallback(
    async ({
      userInitiated = false,
      resumeRun = true,
      keepError = false,
    }: { keepError?: boolean; resumeRun?: boolean; userInitiated?: boolean } = {}) => {
      const githubStatus = new URLSearchParams(window.location.search).get("github");
      setSessionState("loading");
      if (!keepError) {
        setError(
          githubStatus === "failed"
            ? "GitHub could not finish the connection. Please try again."
            : githubStatus === "cancelled"
              ? "GitHub connection was cancelled. No repository access was granted."
              : githubStatus === "not_installed"
                ? "The Thally Labs app is not installed for your GitHub account yet. Install it first, then come back."
                : null,
        );
      }
      try {
        const response = await fetch(`${CLOUD_API}/api/track/demo/session`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (response.status === 401) {
          setSession(null);
          setSessionState("disconnected");
          return;
        }
        if (!response.ok) throw new Error(await responseError(response, "GitHub repositories are unavailable."));
        const nextSession = (await response.json()) as TrackSession;
        setSession(nextSession);
        setSessionState("connected");
        if (new URLSearchParams(window.location.search).has("github")) {
          window.history.replaceState({}, "", `${window.location.pathname}#demo`);
        }
        const latest = nextSession.latestRun;
        if (latest && (latest.status === "queued" || latest.status === "running")) {
          setRun(latest);
          goToStep(3);
        } else if (resumeRun && latest && latest.status === "completed" && latest.result) {
          setRun(latest);
          goToStep(4);
        }
      } catch {
        if (userInitiated) {
          setError("Could not reach the Track service. Please try again.");
          setSessionState("error");
          return;
        }
        setSession(null);
        setSessionState("disconnected");
      }
    },
    [goToStep],
  );

  /** Load the browser-safe choices sealed by the just-completed OAuth flow. */
  const loadInstallationChoices = useCallback(async () => {
    setInstallationChoiceState("loading");
    setInstallationError(null);
    setInstallationNotice(null);
    setSelectedInstallationId(null);
    try {
      const response = await fetch(`${CLOUD_API}/api/track/demo/github/installations`, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      const body = (await response.json().catch(() => null)) as
        InstallationChoicesResponse | InstallationChoiceErrorResponse | null;
      if (response.status === 401) {
        setInstallationAccessManagement(body && "accessManagement" in body ? (body.accessManagement ?? null) : null);
        setInstallationError(
          body && "error" in body && body.error
            ? body.error
            : "GitHub account selection expired. Authorize GitHub again.",
        );
        setInstallationChoiceState("expired");
        return;
      }
      if (!response.ok) {
        throw new Error(
          body && "error" in body && body.error
            ? body.error
            : "GitHub accounts are temporarily unavailable. Try again.",
        );
      }
      if (!(body && "installations" in body && Array.isArray(body.installations) && body.installations.length > 1)) {
        throw new Error("GitHub did not return the accounts available for this connection. Authorize again.");
      }
      setInstallationChoices(body.installations);
      setInstallationAccessManagement(body.accessManagement);
      setInstallationChoiceState("ready");
    } catch (choiceError) {
      setInstallationError(
        choiceError instanceof Error ? choiceError.message : "GitHub accounts are temporarily unavailable. Try again.",
      );
      setInstallationChoiceState("error");
    }
  }, []);

  useEffect(() => {
    // The credentialed probe is only accepted from origins the Cloud API
    // allowlists. Anywhere else the browser blocks it and logs a CORS error
    // that no catch can suppress, so the unprompted probe is skipped rather
    // than firing a request that cannot succeed. A reader who presses connect
    // still gets a real attempt and a real error.
    if (!canReachCloudApi()) {
      const timeoutId = window.setTimeout(() => setSessionState("disconnected"), 0);
      return () => window.clearTimeout(timeoutId);
    }
    const githubStatus = new URLSearchParams(window.location.search).get("github");
    const timeoutId = window.setTimeout(
      () => void (githubStatus === "select_installation" ? loadInstallationChoices() : loadSession()),
      0,
    );
    return () => window.clearTimeout(timeoutId);
  }, [loadInstallationChoices, loadSession]);

  // Poll the run while it executes in the background. The effect keys on the
  // run's id and status only: every response produces a new object, and
  // re-subscribing on each one would poll at network speed instead of the
  // intended cadence.
  const runId = run?.id ?? null;
  const isRunActive = run?.status === "queued" || run?.status === "running";
  useEffect(() => {
    if (!runId || !isRunActive) return;
    let isCancelled = false;
    const poll = async () => {
      try {
        const response = await fetch(`${CLOUD_API}/api/track/demo/runs/${runId}`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(await responseError(response, "Track lost contact with the run."));
        const next = (await response.json()) as TrackRun;
        if (isCancelled) return;
        setRun(next);
        if (next.status === "completed") {
          setActiveFinding(null);
          goToStep(4);
        } else if (next.status === "failed") {
          // Refresh the allowance first; the session probe resets errors, so
          // the run's own reason is applied afterwards and survives.
          await loadSession({ userInitiated: true, resumeRun: false, keepError: true });
          if (!isCancelled) setError(next.error || "Track could not complete this analysis.");
        }
      } catch (pollError) {
        if (isCancelled) return;
        setError(pollError instanceof Error ? pollError.message : "Track lost contact with the run.");
      }
    };
    const timer = window.setInterval(() => void poll(), POLL_INTERVAL_MS);
    void poll();
    return () => {
      isCancelled = true;
      window.clearInterval(timer);
    };
  }, [goToStep, isRunActive, loadSession, runId]);

  const productOptions = useMemo(
    () =>
      session?.repositories.filter(
        (repository) => !surfaces.some((surface) => surface.repository === repository.fullName),
      ) ?? [],
    [session, surfaces],
  );
  const surfaceOptions = useMemo(
    () => session?.repositories.filter((repository) => !productRepositories.includes(repository.fullName)) ?? [],
    [productRepositories, session],
  );

  const connectGitHub = () => {
    window.location.assign(`${CLOUD_API}/api/track/demo/github/connect`);
  };

  // An account that already installed the app is sent by GitHub to the
  // installation settings (behind sudo) and loses the return state, so it
  // authorizes with OAuth instead and Thally finds its installation.
  const authorizeExistingInstallation = () => {
    window.location.assign(`${CLOUD_API}/api/track/demo/github/authorize`);
  };

  const chooseInstallation = async (installation: TrackInstallationChoice) => {
    if (installationChoiceState !== "ready" && installationChoiceState !== "unavailable") return;
    setSelectedInstallationId(installation.installationId);
    setInstallationChoiceState("submitting");
    setInstallationError(null);
    try {
      const response = await fetch(`${CLOUD_API}/api/track/demo/github/installations`, {
        body: JSON.stringify({ installationId: installation.installationId }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Thally-Track-Demo": API_VERSION_HEADER,
        },
        method: "POST",
      });
      const body = (await response.json().catch(() => null)) as InstallationChoiceErrorResponse | null;
      if (!response.ok) {
        if (response.status === 403) {
          setInstallationAccessManagement(
            body?.accessManagement ?? {
              message: "Manage access for this account, then try connecting it again.",
              url: installation.accessManagementUrl,
            },
          );
        }
        setInstallationError(
          body?.error ||
            (response.status === 401
              ? "GitHub account selection expired. Authorize GitHub again."
              : response.status === 403
                ? "That GitHub account is no longer available. Authorize GitHub again."
                : "GitHub could not connect that account. Try again."),
        );
        setInstallationChoiceState(
          response.status === 401 ? "expired" : response.status === 403 ? "unavailable" : "error",
        );
        return;
      }
      setInstallationChoiceState("idle");
      setInstallationChoices([]);
      setSelectedInstallationId(null);
      await loadSession({ userInitiated: true });
    } catch {
      setInstallationError("GitHub could not connect that account. Check your connection and try again.");
      setInstallationChoiceState("error");
    }
  };

  /**
   * Cancel the chooser at Cloud before changing the local UI. The reset clears
   * both the sealed chooser and any older demo session, so a refresh cannot
   * silently reconnect an account the reader just rejected.
   */
  const cancelInstallationChoice = async () => {
    if (installationChoiceState === "cancelling") return;
    setInstallationChoiceState("cancelling");
    setInstallationError(null);
    setInstallationNotice(null);
    try {
      const response = await fetch(`${CLOUD_API}/api/track/demo/github/installations`, {
        credentials: "include",
        headers: { "X-Thally-Track-Demo": API_VERSION_HEADER },
        method: "DELETE",
      });
      if (response.status !== 204) {
        throw new Error(await responseError(response, "GitHub account selection could not be cancelled. Try again."));
      }
      setInstallationChoiceState("cancelled");
      setInstallationChoices([]);
      setInstallationAccessManagement(null);
      setSelectedInstallationId(null);
      setSession(null);
      setSessionState("disconnected");
      setError(null);
      setInstallationNotice("GitHub account selection cancelled. No Track demo account is connected.");
      window.history.replaceState({}, "", `${window.location.pathname}#demo`);
    } catch (cancelError) {
      setInstallationError(
        cancelError instanceof Error
          ? cancelError.message
          : "GitHub account selection could not be cancelled. Try again.",
      );
      setInstallationChoiceState("cancel_error");
    }
  };

  const toggleProductRepository = (name: string) => {
    setProductRepositories((current) =>
      current.includes(name)
        ? current.filter((repository) => repository !== name)
        : current.length < PRODUCT_REPOSITORY_LIMIT
          ? [...current, name]
          : current,
    );
  };

  const toggleSurface = (name: string) => {
    setSurfaces((current) => {
      if (current.some((surface) => surface.repository === name)) {
        return current.filter((surface) => surface.repository !== name);
      }
      if (current.length >= SURFACE_LIMIT) return current;
      // A repository named "docs" almost always is one; everything else starts
      // as a website so the reader only has to correct the exceptions.
      const guessedKind: SurfaceKind = /docs|documentation/i.test(name)
        ? "docs"
        : /support|help|kb/i.test(name)
          ? "support"
          : "website";
      return [...current, { repository: name, kind: guessedKind }];
    });
  };

  const setSurfaceKind = (name: string, kind: SurfaceKind) => {
    setSurfaces((current) => current.map((surface) => (surface.repository === name ? { ...surface, kind } : surface)));
  };

  const startRun = async () => {
    if (productRepositories.length === 0 || surfaces.length === 0) return;
    setIsStarting(true);
    setError(null);
    try {
      const response = await fetch(`${CLOUD_API}/api/track/demo/analyze`, {
        body: JSON.stringify({ productRepositories, surfaces }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Thally-Track-Demo": API_VERSION_HEADER,
        },
        method: "POST",
      });
      if (!response.ok) throw new Error(await responseError(response, "Track could not start this analysis."));
      const { runId } = (await response.json()) as { runId: string };
      setRun({
        id: runId,
        status: "queued",
        progress: { phase: "queued", message: "Waiting for a worker" },
        result: null,
        error: null,
        createdAt: new Date().toISOString(),
        completedAt: null,
      });
    } catch (startError) {
      setError(startError instanceof Error ? startError.message : "Track could not start this analysis.");
    } finally {
      setIsStarting(false);
    }
  };

  const restartAnalysis = () => {
    setRun(null);
    setError(null);
    setActiveFinding(null);
    setHandoffState("idle");
    setProductRepositories([]);
    setSurfaces([]);
    void loadSession({ userInitiated: true, resumeRun: false });
    goToStep(1);
  };

  const continueToThally = async () => {
    if (!run) return;
    setHandoffState("loading");
    try {
      const response = await fetch(`${CLOUD_API}/api/track/demo/runs/${run.id}/handoff`, {
        credentials: "include",
        headers: { Accept: "application/json", "X-Thally-Track-Demo": API_VERSION_HEADER },
        method: "POST",
      });
      if (!response.ok) throw new Error(await responseError(response, "Thally could not prepare your workspace link."));
      const { url } = (await response.json()) as { url: string };
      window.location.assign(url);
    } catch (handoffError) {
      setHandoffState("error");
      setError(handoffError instanceof Error ? handoffError.message : "Thally could not prepare your workspace link.");
    }
  };

  const result = run?.status === "completed" ? run.result : null;
  const selectedFinding =
    result && activeFinding
      ? (result.pullRequests[activeFinding.pullRequest]?.findings[activeFinding.finding] ?? null)
      : null;
  const selectedPullRequest =
    result && activeFinding ? (result.pullRequests[activeFinding.pullRequest]?.pullRequest ?? null) : null;
  const surfaceKindByRepository = useMemo(
    () => new Map(result?.surfaces.map((surface) => [surface.repository, surface.kind]) ?? []),
    [result],
  );
  const summarySurfaces: SurfaceSelection[] = surfaces.length > 0 ? surfaces : (run?.result?.surfaces ?? []);
  const summaryProducts =
    productRepositories.length > 0
      ? productRepositories
      : [...new Set(run?.result?.pullRequests.map((analysis) => analysis.pullRequest.repository) ?? [])];
  const progressTotal = run?.progress.pullRequestsTotal ?? 0;
  const progressDone = run?.progress.pullRequestsAnalyzed ?? 0;
  const progressPercent =
    run?.status === "completed"
      ? 100
      : run?.progress.phase === "analyzing" && progressTotal > 0
        ? 15 + Math.round((progressDone / progressTotal) * 80)
        : run?.progress.phase === "collecting"
          ? 10
          : 3;
  const pagesInspected = result?.surfaces.reduce((total, surface) => total + surface.pagesInspected.length, 0) ?? 0;
  const isInstallationChooserVisible = installationChoiceState !== "idle" && installationChoiceState !== "cancelled";
  const selectedInstallation = installationChoices.find(
    (installation) => installation.installationId === selectedInstallationId,
  );
  const chooserManagementUrl =
    installationChoiceState === "unavailable"
      ? (safeGitHubUrl(installationAccessManagement?.url) ?? safeGitHubUrl(selectedInstallation?.accessManagementUrl))
      : safeGitHubUrl(installationAccessManagement?.url);

  return (
    <div className={`${styles.stage} ${step === 4 ? styles.stageWide : ""}`} ref={stageRef}>
      <div className={styles.progressHeader}>
        <p className={styles.progressLabel}>{STEP_NAMES[step]}</p>
        <div
          aria-label={`Step ${step + 1} of ${STEP_NAMES.length}`}
          aria-valuemax={STEP_NAMES.length}
          aria-valuemin={1}
          aria-valuenow={step + 1}
          className={styles.progressSegments}
          role="progressbar"
        >
          {STEP_NAMES.map((name, index) => (
            <span className={index <= step ? styles.progressSegmentActive : ""} key={name} />
          ))}
        </div>
      </div>

      {step === 0 ? (
        <div className={styles.pane}>
          <h3>Connect your GitHub repositories</h3>
          <p className={styles.paneDescription}>
            Install the Thally Labs GitHub App on the repositories you want to test: where your product changes, and
            where customers read about it. Thally reads only the repository contents, metadata, and pull requests you
            grant.
          </p>

          {isInstallationChooserVisible ? (
            <section
              aria-busy={
                installationChoiceState === "loading" ||
                installationChoiceState === "submitting" ||
                installationChoiceState === "cancelling"
              }
              aria-labelledby="github-account-heading"
              className={styles.githubBox}
            >
              <div className={styles.githubTitle}>
                <GitHubMark />
                <div>
                  <h4 id="github-account-heading">Choose the GitHub account to use</h4>
                  <span>Each account grants access to a different set of repositories.</span>
                </div>
              </div>

              {installationChoiceState === "loading" ? (
                <p aria-live="polite" className={styles.installationStatus} role="status">
                  Loading authorized GitHub accounts...
                </p>
              ) : null}

              {installationChoiceState === "cancelling" ? (
                <p aria-live="polite" className={styles.installationStatus} role="status">
                  Cancelling account selection...
                </p>
              ) : null}

              {installationChoiceState === "ready" || installationChoiceState === "submitting" ? (
                <>
                  <ul
                    aria-busy={installationChoiceState === "submitting"}
                    aria-label="Authorized GitHub accounts"
                    className={styles.installationList}
                  >
                    {installationChoices.map((installation) => {
                      const AccountIcon = installation.accountKind === "organization" ? Workspace : Account;
                      const isConnecting = selectedInstallationId === installation.installationId;
                      const managementUrl = safeGitHubUrl(installation.accessManagementUrl);
                      return (
                        <li className={styles.installationChoice} key={installation.installationId}>
                          <button
                            aria-label={installationAccessibleLabel(installation)}
                            className={styles.installationChoiceButton}
                            disabled={installationChoiceState === "submitting"}
                            onClick={() => void chooseInstallation(installation)}
                            type="button"
                          >
                            <span aria-hidden="true" className={styles.installationIcon}>
                              <AccountIcon />
                            </span>
                            <span className={styles.installationText}>
                              <strong>{installation.accountLogin}</strong>
                              <span>
                                {installationKindLabel(installation.accountKind)} ·{" "}
                                {repositoryVisibilityLabel(installation.repositoryVisibility)}
                              </span>
                            </span>
                            <span className={styles.installationAction}>
                              {isConnecting ? "Connecting..." : "Use account"} <ArrowRight />
                            </span>
                          </button>
                          {managementUrl ? (
                            <a
                              aria-label={`Manage GitHub access for ${installation.accountLogin}`}
                              className={styles.installationManageLink}
                              href={managementUrl}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Manage access <ExternalLink />
                            </a>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                  {installationAccessManagement ? (
                    <p className={styles.installationHelp}>{installationAccessManagement.message}</p>
                  ) : null}
                </>
              ) : null}

              {installationChoiceState === "expired" ||
              installationChoiceState === "unavailable" ||
              installationChoiceState === "error" ||
              installationChoiceState === "cancel_error" ? (
                <div className={styles.installationRecovery}>
                  <p className={styles.errorMessage} role="alert">
                    {installationError}
                  </p>
                  {installationAccessManagement ? (
                    <p className={styles.installationHelp}>{installationAccessManagement.message}</p>
                  ) : null}
                  <div className={styles.installationRecoveryActions}>
                    {installationChoiceState === "cancel_error" ? (
                      <>
                        <button
                          className={`${styles.button} ${styles.primaryButton}`}
                          onClick={() => void cancelInstallationChoice()}
                          type="button"
                        >
                          Try cancelling again
                        </button>
                        <button
                          className={`${styles.button} ${styles.ghostButton}`}
                          onClick={() =>
                            installationChoices.length > 1
                              ? setInstallationChoiceState("ready")
                              : void loadInstallationChoices()
                          }
                          type="button"
                        >
                          {installationChoices.length > 1 ? "Keep choosing an account" : "Reload account choices"}
                        </button>
                      </>
                    ) : installationChoiceState === "error" ? (
                      <button
                        className={`${styles.button} ${styles.primaryButton}`}
                        onClick={() => void loadInstallationChoices()}
                        type="button"
                      >
                        Try loading accounts again
                      </button>
                    ) : installationChoiceState === "unavailable" && selectedInstallation ? (
                      <>
                        <button
                          className={`${styles.button} ${styles.primaryButton}`}
                          onClick={() => void chooseInstallation(selectedInstallation)}
                          type="button"
                        >
                          Try this account again
                        </button>
                        <button
                          className={`${styles.button} ${styles.ghostButton}`}
                          onClick={authorizeExistingInstallation}
                          type="button"
                        >
                          Authorize GitHub again
                        </button>
                      </>
                    ) : (
                      <button
                        className={`${styles.button} ${styles.primaryButton}`}
                        onClick={authorizeExistingInstallation}
                        type="button"
                      >
                        Authorize GitHub again
                      </button>
                    )}
                    {chooserManagementUrl ? (
                      <a className={styles.textLink} href={chooserManagementUrl} rel="noreferrer" target="_blank">
                        Manage GitHub access <ExternalLink />
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {installationChoiceState !== "cancel_error" ? (
                <button
                  className={styles.cancelInstallationButton}
                  disabled={
                    installationChoiceState === "loading" ||
                    installationChoiceState === "submitting" ||
                    installationChoiceState === "cancelling"
                  }
                  onClick={() => void cancelInstallationChoice()}
                  type="button"
                >
                  {installationChoiceState === "cancelling"
                    ? "Cancelling account selection"
                    : "Cancel account selection"}
                </button>
              ) : null}
            </section>
          ) : sessionState !== "connected" ? (
            <div className={styles.githubBox}>
              <div className={styles.githubTitle}>
                <GitHubMark />
                <div>
                  <strong>Thally Labs</strong>
                  <span>GitHub App · read-only analysis</span>
                </div>
              </div>
              {["Repository contents", "Pull requests and merge events", "Repository metadata"].map((permission) => (
                <div className={styles.githubPermission} key={permission}>
                  <Check />
                  {permission}
                  <span>read</span>
                </div>
              ))}
              <button
                className={`${styles.button} ${styles.primaryButton}`}
                disabled={sessionState === "loading"}
                onClick={connectGitHub}
                type="button"
              >
                {sessionState === "loading" ? "Checking GitHub connection" : "Connect GitHub and choose repos"}
              </button>
              <p className={styles.githubAlternative}>
                Already installed the Thally Labs app?{" "}
                <button
                  className={styles.textLink}
                  disabled={sessionState === "loading"}
                  onClick={authorizeExistingInstallation}
                  type="button"
                >
                  Authorize with GitHub instead
                </button>
              </p>
              {error ? (
                <p aria-live="polite" className={styles.errorMessage}>
                  {error}
                </p>
              ) : null}
              {installationNotice ? (
                <p aria-live="polite" className={styles.installationNotice} role="status">
                  {installationNotice}
                </p>
              ) : null}
            </div>
          ) : (
            <div className={styles.githubConnected}>
              <span className={styles.avatar}>{session?.accountLogin.slice(0, 2).toUpperCase()}</span>
              <span className={styles.connectionText}>
                <strong>Connected to {session?.accountLogin}</strong>
                <span>
                  Read-only access to {session?.repositories.length}{" "}
                  {session?.repositories.length === 1 ? "repository" : "repositories"}
                </span>
              </span>
              <span className={styles.liveLabel}>Live</span>
            </div>
          )}

          <div className={styles.paneFooter}>
            <span />
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              disabled={sessionState !== "connected" || !session?.canAnalyze || session.repositories.length < 2}
              onClick={() => goToStep(1)}
              type="button"
            >
              Continue <ArrowRight />
            </button>
          </div>
          {session && !session.canAnalyze ? (
            <p className={styles.limitMessage}>
              This GitHub installation has already used its free Track run in the last 24 hours.
            </p>
          ) : null}
          {session && session.repositories.length < 2 ? (
            <p className={styles.limitMessage}>
              Grant at least two repositories: one where your product changes and one where customers read about it.
            </p>
          ) : null}
        </div>
      ) : null}

      {step === 1 ? (
        <div className={styles.pane}>
          <h3>Where does your product change?</h3>
          <p className={styles.paneDescription}>
            Choose up to {PRODUCT_REPOSITORY_LIMIT} repositories. Track reads the last {PULL_REQUEST_LIMIT} pull
            requests merged across them and works out what each one changed for customers.
          </p>
          {productOptions.map((repository) => (
            <RepoOption
              icon="product"
              isDisabled={productRepositories.length >= PRODUCT_REPOSITORY_LIMIT}
              isSelected={productRepositories.includes(repository.fullName)}
              key={repository.fullName}
              onSelect={() => toggleProductRepository(repository.fullName)}
              repository={repository}
            />
          ))}
          <div className={styles.paneFooter}>
            <button className={`${styles.button} ${styles.ghostButton}`} onClick={() => goToStep(0)} type="button">
              Back
            </button>
            <p className={styles.selectionCount}>
              {productRepositories.length} of {PRODUCT_REPOSITORY_LIMIT} selected
            </p>
            <span />
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              disabled={productRepositories.length === 0}
              onClick={() => goToStep(2)}
              type="button"
            >
              Next: choose surfaces <ArrowRight />
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className={styles.pane}>
          <h3>Where do customers read about it?</h3>
          <p className={styles.paneDescription}>
            Choose up to {SURFACE_LIMIT} repositories that hold customer-facing content: your docs, your website, a help
            center. Tell Track what each one is so it knows how to read it.
          </p>
          {surfaceOptions.map((repository) => {
            const selection = surfaces.find((surface) => surface.repository === repository.fullName);
            return (
              <div className={styles.surfaceRow} key={repository.fullName}>
                <RepoOption
                  icon="docs"
                  isDisabled={surfaces.length >= SURFACE_LIMIT}
                  isSelected={Boolean(selection)}
                  onSelect={() => toggleSurface(repository.fullName)}
                  repository={repository}
                />
                {selection ? (
                  <div
                    aria-label={`Content kind for ${repository.fullName}`}
                    className={styles.surfaceKinds}
                    role="radiogroup"
                  >
                    {SURFACE_KINDS.map((option) => (
                      <button
                        aria-checked={selection.kind === option.kind}
                        className={`${styles.surfaceKind} ${selection.kind === option.kind ? styles.surfaceKindActive : ""}`}
                        key={option.kind}
                        onClick={() => setSurfaceKind(repository.fullName, option.kind)}
                        role="radio"
                        title={option.hint}
                        type="button"
                      >
                        {surfaceIcon(option.kind)}
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <div className={styles.paneFooter}>
            <button className={`${styles.button} ${styles.ghostButton}`} onClick={() => goToStep(1)} type="button">
              Back
            </button>
            <p className={styles.selectionCount}>
              {surfaces.length} of {SURFACE_LIMIT} selected
            </p>
            <span />
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              disabled={surfaces.length === 0}
              onClick={() => goToStep(3)}
              type="button"
            >
              Next: run Track <ArrowRight />
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className={styles.pane}>
          <h3>{run ? "Track is reading your repositories" : "Ready to run"}</h3>
          <p className={styles.paneDescription}>
            {run
              ? "This takes a couple of minutes. Track reads each merged pull request, then checks every surface you chose for anything it made stale, inconsistent, or missing."
              : `Track will read the last ${PULL_REQUEST_LIMIT} merged pull requests and compare them with your surfaces. Nothing is written anywhere.`}
          </p>

          <dl className={styles.runSummary}>
            <dt>Product</dt>
            <dd>{summaryProducts.length > 0 ? summaryProducts.join(", ") : "from your last run"}</dd>
            <dt>Surfaces</dt>
            <dd>
              {summarySurfaces.map((surface) => (
                <span className={styles.surfaceChip} key={surface.repository}>
                  {surfaceIcon(surface.kind)}
                  {surface.repository}
                  <em>{surfaceLabel(surface.kind)}</em>
                </span>
              ))}
              {summarySurfaces.length === 0 ? "from your last run" : null}
            </dd>
          </dl>

          {run ? (
            <div aria-live="polite" className={styles.runProgress}>
              <div aria-hidden="true" className={styles.progressBar}>
                <span className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
              </div>
              <p className={styles.progressStatus}>
                {run.status === "failed" ? "Analysis failed" : (run.progress.message ?? "Working")}
                {run.status !== "failed" && run.progress.phase === "analyzing" && progressTotal > 0
                  ? ` · ${progressDone} of ${progressTotal} pull requests`
                  : ""}
              </p>
            </div>
          ) : null}

          {error ? (
            <p aria-live="polite" className={styles.errorMessage}>
              {error}
            </p>
          ) : null}

          <div className={styles.paneFooter}>
            <button
              className={`${styles.button} ${styles.ghostButton}`}
              disabled={Boolean(run && run.status !== "failed")}
              onClick={() => goToStep(2)}
              type="button"
            >
              Back
            </button>
            <span />
            {run && run.status !== "failed" ? null : (
              <button
                className={`${styles.button} ${styles.primaryButton}`}
                disabled={
                  isStarting ||
                  productRepositories.length === 0 ||
                  surfaces.length === 0 ||
                  (session ? !session.canAnalyze : false)
                }
                onClick={() => void startRun()}
                type="button"
              >
                {isStarting ? "Starting" : run?.status === "failed" ? "Try once more" : "Run Track"} <ArrowRight />
              </button>
            )}
          </div>
        </div>
      ) : null}

      {step === 4 && result ? (
        <div className={`${styles.pane} ${styles.findingsPane}`}>
          <div className={styles.brief}>
            <span className={styles.briefIcon}>
              <Track />
            </span>
            <div>
              <p className={styles.briefLabel}>Track says</p>
              <p className={styles.briefText}>{result.brief}</p>
            </div>
          </div>

          <div className={styles.findingsLayout}>
            <div className={styles.findingsList}>
              {result.pullRequests.map((analysis, pullRequestIndex) => (
                <section
                  className={styles.prGroup}
                  key={`${analysis.pullRequest.repository}#${analysis.pullRequest.number}`}
                >
                  <header className={styles.prHeader}>
                    <span className={styles.prIcon}>
                      <GitPullRequest />
                    </span>
                    <span className={styles.prText}>
                      <a href={analysis.pullRequest.url} rel="noreferrer" target="_blank">
                        {analysis.pullRequest.repository} #{analysis.pullRequest.number} <ExternalLink />
                      </a>
                      <span className={styles.prTitle}>{analysis.pullRequest.title}</span>
                      <span className={styles.prMeta}>
                        merged {formatMergedAt(analysis.pullRequest.mergedAt)} · {analysis.pullRequest.filesChanged}{" "}
                        {analysis.pullRequest.filesChanged === 1 ? "file" : "files"}
                      </span>
                    </span>
                    {analysis.findings.length === 0 ? (
                      analysis.unverifiedFindings > 0 ? (
                        <span className={styles.prUnverified}>Unverified</span>
                      ) : (
                        <span className={styles.prCovered}>Reflected</span>
                      )
                    ) : null}
                  </header>
                  {analysis.findings.length === 0 ? (
                    <p className={styles.prSummary}>{analysis.summary}</p>
                  ) : (
                    analysis.findings.map((finding, findingIndex) => {
                      const isActive =
                        activeFinding?.pullRequest === pullRequestIndex && activeFinding?.finding === findingIndex;
                      return (
                        <button
                          aria-current={isActive ? "true" : undefined}
                          className={`${styles.findingsListItem} ${isActive ? styles.findingsListItemActive : ""}`}
                          key={`${finding.surface}:${finding.affectedPage}`}
                          onClick={() => {
                            setActiveFinding({ pullRequest: pullRequestIndex, finding: findingIndex });
                            findingDetailRef.current?.scrollTo({ top: 0 });
                          }}
                          type="button"
                        >
                          <span
                            aria-hidden="true"
                            className={`${styles.findingDot} ${confidenceClass(finding.confidence)}`}
                          />
                          <span className={styles.findingsListText}>
                            <span className={styles.findingsListTitle}>{finding.headline}</span>
                            <span className={styles.findingsListMeta}>
                              {surfaceLabel(surfaceKindByRepository.get(finding.surface) ?? "other")} ·{" "}
                              {finding.affectedPage}
                            </span>
                          </span>
                        </button>
                      );
                    })
                  )}
                </section>
              ))}
            </div>

            <article className={styles.findingDetail} ref={findingDetailRef}>
              {selectedFinding && selectedPullRequest ? (
                <>
                  <header className={styles.findingHeader}>
                    <span className={styles.findingIcon}>
                      {surfaceIcon(surfaceKindByRepository.get(selectedFinding.surface) ?? "other")}
                    </span>
                    <div>
                      <h4>
                        {selectedFinding.headline}
                        <span>
                          {selectedPullRequest.repository} #{selectedPullRequest.number} →{" "}
                          {selectedPullRequest.baseBranch}
                        </span>
                      </h4>
                      <p>
                        {selectedFinding.surface} · {selectedFinding.affectedPage}
                      </p>
                    </div>
                    <span
                      className={`${styles.confidence} ${
                        selectedFinding.confidence === "medium"
                          ? styles.confidenceMedium
                          : selectedFinding.confidence === "low"
                            ? styles.confidenceLow
                            : styles.confidenceHigh
                      }`}
                    >
                      {selectedFinding.confidence} confidence
                    </span>
                  </header>
                  <dl className={styles.evidenceGrid}>
                    <dt>What changed</dt>
                    <dd>{selectedFinding.evidence.join(" ")}</dd>
                    <dt>Gap</dt>
                    <dd>{gapDescription(selectedFinding.gap)}</dd>
                    <dt>Why this matters</dt>
                    <dd>{selectedFinding.impact}</dd>
                  </dl>
                  <div className={styles.diff}>
                    <div className={styles.diffHeader}>
                      <Docs /> {selectedFinding.affectedPage} <span>Drafted update · for your review</span>
                    </div>
                    <div className={styles.diffDelete}>- {selectedFinding.draft.before}</div>
                    <div className={styles.diffAdd}>+ {selectedFinding.draft.after}</div>
                  </div>
                  <p className={styles.findingFootnote}>
                    Evidence comes from the merged pull request and the pages Track inspected. In Thally, this becomes a
                    draft pull request on {selectedFinding.surface}. Nothing publishes without review.
                  </p>
                </>
              ) : (
                <div className={styles.noFindings}>
                  <span className={styles.findingIcon}>
                    <Track />
                  </span>
                  <h4>{result.findingsCount > 0 ? "Pick a gap to see the evidence" : "Nothing to fix right now"}</h4>
                  <p>
                    {result.findingsCount > 0
                      ? "Each gap shows what the pull request changed, which page still says otherwise, and the draft Track would open."
                      : `Track read ${result.pullRequests.length} merged ${result.pullRequests.length === 1 ? "pull request" : "pull requests"} and inspected ${pagesInspected} pages. Every surface already reflects those changes.`}
                  </p>
                </div>
              )}
            </article>
          </div>

          <div className={styles.decisionCard}>
            <div>
              <h4>
                {result.findingsCount > 0
                  ? "Should I draft pull requests to close these gaps?"
                  : "Should I keep watching every merge?"}
              </h4>
              <p>
                {result.findingsCount > 0
                  ? `Yes opens a Thally workspace with these repositories already connected. Track drafts the ${result.findingsCount === 1 ? "pull request" : "pull requests"} for review and keeps checking every merge from now on.`
                  : "Yes opens a Thally workspace with these repositories already connected, so the next merge that changes something customers rely on gets a draft pull request."}
              </p>
              {handoffState === "declined" ? (
                <p className={styles.decisionNote}>
                  No problem. This run stays here for 24 hours, and you can continue whenever you are ready.
                </p>
              ) : null}
              {handoffState === "error" && error ? (
                <p aria-live="polite" className={styles.errorMessage}>
                  {error}
                </p>
              ) : null}
            </div>
            <div className={styles.decisionActions}>
              <button
                className={`${styles.button} ${styles.primaryButton}`}
                disabled={handoffState === "loading"}
                onClick={() => void continueToThally()}
                type="button"
              >
                {handoffState === "loading" ? "Preparing your workspace" : "Yes, draft them"} <ArrowRight />
              </button>
              {handoffState !== "declined" ? (
                <button
                  className={`${styles.button} ${styles.ghostButton}`}
                  disabled={handoffState === "loading"}
                  onClick={() => setHandoffState("declined")}
                  type="button"
                >
                  Not now
                </button>
              ) : null}
            </div>
          </div>
          <div className={styles.paneFooter}>
            <span />
            <button className={`${styles.button} ${styles.ghostButton}`} onClick={restartAnalysis} type="button">
              <RefreshCw /> Run on other repositories
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
