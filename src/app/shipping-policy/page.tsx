import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Shipping & Pickup Policy | RBS Ammunition",
  description:
    "RBS Ammunition shipping and in-store pickup policy, including pickup deadlines and abandoned-property terms.",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.22em] text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>

          <h1 className="mt-8 font-display text-4xl font-bold uppercase tracking-[0.08em] text-text sm:text-5xl">
            Shipping &amp; Pickup Policy
          </h1>

          <div className="mt-10 space-y-8 text-base leading-8 text-text/90">
            <section className="space-y-3">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-text">
                In-Store Pickup
              </h2>
              <p>
                In-store pickup is available at Skagit Shooting Range in Burlington, WA. You will
                receive an order confirmation email when your purchase is placed and a second email
                when your order is processed and ready for pickup.
              </p>
              <p className="rounded-2xl border-2 border-primary/40 bg-surface p-5 font-semibold text-text">
                All ammunition orders must be picked up within 90 days, or they will be considered
                abandoned property and restocked.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-text">
                Shipping
              </h2>
              <p>
                We ship ammunition via UPS Ground and FedEx Ground only. Shipping rates are calculated
                in real time at checkout based on your destination ZIP code, package weight, and the
                carrier you select.
              </p>
              <p>
                We do not ship to NJ, CA, IL, or NY. All federal, state, and local laws apply.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-text">
                Choosing Shipping or Pickup
              </h2>
              <p>
                At checkout you must actively choose between shipping and in-store pickup before
                payment can be completed. A confirmation prompt will ask you to verify your selection
                before your card is charged.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-text">
                Age &amp; Eligibility
              </h2>
              <p>
                You must be 21 years or older to purchase handgun ammunition and 18 years or older to
                purchase rifle ammunition. All purchases require age verification at checkout.
              </p>
            </section>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
