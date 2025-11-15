'use server';

import { apiFetch, setClientCookie } from '@/lib/utils/fetch';
import { API_ROUTES } from '@/lib/constants/api-routes';
import { ApiResponse, IUser, LoginResponse } from '@/lib/types/api';
import { cookies } from 'next/headers';
import { cookiePayload } from './cookie';

export const login = async (email: string, password: string): Promise<ApiResponse<{ user: IUser }>> => {
    try {
        const response = await apiFetch<LoginResponse>(
            API_ROUTES.AUTH.EMAIL_LOGIN,
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                requireAuth: false, // Login doesn't need auth
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
            message: 'Email authentication successful',
        };
    } catch (error: unknown) {
        console.error('Email auth failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'Email authentication failed';
        return { error: errorMessage };
    }
};
