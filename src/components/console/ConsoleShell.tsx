import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { caseStudies } from '../../data/caseStudies'
import { profile } from '../../data/resume'
import { usePagedNavigation } from '../../hooks/usePagedNavigation'
import { ArtifactsPage } from './ArtifactsPage'
import { CaseStudyPage } from './CaseStudyPage'
import { ExperiencePage } from './ExperiencePage'
import { HeroTerminal } from './HeroTerminal'
import { PageIndicator } from './PageIndicator'
import { StatusPill } from './StatusPill'
import { TerminalBoot } from './TerminalBoot'
import { ContactPage } from './ContactPage'

const pageVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 72 : -72,
    opacity: 0,
    filter: 'blur(6px)',
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -72 : 72,
    opacity: 0,
    filter: 'blur(6px)',
  }),
}

const BOOT_STORAGE_KEY = 'agent_console_boot_v1'

function readBootComplete() {
  if (typeof window === 'undefined') return true
  return Boolean(sessionStorage.getItem(BOOT_STORAGE_KEY))
}

export function ConsoleShell() {
  const [bootDone, setBootDone] = useState(readBootComplete)

  const pages = useMemo(
    () => [
      { id: 'overview', label: 'overview' },
      ...caseStudies.map((cs) => ({ id: cs.id, label: cs.id })),
      { id: 'artifacts', label: 'artifacts' },
      { id: 'experience', label: 'experience' },
      { id: 'contact', label: 'contact' },
    ],
    [],
  )

  const { page, direction, goTo, contentRef, pageCount } = usePagedNavigation(
    pages.length,
  )

  const renderPage = () => {
    if (page === 0) return <HeroTerminal />
    if (page <= caseStudies.length) {
      const cs = caseStudies[page - 1]
      return (
        <CaseStudyPage study={cs} index={page - 1} total={caseStudies.length} />
      )
    }
    if (page === caseStudies.length + 1) return <ArtifactsPage />
    if (page === caseStudies.length + 2) return <ExperiencePage />
    return <ContactPage />
  }

  return (
    <div className="terminal-shell flex h-[100dvh] flex-col overflow-hidden bg-[var(--bg)] text-[var(--text-body)]">
      <TerminalBoot onDone={() => setBootDone(true)} />

      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={bootDone ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        className="z-50 shrink-0 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
          <span className="font-mono text-xs text-[var(--text-muted)]">
            agent_console / {pages[page]?.label ?? '…'}
            <span className="terminal-cursor ml-1 inline-block h-[0.85em] w-[0.45em] bg-[var(--accent)]" />
          </span>
          <nav className="hidden gap-3 font-mono text-[10px] uppercase tracking-wide sm:flex">
            {[
              { idx: 0, label: 'home' },
              { idx: 1, label: 'cases' },
              { idx: caseStudies.length + 1, label: 'artifacts' },
              { idx: caseStudies.length + 2, label: 'exp' },
              { idx: pageCount - 1, label: 'contact' },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => goTo(item.idx)}
                className={
                  page === item.idx ||
                  (item.label === 'cases' && page > 0 && page <= caseStudies.length)
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
                }
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="hidden font-mono text-[10px] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] sm:inline"
            >
              resume ↗
            </a>
            <StatusPill status="RUNNING" className="!text-[10px]" />
          </div>
        </div>
      </motion.header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {bootDone && (
            <motion.div
              key={page}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              ref={contentRef}
              className="absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain px-4 md:px-6"
            >
              <div className="mx-auto flex h-full min-h-[min(100%,680px)] max-w-5xl flex-col">
                {renderPage()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--bg)] to-transparent"
          initial={false}
          animate={{ opacity: page > 0 ? 1 : 0 }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg)] to-transparent"
        />
      </div>

      {bootDone && (
        <PageIndicator pages={pages} active={page} onSelect={goTo} />
      )}
    </div>
  )
}
