import { Suspense } from "react";
import Image from "next/image";

import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { filterProducts } from "@/lib/products";
import { getAllProducts } from "@/lib/products-server";

type ShopPageProps = {
  searchParams: Promise<{ category?: string; sort?: string }>;
};

export const metadata = {
  title: "Shop | RBS Ammunition",
  description: "Browse all RBS Ammunition products — handgun ammo, rifle ammo, shotgun shells, and reloading components.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, sort } = await searchParams;
  const allProducts = await getAllProducts();
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
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.88),rgba(0,0,0,0.7)_45%,rgba(0,0,0,0.92))]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <p
              className="font-display text-base font-bold uppercase tracking-[0.4em] text-white"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
            >
              RBS Ammunition
            </p>
            <h1
              className="mt-5 font-display text-5xl font-bold uppercase tracking-[0.08em] text-white sm:text-6xl lg:text-7xl"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.7), 0 1px 0 rgba(0,0,0,0.6)" }}
            >
              {category && category !== "All" ? category : "All Products"}
            </h1>
            <p
              className="mt-4 text-lg font-semibold text-white/95"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
            >
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
