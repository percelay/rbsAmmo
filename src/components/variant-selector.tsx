"use client";

import { useState } from "react";

import { AddToCartButton } from "@/components/add-to-cart-button";
import type { Product, ProductVariant } from "@/lib/products";

function formatVariantOption(variant: ProductVariant) {
  const label = variant.roundCount === 250 ? "250ct Sport Pack" : variant.label;
  const stockLabel = variant.inStock ? "" : " - Out of Stock";

  return `${label} - $${variant.price.toFixed(2)}${stockLabel}`;
}

export function VariantSelector({ product }: { product: Product }) {
  const [selected, setSelected] = useState<ProductVariant>(
    product.variants!.find((variant) => variant.inStock) ?? product.variants![0],
  );

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label
          htmlFor="box-count"
          className="block font-display text-[10px] uppercase tracking-[0.28em] text-muted"
        >
          Box Count
        </label>
        <select
          id="box-count"
          value={selected.id}
          onChange={(event) => {
            const nextVariant = product.variants!.find((variant) => variant.id === event.target.value);
            if (nextVariant) setSelected(nextVariant);
          }}
          className="w-full rounded-[1.25rem] border border-border bg-background px-4 py-3 font-display text-sm uppercase tracking-[0.16em] text-text focus:border-primary/60 focus:outline-none"
        >
          {product.variants!.map((variant) => (
            <option key={variant.id} value={variant.id} disabled={!variant.inStock}>
              {formatVariantOption(variant)}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted">
          Selected: {formatVariantOption(selected)}
        </p>
      </div>

      <AddToCartButton product={product} selectedVariant={selected} />
    </div>
  );
}
