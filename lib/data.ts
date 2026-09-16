/*
 * All site content lives here. Edit this file to update the portfolio;
 * components only handle layout.
 */

export const profile = {
  name: "Fahsin Bhuiyan",
  handle: "fahsin.bhuiyan",
  role: "Electrical Engineering Student",
  location: "Greater Toronto Area, Canada",
  email: "fahsinbhuiyan@gmail.com",
  github: "https://github.com/fahsinz",
  githubLabel: "github.com/fahsinz",
  linkedin: "https://www.linkedin.com/in/fahsin-bhuiyan",
  linkedinLabel: "in/fahsin-bhuiyan",
  resume: "/resume.pdf",
  resumeFileName: "Fahsin_Bhuiyan_Resume.pdf",
  status: "Open to hardware & verification co-op roles",
} as const;

export const navLinks = [
  { id: "work", label: "Work", n: "01" },
  { id: "capabilities", label: "Capabilities", n: "02" },
  { id: "experience", label: "Experience", n: "03" },
  { id: "about", label: "About", n: "04" },
] as const;

export type StatusTone = "active" | "settled";
export type PreviewKind = "rtl" | "pipeline" | "firmware" | "analog" | "rover" | "lstm";

export interface Project {
  slug: string;
  title: string;
  domain: string;
  year: string;
  hook: string;
  highlights: string[];
  stack: string[];
  status: { label: string; tone: StatusTone };
  link?: { href: string; label: string };
  preview: PreviewKind;
}

export const projects: Project[] = [
  {
    slug: "rv32i",
    title: "RV32I RISC-V Core",
    domain: "RTL · Verification",
    year: "2026",
    hook: "A RISC-V core that has to agree with a Python golden model, bit for bit.",
    highlights: [
      "Synthesizable SystemVerilog for a 10-operation ALU, a 32×32-bit register file with hardwired x0, and an immediate generator covering all five RV32I formats.",
      "cocotb + pytest harness checks every block against an independent Python reference model across 12,000+ directed and constrained-random vectors.",
      "A walking-ones bit sweep caught single-bit miswiring in the B- and J-type immediate paths that random stimulus missed.",
    ],
    stack: ["SystemVerilog", "cocotb", "pytest", "Icarus Verilog"],
    status: { label: "Actively developed", tone: "active" },
    link: { href: "https://github.com/fahsinz/rv32i-cpu", label: "rv32i-cpu" },
    preview: "rtl",
  },
  {
    slug: "awksion",
    title: "Venue Intelligence Pipeline",
    domain: "Data · Automation",
    year: "2026",
    hook: "2,341 venues scraped, validated, and scored, with no one babysitting the run.",
    highlights: [
      "Idempotent Python ETL orchestrating Selenium scrapers and the OSM Overpass API as independently re-runnable stages, landing in SQLite/WAL.",
      "scikit-learn model backfilled capacity for 350+ venues by fusing geospatial footprints with fire-code occupancy heuristics.",
      "Driver cycling every 100 pages / 60 min, explicit WebDriverWait conditions, and append-safe writes kept long unattended runs stable.",
    ],
    stack: ["Python", "Selenium", "SQLAlchemy", "scikit-learn"],
    status: { label: "Delivered @ Awksion", tone: "settled" },
    preview: "pipeline",
  },
  {
    slug: "takeoffbot",
    title: "TakeoffBot",
    domain: "Embedded · Firmware",
    year: "2026",
    hook: "Six motors, one ESP32, and a brownout that kept rebooting the brain.",
    highlights: [
      "C++ firmware for LEDC PWM speed control, H-bridge motor drive, and servo actuation on an ESP32.",
      "Traced brownout resets to a power-domain fault and isolated the 7.4 V motor supply from logic power.",
      "Median-filtered HC-SR04 input with a 20 cm stop threshold, plus a dead-man timeout that halts drive output within one control cycle.",
    ],
    stack: ["ESP32", "C++", "PWM", "H-bridge"],
    status: { label: "Bench-validated", tone: "settled" },
    preview: "firmware",
  },
  {
    slug: "mosfet-amp",
    title: "MOSFET Open-Loop Amplifier",
    domain: "Analog · CMOS",
    year: "2026",
    hook: "60 dB of gain and 500 kHz of bandwidth on a 1 mW power budget.",
    highlights: [
      "Cascaded NMOS/PMOS topology on a 3.3 V single supply using GlobalFoundries 180 nm parameters at 0.5 µm channel length.",
      "Every transistor sized and biased from hand calculations, then refined through DC sweeps to stay under 1 mW and 200 µA per branch.",
      "Predicted vs. simulated gain, bandwidth, swing, and power reconciled under a 10 kΩ / 2 pF load in a formal design report.",
    ],
    stack: ["SPICE", "GF 180nm", "Hand analysis"],
    status: { label: "Full spec met", tone: "settled" },
    preview: "analog",
  },
  {
    slug: "rover",
    title: "Rover Drive Stack",
    domain: "Robotics · Linux",
    year: "2026",
    hook: "Taking a six-wheeled rover from a broken build to a working drive system.",
    highlights: [
      "Debugged a chain of dependency and launch-file misconfigurations in a ROS 2 Humble stack on Ubuntu 22.04.",
      "Worked with mechanical and electrical subteams to resolve integration issues between software packages and hardware interfaces.",
    ],
    stack: ["ROS 2 Humble", "Ubuntu 22.04", "Linux"],
    status: { label: "TMU Robotics · ongoing", tone: "active" },
    preview: "rover",
  },
  {
    slug: "lstm",
    title: "LSTM Price Forecaster",
    domain: "ML · Time series",
    year: "2026",
    hook: "Next-day price prediction without letting the future leak into training.",
    highlights: [
      "End-to-end PyTorch LSTM on 5+ years of AAPL data with a 30-day sliding window and a chronological 80/20 split.",
      "Trained with MSE loss and Adam; evaluated with RMSE after inverse scaling and plotted predicted vs. actual in Matplotlib.",
    ],
    stack: ["PyTorch", "Pandas", "Matplotlib"],
    status: { label: "Complete", tone: "settled" },
    preview: "lstm",
  },
];

export const moreProjects = [
  {
    title: "8-bit ALU & FSM design",
    stack: "VHDL · Quartus II · ModelSim · DE10-Lite",
    when: "Fall 2025",
    note: "Control unit, register block, ALU core, and shared bus, plus Mealy and Moore FSMs with explicit invalid-state handling.",
  },
  {
    title: "Diode, regulator & rectifier characterization",
    stack: "Oscilloscope · Multisim · MATLAB",
    when: "Winter 2026",
    note: "Extracted the 1N4148's ideality factor and saturation current; ranked three regulator topologies on load regulation.",
  },
  {
    title: "BJT amplifier & buffering",
    stack: "2N3904 · Small-signal · Bench",
    when: "Winter 2026",
    note: "Two-stage CE–CC amplifier isolating a gain stage from heavy loading, verified against hand calculations.",
  },
  {
    title: "Algorithms & systems programming",
    stack: "C · GCC · make",
    when: "Winter 2026",
    note: "Instrumented insertion/merge sort, an FSM simulator with reachability analysis, a stack-based XML validator, and a heap.",
  },
  {
    title: "Object-oriented engineering software",
    stack: "Java · JUnit",
    when: "Fall 2025",
    note: "DC circuit modeller with SPICE-style netlist output, plus rental and shipping systems built on interfaces and polymorphism.",
  },
  {
    title: "Great Lakes ice concentration analysis",
    stack: "C · GNUplot",
    when: "2024–25",
    note: "Modular C analysis of NOAA daily ice data for 6 lakes (2021–2024) with auto-generated GNUplot trend plots.",
  },
];

export type PillarIcon = "cpu" | "board" | "workflow";

export const pillars: {
  n: string;
  title: string;
  icon: PillarIcon;
  body: string;
  points: string[];
  tools: string[];
}[] = [
  {
    n: "01",
    title: "Digital Design & Verification",
    icon: "cpu",
    body: "Synthesizable SystemVerilog and VHDL (ALUs, register files, immediate decoders, FSMs) checked against independent Python reference models with directed, constrained-random, and bit-sweep stimulus.",
    points: ["Golden-model scoreboards", "Seeded, replayable regressions", "Waveform-level mismatch tracing"],
    tools: ["SystemVerilog", "VHDL", "cocotb", "pytest", "ModelSim", "Quartus II"],
  },
  {
    n: "02",
    title: "Embedded & Analog Hardware",
    icon: "board",
    body: "ESP32 firmware for PWM motor drive and sensing, power-domain debugging on the bench, and analog design carried from hand calculations through SPICE to the oscilloscope.",
    points: ["H-bridge, LEDC PWM & servo control", "Transistor sizing to a power budget", "Predict → simulate → measure"],
    tools: ["ESP32", "C/C++", "SPICE", "Multisim", "KiCad", "Oscilloscope"],
  },
  {
    n: "03",
    title: "Software, Data & Automation",
    icon: "workflow",
    body: "Idempotent Python ETL pipelines, fault-tolerant scraping that survives unattended runs, SQL storage, ML models, and Linux / ROS 2 integration work.",
    points: ["Re-runnable pipeline stages", "Estimation models for missing data", "ROS 2 bring-up on Ubuntu"],
    tools: ["Python", "SQLAlchemy", "Selenium", "scikit-learn", "PyTorch", "ROS 2"],
  },
];

export const education = {
  school: "Toronto Metropolitan University",
  degree: "B.Eng, Electrical Engineering",
  period: "Sep 2024 – Apr 2029",
  gpa: "4.20",
  gpaScale: "/ 4.33",
  program: "FEAS co-op",
  location: "Toronto, ON",
} as const;

export const currently = {
  summary:
    "Third-year EE student in the co-op program. Right now I'm taking my RV32I core from verified building blocks to a full single-cycle CPU, writing drive software with the TMU Robotics Rover Team, and looking for a hardware or verification co-op.",
  stats: [
    { value: education.gpa, unit: education.gpaScale, label: "Cumulative GPA" },
    { value: "12,000+", label: "Vectors vs. golden model" },
    { value: "2,341", label: "Venues through my ETL pipeline" },
  ],
};

export interface Role {
  org: string;
  orgNote?: string;
  title: string;
  period: string;
  location: string;
  bullets: string[];
  tags?: string[];
  current?: boolean;
}

export const work: Role[] = [
  {
    org: "Awksion",
    orgNote: "Startup",
    title: "Software Engineering Intern",
    period: "Jan – Apr 2026",
    location: "Remote",
    bullets: [
      "Architected an idempotent Python ETL pipeline that ingested and validated 2,341 North American venues into SQLite/WAL.",
      "Backfilled capacity for 350+ venues with a scikit-learn model fusing geospatial footprint analysis and fire-code occupancy heuristics.",
      "Scored venue–artist leads by tiering 244 artists via the Last.fm and Spotify APIs behind a 3-layer filter, and walked a non-technical founder through the trade-offs.",
    ],
    tags: ["Python", "Selenium", "SQLAlchemy", "SQLite", "scikit-learn"],
  },
  {
    org: "Toronto Metropolitan University",
    orgNote: "Student Life & Learning Support",
    title: "Math Support Assistant",
    period: "Sep 2025 – Apr 2026",
    location: "Toronto, ON",
    bullets: [
      "Supported 30–50 students per shift, triaging session requests and managing real-time scheduling.",
      "Standardized 100+ attendance, payroll, and inventory records for weekly reports, and resolved 10+ scheduling conflicts per shift.",
    ],
  },
  {
    org: "HUNGRY",
    title: "Catering Delivery Captain",
    period: "Sep 2025 – Present",
    location: "Toronto, ON",
    bullets: [
      "Coordinate high-volume, multi-stop catering logistics, verifying order accuracy across clients, vendors, and the internal team.",
    ],
    current: true,
  },
  {
    org: "Rogers Centre",
    title: "Vending Attendant",
    period: "Sep – Nov 2025",
    location: "Toronto, ON",
    bullets: ["Kept inventory and point-of-sale reconciliation accurate under event-time pressure."],
  },
];

export const leadership: Role[] = [
  {
    org: "TMU Robotics Rover Team",
    title: "Member, Drive Software",
    period: "2025 – Present",
    location: "Toronto, ON",
    bullets: [
      "Brought the six-wheeled rover's ROS 2 drive stack online; coordinate with mechanical and electrical subteams during build and test sessions.",
    ],
    current: true,
  },
  {
    org: "TMU Engineering Outreach",
    title: "Ambassador",
    period: "2024 – Present",
    location: "Toronto, ON",
    bullets: [
      "Lead hands-on STEM workshops for Grades 1–12 across 5+ programs (Badge Day, Go CODE Girl, Go ENG, CAGIS, FuturEng), covering LED circuit, Arduino, and glider builds.",
    ],
    current: true,
  },
  {
    org: "GVIC Engineering Conference",
    title: "Organizer",
    period: "2025 – 2026",
    location: "Toronto, ON",
    bullets: ["Coordinated schedules, workshops, and follow-up action items across the planning team."],
  },
  {
    org: "MEC 2025",
    title: "Organizer",
    period: "May – Nov 2025",
    location: "Toronto, ON",
    bullets: ["Co-developed a debate-style engineering ethics event and supported a student-facing competition."],
  },
];

export const toolbox = [
  { label: "Languages", items: ["SystemVerilog", "VHDL", "Python", "C", "C++", "Java", "MATLAB", "Bash", "SQL"] },
  { label: "HDL & EDA", items: ["Icarus Verilog", "ModelSim", "Quartus II", "Multisim", "KiCad / SPICE", "DE10-Lite"] },
  { label: "Verification", items: ["cocotb", "pytest", "JUnit", "Golden models", "Constrained-random", "Waveform debug"] },
  { label: "Bench", items: ["Oscilloscope", "Function generator", "Multimeter", "Bench supply", "Soldering", "ESP32"] },
  { label: "Data & systems", items: ["SQLAlchemy", "Selenium", "scikit-learn", "PyTorch", "Pandas", "Linux", "ROS 2", "Git"] },
];

export const coursework = [
  { code: "ELE404", name: "Electronic Circuits I", term: "W26" },
  { code: "COE428", name: "Data Structures & Algorithms", term: "W26" },
  { code: "COE328", name: "Digital Systems", term: "F25" },
  { code: "COE318", name: "Object-Oriented Programming", term: "F25" },
  { code: "CPS188", name: "Computer Science for Engineers", term: "24–25" },
];

export const certifications = ["Standard First Aid, CPR & AED", "WHMIS"];
