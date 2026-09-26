import { motion } from 'framer-motion'
import { profile } from '../data/resume'

export function ContactTerminal() {
  return (
    <section id="comms" className="px-6 pb-40 pt-24 md:pb-48">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--color-hot)]">06 / comms</p>
        <h2 className="mt-3 text-4xl font-bold md:text-6xl">
          Open a <span className="text-[var(--color-neon)]">human channel</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass mt-10 rounded-2xl p-6 font-mono text-sm md:p-8 md:text-base"
        >
          <p className="text-[var(--color-cyan)]">
            $ curl -X POST /hire/pranav --open-to platform, agents, full-stack
          </p>
          <p className="mt-4 text-white/80">
            → email:{' '}
            <a
              className="text-[var(--color-neon)] underline-offset-4 hover:underline"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </p>
          <p className="mt-2 text-white/60">
            → linkedin:{' '}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-cyan)] hover:underline"
            >
              /in/pranav-raj
            </a>
          </p>
          <p className="mt-2 text-white/60">
            → github:{' '}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-cyan)] hover:underline"
            >
              @pranavraj101
            </a>
          </p>
          <p className="mt-6 text-xs text-white/35">
            // response SLA: human, not LLM
          </p>
        </motion.div>
      </div>
    </section>
  )
}
