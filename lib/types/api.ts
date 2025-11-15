/**
 * API Types
 * Shared types for API requests and responses
 */

export interface IOAuthTokenResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  scope?: string;
  authuser?: string;
  prompt?: string;
}

export interface IUser {
  id?: string;
  sub?: string;
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

export interface LoginResponse {
  user: IUser;
  token: string;
}

export interface CheckTokenResponse {
  user: IUser;
  isValid: boolean;
}

export interface Web {
  id: string;
  name: string;
  content: string;
  domain: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

