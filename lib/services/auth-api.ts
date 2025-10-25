import { apiConnector, BASE_URL } from './apis';

export interface User {
    id: string;
    email: string;
    name: string;
    sub: string;
    given_name: string;
    family_name: string;
    picture: string;
    email_verified: boolean;
    locale: string;
}

export interface TokenResponse {
    isValid: boolean;
    user: User;
}

export interface ApiResponse<T = unknown> {
    data?: T;
    error?: string;
    message?: string;
}

class AuthApiService {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    // Getter for baseURL
    getBaseURL(): string {
        return this.baseURL;
    }

    // Check Token - same as auth app
    async checkToken(): Promise<ApiResponse<TokenResponse>> {
        console.log('🔍 Checking token authentication (main app)...');
        console.log('🌐 Base URL:', this.baseURL);

        try {
            // Get token from cookies
            const token = this.getTokenFromCookies();
            console.log('🍪 Token from cookies:', token ? `${token.slice(0, 8)}...${token.slice(-8)}` : 'missing');

            if (!token) {
                return {
                    error: 'No authentication token found in cookies'
                };
            }

            const response = await apiConnector({
                method: 'GET',
                url: `${this.baseURL}/api/v1/auth/check-token`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('📥 Backend response:', response.data);

            if (response.data && response.data.isValid) {
                console.log('✅ Token is valid:', response.data);
                return { data: response.data };
            } else {
                console.log('❌ Token validation failed');
                return { error: 'Token is invalid or expired' };
            }
        } catch (error: any) {
            console.error('❌ Token verification failed:', error);
            return {
                error: error.response?.data?.message || error.message || 'Token verification failed'
            };
        }
    }

    // Get token from cookies (same logic as auth app)
    private getTokenFromCookies(): string | null {
        if (typeof document === 'undefined') return null;

        console.log('🍪 All cookies:', document.cookie);
        console.log('🍪 Current hostname:', window.location.hostname);
        console.log('🍪 Current domain:', window.location.hostname.split('.').slice(-2).join('.'));

        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            console.log('🍪 Checking cookie:', name, '=', value ? 'present' : 'empty');
            if (name === 'token' || name === 'auth_token') {
                console.log('🍪 Found token cookie:', name);
                return value;
            }
        }
        console.log('🍪 No token cookies found');
        return null;
    }

    // Check if token exists
    hasToken(): boolean {
        return !!this.getTokenFromCookies();
    }

    // Debug method to manually set a test token
    setTestToken(): void {
        const testToken = 'test-token-main-' + Date.now();
        console.log('🧪 Setting test token in main app:', testToken);

        // Set cookie with .onrender.com domain for cross-subdomain access
        document.cookie = `token=${testToken}; domain=.onrender.com; path=/; max-age=86400; samesite=lax; secure=true`;
        console.log('🍪 Test token set with .onrender.com domain');
        console.log('🍪 All cookies after setting:', document.cookie);
    }
}

// Export singleton instance
export const authApiService = new AuthApiService(BASE_URL);
export default authApiService;
