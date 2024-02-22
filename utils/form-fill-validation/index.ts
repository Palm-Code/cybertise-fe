export const isObjectEmpty = (obj = {}) => {
  for (const value of Object.values(obj)) {
    if (value === "") {
      return true; // Object contains an empty string
    }
  }
  return false; // Object does not contain an empty string
};
