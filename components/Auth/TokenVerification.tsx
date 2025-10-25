"use client";
import { useEffect, useState } from 'react';
import { authApiService } from '../../lib/services/auth-api';

interface User {
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

interface TokenResponse {
    isValid: boolean;
    user: User;
}

export default function TokenVerification() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tokenStatus, setTokenStatus] = useState<'checking' | 'valid' | 'invalid' | 'none'>('checking');


    // Verify token with backend (same as auth app)
    const verifyToken = async () => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('🔍 Verifying token with backend (same as auth app)...');

            const response = await authApiService.checkToken();

            if (response.error) {
                setTokenStatus('none');
                setError(response.error);
                console.log('❌ Token verification failed:', response.error);
                return;
            }

            if (response.data && response.data.isValid) {
                setUser(response.data.user);
                setTokenStatus('valid');
                console.log('✅ Token verification successful:', response.data.user);
            } else {
                setTokenStatus('invalid');
                setError('Token is invalid or expired');
                console.log('❌ Token validation failed');
            }
        } catch (err: any) {
            console.error('❌ Token verification failed:', err);
            setTokenStatus('invalid');
            setError(err.message || 'Token verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-verify on component mount
    useEffect(() => {
        verifyToken();
    }, []);

    const handleRecheck = () => {
        verifyToken();
    };

    const handleRedirectToAuth = () => {
        const authUrl = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3001';
        console.log('🔄 Redirecting to auth frontend:', authUrl);
        window.location.href = authUrl;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Token Verification
                    </h1>
                    <p className="text-sm text-gray-500">
                        Checking authentication status from auth frontend
                    </p>
                </div>

                {/* Token Status */}
                <div className="mb-6">
                    <div className={`p-4 rounded-lg border ${tokenStatus === 'valid' ? 'bg-green-50 border-green-200' :
                        tokenStatus === 'invalid' ? 'bg-red-50 border-red-200' :
                            tokenStatus === 'none' ? 'bg-yellow-50 border-yellow-200' :
                                'bg-blue-50 border-blue-200'
                        }`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {tokenStatus === 'valid' ? '✅ Authenticated' :
                                        tokenStatus === 'invalid' ? '❌ Authentication Failed' :
                                            tokenStatus === 'none' ? '⚠️ No Token Found' :
                                                '🔄 Checking...'}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {tokenStatus === 'valid' ? 'Token is valid and working' :
                                        tokenStatus === 'invalid' ? 'Token is invalid or expired' :
                                            tokenStatus === 'none' ? 'No authentication token found' :
                                                'Verifying token...'}
                                </p>
                            </div>
                            {isLoading && (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                            )}
                        </div>
                    </div>
                </div>

                {/* User Information */}
                {user && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-medium text-gray-900 mb-2">User Information:</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>ID:</strong> {user.id}</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
                        <h3 className="font-medium text-red-800 mb-1">Error</h3>
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleRecheck}
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '🔄 Verifying...' : '🔍 Recheck Token'}
                    </button>

                    {tokenStatus !== 'valid' && (
                        <button
                            onClick={handleRedirectToAuth}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
                        >
                            🔐 Go to Authentication
                        </button>
                    )}

                    {/* Debug: Manual Token Setting */}
                    <button
                        onClick={() => {
                            const testToken = prompt('Enter test token (for debugging):');
                            if (testToken) {
                                document.cookie = `token=${testToken}; path=/; max-age=86400; samesite=lax`;
                                console.log('🍪 Test token set manually');
                                verifyToken();
                            }
                        }}
                        className="w-full bg-yellow-600 text-white py-2 rounded-lg font-medium hover:bg-yellow-700 transition text-sm"
                    >
                        🧪 Set Test Token (Debug)
                    </button>

                    {tokenStatus === 'valid' && (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <h3 className="font-medium text-green-800 mb-1">🎉 Success!</h3>
                            <p className="text-sm text-green-700">
                                You are successfully authenticated and can access protected resources.
                            </p>
                        </div>
                    )}
                </div>

                {/* Debug Information */}
                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2 text-sm">Debug Info:</h3>
                    <div className="text-xs text-gray-600 space-y-1">
                        <p>Backend URL: {authApiService.getBaseURL()}</p>
                        <p>Token Status: {tokenStatus}</p>
                        <p>Has Token: {authApiService.hasToken() ? 'Yes' : 'No'}</p>
                        <p>Cookies: {typeof document !== 'undefined' ? document.cookie || 'None' : 'SSR'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
