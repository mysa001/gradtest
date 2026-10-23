import type { ProgressEntry } from "../types";

export const student = {
  name: "Omar Haddad",
  initials: "OH",
  role: "Maintenance technician",
  org: "Northline Industrial",
  headset: "Meta Quest 3",
  cohort: "Cohort 04",
  supervisor: "L. Mansour",
};

/** Demo record only — no backend is connected in this prototype. */
export const progress: ProgressEntry[] = [
  { slug: "fall-arrest-inspection", status: "completed", progress: 100, score: 92, sessions: 3, lastSession: "12 Oct 2026" },
  { slug: "extinguisher-selection", status: "completed", progress: 100, score: 88, sessions: 2, lastSession: "09 Oct 2026" },
  { slug: "loto-sequence", status: "in-progress", progress: 65, sessions: 2, lastSession: "20 Oct 2026" },
  { slug: "forklift-walkaround", status: "in-progress", progress: 40, sessions: 1, lastSession: "18 Oct 2026" },
  { slug: "confined-space-entry", status: "assigned", progress: 0, sessions: 0, lastSession: "Assigned 14 Oct 2026" },
  { slug: "arc-flash-boundaries", status: "assigned", progress: 0, sessions: 0, lastSession: "Assigned 14 Oct 2026" },
];
