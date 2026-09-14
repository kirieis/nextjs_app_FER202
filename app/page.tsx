"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedInfo, setSubmittedInfo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);
    setSubmittedInfo(null);

    // Simulate UI authentication delay
    setTimeout(() => {
      setIsLoading(false);
      setSubmittedInfo(`Welcome back, ${identifier}! (UI demo only)`);
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white p-4 sm:p-6 lg:p-8 overflow-hidden font-sans select-none">
      {/* Ambient background glow: Red & Purple against pitch black */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-red-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-purple-700/25 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-red-900/10 blur-[100px]" />

      {/* Grid pattern overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="rounded-2xl border border-zinc-800/90 bg-zinc-950/85 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-black/90 ring-1 ring-white/5 transition-all">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-purple-700 text-white shadow-lg shadow-red-600/30 mb-3.5 ring-1 ring-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Enter your credentials below to access your dashboard
            </p>
          </div>

          {/* Success Banner (Mock Demo) */}
          {submittedInfo && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-purple-500/40 bg-purple-950/40 p-3.5 text-sm text-purple-200 animate-in fade-in duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0 text-purple-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{submittedInfo}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email / Username Field */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-zinc-200 mb-1.5"
              >
                Email or Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  id="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com or username"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-purple-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500/25 transition duration-150"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-200"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-purple-400 hover:text-red-400 transition-colors"
                  onClick={() => alert("Forgot password clicked (UI demo)")}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-zinc-500 focus:border-purple-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-purple-500/25 transition duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-500 hover:text-zinc-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500 focus:ring-offset-black accent-purple-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-zinc-300 cursor-pointer hover:text-white transition-colors"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit / Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden flex items-center justify-center rounded-lg bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 py-2.5 px-4 text-sm font-semibold text-white shadow-lg shadow-red-950/60 hover:from-red-500 hover:via-rose-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.99]"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin text-white"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center justify-center">
            <div className="w-full border-t border-zinc-800/80" />
            <span className="bg-zinc-950 px-3 text-xs text-zinc-500 uppercase tracking-wider">
              or
            </span>
            <div className="w-full border-t border-zinc-800/80" />
          </div>

          {/* Social Logins (UI Demo) */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => alert("Google Login clicked (UI demo)")}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 py-2 px-3 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition duration-150"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.54 0 2.9.54 3.97 1.43l2.97-2.97C17.06 1.7 14.7 1 12 1 7.42 1 3.55 3.58 1.63 7.34l3.52 2.73C6.01 7.15 8.76 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.28 1.48-1.11 2.74-2.37 3.58l3.68 2.85c2.15-1.99 3.71-4.91 3.71-8.67z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.15 14.93c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.63 7.68C.59 9.77 0 12.09 0 14.5s.59 4.73 1.63 6.82l3.52-2.39z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.68-2.85c-1.07.72-2.45 1.16-4.25 1.16-3.24 0-5.99-2.15-6.85-5.07L1.63 16.07C3.55 19.83 7.42 23 12 23z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => alert("GitHub Login clicked (UI demo)")}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 py-2 px-3 text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition duration-150"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer link */}
          <p className="mt-8 text-center text-xs text-zinc-400">
            Don&apos;t have an account?{" "}
            <a
              href="#signup"
              onClick={(e) => {
                e.preventDefault();
                alert("Sign up clicked (UI demo)");
              }}
              className="font-semibold text-purple-400 hover:text-red-400 underline underline-offset-2 transition-colors"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
