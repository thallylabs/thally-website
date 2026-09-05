"use client";

import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";

import { LOGO_SRC } from "@/components/layout/logo";
import {
  ALL_OFF_EMAIL_PREFERENCES,
  DEFAULT_EMAIL_PREFERENCES,
  EMAIL_CATEGORIES,
  EMAIL_PREFERENCES_ENDPOINT,
  type EmailCategoryKey,
  type EmailPreferenceAction,
  type EmailPreferences,
  type EmailPreferenceState,
  normalizeEmail,
} from "@/lib/email-preferences";
import { DESTINATIONS, LEGAL_ENTITY_NAME, SITE_NAME, SOCIAL } from "@/lib/site";
import { cn } from "@/lib/utils";

/* The one brand flourish on this page: forest green for the period, the
   switches and the status dot. Parchment is the body band. */
const TONES = {
  "--forest": "oklch(0.42 0.09 152)",
  "--forest-hover": "oklch(0.3 0.017 138)",
  "--parchment": "#F6F5EC",
  "--track": "oklch(0.235 0.017 138 / 0.18)",
} as React.CSSProperties;

type Status = "Saved" | "Restored" | null;

/**
 * A plain button carrying the switch role. Default chrome is stripped and
 * keyboard focus shows a forest ring; the thumb is a child span so no CSS
 * outside this file is needed.
 */
function Switch({
  checked,
  disabled,
  label,
  onToggle,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onToggle?: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      aria-label={label}
      onClick={disabled ? undefined : onToggle}
      className={cn(
        "relative mt-0.5 h-[26px] w-11 flex-none appearance-none rounded-full border-0 p-0 transition-colors duration-150 outline-none",
        "focus-visible:shadow-[0_0_0_2px_#fff,0_0_0_4px_var(--forest)]",
        checked ? "bg-(--forest)" : "bg-(--track)",
        disabled ? "cursor-default opacity-45" : "cursor-pointer",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-[3px] left-[3px] size-5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-transform duration-150",
          checked && "translate-x-[18px]",
        )}
      />
    </button>
  );
}

function PreferenceRow({
  title,
  description,
  tag,
  children,
}: {
  title: string;
  description: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border flex items-start justify-between gap-6 border-t py-5">
      <div>
        <p className="mb-1 text-[0.98rem] font-semibold">{title}</p>
        <p className="text-muted-foreground m-0 text-[0.9rem] leading-[1.55]">{description}</p>
        {tag && <span className="text-muted-foreground mt-1.5 inline-block font-mono text-[0.72rem]">{tag}</span>}
      </div>
      {children}
    </div>
  );
}

interface ResolvedLink {
  email: string | null;
  token: string | null;
  /** `?state=unsubscribed`: one-click unsubscribe already happened server-side. */
  confirmed: boolean;
  /** What is stored for the address, when the endpoint could answer. */
  state: EmailPreferenceState | null;
}

async function resolveLink(): Promise<ResolvedLink> {
  const query = new URLSearchParams(window.location.search);
  const email = normalizeEmail(query.get("email"));
  const token = query.get("token");
  const confirmed = query.get("state") === "unsubscribed";
  if (!email || confirmed) return { email, token, confirmed, state: null };

  const params = new URLSearchParams({ email });
  if (token) params.set("token", token);
  try {
    const response = await fetch(`${EMAIL_PREFERENCES_ENDPOINT}?${params}`, {
      credentials: "omit",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return { email, token, confirmed, state: null };
    const state = (await response.json()) as EmailPreferenceState;
    return { email, token, confirmed, state: state.ok ? state : null };
  } catch {
    /* Nothing stored yet, or the endpoint is unreachable: the defaults stand. */
    return { email, token, confirmed, state: null };
  }
}

export default function EmailPreferences() {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<EmailPreferences>(DEFAULT_EMAIL_PREFERENCES);
  const [done, setDone] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState<EmailPreferenceAction | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [error, setError] = useState<string | null>(null);
  /* What "Undo" goes back to: the switch states before the last write. */
  const previous = useRef<EmailPreferences>(DEFAULT_EMAIL_PREFERENCES);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flash = useCallback((next: Status) => {
    setStatus(next);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(null), 2600);
  }, []);

  useEffect(
    () => () => {
      if (statusTimer.current) clearTimeout(statusTimer.current);
    },
    [],
  );

  /**
   * Read the link the reader arrived on, then load what is currently stored
   * for that address. Read from `window` rather than `useSearchParams`: the
   * page is statically exported, and the address is never part of the
   * server-rendered markup. State is set only once the link has been
   * resolved, in the promise callback, so hydration renders the same markup
   * the server did.
   */
  useEffect(() => {
    let cancelled = false;
    resolveLink().then((link) => {
      if (cancelled) return;
      setToken(link.token);
      setEmail(link.email);
      if (link.state) {
        setPreferences(link.state.preferences);
        previous.current = link.state.preferences;
        if (link.state.unsubscribedAll) setDone(true);
      }
      if (link.confirmed) {
        setPreferences(ALL_OFF_EMAIL_PREFERENCES);
        setDone(true);
      }
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const write = useCallback(
    async (action: EmailPreferenceAction, next: EmailPreferences): Promise<EmailPreferenceState | null> => {
      if (!email) return null;
      setBusy(action);
      setError(null);
      setStatus(null);
      try {
        const response = await fetch(EMAIL_PREFERENCES_ENDPOINT, {
          method: "POST",
          credentials: "omit",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, token, action, preferences: next }),
        });
        const body = (await response.json().catch(() => null)) as EmailPreferenceState | { error?: string } | null;
        if (!response.ok || !body || !("ok" in body)) {
          setError(
            (body && "error" in body && body.error) ||
              "We could not save that just now. Please try again, or email team@thally.io.",
          );
          return null;
        }
        return body;
      } catch {
        setError("We could not reach Thally. Check your connection and try again, or email team@thally.io.");
        return null;
      } finally {
        setBusy(null);
      }
    },
    [email, token],
  );

  const toggle = (key: EmailCategoryKey) => {
    setStatus(null);
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  };

  const save = async () => {
    const snapshot = preferences;
    const state = await write("save", preferences);
    if (!state) return;
    previous.current = snapshot;
    setPreferences(state.preferences);
    flash("Saved");
  };

  const unsubscribeAll = async () => {
    const snapshot = preferences;
    const state = await write("unsubscribe_all", ALL_OFF_EMAIL_PREFERENCES);
    if (!state) return;
    previous.current = snapshot;
    setPreferences(state.preferences);
    setDone(true);
  };

  const undo = async () => {
    const state = await write("restore", previous.current);
    if (!state) return;
    setPreferences(state.preferences);
    setDone(false);
    flash("Restored");
  };

  /* No address on the link: ask for one, then carry on as if it had been there. */
  const submitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const entered = normalizeEmail(new FormData(event.currentTarget).get("email"));
    if (!entered) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    const url = new URL(window.location.href);
    url.searchParams.set("email", entered);
    window.history.replaceState(null, "", url);
    setEmail(entered);
  };

  const emailField =
    "border-border rounded-none border-0 border-b bg-transparent px-0 pb-2 text-[1rem] outline-none focus:border-(--forest)";

  return (
    <div style={TONES} className="light-island bg-card text-foreground flex min-h-svh flex-1 flex-col antialiased">
      <header className="flex items-center gap-[9px] px-5 py-7 sm:px-10">
        <img src={LOGO_SRC} alt="" aria-hidden className="block size-[26px]" />
        <span className="font-display text-[1.2rem] font-extrabold tracking-[-0.02em]">Thally</span>
      </header>

      <section className="px-5 pt-9 pb-10 sm:px-10">
        <div className="mx-auto w-full max-w-[640px]">
          <h1 className="font-display mb-3 text-[1.7rem] leading-[1.15] font-extrabold tracking-[-0.03em] sm:text-[2.1rem]">
            Email preferences<span className="text-(--forest)">.</span>
          </h1>
          {email ? (
            <p className="text-muted-foreground m-0 text-[1.02rem] leading-[1.55]">
              Choose what Thally sends to <b className="text-foreground font-medium">{email}</b>. Changes apply
              immediately.
            </p>
          ) : (
            <form onSubmit={submitEmail} className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
              <label className="flex flex-1 flex-col gap-2.5">
                <span className="text-muted-foreground text-[0.86rem] font-medium">The address you want to manage</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className={emailField}
                />
              </label>
              <button
                type="submit"
                className="bg-foreground rounded-full border-0 px-[26px] py-[13px] text-[0.95rem] font-semibold text-white hover:bg-(--forest-hover)"
              >
                Continue
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="flex-1 bg-(--parchment) px-5 pt-10 pb-12 sm:px-10">
        <div className="mx-auto w-full max-w-[640px]" aria-busy={!loaded}>
          {done ? (
            <div role="status" aria-live="polite">
              <p className="mb-3.5 text-[1rem] leading-[1.6]">
                You are unsubscribed from all optional email. Account, security and billing notices will still arrive
                because they are required to run your workspace.
              </p>
              <p className="mt-1.5 inline-flex gap-[18px] font-medium">
                <button
                  type="button"
                  onClick={undo}
                  disabled={busy !== null}
                  className="text-foreground cursor-pointer border-0 bg-transparent p-0 font-[inherit] hover:text-(--forest) disabled:cursor-default disabled:opacity-40"
                >
                  {busy === "restore" ? "Restoring" : "Undo"}
                </button>
                <Link href="/" className="text-foreground hover:text-(--forest)">
                  Back to Thally
                </Link>
              </p>
            </div>
          ) : (
            <>
              {EMAIL_CATEGORIES.map((category) => (
                <PreferenceRow
                  key={category.key}
                  title={category.title}
                  description={category.description}
                  tag={"tag" in category ? category.tag : undefined}
                >
                  <Switch
                    checked={preferences[category.key]}
                    label={category.title}
                    disabled={!email || !loaded}
                    onToggle={() => toggle(category.key)}
                  />
                </PreferenceRow>
              ))}
              <PreferenceRow
                title="Account, security and billing"
                description="Sign-in alerts, password resets, invoices and plan changes. Required for every account."
              >
                <Switch checked disabled label="Account, security and billing, always on" />
              </PreferenceRow>

              <div className="mt-9 flex flex-wrap items-center gap-x-[22px] gap-y-3.5">
                <button
                  type="button"
                  onClick={save}
                  disabled={!email || !loaded || busy !== null}
                  className="bg-foreground cursor-pointer rounded-full border-0 px-[26px] py-[13px] text-[0.95rem] font-semibold text-white transition-colors hover:bg-(--forest-hover) disabled:cursor-default disabled:opacity-40"
                >
                  {busy === "save" ? "Saving" : "Save preferences"}
                </button>
                <button
                  type="button"
                  onClick={unsubscribeAll}
                  disabled={!email || !loaded || busy !== null}
                  className="text-muted-foreground hover:text-foreground cursor-pointer border-0 bg-transparent p-0 text-[0.92rem] disabled:cursor-default disabled:opacity-40"
                >
                  {busy === "unsubscribe_all" ? "Unsubscribing" : "Unsubscribe from all"}
                </button>
                {status && (
                  <span
                    role="status"
                    className="ml-auto flex items-center gap-2 text-[0.9rem] text-(--forest) before:size-[7px] before:rounded-full before:bg-(--forest) before:content-['']"
                  >
                    {status}
                  </span>
                )}
              </div>
            </>
          )}

          {error && (
            <p role="alert" className="text-destructive mt-5 text-[0.9rem] leading-[1.55]">
              {error}
            </p>
          )}

          {email && (
            <p
              className={cn(
                "text-muted-foreground text-[0.86rem] leading-[1.6]",
                done ? "mt-9" : "border-border mt-9 border-t pt-[22px]",
              )}
            >
              Not <b className="text-foreground font-medium">{email}</b>? This link was sent to that address, so changes
              here only affect it.{" "}
              <a href={DESTINATIONS.login} className="hover:text-foreground text-(--forest)">
                Sign in
              </a>{" "}
              to manage a different account.
            </p>
          )}
        </div>
      </section>

      <footer className="flex flex-wrap gap-x-5 gap-y-2 px-5 pt-7 pb-9 text-[0.86rem] sm:px-10">
        <a href={DESTINATIONS.docs} className="text-foreground hover:text-(--forest)">
          Docs
        </a>
        <a href={DESTINATIONS.docsChangelog} className="text-foreground hover:text-(--forest)">
          Changelog
        </a>
        <a href={SOCIAL.github} className="text-foreground hover:text-(--forest)">
          GitHub
        </a>
        <Link href="/" className="text-foreground hover:text-(--forest)">
          thally.io
        </Link>
        <span className="text-muted-foreground mt-1.5 w-full font-mono text-[0.72rem]">
          {SITE_NAME} is built and operated by {LEGAL_ENTITY_NAME}. You are seeing this page because you followed a link
          from a Thally email.
        </span>
      </footer>
    </div>
  );
}
