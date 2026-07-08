"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBankState, resetBankState, formatUSD } from "@/lib/bank";

const quickActions = [
  { emoji: "🧾", label: "Pay bills" },
  { emoji: "💳", label: "Virtual card" },
  { emoji: "🎁", label: "Rewards" },
  { emoji: "📈", label: "Savings" },
];

function money(n) {
  const sign = n < 0 ? "-" : "+";
  return `${sign}${formatUSD(n)}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bank, setBank] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("krest_user");
    if (!raw) {
      router.replace("/login");
    } else {
      setUser(JSON.parse(raw));
      setBank(getBankState());
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("krest_user");
    router.push("/login");
  }

  function handleReset() {
    setBank(resetBankState());
  }

  if (!user || !bank) {
    return (
      <main className="grid min-h-screen place-items-center bg-mist">
        <p className="text-sm text-gray-500">Loading your dashboard…</p>
      </main>
    );
  }

  const firstName = user.name?.split(" ")[0] || "there";
  const balanceText = hidden ? "••••••" : formatUSD(bank.balance);

  return (
    <div className="min-h-screen bg-mist">
      {/* Top bar */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 font-display font-bold text-white">
              F
            </span>
            <span className="font-display font-bold">First credit union</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 sm:inline-flex">
              Earn $155
            </span>
            <button onClick={logout} className="btn-ghost !px-4 !py-2 text-sm">
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-16 pt-8">
        {/* Greeting + balance */}
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-lg shadow-card">
            👤
          </span>
          <div>
            <p className="text-sm text-gray-500">Welcome back</p>
            <h1 className="font-display text-xl font-bold">Hi, {firstName}</h1>
          </div>
        </div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">Total balance</p>
            <p className="mt-1 font-display text-4xl font-extrabold tracking-tight">
              {balanceText}
            </p>
          </div>
          <button
            onClick={() => setHidden(!hidden)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-violet-600 shadow-card"
            aria-label={hidden ? "Show balance" : "Hide balance"}
          >
            {hidden ? "🙈" : "👁️"}
          </button>
        </div>

        {/* USD account + card */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-gray-100">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-mist text-xl">
                🇺🇸
              </span>
              <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                Primary
              </span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold">{balanceText}</p>
            <p className="mt-1 text-sm text-gray-500">US Dollar account</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-mist px-3 py-2 text-xs text-gray-600">
              🏦 218871272941
            </div>
          </div>

          <div className="rounded-3xl bg-violet-600 p-6 text-white shadow-lift">
            <p className="text-sm text-violet-100">First credit union virtual card</p>
            <p className="mt-4 font-mono text-lg tracking-widest">
              4519 •••• •••• 8032
            </p>
            <div className="mt-6 flex items-end justify-between text-sm">
              <div>
                <p className="text-xs text-violet-200">Card holder</p>
                <p className="font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-xs text-violet-200">Expires</p>
                <p className="font-semibold">09/29</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-8 sm:gap-14">
          <button className="group flex flex-col items-center gap-2">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-600 text-2xl text-white shadow-lift transition group-hover:bg-violet-700">
              ＋
            </span>
            <span className="text-sm font-medium">Add money</span>
          </button>
          <Link href="/transfer" className="group flex flex-col items-center gap-2">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-violet-100 bg-white text-xl text-violet-600 shadow-card transition group-hover:border-violet-400">
              ➤
            </span>
            <span className="text-sm font-medium">Send</span>
          </Link>
          <button className="group flex flex-col items-center gap-2">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-violet-100 bg-white text-xl text-violet-600 shadow-card transition group-hover:border-violet-400">
              ⇄
            </span>
            <span className="text-sm font-medium">Request</span>
          </button>
        </div>

        {/* Transactions */}
        <section className="mt-10">
          {/* <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Transactions</h2>
            <button
              onClick={handleReset}
              className="text-sm font-semibold text-violet-600 hover:underline"
              title="Restore the demo data"
            >
              Reset demo data
            </button>
          </div> */}
          <div className="mt-4 divide-y divide-gray-100 rounded-3xl bg-white shadow-card ring-1 ring-gray-100">
            {bank.transactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full text-sm ${
                      t.type === "in"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-mist text-gray-500"
                    }`}
                  >
                    {t.type === "in" ? "↓" : "↑"}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.label}</p>
                    <p className="text-xs text-gray-500">
                      {t.date}
                      {t.meta?.reference ? ` · ${t.meta.reference}` : ""}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      t.amount > 0 ? "text-emerald-600" : "text-ink"
                    }`}
                  >
                    {hidden ? "••••" : money(t.amount)}
                  </p>
                  <p className="text-[11px] text-gray-400">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-bold">Quick actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {quickActions.map((q) => (
              <button
                key={q.label}
                className="rounded-2xl bg-white p-5 text-center shadow-card ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:ring-violet-100"
              >
                <span className="text-2xl">{q.emoji}</span>
                <p className="mt-2 text-sm font-semibold">{q.label}</p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
