"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">RBS Ammunition</p>
          <h1 className="font-display text-4xl uppercase tracking-[0.08em] text-text">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-6 text-center">
            <ShoppingBag className="h-16 w-16 text-muted/40" />
            <div className="space-y-2">
              <p className="font-display text-xl uppercase tracking-[0.1em] text-muted">Your cart is empty</p>
              <p className="text-sm text-muted/70">Add some ammunition to get started.</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full border border-primary/50 bg-primary px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-background transition-colors hover:bg-primary-strong"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* ── ITEM LIST ───────────────────────────────────────────────── */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 rounded-[1.75rem] border border-border bg-surface p-4 shadow-panel sm:gap-6 sm:p-6"
                >
                  {/* Image */}
                  <Link href={`/shop/${item.slug}`} className="shrink-0">
                    <div className="relative h-20 w-20 overflow-hidden rounded-[1rem] border border-border bg-surface-strong sm:h-24 sm:w-24">
                      {item.imageSrc ? (
                        <Image src={item.imageSrc} alt={item.name} fill className="object-cover" sizes="96px" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-surface-strong" />
                      )}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/shop/${item.slug}`}
                        className="text-sm leading-6 text-text transition-colors hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-surface-strong hover:text-text"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1 rounded-full border border-border bg-background px-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-display text-sm text-text">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="font-display text-lg uppercase tracking-[0.08em] text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── ORDER SUMMARY ───────────────────────────────────────────── */}
            <div className="h-fit rounded-[2rem] border border-border bg-surface p-6 shadow-panel sm:p-8">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">Order Summary</p>

              <div className="mt-5 space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-muted">
                      {item.name} <span className="text-muted/60">×{item.quantity}</span>
                    </span>
                    <span className="text-text">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm uppercase tracking-[0.1em] text-muted">Subtotal</span>
                  <span className="font-display text-xl uppercase tracking-[0.06em] text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted">Shipping and tax calculated at checkout.</p>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-full border border-primary/50 bg-primary px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-background shadow-panel transition-colors hover:bg-primary-strong"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-border bg-transparent px-6 py-3 font-display text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:border-primary/40 hover:text-text"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
