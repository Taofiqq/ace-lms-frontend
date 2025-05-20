// app/login/page.tsx
"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Add this import
import { useAuthStore } from "@/store/authStore"; // Add this import
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login({ email, password });
      useAuthStore.getState().setAuth(data.access_token, data.user);
      Cookies.set("token", data.access_token, { expires: 7 }); // Store token in cookie for 7 days
      toast.success(`Logged in as ${data.user.email} (${data.user.role})`);
      router.push("/dashboard"); // Redirect to dashboard
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#171717] mb-2">Login</h1>
        <p className="text-[#666666] mb-6">Sign in to your ACE-LMS account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#171717] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none text-[#8F8F8F] focus:ring-2 focus:ring-[#171717] placeholder:text-[#8F8F8F]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-[#171717] mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none text-[#8F8F8F] focus:ring-2 focus:ring-[#171717] placeholder:text-[#8F8F8F]"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#171717] text-[#FFFFFF] py-2 rounded hover:bg-[#555555] transition-colors flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-[#FFFFFF]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p className="text-[#666666] mt-4 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#171717] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
