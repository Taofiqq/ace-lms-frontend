import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-black dark:to-gray-900 px-4">
      <main className="w-full max-w-lg bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-10 flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
          Welcome to Afincran College of Excellence
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-center text-base sm:text-lg">
          Unlock your potential with curated learning paths in fintech, product, data, AI, and business leadership. Start your journey today!
        </p>
        <div className="flex gap-4 mt-4 w-full justify-center">
          <Link
            href="/login"
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition w-32 text-center"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold transition w-32 text-center"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
