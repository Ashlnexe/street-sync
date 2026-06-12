"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const nextPath = searchParams.get("next") || "/admin";

  // Check if session is already present to skip login
  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace(nextPath);
      }
    }
    checkUser();
  }, [router, nextPath]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid credentials. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Access granted. Syncing dashboard...");
      
      // Delay slightly for premium feedback feel
      setTimeout(() => {
        window.location.href = nextPath;
      }, 1000);

    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 md:p-10 rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900 transition-all duration-300">
      <div className="flex flex-col items-center mb-8">
        {/* Brand Header */}
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-2">Street Sync Console</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white" id="login-heading">
          Welcome Back
        </h1>
        <p className="text-sm text-neutral-500 mt-2 text-center">
          Log in with your administrator credentials to access store analytics and live orders.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6" aria-labelledby="login-heading">
        {/* Error Alert */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="flex items-center gap-2 p-3 text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400 animate-in fade-in slide-in-from-top-1 duration-200">
            <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email-input" className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Admin Email Address
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </span>
            <input
              id="email-input"
              type="email"
              placeholder="admin@streetsync.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder-neutral-400 border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 rounded-lg outline-none transition-all duration-200 dark:bg-neutral-800 dark:hover:bg-neutral-800/80 dark:focus:bg-neutral-950 dark:text-white dark:border-neutral-700 dark:focus:border-neutral-50 dark:focus:ring-neutral-50"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password-input" className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Secure Password
          </label>
          <div className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400 group-focus-within:text-neutral-900 dark:group-focus-within:text-white transition-colors">
              <Lock className="w-4 h-4" />
            </span>
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-10 py-3 bg-neutral-50 hover:bg-neutral-100/70 focus:bg-white text-neutral-900 placeholder-neutral-400 border border-neutral-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 rounded-lg outline-none transition-all duration-200 dark:bg-neutral-800 dark:hover:bg-neutral-800/80 dark:focus:bg-neutral-950 dark:text-white dark:border-neutral-700 dark:focus:border-neutral-50 dark:focus:ring-neutral-50"
              required
            />
            <button
              id="toggle-password-btn"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="login-submit-btn"
          type="submit"
          disabled={isLoading}
          className="relative w-full flex items-center justify-center gap-2 py-3 px-4 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-[0.98] focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white rounded-lg font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-500" />
          <p className="text-sm text-neutral-500 mt-2">Loading authentication panel...</p>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </main>
  );
}
