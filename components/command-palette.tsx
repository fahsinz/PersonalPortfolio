"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, CornerDownLeft, Download, FileText, FolderGit2, Hash, Mail, Search } from "lucide-react";
import { navLinks, profile, projects } from "@/lib/data";
import { cn, downloadResume, pad, scrollToId } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Kbd } from "./ui/primitives";

type Group = "Navigate" | "Projects" | "Actions" | "Elsewhere";

interface Command {
  id: string;
  group: Group;
  label: string;
  hint?: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void;
}

interface PaletteContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  copyEmail: () => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  return ctx;
}

const iconClass = "size-4";

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    returnFocus.current?.focus({ preventScroll: true });
  }, []);

  const notify = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify("Email copied to clipboard");
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, [notify]);

  // Global Ctrl/Cmd + K toggle.
  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) close();
        else open();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, open, close]);

  // Lock page scroll while the dialog is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "nav-top",
        group: "Navigate",
        label: "Back to top",
        keywords: "home hero start",
        icon: <ArrowUp className={iconClass} />,
        run: () => scrollToId("top"),
      },
      ...navLinks.map<Command>((link) => ({
        id: `nav-${link.id}`,
        group: "Navigate",
        label: `Go to ${link.label}`,
        hint: link.n,
        keywords: link.id,
        icon: <Hash className={iconClass} />,
        run: () => scrollToId(link.id),
      })),
      {
        id: "nav-contact",
        group: "Navigate",
        label: "Go to Contact",
        hint: "05",
        keywords: "contact footer hire",
        icon: <Hash className={iconClass} />,
        run: () => scrollToId("contact"),
      },
      ...projects.map<Command>((project, i) => ({
        id: `project-${project.slug}`,
        group: "Projects",
        label: project.title,
        hint: pad(i + 1),
        keywords: `${project.domain} ${project.stack.join(" ")} ${project.hook}`,
        icon: <FolderGit2 className={iconClass} />,
        run: () => scrollToId(`project-${project.slug}`, { flash: true }),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        keywords: "clipboard contact mail",
        icon: <Copy className={iconClass} />,
        run: copyEmail,
      },
      {
        id: "download-resume",
        group: "Actions",
        label: "Download résumé",
        hint: "PDF",
        keywords: "resume cv download pdf",
        icon: <Download className={iconClass} />,
        run: () => downloadResume(profile.resume, profile.resumeFileName),
      },
      {
        id: "open-resume",
        group: "Actions",
        label: "Open résumé in new tab",
        keywords: "resume cv view pdf",
        icon: <FileText className={iconClass} />,
        run: () => window.open(profile.resume, "_blank", "noopener"),
      },
      {
        id: "send-email",
        group: "Actions",
        label: "Send an email",
        keywords: "contact mailto hire",
        icon: <Mail className={iconClass} />,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "github",
        group: "Elsewhere",
        label: "GitHub",
        hint: profile.githubLabel,
        keywords: "code repositories source",
        icon: <GithubIcon className={iconClass} />,
        run: () => window.open(profile.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        group: "Elsewhere",
        label: "LinkedIn",
        hint: profile.linkedinLabel,
        keywords: "profile social",
        icon: <LinkedinIcon className={iconClass} />,
        run: () => window.open(profile.linkedin, "_blank", "noopener"),
      },
    ],
    [copyEmail],
  );

  const value = useMemo(() => ({ isOpen, open, close, copyEmail }), [isOpen, open, close, copyEmail]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <PaletteDialog commands={commands} onClose={close} />}</AnimatePresence>
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/95 px-4 py-2 font-mono text-xs text-zinc-200 shadow-xl shadow-black/40 backdrop-blur"
            >
              <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </PaletteContext.Provider>
  );
}

function PaletteDialog({ commands, onClose }: { commands: Command[]; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return commands;
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.group} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase();
      return tokens.every((t) => haystack.includes(t));
    });
  }, [commands, query]);

  const optionId = (i: number) => `${listId}-option-${i}`;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function select(command: Command) {
    onClose();
    // Run after the close commits. setTimeout (not rAF) so it still fires if the tab isn't painting.
    window.setTimeout(command.run, 0);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const count = results.length;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (count) setActive((i) => (i + 1) % count);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (count) setActive((i) => (i - 1 + count) % count);
        break;
      case "Enter": {
        e.preventDefault();
        const command = results[active];
        if (command) select(command);
        break;
      }
      case "Escape":
        e.preventDefault();
        onClose();
        break;
      case "Tab":
        // The input is the only focus target; keep focus inside the dialog.
        e.preventDefault();
        break;
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, scale: 0.97, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -4 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="relative w-full max-w-xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/95 shadow-2xl shadow-black/70 ring-1 ring-white/[0.03]"
      >
        <div className="flex items-center gap-3 border-b border-zinc-800 px-4">
          <Search className="size-4 shrink-0 text-zinc-400" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? optionId(active) : undefined}
            aria-label="Search commands"
            placeholder="Jump to a section, project, or action…"
            autoComplete="off"
            spellCheck={false}
            className="h-12 min-w-0 flex-1 bg-transparent text-[15px] text-zinc-100 outline-none placeholder:text-zinc-500 sm:text-sm"
          />
          <Kbd>esc</Kbd>
        </div>

        <ul id={listId} role="listbox" aria-label="Commands" className="scrollbar-thin max-h-[min(60vh,26rem)] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-10 text-center text-sm text-zinc-400">
              No results for <span className="text-zinc-200">&ldquo;{query}&rdquo;</span>
            </li>
          )}
          {results.map((command, i) => {
            const showGroup = i === 0 || results[i - 1].group !== command.group;
            const selected = i === active;
            return (
              <li key={command.id} role="presentation">
                {showGroup && (
                  <p role="presentation" className="px-3 pb-1.5 pt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                    {command.group}
                  </p>
                )}
                <div
                  id={optionId(i)}
                  role="option"
                  aria-selected={selected}
                  onMouseMove={() => setActive(i)}
                  onClick={() => select(command)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    selected ? "bg-zinc-800/70 text-zinc-50" : "text-zinc-300",
                  )}
                >
                  <span className={cn("shrink-0", selected ? "text-emerald-400" : "text-zinc-400")}>{command.icon}</span>
                  <span className="min-w-0 flex-1 truncate">{command.label}</span>
                  {command.hint && <span className="hidden truncate font-mono text-xs text-zinc-400 sm:inline">{command.hint}</span>}
                  {selected && <CornerDownLeft className="size-3.5 shrink-0 text-zinc-400" aria-hidden="true" />}
                  {command.group === "Elsewhere" && !selected && (
                    <ArrowUpRight className="size-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 border-t border-zinc-800 px-4 py-2.5 font-mono text-[11px] text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>↵</Kbd> select
          </span>
          <span className="ml-auto hidden sm:inline">{profile.handle}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
