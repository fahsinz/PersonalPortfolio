"use client";

import { useEffect, useState } from "react";
import { Clock, Copy } from "lucide-react";
import { profile } from "@/lib/data";
import { useCommandPalette } from "./command-palette";
import { Kbd } from "./ui/primitives";

export function CopyEmailButton() {
  const { copyEmail } = useCommandPalette();
  return (
    <button
      type="button"
      onClick={copyEmail}
      className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 font-mono text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-100"
    >
      {profile.email}
      <Copy className="size-3.5 text-zinc-400" aria-hidden="true" />
      <span className="sr-only">Copy email address</span>
    </button>
  );
}

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Toronto",
      timeZoneName: "short",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5">
      <Clock className="size-3.5" aria-hidden="true" />
      <span className="tabular-nums">{time ?? "--:--"}</span> in Toronto
    </span>
  );
}

export function PaletteHint() {
  const { open } = useCommandPalette();
  const [modKey, setModKey] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/i.test(navigator.userAgent)) setModKey("⌘");
  }, []);

  return (
    <button type="button" onClick={open} className="inline-flex items-center gap-2 self-start transition-colors hover:text-zinc-200">
      Press <Kbd>{modKey} K</Kbd> to navigate anywhere
    </button>
  );
}
