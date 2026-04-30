const DEFAULT_API_URL = "https://black-phoenixx-backend.onrender.com";

export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

export const SERVER_API_URL =
  process.env.API_SERVER_URL || PUBLIC_API_URL;
