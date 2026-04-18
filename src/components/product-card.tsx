import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPriceRange, type Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const hasVariants = !!product.variants && product.variants.length > 1;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-panel transition-colors hover:border-primary/50 hover:bg-surface-strong">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
          {product.imageSrc ? (
            <Image
              src={product.imageSrc}
              alt={product.name}
              fill
              sizes="(min-width: 1280px) 320px, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-end bg-[linear-gradient(145deg,rgba(23,28,25,0.96),rgba(14,17,15,0.98))] p-5">
              <div className="rounded-2xl border border-dashed border-border bg-background/80 px-4 py-3 font-display text-xs uppercase tracking-[0.22em] text-muted">
                {product.caliber}
              </div>
            </div>
          )}

          {!product.inStock && (
            <div className="absolute left-4 top-4 rounded-full border border-border bg-background/90 px-3 py-1 font-display text-[11px] uppercase tracking-[0.2em] text-muted backdrop-blur">
              Out of Stock
            </div>
          )}

          <div className="absolute right-4 top-4 rounded-full border border-border/60 bg-background/80 px-3 py-1 font-display text-[11px] uppercase tracking-[0.2em] text-primary backdrop-blur">
            {product.category}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-1">
          <Link href={`/shop/${product.slug}`} className="block">
            <h3 className="text-base leading-6 text-text transition-colors hover:text-primary">{product.name}</h3>
          </Link>
          <p className="text-sm text-muted">
            {product.caliber}
            {product.grain ? ` · ${product.grain}gr` : ""}
            {" · "}{hasVariants ? "50 / 250 ct" : `${product.roundCount} ct`}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <p className="font-display text-xl uppercase tracking-[0.06em] text-primary">
            {formatPriceRange(product)}
          </p>

          {hasVariants ? (
            <Link
              href={`/shop/${product.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-strong px-4 py-2.5 font-display text-xs uppercase tracking-[0.2em] text-text transition-colors hover:border-primary/50"
            >
              Options
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <AddToCartButton product={product} />
          )}
        </div>
      </div>
    </article>
  );
}
