import { currently, education, leadership, work, type Role } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Pill, SectionHeading, StatusDot } from "./ui/primitives";
import { Reveal } from "./ui/reveal";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 border-t border-zinc-800/60 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          id="experience-title"
          index="03"
          eyebrow="Experience"
          title="Where the hours went."
          description="An internship shipping a production data pipeline, two years of teaching and outreach, and a rover team, alongside a full engineering course load."
        />

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 via-zinc-950 to-zinc-950 p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-emerald-400/0 via-emerald-400/70 to-emerald-400/0"
            />
            <div className="grid gap-8">
              <div>
                <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-emerald-400">
                  <StatusDot pulse />
                  Currently
                </p>
                <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-zinc-50">
                  {education.degree} <span className="text-zinc-400">@ {education.school}</span>
                </h3>
                <p className="mt-2 font-mono text-xs text-zinc-400">
                  {education.period} · {education.program} · {education.location}
                </p>
                <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-zinc-300">{currently.summary}</p>
              </div>
              <dl className="grid gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
                {currently.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse bg-zinc-950 px-5 py-4">
                    <dt className="mt-1.5 text-xs leading-snug text-zinc-400">{stat.label}</dt>
                    <dd className="whitespace-nowrap font-mono text-2xl tracking-tight text-zinc-50">
                      {stat.value}
                      {stat.unit && <span className="ml-1 text-sm text-zinc-500">{stat.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Reveal>
            <Timeline title="Work" items={work} />
          </Reveal>
          <Reveal delay={0.08}>
            <Timeline title="Leadership & teams" items={leadership} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Timeline({ title, items }: { title: string; items: Role[] }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">{title}</h3>
      <ol className="relative mt-6 border-l border-zinc-800">
        {items.map((role) => (
          <li key={`${role.org}-${role.title}`} className="relative pb-10 pl-6 last:pb-0">
            <span
              aria-hidden="true"
              className={cn(
                "absolute -left-[5px] top-1.5 size-[9px] rounded-full border",
                role.current ? "border-emerald-400 bg-emerald-400/30" : "border-zinc-600 bg-zinc-950",
              )}
            />
            <p className="font-mono text-xs text-zinc-400">
              {role.period} · {role.location}
            </p>
            <h4 className="mt-1.5 font-semibold text-zinc-100">{role.title}</h4>
            <p className="text-sm text-zinc-300">
              {role.org}
              {role.orgNote && <span className="text-zinc-400"> · {role.orgNote}</span>}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-zinc-400">
              {role.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5">
                  <span aria-hidden="true" className="select-none font-mono text-zinc-600">
                    ›
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            {role.tags && (
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools used">
                {role.tags.map((tag) => (
                  <li key={tag}>
                    <Pill>{tag}</Pill>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
