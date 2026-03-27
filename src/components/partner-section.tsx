import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Shield } from "lucide-react";

import type { PartnerLink } from "@/lib/content";

type PartnerSectionProps = {
  aboutHeadline: string;
  description: string;
  links: PartnerLink[];
};

function getDomain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export function PartnerSection({ aboutHeadline, description, links }: PartnerSectionProps) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:px-8 lg:py-16">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-panel">
        <div className="grid h-full lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-4 py-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-display text-xs uppercase tracking-[0.26em] text-muted">Local Partners</span>
            </div>

            <div className="mt-6 space-y-5">
              <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-text sm:text-4xl">
                {aboutHeadline}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
            </div>
          </div>

          <div className="relative min-h-[280px] border-t border-border lg:min-h-full lg:border-l lg:border-t-0">
            <Image
              src="/americanflag22.webp"
              alt={aboutHeadline}
              fill
              sizes="420px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,11,10,0.08),rgba(9,11,10,0.65))]" />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {links.map((link, index) => (
          <div
            key={link.href}
            className="rounded-[2rem] border border-border bg-background p-6 shadow-panel sm:p-8"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,138,59,0.15),transparent_52%),radial-gradient(circle_at_bottom_left,rgba(123,138,87,0.18),transparent_48%)]" />
              <div className="relative space-y-5">
                <p className="font-display text-xs uppercase tracking-[0.28em] text-primary">
                  {index === 0 ? "Firearms Shop" : "Shooting Range"}
                </p>
                <div className="space-y-3">
                  <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-text">
                    {link.title}
                  </h3>
                  <p className="text-sm leading-7 text-muted">{link.description}</p>
                </div>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-muted transition-colors hover:text-text"
                >
                  {getDomain(link.href)}
                </Link>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary px-5 py-3 font-display text-xs uppercase tracking-[0.24em] text-background transition-colors hover:bg-primary-strong sm:text-sm"
                >
                  {link.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
