"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  className?: string;
};

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        imageSrc: product.imageSrc,
      },
      quantity,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className={`inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 font-display text-xs uppercase tracking-[0.24em] text-muted opacity-60 sm:text-sm ${className ?? ""}`}
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-primary/50 bg-primary px-5 py-3 font-display text-xs uppercase tracking-[0.24em] text-background transition-colors hover:bg-primary-strong sm:text-sm ${className ?? ""}`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </>
      )}
    </button>
  );
}
