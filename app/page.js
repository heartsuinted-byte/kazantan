import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    title: "A real USD account",
    body: "Get a US account and routing number in your name. Receive ACH and wire payments from clients, platforms, and employers.",
    icon: (
      <path d="M3 10h18M5 10V8l7-4 7 4v2M6 10v8m4-8v8m4-8v8m4-8v8M4 18h16v2H4z" />
    ),
  },
  {
    title: "Get paid from anywhere",
    body: "Invoice in dollars and get settled in dollars. No forced conversions, no surprise deductions on the way in.",
    icon: <path d="M12 3v18m0-18c-2.5 0-4.5 1.6-4.5 3.5S9.5 10 12 10s4.5 1.6 4.5 3.5S14.5 17 12 17m0-14c1.8 0 3.4.8 4.1 2M12 21c-1.8 0-3.4-.8-4.1-2" />,
  },
  {
    title: "Spend globally",
    body: "A virtual dollar card that works on international checkouts — subscriptions, ads, tools, and travel.",
    icon: <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm0 3h18M6 15h4" />,
  },
  {
    title: "Bank-grade security",
    body: "Two-factor authentication, device approvals, and instant card freeze. Your money stays yours.",
    icon: <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3zm-2.5 9l2 2 3.5-4" />,
  },
];

const steps = [
  { n: "1", title: "Sign up in minutes", body: "Create your profile with just your name, email, and phone number." },
  { n: "2", title: "Verify your identity", body: "A quick ID check keeps your account safe and unlocks full limits." },
  { n: "3", title: "Fund and go", body: "Add dollars, share your account number, and start transacting same day." },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-violet-25 to-white">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:grid-cols-2 md:pt-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3 py-1 text-xs font-semibold text-violet-700">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                USD accounts, fully digital
              </p>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                The dollar account that lives in your pocket
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-gray-600">
                Open a US dollar account in minutes. Receive payments from
                anywhere in the world, hold your money in USD, and spend it
                globally — all from one app.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup" className="btn-primary">
                  Open a free account
                </Link>
                <Link href="/login" className="btn-ghost">
                  Log in to dashboard
                </Link>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                No monthly fees · No minimum balance
              </p>
            </div>

            {/* Account card mock */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-violet-100 blur-2xl" />
              <div className="relative rounded-3xl bg-white p-6 shadow-lift ring-1 ring-violet-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Total balance</p>
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
                    USD
                  </span>
                </div>
                <p className="mt-2 font-display text-4xl font-bold tracking-tight">
                  $12,480.36
                </p>
                <div className="mt-6 rounded-2xl border border-gray-100 bg-mist p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-lg ring-1 ring-gray-100">
                      🇺🇸
                    </span>
                    <div>
                      <p className="text-sm font-semibold">US Dollar account</p>
                      <p className="text-xs text-gray-500">Acct • 2188 7127 2941</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  {["Add money", "Send", "Card"].map((a) => (
                    <div
                      key={a}
                      className="rounded-xl border border-violet-100 bg-violet-25 py-3 text-xs font-semibold text-violet-700"
                    >
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Everything a dollar account should do
            </h2>
            <p className="mt-3 text-gray-600">
              Krest is built for freelancers, founders, and anyone who earns or
              saves in USD.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-violet-100"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-50 text-violet-600">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon}
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="bg-mist">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Open your account in three steps
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="rounded-2xl bg-white p-6 shadow-card">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-violet-600 font-display text-sm font-bold text-white">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="rounded-3xl bg-violet-600 px-8 py-14 text-center text-white md:px-16">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Your dollars deserve a better home
            </h2>
            <p className="mx-auto mt-3 max-w-md text-violet-100">
              Join thousands who already receive, hold, and spend USD with
              Krest.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Open a free account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
