import Image from "next/image";
import Link from "next/link";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Cart", href: "/cart" },
];

const LEGAL = [
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Returns Policy", href: "/returns-policy" },
  { label: "Purchasing Requirements", href: "/purchasing-requirements" },
  { label: "Privacy Notice", href: "/privacy-notice" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/95">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1fr)] lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border bg-surface">
              <Image src="/rbs-logo-full-min.webp" alt="RBS Ammunition" fill className="object-contain p-1" />
            </div>
            <span className="font-display text-lg uppercase tracking-[0.24em] text-text">RBS Ammunition</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">
            High-quality ammunition built in Skagit Valley, WA. Proudly serving shooters, competitors,
            and law enforcement since 2012.
          </p>
          <div className="space-y-1 text-sm text-muted">
            <p>1309 Bouslog Road Suite 108</p>
            <p>Burlington, WA 98233</p>
            <a href="tel:3607553000" className="mt-2 block transition-colors hover:text-text">
              360-755-3000
            </a>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center rounded-full border border-primary/50 bg-primary px-5 py-3 font-display text-xs uppercase tracking-[0.24em] text-background transition-colors hover:bg-primary-strong"
          >
            Shop Now
          </Link>
        </div>

        <div className="space-y-4">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">Navigation</p>
          <div className="flex flex-col gap-3">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-text">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">Policies</p>
          <div className="flex flex-col gap-3">
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-text">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 rounded-[1.5rem] border border-border/60 bg-surface p-4">
            <p className="text-xs leading-6 text-muted">
              You must be 21 years or older to purchase from our website. We do not ship to NJ, CA,
              IL, or NY. All federal age requirements apply.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 px-4 py-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-muted/60">
          &copy; {new Date().getFullYear()} RBS Ammunition / Skagit Shooting Sports Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
