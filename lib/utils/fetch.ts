/**
 * Fetch Utility for Next.js SSR
 * Handles server-side and client-side requests with proper cookie handling
 */

export const BASE_BE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL || '';

interface FetchOptions extends RequestInit {
    requireAuth?: boolean;
    serverSide?: boolean;
}

/**
 * Get authorization header from cookies
 */
async function getAuthHeader(): Promise<string | null> {
    if (typeof window !== 'undefined') {
        // Client-side: read from document.cookie
        const cookieString = document.cookie;
        const tokenMatch = cookieString.match(/token=([^;]+)/);
        return tokenMatch ? `Bearer ${tokenMatch[1]}` : null;
    } else {
        // Server-side: read from Next.js cookies (dynamic import to avoid client bundle issues)
        try {
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            const token = cookieStore.get('token')?.value;
            return token ? `Bearer ${token}` : null;
        } catch {
            // If cookies() fails (e.g., in client component), return null
            return null;
        }
    }
}

/**
 * Universal fetch function that works in both server and client
 */
export async function apiFetch<T = unknown>(
    url: string,
    options: FetchOptions = {}
): Promise<{ data?: T; error?: string; message?: string }> {
    const { requireAuth = true, serverSide = false, ...fetchOptions } = options;

    try {
        const fullUrl = url.startsWith('http') ? url : `${BASE_BE_URL}${url}`;

        // Prepare headers
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(fetchOptions.headers as Record<string, string>),
        };

        // Add authorization header if required
        if (requireAuth) {
            const authHeader = await getAuthHeader();
            if (authHeader) {
                headers['Authorization'] = authHeader;
            }
        }

        // Convert headers to HeadersInit format
        const headersInit: HeadersInit = headers;

        // Prepare fetch options
        const fetchConfig: RequestInit = {
            ...fetchOptions,
            headers: headersInit,
            credentials: 'include', // Include cookies in requests
        };

        // Log request in development (client-side only)
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
            console.log('Request:', {
                method: fetchConfig.method || 'GET',
                url: fullUrl,
                hasAuth: !!headers['Authorization'],
            });
        }

        const response = await fetch(fullUrl, fetchConfig);

        // Log response in development (client-side only)
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
            console.log('📥 API Response:', {
                status: response.status,
                url: fullUrl,
            });
        }

        // Handle non-OK responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData?.message || errorData?.error || `HTTP ${response.status}: ${response.statusText}`;

            return {
                error: errorMessage,
            };
        }

        const data = await response.json();

        return {
            data: data.data || data,
            message: data.message,
        };
    } catch (error: unknown) {
        console.error('Fetch error:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

        return {
            error: errorMessage,
        };
    }
}

/**
 * Set cookie utility (client-side only)
 */
export function setClientCookie(name: string, value: string, maxAge: number = 24 * 60 * 60) {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
    }
}

