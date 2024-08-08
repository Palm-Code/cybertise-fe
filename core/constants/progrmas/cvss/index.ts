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

export const initialCvssValues = {
  av: AttackVector.NETWORK,
  ac: AttackComplexity.LOW,
  pr: PrivilegesRequired.NONE,
  ui: UserInteraction.NONE,
  s: Scope.UNCHANGED,
  c: Confidentiality.NONE,
  i: Integrity.NONE,
  a: Availability.NONE,
};
