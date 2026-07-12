import { cn } from "@/lib/utils";

export const LOGO_SRC = "/images/logo.svg";
export const LOGO_SRC_DARK = "/images/logo-dark.svg";
export const LOGO_SRC_WHITE = "/images/logo-white.svg";

type MarkProps = {
  className?: string;
  /** Force the white mark on dark backgrounds (e.g. footer CTA, hero poster). */
  inverted?: boolean;
};

export function ThallyMark({ className, inverted }: MarkProps) {
  if (inverted) {
    return <img src={LOGO_SRC_WHITE} alt="" aria-hidden className={cn("size-7 shrink-0 object-contain", className)} />;
  }
  return (
    <>
      <img src={LOGO_SRC} alt="" aria-hidden className={cn("size-7 shrink-0 object-contain dark:hidden", className)} />
      <img
        src={LOGO_SRC_DARK}
        alt=""
        aria-hidden
        className={cn("hidden size-7 shrink-0 object-contain dark:block", className)}
      />
    </>
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
