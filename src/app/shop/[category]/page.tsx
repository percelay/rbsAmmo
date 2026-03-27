import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CategorySlug, getCategoryData, getCategoryLinks, getDetailProductHref } from "@/lib/catalog";
import { getSiteContent } from "@/lib/content";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

function isCategorySlug(value: string): value is CategorySlug {
  return value === "pistol-ammo" || value === "rifle-ammo" || value === "ammo-components";
}

export async function generateStaticParams() {
  return getCategoryLinks().map((item) => ({
    category: item.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isCategorySlug(category)) {
    return {
      title: getSiteContent().brandName,
    };
  }

  const siteContent = getSiteContent();
  const categoryData = getCategoryData(category);

  return {
    title: `${categoryData.label} | ${siteContent.brandName}`,
    description: siteContent.hero.subheadline,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!isCategorySlug(category)) {
    notFound();
  }

  const siteContent = getSiteContent();
  const navigation = getCategoryLinks();
  const categoryData = getCategoryData(category);
  const cartHref = `${getDetailProductHref()}#purchase`;
  const cartLabel =
    siteContent.detailProduct.actions.find((action) => action === "Go to cart") ??
    siteContent.detailProduct.actions[1];

  return (
    <>
      <SiteHeader
        brandName={siteContent.brandName}
        navigation={navigation}
        cartHref={cartHref}
        cartLabel={cartLabel}
      />

      <main>
        <section className="relative isolate overflow-hidden border-b border-border">
          <div className="absolute inset-0">
            <Image
              src="/american%20flag.jpg"
              alt={categoryData.label}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(9,11,10,0.9),rgba(9,11,10,0.7),rgba(9,11,10,0.88))]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <p className="font-display text-xs uppercase tracking-[0.32em] text-primary">
              {siteContent.productsCategory}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl uppercase tracking-[0.1em] text-text sm:text-5xl">
              {categoryData.label}
            </h1>
          </div>
        </section>

        <ProductGrid title={categoryData.label} products={categoryData.products} eyebrow={siteContent.brandName} />
      </main>

      <SiteFooter
        brandName={siteContent.brandName}
        subheadline={siteContent.hero.subheadline}
        navigation={navigation}
        partnerHeadline={siteContent.partner.aboutHeadline}
        partnerDescription={siteContent.partner.description}
        partnerHref={siteContent.partner.ctaHref}
        partnerLabel={siteContent.partner.ctaLabel}
        cartHref={cartHref}
        cartLabel={cartLabel}
      />
    </>
  );
}

