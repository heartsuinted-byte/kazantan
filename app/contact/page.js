"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-extrabold tracking-tight">
              Talk to us
            </h1>
            <p className="mt-4 max-w-md leading-7 text-gray-600">
              Questions about your USD account, a transfer, or your card? Send
              a message and the support team will reply within one business
              day.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
                  ✉️
                </span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-gray-600">help@Firstcreditunion.bank</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
                  📞
                </span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm text-gray-600">
                    +1 (555) 014-2026 · Mon–Sat, 8am–8pm
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
                  📍
                </span>
                <div>
                  <p className="font-semibold">Office</p>
                  <p className="text-sm text-gray-600">
                    120 Market Street, Suite 400, San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-card">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-violet-50 text-2xl">
                  ✅
                </span>
                <h2 className="mt-5 font-display text-xl font-bold">
                  Message sent
                </h2>
                <p className="mt-2 max-w-xs text-sm text-gray-600">
                  Thanks for reaching out. A reply is on its way to your inbox.
                </p>
                <button
                  className="btn-ghost mt-6"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="name">Full name</label>
                    <input id="name" className="input" placeholder="Billy Adams" required />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">Email</label>
                    <input id="email" type="email" className="input" placeholder="you@example.com" required />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="topic">Topic</label>
                  <select id="topic" className="input" defaultValue="Account">
                    <option>Account</option>
                    <option>Transfers</option>
                    <option>Cards</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label className="label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="input resize-none"
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
