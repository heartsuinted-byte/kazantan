"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  beneficiaries,
  getBankState,
  makeTransfer,
  formatUSD,
} from "@/lib/bank";

const DEMO_PIN = "1234";
const FLAT_FEE = 0.5; // demo transfer fee

const stepsMeta = ["Recipient", "Amount", "Review", "Confirm"];

export default function TransferPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  const [step, setStep] = useState(0);
  const [recipient, setRecipient] = useState({ name: "", bank: "", account: "" });
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const pinRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const raw = localStorage.getItem("krest_user");
    if (!raw) {
      router.replace("/login");
      return;
    }
    setUser(JSON.parse(raw));
    setBalance(getBankState().balance);
  }, [router]);

  const amountNum = parseFloat(amount) || 0;
  const total = amountNum + FLAT_FEE;

  const canContinueRecipient =
    recipient.name.trim().length > 1 &&
    recipient.bank.trim().length > 1 &&
    /^\d{9,12}$/.test(recipient.account.trim());

  const amountError = useMemo(() => {
    if (!amount) return "";
    if (amountNum < 1) return "Minimum transfer is $1.00.";
    if (total > balance) return "That's more than your available balance.";
    return "";
  }, [amount, amountNum, total, balance]);

  function pickBeneficiary(b) {
    setRecipient({ name: b.name, bank: b.bank, account: b.account });
  }

  function handlePinChange(i, v) {
    if (!/^\d?$/.test(v)) return;
    const next = [...pin];
    next[i] = v;
    setPin(next);
    setError("");
    if (v && i < 3) pinRefs[i + 1].current?.focus();
  }

  function handlePinKeyDown(i, e) {
    if (e.key === "Backspace" && !pin[i] && i > 0) pinRefs[i - 1].current?.focus();
  }

  function confirmTransfer() {
    if (pin.join("") !== DEMO_PIN) {
      setError("Incorrect PIN. Hint: the PIN is 1234.");
      setPin(["", "", "", ""]);
      pinRefs[0].current?.focus();
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const result = makeTransfer({
        recipientName: recipient.name,
        bank: recipient.bank,
        amount: amountNum,
        fee: FLAT_FEE,
        note,
      });
      setProcessing(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setBalance(result.newBalance);
      setReceipt(result);
    }, 1600);
  }

  function resetFlow() {
    setStep(0);
    setRecipient({ name: "", bank: "", account: "" });
    setAmount("");
    setNote("");
    setPin(["", "", "", ""]);
    setError("");
    setReceipt(null);
  }

  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-mist">
        <p className="text-sm text-gray-500">Loading…</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-mist">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-ink">
            ← Dashboard
          </Link>
          <span className="font-display font-bold">Send money</span>
          <span className="text-sm text-gray-500">
            Bal: <span className="font-semibold text-ink">{formatUSD(balance)}</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-5 pb-16 pt-8">
        {/* Progress */}
        {!receipt && (
          <ol className="mb-8 flex items-center gap-2">
            {stepsMeta.map((s, i) => (
              <li key={s} className="flex flex-1 flex-col gap-1.5">
                <span
                  className={`h-1.5 rounded-full ${
                    i <= step ? "bg-violet-600" : "bg-gray-200"
                  }`}
                />
                <span
                  className={`text-[11px] font-semibold ${
                    i <= step ? "text-violet-700" : "text-gray-400"
                  }`}
                >
                  {s}
                </span>
              </li>
            ))}
          </ol>
        )}

        {/* STEP 0 — Recipient */}
        {!receipt && step === 0 && (
          <div className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-gray-100">
            <h1 className="font-display text-xl font-bold">Who are you sending to?</h1>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Saved beneficiaries
            </p>
            <div className="mt-3 grid gap-2">
              {beneficiaries.map((b) => {
                const active = recipient.account === b.account;
                return (
                  <button
                    key={b.id}
                    onClick={() => pickBeneficiary(b)}
                    className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      active
                        ? "border-violet-500 bg-violet-25 ring-2 ring-violet-100"
                        : "border-gray-100 hover:border-violet-200"
                    }`}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                      {b.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{b.name}</span>
                      <span className="block text-xs text-gray-500">
                        {b.bank} · {b.account}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-gray-400">
              <span className="h-px flex-1 bg-gray-100" /> or enter details{" "}
              <span className="h-px flex-1 bg-gray-100" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="rname">Recipient name</label>
                <input
                  id="rname"
                  className="input"
                  placeholder="Jane Cooper"
                  value={recipient.name}
                  onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="rbank">Bank name</label>
                <input
                  id="rbank"
                  className="input"
                  placeholder="Chase Bank"
                  value={recipient.bank}
                  onChange={(e) => setRecipient({ ...recipient, bank: e.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="racct">Account number</label>
                <input
                  id="racct"
                  className="input"
                  placeholder="9–12 digits"
                  inputMode="numeric"
                  value={recipient.account}
                  onChange={(e) =>
                    setRecipient({ ...recipient, account: e.target.value.replace(/\D/g, "") })
                  }
                />
                {recipient.account && !/^\d{9,12}$/.test(recipient.account) && (
                  <p className="mt-1.5 text-xs text-red-500">
                    Account numbers are 9–12 digits.
                  </p>
                )}
              </div>
            </div>

            <button
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!canContinueRecipient}
              onClick={() => setStep(1)}
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 1 — Amount */}
        {!receipt && step === 1 && (
          <div className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-gray-100">
            <h1 className="font-display text-xl font-bold">How much?</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sending to <span className="font-semibold text-ink">{recipient.name}</span> · {recipient.bank}
            </p>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-mist p-5">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-400" htmlFor="amt">
                Amount (USD)
              </label>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold text-gray-400">$</span>
                <input
                  id="amt"
                  className="w-full bg-transparent font-display text-4xl font-extrabold tracking-tight outline-none placeholder:text-gray-300"
                  placeholder="0.00"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d.]/g, "");
                    if ((v.match(/\./g) || []).length <= 1) setAmount(v);
                  }}
                />
              </div>
              <div className="mt-3 flex gap-2">
                {[50, 100, 250, 500].map((q) => (
                  <button
                    key={q}
                    onClick={() => setAmount(String(q))}
                    className="rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 hover:border-violet-400"
                  >
                    ${q}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="label" htmlFor="note">Note (optional)</label>
              <input
                id="note"
                className="input"
                placeholder="e.g. July rent"
                maxLength={60}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="mt-5 space-y-2 rounded-2xl border border-gray-100 p-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Transfer fee</span>
                <span>{formatUSD(FLAT_FEE)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total debit</span>
                <span>{formatUSD(total)}</span>
              </div>
            </div>

            {amountError && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {amountError}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button className="btn-ghost flex-1" onClick={() => setStep(0)}>
                Back
              </button>
              <button
                className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!amount || !!amountError}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Review */}
        {!receipt && step === 2 && (
          <div className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-gray-100">
            <h1 className="font-display text-xl font-bold">Review transfer</h1>
            <div className="mt-6 divide-y divide-gray-100 rounded-2xl border border-gray-100">
              {[
                ["Recipient", recipient.name],
                ["Bank", recipient.bank],
                ["Account number", recipient.account],
                ["Amount", formatUSD(amountNum)],
                ["Fee", formatUSD(FLAT_FEE)],
                ["Total debit", formatUSD(total)],
                ["Note", note || "—"],
                ["Arrival", "Instant"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button className="btn-ghost flex-1" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn-primary flex-1" onClick={() => setStep(3)}>
                Looks good
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — PIN */}
        {!receipt && step === 3 && (
          <div className="rounded-3xl bg-white p-7 text-center shadow-card ring-1 ring-gray-100">
            {processing ? (
              <div className="py-10">
                <span className="mx-auto block h-12 w-12 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
                <p className="mt-5 font-display font-semibold">
                  Sending {formatUSD(amountNum)} to {recipient.name}…
                </p>
                <p className="mt-1 text-sm text-gray-500">Hold on a second.</p>
              </div>
            ) : (
              <>
                <h1 className="font-display text-xl font-bold">Enter your PIN</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Authorize a transfer of{" "}
                  <span className="font-semibold text-ink">{formatUSD(total)}</span>
                </p>
                <div className="mt-7 flex justify-center gap-3">
                  {pin.map((d, i) => (
                    <input
                      key={i}
                      ref={pinRefs[i]}
                      type="password"
                      inputMode="numeric"
                      maxLength={1}
                      value={d}
                      onChange={(e) => handlePinChange(i, e.target.value)}
                      onKeyDown={(e) => handlePinKeyDown(i, e)}
                      className="h-14 w-14 rounded-2xl border border-gray-200 text-center font-display text-2xl font-bold focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100"
                      aria-label={`PIN digit ${i + 1}`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-400"> PIN: 1234</p>
                {error && (
                  <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                  </p>
                )}
                <div className="mt-7 flex gap-3">
                  <button className="btn-ghost flex-1" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button
                    className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={pin.some((d) => !d)}
                    onClick={confirmTransfer}
                  >
                    Confirm transfer
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* RECEIPT */}
        {receipt && (
          <div className="rounded-3xl bg-white p-7 text-center shadow-card ring-1 ring-gray-100">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-3xl">
              ✅
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold">Transfer successful</h1>
            <p className="mt-1 text-sm text-gray-500">
              {formatUSD(amountNum)} is on its way to {recipient.name}.
            </p>

            <div className="mt-6 divide-y divide-dashed divide-gray-200 rounded-2xl border border-gray-100 bg-mist text-left">
              {[
                ["Reference", receipt.reference],
                ["Date", receipt.date],
                ["Recipient", `${recipient.name} · ${recipient.bank}`],
                ["Account", recipient.account],
                ["Amount", formatUSD(amountNum)],
                ["Fee", formatUSD(FLAT_FEE)],
                ["New balance", formatUSD(receipt.newBalance)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex gap-3">
              <button className="btn-ghost flex-1" onClick={resetFlow}>
                New transfer
              </button>
              <Link href="/dashboard" className="btn-primary flex-1">
                Back to dashboard
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
