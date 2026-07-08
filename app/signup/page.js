"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Demo only — pretend to create the account, then log the user in.
    setTimeout(() => {
      localStorage.setItem(
        "krest_user",
        JSON.stringify({ name: form.name || "New User", email: form.email })
      );
      router.push("/dashboard");
    }, 900);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-2">
        <div className="hidden md:block">
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight">
            Open your USD account in minutes
          </h1>
          <p className="mt-4 max-w-md leading-7 text-gray-600">
            Get a US account number, a virtual dollar card, and a dashboard
            that keeps everything in one place.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-gray-700">
            {[
              "No monthly fees, no minimum balance",
              "Receive ACH and wire transfers",
              "Freeze or replace your card instantly",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-50 text-xs text-violet-700">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-card">
          <h2 className="font-display text-2xl font-bold">Create your account</h2>
          <p className="mt-1 text-sm text-gray-500">
            Already banking with Krest?{" "}
            <Link href="/login" className="font-semibold text-violet-600 hover:underline">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="label" htmlFor="name">Full name</label>
              <input id="name" name="name" className="input" placeholder="Billy Adams" value={form.name} onChange={update} required />
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="input" placeholder="you@example.com" value={form.email} onChange={update} required />
            </div>
            <div>
              <label className="label" htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" className="input" placeholder="+1 555 000 0000" value={form.phone} onChange={update} required />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="input" placeholder="At least 8 characters" minLength={8} value={form.password} onChange={update} required />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Creating your account…" : "Open my USD account"}
            </button>
            <p className="text-center text-xs text-gray-400">
              Demo signup — no real account is created.
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
