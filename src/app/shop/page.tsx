import { Suspense } from "react";
import Image from "next/image";

import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAllProducts, filterProducts } from "@/lib/products";

type ShopPageProps = {
  searchParams: Promise<{ category?: string; sort?: string }>;
};

export const metadata = {
  title: "Shop | RBS Ammunition",
  description: "Browse all RBS Ammunition products — handgun ammo, rifle ammo, shotgun shells, and reloading components.",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, sort } = await searchParams;
  const allProducts = getAllProducts();
  const products = filterProducts(allProducts, category, sort);

  return (
    <>
      <SiteHeader />

      <main>
        {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden border-b border-border">
          <div className="absolute inset-0">
            <Image
              src="/americanflag22.webp"
              alt="Shop RBS Ammunition"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,11,10,0.92),rgba(9,11,10,0.72),rgba(9,11,10,0.9))]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-primary">RBS Ammunition</p>
            <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.1em] text-text sm:text-5xl">
              {category && category !== "All" ? category : "All Products"}
            </h1>
            <p className="mt-3 text-muted">
              {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
          </div>
        </section>

        {/* ── FILTERS + GRID ───────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Suspense>
            <ShopFilters />
          </Suspense>

          {products.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="font-display text-xl uppercase tracking-[0.1em] text-muted">No products found</p>
              <p className="mt-2 text-sm text-muted/70">Try a different category or filter.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
