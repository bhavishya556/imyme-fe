"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 * Navigation Component
 * Shows "My Domain" button if user is authenticated (has cookie)
 * Shows "Login" button if user is not authenticated
 */
export default function Nav() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user has authentication cookie
        const checkAuth = () => {
            if (typeof document !== "undefined") {
                const cookies = document.cookie;
                // Check for token cookie (more specific check)
                const hasToken = cookies.split(';').some(cookie => {
                    const [name] = cookie.trim().split('=');
                    return name === 'token';
                });
                setIsAuthenticated(hasToken);
            }
            setIsChecking(false);
        };

        checkAuth();

        // Check periodically for cookie changes (every 2 seconds)
        const interval = setInterval(checkAuth, 2000);

        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        if (isAuthenticated) {
            router.push("/my-webs");
        } else {
            router.push("/login");
        }
    };

    if (isChecking) {
        return (
            <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-end px-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-14 items-center justify-between px-4">
                {/* Logo/Brand */}
                <div className="flex items-center">
                    <a href="/" className="text-xl font-bold">
                        imyme
                    </a>
                </div>

                {/* Auth Button */}
                <div className="flex items-center gap-4">
                    <Button
                        onClick={handleClick}
                        variant={isAuthenticated ? "default" : "outline"}
                        className="min-w-[100px]"
                    >
                        {isAuthenticated ? "My Domain" : "Login"}
                    </Button>
                </div>
            </div>
        </nav>
    );
}

