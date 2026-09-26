import { motion } from 'framer-motion'

export function SignalAbout() {
  return (
    <section id="signal" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          className="md:col-span-5"
        >
          <p className="font-mono text-xs text-[var(--color-hot)]">01 / signal</p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Not a résumé.
            <br />
            A <span className="text-[var(--color-cyan)]">runtime</span>.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass md:col-span-7 rounded-2xl p-6 md:p-8"
        >
          <p className="text-lg leading-relaxed text-white/70">
            I build the substrate other agents run on — harnesses, verdict policies,
            tenant-scoped model routing, sandbox confinement, and the observability that
            lets humans steer when autonomy gets weird.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ['Testing agent', 'Playwright REPL + bounded re-test loops'],
              ['Saved Versions', 'Git tags + agent-version revert maps'],
              ['Forge guardrails', 'Jailed shell, install broker, OS-first boundaries'],
              ['Key audit', '8 leak vectors ranked + rotation plan'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-black/30 p-4"
              >
                <div className="font-mono text-xs text-[var(--color-neon)]">{title}</div>
                <p className="mt-2 text-sm text-white/55">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
