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
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-75">
          <div className="relative h-16 w-48">
            <Image
              src="/rbs-logo-full-min.webp"
              alt="RBS Ammunition"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-2 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-border px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:border-primary/50 hover:bg-surface hover:text-text"
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
            className="shrink-0 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:border-primary/50 hover:text-text"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
