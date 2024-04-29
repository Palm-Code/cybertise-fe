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
  const { av, a, ac, c, i, pr, s, ui } = metricValues;

  let impact = 0;
  let exploitability = 0;

  switch (c) {
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

  switch (i) {
    case Integrity.NONE:
      impact = Math.max(impact, 0);
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

  switch (a) {
    case Availability.NONE:
      impact = Math.max(impact, 0);
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

  switch (s) {
    case Scope.UNCHANGED:
      exploitability = 8.22;
      break;
    case Scope.CHANGED:
      exploitability = 7.52;
      break;
    default:
      break;
  }

  switch (av) {
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

  switch (ac) {
    case AttackComplexity.HIGH:
      exploitability = Math.min(exploitability, 0.35);
      break;
    case AttackComplexity.LOW:
      exploitability = Math.min(exploitability, 0.61);
      break;
    default:
      break;
  }

  switch (pr) {
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

  switch (ui) {
    case UserInteraction.NONE:
      exploitability = Math.min(exploitability, 0.85);
      break;
    case UserInteraction.REQUIRED:
      exploitability = Math.min(exploitability, 0.62);
      break;
    default:
      break;
  }

  // Calculate Base Score using the CVSS formula
  const exploitabilityCoefficient =
    8.22 * (1 - 0.02 * Math.min(impact + exploitability, 10));
  const impactCoefficient = 1.0 - (1.0 - impact) * (1.0 - exploitability);
  const baseScore =
    (0.6 * impactCoefficient + 0.4 * exploitabilityCoefficient - 1.5) * 10;

  // Limit the output to a maximum of two decimal places
  return parseFloat(baseScore.toFixed(2));
}
