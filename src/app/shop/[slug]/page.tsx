import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VariantSelector } from "@/components/variant-selector";
import { formatPriceRange, formatRoundCountOptions } from "@/lib/products";
import { getProductBySlug, getProductsByCategory } from "@/lib/products-server";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "RBS Ammunition" };
  return {
    title: `${product.name} | RBS Ammunition`,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = (await getProductsByCategory(product.storefrontCategory))
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <SiteHeader />

      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.24em] text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>

        {/* ── PRODUCT DETAIL ───────────────────────────────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(320px,480px)_minmax(0,1fr)] lg:px-8">
            {/* Image */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface shadow-panel">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,138,59,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(123,138,87,0.18),transparent_48%)]" />
              {product.imageSrc ? (
                <div className="relative aspect-square">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center bg-surface-strong">
                  <p className="font-display text-xs uppercase tracking-[0.3em] text-muted">{product.caliber}</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/40 bg-surface px-3 py-1 font-display text-xs uppercase tracking-[0.2em] text-primary">
                    {product.category}
                  </span>
                  {!product.inStock && (
                    <span className="rounded-full border border-border bg-surface px-3 py-1 font-display text-xs uppercase tracking-[0.2em] text-muted">
                      Out of Stock
                    </span>
                  )}
                </div>
                <h1 className="font-display text-3xl uppercase tracking-[0.08em] text-text sm:text-4xl">
                  {product.name}
                </h1>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-border bg-surface p-4 shadow-panel">
                  <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted">Caliber</p>
                  <p className="mt-2 text-sm text-text">{product.caliber}</p>
                </div>
                {product.grain && (
                  <div className="rounded-[1.5rem] border border-border bg-surface p-4 shadow-panel">
                    <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted">Grain</p>
                    <p className="mt-2 text-sm text-text">{product.grain} gr</p>
                  </div>
                )}
                <div className="rounded-[1.5rem] border border-border bg-surface p-4 shadow-panel">
                  <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted">Count</p>
                  <p className="mt-2 text-sm text-text">{formatRoundCountOptions(product)}</p>
                </div>
                <div className="rounded-[1.5rem] border border-border bg-surface p-4 shadow-panel">
                  <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted">Brand</p>
                  <p className="mt-2 text-sm text-text">{product.brand}</p>
                </div>
              </div>

              {/* Price + CTA */}
              <div className="rounded-[2rem] border border-border bg-surface p-6 shadow-panel sm:p-8">
                <div className="space-y-5">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.28em] text-muted">Price</p>
                    <p className="mt-2 font-display text-4xl uppercase tracking-[0.06em] text-primary">
                      {formatPriceRange(product)}
                    </p>
                    {!product.variants && (
                      <p className="mt-1 text-xs text-muted">per {product.roundCount}-round box</p>
                    )}
                  </div>

                  {product.variants ? (
                    <VariantSelector product={product} />
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      <AddToCartButton product={product} />
                      <Link
                        href="/cart"
                        className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 font-display text-xs uppercase tracking-[0.24em] text-text transition-colors hover:border-primary/50 hover:bg-surface-strong sm:text-sm"
                      >
                        View Cart
                      </Link>
                    </div>
                  )}
                </div>

                <div className="mt-5 rounded-[1.25rem] border border-primary/20 bg-background px-4 py-3 text-xs leading-6 text-muted">
                  You must be 21+ for handgun ammunition and 18+ for rifle ammunition. We do not ship to NJ, CA, IL, or NY.
                </div>
              </div>

              {/* Description */}
              <div className="rounded-[2rem] border border-border bg-background p-6 shadow-panel sm:p-8">
                <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Description</p>
                <p className="mt-4 text-sm leading-8 text-muted">{product.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PRODUCTS ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <ProductGrid
            title={`More ${product.storefrontCategory} Products`}
            products={related}
            eyebrow="RBS Ammunition"
          />
        )}
      </main>

      <SiteFooter />
    </>
  );
}
