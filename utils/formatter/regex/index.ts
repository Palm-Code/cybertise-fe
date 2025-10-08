/**
 * Regex for website validation
 * @example
 * "https://www.google.com"
 * "http://www.google.com"
 * "www.google.com"
 * "google.com"
 * "google"
 * "google.com/search"
 */

export const websiteRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
