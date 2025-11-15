'use server';

import { apiFetch } from '@/lib/utils/fetch';
import { API_ROUTES } from '@/lib/constants/api-routes';
import { ApiResponse, IUser, LoginResponse } from '@/lib/types/api';
import { cookies } from 'next/headers';
import { cookiePayload } from './cookie';

export const googleAuth = async (accessToken: string): Promise<ApiResponse<{ user: IUser }>> => {
  try {
    const response = await apiFetch<LoginResponse>(
      API_ROUTES.AUTH.GOOGLE_AUTH,
      {
        method: 'POST',
        body: JSON.stringify({ access_token: accessToken }),
        requireAuth: false, // OAuth doesn't need existing auth
        serverSide: true,
      }
    );

    if (response.error) {
      return { error: response.error };
    }

    // Set cookie on server-side
    if (response.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set('token', response.data.token, cookiePayload);
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

