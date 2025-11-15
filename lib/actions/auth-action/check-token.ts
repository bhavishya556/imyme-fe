'use server';

import { apiFetch } from '@/lib/utils/fetch';
import { API_ROUTES } from '@/lib/constants/api-routes';
import { ApiResponse, IUser, CheckTokenResponse } from '@/lib/types/api';

export const checkToken = async (): Promise<ApiResponse<CheckTokenResponse>> => {
  try {
    const response = await apiFetch<CheckTokenResponse>(
      API_ROUTES.AUTH.CHECK_TOKEN,
      {
        method: 'GET',
        requireAuth: true, // Token check requires auth
        serverSide: true,
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

