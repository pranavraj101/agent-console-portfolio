import { motion } from 'framer-motion'
import { education } from '../data/resume'

export function EducationBlock() {
  return (
    <section id="edu" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--color-hot)]">05 / checkpoint</p>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass mt-6 overflow-hidden rounded-3xl"
        >
          <div className="grid md:grid-cols-2">
            <div className="border-b border-white/10 p-8 md:border-b-0 md:border-r">
              <h2 className="text-3xl font-bold">{education.school}</h2>
              <p className="mt-2 text-white/60">{education.degree}</p>
              <p className="mt-4 font-mono text-2xl text-[var(--color-neon)]">
                GPA {education.gpa}
              </p>
            </div>
            <div className="p-8 font-mono text-sm text-white/55">
              <p>{education.location}</p>
              <p className="mt-1 text-white/80">{education.period}</p>
              <p className="mt-6 leading-relaxed">
                {education.courses.join(' · ')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
