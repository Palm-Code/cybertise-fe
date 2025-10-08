export function getDifferencesAsArray(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): Array<{ property: string; oldValue: any; newValue: any }> {
  const differences: Array<{ property: string; oldValue: any; newValue: any }> =
    [];

  for (const key in obj1) {
    let oldValue = obj2[key];
    let newValue = obj1[key];

    // Check if the value is a number and handle the conversion to ON/OFF
    if (typeof oldValue === "number" && typeof newValue === "number") {
      oldValue = oldValue === 1 ? "ON" : "OFF";
      newValue = newValue === 1 ? "ON" : "OFF";
    }

    if (oldValue !== newValue) {
      differences.push({
        property: key,
        oldValue,
        newValue,
      });
    }
  }

  return differences;
}
