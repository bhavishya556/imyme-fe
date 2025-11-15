/**
 * API Routes Constants
 * All API endpoints are centralized here for easy maintenance
 */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || "http://localhost:4000";

export const API_ROUTES = {
  AUTH: {
    EMAIL_LOGIN: BASE_URL + "/api/v1/auth/login",
    EMAIL_REGISTER: BASE_URL + "/api/v1/auth/register",
    GOOGLE_AUTH: BASE_URL + "/api/v1/auth/google",
    LINKEDIN_AUTH: BASE_URL + "/api/v1/auth/linkedin",
    CHECK_TOKEN: BASE_URL + "/api/v1/auth/check-token",
  },

  WEB: {
    CREATE: BASE_URL + "/api/v1/web",
    GET_ALL: BASE_URL + "/api/v1/web",
  },
} as const;


