"use client";

import { useState } from "react";

import { AddToCartButton } from "@/components/add-to-cart-button";
import type { Product, ProductVariant } from "@/lib/products";

function formatVariantOption(variant: ProductVariant) {
  const label = variant.roundCount === 250 ? "250ct Sport Pack" : variant.label;
  const stockLabel = variant.inStock ? "" : " - Out of Stock";

  return `${label} - $${variant.price.toFixed(2)}${stockLabel}`;
}

export function VariantSelector({ product, compact = false }: { product: Product; compact?: boolean }) {
  const [selected, setSelected] = useState<ProductVariant>(
    product.variants!.find((variant) => variant.inStock) ?? product.variants![0],
  );
  const selectId = `box-count-${product.slug}`;

  return (
    <div className={compact ? "space-y-3" : "space-y-5"}>
      <div className={compact ? "space-y-2" : "space-y-3"}>
        <label
          htmlFor={selectId}
          className="block font-display text-[10px] uppercase tracking-[0.28em] text-muted"
        >
          Box Count
        </label>
        <select
          id={selectId}
          value={selected.id}
          onChange={(event) => {
            const nextVariant = product.variants!.find((variant) => variant.id === event.target.value);
            if (nextVariant) setSelected(nextVariant);
          }}
          className="w-full rounded-[1.25rem] border border-border bg-background px-4 py-3 font-display text-xs uppercase tracking-[0.16em] text-text focus:border-primary/60 focus:outline-none sm:text-sm"
        >
          {product.variants!.map((variant) => (
            <option key={variant.id} value={variant.id} disabled={!variant.inStock}>
              {formatVariantOption(variant)}
            </option>
          ))}
        </select>
        {!compact && (
          <p className="text-xs text-muted">
            Selected: {formatVariantOption(selected)}
          </p>
        )}
      </div>

      <AddToCartButton
        product={product}
        selectedVariant={selected}
        className={compact ? "w-full px-4 py-2.5 text-[11px]" : undefined}
      />
    </div>
  );
}
