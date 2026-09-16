"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useCommandPalette } from "./command-palette";
import { Kbd } from "./ui/primitives";

const sectionIds = ["top", ...navLinks.map((l) => l.id), "contact"];

export function SiteHeader() {
  const { open } = useCommandPalette();
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modKey, setModKey] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/i.test(navigator.userAgent)) setModKey("⌘");
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen ? "border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md" : "border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="rounded-sm font-mono text-sm tracking-tight text-zinc-100 transition-colors hover:text-white">
          <span className="text-emerald-400">~/</span>
          {profile.handle}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "group flex items-baseline gap-1.5 rounded-md px-3 py-2 text-sm transition-colors",
                      isActive ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-100",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px] transition-colors",
                        isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-400",
                      )}
                    >
                      {link.n}
                    </span>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            aria-label="Open command palette"
            aria-keyshortcuts="Control+K Meta+K"
            className="hidden h-9 items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 pl-3 pr-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200 sm:flex"
          >
            <Search className="size-3.5" aria-hidden="true" />
            <span>Search</span>
            <Kbd>{modKey} K</Kbd>
          </button>
          <button
            type="button"
            onClick={open}
            aria-label="Open command palette"
            className="grid size-9 place-items-center rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-300 sm:hidden"
          >
            <Search className="size-4" aria-hidden="true" />
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="hidden h-9 items-center gap-1.5 rounded-md bg-zinc-100 px-3.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white sm:inline-flex"
          >
            Résumé
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-300 md:hidden"
          >
            {menuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden border-t border-zinc-800/80 md:hidden"
          >
            <ul className="shell py-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 rounded-md py-3 text-lg text-zinc-200"
                  >
                    <span className="font-mono text-xs text-emerald-400">{link.n}</span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-zinc-800/80 pt-4">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-10 items-center gap-1.5 rounded-md bg-zinc-100 px-4 text-sm font-medium text-zinc-950"
                >
                  Résumé
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
