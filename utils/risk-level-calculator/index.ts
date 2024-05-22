export const riskLevelCalculator = (risk: number) => {
  if (risk > 0 && risk < 4) {
    return "low";
  } else if (risk >= 4 && risk < 7) {
    return "medium";
  } else if (risk >= 7 && risk < 9) {
    return "high";
  } else if (risk >= 9) {
    return "critical";
  } else {
    return "no";
  }
};
