"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/context/CartContext";

export function CartBadge() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative ml-auto inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary px-4 py-2 font-display text-xs uppercase tracking-[0.24em] text-background shadow-panel transition-colors hover:bg-primary-strong sm:ml-0 sm:text-sm"
    >
      <ShoppingCart className="h-4 w-4" />
      <span className="hidden sm:inline">Cart</span>
      {itemCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-background text-[10px] font-bold text-primary ring-1 ring-primary/40">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}
