// ─── Obstacle Types ────────────────────────────────────────────────────────
export type ObstacleType =
  | "valla"
  | "doble_valla"
  | "triple_valla"
  | "spread"
  | "neumatico"
  | "pasarela"
  | "balancin"
  | "tunel_rigido"
  | "tunel_blando"
  | "slalom"
  | "mesa"
  | "salto_agua";

export interface Obstacle {
  id: string;
  type: ObstacleType;
  sequence_number: number;
  x_m: number;
  y_m: number;
  rotation_deg: number;
  jump_height_cm?: number;
  label?: string;
}

export type AgilityCategory = "S" | "M" | "L" | "XS";
export type Ruleset = "FCI_2023" | "AKC" | "FCM";

export interface CourseValidation {
  is_valid: boolean;
  errors: ValidationMessage[];
  warnings: ValidationMessage[];
}

export interface ValidationMessage {
  code: string;
  message: string;
  obstacle_ids?: string[];
}

export interface Course {
  id: string;
  name: string;
  category: AgilityCategory;
  ruleset: Ruleset;
  canvas_width_m: number;
  canvas_height_m: number;
  obstacles: Obstacle[];
  validation: CourseValidation;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export type SessionResult = "clean" | "faults" | "eliminated" | "dnf";

export interface TrainingSession {
  id: string;
  date: string;
  dog_name: string;
  course_id?: string;
  course_name?: string;
  result: SessionResult;
  time_seconds?: number;
  faults: number;
  notes?: string;
  created_at?: string;
}

export interface CompetitionResult {
  id: string;
  date: string;
  event_name: string;
  location?: string;
  category: AgilityCategory;
  run_type: "agility" | "jumping";
  result: SessionResult;
  time_seconds?: number;
  standard_time?: number;
  faults: number;
  placement?: number;
  judge?: string;
  notes?: string;
  created_at?: string;
}
