"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

export default function AuthCallbackPage() {
  const [message, setMessage] = useState("Processing...");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVICE_URL}/api/v1/auth/check-token`, {
  method: "GET",
  credentials: "include", // ✅ send cookies
});
        if (!res.ok) {
          throw new Error("Not authenticated");
        }

        const data = await res.json();
        setUser(data.user);
        setMessage("✅ Logged in successfully!");
      } catch (err: any) {
        console.error("Auth check failed", err);
        setMessage("❌ Not authenticated");
      }
    }

    checkAuth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <p>{message}</p>
      {user && (
        <div className="bg-gray-100 p-4 rounded-md shadow w-[400px]">
          <h2 className="font-semibold mb-2">User Info</h2>
          <pre className="text-sm text-left whitespace-pre-wrap">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
