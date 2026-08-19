"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

/** Same cloud origin the Track demo posts to. */
const CLOUD_API = (process.env.NEXT_PUBLIC_THALLY_CLOUD_API_URL || "https://app.thally.io").replace(/\/$/, "");

import { ArrowRight, Check } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS, SOCIAL } from "@/lib/site";

/* Underline fields: the box around an input is chrome the label already provides. */
const fieldClassName =
  "w-full rounded-none border-0 border-b border-white/12 bg-transparent px-0 pt-0 pb-3.5 text-[15px] " +
  "tracking-[-0.01em] text-white shadow-none outline-none transition-colors " +
  "placeholder:text-white/25 focus:border-b-white/60 focus-visible:outline-none";

const labelClassName = "mb-2.5 block text-[13px] font-medium text-white/45";

const TOPICS = ["Sales", "Support", "Migration help", "Enterprise & SSO", "Something else"];

/** A quiet row in the side rail: label, link, one line of context. */
function RailItem({
  label,
  href,
  external,
  action,
  note,
}: {
  label: string;
  href: string;
  external?: boolean;
  action: string;
  note: string;
}) {
  return (
    <div className="border-t border-white/[0.09] pt-6">
      <p className={labelClassName}>{label}</p>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group/rail inline-flex items-center gap-2 text-[17px] font-medium tracking-[-0.01em] text-white/85 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        {action}
        {external && (
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover/rail:translate-x-0.5"
          />
        )}
      </Link>
      <p className="mt-2 text-[13px] leading-relaxed text-white/40">{note}</p>
    </div>
  );
}

type SubmitState = "idle" | "submitting" | "sent";

export default function Contact() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);

  /**
   * A failed submit keeps the form and everything typed into it. The whole
   * point of this handler is that a message is never silently lost, so it
   * only shows the confirmation once the server has stored one.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setState("submitting");
    setError(null);

    try {
      const response = await fetch(`${CLOUD_API}/api/contact`, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Minted per attempt, so a retried request is stored once.
          idempotencyKey: crypto.randomUUID(),
          topic: data.get("topic"),
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error || "We could not send that just now. Please try again, or email team@thally.io.");
        setState("idle");
        return;
      }

      setState("sent");
    } catch {
      setError("We could not reach Thally. Check your connection and try again, or email team@thally.io.");
      setState("idle");
    }
  };

  return (
    <div className="bg-canvas">
      <header className="px-6 pt-24 pb-16 text-center md:pt-32">
        <SplitReveal
          as="h1"
          mode="words"
          onMount
          stagger={0.4}
          className="heading-hero text-canvas-foreground mx-auto max-w-[15ch]"
        >
          Talk to the Thally team.
        </SplitReveal>
        <Reveal delay={0.4} distance={24}>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-pretty text-white/50">
            Tell us what you&apos;re building: migrating docs, planning to self-host, evaluating Enterprise SSO, or
            something else entirely. We usually reply within one business day.
          </p>
        </Reveal>
      </header>

      <section aria-label="Contact the Thally team" className="px-5 pb-24 sm:px-6 lg:pb-32">
        <div className="mx-auto grid max-w-[1080px] items-start gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Same surface as the nav menu and the feature-page cards. */}
          <Reveal className="rounded-[20px] border border-white/[0.09] bg-[#0a0c10]/85 p-8 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-12">
            {state === "sent" ? (
              <div
                className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                aria-live="polite"
                role="status"
              >
                <span className="bg-canvas-accent/15 text-canvas-accent flex size-11 items-center justify-center rounded-full">
                  <Check className="size-5" aria-hidden />
                </span>
                <h2 className="mt-5 text-xl font-medium tracking-[-0.01em] text-white">Message sent.</h2>
                <p className="mt-2.5 max-w-sm text-[15px] leading-relaxed text-white/45">
                  Thanks. We&apos;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form className="grid gap-9" onSubmit={handleSubmit} noValidate={false}>
                {/* Honeypot: hidden from people and from assistive tech, so
                    anything in it came from a bot filling every input. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] size-px opacity-0"
                />
                <div>
                  <label className={labelClassName} htmlFor="contact-topic">
                    What&apos;s this about?
                  </label>
                  <div className="relative max-w-[17.5rem]">
                    <select
                      id="contact-topic"
                      name="topic"
                      className={`${fieldClassName} [&>option]:bg-canvas cursor-pointer appearance-none pr-7 [&>option]:text-white`}
                      defaultValue="Sales"
                    >
                      {TOPICS.map((topic) => (
                        <option key={topic}>{topic}</option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1 right-0 size-4 text-white/35"
                    />
                  </div>
                </div>

                <div className="grid gap-9 sm:grid-cols-2 sm:gap-10">
                  <div>
                    <label className={labelClassName} htmlFor="contact-name">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jahce"
                      className={fieldClassName}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClassName} htmlFor="contact-email">
                      Work email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jahce@company.com"
                      className={fieldClassName}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClassName} htmlFor="contact-message">
                    What are you building?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="We're migrating around 200 pages from GitBook and want previews on every PR..."
                    className={`${fieldClassName} min-h-28 resize-y leading-relaxed`}
                    required
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-[#c4788a]/30 bg-[#c4788a]/10 px-4 py-3 text-[14px] leading-relaxed text-[#e6aab4]"
                  >
                    {error}
                  </p>
                )}

                <div className="flex flex-col items-start gap-4 border-t border-white/[0.09] pt-7 sm:flex-row sm:items-center">
                  <p className="text-[13px] text-white/40">Goes straight to the people building Thally.</p>
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="text-canvas inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-7 py-3 text-[15px] font-medium transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:bg-white/60 sm:ml-auto sm:w-auto"
                  >
                    {state === "submitting" ? "Sending" : "Send message"}
                    {state === "submitting" ? null : <ArrowRight aria-hidden className="size-4" />}
                  </button>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.35}>
            <aside className="flex flex-col gap-6 lg:pt-4">
              <RailItem
                label="Prefer email?"
                href={DESTINATIONS.email}
                action="team@thally.io"
                note="Same people, same reply time."
              />
              <RailItem
                label="Found a bug?"
                href={`${SOCIAL.github}/issues`}
                external
                action="Open an issue"
                note="Issues and feature requests live in the open."
              />
              <RailItem
                label="Just exploring?"
                href={DESTINATIONS.docsQuickstart}
                external
                action="Read the quickstart"
                note="Publish a docs site before you talk to anyone."
              />
            </aside>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
