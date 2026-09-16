import { Mail, MapPin } from "lucide-react";
import { profile } from "@/lib/data";
import { CopyEmailButton, LocalTime, PaletteHint } from "./footer-actions";
import { GithubIcon, LinkedinIcon } from "./icons";
import { GlowCard } from "./ui/glow-card";
import { StatusDot } from "./ui/primitives";

const socials = [
  { label: "GitHub", href: profile.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.linkedin, icon: LinkedinIcon },
];

export function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="scroll-mt-16 border-t border-zinc-800/60">
      <div className="shell py-20 sm:py-28">
        <GlowCard className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/30 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,black,transparent)]"
          />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
              <span className="text-emerald-400">05</span> · Contact
            </p>
            <h2 id="contact-title" className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              Have something worth building?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-zinc-400">
              RTL that needs verifying, a board that needs bringing up, or a pipeline that needs to stop falling over. I&apos;d
              like to hear about it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-zinc-100 px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
              >
                <Mail className="size-4" aria-hidden="true" />
                Get in touch
              </a>
              <CopyEmailButton />
            </div>
          </div>
        </GlowCard>

        <div className="mt-16 flex flex-col gap-6 border-t border-zinc-800/80 pt-8 font-mono text-xs text-zinc-400 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden="true" />
              {profile.location}
            </li>
            <li>
              <LocalTime />
            </li>
            <li className="inline-flex items-center gap-2">
              <StatusDot pulse />
              {profile.status}
            </li>
          </ul>
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-9 place-items-center rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50"
                >
                  <Icon className="size-4" />
                  <span className="sr-only">{label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="grid size-9 place-items-center rounded-md border border-zinc-800 bg-zinc-900/50 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50"
              >
                <Mail className="size-4" aria-hidden="true" />
                <span className="sr-only">Email</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-2 font-mono text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · Designed &amp; built from scratch
          </p>
          <PaletteHint />
        </div>
      </div>
    </footer>
  );
}
