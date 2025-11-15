/**
 * Client-side Auth Helpers
 * 
 * @deprecated This file is deprecated. Use server actions instead:
 * - Use `googleAuth` from '@/lib/actions/auth-action' instead of `googleAuthClient`
 * - Use `checkToken` from '@/lib/actions/auth-action' instead of `checkTokenClient`
 * 
 * Server actions provide better security (httpOnly cookies) and performance.
 * They can still be called from client components.
 */

'use client';

import { apiFetch, setClientCookie } from '@/lib/utils/fetch';
import { API_ROUTES } from '@/lib/constants/api-routes';
import { ApiResponse, IUser, LoginResponse } from '@/lib/types/api';

/**
 * Google Auth - Client-side version that sets cookies in browser
 */
export const googleAuthClient = async (accessToken: string): Promise<ApiResponse<{ user: IUser }>> => {
  try {
    const response = await apiFetch<LoginResponse>(
      API_ROUTES.AUTH.GOOGLE_AUTH,
      {
        method: 'POST',
        body: JSON.stringify({ access_token: accessToken }),
        requireAuth: false,
        serverSide: false,
      }
    );

    if (response.error) {
      return { error: response.error };
    }

    // Set cookie client-side
    if (response.data?.token) {
      setClientCookie('token', response.data.token, 24 * 60 * 60);
    }

    return {
      data: { user: response.data?.user! },
      message: 'Google authentication successful',
    };
  } catch (error: unknown) {
    console.error('Google auth failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Google authentication failed';
    return { error: errorMessage };
  }
};

/**
 * Check Token - Client-side version
 */
export const checkTokenClient = async (): Promise<ApiResponse<{ user: IUser; isValid: boolean }>> => {
  try {
    const response = await apiFetch<{ user: IUser; isValid: boolean }>(
      API_ROUTES.AUTH.CHECK_TOKEN,
      {
        method: 'GET',
        requireAuth: true,
        serverSide: false,
      }
    );

    if (response.error) {
      return { error: response.error };
    }

    return {
      data: response.data,
      message: 'Token validation successful',
    };
  } catch (error: unknown) {
    console.error('Token check failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Token validation failed';
    return { error: errorMessage };
  }
};

