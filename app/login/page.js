"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const DEMO_EMAIL = "sarahcoffer1@gmail.com";
const DEMO_PASSWORD = "Sarah@0628";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setLoading(true);
      localStorage.setItem(
        "krest_user",
        JSON.stringify({ name: "Billy Adams", email: DEMO_EMAIL })
      );
      setTimeout(() => router.push("/dashboard"), 600);
    } else {
      setError("Email or password doesn't match. Try the demo details below.");
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-5 py-14">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-card">
          <h1 className="font-display text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">
            New to Krest?{" "}
            <Link href="/signup" className="font-semibold text-violet-600 hover:underline">
              Open an account
            </Link>
          </p>

          {/* <div className="mt-6 rounded-xl border border-violet-100 bg-violet-25 p-4 text-sm">
            <p className="font-semibold text-violet-700">Demo login</p>
            <p className="mt-1 text-gray-600">
              Email: <span className="font-mono">demo@krest.bank</span>
              <br />
              Password: <span className="font-mono">demo1234</span>
            </p>
          </div> */}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="johndoe@yahoo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="abby34@"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Logging in…" : "Log in"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
