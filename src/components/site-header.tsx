import Image from "next/image";
import Link from "next/link";

import { CartBadge } from "@/components/cart-badge";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-full border border-border bg-surface/90 px-3 py-2 shadow-panel transition-colors hover:border-primary/60 hover:bg-surface-strong"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-border/80 bg-background">
            <Image src="/rbs-logo-full-min.webp" alt="RBS Ammunition" fill className="object-contain p-1" />
          </div>
          <span className="truncate font-display text-sm uppercase tracking-[0.28em] text-text sm:text-base">
            RBS Ammunition
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-2 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-border/60 bg-surface/75 px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:border-primary/50 hover:bg-surface hover:text-text"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <CartBadge />
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:hidden sm:px-6">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-border bg-surface px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:border-primary/50 hover:text-text"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
