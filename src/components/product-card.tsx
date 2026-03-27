import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ProductCardItem } from "@/lib/catalog";

type ProductCardProps = {
  product: ProductCardItem;
};

export function ProductCard({ product }: ProductCardProps) {
  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-panel transition-colors hover:border-primary/50 hover:bg-surface-strong">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 320px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-end bg-[linear-gradient(145deg,rgba(23,28,25,0.96),rgba(14,17,15,0.98))] p-5">
            <div className="rounded-2xl border border-dashed border-border bg-background/80 px-4 py-3 font-display text-xs uppercase tracking-[0.22em] text-muted">
              {product.imageLabel}
            </div>
          </div>
        )}

        {product.status ? (
          <div className="absolute left-4 top-4 rounded-full border border-border bg-background/90 px-3 py-1 font-display text-[11px] uppercase tracking-[0.2em] text-text backdrop-blur">
            {product.status}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-3">
          <h3 className="text-lg leading-7 text-text">{product.title}</h3>
          <p className="font-display text-xl uppercase tracking-[0.08em] text-primary">{product.price}</p>
        </div>

        <div className="mt-auto space-y-2 text-sm leading-7 text-muted">
          {product.status ? <p>{`Status: ${product.status}`}</p> : null}
          {product.tags ? <p>{`Tags: ${product.tags}`}</p> : null}
        </div>

        {product.href ? (
          <div className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.24em] text-text">
            {product.title}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        ) : null}
      </div>
    </article>
  );

  if (product.href) {
    return (
      <Link href={product.href} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
}

