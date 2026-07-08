# Krest Bank 🏦 (Demo)

A USD-only digital bank website built with **Next.js 14 (App Router)** and **Tailwind CSS**.

## Pages

| Route        | What it is                                              |
| ------------ | ------------------------------------------------------- |
| `/`          | Landing page (hero, features, steps, CTA)               |
| `/contact`   | Contact page with a working demo form                   |
| `/signup`    | Sign up — any details work, then you land on the dashboard |
| `/login`     | Log in with the demo details below                      |
| `/dashboard` | USD dashboard — balance, account card, virtual card, transactions |

## Demo login

```
Email:    demo@krest.bank
Password: demo1234
```

Login state is saved to `localStorage` (no backend). "Log out" on the dashboard clears it.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Notes

- Everything is in USD only — no other currencies.
- All data (balance, transactions, card) is dummy data hardcoded in `app/dashboard/page.js`. Edit it there.
- Colors and fonts live in `tailwind.config.js` (violet theme, Sora + Inter fonts).

## Transfer money (new)

- Go to **Dashboard → Send** or visit `/transfer`.
- 4-step flow like a real bank: pick a saved beneficiary or enter details → amount + fee breakdown → review → PIN confirmation → receipt with reference number.
- **Demo transaction PIN: `1234`**
- Transfers actually debit your balance and show up in the dashboard transaction list (stored in `localStorage`).
- Use **"Reset demo data"** on the dashboard to restore the starting balance.
