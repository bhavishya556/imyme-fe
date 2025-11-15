'use server';

import { apiFetch } from '@/lib/utils/fetch';
import { API_ROUTES } from '@/lib/constants/api-routes';
import { ApiResponse, Web } from '@/lib/types/api';

export const createWeb = async (
  name: string,
  content: string,
  domain: string
): Promise<ApiResponse<Web>> => {
  try {
    const response = await apiFetch<Web>(
      API_ROUTES.WEB.CREATE,
      {
        method: 'POST',
        body: JSON.stringify({ name, content, domain }),
        requireAuth: true,
        serverSide: true,
      }
    );

    if (response.error) {
      return { error: response.error };
    }

    return {
      data: response.data,
      message: 'Web created successfully',
    };
  } catch (error: unknown) {
    console.error('Create web failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create web';
    return { error: errorMessage };
  }
};

