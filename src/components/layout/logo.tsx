import { cn } from "@/lib/utils";

export const LOGO_SRC = "/images/logo.svg";

type MarkProps = {
  className?: string;
  /** Force a light mark on dark backgrounds (e.g. footer CTA, hero poster). */
  inverted?: boolean;
};

export function ThallyMark({ className, inverted }: MarkProps) {
  return (
    <img
      src={LOGO_SRC}
      alt=""
      aria-hidden
      className={cn(
        "size-7 shrink-0 object-contain",
        inverted ? "brightness-0 invert" : "dark:brightness-0 dark:invert",
        className,
      )}
    />
  );
}

export function Logo({
  className,
  markClassName,
  inverted,
  hideWordmark,
}: MarkProps & { className?: string; markClassName?: string; hideWordmark?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <ThallyMark inverted={inverted} className={markClassName} />
      {!hideWordmark && <span className="font-display text-xl font-semibold tracking-tight">Thally</span>}
    </span>
  );
}
