const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "/base-api";

export { BASE_URL };
