// Function to detect both browser and OS
export const getBrowserAndOS = (userAgent: string): string => {
  let browser = "Unknown";
  let os = "Unknown";

  // Detect browser
  if (/firefox|fxios/i.test(userAgent)) {
    browser = "Firefox";
  } else if (/edg/i.test(userAgent)) {
    browser = "Edge";
  } else if (/chrome|crios/i.test(userAgent)) {
    browser = "Chrome";
  } else if (/safari/i.test(userAgent)) {
    browser = "Safari";
  } else if (/opr\//i.test(userAgent)) {
    browser = "Opera";
  }

  // Detect OS
  if (/windows nt/i.test(userAgent)) {
    os = "Windows";
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    os = "MacOS";
  } else if (/android/i.test(userAgent)) {
    os = "Android";
  } else if (/linux/i.test(userAgent)) {
    os = "Linux";
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    os = "iOS";
  }

  return `${browser} on ${os}`;
};
