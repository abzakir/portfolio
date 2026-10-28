// Everything the site says lives here. Components only lay it out.

export const me = {
  name: "Abdul Zakir",
  shortName: "Zakir",
  email: "zakirbulaidi@gmail.com",
  github: "https://github.com/abzakir",
  linkedin: "https://www.linkedin.com/in/abdul-zakir-833793309",
  resume: "/Abdul_Zakir_Resume_Premium.pdf",
  city: "Islamabad",
  timeZone: "Asia/Karachi",
};

export const hero = {
  label: "CS @ FAST NUCES Islamabad",
  labelMore: " · class of 2029",
  intro:
    "I build AI agents, physics simulations and the occasional startup. Lately: a WhatsApp agent that keeps elderly patients on their medicine, and a black hole ray-traced from the equations up.",
  latest: {
    text: "National finalist, Alibaba Cloud AI Hackathon 2026",
    href: "#recent",
  },
  figure: "Schwarzschild black hole with an accretion disk, ray-traced live in your browser. My code. Drag to orbit.",
  figureShort: "My black hole ray tracer, running live.",
};

export type Win = {
  when: string;
  event: string;
  result: string;
  body: string;
  figure?: { value: number; prefix?: string; of: string };
  role?: string;
  link?: { label: string; href: string };
};

export const recent: Win[] = [
  {
    when: "Oct 2026",
    event: "Alibaba Cloud AI Hackathon Pakistan",
    result: "National finalist",
    body: "I led team Runtime Terrors and presented MedNuskha at the national final, at the Pak-China Friendship Center in Islamabad on 24 October.",
    figure: { value: 300, prefix: "top ", of: "of 16,000+ projects" },
    link: {
      label: "Verify certificate",
      href: "https://aihackathon.cognix-pk.com/certificate/A8DS-CSFZ-8PKG",
    },
  },
  {
    when: "Aug 2026",
    event: "AgentHack by AI Season",
    result: "6th place",
    body: "With my team I built an AI sales agent that goes from a company PDF to a booked meeting, and shows the evidence behind every lead it scores.",
    figure: { value: 6, of: "of 40 teams" },
  },
  {
    when: "Fall 2026",
    event: "NaSCON 2026",
    result: "Organising team",
    body: "One of Pakistan's biggest student tech events, hosted at FAST Islamabad. I worked in operations, the part of an event nobody notices when it goes right.",
    role: "Officer, Operations",
  },
];

export type Link = { label: string; href: string };

export const medNuskha = {
  kicker: "Alibaba Cloud AI Hackathon · national finalist",
  title: "MedNuskha",
  line: "A WhatsApp care agent that keeps elderly patients on their medication.",
  body: [
    "A caretaker adds a parent and their medicines on the website. After that the patient gets a WhatsApp message at every dose, with an Urdu voice note, and just replies. Typed or spoken, Urdu script, Roman Urdu or English: “le li” counts. If nobody answers, it nudges once and then tells the family.",
    "The rule I cared about most: the AI never guesses about medicine. It only repeats what a caretaker has confirmed, and when two doses are pending and the reply is unclear, it asks which one.",
  ],
  facts: [
    { k: "Role", v: "Team lead, main dev" },
    { k: "Status", v: "Live in production" },
    { k: "Tests", v: "251 passing" },
  ],
  stack: ["Python", "FastAPI", "Next.js", "Node + Baileys", "Supabase", "Qwen", "Whisper", "Docker"],
  links: [
    { label: "Live site", href: "https://mednuskha.vercel.app" },
    { label: "Code", href: "https://github.com/abzakir/MedNuskhaV1" },
  ] as Link[],
  chat: {
    patient: "Ammi ji",
    caretaker: "Usman",
    morning: [
      { from: "bot", time: "08:00", text: "Ammi ji, 8 baj gaye. Panadol 500mg lene ka waqt hai. Khane ke baad lein." },
      { from: "bot", time: "08:00", voice: "0:06" },
      { from: "patient", time: "08:04", text: "le li" },
      { from: "bot", time: "08:04", text: "Shukriya Ammi ji. Panadol 500mg le li, likh liya hai." },
    ],
    evening: [
      { time: "20:00", text: "Reminder sent" },
      { time: "20:15", text: "No reply. Gentle follow-up" },
      { time: "20:30", text: "Still nothing. Family alerted" },
    ],
    alert: "Ammi ne aaj 8 baje ki Panadol 500mg confirm nahi ki. Do baar yaad dilaya gaya hai.",
  },
};

export const blackHole = {
  kicker: "Personal project · C++ and GLSL",
  title: "Black Hole",
  line: "A Schwarzschild black hole, ray-traced from the geodesic equations up.",
  body: [
    "I watched Kavan's video on simulating a black hole in C++ and wanted to actually understand it, so I rebuilt it in SFML one small program at a time. Straight rays first, then an event horizon, bending light, RK4, and finally a GPU ray tracer with a Doppler-shifted accretion disk.",
    "When I checked the original shader against the textbook formula, its shadow came out about 40% too small. One term used r where it needed r − rₛ, and the photon sphere vanished. Mine gets the size right, and it's the one running at the top of this page.",
  ],
  steps: [
    { n: "01", title: "Straight rays", note: "Light flies straight through.", img: "/work/blackhole/step1.png" },
    { n: "02", title: "Event horizon", note: "Rays that reach rₛ are gone.", img: "/work/blackhole/step2.png" },
    { n: "03", title: "Bending light", note: "Schwarzschild geodesics, Euler.", img: "/work/blackhole/step3.png" },
    { n: "04", title: "RK4", note: "Gold is RK4, blue is Euler.", img: "/work/blackhole/step4.png" },
    { n: "05", title: "3D on the GPU", note: "921,600 rays every frame.", img: "/work/blackhole/step5_stars.png" },
    { n: "06", title: "Accretion disk", note: "Redshift and Doppler beaming.", img: "/work/blackhole/step6.png" },
  ],
  stack: ["C++17", "SFML 3", "GLSL", "WebGL", "CMake"],
  links: [
    { label: "Run it in your browser", href: "https://abzakir.github.io/blackhole/demo/" },
    { label: "Code, step by step", href: "https://github.com/abzakir/blackhole" },
  ] as Link[],
};

export const autopilot = {
  kicker: "AgentHack by AI Season · 6th of 40",
  title: "Sales Autopilot",
  line: "An AI sales agent that turns a company PDF into booked meetings.",
  body: [
    "You give it a company document and a description of the customer you want. It finds prospects, drops the bad ones cheaply, researches the promising ones, scores them, writes the email, reads the reply, books the meeting and pings you on WhatsApp.",
    "The language model never touches the numbers. Every score is plain code with a source URL behind each point, so the same evidence always gives the same result.",
  ],
  funnel: [
    { label: "Discovered", value: 27 },
    { label: "Worth a look", value: 15 },
    { label: "Researched", value: 6 },
    { label: "Qualified", value: 3 },
  ],
  lead: {
    name: "SwiftHaul Logistics",
    score: 96,
    factors: [
      { k: "ICP fit", v: 25, max: 25 },
      { k: "Problem fit", v: 23, max: 25 },
      { k: "Service fit", v: 18.8, max: 20 },
      { k: "Buying signals", v: 15, max: 15 },
      { k: "Company size", v: 5, max: 5 },
      { k: "Location", v: 5, max: 5 },
      { k: "Evidence quality", v: 4.5, max: 5 },
    ],
  },
  stack: ["Python", "FastAPI", "SQLAlchemy", "React", "TypeScript", "Groq"],
  note: "Team project. The repo is private.",
};

export const nuqta = {
  kicker: "Startup · co-founded with Zayam",
  title: "Nuqta",
  line: "Mentorship for Pakistani students, from people who've already done what they're aiming for.",
  body: "Zayam and I built the whole platform ourselves: student, mentor and admin dashboards, session booking and mentor verification. It's live, and we're still adding mentors and features.",
  stack: ["JavaScript", "Vercel functions", "Neon Postgres", "JWT auth"],
  logo: "/icon.png",
  links: [{ label: "joinnuqta.org", href: "https://www.joinnuqta.org" }] as Link[],
};

export const moreWork = [
  {
    name: "FocusFlow",
    what: "Offline focus timer, tasks and a private journal for Windows. Nothing leaves your PC.",
    stack: "Python · PySide6 · SQLite",
    href: "https://github.com/abzakir/focusflow",
  },
  {
    name: "Metal Slug: Iron Requiem",
    what: "Fan-made run-and-gun with three missions, vehicles and a survival mode.",
    stack: "C++20 · SFML",
    href: "https://github.com/abzakir/metal-slug-iron-requim",
  },
  {
    name: "Tumble Pop",
    what: "Arcade platformer remake, written to learn OOP properly.",
    stack: "C++ · SFML",
    href: "https://github.com/abzakir/tumble-pop-sfml",
  },
  {
    name: "Gesture particles",
    what: "A 3D particle system you steer with your hand through the webcam.",
    stack: "JavaScript · Three.js · Electron",
    href: "https://github.com/abzakir/hand-gesture-particle-system",
  },
  {
    name: "Gesture PC controller",
    what: "Move the cursor and click with hand gestures.",
    stack: "Python · MediaPipe · OpenCV",
  },
  {
    name: "Finora",
    what: "Personal finance dashboard for spotting where the money goes.",
    stack: "TypeScript · React · Vite",
    href: "https://github.com/abzakir/finora",
  },
  {
    name: "GitPulse",
    what: "Local-first dashboard for your own Git history.",
    stack: "Python · Tkinter",
    href: "https://github.com/abzakir/git-pulse",
  },
  {
    name: "Neuro Latency",
    what: "Reaction-time test that runs in the browser.",
    stack: "JavaScript",
    href: "https://github.com/abzakir/neuro-latency",
  },
  {
    name: "Live Vote Telecast",
    what: "Simulated live election results, recorded on a blockchain.",
    stack: "HTML · JavaScript",
    href: "https://github.com/abzakir/live-vote-telecast-blockchain",
  },
  {
    name: "Password strength checker",
    what: "Command-line password checker.",
    stack: "C++",
    href: "https://github.com/abzakir/password-strength-checker",
  },
];

export const roles = [
  { when: "2025 – now", role: "Co-founder", org: "Nuqta", note: "Building the platform with Zayam." },
  { when: "Fall 2026", role: "Officer, Operations", org: "NaSCON 2026 organising team", note: "FAST NUCES Islamabad." },
  { when: "2026", role: "Team lead", org: "Runtime Terrors", note: "MedNuskha, Alibaba Cloud AI Hackathon." },
  { when: "2026", role: "Sales representative (contract)", org: "State Life Insurance", note: "Client calls, follow-ups, closing." },
];

export const earlierRoles = [
  { role: "Captain, Student Council", org: "Aga Khan Higher Secondary School, Hyderabad", note: "1,800+ students" },
  { role: "President, English Club", org: "Aga Khan Higher Secondary School, Hyderabad" },
  { role: "Founder", org: "ZBM Lifestyle", note: "Ran a small e-commerce brand for a year, then closed it for FAST" },
];

export const beforeFast = [
  { when: "2023", what: "STEAM Competition, AI category", note: "Skin analysis model. Regional Directorate with the Govt. of Sindh" },
  { when: "2022", what: "AKESP MUN", note: "Honourable mention" },
  { when: "2022", what: "HDMUN", note: "Honourable mention" },
  { when: "2022", what: "Open House", note: "Water monitoring system" },
  { when: "2022", what: "All Sindh Youth Spelling Bee", note: "Participant" },
  { when: "2020, 2021", what: "World AI Competition for Youth", note: "Took part twice" },
];

export const about = {
  photo: "/my-pic.jpeg",
  paragraphs: [
    "I'm Zakir. I grew up in Hyderabad, Sindh, and moved to Islamabad for computer science at FAST NUCES, where I'm in my second year.",
    "Most of what I build starts with wanting to understand something. The black hole began as a video I couldn't stop thinking about. MedNuskha began with a simpler question: would an elderly parent ever learn a new app? They wouldn't, so it lives in WhatsApp.",
    "I like problems where being slightly wrong matters, so I test things, measure them and write down what I find.",
  ],
  education: [
    { when: "2025 – 2029", where: "FAST NUCES, Islamabad", what: "BS Computer Science" },
    { when: "Intermediate", where: "Aga Khan Higher Secondary School, Hyderabad", what: "91.6%, AKU-EB" },
    { when: "Matric", where: "Public School Hyderabad", what: "84.5%, AKU-EB" },
  ],
  languages: "English, Urdu, Sindhi",
  toolbox: [
    { k: "Languages", v: "C, C++, Python, TypeScript, JavaScript, GLSL, SQL" },
    { k: "Building with", v: "Next.js, React, FastAPI, Node, SFML, PySide6, Three.js" },
    { k: "Data and infra", v: "Postgres (Supabase, Neon), SQLite, Docker, Vercel, Linux, Git" },
    { k: "AI", v: "LLM agents, Whisper, MediaPipe, OpenCV" },
  ],
};

export const nav = [
  { label: "Recent", href: "#recent" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
