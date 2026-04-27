import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedProducts } from "@/lib/products-server";

const CATEGORY_TILES = [
  {
    label: "Pistol Ammo",
    href: "/shop?category=Pistol",
    image: "/newphotos/stockbullets2.png",
  },
  {
    label: "Rifle Ammo",
    href: "/shop?category=Rifle",
    image: "/products/2.23-brass-Small.jpg",
  },
  {
    label: "Reloading",
    href: "/shop?category=Reloading",
    image: "/newphotos/stockBullets.png",
  },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeaturedProducts(6);

  return (
    <>
      <SiteHeader />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden border-b border-border">
          <div className="absolute inset-0">
            <Image
              src="/newphotos/storefront.png"
              alt="RBS Ammunition storefront"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.78),rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.85))]" />
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-7 px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
            <p
              className="font-display text-sm font-semibold uppercase tracking-[0.4em] text-white/90"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
            >
              Skagit Valley · Made in the USA
            </p>
            <h1
              className="max-w-4xl font-display text-5xl font-bold uppercase tracking-[0.08em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.65), 0 1px 0 rgba(0,0,0,0.6)" }}
            >
              RBS Ammunition
            </h1>
            <p
              className="max-w-2xl text-xl font-medium leading-9 text-white sm:text-2xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
            >
              High-quality ammunition built in the Pacific Northwest. Trusted by law enforcement,
              competitive shooters, and major wholesalers across the region.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.22em] text-white shadow-panel transition-colors hover:bg-primary-strong"
              >
                Shop All Ammo
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/shipping-policy"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-8 py-4 font-display text-base font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Pickup &amp; Shipping
              </Link>
            </div>
          </div>
        </section>

        {/* ── CATEGORY TILES ───────────────────────────────────────────────── */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="mb-10 text-center">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.4em] text-primary">
                Shop by Category
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-[0.08em] text-text sm:text-5xl">
                Find Your Round
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {CATEGORY_TILES.map(({ label, href, image }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[2rem] border border-border shadow-panel transition-transform hover:-translate-y-1"
                >
                  <Image
                    src={image}
                    alt={label}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.25)_100%)]" />
                  <div className="relative flex flex-col items-start gap-5 p-7 sm:p-8">
                    <h3
                      className="font-display text-3xl font-bold uppercase tracking-[0.1em] text-white sm:text-4xl"
                      style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}
                    >
                      {label}
                    </h3>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-panel transition-colors group-hover:bg-primary-strong">
                      Shop Now
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT + MADE-IN-USA ──────────────────────────────────────────── */}
        <section className="border-b border-border bg-surface/50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="space-y-6">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.36em] text-primary">
                  About RBS
                </p>
                <h2 className="font-display text-4xl font-bold uppercase tracking-[0.08em] text-text sm:text-5xl">
                  A Team of Shooters Who Build Ammo
                </h2>
                <p className="text-lg font-medium leading-8 text-text/90">
                  At RBS Ammunition, we&apos;re a team of shooters, competitors, and firearm enthusiasts who
                  take pride in producing quality ammunition that performs when it matters most. We
                  understand what makes a great round — because we shoot, train, and compete just like our
                  customers do.
                </p>
                <p className="text-lg font-medium leading-8 text-text/90">
                  Based in the heart of the Skagit Valley in the Pacific Northwest, our ammo is trusted by
                  local law enforcement, competitive shooters, and major wholesalers across the region.
                </p>
              </div>

              {/* PLACEHOLDER: flag with rifle topper photo (Misti to send) */}
              <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-primary/40 bg-surface shadow-panel">
                <div className="aspect-[4/5] w-full">
                  <Image
                    src="/americanflag22.webp"
                    alt="American flag — placeholder, awaiting RBS flag-and-rifle-topper photo"
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover opacity-90"
                  />
                </div>
                <div className="absolute inset-0 flex items-end bg-[linear-gradient(to_top,rgba(0,0,0,0.85),transparent_60%)] p-7">
                  <div className="rounded-2xl border border-white/30 bg-black/55 px-5 py-4 backdrop-blur-sm">
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                      Photo Pending
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white">
                      RBS Flag &amp; Rifle Topper
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
        <ProductGrid title="Featured Products" products={featured} eyebrow="RBS Ammunition" />

        {/* ── PARTNERS / LEGAL ─────────────────────────────────────────────── */}
        <section className="border-t border-border bg-surface/30">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-panel">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-primary">
                  Local Partner
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.08em] text-text">
                  Skagit Shooting Range
                </h3>
                <p className="mt-3 text-base font-medium leading-7 text-text/85">
                  Stop by for in-store pickup, range time, and a full selection of RBS ammunition.
                  Located in Burlington, WA.
                </p>
                <a
                  href="https://skagitshootingsports.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-text transition-colors hover:border-primary/60 hover:bg-background hover:text-primary"
                >
                  Visit Range
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-panel">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-primary">
                  Purchasing Requirements
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-[0.08em] text-text">
                  Legal Information
                </h3>
                <p className="mt-3 text-base font-medium leading-7 text-text/85">
                  You must be 21+ for handgun ammo, 18+ for rifle ammo. We do not ship to NJ, CA, IL, or
                  NY. All purchases require age verification at checkout.
                </p>
                <Link
                  href="/shipping-policy"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-text transition-colors hover:border-primary/60 hover:bg-background hover:text-primary"
                >
                  Read Policy
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
