export type ProjectLink = {
  label: string
  href: string
}

export type PortfolioProject = {
  id: string
  name: string
  description: string
  tags: string[]
  links: ProjectLink[]
  /** Pulled from pranav-portfolio-bc550.web.app */
  legacy?: boolean
  status: 'shipped' | 'planned'
  harnessNote?: string
}

/** Live GitHub artifacts from your Firebase portfolio */
export const shippedProjects: PortfolioProject[] = [
  {
    id: 'sociopedia-fe',
    name: 'Sociopedia',
    description:
      'Social graph with friending, posts, likes/comments, and dark/light mode — frontend experience.',
    tags: ['React', 'MERN', 'Real-time UI'],
    links: [
      {
        label: 'Source (frontend)',
        href: 'https://github.com/pranavraj101/socialmedia_frontend',
      },
      {
        label: 'Source (CRED API)',
        href: 'https://github.com/pranavraj101/socialmedia_CRED_API',
      },
    ],
    legacy: true,
    status: 'shipped',
    harnessNote: 'artifact://userland/app — no sandbox',
  },
  {
    id: 'uberclone',
    name: 'UberClone',
    description:
      'Ride-hailing flow with maps tracking, ride requests, fare estimates, and driver matching.',
    tags: ['React Native', 'Maps', 'Mobility'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/pranavraj101/uberclone',
      },
    ],
    legacy: true,
    status: 'shipped',
  },
  {
    id: 'shortest-paths',
    name: 'Visualizing Shortest Paths',
    description:
      "Graph visualizer comparing Dijkstra's and A* with performance tuning on large graphs.",
    tags: ['React', 'Algorithms', 'DSA'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/pranavraj101/pranav_soumyarup_DSA',
      },
    ],
    legacy: true,
    status: 'shipped',
  },
  {
    id: 'netflix-clone',
    name: 'Netflix UI Clone',
    description:
      'Front-end replica of Netflix built with TypeScript, React, and Node — layout and UX focus.',
    tags: ['TypeScript', 'React', 'Node.js'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/pranavraj101/netfix-clone',
      },
    ],
    legacy: true,
    status: 'shipped',
  },
  {
    id: 'movie-rec',
    name: 'Cinematic Synergy',
    description: 'Collaborative-filtering movie recommender with a personalized ranking pipeline.',
    tags: ['Python', 'ML', 'RecSys'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/pranavraj101/movie-recommender-system',
      },
    ],
    legacy: true,
    status: 'shipped',
  },
  {
    id: 'space-invader',
    name: 'Space Invader (Edu)',
    description:
      'Teaching-oriented game project — digital tools, ICT, and interactive learning mechanics.',
    tags: ['Game', 'Education'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/pranavraj101/Space_Invader',
      },
    ],
    legacy: true,
    status: 'shipped',
  },
]

/** Portfolio pieces aligned with Lyzr platform work — good to build next */
export const plannedProjects: PortfolioProject[] = [
  {
    id: 'forge-lab',
    name: 'Forge Sandbox Lab',
    description:
      'Minimal reproducible sandbox: non-root jailed shell, per-session confinement modes, install broker, and tamper manifest diff on every package install.',
    tags: ['Go', 'Linux namespaces', 'Docker', 'seccomp'],
    links: [{ label: 'Spec (README draft)', href: profileGithubReadmeAnchor('forge-lab') }],
    status: 'planned',
    harnessNote: 'confinement: strict · broker: enabled',
  },
  {
    id: 'verdict-lab',
    name: 'Verdict Lab',
    description:
      'Interactive policy playground for agent test runs — blocking vs advisory checks, never-false-fail rule, INCONCLUSIVE on skipped core flows, change-scoped suites.',
    tags: ['TypeScript', 'Playwright', 'Policy engine'],
    links: [{ label: 'Concept', href: profileGithubReadmeAnchor('verdict-lab') }],
    status: 'planned',
    harnessNote: 'subagent budget: bounded',
  },
  {
    id: 'harness-replay',
    name: 'Harness Replay',
    description:
      'SSE trace replayer for agent runs: narrated steps, screenshot artifacts on a timeline, human-in-the-loop pause/inject — like your observability stack in a box.',
    tags: ['SSE', 'FastAPI', 'React', 'Artifacts'],
    links: [{ label: 'Concept', href: profileGithubReadmeAnchor('harness-replay') }],
    status: 'planned',
    harnessNote: 'observability: stream + persist',
  },
  {
    id: 'mcp-health',
    name: 'MCP Tool Health Watch',
    description:
      'Boot-time probe that catches MCP import races and empty toolsets before the orchestrator spins — inspired by your production root-cause on silent tool loss.',
    tags: ['MCP', 'Go', 'Health checks'],
    links: [{ label: 'Concept', href: profileGithubReadmeAnchor('mcp-health') }],
    status: 'planned',
    harnessNote: 'probe: pre-flight',
  },
]

function profileGithubReadmeAnchor(_slug: string) {
  return 'https://github.com/pranavraj101?tab=repositories'
}

export const legacyPortfolioUrl = 'https://pranav-portfolio-bc550.web.app/'
