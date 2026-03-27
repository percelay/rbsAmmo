import Link from "next/link";
import { ArrowUpRight, Crosshair, Shield } from "lucide-react";

import type { PartnerLink } from "@/lib/content";

type PartnerSectionProps = {
  links: PartnerLink[];
};

function getDomain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export function PartnerSection({ links }: PartnerSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-2">
        {links.map((link, index) => {
          const Icon = index === 0 ? Shield : Crosshair;
          const eyebrow = index === 0 ? "Firearms Website" : "Shooting Range";
          const accentClass =
            index === 0
              ? "bg-[radial-gradient(circle_at_top_left,rgba(184,138,59,0.18),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(123,138,87,0.16),transparent_52%)]"
              : "bg-[radial-gradient(circle_at_top_right,rgba(123,138,87,0.18),transparent_48%),radial-gradient(circle_at_bottom_left,rgba(184,138,59,0.14),transparent_52%)]";

          return (
            <div
              key={link.href}
              className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-6 shadow-panel sm:p-8"
            >
              <div className={`absolute inset-0 ${accentClass}`} />
              <div className="relative space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 px-4 py-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-display text-[11px] uppercase tracking-[0.26em] text-muted">
                    {eyebrow}
                  </span>
                </div>

                <div className="space-y-3">
                  <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-text sm:text-4xl">
                    {link.title}
                  </h2>
                  <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">{link.description}</p>
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
          );
        })}
      </div>
    </section>
  );
}
