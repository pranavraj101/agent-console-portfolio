export const profile = {
  name: 'Pranav Raj',
  title: 'Platform Engineer',
  tagline:
    'Building agent harnesses, sandbox guardrails, and observability for AI-native product platforms.',
  email: 'sinhapranavraj10142@gmail.com',
  linkedin: 'https://www.linkedin.com/in/pranav-raj-4541b1194/',
  github: 'https://github.com/pranavraj101',
} as const

export type Experience = {
  company: string
  location: string
  role: string
  period: string
  highlights: string[]
  technologies: string[]
}

export const experience: Experience[] = [
  {
    company: 'Lyzr AI',
    location: 'Remote',
    role: 'Member of Technical Staff (Platform Engineer)',
    period: 'Jan 2025 — Present',
    highlights: [
      'Built an autonomous browser-based feature-testing agent inside a Go agent harness, using a Playwright code-as-actions REPL and a bounded-budget testing subagent that re-tests only failed flows.',
      "Designed the agent's verdict and evaluation policy: PRD-grounded blocking vs. advisory checks, performance-based failures, INCONCLUSIVE for skipped core flows, and change-scoped testing.",
      'Shipped real-time agent observability with human-in-the-loop controls: SSE-streamed narration and screenshots, durable artifact storage, and a per-app testing toggle across backend, harness, sandbox VM, and frontend.',
      'Engineered orchestrator prompts and platform-injected context, including LLM-generated commit messages with sanitizer, timeout, and safe fallback.',
      'Delivered Saved Versions with agent-aware revert: pinned git tags, bookmark agent-version maps, and revert restoring code and agent versions together (33 tests).',
      'Prototyped sandbox guardrails (Forge): per-session confinement, non-root jailed shell, install broker, tamper manifests, OS boundaries first with classifier for semantic judgment.',
      'Built tenant-scoped LLM provider routing at sandbox claim and image bake time via OpenRouter/Bifrost gateways.',
      'Audited AI app-builder platform for LLM API key leakage across four repos; ranked eight vectors and produced a key-rotation plan.',
      'Root-caused production agent failures: MCP tool boot-time import race and usage-attribution outage from a proxy that never restarted after a runtime rewrite.',
    ],
    technologies: [
      'Python',
      'Go',
      'FastAPI',
      'LLMs',
      'RAG',
      'LangGraph',
      'Neo4j',
      'Playwright',
      'SSE',
      'Docker',
      'MCP',
      'OpenRouter/Bifrost',
      'AWS',
    ],
  },
  {
    company: 'Wizphys AI Pvt Ltd',
    location: 'Pune, India',
    role: 'Application Developer',
    period: 'Aug 2023 — Dec 2024',
    highlights: [
      'Led end-to-end development of a Physio mobile application from conceptualization through deployment.',
      'Developed RESTful APIs on AWS Lambda against SQL on Amazon RDS; led migration from NoSQL to SQL.',
      'Implemented automated WhatsApp/email notifications and a WhatsApp chatbot for appointment booking via Sobot API.',
    ],
    technologies: [
      'Java',
      'Golang',
      'Linux',
      'React',
      'Node.js',
      'Express.js',
      'Firebase',
      'AWS Lambda',
      'S3',
      'RDS',
      'IAM',
    ],
  },
  {
    company: 'ITILITE',
    location: 'Bangalore, Karnataka',
    role: 'Software Developer Intern',
    period: 'Sept 2022 — July 2023',
    highlights: [
      'Developed meal selection for flights and pay-at-hotel for post-paid bookings.',
      'Built international flight cancellation details management for real-time accuracy and customer communication.',
    ],
    technologies: [
      'React',
      'Node.js',
      'Linux',
      'Docker',
      'SQL',
      'Python',
      'Django',
      'AWS',
      'Redis',
    ],
  },
]

export type Project = {
  name: string
  description: string
  tags: string[]
}

/** @deprecated Use `shippedProjects` in data/projects.ts */
export const projects: Project[] = [
  {
    name: 'Sociopedia',
    description: 'MERN social platform — see GitHub mounts in artifact registry.',
    tags: ['MERN', 'React', 'Node.js'],
  },
  {
    name: 'UberClone',
    description: 'Ride-hailing clone with maps and real-time tracking.',
    tags: ['React Native', 'Maps'],
  },
  {
    name: 'Visualizing Shortest Paths',
    description: "Dijkstra's and A* graph visualizer.",
    tags: ['React', 'Algorithms'],
  },
]

export const education = {
  school: 'Vellore Institute of Technology',
  location: 'Chennai, TN',
  degree: 'B.Tech, Computer Science and Engineering',
  gpa: '8.94',
  period: 'Jul 2019 — Jul 2023',
  courses: [
    'Operating Systems',
    'Analysis of Algorithms',
    'Artificial Intelligence',
    'Machine Learning',
    'Probability and Statistics',
    'Network Security',
  ],
}

export const skills = {
  languages: [
    'Python',
    'Go',
    'Java',
    'C++',
    'C',
    'SQL',
    'JavaScript',
    'PHP',
    'HTML/CSS',
    'Solidity',
  ],
  frameworks: [
    'FastAPI',
    'LangChain',
    'LangGraph',
    'Django',
    'React',
    'Playwright',
    'MCP',
  ],
  infra: [
    'Git',
    'Docker',
    'AWS',
    'Neo4j',
    'Vector DBs',
    'OpenRouter/Bifrost',
    'JIRA',
    'Jenkins',
  ],
} as const

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
