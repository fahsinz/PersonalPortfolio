"use client";

import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { profile, projects } from "@/lib/data";
import { pad } from "@/lib/utils";

const LAYERS = [
  { name: "analog", detail: "bias · small-signal · SPICE" },
  { name: "rtl", detail: "SystemVerilog · VHDL" },
  { name: "verify", detail: "cocotb · golden models" },
  { name: "firmware", detail: "ESP32 · PWM · H-bridge" },
  { name: "software", detail: "Python · SQL · ROS 2" },
] as const;

const QUICK_COMMANDS = ["whoami", "projects", "stack", "contact", "help"] as const;

const HELP: [string, string][] = [
  ["whoami", "who's behind the prompt"],
  ["projects", "list selected work"],
  ["stack", "tools I reach for"],
  ["contact", "email and socials"],
  ["resume", "open my résumé"],
  ["clear", "clear the screen"],
];

interface Entry {
  id: number;
  command: string;
  output: ReactNode;
}

const Muted = ({ children }: { children: ReactNode }) => <span className="text-zinc-400">{children}</span>;

const linkClass = "text-emerald-300 underline-offset-4 hover:underline";

function KeyValue({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-x-3">
      {rows.map(([key, value]) => (
        <Fragment key={key}>
          <span className="text-zinc-400">{key}</span>
          <span className="min-w-0 break-words">{value}</span>
        </Fragment>
      ))}
    </div>
  );
}

function respond(name: string): ReactNode | "clear" {
  switch (name) {
    case "help":
      return <KeyValue rows={HELP.map(([c, d]) => [c, <Muted key={c}>{d}</Muted>])} />;
    case "whoami":
      return (
        <p>
          {profile.name} <Muted>· EE student @ TMU. RTL, analog, and embedded hardware, plus the tooling that verifies it.</Muted>
        </p>
      );
    case "ls":
    case "projects":
      return (
        <ul>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Muted>{pad(i + 1)}</Muted>{" "}
              <a href={`#project-${p.slug}`} className={linkClass}>
                {p.title}
              </a>{" "}
              <Muted>· {p.domain}</Muted>
            </li>
          ))}
        </ul>
      );
    case "stack":
      return (
        <KeyValue
          rows={[
            ["hdl", "SystemVerilog · VHDL"],
            ["verify", "cocotb · pytest · golden models"],
            ["hardware", "ESP32 · SPICE · oscilloscope"],
            ["software", "Python · C/C++ · SQL · ROS 2"],
          ]}
        />
      );
    case "contact":
      return (
        <KeyValue
          rows={[
            [
              "email",
              <a key="e" href={`mailto:${profile.email}`} className={linkClass}>
                {profile.email}
              </a>,
            ],
            [
              "github",
              <a key="g" href={profile.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {profile.githubLabel}
              </a>,
            ],
            [
              "linkedin",
              <a key="l" href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {profile.linkedinLabel}
              </a>,
            ],
          ]}
        />
      );
    case "resume":
    case "cv":
      window.open(profile.resume, "_blank", "noopener");
      return (
        <p>
          opening résumé… <Muted>blocked?</Muted>{" "}
          <a href={profile.resume} target="_blank" rel="noopener" className={linkClass}>
            resume.pdf
          </a>
        </p>
      );
    case "sudo":
      return (
        <p>
          <span className="text-amber-300">permission denied.</span> <Muted>but</Muted> contact <Muted>works without root.</Muted>
        </p>
      );
    case "clear":
      return "clear";
    default:
      return (
        <p>
          <span className="text-rose-300">command not found:</span> {name} <Muted>· try</Muted> help
        </p>
      );
  }
}

const Prompt = () => (
  <span aria-hidden="true" className="select-none text-emerald-400">
    ❯
  </span>
);

export function HeroTerminal() {
  const [step, setStep] = useState(0);
  const [bootVisible, setBootVisible] = useState(true);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  const booted = step > LAYERS.length;
  const visibleLayers = Math.min(step, LAYERS.length);

  // Boot sequence: one layer per tick, then hand over to the prompt.
  useEffect(() => {
    if (booted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(LAYERS.length + 1);
      return;
    }
    const timer = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 420);
    return () => window.clearTimeout(timer);
  }, [step, booted]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step, entries]);

  function execute(raw: string) {
    const command = raw.trim();
    if (!command) return;
    setHistory((h) => [...h, command]);
    setHistoryIndex(null);

    const output = respond(command.split(/\s+/)[0].toLowerCase());
    if (output === "clear") {
      setEntries([]);
      setBootVisible(false);
      return;
    }
    nextId.current += 1;
    const id = nextId.current;
    setEntries((current) => [...current.slice(-20), { id, command, output }]);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown" && historyIndex !== null) {
      e.preventDefault();
      const i = historyIndex + 1;
      if (i >= history.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(i);
        setValue(history[i]);
      }
    }
  }

  function focusInput() {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-8 rounded-[2rem] bg-emerald-500/[0.06] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/90 shadow-2xl shadow-black/60 ring-1 ring-white/[0.03] backdrop-blur">
        <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/70 px-4 py-2.5">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
            <span className="size-2.5 rounded-full bg-zinc-700" />
          </div>
          <p className="min-w-0 flex-1 truncate text-center font-mono text-xs text-zinc-400">session: fahsin@tmu ~</p>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
            <span aria-hidden="true" className={booted ? "size-1.5 rounded-full bg-emerald-400" : "size-1.5 animate-pulse rounded-full bg-amber-300"} />
            {booted ? "ready" : "booting"}
          </span>
        </div>

        <div
          ref={scrollRef}
          onClick={focusInput}
          className="scrollbar-thin h-[21rem] overflow-y-auto px-4 py-4 font-mono text-[12.5px] leading-6 text-zinc-300 sm:h-[22.5rem] sm:text-[13px]"
        >
          {bootVisible && (
            <>
              <p className="sr-only">Decorative boot sequence. Use the command field below to explore.</p>
              <div aria-hidden="true">
                <p>
                  <Prompt /> <span className="text-zinc-100">boot --profile {profile.handle}</span>
                </p>
                {LAYERS.slice(0, visibleLayers).map((layer, i) => {
                  const ok = booted || i < step - 1;
                  return (
                    <motion.div
                      key={layer.name}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-[4.5rem] shrink-0 text-zinc-100">{layer.name}</span>
                      <span className="min-w-0 truncate text-zinc-400">{layer.detail}</span>
                      <span className="h-0 min-w-4 flex-1 translate-y-1 border-b border-dotted border-zinc-700" />
                      <span className={ok ? "text-emerald-400" : "text-amber-300"}>{ok ? "ok" : "··"}</span>
                    </motion.div>
                  );
                })}
                {booted && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                    <span className="text-emerald-400">→ all systems online</span> <Muted>· type</Muted>{" "}
                    <span className="text-zinc-100">help</span> <Muted>to explore</Muted>
                  </motion.p>
                )}
              </div>
            </>
          )}

          <div role="log" aria-live="polite" aria-label="Terminal output">
            {entries.map((entry) => (
              <div key={entry.id} className="mt-3 first:mt-0">
                <p>
                  <Prompt /> <span className="text-zinc-100">{entry.command}</span>
                </p>
                <div>{entry.output}</div>
              </div>
            ))}
          </div>

          {booted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                execute(value);
                setValue("");
              }}
              className="mt-3 flex items-center gap-2"
            >
              <Prompt />
              <label htmlFor="terminal-input" className="sr-only">
                Terminal command. Type help for a list of commands.
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="send"
                placeholder="help"
                className="min-w-0 flex-1 bg-transparent text-base text-zinc-100 caret-emerald-400 outline-none placeholder:text-zinc-500 sm:text-[13px]"
              />
            </form>
          ) : (
            <span aria-hidden="true" className="mt-1 inline-block h-4 w-2 translate-y-0.5 animate-caret bg-zinc-400" />
          )}
        </div>

        <div className="scrollbar-thin flex items-center gap-2 overflow-x-auto border-t border-zinc-800 px-4 py-2.5 font-mono text-[11px]">
          <span className="shrink-0 text-zinc-400">try</span>
          {QUICK_COMMANDS.map((command) => (
            <button
              key={command}
              type="button"
              disabled={!booted}
              onClick={() => execute(command)}
              className="shrink-0 rounded border border-zinc-800 bg-zinc-900/60 px-2 py-0.5 text-zinc-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-300 disabled:opacity-40"
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
