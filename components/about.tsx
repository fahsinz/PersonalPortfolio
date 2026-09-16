import { BadgeCheck, GraduationCap } from "lucide-react";
import { certifications, coursework, education, toolbox } from "@/lib/data";
import { Pill, SectionHeading } from "./ui/primitives";
import { Reveal } from "./ui/reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 border-t border-zinc-800/60 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading id="about-title" index="04" eyebrow="About" title="Engineer by training, verifier by temperament." />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal className="space-y-8">
            <div className="space-y-5 text-pretty leading-relaxed text-zinc-300">
              <p>
                I like the part of engineering where you find out whether you were right. That means biasing a transistor
                from hand calculations and then checking it in SPICE and on the scope, writing RTL and then an independent
                model to argue with it, and building firmware that survives the real power supply it&apos;s plugged into.
              </p>
              <p className="text-zinc-400">
                Outside the lab I&apos;ve shipped a production data pipeline for a startup, debugged a ROS 2 stack until a
                rover drove, and run hands-on STEM workshops for Grade 1–12 students. I&apos;m most useful on teams that
                care about requirements, test coverage, and clean handoffs.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-zinc-800 bg-zinc-900 text-emerald-400">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold text-zinc-100">{education.school}</h3>
                    <p className="font-mono text-xs text-zinc-400">{education.period}</p>
                  </div>
                  <p className="text-sm text-zinc-300">{education.degree}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-zinc-800 pt-4">
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">GPA</dt>
                      <dd className="mt-1 font-mono text-lg text-zinc-50">
                        {education.gpa} <span className="text-sm text-zinc-500">{education.gpaScale}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">Program</dt>
                      <dd className="mt-1 font-mono text-lg text-zinc-50">{education.program}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">Certifications</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <li key={cert} className="inline-flex items-center gap-1.5 text-sm text-zinc-300">
                    <BadgeCheck className="size-4 text-emerald-400" aria-hidden="true" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-10">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">Toolbox</h3>
              <dl className="mt-4 divide-y divide-zinc-800/80 border-y border-zinc-800/80">
                {toolbox.map((group) => (
                  <div key={group.label} className="grid gap-3 py-4 sm:grid-cols-[8rem_1fr]">
                    <dt className="pt-0.5 text-sm text-zinc-300">{group.label}</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Pill>{item}</Pill>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">Relevant coursework</h3>
              <ul className="mt-4 divide-y divide-zinc-800/80 border-y border-zinc-800/80">
                {coursework.map((course) => (
                  <li key={course.code} className="flex items-baseline gap-4 py-3 text-sm">
                    <span className="w-16 shrink-0 font-mono text-xs text-emerald-400">{course.code}</span>
                    <span className="min-w-0 flex-1 text-zinc-200">{course.name}</span>
                    <span className="font-mono text-xs text-zinc-400">{course.term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
