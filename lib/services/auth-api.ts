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

    // Check Token - cookies are sent automatically by browser
    async checkToken(): Promise<ApiResponse<TokenResponse>> {
        console.log('🔍 Checking token authentication (main app)...');
        console.log('🌐 Base URL:', this.baseURL);
        console.log('🍪 Cookies will be sent automatically by browser');

        try {
            // No need to manually get token - browser sends cookies automatically
            const response = await apiConnector({
                method: 'GET',
                url: `${this.baseURL}/api/v1/auth/check-token`,
                headers: {
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


    // Check if token exists (cookies are handled by browser)
    hasToken(): boolean {
        if (typeof document === 'undefined') return false;
        return document.cookie.includes('token=');
    }

}

// Export singleton instance
export const authApiService = new AuthApiService(BASE_URL);
export default authApiService;
