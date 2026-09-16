import { ArrowUpRight } from "lucide-react";
import { moreProjects, projects, type Project } from "@/lib/data";
import { pad } from "@/lib/utils";
import { ProjectPreview } from "./project-preview";
import { GlowCard } from "./ui/glow-card";
import { Pill, SectionHeading, StatusBadge } from "./ui/primitives";
import { Reveal } from "./ui/reveal";

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 border-t border-zinc-800/60 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="work-title"
          index="01"
          eyebrow="Selected work"
          title="Built to spec. Checked before it ships."
          description="RTL, analog, embedded, and data projects, each measured against a spec sheet, a reference model, or a real workload instead of just a demo."
        />

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.06} className="h-full">
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="flex items-baseline justify-between gap-4 border-b border-zinc-800 pb-4">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-100">Also built</h3>
            <p className="font-mono text-xs text-zinc-400">coursework · labs · design portfolios</p>
          </div>
          <ul className="divide-y divide-zinc-800/80">
            {moreProjects.map((item, i) => (
              <li
                key={item.title}
                className="group -mx-3 grid gap-x-6 gap-y-1.5 rounded-lg px-3 py-5 transition-colors hover:bg-zinc-900/40 sm:grid-cols-[2.5rem_1fr_auto]"
              >
                <span className="pt-0.5 font-mono text-xs text-zinc-500 transition-colors group-hover:text-emerald-400">
                  {pad(projects.length + i + 1)}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-zinc-100">{item.title}</p>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-zinc-400">{item.note}</p>
                </div>
                <div className="font-mono text-xs text-zinc-400 sm:text-right">
                  <p>{item.when}</p>
                  <p className="mt-1 text-zinc-300">{item.stack}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <GlowCard
      as="article"
      id={`project-${project.slug}`}
      aria-labelledby={`project-${project.slug}-title`}
      className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20 transition-colors duration-300 hover:border-zinc-700"
    >
      <div className="relative h-56 overflow-hidden border-b border-zinc-800 bg-zinc-950">
        <ProjectPreview kind={project.preview} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-xs text-zinc-400">
              <span className="text-emerald-400">{pad(index + 1)}</span> · {project.domain} · {project.year}
            </p>
            <h3 id={`project-${project.slug}-title`} className="mt-2 text-xl font-semibold tracking-tight text-zinc-50">
              {project.title}
            </h3>
          </div>
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex shrink-0 items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
            >
              {project.link.label}
              <ArrowUpRight className="size-3" aria-hidden="true" />
              <span className="sr-only">(GitHub, opens in a new tab)</span>
            </a>
          )}
        </div>

        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-zinc-300">{project.hook}</p>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-400">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5">
              <span aria-hidden="true" className="select-none font-mono text-zinc-600">
                ›
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Pill>{tech}</Pill>
              </li>
            ))}
          </ul>
          <StatusBadge {...project.status} />
        </div>
      </div>
    </GlowCard>
  );
}
