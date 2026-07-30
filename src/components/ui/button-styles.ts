export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "dangerGhost" | "dashed";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-md font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white hover:opacity-90",
  secondary: "bg-white text-navy border border-card-border hover:bg-card",
  danger: "bg-white text-red-600 border border-red-300 hover:bg-red-50",
  ghost: "bg-card text-navy border border-card-border hover:border-navy/30",
  dangerGhost: "bg-white text-red-600 border border-red-200 hover:bg-red-50",
  dashed:
    "border border-dashed border-card-border text-navy hover:bg-card hover:border-navy/40 font-medium",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = ""
): string {
  return `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`.trim();
}
