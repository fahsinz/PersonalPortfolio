import { CircuitBoard, Cpu, Workflow } from "lucide-react";
import { pillars, type PillarIcon } from "@/lib/data";
import { GlowCard } from "./ui/glow-card";
import { Pill, SectionHeading } from "./ui/primitives";
import { Reveal } from "./ui/reveal";

const icons: Record<PillarIcon, typeof Cpu> = {
  cpu: Cpu,
  board: CircuitBoard,
  workflow: Workflow,
};

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-16 border-t border-zinc-800/60 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="capabilities-title"
          index="02"
          eyebrow="What I do"
          title="Three layers, one habit: check the work."
          description="Whether it's a register file, a gain stage, or a scraper, the loop is the same: model what should happen, build it, then measure what actually does."
        />

        <Reveal className="mt-14">
          <ul className="grid overflow-hidden rounded-2xl border border-zinc-800 lg:grid-cols-3">
            {pillars.map((pillar, i) => {
              const Icon = icons[pillar.icon];
              return (
                <GlowCard
                  as="li"
                  key={pillar.n}
                  className={`flex flex-col bg-zinc-900/20 p-7 sm:p-8 ${i > 0 ? "border-t border-zinc-800 lg:border-l lg:border-t-0" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-3xl font-medium tracking-tight text-zinc-600 transition-colors duration-300 group-hover/glow:text-emerald-400">
                      {pillar.n}
                    </span>
                    <span className="grid size-10 place-items-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition-colors group-hover/glow:border-emerald-400/30 group-hover/glow:text-emerald-300">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold tracking-tight text-zinc-50">{pillar.title}</h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-400">{pillar.body}</p>
                  <ul className="mt-6 space-y-2 border-t border-zinc-800/80 pt-5 font-mono text-xs text-zinc-300">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden="true" className="text-emerald-400">
                          ↳
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-6" aria-label={`${pillar.title} tools`}>
                    {pillar.tools.map((tool) => (
                      <li key={tool}>
                        <Pill>{tool}</Pill>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
