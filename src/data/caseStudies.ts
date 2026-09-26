export type VerdictStatus = 'PASS' | 'SKIPPED' | 'RUNNING'

export type FlowStep = {
  problem: string
  constraint: string
  design: string
  result: string
}

export type GraphNode = { id: string; label: string; x: number; y: number }
export type GraphEdge = { from: string; to: string; label?: string }

export type CaseStudy = {
  id: string
  title: string
  status: VerdictStatus
  subtitle: string
  steps: FlowStep
  narrative: string[]
  activityLog: string[]
  nodes: GraphNode[]
  edges: GraphEdge[]
  tags: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'feature-testing-agent',
    title: 'Autonomous feature-testing agent',
    status: 'PASS',
    subtitle: 'Go harness · Playwright code-as-actions · bounded subagent',
    steps: {
      problem:
        'Generated apps shipped without reliable post-build verification; manual QA did not scale.',
      constraint:
        'Fixed token/time budget; no false fails on flaky UI; re-test only failed flows.',
      design:
        'REPL tool for browser actions + change-scoped suite + verdict policy (blocking vs advisory).',
      result:
        'Post-build pass applies fixes and re-runs failed flows only; core flows gate release confidence.',
    },
    narrative: [
      'The harness treats testing as a subagent with its own budget, not an infinite loop of clicks.',
      'Playwright actions are emitted as code in a REPL so the orchestrator can inspect, retry, and diff failures.',
      'Verdict policy separates ship-blockers from advisory noise — aligned with PRD-grounded checks.',
    ],
    activityLog: [
      '[harness] post_build hook → spawn testing subagent',
      '[agent] flow 1/5 login · PASS',
      '[agent] flow 3/5 checkout · FAIL (timeout 30s)',
      '[agent] fix applied → re-testing flow 3/5',
      '[agent] flow 3/5 checkout · PASS',
      '[verdict] suite PASS · 0 false fails',
    ],
    nodes: [
      { id: 'orch', label: 'Orchestrator', x: 40, y: 80 },
      { id: 'repl', label: 'Playwright REPL', x: 180, y: 40 },
      { id: 'sub', label: 'Testing subagent', x: 180, y: 120 },
      { id: 'ver', label: 'Verdict policy', x: 320, y: 80 },
    ],
    edges: [
      { from: 'orch', to: 'repl', label: 'tool call' },
      { from: 'repl', to: 'sub', label: 'actions' },
      { from: 'sub', to: 'ver', label: 'flows' },
    ],
    tags: ['Go', 'Playwright', 'Subagents'],
  },
  {
    id: 'observability-sse',
    title: 'Real-time agent observability',
    status: 'PASS',
    subtitle: 'SSE narration · screenshot artifacts · per-app testing toggle',
    steps: {
      problem:
        'Operators could not see what agents did inside sandboxes until runs finished.',
      constraint:
        'Stream must be durable, low-latency, and controllable across backend, harness, VM, and UI.',
      design:
        'SSE channel for step narration + persisted screenshots; HITL toggle wired through the stack.',
      result:
        'Live run visibility with human pause/inject; screenshots survive as artifacts for audits.',
    },
    narrative: [
      'Every meaningful step emits a structured event — narration for humans, references for storage.',
      'Screenshots land as durable artifacts, not ephemeral WebSocket frames.',
      'Testing enablement propagates from API → harness → sandbox VM → frontend with one flag.',
    ],
    activityLog: [
      '[sse] client connected run_id=8f2a',
      '[agent] narrating: opening settings route',
      '[artifact] screenshot persisted s3://…/step_04.png',
      '[hitl] operator paused run · inject message',
      '[agent] resumed · flow 2/4',
      '[sse] run complete · 12 events',
    ],
    nodes: [
      { id: 'agent', label: 'Agent', x: 30, y: 70 },
      { id: 'sse', label: 'SSE stream', x: 150, y: 70 },
      { id: 'ui', label: 'Console UI', x: 270, y: 40 },
      { id: 'art', label: 'Artifacts', x: 270, y: 110 },
    ],
    edges: [
      { from: 'agent', to: 'sse', label: 'events' },
      { from: 'sse', to: 'ui', label: 'live' },
      { from: 'agent', to: 'art', label: 'screenshot' },
    ],
    tags: ['SSE', 'FastAPI', 'HITL'],
  },
  {
    id: 'saved-versions',
    title: 'Saved Versions · agent-aware revert',
    status: 'PASS',
    subtitle: 'Git tags · agent-version map · 33 tests',
    steps: {
      problem:
        'Users could bookmark code but not the agent configuration that produced it.',
      constraint:
        'Revert must restore code and agent versions atomically; durable across sessions.',
      design:
        'Pin commits as tags; snapshot agent-version map per bookmark; revert orchestration + test suite.',
      result:
        'One action restores a known-good code + agent pair; regression coverage on revert paths.',
    },
    narrative: [
      'Bookmarks are not just SHAs — they carry the agent graph versions that matter for reproducibility.',
      'Git tags make pins durable outside the DB; the map is the semantic link back to behavior.',
    ],
    activityLog: [
      '[bookmark] created tag saved/v14',
      '[map] agent versions captured · 3 nodes',
      '[user] revert requested → saved/v14',
      '[git] checkout tag · sync agent map',
      '[test] revert suite · 33/33 PASS',
    ],
    nodes: [
      { id: 'user', label: 'User bookmark', x: 40, y: 80 },
      { id: 'git', label: 'Git tag', x: 160, y: 50 },
      { id: 'map', label: 'Agent map', x: 160, y: 110 },
      { id: 'rev', label: 'Revert flow', x: 300, y: 80 },
    ],
    edges: [
      { from: 'user', to: 'git' },
      { from: 'user', to: 'map' },
      { from: 'git', to: 'rev' },
      { from: 'map', to: 'rev' },
    ],
    tags: ['Git', 'Platform', 'Tests'],
  },
  {
    id: 'forge-guardrails',
    title: 'Forge sandbox guardrails (prototype)',
    status: 'RUNNING',
    subtitle: 'Jailed shell · install broker · OS-first boundaries',
    steps: {
      problem:
        'Coding agents need shell access without exfiltration or arbitrary package installs.',
      constraint:
        'Prefer OS boundaries; use classifiers only for semantic judgment; per-session modes.',
      design:
        'Non-root jailed shell, install broker allowlist, tamper manifests, confinement mode per session.',
      result:
        'Layered model demo: confinement + broker + manifest diff before classifier escalation.',
    },
    narrative: [
      'Forge treats the sandbox as a VM with policy, not a generic Docker run.',
      'Install broker mediates package managers with timeouts and allowlists.',
      'Tamper manifests detect drift after installs — OS signals first, ML last.',
    ],
    activityLog: [
      '[forge] session claim · mode=confined',
      '[jail] uid=65534 · cap_drop=ALL',
      '[broker] pip install requests · ALLOW',
      '[manifest] hash delta detected · 2 files',
      '[classifier] semantic check · SKIPPED (OS rule matched)',
    ],
    nodes: [
      { id: 'sb', label: 'Sandbox VM', x: 40, y: 80 },
      { id: 'gr', label: 'Guardrails', x: 160, y: 80 },
      { id: 'br', label: 'Install broker', x: 160, y: 140 },
      { id: 'act', label: 'Agent action', x: 280, y: 80 },
    ],
    edges: [
      { from: 'act', to: 'gr', label: 'request' },
      { from: 'gr', to: 'sb', label: 'enforce' },
      { from: 'gr', to: 'br', label: 'install' },
    ],
    tags: ['Linux', 'Docker', 'Security'],
  },
]

export const dashboardMetrics = [
  { label: 'revert tests', value: '33' },
  { label: 'leak vectors ranked', value: '8' },
  { label: 'repos audited', value: '4' },
  { label: 'false fails allowed', value: '0' },
] as const
