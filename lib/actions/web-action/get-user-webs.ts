'use server';

import { apiFetch } from '@/lib/utils/fetch';
import { API_ROUTES } from '@/lib/constants/api-routes';
import { ApiResponse, Web } from '@/lib/types/api';

export const getUserWebs = async (): Promise<ApiResponse<Web[]>> => {
    try {
        const response = await apiFetch<{ data?: Web[] } | Web[]>(
            API_ROUTES.WEB.GET_ALL,
            {
                method: 'GET',
                requireAuth: true,
                serverSide: true,
            }
        );

        if (response.error) {
            return { error: response.error };
        }

        // Handle different response formats
        const webs = Array.isArray(response.data)
            ? response.data
            : (response.data as { data?: Web[] })?.data || [];

        return {
            data: webs,
            message: 'Webs fetched successfully',
        };
    } catch (error: unknown) {
        console.error('Get webs failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch webs';
        return { error: errorMessage };
    }
};

