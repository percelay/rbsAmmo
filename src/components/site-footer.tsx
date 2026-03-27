import Image from "next/image";
import Link from "next/link";

import type { CategoryLink } from "@/lib/catalog";

type SiteFooterProps = {
  brandName: string;
  subheadline: string;
  navigation: CategoryLink[];
  partnerHeadline: string;
  partnerDescription: string;
  partnerHref: string;
  partnerLabel: string;
  cartHref: string;
  cartLabel: string;
};

export function SiteFooter({
  brandName,
  subheadline,
  navigation,
  partnerHeadline,
  partnerDescription,
  partnerHref,
  partnerLabel,
  cartHref,
  cartLabel,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-background/95">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1fr)] lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border bg-surface">
              <Image src="/rbs-logo-full-min.webp" alt={brandName} fill className="object-contain p-1" />
            </div>
            <span className="font-display text-lg uppercase tracking-[0.24em] text-text">{brandName}</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">{subheadline}</p>
          <Link
            href={cartHref}
            className="inline-flex items-center rounded-full border border-primary/50 bg-primary px-5 py-3 font-display text-xs uppercase tracking-[0.24em] text-background transition-colors hover:bg-primary-strong"
          >
            {cartLabel}
          </Link>
        </div>

        <div className="space-y-4">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">{brandName}</p>
          <div className="flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">{partnerHeadline}</p>
          <p className="text-sm leading-7 text-muted">{partnerDescription}</p>
          <Link
            href={partnerHref}
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-muted transition-colors hover:text-text"
          >
            {partnerHref}
          </Link>
          <Link
            href={partnerHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-primary/50 hover:bg-surface"
          >
            {partnerLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}

