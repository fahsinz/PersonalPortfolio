import { ArrowDown, ArrowUpRight, Cpu, GraduationCap, MapPin } from "lucide-react";
import type { CSSProperties } from "react";
import { education, profile } from "@/lib/data";
import { HeroTerminal } from "./hero-terminal";
import { StatusDot } from "./ui/primitives";

// Entrance animation is pure CSS so the hero is visible before hydration.
const rise = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-14rem] h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-emerald-500/[0.08] blur-3xl"
      />

      <div className="shell relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        <div className="min-w-0">
          <p
            className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 py-1 pl-2.5 pr-3 font-mono text-xs text-zinc-300"
            style={rise(0)}
          >
            <StatusDot pulse />
            {profile.status}
          </p>

          <h1
            id="hero-title"
            className="mt-6 animate-rise text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl lg:text-[3.25rem] xl:text-6xl"
            style={rise(80)}
          >
            I build hardware,
            <br />
            <span className="text-zinc-500">then prove it works.</span>
          </h1>

          <p className="mt-6 max-w-xl animate-rise text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg" style={rise(160)}>
            Electrical Engineering student at Toronto Metropolitan University. I design RTL, analog circuits, and embedded
            firmware, then write the reference models, testbenches, and bench measurements that show they meet spec. From
            transistor bias points to <span className="text-zinc-200">12,000-vector regressions</span>.
          </p>

          <div className="mt-8 flex animate-rise flex-wrap items-center gap-3" style={rise(240)}>
            <a
              href="#work"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-zinc-100 px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-white"
            >
              See the work
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="group inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
            >
              Résumé
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <ul className="mt-10 flex animate-rise flex-wrap gap-x-6 gap-y-2.5 font-mono text-xs text-zinc-400" style={rise(320)}>
            <li className="flex items-center gap-2">
              <GraduationCap className="size-3.5 text-zinc-500" aria-hidden="true" />
              B.Eng EE · TMU &apos;29
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-3.5 text-zinc-500" aria-hidden="true" />
              {education.location}
            </li>
            <li className="flex items-center gap-2">
              <Cpu className="size-3.5 text-zinc-500" aria-hidden="true" />
              SystemVerilog · cocotb · ESP32 · SPICE
            </li>
          </ul>
        </div>

        <div className="min-w-0 animate-rise" style={rise(300)}>
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
