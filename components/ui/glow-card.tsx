"use client";

import type { HTMLAttributes, PointerEvent } from "react";
import { cn } from "@/lib/utils";

type GlowCardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li";
};

/** Card with a cursor-following glow on its fill and border. */
export function GlowCard({ as: Tag = "div", className, children, onPointerMove, ...rest }: GlowCardProps) {
  function handlePointerMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
    onPointerMove?.(e);
  }

  return (
    <Tag {...rest} onPointerMove={handlePointerMove} className={cn("group/glow relative", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgb(52 211 153 / 0.07), transparent 45%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgb(52 211 153 / 0.5), transparent 40%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </Tag>
  );
}
