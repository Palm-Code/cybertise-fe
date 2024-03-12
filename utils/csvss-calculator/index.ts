import {
  AttackComplexity,
  AttackVector,
  Availability,
  Confidentiality,
  Integrity,
  PrivilegesRequired,
  Scope,
  UserInteraction,
} from "@/enums";
import { MetricValues } from "@/types/admin/programs";

export function calculateCSVSS(metricValues: MetricValues): number {
  const {
    attackVector,
    attackComplexity,
    privilegesRequired,
    userInteraction,
    scope,
    confidentiality,
    integrity,
    availability,
  } = metricValues;

  // Base Score
  let baseScore = 0;
  let impact = 0;
  let exploitability = 0;

  switch (confidentiality) {
    case Confidentiality.NONE:
      impact = 0;
      break;
    case Confidentiality.LOW:
      impact = 0.22;
      break;
    case Confidentiality.HIGH:
      impact = 0.56;
      break;
    default:
      break;
  }

  switch (integrity) {
    case Integrity.NONE:
      // Do nothing, impact remains unchanged
      break;
    case Integrity.LOW:
      impact = Math.max(impact, 0.22);
      break;
    case Integrity.HIGH:
      impact = Math.max(impact, 0.56);
      break;
    default:
      break;
  }

  switch (availability) {
    case Availability.NONE:
      // Do nothing, impact remains unchanged
      break;
    case Availability.LOW:
      impact = Math.max(impact, 0.22);
      break;
    case Availability.HIGH:
      impact = Math.max(impact, 0.56);
      break;
    default:
      break;
  }

  switch (scope) {
    case Scope.UNCHANGED:
      exploitability = 8.22;
      break;
    case Scope.CHANGED:
      exploitability = 7.52;
      break;
    default:
      break;
  }

  switch (attackVector) {
    case AttackVector.PHYSICAL:
      exploitability = Math.min(exploitability, 0.56);
      break;
    case AttackVector.LOCAL:
      exploitability = Math.min(exploitability, 0.395);
      break;
    case AttackVector.ADJACENT_NETWORK:
      exploitability = Math.min(exploitability, 0.646);
      break;
    case AttackVector.NETWORK:
      exploitability = Math.min(exploitability, 1);
      break;
    default:
      break;
  }

  switch (attackComplexity) {
    case AttackComplexity.HIGH:
      exploitability = Math.min(exploitability, 0.35);
      break;
    case AttackComplexity.LOW:
      exploitability = Math.min(exploitability, 0.61);
      break;
    default:
      break;
  }

  switch (privilegesRequired) {
    case PrivilegesRequired.NONE:
      exploitability = Math.min(exploitability, 0.85);
      break;
    case PrivilegesRequired.LOW:
      exploitability = Math.min(exploitability, 0.62);
      break;
    case PrivilegesRequired.HIGH:
      exploitability = Math.min(exploitability, 0.27);
      break;
    default:
      break;
  }

  switch (userInteraction) {
    case UserInteraction.NONE:
      exploitability = Math.min(exploitability, 0.85);
      break;
    case UserInteraction.REQUIRED:
      exploitability = Math.min(exploitability, 0.62);
      break;
    default:
      break;
  }

  baseScore = 0.6 * impact + 0.4 * exploitability;

  // Temporal Score and Environmental Score are not implemented in this function

  return baseScore;
}
