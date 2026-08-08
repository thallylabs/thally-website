"use client";

import { ArrowRight, Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { DESTINATIONS, SOCIAL } from "@/lib/site";

const LEAF_PATH =
  "M0.497 -0.464L0.5 -0.442L0.496 -0.417L0.495 -0.392L0.492 -0.367L0.487 -0.341L0.482 -0.316L0.477 -0.291L0.472 -0.265L0.467 -0.24L0.462 -0.214L0.457 -0.189L0.449 -0.164L0.44 -0.138L0.434 -0.113L0.426 -0.087L0.416 -0.062L0.405 -0.036L0.395 -0.011L0.385 0.014L0.372 0.04L0.357 0.065L0.342 0.09L0.327 0.116L0.311 0.141L0.301 0.158L0.289 0.175L0.275 0.192L0.259 0.209L0.242 0.226L0.225 0.243L0.208 0.259L0.191 0.271L0.166 0.286L0.141 0.302L0.115 0.317L0.09 0.33L0.064 0.339L0.039 0.344L0.014 0.349L-0.012 0.352L-0.037 0.352L-0.062 0.352L-0.088 0.352L-0.114 0.349L-0.139 0.344L-0.164 0.339L-0.19 0.334L-0.215 0.326L-0.24 0.316L-0.266 0.306L-0.291 0.292L-0.317 0.284L-0.342 0.291L-0.359 0.305L-0.373 0.322L-0.384 0.339L-0.397 0.365L-0.408 0.39L-0.422 0.415L-0.43 0.441L-0.445 0.461L-0.47 0.47L-0.494 0.46L-0.5 0.439L-0.495 0.414L-0.483 0.388L-0.469 0.363L-0.453 0.337L-0.438 0.312L-0.422 0.286L-0.409 0.27L-0.394 0.253L-0.377 0.236L-0.36 0.22L-0.344 0.206L-0.327 0.194L-0.301 0.178L-0.276 0.163L-0.25 0.15L-0.225 0.142L-0.2 0.136L-0.174 0.131L-0.149 0.126L-0.124 0.122L-0.098 0.121L-0.073 0.117L-0.047 0.11L-0.022 0.101L0.003 0.095L0.029 0.086L0.054 0.073L0.079 0.057L0.096 0.044L0.114 0.03L0.13 0.017L0.147 0.003L0.164 -0.01L0.18 -0.025L0.194 -0.042L0.207 -0.058L0.221 -0.076L0.234 -0.093L0.248 -0.109L0.26 -0.126L0.273 -0.15L0.248 -0.143L0.234 -0.127L0.218 -0.112L0.201 -0.098L0.184 -0.085L0.168 -0.071L0.151 -0.058L0.134 -0.045L0.117 -0.033L0.091 -0.019L0.066 -0.008L0.041 0.006L0.015 0.018L-0.01 0.027L-0.035 0.033L-0.061 0.038L-0.086 0.043L-0.112 0.048L-0.137 0.053L-0.162 0.058L-0.188 0.063L-0.213 0.068L-0.239 0.074L-0.264 0.087L-0.289 0.1L-0.315 0.112L-0.332 0.125L-0.349 0.139L-0.366 0.152L-0.386 0.158L-0.396 0.134L-0.398 0.109L-0.397 0.083L-0.393 0.058L-0.392 0.033L-0.389 0.007L-0.383 -0.018L-0.374 -0.043L-0.367 -0.069L-0.357 -0.094L-0.343 -0.12L-0.332 -0.145L-0.321 -0.162L-0.307 -0.179L-0.291 -0.196L-0.274 -0.212L-0.257 -0.227L-0.24 -0.24L-0.223 -0.251L-0.198 -0.267L-0.173 -0.281L-0.147 -0.293L-0.122 -0.301L-0.096 -0.307L-0.071 -0.316L-0.046 -0.318L-0.02 -0.321L0.005 -0.326L0.03 -0.331L0.056 -0.336L0.081 -0.339L0.107 -0.339L0.132 -0.339L0.157 -0.343L0.183 -0.348L0.208 -0.353L0.233 -0.358L0.259 -0.363L0.284 -0.368L0.31 -0.375L0.335 -0.384L0.36 -0.395L0.386 -0.405L0.411 -0.416L0.436 -0.431L0.453 -0.444L0.47 -0.456L0.487 -0.469Z";

const OLIVE = ["#737938", "#868c46", "#5f6630", "#7c8a3f", "#69712f", "#909a52", "#9aa35a"];
const FOREST = "#4a8a5c";

type Leaf = {
  x: number;
  y: number;
  angle: number;
  color: number;
  phase: number;
  delay: number;
  flap: boolean;
  startX: number;
  startY: number;
  rotation: number;
};

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function EnvelopeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    const leafPath = new Path2D(LEAF_PATH);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let leafSize = 12;
    let leaves: Leaf[] = [];
    let startedAt = performance.now() / 1000;
    let animationFrame = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let visible = true;
    let destroyed = false;

    const build = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const random = mulberry32(7924);

      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const envelopeWidth = Math.min(width * 0.6, height * 0.78 * 1.5);
      const envelopeHeight = envelopeWidth * 0.62;
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const left = centerX - envelopeWidth / 2;
      const right = centerX + envelopeWidth / 2;
      const top = centerY - envelopeHeight / 2;
      const bottom = centerY + envelopeHeight / 2;
      const flapY = centerY + envelopeHeight * 0.1;
      const segments = [
        [
          { x: left, y: top },
          { x: right, y: top },
        ],
        [
          { x: right, y: top },
          { x: right, y: bottom },
        ],
        [
          { x: right, y: bottom },
          { x: left, y: bottom },
        ],
        [
          { x: left, y: bottom },
          { x: left, y: top },
        ],
        [
          { x: left, y: top },
          { x: centerX, y: flapY },
        ],
        [
          { x: centerX, y: flapY },
          { x: right, y: top },
        ],
      ];

      leafSize = Math.min(26, Math.max(11, envelopeWidth / 15));
      const spacing = leafSize * 1.06;
      leaves = [];

      segments.forEach(([start, end], segmentIndex) => {
        const distance = Math.hypot(end.x - start.x, end.y - start.y);
        const count = Math.max(2, Math.round(distance / spacing));

        for (let index = 0; index < count; index += 1) {
          const progress = (index + 0.5) / count;
          leaves.push({
            x: start.x + (end.x - start.x) * progress,
            y: start.y + (end.y - start.y) * progress,
            angle: Math.atan2(end.y - start.y, end.x - start.x),
            color: Math.floor(random() * OLIVE.length),
            phase: random() * Math.PI * 2,
            delay: random() * 1.7,
            flap: segmentIndex >= 4,
            startX: centerX + (random() - 0.5) * width * 1.15,
            startY: centerY + (random() - 0.5) * height * 1.25,
            rotation: (random() - 0.5) * 7,
          });
        }
      });

      startedAt = performance.now() / 1000;
    };

    const drawLeaf = (leaf: Leaf, time: number, elapsed: number, isDark: boolean) => {
      const progress = Math.min(1, Math.max(0, (elapsed - 0.25 - leaf.delay) / 1.7));
      const eased = 1 - Math.pow(1 - progress, 3);
      const x = leaf.startX + (leaf.x - leaf.startX) * eased;
      const y = leaf.startY + (leaf.y - leaf.startY) * eased;
      const sway = reducedMotion ? 0 : Math.sin(time * 1.1 + leaf.phase) * 0.07;
      const size = leafSize * (0.55 + 0.45 * eased);
      const opacity = 0.25 + 0.75 * eased;

      context.save();
      context.translate(x, y);
      context.rotate(leaf.rotation * (1 - eased) + leaf.angle + sway);
      context.scale(size, size);
      context.globalAlpha = opacity * 0.14;
      context.fillStyle = isDark ? "#05070a" : "#2f3120";
      context.save();
      context.translate(0.05, 0.07);
      context.fill(leafPath);
      context.restore();
      context.globalAlpha = opacity;
      context.fillStyle = leaf.flap ? FOREST : OLIVE[leaf.color];
      context.fill(leafPath);
      context.restore();
    };

    const draw = (now: number) => {
      const time = now / 1000;
      const elapsed = reducedMotion ? 999 : time - startedAt;
      const isDark = document.documentElement.classList.contains("dark");

      context.clearRect(0, 0, width, height);
      leaves.forEach((leaf) => drawLeaf(leaf, time, elapsed, isDark));
      context.globalAlpha = 1;
    };

    const frame = (now: number) => {
      if (destroyed) return;
      if (visible) draw(now);
      if (!reducedMotion) animationFrame = requestAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        if (reducedMotion) draw(performance.now());
      }, 120);
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    const themeObserver = new MutationObserver(() => {
      if (reducedMotion) draw(performance.now());
    });

    build();
    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (reducedMotion) {
      draw(performance.now());
    } else {
      animationFrame = requestAnimationFrame(frame);
    }

    return () => {
      destroyed = true;
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" data-scene="envelope" />;
}

const fieldClassName =
  "w-full rounded-none border-0 border-b border-canvas-card-stroke bg-transparent px-0 pt-0 pb-4 text-[1.02rem] tracking-[-0.01em] text-white shadow-none outline-none transition-colors placeholder:text-canvas-muted focus:border-b-white focus-visible:outline-none";

const labelClassName = "mb-3 block font-mono text-[0.68rem] tracking-[0.18em] text-canvas-muted uppercase";

export default function Contact() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="bg-canvas">
      <header className="px-6 pt-20 pb-14 text-center sm:pb-16 md:pt-28">
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
          <p className="text-canvas-muted mx-auto mt-6 max-w-[54ch] text-lg leading-8 text-pretty sm:text-xl">
            Tell us what you&apos;re building: migrating docs, planning to self-host, evaluating Enterprise SSO, or
            something else entirely. We usually reply within one business day.
          </p>
        </Reveal>
      </header>

      <section aria-label="Contact the Thally team" className="px-6 pt-0 pb-20 sm:pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[1160px] gap-10 min-[901px]:grid-cols-[1.5fr_1fr] min-[901px]:gap-14">
          <Reveal className="border-canvas-card-stroke min-h-[29rem] rounded-[15px] border bg-white/10 px-7 py-9 backdrop-blur-xl min-[901px]:px-14 min-[901px]:pt-[3.25rem] min-[901px]:pb-12 sm:p-12">
            {isSent ? (
              <div
                className="flex min-h-[23rem] flex-col items-center justify-center text-center"
                aria-live="polite"
                role="status"
              >
                <span className="bg-canvas-accent/15 text-canvas-accent flex size-11 items-center justify-center rounded-full">
                  <Check className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-canvas-foreground mt-[1.125rem] text-xl font-semibold">Message sent.</h2>
                <p className="text-canvas-muted mt-2 max-w-sm text-[0.94rem] leading-relaxed">
                  Thanks, we&apos;ll get back to you within one business day.
                  <br />A copy went to your email.
                </p>
              </div>
            ) : (
              <form className="grid gap-[2.125rem]" onSubmit={handleSubmit}>
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
                      <option>Sales</option>
                      <option>Support</option>
                      <option>Migration help</option>
                      <option>Enterprise &amp; SSO</option>
                      <option>Something else</option>
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="text-canvas-muted pointer-events-none absolute top-1 right-0 size-[0.9375rem]"
                    />
                  </div>
                </div>

                <div className="grid gap-[2.125rem] sm:grid-cols-2 sm:gap-10">
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
                    className={`${fieldClassName} min-h-24 resize-y leading-relaxed`}
                    required
                  />
                </div>

                <div className="flex flex-col items-start gap-4 pt-0.5 sm:flex-row sm:items-center">
                  <p className="text-canvas-muted-2 text-sm">Goes straight to the people building Thally.</p>
                  <button
                    type="submit"
                    className="text-canvas inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium transition-colors hover:bg-white/90 sm:ml-auto sm:w-auto"
                  >
                    Send message
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </div>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.35} className="flex">
            <aside className="flex w-full flex-col gap-10 min-[901px]:pt-2">
              <div>
                <p className={labelClassName}>Email us directly</p>
                <Link
                  href={DESTINATIONS.email}
                  className="font-display text-canvas-muted w-fit text-xl font-medium tracking-[-0.025em] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  team@thally.io
                </Link>
                <p className="text-canvas-muted-2 mt-2 text-sm leading-relaxed">Same people, same reply time.</p>
              </div>

              <div>
                <p className={labelClassName}>Found a bug?</p>
                <Link
                  href={`${SOCIAL.github}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-canvas-muted flex min-h-11 w-fit items-center gap-2 text-[0.94rem] font-semibold transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Open an issue on GitHub
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
                <p className="text-canvas-muted-2 mt-2 text-sm leading-relaxed">
                  Issues and feature requests live in the open.
                </p>
              </div>

              <div
                className="border-canvas-hairline relative min-h-[10.625rem] flex-1 overflow-hidden rounded-[15px] border"
                aria-label="Animated envelope illustration"
              >
                <EnvelopeScene />
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
