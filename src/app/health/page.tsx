// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { checkHealth } from "@/lib/health";

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    try {
      const data = await checkHealth();
      setHealthStatus(JSON.stringify(data)); // Display the response (e.g., { status: 'ok' })
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to connect to backend");
    }
  };

  useEffect(() => {
    fetchHealth(); // Run health check on page load
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Health Check</h1>
      {healthStatus ? (
        <p className="text-green-600">Backend Response: {healthStatus}</p>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p className="text-red-600">{error}</p>}
      <button
        onClick={fetchHealth}
        className="mt-4 bg-vercel-bg text-black px-4 py-2 rounded hover:bg-[#FFF0DC]"
      >
        Check Health Again
      </button>
    </div>
  );
}
