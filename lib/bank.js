// Client-side dummy "bank core" — keeps balance and transactions in
// localStorage so transfers actually move money around in the demo.

const KEY = "krest_bank_state";

const seed = {
  balance: 2618.36,
  transactions: [
    { id: "tx-6", label: "Payment from Upwork", date: "07 Jul, 2026", amount: 850.0, type: "in", status: "Completed" },
    { id: "tx-5", label: "Netflix subscription", date: "05 Jul, 2026", amount: -15.49, type: "out", status: "Completed" },
    { id: "tx-4", label: "Transfer to savings", date: "01 Jul, 2026", amount: -300.0, type: "out", status: "Completed" },
    { id: "tx-3", label: "Reward claimed", date: "28 Jun, 2026", amount: 3.34, type: "in", status: "Completed" },
    { id: "tx-2", label: "Card top-up", date: "22 Jun, 2026", amount: -120.0, type: "out", status: "Completed" },
    { id: "tx-1", label: "Payment from Deel", date: "16 Jun, 2026", amount: 1200.0, type: "in", status: "Completed" },
  ],
};

export const beneficiaries = [
  { id: "b1", name: "Sarah Mitchell", bank: "Chase Bank", account: "021000021458", initials: "SM" },
  { id: "b2", name: "David Okoro", bank: "Bank of America", account: "026009593112", initials: "DO" },
  { id: "b3", name: "Lena Torres", bank: "Wells Fargo", account: "121000248790", initials: "LT" },
];

export function getBankState() {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

export function resetBankState() {
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}

export function makeTransfer({ recipientName, bank, amount, fee, note }) {
  const state = getBankState();
  const total = amount + fee;
  if (total > state.balance) {
    return { ok: false, error: "Insufficient balance for this transfer." };
  }

  const reference =
    "KRS-" +
    Date.now().toString().slice(-6) +
    "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase();

  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const tx = {
    id: "tx-" + Date.now(),
    label: `Transfer to ${recipientName}`,
    date,
    amount: -total,
    type: "out",
    status: "Completed",
    meta: { bank, note, fee, reference },
  };

  const next = {
    balance: Math.round((state.balance - total) * 100) / 100,
    transactions: [tx, ...state.transactions],
  };
  localStorage.setItem(KEY, JSON.stringify(next));

  return { ok: true, reference, date, newBalance: next.balance };
}

export function formatUSD(n) {
  return `$${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
