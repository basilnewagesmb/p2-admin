export const AppConfig = {
  API_BASE_URL: process.env.API_BASE_URL || "http://localhost:3000",
  PAGE_LIMIT: process.env.PAGE_LIMIT || 20,
};

export const storageKeys = {
  ACCESS_TOKEN: "access-token",
  REFRESH_TOKEN: "refresh-token",
  SESSION_ID: "session-id",
  USER_DETAILS: "user",
  TOKEN_EXPIRY: "token_expiry",
};

export const tableLimit = 10;

export const residentialTypes = [
  "Single Family Home",
  "Townhouse",
  "Multi Family",
  "Condos / Co-ops",
  "Manufactured",
  "Mobile Home",
  "Commercial Property",
];

export const landTypes = ["Commercial Land", "Lots / Land"];
