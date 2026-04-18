"use client";

import { useState } from "react";

import { AddToCartButton } from "@/components/add-to-cart-button";
import type { Product, ProductVariant } from "@/lib/products";

export function VariantSelector({ product }: { product: Product }) {
  const [selected, setSelected] = useState<ProductVariant>(product.variants![0]);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted">Select Quantity</p>
        <div className="flex flex-wrap gap-3">
          {product.variants!.map((v) => (
            <button
              key={v.label}
              onClick={() => setSelected(v)}
              className={`flex flex-col items-start rounded-[1.25rem] border px-5 py-4 transition-colors ${
                selected.label === v.label
                  ? "border-primary bg-surface-strong text-text"
                  : "border-border bg-surface text-muted hover:border-primary/50 hover:text-text"
              }`}
            >
              <span className="font-display text-xs uppercase tracking-[0.2em]">{v.label}</span>
              <span className="mt-1.5 font-display text-xl uppercase tracking-[0.06em] text-primary">
                ${v.price.toFixed(2)}
              </span>
              <span className="mt-0.5 text-xs text-muted">{v.roundCount} rounds</span>
            </button>
          ))}
        </div>
      </div>

      <AddToCartButton product={product} selectedVariant={selected} />
    </div>
  );
}
