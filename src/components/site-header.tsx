import Image from "next/image";
import Link from "next/link";

import { CartBadge } from "@/components/cart-badge";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-75">
          <div className="relative h-20 w-64 sm:h-24 sm:w-80 lg:h-28 lg:w-96">
            <Image
              src="/rbs-logo-full-min.webp"
              alt="RBS Ammunition"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-3 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-border px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.2em] text-text transition-colors hover:border-primary/60 hover:bg-surface hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <CartBadge />
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden sm:px-6">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-border px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.22em] text-text transition-colors hover:border-primary/60 hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
