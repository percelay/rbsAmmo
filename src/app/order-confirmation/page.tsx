import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type OrderConfirmationPageProps = {
  searchParams: Promise<{ orderId?: string }>;
};

export const metadata = {
  title: "Order Confirmed | RBS Ammunition",
};

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const { orderId } = await searchParams;

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>

          <div className="space-y-3">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">Order Placed</p>
            <h1 className="font-display text-4xl uppercase tracking-[0.08em] text-text">Thank You!</h1>
            <p className="text-lg leading-8 text-muted">
              Your order has been received. We&apos;ll be in touch with payment and shipping details.
            </p>
          </div>

          {orderId && (
            <div className="rounded-[1.75rem] border border-border bg-surface p-6 text-left shadow-panel">
              <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted">Order Reference</p>
              <p className="mt-2 break-all font-mono text-sm text-text">{orderId}</p>
            </div>
          )}

          <div className="rounded-[1.75rem] border border-border bg-surface p-6 text-left shadow-panel">
            <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">What Happens Next</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              <li>1. We&apos;ll review your order and verify eligibility.</li>
              <li>2. You&apos;ll receive an email with payment instructions.</li>
              <li>3. Once payment is confirmed, we&apos;ll ship via UPS Ground.</li>
              <li>4. You&apos;ll receive a tracking number when your order ships.</li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-primary/20 bg-surface px-5 py-4 text-sm text-muted">
            Questions? Call us at{" "}
            <a href="tel:3607553000" className="text-primary transition-colors hover:text-primary-strong">
              360-755-3000
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary-strong"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-text transition-colors hover:border-primary/40"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
