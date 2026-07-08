"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-600 font-display text-lg font-bold text-white">
            K
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Krest
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-ink">
            Home
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-ink">
            Contact
          </Link>
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-ink">
            Log in
          </Link>
          <Link href="/signup" className="btn-primary !py-2.5">
            Open a USD account
          </Link>
        </div>

        <button
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white px-5 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" className="py-1 text-sm font-medium" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/contact" className="py-1 text-sm font-medium" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <Link href="/login" className="py-1 text-sm font-medium" onClick={() => setOpen(false)}>
              Log in
            </Link>
            <Link href="/signup" className="btn-primary" onClick={() => setOpen(false)}>
              Open a USD account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
