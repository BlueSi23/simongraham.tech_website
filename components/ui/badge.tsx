import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        variant === "default" &&
          "bg-zinc-900 text-zinc-100 border border-zinc-700",
        variant === "outline" &&
          "border border-zinc-700 text-zinc-300",
        className
      )}
      {...props}
    />
  );
}


