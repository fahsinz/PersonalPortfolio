import type { ReactNode } from "react";
import type { StatusTone } from "@/lib/data";
import { cn } from "@/lib/utils";

export function StatusDot({ pulse = false, tone = "active", className }: { pulse?: boolean; tone?: StatusTone; className?: string }) {
  const color = tone === "active" ? "bg-emerald-400" : "bg-zinc-400";
  return (
    <span aria-hidden="true" className={cn("relative flex size-2 shrink-0", className)}>
      {pulse && <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", color)} />}
      <span className={cn("relative inline-flex size-2 rounded-full", color)} />
    </span>
  );
}

export function StatusBadge({ label, tone }: { label: string; tone: StatusTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none",
        tone === "active"
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
          : "border-zinc-800 bg-zinc-900 text-zinc-300",
      )}
    >
      <StatusDot tone={tone} pulse={tone === "active"} />
      {label}
    </span>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center rounded border border-zinc-700 bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[11px] leading-none text-zinc-300",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
        <span className="text-emerald-400">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-zinc-700" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">{description}</p>}
    </div>
  );
}
