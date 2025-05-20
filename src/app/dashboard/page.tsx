// app/dashboard/page.tsx
"use client";

import { useAuthStore } from "@/store/authStore";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#171717] mb-2">
          Welcome to ACE-LMS
        </h1>
        <p className="text-[#666666] mb-4">
          Hello, {user?.email || "User"} ({user?.role || "Unknown"})!
        </p>
        <p className="text-[#666666]">This is your dashboard.</p>
      </div>
    </div>
  );
}
