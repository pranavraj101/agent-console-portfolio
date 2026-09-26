import { motion, useInView } from 'framer-motion'
import { useId, useRef } from 'react'
import type { GraphEdge, GraphNode } from '../../data/caseStudies'

type Props = {
  nodes: GraphNode[]
  edges: GraphEdge[]
  title?: string
}

export function SystemDiagram({ nodes, edges, title = 'system graph' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })
  const markerId = useId().replace(/:/g, '')
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <figure
      ref={ref}
      className="border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
    >
      <figcaption className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        {title}
      </figcaption>
      <svg
        viewBox="0 0 380 180"
        className="h-auto w-full text-[var(--text-muted)]"
        role="img"
        aria-label={title}
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" opacity="0.8" />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const a = nodeMap[e.from]
          const b = nodeMap[e.to]
          if (!a || !b) return null
          const mx = (a.x + b.x) / 2
          const my = (a.y + b.y) / 2
          const x1 = a.x + 50
          const y1 = a.y + 14
          const x2 = b.x
          const y2 = b.y + 14
          return (
            <g key={`${e.from}-${e.to}`}>
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--accent)"
                strokeOpacity={0.55}
                strokeWidth="1"
                markerEnd={`url(#${markerId})`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              />
              {e.label ? (
                <motion.text
                  x={mx}
                  y={my - 4}
                  textAnchor="middle"
                  className="fill-[var(--text-muted)] font-mono text-[8px]"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.15 }}
                >
                  {e.label}
                </motion.text>
              ) : null}
            </g>
          )
        })}
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={100}
              height={28}
              rx={2}
              fill="var(--bg)"
              stroke="var(--border-strong)"
              strokeWidth="1"
            />
            <text
              x={n.x + 50}
              y={n.y + 18}
              textAnchor="middle"
              className="fill-[var(--text-body)] font-mono text-[9px]"
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </figure>
  )
}
