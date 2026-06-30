import type { Course, Obstacle, CourseValidation, ValidationMessage } from "@/types";

// FCI 2023 rules
const FCI_RULES = {
  // Obstacle counts per category
  obstacleCount: { min: 14, max: 22 },
  jumpCount: { min: 6, max: 12 },
  // Distances (meters)
  minDistanceBetweenObstacles: 5.0,
  maxDistanceBetweenObstacles: 7.0,
  minStartFinishDistance: 6.0,
  // Table
  tableCount: { min: 0, max: 1 },
  // Slalom
  slalomCount: { min: 1, max: 1 },
  slalomPoleCount: 12,
  // Tunnel max consecutive
  maxConsecutiveTunnels: 2,
};

function distance(a: Obstacle, b: Obstacle): number {
  return Math.sqrt(Math.pow(a.x_m - b.x_m, 2) + Math.pow(a.y_m - b.y_m, 2));
}

export function validateCourse(course: Course): CourseValidation {
  const errors: ValidationMessage[] = [];
  const warnings: ValidationMessage[] = [];
  const obs = [...course.obstacles].sort((a, b) => a.sequence_number - b.sequence_number);

  // 1. Obstacle count
  if (obs.length < FCI_RULES.obstacleCount.min) {
    errors.push({
      code: "E_COUNT_LOW",
      message: `Mínimo ${FCI_RULES.obstacleCount.min} obstáculos requeridos (tienes ${obs.length})`,
    });
  }
  if (obs.length > FCI_RULES.obstacleCount.max) {
    errors.push({
      code: "E_COUNT_HIGH",
      message: `Máximo ${FCI_RULES.obstacleCount.max} obstáculos permitidos (tienes ${obs.length})`,
    });
  }

  // 2. Slalom count
  const slalomCount = obs.filter((o) => o.type === "slalom").length;
  if (slalomCount === 0) {
    warnings.push({ code: "W_NO_SLALOM", message: "Se recomienda incluir al menos un slalom" });
  }
  if (slalomCount > FCI_RULES.slalomCount.max) {
    errors.push({ code: "E_TOO_MANY_SLALOM", message: "Solo se permite 1 slalom por recorrido" });
  }

  // 3. Table count
  const tableCount = obs.filter((o) => o.type === "mesa").length;
  if (tableCount > FCI_RULES.tableCount.max) {
    errors.push({ code: "E_TOO_MANY_TABLES", message: "Solo se permite 1 mesa por recorrido" });
  }

  // 4. Distances between consecutive obstacles
  for (let i = 0; i < obs.length - 1; i++) {
    const d = distance(obs[i], obs[i + 1]);
    if (d < FCI_RULES.minDistanceBetweenObstacles) {
      errors.push({
        code: "E_TOO_CLOSE",
        message: `Obstáculos #${obs[i].sequence_number} y #${obs[i + 1].sequence_number} están muy juntos (${d.toFixed(1)}m, mínimo ${FCI_RULES.minDistanceBetweenObstacles}m)`,
        obstacle_ids: [obs[i].id, obs[i + 1].id],
      });
    }
    if (d > FCI_RULES.maxDistanceBetweenObstacles) {
      warnings.push({
        code: "W_TOO_FAR",
        message: `Obstáculos #${obs[i].sequence_number} y #${obs[i + 1].sequence_number} están muy separados (${d.toFixed(1)}m, máximo sugerido ${FCI_RULES.maxDistanceBetweenObstacles}m)`,
        obstacle_ids: [obs[i].id, obs[i + 1].id],
      });
    }
  }

  // 5. Consecutive tunnels
  let consecutiveTunnels = 0;
  for (const o of obs) {
    if (o.type === "tunel_rigido" || o.type === "tunel_blando") {
      consecutiveTunnels++;
      if (consecutiveTunnels > FCI_RULES.maxConsecutiveTunnels) {
        warnings.push({
          code: "W_CONSECUTIVE_TUNNELS",
          message: "Más de 2 túneles consecutivos — revisa el flujo",
          obstacle_ids: [o.id],
        });
      }
    } else {
      consecutiveTunnels = 0;
    }
  }

  return {
    is_valid: errors.length === 0,
    errors,
    warnings,
  };
}
