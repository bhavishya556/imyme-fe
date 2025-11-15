/**
 * API Routes Constants
 * All API endpoints are centralized here for easy maintenance
 */

export const API_ROUTES = {
  // Auth Routes
  AUTH: {
    EMAIL_LOGIN: "/api/v1/auth/login",
    EMAIL_REGISTER: "/api/v1/auth/register",
    GOOGLE_AUTH: "/api/v1/auth/google",
    LINKEDIN_AUTH: "/api/v1/auth/linkedin",
    CHECK_TOKEN: "/api/v1/auth/check-token",
  },
  
  // Web Routes
  WEB: {
    CREATE: "/api/v1/web",
    GET_ALL: "/api/v1/web",
    GET_BY_ID: (id: string) => `/api/v1/web/${id}`,
    UPDATE: (id: string) => `/api/v1/web/${id}`,
    DELETE: (id: string) => `/api/v1/web/${id}`,
  },
  
  // Admin Routes
  ADMIN: {
    LOGIN: "/api/v1/admin/login-admin",
    VALIDATE: "/api/v1/admin/validate-admin",
  },
} as const;

