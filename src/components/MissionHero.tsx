import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { profile } from '../data/resume'

const ROLES = [
  'Platform Engineer',
  'Agent Harness Builder',
  'Sandbox Guardrails',
  'Production Debugger',
]

export function MissionHero() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center px-6 pb-32 pt-24"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - rect.left) / rect.width - 0.5)
        my.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-cyan)]"
        >
          // live operator profile
        </motion.p>

        <motion.div style={{ rotateX, rotateY, transformPerspective: 900 }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-4 text-[clamp(3rem,12vw,7.5rem)] font-extrabold leading-[0.92] tracking-tighter"
          >
            <span className="text-gradient">{profile.name.split(' ')[0]}</span>
            <br />
            <span className="text-white">{profile.name.split(' ')[1]}</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {ROLES.map((role, i) => (
            <motion.span
              key={role}
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.7 }}
              className="glass rounded-full px-4 py-1.5 font-mono text-[11px] text-white/80 md:text-xs"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-10 max-w-2xl text-lg text-white/55 md:text-xl"
        >
          {profile.tagline} This site runs like a{' '}
          <span className="text-[var(--color-neon)]">mini harness</span> — scroll to
          execute test runs across my career graph.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <a
            href="#runs"
            className="group relative overflow-hidden rounded-full bg-[var(--color-neon)] px-6 py-3 text-sm font-semibold text-black"
          >
            <span className="relative z-10">Run experience suite</span>
            <span className="absolute inset-0 translate-y-full bg-white transition group-hover:translate-y-0" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-full px-6 py-3 text-sm text-white/90 hover:ring-1 hover:ring-[var(--color-cyan)]/50"
          >
            GitHub artifact
          </a>
        </motion.div>

        <div className="mt-16 grid grid-cols-3 gap-3 font-mono text-[10px] text-white/40 md:max-w-lg md:text-xs">
          <div className="glass rounded-lg p-3">
            <div className="text-[var(--color-neon)]">SSE</div>
            observability on
          </div>
          <div className="glass rounded-lg p-3">
            <div className="text-[var(--color-hot)]">verdict</div>
            no false fails
          </div>
          <div className="glass rounded-lg p-3">
            <div className="text-[var(--color-cyan)]">budget</div>
            bounded subagent
          </div>
        </div>
      </div>
    </section>
  )
}
