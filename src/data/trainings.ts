import type { Category, Training } from "../types";

export const categories: Category[] = [
  {
    id: "height",
    index: "01",
    name: "Work at height",
    blurb: "Fall arrest, scaffold discipline, and rescue readiness for elevated work.",
  },
  {
    id: "fire",
    index: "02",
    name: "Fire & emergency",
    blurb: "Extinguisher selection, evacuation command, and first response under pressure.",
  },
  {
    id: "electrical",
    index: "03",
    name: "Electrical safety",
    blurb: "Isolation, lockout / tagout, and arc flash boundary discipline.",
  },
  {
    id: "confined",
    index: "04",
    name: "Confined space",
    blurb: "Atmospheric testing, entry permits, and attendant protocol.",
  },
  {
    id: "machinery",
    index: "05",
    name: "Heavy machinery",
    blurb: "Pre-operation checks, lifting plans, and pedestrian separation.",
  },
  {
    id: "hazmat",
    index: "06",
    name: "Hazardous materials",
    blurb: "Spill containment, PPE selection, and decontamination order.",
  },
];

export const trainings: Training[] = [
  {
    slug: "fall-arrest-inspection",
    title: "Fall arrest system inspection",
    category: "height",
    difficulty: "Intermediate",
    durationMin: 18,
    modules: 6,
    summary:
      "Inspect a full-body harness and lanyard against manufacturer criteria, then reject or return the kit to service.",
    objectives: [
      "Identify the five inspection zones of a full-body harness",
      "Trace webbing, stitching, and hardware for damage",
      "Apply rejection criteria for shock-loaded or expired equipment",
      "Complete a legible equipment inspection tag",
    ],
    equipment: [
      "Full-body harness",
      "Shock-absorbing lanyard",
      "Inspection log",
      "Anchor point gauge",
    ],
    safety: [
      "Inspect in a clean, well-lit area — never on a live anchor point.",
      "Treat any deployed shock absorber as out of service.",
      "Do not attempt field repair of webbing or stitching.",
      "Record the rejection before removing the kit from the store.",
    ],
    sector: "Construction",
    featured: true,
  },
  {
    slug: "extinguisher-selection",
    title: "Fire response: extinguisher selection",
    category: "fire",
    difficulty: "Foundation",
    durationMin: 12,
    modules: 5,
    summary:
      "Read the fire class, choose the correct extinguisher, and apply the PASS technique under a timed scenario.",
    objectives: [
      "Classify fires from A to F by fuel source",
      "Select the correct extinguisher by class and size",
      "Apply the PASS technique without breaking the discharge",
      "Decide when to stop and evacuate instead",
    ],
    equipment: [
      "Water extinguisher",
      "CO₂ extinguisher",
      "Foam extinguisher",
      "Fire blanket",
    ],
    safety: [
      "Never use water on live electrical equipment.",
      "Keep an exit at your back at all times.",
      "Abandon extinguisher use if smoke density rises.",
      "Report every discharge so the unit is refilled.",
    ],
    sector: "Manufacturing",
    featured: true,
  },
  {
    slug: "loto-sequence",
    title: "Electrical lockout / tagout sequence",
    category: "electrical",
    difficulty: "Intermediate",
    durationMin: 22,
    modules: 7,
    summary:
      "Isolate a distribution board, apply locks and tags, and verify zero energy before maintenance begins.",
    objectives: [
      "Identify every energy source feeding the equipment",
      "Sequence shutdown, isolation, and stored-energy release",
      "Apply a personal lock and danger tag",
      "Verify zero energy with a proven tester",
    ],
    equipment: [
      "Lockout hasp",
      "Personal padlock",
      "Danger tags",
      "Voltage tester",
      "Isolation schedule",
    ],
    safety: [
      "Never rely on a tag alone — always apply a personal lock.",
      "Test the tester on a known live source first.",
      "Treat every conductor as live until verified.",
      "One lock, one person, one key.",
    ],
    sector: "Energy",
    featured: true,
  },
  {
    slug: "confined-space-entry",
    title: "Confined space entry & atmospheric testing",
    category: "confined",
    difficulty: "Advanced",
    durationMin: 28,
    modules: 8,
    summary:
      "Complete a permit, test the atmosphere in the correct order, and run a supervised entry with an attendant on station.",
    objectives: [
      "Read and complete an entry permit",
      "Test oxygen, flammables, and toxics in the correct order",
      "Brief the entrant and the attendant before entry",
      "Recognise abort criteria and stop the entry",
    ],
    equipment: [
      "Four-gas monitor",
      "Calibration gas",
      "Tripod and winch",
      "Entry permit",
      "Full-body harness",
    ],
    safety: [
      "Never enter before the atmosphere is proven safe.",
      "The attendant must remain at the entry point.",
      "Re-test after any break in the entry.",
      "Abort immediately on alarm or loss of communication.",
    ],
    sector: "Utilities",
    featured: true,
  },
  {
    slug: "forklift-walkaround",
    title: "Forklift pre-operation walkaround",
    category: "machinery",
    difficulty: "Foundation",
    durationMin: 15,
    modules: 6,
    summary:
      "Run a 360° walkaround, check fluid levels and load handling equipment, and log defects before the shift.",
    objectives: [
      "Follow a consistent walkaround route",
      "Inspect tyres, forks, chains, and restraints",
      "Verify fluid levels and warning devices",
      "Record and escalate defects before operation",
    ],
    equipment: [
      "Counterbalance forklift",
      "Inspection checklist",
      "Wheel chock",
      "Grease gun",
    ],
    safety: [
      "Chock the wheels before inspecting underneath.",
      "Never place hands between mast sections.",
      "Remove defective trucks from service immediately.",
      "Sound the horn before reversing.",
    ],
    sector: "Logistics",
    featured: false,
  },
  {
    slug: "spill-containment",
    title: "Chemical spill containment",
    category: "hazmat",
    difficulty: "Intermediate",
    durationMin: 20,
    modules: 6,
    summary:
      "Size up a solvent spill, select PPE, contain the spread, and package the waste for safe disposal.",
    objectives: [
      "Identify the substance from the label and safety data sheet",
      "Select compatible personal protective equipment",
      "Deploy absorbent and containment booms",
      "Package, label, and store waste correctly",
    ],
    equipment: [
      "Nitrile gloves",
      "Face shield",
      "Absorbent pads",
      "Containment boom",
      "Waste bags",
    ],
    safety: [
      "Do not attempt containment without reading the SDS.",
      "Evacuate and call for help if the substance is unknown.",
      "Never mix waste streams.",
      "Decontaminate tools before storage.",
    ],
    sector: "Chemical",
    featured: false,
  },
  {
    slug: "scaffold-erection",
    title: "Scaffold erection fundamentals",
    category: "height",
    difficulty: "Advanced",
    durationMin: 32,
    modules: 9,
    summary:
      "Lay out a mobile scaffold, sequence standards and ledgers, and verify bracing and guardrail heights.",
    objectives: [
      "Select compliant scaffold components",
      "Sequence erection from a level, stable base",
      "Verify bracing, tie patterns, and guardrail heights",
      "Inspect access and platform decking",
    ],
    equipment: [
      "Standards",
      "Ledgers",
      "Base plates",
      "Guardrails",
      "Spirit level",
    ],
    safety: [
      "Never erect on unstable or sloping ground.",
      "Do not climb the scaffold frame — use the ladder.",
      "Keep the platform fully decked and secured.",
      "Tag incomplete scaffolds as do not use.",
    ],
    sector: "Construction",
    featured: false,
  },
  {
    slug: "evacuation-warden",
    title: "Emergency evacuation warden",
    category: "fire",
    difficulty: "Foundation",
    durationMin: 14,
    modules: 5,
    summary:
      "Sweep an assigned zone, direct occupants to the correct assembly point, and report headcount to the marshal.",
    objectives: [
      "Confirm the alarm and your assigned zone",
      "Sweep rooms in a defined order",
      "Direct occupants to the correct assembly point",
      "Report headcount and missing persons",
    ],
    equipment: [
      "High-visibility vest",
      "Torch",
      "Zone map",
      "Two-way radio",
    ],
    safety: [
      "Never use lifts during an evacuation.",
      "Do not re-enter until the marshal clears the building.",
      "Keep stairwells clear and move to the right.",
      "Report missing persons — never search alone.",
    ],
    sector: "Facilities",
    featured: false,
  },
  {
    slug: "crane-lift-plan",
    title: "Crane lift plan verification",
    category: "machinery",
    difficulty: "Advanced",
    durationMin: 26,
    modules: 8,
    summary:
      "Verify load weight, rigging capacity, and exclusion zones against a lift plan before the signal is given.",
    objectives: [
      "Read the lift plan and the crane load chart",
      "Calculate rigging capacity for the configuration",
      "Confirm the exclusion zone and tag line positions",
      "Identify stop conditions before the lift",
    ],
    equipment: [
      "Lift plan",
      "Load chart",
      "Rigging slings",
      "Tag lines",
      "Exclusion tape",
    ],
    safety: [
      "Never exceed the rated capacity of any component.",
      "Keep all personnel outside the drop zone.",
      "Stop the lift if the load becomes uncontrolled.",
      "Only one appointed signaler at a time.",
    ],
    sector: "Construction",
    featured: false,
  },
  {
    slug: "arc-flash-boundaries",
    title: "Arc flash boundaries",
    category: "electrical",
    difficulty: "Advanced",
    durationMin: 24,
    modules: 7,
    summary:
      "Establish approach boundaries, select arc-rated PPE, and plan a de-energised response to a fault.",
    objectives: [
      "Read the incident energy label on the equipment",
      "Set limited and restricted approach boundaries",
      "Select arc-rated PPE for the task",
      "Plan a safe response to an arc event",
    ],
    equipment: [
      "Incident energy label",
      "Arc-rated suit",
      "Insulated gloves",
      "Boundary tape",
      "Lockout kit",
    ],
    safety: [
      "De-energise before work wherever practicable.",
      "Never cross the restricted boundary without full PPE.",
      "Use a voltage-rated tool set.",
      "Stand clear of the arc path when switching.",
    ],
    sector: "Energy",
    featured: false,
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getTraining(slug: string): Training | undefined {
  return trainings.find((training) => training.slug === slug);
}

export function categoryName(id: string): string {
  return getCategory(id)?.name ?? "Uncategorised";
}
