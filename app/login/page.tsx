"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IOAuthTokenResponse, IUser } from "@/lib/types/api";
import { login, googleAuth, checkToken } from "@/lib/actions/auth-action";

const LoginPage = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Send Google access token to backend
    const sendGoogleTokenToBackend = async (accessToken: string) => {
        try {
            setIsLoading(true);
            const response = await googleAuth(accessToken);

            if (response.error) {
                throw new Error(response.error);
            }
            if (response.data) {
                const { user } = response.data;
                setUser(user as unknown as IUser);
                // Redirect to dashboard or main page after successful login
                window.location.href = "/my-webs";
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            alert("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Google OAuth success
    const handleGoogleSuccess = async (authResult: IOAuthTokenResponse) => {
        console.log("Google Auth Result:", authResult);
        await sendGoogleTokenToBackend(authResult.access_token);
    };

    // Google login handler
    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: (error) => {
            console.error("Google Login Error:", error);
            alert("Google login failed. Please try again.");
        },
    });

    // Check if user is authenticated
    const checkAuth = async () => {
        setIsCheckingAuth(true);
        try {
            const response = await checkToken();

            if (response.error) {
                throw new Error(response.error);
            }

            if (response.data?.user) {
                setUser(response.data.user as unknown as IUser);
                // Redirect if already authenticated
                window.location.href = "/my-webs";
            }
        } catch (err) {
            console.error("Auth check failed", err);
            setUser(null);
        } finally {
            setIsCheckingAuth(false);
        }
    };

    // Handle email/password login
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const response = await login(email, password);
            console.log('🚀 ~ handleEmailLogin ~ response:', response);

            if (response.error) {
                throw new Error(response.error);
            }
            if (response.data) {
                const { user } = response.data;
                setUser(user as unknown as IUser);
                // Redirect to dashboard or main page after successful login
                window.location.href = "/my-webs";
            }
        } catch (error) {
            console.error("Email login failed:", error);
            alert("Login failed. Please check your email and password.");
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-check authentication on component mount
    useEffect(() => {
        checkAuth();
    }, []);

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">imyme</h1>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-2">
                    Welcome back
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Sign in to continue to <span className="font-medium">imyme</span>
                </p>

                {/* Auth Buttons */}
                <div className="space-y-3">
                    <Button
                        onClick={() => googleLogin()}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2"
                        variant="outline"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span className="text-sm font-medium">
                            Continue with Google
                        </span>
                    </Button>
                </div>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="px-3 text-sm text-gray-400">or</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-black text-white hover:bg-gray-900"
                    >
                        {isLoading ? "Signing in..." : "Continue with Email"}
                    </Button>
                </form>

                {/* Footer */}
                <p className="text-xs text-gray-400 text-center mt-6">
                    By continuing, you agree to our{" "}
                    <a href="/terms" className="underline hover:text-gray-600">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="underline hover:text-gray-600">
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

