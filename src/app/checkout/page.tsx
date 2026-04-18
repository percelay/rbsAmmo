"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/app/actions";

const ALLOWED_STATES = [
  "AL","AK","AZ","AR","CO","CT","DE","FL","GA","HI","ID","IN","IA","KS",
  "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NM",
  "NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA",
  "WA","WV","WI","WY",
];

const STATE_NAMES: Record<string, string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CO:"Colorado",
  CT:"Connecticut",DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",
  ID:"Idaho",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",
  ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",
  MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",
  NH:"New Hampshire",NM:"New Mexico",NC:"North Carolina",ND:"North Dakota",
  OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",
  SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",
  VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",
  WI:"Wisconsin",WY:"Wyoming",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [ageVerified, setAgeVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ageVerified || items.length === 0) return;

    setSubmitting(true);
    setError(null);

    const result = await createOrder({
      customerName: form.name,
      customerEmail: form.email,
      street: form.street,
      city: form.city,
      state: form.state,
      zip: form.zip,
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal,
      ageVerified,
    });

    if (!result.success) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/order-confirmation?orderId=${result.orderId}`);
  }

  if (items.length === 0) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="font-display text-xl uppercase tracking-[0.1em] text-muted">Your cart is empty.</p>
          <Link href="/shop" className="mt-6 inline-flex rounded-full border border-primary/50 bg-primary px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary-strong">
            Shop Now
          </Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">RBS Ammunition</p>
          <h1 className="font-display text-4xl uppercase tracking-[0.08em] text-text">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* ── SHIPPING FORM ─────────────────────────────────────────────── */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-panel sm:p-8">
              <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Shipping Information</p>

              <div className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="font-display text-[10px] uppercase tracking-[0.28em] text-muted" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-[1rem] border border-border bg-background px-4 py-3 text-sm text-text placeholder-muted/50 focus:border-primary/50 focus:outline-none"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-display text-[10px] uppercase tracking-[0.28em] text-muted" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-[1rem] border border-border bg-background px-4 py-3 text-sm text-text placeholder-muted/50 focus:border-primary/50 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-display text-[10px] uppercase tracking-[0.28em] text-muted" htmlFor="street">
                    Street Address
                  </label>
                  <input
                    id="street"
                    name="street"
                    type="text"
                    required
                    value={form.street}
                    onChange={handleChange}
                    className="w-full rounded-[1rem] border border-border bg-background px-4 py-3 text-sm text-text placeholder-muted/50 focus:border-primary/50 focus:outline-none"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2 sm:col-span-1">
                    <label className="font-display text-[10px] uppercase tracking-[0.28em] text-muted" htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="w-full rounded-[1rem] border border-border bg-background px-4 py-3 text-sm text-text placeholder-muted/50 focus:border-primary/50 focus:outline-none"
                      placeholder="Burlington"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-display text-[10px] uppercase tracking-[0.28em] text-muted" htmlFor="state">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      className="w-full rounded-[1rem] border border-border bg-background px-4 py-3 text-sm text-text focus:border-primary/50 focus:outline-none"
                    >
                      <option value="">Select…</option>
                      {ALLOWED_STATES.map((code) => (
                        <option key={code} value={code}>
                          {STATE_NAMES[code] ?? code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-display text-[10px] uppercase tracking-[0.28em] text-muted" htmlFor="zip">
                      ZIP Code
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      required
                      pattern="\d{5}(-\d{4})?"
                      value={form.zip}
                      onChange={handleChange}
                      className="w-full rounded-[1rem] border border-border bg-background px-4 py-3 text-sm text-text placeholder-muted/50 focus:border-primary/50 focus:outline-none"
                      placeholder="98233"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Age verification */}
            <div className="rounded-[2rem] border border-primary/30 bg-surface p-6 shadow-panel">
              <label className="flex cursor-pointer items-start gap-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-background transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={ageVerified}
                    onChange={(e) => setAgeVerified(e.target.checked)}
                    required
                  />
                  {ageVerified && (
                    <svg className="h-3 w-3 text-background" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-display text-sm uppercase tracking-[0.1em] text-text">Age Verification Required</p>
                  <p className="text-sm leading-6 text-muted">
                    I confirm I am at least 21 years of age and legally allowed to purchase ammunition in my
                    state. I certify that I am a U.S. citizen or resident alien.
                  </p>
                </div>
              </label>
            </div>

            {error && (
              <div className="rounded-[1.5rem] border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <p className="text-xs leading-6 text-muted">
              Payment integration coming soon. Placing your order saves it to our system — we will contact
              you to arrange payment via our secure FluidPay processor.
            </p>
          </div>

          {/* ── ORDER SUMMARY ─────────────────────────────────────────────── */}
          <div className="h-fit space-y-4">
            <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-panel">
              <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Order Summary</p>

              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted">
                      {item.name}{" "}
                      <span className="text-muted/60">×{item.quantity}</span>
                    </span>
                    <span className="shrink-0 text-text">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-text">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping (UPS Ground)</span>
                  <span className="text-muted">TBD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax</span>
                  <span className="text-muted">TBD</span>
                </div>
                <div className="mt-3 flex justify-between border-t border-border pt-3">
                  <span className="font-display text-sm uppercase tracking-[0.1em] text-text">Total</span>
                  <span className="font-display text-xl uppercase tracking-[0.06em] text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!ageVerified || submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary px-6 py-4 font-display text-sm uppercase tracking-[0.2em] text-background shadow-panel transition-colors hover:bg-primary-strong disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShieldCheck className="h-4 w-4" />
              {submitting ? "Placing Order…" : "Place Order"}
            </button>

            <Link
              href="/cart"
              className="flex w-full items-center justify-center rounded-full border border-border px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:border-primary/40 hover:text-text"
            >
              Back to Cart
            </Link>
          </div>
        </form>
      </main>

      <SiteFooter />
    </>
  );
}
