import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-mist">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-600 font-display font-bold text-white">
              K
            </span>
            <span className="font-display text-lg font-bold">Krest</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
            A digital dollar bank. Open a USD account in minutes, receive
            payments from anywhere, and spend globally with a Krest card.
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
            <li><Link href="/signup" className="hover:text-ink">Open an account</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold">Support</p>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li>help@krest.bank</li>
            <li>+1 (555) 014-2026</li>
            <li>Mon–Sat, 8am–8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200/70 py-5 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Krest Financial Inc. Demo project — not a real bank.
      </div>
    </footer>
  );
}
