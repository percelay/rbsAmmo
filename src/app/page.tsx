import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Crosshair, Package } from "lucide-react";

import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getFeaturedProducts } from "@/lib/products-server";

const HERO_CARDS = [
  {
    icon: ShieldCheck,
    label: "Pistol Ammo",
    href: "/shop?category=Pistol",
  },
  {
    icon: Crosshair,
    label: "Rifle Ammo",
    href: "/shop?category=Rifle",
  },
  {
    icon: Package,
    label: "Reloading",
    href: "/shop?category=Reloading",
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
        <section className="border-b border-border bg-background">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)] lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-surface px-4 py-2 shadow-panel">
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border bg-background">
                  <Image src="/rbs-logo-full-min.webp" alt="RBS Ammunition" fill className="object-contain p-1" />
                </div>
                <span className="font-display text-xs uppercase tracking-[0.32em] text-muted">RBS Ammunition</span>
              </div>

              <div className="mt-8 space-y-5">
                <h1 className="max-w-2xl font-display text-4xl uppercase tracking-[0.1em] text-text sm:text-5xl lg:text-6xl">
                  High-Quality Ammunition Built in Skagit Valley
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                  Proudly manufactured in the USA. Trusted by law enforcement, competitive shooters, and
                  major wholesalers across the Pacific Northwest.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-white shadow-panel transition-colors hover:bg-primary-strong"
                >
                  Shop All Ammo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-text transition-colors hover:border-primary/40 hover:bg-surface-strong"
                >
                  About Us
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {HERO_CARDS.map(({ icon: Icon, label, href }: { icon: typeof ShieldCheck; label: string; href: string }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface p-5 shadow-panel transition-colors hover:border-primary/50 hover:bg-surface-strong"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="mt-8 space-y-2">
                      <p className="font-display text-[10px] uppercase tracking-[0.3em] text-muted">Browse</p>
                      <span className="flex items-center justify-between gap-3 font-display text-base uppercase tracking-[0.14em] text-text">
                        {label}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* American flag */}
            <div className="relative hidden min-h-[420px] overflow-hidden rounded-[2rem] border border-border shadow-panel lg:block">
              <Image
                src="/americanflag22.webp"
                alt="American flag"
                fill
                priority
                sizes="420px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── ABOUT STRIP ──────────────────────────────────────────────────── */}
        <section className="border-b border-border bg-surface/50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-center">
              <div className="space-y-5">
                <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">About RBS</p>
                <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-text sm:text-4xl">
                  A Team of Shooters Who Build Ammo
                </h2>
                <p className="text-base leading-8 text-muted">
                  At RBS Ammunition, we&apos;re a team of shooters, competitors, and firearm enthusiasts who take pride
                  in producing quality ammunition that performs when it matters most. We understand what makes a great
                  round — because we shoot, train, and compete just like our customers do.
                </p>
                <p className="text-base leading-8 text-muted">
                  Based in the heart of the Skagit Valley in the Pacific Northwest, our ammo is trusted by local
                  law enforcement, competitive shooters, and major wholesalers across the region.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-border">
                <Image
                  src="/products/Mask-Group-6-min.jpg"
                  alt="RBS Sponsored Shooter"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,15,13,0.7),transparent_60%)]" />
                <div className="absolute bottom-6 left-6 space-y-1">
                  <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">Our Sponsored Shooter</p>
                  <p className="font-display text-sm uppercase tracking-[0.16em] text-white">
                    2017 IPSC World Champion — Revolver Division
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
        <ProductGrid title="Featured Products" products={featured} eyebrow="RBS Ammunition" />

        {/* ── PARTNERS / LOCAL ─────────────────────────────────────────────── */}
        <section className="border-t border-border bg-surface/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-panel">
                <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">Local Partner</p>
                <h3 className="mt-3 font-display text-xl uppercase tracking-[0.1em] text-text">
                  Skagit Shooting Range
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Stop by for in-store pickup, range time, and a full selection of RBS ammunition.
                  Located in Burlington, WA.
                </p>
                <a
                  href="https://skagitshootingsports.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-text transition-colors hover:border-primary/50 hover:bg-background"
                >
                  Visit Range
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="rounded-[2rem] border border-border bg-surface p-8 shadow-panel">
                <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">Purchasing Requirements</p>
                <h3 className="mt-3 font-display text-xl uppercase tracking-[0.1em] text-text">
                  Legal Information
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  You must be 21+ for handgun ammo, 18+ for rifle ammo. We do not ship to NJ, CA, IL, or NY.
                  All purchases require age verification at checkout.
                </p>
                <Link
                  href="/purchasing-requirements"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-display text-xs uppercase tracking-[0.2em] text-text transition-colors hover:border-primary/50 hover:bg-background"
                >
                  Read Requirements
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
