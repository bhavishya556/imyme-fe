'use server';

import { apiFetch } from '@/lib/utils/fetch';
import { API_ROUTES } from '@/lib/constants/api-routes';
import { ApiResponse, IUser } from '@/lib/types/api';
import { cookies } from 'next/headers';
import { cookiePayload } from './cookie';
import { LoginResponse } from '@/lib/types/api';

export const linkedinAuth = async (
  code: string,
  state?: string
): Promise<ApiResponse<IUser>> => {
  
  try {
    const params = new URLSearchParams({ code });


    if (state) params.append('state', state);

    const response = await apiFetch<LoginResponse>(
      `${API_ROUTES.AUTH.LINKEDIN_AUTH}?${params.toString()}`,
      {
        method: 'GET',
        requireAuth: false, // OAuth doesn't need existing auth
        serverSide: true,
      }
    );
    if (response.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set('token', response.data.token, cookiePayload);
    }

    if (response.error) {
      return { error: response.error };
    }

    return {
      data: response.data?.user,
      message: 'LinkedIn authentication successful',
    };
  } catch (error: unknown) {
    console.error('LinkedIn auth failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'LinkedIn authentication failed';
    return { error: errorMessage };
  }
};

