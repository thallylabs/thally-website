import { cn } from "@/lib/utils";

export const sectionTitleClassName =
  "font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl";

export const sectionDescriptionClassName = "text-muted-foreground text-lg font-medium text-pretty";

export const sectionEyebrowClassName = "text-muted-foreground text-sm font-medium tracking-wide uppercase";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  layout = "split",
  as: Heading = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  layout?: "split" | "stack";
  as?: "h1" | "h2";
  className?: string;
}) {
  if (layout === "stack") {
    return (
      <div className={cn(align === "center" ? "mx-auto max-w-3xl space-y-4 text-center" : "max-w-2xl", className)}>
        {eyebrow && <p className={cn(sectionEyebrowClassName, align === "center" ? undefined : "mb-3")}>{eyebrow}</p>}
        <Heading className={sectionTitleClassName}>{title}</Heading>
        {description && <p className={cn(sectionDescriptionClassName, "mt-4")}>{description}</p>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3 md:flex-row", className)}>
      <Heading className={cn(sectionTitleClassName, "flex-1")}>{title}</Heading>
      {description && (
        <p className={cn(sectionDescriptionClassName, "flex-1 md:max-w-md md:self-end")}>{description}</p>
      )}
    </div>
  );
}

export function SectionGrid({
  className,
  mask = "radial-gradient(ellipse_at_top,black,transparent_72%)",
}: {
  className?: string;
  mask?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 opacity-40", className)}
      style={{
        backgroundImage:
          "radial-gradient(color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}

export function SectionLines({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0", className)}>
      <div className="container flex items-center">
        <div className="bg-border h-px flex-1" />
        <svg className="text-border mx-3 size-2.5 shrink-0" viewBox="0 0 10 10">
          <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1" />
        </svg>
        <div className="bg-border h-px flex-1" />
      </div>
    </div>
  );
}

export function SectionCornerLines({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="border-border/60 absolute top-8 left-8 size-16 border-t border-l" />
      <div className="border-border/60 absolute top-8 right-8 size-16 border-t border-r" />
      <div className="border-border/40 via-border absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent to-transparent" />
    </div>
  );
}
