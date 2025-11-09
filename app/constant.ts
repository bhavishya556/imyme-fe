export const BUTTON_TEXT = "Google Login";
export const LOCALE_LABEL = "Locale:";
export const GOOGLE_LOGIN_ERROR = "Google Login Error:";
export const GOOGLE_AUTH_RESULT = "Google Auth Result:";
export const USER_INFO = "User Info:";
export const ERROR_FETCHING_USER_INFO = "Error fetching user info:";
export const PROFILE_ALT_TEXT = "Profile";

export interface IOAuthTokenResponse {
    access_token: string; // The actual access token (JWT or opaque string)
    token_type?: string;   // Usually "Bearer"
    expires_in?: number;   // Time in seconds until expiry
    scope?: string;        // Space-separated list of scopes granted
    authuser?: string;    // Optional: index of account in multi-login context
    prompt?: string;      // Optional: prompt type, e.g., "none"
}


export interface IUser {
  id?: string;
  sub?: string;           // Google user ID
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}


export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}