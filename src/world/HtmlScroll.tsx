import { motion } from 'framer-motion'
import { ForgeLog } from '../components/ForgeLog'
import {
  legacyPortfolioUrl,
  plannedProjects,
  shippedProjects,
} from '../data/projects'
import { education, experience, profile, skills } from '../data/resume'

const reveal = {
  initial: { y: 72, opacity: 0, filter: 'blur(10px)' },
  whileInView: { y: 0, opacity: 1, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.35 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
}

function ProjectArtifact({ project }: { project: (typeof shippedProjects)[0] }) {
  return (
    <article
      data-cursor="hover"
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-sm transition hover:border-[#4fd1ff]/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[10px] text-white/35">
            {project.id} · {project.status}
          </p>
          <h3 className="mt-1 text-lg font-semibold group-hover:text-[#4fd1ff]">
            {project.name}
          </h3>
        </div>
        {project.status === 'planned' ? (
          <span className="shrink-0 rounded border border-[#fbbf24]/40 bg-[#fbbf24]/10 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase text-[#fbbf24]">
            queued
          </span>
        ) : (
          <span className="shrink-0 rounded border border-[#34d399]/40 bg-[#34d399]/10 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase text-[#34d399]">
            shipped
          </span>
        )}
      </div>
      {project.harnessNote ? (
        <p className="mt-2 font-[family-name:var(--font-mono)] text-[10px] text-[#a78bfa]">
          {project.harnessNote}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-relaxed text-white/55">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded bg-white/5 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[9px] text-white/45"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.links.map((link) => (
          <a
            key={link.href}
            data-cursor="hover"
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-[#4fd1ff]/30 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] text-[#4fd1ff] transition hover:bg-[#4fd1ff]/10"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </article>
  )
}

export function HtmlScroll() {
  const lyzr = experience[0]
  const restJobs = experience.slice(1)

  return (
    <div className="relative w-screen pt-10 font-[family-name:var(--font-body)]">
      <ForgeLog />

      <header className="pointer-events-none fixed inset-x-0 top-10 z-50 flex items-center justify-between px-6 py-3 mix-blend-difference md:top-11">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-white">
          pranav / harness
        </span>
        <a
          href={legacyPortfolioUrl}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto font-[family-name:var(--font-mono)] text-[10px] text-white/70 hover:text-[#4fd1ff]"
        >
          legacy portfolio ↗
        </a>
      </header>

      <section className="scroll-page flex-col !justify-end pb-24 text-left md:pb-32">
        <motion.div {...reveal}>
          <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.4em] text-[#34d399]">
            forge · sandbox · agent harness
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3.5rem,16vw,11rem)] leading-[0.85] uppercase">
            <span className="block text-stroke">Pranav</span>
            <span className="block text-white">Raj</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-white/55 md:text-xl">{profile.tagline}</p>
          <p className="mt-4 max-w-lg font-[family-name:var(--font-mono)] text-xs leading-relaxed text-white/35">
            This page is a scroll-synced VM view: wireframe confinement cage, live forge
            logs, artifact registry with GitHub mounts from{' '}
            <span className="text-[#4fd1ff]">pranav-portfolio-bc550.web.app</span>.
          </p>
        </motion.div>
      </section>

      <section className="scroll-page">
        <motion.div {...reveal} className="max-w-3xl">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#a78bfa]">01 — signal</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl uppercase md:text-7xl">
            Built by someone who ships sandboxes
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-white/60">
            Harnesses, verdict policies, tenant-scoped LLM routing, jailed shells, install
            brokers, SSE observability, and human-in-the-loop — the boring infrastructure
            that keeps coding agents from burning prod.
          </p>
        </motion.div>
      </section>

      <section className="scroll-page !items-start">
        <motion.div {...reveal} className="max-w-4xl">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#34d399]">02 — flagship</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase md:text-6xl">
            {lyzr.company}
          </h2>
          <p className="mt-2 text-xl text-[#4fd1ff]">{lyzr.role}</p>
          <p className="font-[family-name:var(--font-mono)] text-sm text-white/40">
            {lyzr.period} · {lyzr.location}
          </p>
          <ul className="mt-8 space-y-4 border-l border-[#34d399]/30 pl-6">
            {lyzr.highlights.slice(0, 6).map((h) => (
              <li
                key={h.slice(0, 48)}
                className="text-sm leading-relaxed text-white/65 md:text-base"
              >
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-2">
            {lyzr.technologies.slice(0, 10).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="scroll-page flex-col gap-10">
        <motion.div {...reveal} className="w-full max-w-5xl">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#f472b6]">03 — timeline</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase">
            Earlier runs
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {restJobs.map((job) => (
              <article
                key={job.company}
                data-cursor="hover"
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold">{job.company}</h3>
                <p className="text-[#4fd1ff]">{job.role}</p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-white/40">
                  {job.period}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/55">
                  {job.highlights.map((h) => (
                    <li key={h.slice(0, 40)}>{h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="scroll-page !items-start">
        <motion.div {...reveal} className="w-full max-w-6xl">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#fbbf24]">
            04 — artifact registry
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl uppercase">
            Mounted GitHub artifacts
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/45">
            Links synced from your{' '}
            <a
              href={legacyPortfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#4fd1ff] underline-offset-2 hover:underline"
            >
              Firebase portfolio
            </a>{' '}
            — click through for full context on each build.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {shippedProjects.map((p) => (
              <ProjectArtifact key={p.id} project={p} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="scroll-page !items-start">
        <motion.div {...reveal} className="w-full max-w-6xl">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#fb7185]">
            05 — build queue
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl uppercase">
            Next harness artifacts
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-white/45">
            Platform-shaped projects worth building to replace “basic” academic demos on
            your resume — each maps to work you did at Lyzr.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {plannedProjects.map((p) => (
              <ProjectArtifact key={p.id} project={p} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="scroll-page flex-col">
        <motion.div {...reveal} className="w-full max-w-5xl text-center">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#60a5fa]">06 — stack</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl uppercase">
            Skill manifest
          </h2>
          <div className="mt-12 grid gap-8 text-left md:grid-cols-3">
            {(
              [
                ['Languages', skills.languages],
                ['Frameworks', skills.frameworks],
                ['Infra', skills.infra],
              ] as const
            ).map(([label, items]) => (
              <div key={label}>
                <h3 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#4fd1ff]">
                  {label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s}
                      className="rounded-md bg-white/5 px-2 py-1 text-sm text-white/70"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="scroll-page">
        <motion.div
          {...reveal}
          className="max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-10"
        >
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#fb7185]">07 — edu</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl uppercase">
            {education.school}
          </h2>
          <p className="mt-2 text-white/60">{education.degree}</p>
          <p className="mt-4 font-[family-name:var(--font-mono)] text-3xl text-[#4fd1ff]">
            GPA {education.gpa}
          </p>
          <p className="mt-4 text-sm text-white/45">{education.courses.join(' · ')}</p>
        </motion.div>
      </section>

      <section className="scroll-page flex-col text-center">
        <motion.div {...reveal}>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,10vw,6rem)] uppercase leading-none">
            Claim a
            <br />
            <span className="text-[#4fd1ff]">sandbox session</span>
          </h2>
          <div className="mt-10 flex flex-col items-center gap-3 font-[family-name:var(--font-mono)] text-sm">
            <a
              data-cursor="hover"
              href={`mailto:${profile.email}`}
              className="text-lg text-white hover:text-[#4fd1ff]"
            >
              {profile.email}
            </a>
            <a
              data-cursor="hover"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-white/50 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              data-cursor="hover"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-white/50 hover:text-white"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
