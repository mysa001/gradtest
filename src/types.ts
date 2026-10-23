export type CategoryId =
  | "height"
  | "fire"
  | "electrical"
  | "confined"
  | "machinery"
  | "hazmat";

export type Difficulty = "Foundation" | "Intermediate" | "Advanced";

export interface Category {
  id: CategoryId;
  index: string;
  name: string;
  blurb: string;
}

export interface Training {
  slug: string;
  title: string;
  category: CategoryId;
  difficulty: Difficulty;
  durationMin: number;
  modules: number;
  summary: string;
  objectives: string[];
  equipment: string[];
  safety: string[];
  sector: string;
  featured: boolean;
}

export type TrainingStatus = "completed" | "in-progress" | "assigned";

export interface ProgressEntry {
  slug: string;
  status: TrainingStatus;
  progress: number;
  score?: number;
  sessions: number;
  lastSession: string;
}
