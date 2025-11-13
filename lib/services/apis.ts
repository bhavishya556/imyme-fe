
import axios from "axios"
// Types
export interface IOAuthTokenResponse {
    access_token: string;
    token_type?: string;
    expires_in?: number;
    scope?: string;
    authuser?: string;
    prompt?: string;
}

export interface IUser {
    id?: string;
    sub?: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
}

export interface ApiResponse<T = unknown> {
    data?: T;
    error?: string;
    message?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URI || 'http://localhost:3000'

export const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Include cookies in requests
    timeout: 30000,
});



// Request interceptor to log cookie status
apiClient.interceptors.request.use(
    (config) => {

        const cookiesForLocal = document.cookie;

        console.log('Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            hasCookies: document.cookie.includes('token='),
            cookies: cookiesForLocal || 'none'
        });

        if (cookiesForLocal) {
            config.headers.Authorization = `Bearer ${cookiesForLocal}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to log results
apiClient.interceptors.response.use(
    (response) => {
        console.log('📥 API Response:', {
            status: response.status,
            url: response.config.url,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('Response error:', {
            status: error.response?.status,
            message: error.message,
            url: error.config?.url
        });
        return Promise.reject(error);
    }
);



export const apiConnector = ({ method, url, bodyData, headers }: any) => {
    return apiClient({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null
    });
}

export const AdminRoutes_API: any = {
    loginAdmin: "/api/v1/admin/login-admin",
    validateAdmin: "/api/v1/admin/validate-admin",
}

// API Service Class for Authentication
class ApiService {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    // Google Authentication
    async googleAuth(accessToken: string): Promise<ApiResponse<{ user: IUser }>> {
        try {
            const response = await apiClient.post('/api/v1/auth/google', {
                access_token: accessToken
            });
            // ONLY FOR LOCAL DEVELOPMENT
            const localToken = response.data.token;
            const oneDay = 24 * 60 * 60; // seconds
            document.cookie = `token=${localToken}; path=/; max-age=${oneDay}`;


            return {
                data: { user: response.data.user },
                message: 'Google authentication successful'
            };
        } catch (error: unknown) {
            console.error('Google auth failed:', error);
            const errorMessage = error instanceof Error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || error.message
                : 'Google authentication failed';
            return {
                error: errorMessage
            };
        }
    }

    // LinkedIn Authentication
    async linkedinAuth(code: string, state?: string): Promise<ApiResponse<IUser>> {
        try {
            const params = new URLSearchParams({ code });
            if (state) params.append('state', state);

            const response = await apiClient.get(`/api/v1/auth/linkedin?${params.toString()}`);
            return {
                data: response.data?.user,
                message: 'LinkedIn authentication successful'
            };
        } catch (error: unknown) {
            console.error('LinkedIn auth failed:', error);
            const errorMessage = error instanceof Error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || error.message
                : 'LinkedIn authentication failed';
            return {
                error: errorMessage
            };
        }
    }

    // Check Token
    async checkToken(): Promise<ApiResponse<{ user: IUser; isValid: boolean }>> {
        try {
            const response = await apiClient.get('/api/v1/auth/check-token');
            return {
                data: response.data,
                message: 'Token validation successful'
            };
        } catch (error: unknown) {
            console.error('Token check failed:', error);
            const errorMessage = error instanceof Error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || error.message
                : 'Token validation failed';
            return {
                error: errorMessage
            };
        }
    }

    // Email/Password Login
    async emailLogin(email: string, password: string): Promise<ApiResponse<{ user: IUser }>> {
        try {
            const response = await apiClient.post('/api/v1/auth/login', {
                email,
                password
            });
            // ONLY FOR LOCAL DEVELOPMENT
            const localToken = response.data.token;
            const oneDay = 24 * 60 * 60; // seconds
            document.cookie = `token=${localToken}; path=/; max-age=${oneDay}`;
            return {
                data: { user: response.data.user },
                message: 'Email authentication successful'
            };
        } catch (error: unknown) {
            console.error('Email auth failed:', error);
            const errorMessage = error instanceof Error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || error.message
                : 'Email authentication failed';
            return {
                error: errorMessage
            };
        }
    }

    // Email/Password Registration
    async emailRegister(email: string, password: string, name: string): Promise<ApiResponse<{ user: IUser }>> {
        try {
            const response = await apiClient.post('/api/v1/auth/register', {
                email,
                password,
                name
            });
            return {
                data: { user: response.data.user },
                message: 'Registration successful'
            };
        } catch (error: unknown) {
            console.error('Email registration failed:', error);
            const errorMessage = error instanceof Error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || error.message
                : 'Registration failed';
            return {
                error: errorMessage
            };
        }
    }

    // Web APIs
    async createWeb(name: string, content: string, domain: string): Promise<ApiResponse<any>> {
        try {
            const response = await apiClient.post('/api/v1/web', {
                name,
                content,
                domain
            });
            return {
                data: response.data,
                message: 'Web created successfully'
            };
        } catch (error: unknown) {
            console.error('Create web failed:', error);
            const errorMessage = error instanceof Error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || error.message
                : 'Failed to create web';
            return {
                error: errorMessage
            };
        }
    }

    async getUserWebs(): Promise<ApiResponse<any[]>> {
        try {
            const response = await apiClient.get('/api/v1/web');
            return {
                data: response.data?.data || response.data || [],
                message: 'Webs fetched successfully'
            };
        } catch (error: unknown) {
            console.error('Get webs failed:', error);
            const errorMessage = error instanceof Error
                ? (error as { response?: { data?: { message?: string } } }).response?.data?.message || error.message
                : 'Failed to fetch webs';
            return {
                error: errorMessage
            };
        }
    }
}

// Export singleton instance
export const apiService = new ApiService(BASE_URL);
export default apiService; 
