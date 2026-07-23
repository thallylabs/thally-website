"use client";

/**
 * Live pre-signup Track client.
 *
 * The static website holds no GitHub or model credential. It uses the
 * credentialed, installation-bound API exposed by Thally Cloud.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ArrowRight, Check, Docs, GitBranch, GitPullRequest, RefreshCw, Track } from "@/components/icons";
import { DESTINATIONS } from "@/lib/site";

import styles from "./track-page.module.css";

const CLOUD_API = (process.env.NEXT_PUBLIC_THALLY_CLOUD_API_URL || "https://app.thally.io").replace(/\/$/, "");
const STEP_NAMES = ["Connect GitHub", "Docs repository", "Product repositories", "Run analysis", "Findings"];

interface RepositoryOption {
  defaultBranch: string;
  fullName: string;
  htmlUrl: string;
  isPrivate: boolean;
}

interface TrackSession {
  accountLogin: string;
  canAnalyze: boolean;
  repositories: RepositoryOption[];
  status: "connected" | "analyzing" | "completed" | "failed";
}

interface TrackFinding {
  affectedPage: string;
  confidence: "high" | "medium" | "low";
  draft: { after: string; before: string };
  evidence: string[];
  impact: string;
  title: string;
}

interface TrackResult {
  analysis: {
    findings: TrackFinding[];
    summary: string;
  };
  pagesInspected: string[];
  pullRequest: {
    baseBranch: string;
    mergedAt: string;
    number: number;
    repository: string;
    title: string;
    url: string;
  };
}

type SessionState = "loading" | "disconnected" | "connected" | "error";

function GitHubMark() {
  return (
    <svg aria-hidden="true" className={styles.githubMark} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function RepoOption({
  icon,
  isSelected,
  onSelect,
  repository,
}: {
  icon: "docs" | "product";
  isSelected: boolean;
  onSelect: () => void;
  repository: RepositoryOption;
}) {
  const RepoIcon = icon === "docs" ? Docs : GitBranch;
  return (
    <button
      aria-pressed={isSelected}
      className={`${styles.repoOption} ${isSelected ? styles.repoOptionSelected : ""}`}
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

export function TrackDemo() {
  const [step, setStep] = useState(0);
  const [sessionState, setSessionState] = useState<SessionState>("loading");
  const [session, setSession] = useState<TrackSession | null>(null);
  const [docsRepository, setDocsRepository] = useState<string | null>(null);
  const [productRepositories, setProductRepositories] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [activeFindingIndex, setActiveFindingIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [visibleLogLines, setVisibleLogLines] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const findingDetailRef = useRef<HTMLElement>(null);

  const loadSession = useCallback(async () => {
    const githubStatus = new URLSearchParams(window.location.search).get("github");
    setSessionState("loading");
    setError(
      githubStatus === "failed"
        ? "GitHub could not finish the connection. Please try again."
        : githubStatus === "cancelled"
          ? "GitHub connection was cancelled. No repository access was granted."
          : null,
    );
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
    } catch {
      setError("Could not reach the Track service. Please try again.");
      setSessionState("error");
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void loadSession(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadSession]);

  const productOptions = useMemo(
    () => session?.repositories.filter((repository) => repository.fullName !== docsRepository) ?? [],
    [docsRepository, session],
  );
  const runLogLines = useMemo(
    () => [
      `Verifying access to ${docsRepository || "your docs repository"}`,
      `Finding the latest merged pull request across ${productRepositories.length || 1} product ${productRepositories.length === 1 ? "repository" : "repositories"}`,
      "Reading the bounded pull request patch and changed public surfaces",
      "Ranking Markdown pages connected to the change",
      "Drafting evidence-backed documentation updates",
    ],
    [docsRepository, productRepositories.length],
  );
  const activeFinding = result?.analysis.findings[activeFindingIndex] ?? null;

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    window.requestAnimationFrame(() => {
      const top = stageRef.current?.getBoundingClientRect().top;
      if (typeof top === "number" && Math.abs(top) > 120) {
        window.scrollTo({ top: top + window.scrollY - 88, behavior: "smooth" });
      }
    });
  };

  const connectGitHub = () => {
    window.location.assign(`${CLOUD_API}/api/track/demo/github/connect`);
  };

  const chooseDocsRepository = (name: string) => {
    setDocsRepository(name);
    setProductRepositories((current) => current.filter((repository) => repository !== name));
  };

  const toggleProductRepository = (name: string) => {
    setProductRepositories((current) =>
      current.includes(name)
        ? current.filter((repository) => repository !== name)
        : current.length < 3
          ? [...current, name]
          : current,
    );
  };

  const runAnalysis = async () => {
    if (!docsRepository || productRepositories.length === 0) return;
    setIsRunning(true);
    setError(null);
    setVisibleLogLines(1);
    const logTimer = window.setInterval(() => {
      setVisibleLogLines((current) => Math.min(current + 1, runLogLines.length));
    }, 1_300);
    try {
      const response = await fetch(`${CLOUD_API}/api/track/demo/analyze`, {
        body: JSON.stringify({ docsRepository, productRepositories }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Thally-Track-Demo": "track-v1",
        },
        method: "POST",
      });
      if (!response.ok) throw new Error(await responseError(response, "Track could not complete this analysis."));
      setResult((await response.json()) as TrackResult);
      setActiveFindingIndex(0);
      setVisibleLogLines(runLogLines.length);
      goToStep(4);
    } catch (analysisError) {
      setError(analysisError instanceof Error ? analysisError.message : "Track could not complete this analysis.");
    } finally {
      window.clearInterval(logTimer);
      setIsRunning(false);
    }
  };

  const restartAnalysis = () => {
    setResult(null);
    setError(null);
    setVisibleLogLines(0);
    setActiveFindingIndex(0);
    goToStep(1);
  };

  const selectFinding = (index: number) => {
    setActiveFindingIndex(index);
    findingDetailRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div className={`${styles.stage} ${step === 4 ? styles.stageWide : ""}`} ref={stageRef}>
      <div className={styles.progressHeader}>
        <p className={styles.progressLabel}>
          Step {step + 1} of 5 <span>· {STEP_NAMES[step]}</span>
        </p>
        <div
          aria-label={`Step ${step + 1} of 5`}
          aria-valuemax={5}
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
            Install the Thally Labs GitHub App on the repositories you want to test. Thally reads only the repository
            contents, metadata, and pull requests you grant.
          </p>

          {sessionState !== "connected" ? (
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
              {error ? (
                <p aria-live="polite" className={styles.errorMessage}>
                  {error}
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
              This GitHub installation has already used its free Track analysis in the last 24 hours.
            </p>
          ) : null}
          {session && session.repositories.length < 2 ? (
            <p className={styles.limitMessage}>
              Grant at least two repositories: one for docs and one where your product changes.
            </p>
          ) : null}
        </div>
      ) : null}

      {step === 1 ? (
        <div className={styles.pane}>
          <h3>Where do your docs live?</h3>
          <p className={styles.paneDescription}>
            Choose the repository containing your Markdown or MDX documentation. Track will inspect a bounded set of
            pages relevant to the product change.
          </p>
          {session?.repositories.map((repository) => (
            <RepoOption
              icon="docs"
              isSelected={docsRepository === repository.fullName}
              key={repository.fullName}
              onSelect={() => chooseDocsRepository(repository.fullName)}
              repository={repository}
            />
          ))}
          <div className={styles.paneFooter}>
            <button className={`${styles.button} ${styles.ghostButton}`} onClick={() => goToStep(0)} type="button">
              Back
            </button>
            <span />
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              disabled={!docsRepository}
              onClick={() => goToStep(2)}
              type="button"
            >
              Next: choose product repos <ArrowRight />
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className={styles.pane}>
          <h3>Where does your product change?</h3>
          <p className={styles.paneDescription}>
            Select up to three repositories. Track will analyze the most recently merged pull request across them.
          </p>
          {productOptions.map((repository) => (
            <RepoOption
              icon="product"
              isSelected={productRepositories.includes(repository.fullName)}
              key={repository.fullName}
              onSelect={() => toggleProductRepository(repository.fullName)}
              repository={repository}
            />
          ))}
          <div className={styles.paneFooter}>
            <p aria-live="polite" className={styles.selectionCount}>
              {productRepositories.length} of 3 selected
            </p>
            <span />
            <button className={`${styles.button} ${styles.ghostButton}`} onClick={() => goToStep(1)} type="button">
              Back
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              disabled={productRepositories.length === 0}
              onClick={() => goToStep(3)}
              type="button"
            >
              Continue <ArrowRight />
            </button>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className={styles.pane}>
          <h3>Analyze your latest merged change</h3>
          <p className={styles.paneDescription}>
            This is a real read-only run against your selected repositories. It can take up to a minute while Track
            reads the pull request, finds connected docs, and validates a draft.
          </p>
          <div aria-live="polite" className={styles.progressLog} role="log">
            {visibleLogLines === 0 ? (
              <p className={styles.logPlaceholder}>Ready to analyze your repositories.</p>
            ) : null}
            {runLogLines.slice(0, visibleLogLines).map((line, index) => (
              <p className={index < visibleLogLines - 1 || !isRunning ? styles.logSuccess : ""} key={line}>
                <span>{index < visibleLogLines - 1 || !isRunning ? "✓" : "·"}</span>
                {line}
              </p>
            ))}
          </div>
          {error ? (
            <p aria-live="polite" className={styles.errorMessage}>
              {error}
            </p>
          ) : null}
          <div className={styles.paneFooter}>
            <span />
            <button
              className={`${styles.button} ${styles.ghostButton}`}
              disabled={isRunning}
              onClick={() => goToStep(2)}
              type="button"
            >
              Back
            </button>
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              disabled={isRunning}
              onClick={() => void runAnalysis()}
              type="button"
            >
              <Track /> {isRunning ? "Analyzing your repositories" : "Run Thally Track"}
            </button>
          </div>
        </div>
      ) : null}

      {step === 4 && result ? (
        <div className={`${styles.pane} ${styles.findingsPane}`}>
          <h3>Findings</h3>
          <p className={styles.paneDescription}>
            Analyzed the most recent merged change in{" "}
            <a href={result.pullRequest.url} rel="noreferrer" target="_blank">
              {result.pullRequest.repository} #{result.pullRequest.number}
            </a>{" "}
            against {docsRepository}.
          </p>
          <p className={styles.verdict}>
            <span /> {result.analysis.findings.length} {result.analysis.findings.length === 1 ? "finding" : "findings"}{" "}
            detected <em>· candidates, not verified corrections</em>
          </p>

          {result.analysis.findings.length === 0 ? (
            <div className={styles.noFindings}>
              <Check />
              <div>
                <strong>No grounded documentation update was found.</strong>
                <p>Track inspected {result.pagesInspected.length} likely pages and chose not to invent a change.</p>
              </div>
            </div>
          ) : null}

          {activeFinding ? (
            <div className={styles.findingsLayout}>
              <div className={styles.findingsList}>
                <div className={styles.findingsListLabel}>
                  {result.analysis.findings.length} {result.analysis.findings.length === 1 ? "finding" : "findings"}
                </div>
                {result.analysis.findings.map((finding, index) => (
                  <button
                    aria-current={index === activeFindingIndex ? "true" : undefined}
                    className={`${styles.findingsListItem} ${
                      index === activeFindingIndex ? styles.findingsListItemActive : ""
                    }`}
                    key={`${finding.affectedPage}:${finding.title}`}
                    onClick={() => selectFinding(index)}
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className={`${styles.findingDot} ${
                        finding.confidence === "medium"
                          ? styles.findingDotMedium
                          : finding.confidence === "low"
                            ? styles.findingDotLow
                            : styles.findingDotHigh
                      }`}
                    />
                    <span className={styles.findingsListText}>
                      <span className={styles.findingsListTitle}>{finding.title}</span>
                      <span className={styles.findingsListMeta}>
                        {finding.affectedPage} · {finding.confidence}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              <article className={styles.findingDetail} ref={findingDetailRef}>
                <header className={styles.findingHeader}>
                  <span className={styles.findingIcon}>
                    <GitPullRequest />
                  </span>
                  <div>
                    <h4>
                      {activeFinding.title}
                      <span>
                        {result.pullRequest.repository} #{result.pullRequest.number} → {result.pullRequest.baseBranch}
                      </span>
                    </h4>
                    <p>{activeFinding.affectedPage} may be affected</p>
                  </div>
                  <span
                    className={`${styles.confidence} ${
                      activeFinding.confidence === "medium"
                        ? styles.confidenceMedium
                        : activeFinding.confidence === "low"
                          ? styles.confidenceLow
                          : styles.confidenceHigh
                    }`}
                  >
                    {activeFinding.confidence} confidence
                  </span>
                </header>
                <dl className={styles.evidenceGrid}>
                  <dt>Change detected</dt>
                  <dd>{activeFinding.evidence.join(" ")}</dd>
                  <dt>Docs searched</dt>
                  <dd>
                    {result.pagesInspected.length} likely Markdown{" "}
                    {result.pagesInspected.length === 1 ? "page" : "pages"} inspected. Track matched{" "}
                    {activeFinding.affectedPage}.
                  </dd>
                  <dt>Why this matters</dt>
                  <dd>{activeFinding.impact}</dd>
                </dl>
                <div className={styles.diff}>
                  <div className={styles.diffHeader}>
                    <Docs /> {activeFinding.affectedPage} <span>Drafted update · for your review</span>
                  </div>
                  <div className={styles.diffDelete}>- {activeFinding.draft.before}</div>
                  <div className={styles.diffAdd}>+ {activeFinding.draft.after}</div>
                </div>
                <p className={styles.findingFootnote}>
                  Evidence comes from the bounded pull request and the connected docs. In Thally, Track opens this as a
                  draft pull request. Nothing publishes without review.
                </p>
              </article>
            </div>
          ) : null}

          <div className={styles.conversionCard}>
            <div>
              <h4>
                {result.analysis.findings.length > 0
                  ? "Turn these into pull requests"
                  : "Keep your docs checked on every merge"}
              </h4>
              <p>
                Create a Thally workspace to send these drafts to your docs repository for review, and let Track watch
                every merge from now on.
              </p>
            </div>
            <a className={`${styles.button} ${styles.primaryButton}`} href={`${DESTINATIONS.signup}?intent=track`}>
              Continue with Thally <ArrowRight />
            </a>
          </div>
          <div className={styles.paneFooter}>
            <span />
            <button className={`${styles.button} ${styles.ghostButton}`} onClick={restartAnalysis} type="button">
              <RefreshCw /> Run another analysis
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
