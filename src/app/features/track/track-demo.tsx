"use client";

/**
 * Guided Track tour for anonymous visitors.
 *
 * This component mirrors the production GitHub setup flow without requesting
 * repository access or implying that its representative finding is live.
 */

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ArrowRight, Check, Docs, GitBranch, GitPullRequest, RefreshCw, Track } from "@/components/icons";
import { DESTINATIONS } from "@/lib/site";

import styles from "./track-page.module.css";

const STEP_NAMES = ["Connect GitHub", "Docs repository", "Product repositories", "Run analysis", "Findings"];

interface RepositoryOption {
  description: string;
  name: string;
}

const DOC_REPOSITORIES: RepositoryOption[] = [
  { name: "thally-demo/platform-docs", description: "Docs site · 128 pages · Thally platform" },
  { name: "thally-demo/sdk-docs", description: "Docs site · 54 pages · Markdown" },
];

const PRODUCT_REPOSITORIES: RepositoryOption[] = [
  { name: "thally-demo/typescript-sdk", description: "TypeScript SDK · exports public client API" },
  { name: "thally-demo/payments-api", description: "API service · OpenAPI description + webhooks" },
  { name: "thally-demo/cli", description: "CLI · commands and flags" },
];

interface SampleFinding {
  afterLine: string;
  beforeLine: string;
  changeDetected: string;
  contextAfter: string;
  contextBefore: string;
  docsPages: [string, string];
  evidence: string;
  filePath: string;
  logChange: string;
  symbol: string;
  title: string;
  whyItMatters: string;
}

const SAMPLE_FINDINGS: Record<string, SampleFinding> = {
  "thally-demo/typescript-sdk": {
    title: "Default request timeout changed from 30s to 60s",
    symbol: "DEFAULT_TIMEOUT_MS",
    logChange: "exported constant DEFAULT_TIMEOUT_MS changed from 30000 to 60000",
    changeDetected: "Changed from 30000 to 60000 and is exported through the public TypeScript client.",
    docsPages: ["/sdk/configuration", "/guides/long-running-jobs"],
    whyItMatters:
      "Both pages state the old default. Readers copying the example will describe behaviour the SDK no longer has.",
    filePath: "sdk/configuration.mdx",
    contextBefore: "Every request made through the client is subject to a timeout.",
    beforeLine: "By default the client waits **30 seconds** before aborting.",
    afterLine: "By default the client waits **60 seconds** before aborting.",
    contextAfter: "Override it per request with the `timeout` option.",
    evidence: "exported SDK default and configuration schema",
  },
  "thally-demo/payments-api": {
    title: "Webhook retry window increased from 24h to 48h",
    symbol: "webhookRetryWindowHours",
    logChange: "OpenAPI field webhookRetryWindowHours changed from 24 to 48",
    changeDetected: "Changed from 24 to 48 in the published webhook configuration schema.",
    docsPages: ["/api/webhooks", "/guides/retries"],
    whyItMatters:
      "Both pages promise retries stop after 24 hours, which no longer matches the public webhook contract.",
    filePath: "api/webhooks.mdx",
    contextBefore: "Failed webhook deliveries are retried with exponential backoff.",
    beforeLine: "Retries continue for up to **24 hours** after the first attempt.",
    afterLine: "Retries continue for up to **48 hours** after the first attempt.",
    contextAfter: "Return a 2xx response to stop the retry schedule.",
    evidence: "published OpenAPI field and webhook configuration schema",
  },
  "thally-demo/cli": {
    title: "Deploy command timeout changed from 30s to 60s",
    symbol: "DEFAULT_DEPLOY_TIMEOUT_MS",
    logChange: "public CLI default DEFAULT_DEPLOY_TIMEOUT_MS changed from 30000 to 60000",
    changeDetected: "Changed from 30000 to 60000 in the exported deploy command configuration.",
    docsPages: ["/cli/deploy", "/reference/flags"],
    whyItMatters:
      "The command guide and flag reference describe the previous default, so operators may plan for the wrong wait time.",
    filePath: "cli/deploy.mdx",
    contextBefore: "The deploy command waits for the remote build to finish.",
    beforeLine: "The default timeout is **30 seconds**.",
    afterLine: "The default timeout is **60 seconds**.",
    contextAfter: "Use `--timeout` to choose a different limit.",
    evidence: "exported CLI default and command option schema",
  },
};

type ConnectionState = "idle" | "waiting" | "connected";

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
        <span className={styles.repoName}>{repository.name}</span>
        <span className={styles.repoDescription}>{repository.description}</span>
      </span>
      <span aria-hidden="true" className={styles.selectionIcon}>
        {isSelected ? <Check /> : null}
      </span>
    </button>
  );
}

export function TrackDemo() {
  const [step, setStep] = useState(0);
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle");
  const [docsRepository, setDocsRepository] = useState<string | null>(null);
  const [productRepositories, setProductRepositories] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [visibleLogLines, setVisibleLogLines] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const timeoutIds = useRef<number[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const firstProductRepository = productRepositories[0] ?? PRODUCT_REPOSITORIES[0].name;
  const finding = SAMPLE_FINDINGS[firstProductRepository] ?? SAMPLE_FINDINGS[PRODUCT_REPOSITORIES[0].name];
  const logLines = useMemo(
    () => [
      `Indexing ${docsRepository ?? DOC_REPOSITORIES[0].name} · 128 pages, 42 code samples, llms.txt found`,
      `Reading the latest merged pull request from ${productRepositories.join(", ")}`,
      `${firstProductRepository} #482 · extracting public-surface changes`,
      `Detected: ${finding.logChange}`,
      "Searching indexed docs for connected concepts · 3 candidate pages",
      "Drafting evidence-backed updates for review",
      `Done · 3 findings across ${productRepositories.length} ${productRepositories.length === 1 ? "repository" : "repositories"}`,
    ],
    [docsRepository, finding.logChange, firstProductRepository, productRepositories],
  );

  const clearTimers = useCallback(() => {
    timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIds.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const goToStep = useCallback(
    (nextStep: number) => {
      setStep(nextStep);
      window.requestAnimationFrame(() => {
        const stage = stageRef.current;
        if (!stage) return;
        const targetY = stage.getBoundingClientRect().top + window.scrollY - 88;
        if (Math.abs(window.scrollY - targetY) > 120) {
          window.scrollTo({ top: targetY, behavior: shouldReduceMotion ? "auto" : "smooth" });
        }
      });
    },
    [shouldReduceMotion],
  );

  const connectSampleWorkspace = () => {
    setConnectionState("waiting");
    const delay = shouldReduceMotion ? 0 : 900;
    timeoutIds.current.push(
      window.setTimeout(() => {
        setConnectionState("connected");
      }, delay),
    );
  };

  const toggleProductRepository = (name: string) => {
    setProductRepositories((current) =>
      current.includes(name) ? current.filter((repository) => repository !== name) : [...current, name],
    );
  };

  const runAnalysis = () => {
    clearTimers();
    setIsRunning(true);
    setVisibleLogLines(shouldReduceMotion ? logLines.length : 0);

    if (shouldReduceMotion) {
      timeoutIds.current.push(
        window.setTimeout(() => {
          setIsRunning(false);
          goToStep(4);
        }, 150),
      );
      return;
    }

    logLines.forEach((_, index) => {
      timeoutIds.current.push(window.setTimeout(() => setVisibleLogLines(index + 1), 360 * index + 120));
    });
    timeoutIds.current.push(
      window.setTimeout(
        () => {
          setIsRunning(false);
          goToStep(4);
        },
        360 * logLines.length + 650,
      ),
    );
  };

  const restartDemo = () => {
    clearTimers();
    setDocsRepository(null);
    setProductRepositories([]);
    setIsRunning(false);
    setVisibleLogLines(0);
    goToStep(1);
  };

  return (
    <div className={styles.stage} ref={stageRef}>
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
          <h3>Connect a GitHub workspace</h3>
          <p className={styles.paneDescription}>
            The live product uses the Thally Labs GitHub App and only sees repositories you grant it. This tour mirrors
            that flow with a representative read-only workspace, so it never requests access to your account.
          </p>

          {connectionState !== "connected" ? (
            <div className={styles.githubBox}>
              <div className={styles.githubTitle}>
                <GitHubMark />
                <div>
                  <strong>Thally Labs</strong>
                  <span>GitHub App · read-only</span>
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
                disabled={connectionState === "waiting"}
                onClick={connectSampleWorkspace}
                type="button"
              >
                {connectionState === "waiting" ? "Connecting sample workspace" : "Connect sample GitHub workspace"}
              </button>
              {connectionState === "waiting" ? (
                <p aria-live="polite" className={styles.githubWaiting}>
                  <span /> Loading the same repository grants used by the live setup flow.
                </p>
              ) : null}
            </div>
          ) : (
            <div className={styles.githubConnected}>
              <span className={styles.avatar}>TD</span>
              <span className={styles.connectionText}>
                <strong>Connected to the Thally demo workspace</strong>
                <span>Representative read-only access to 5 repositories</span>
              </span>
              <span className={styles.sampleLabel}>Guided sample</span>
            </div>
          )}

          <div className={styles.paneFooter}>
            <span />
            <button
              className={`${styles.button} ${styles.primaryButton}`}
              disabled={connectionState !== "connected"}
              onClick={() => goToStep(1)}
              type="button"
            >
              Continue <ArrowRight />
            </button>
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className={styles.pane}>
          <h3>Where do your docs live?</h3>
          <p className={styles.paneDescription}>
            In Thally Cloud, these choices come from the GitHub App installation attached to your workspace. Pick the
            sample repository that Track should index when analysis runs.
          </p>
          {DOC_REPOSITORIES.map((repository) => (
            <RepoOption
              icon="docs"
              isSelected={docsRepository === repository.name}
              key={repository.name}
              onSelect={() => setDocsRepository(repository.name)}
              repository={repository}
            />
          ))}
          <p className={styles.githubHint}>
            <GitBranch /> Live workspaces can update GitHub App access whenever a repository is missing.
          </p>
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
              Next: connect product repos <ArrowRight />
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className={styles.pane}>
          <h3>Where does your product change?</h3>
          <p className={styles.paneDescription}>
            Select one or more repositories that define public behaviour. Track watches merged pull requests on their
            default branches.
          </p>
          {PRODUCT_REPOSITORIES.map((repository) => (
            <RepoOption
              icon="product"
              isSelected={productRepositories.includes(repository.name)}
              key={repository.name}
              onSelect={() => toggleProductRepository(repository.name)}
              repository={repository}
            />
          ))}
          <div className={styles.paneFooter}>
            <p aria-live="polite" className={styles.selectionCount}>
              {productRepositories.length > 0
                ? `${productRepositories.length} selected`
                : "0 selected · pick at least one"}
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
          <h3>Analyze a representative merged change</h3>
          <p className={styles.paneDescription}>
            The tour now shows the reasoning chain for a prepared, evidence-backed example. The live product performs
            these steps against your selected repositories after signup.
          </p>
          <div aria-live="polite" className={styles.progressLog} role="log">
            {visibleLogLines === 0 ? (
              <p className={styles.logPlaceholder}>Ready to analyze the bounded change.</p>
            ) : null}
            {logLines.slice(0, visibleLogLines).map((line, index) => (
              <p className={index === 0 || index === 3 || index === 6 ? styles.logSuccess : ""} key={line}>
                <span>{index === 0 || index === 3 || index === 6 ? "✓" : "·"}</span>
                {line}
              </p>
            ))}
          </div>
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
              onClick={runAnalysis}
              type="button"
            >
              <Track /> {isRunning ? "Analyzing change" : "Run Thally Track"}
            </button>
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className={`${styles.pane} ${styles.findingsPane}`}>
          <h3>Findings</h3>
          <p className={styles.paneDescription}>
            Representative analysis of a merged change from {firstProductRepository} against {docsRepository}.
          </p>
          <p className={styles.verdict}>
            <span /> 3 findings, 1 shown below <em>· candidates, not verified corrections</em>
          </p>

          <article className={styles.findingCard}>
            <header className={styles.findingHeader}>
              <span className={styles.findingIcon}>
                <GitPullRequest />
              </span>
              <div>
                <h4>
                  {finding.title}
                  <span>{firstProductRepository} #482 → main</span>
                </h4>
                <p>2 documentation pages may be affected</p>
              </div>
              <span className={styles.confidence}>High confidence</span>
            </header>

            <div className={styles.findingBody}>
              <dl className={styles.evidenceGrid}>
                <dt>Change detected</dt>
                <dd>
                  <code>{finding.symbol}</code> {finding.changeDetected}
                </dd>
                <dt>Docs searched</dt>
                <dd>
                  128 indexed pages, with matches in <code>{finding.docsPages[0]}</code> and{" "}
                  <code>{finding.docsPages[1]}</code>.
                </dd>
                <dt>Why this matters</dt>
                <dd>{finding.whyItMatters}</dd>
              </dl>

              <div className={styles.diff}>
                <div className={styles.diffHeader}>
                  <Docs /> {finding.filePath} <span>Drafted update · for your review</span>
                </div>
                <div className={styles.diffContext}> {finding.contextBefore}</div>
                <div className={styles.diffDelete}>- {finding.beforeLine}</div>
                <div className={styles.diffAdd}>+ {finding.afterLine}</div>
                <div className={styles.diffContext}> {finding.contextAfter}</div>
              </div>
              <p className={styles.findingFootnote}>
                Evidence: {finding.evidence}. Track opens the update as a draft pull request against your docs
                repository. Nothing publishes without review.
              </p>
            </div>
          </article>

          <div className={styles.conversionCard}>
            <div>
              <h4>2 more findings are waiting</h4>
              <p>
                Create a free account to connect your own GitHub repositories, send drafts as pull requests, and let
                Track watch every merge from then on.
              </p>
            </div>
            <a className={`${styles.button} ${styles.primaryButton}`} href={`${DESTINATIONS.signup}?intent=track`}>
              Connect your repos <ArrowRight />
            </a>
          </div>
          <div className={styles.paneFooter}>
            <span />
            <button className={`${styles.button} ${styles.ghostButton}`} onClick={restartDemo} type="button">
              <RefreshCw /> Run the demo again
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
