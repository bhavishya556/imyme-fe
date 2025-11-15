'use server';

import { apiFetch } from '@/lib/utils/fetch';
import { API_ROUTES } from '@/lib/constants/api-routes';
import { ApiResponse, IUser, LoginResponse } from '@/lib/types/api';
import { cookies } from 'next/headers';

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<ApiResponse<{ user: IUser }>> => {
  try {
    const response = await apiFetch<LoginResponse>(
      API_ROUTES.AUTH.EMAIL_REGISTER,
      {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        requireAuth: false, // Registration doesn't need auth
        serverSide: true,
      }
    );

    if (response.error) {
      return { error: response.error };
    }

    // Set cookie on server-side if token is returned
    if (response.data?.token) {
      const cookieStore = await cookies();
      cookieStore.set('token', response.data.token, {
        path: '/',
        maxAge: 24 * 60 * 60, // 1 day
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    return {
      data: { user: response.data?.user! },
      message: 'Registration successful',
    };
  } catch (error: unknown) {
    console.error('Email registration failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    return { error: errorMessage };
  }
};

