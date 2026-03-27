import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crosshair, Package, ShieldCheck } from "lucide-react";

import type { CategoryLink } from "@/lib/catalog";

type HeroSectionProps = {
  brandName: string;
  headline: string;
  subheadline: string;
  navigation: CategoryLink[];
};

const ICONS = [ShieldCheck, Crosshair, Package];

export function HeroSection({ brandName, headline, subheadline, navigation }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div className="absolute inset-0">
        <Image
          src="/ammohero.jpg"
          alt={headline}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,11,10,0.9),rgba(9,11,10,0.5),rgba(9,11,10,0.92))]" />
        <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-[radial-gradient(circle_at_top,rgba(184,138,59,0.28),transparent_55%)] lg:block" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,420px)] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-background/60 px-4 py-2 shadow-panel backdrop-blur">
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-border/80 bg-background">
              <Image src="/rbs-logo-full-min.webp" alt={brandName} fill className="object-contain p-1" />
            </div>
            <span className="font-display text-xs uppercase tracking-[0.32em] text-muted">{brandName}</span>
          </div>

          <div className="mt-8 space-y-5">
            <h1 className="max-w-2xl font-display text-4xl uppercase tracking-[0.1em] text-text sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">{subheadline}</p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {navigation.map((item, index) => {
              const Icon = ICONS[index] ?? ArrowRight;

              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-surface/85 p-5 shadow-panel backdrop-blur transition-colors hover:border-primary/60 hover:bg-surface-strong"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="mt-10 flex items-center justify-between gap-3 font-display text-sm uppercase tracking-[0.18em] text-text">
                    {item.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-background/75 p-6 shadow-panel backdrop-blur sm:p-8">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,138,87,0.22),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(184,138,59,0.18),transparent_55%)]" />
            <div className="relative space-y-4">
              <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">{brandName}</p>
              <p className="text-sm leading-7 text-muted">{subheadline}</p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-border">
                <Image src="/9-124-box.webp" alt="9mm 124gr" fill sizes="420px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
