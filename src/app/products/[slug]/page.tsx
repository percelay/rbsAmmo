import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategoryLinks, getDetailProductHref } from "@/lib/catalog";
import { getProductSlug, getSiteContent } from "@/lib/content";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return [
    {
      slug: getProductSlug(getSiteContent().detailProduct.title),
    },
  ];
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const siteContent = getSiteContent();

  if (slug !== getProductSlug(siteContent.detailProduct.title)) {
    return {
      title: siteContent.brandName,
    };
  }

  return {
    title: `${siteContent.detailProduct.title} | ${siteContent.brandName}`,
    description: siteContent.detailProduct.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const siteContent = getSiteContent();
  const detailSlug = getProductSlug(siteContent.detailProduct.title);

  if (slug !== detailSlug) {
    notFound();
  }

  const navigation = getCategoryLinks();
  const cartHref = `${getDetailProductHref()}#purchase`;
  const cartLabel =
    siteContent.detailProduct.actions.find((action) => action === "Go to cart") ??
    siteContent.detailProduct.actions[1];
  const relatedProducts = siteContent.relatedProducts.map((product) => ({
    title: product.title,
    price: product.price,
    tags: product.tags,
    imageLabel: "[Placeholder]",
  }));

  return (
    <>
      <SiteHeader
        brandName={siteContent.brandName}
        navigation={navigation}
        cartHref={cartHref}
        cartLabel={cartLabel}
      />

      <main>
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(320px,480px)_minmax(0,1fr)] lg:px-8 lg:py-16">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface shadow-panel">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(184,138,59,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(123,138,87,0.18),transparent_48%)]" />
              <div className="relative aspect-[4/4.6]">
                <Image
                  src="/9-124-box.webp"
                  alt={siteContent.detailProduct.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <p className="font-display text-xs uppercase tracking-[0.32em] text-primary">
                  {siteContent.detailProduct.category}
                </p>
                <h1 className="font-display text-4xl uppercase tracking-[0.1em] text-text sm:text-5xl">
                  {siteContent.detailProduct.title}
                </h1>
                <div className="rounded-[1.5rem] border border-primary/40 bg-surface p-5 text-sm leading-7 text-text shadow-panel">
                  {siteContent.detailProduct.notice}
                </div>
              </div>

              <div className="grid gap-4 rounded-[2rem] border border-border bg-surface p-6 shadow-panel sm:grid-cols-2 sm:p-8">
                <div>
                  <p className="font-display text-xs uppercase tracking-[0.28em] text-muted">Price range</p>
                  <p className="mt-2 text-lg leading-8 text-text">{siteContent.detailProduct.priceRange}</p>
                </div>
                <div>
                  <p className="font-display text-xs uppercase tracking-[0.28em] text-muted">Options</p>
                  <p className="mt-2 text-lg leading-8 text-text">{siteContent.detailProduct.options}</p>
                </div>
                <div>
                  <p className="font-display text-xs uppercase tracking-[0.28em] text-muted">SKU</p>
                  <p className="mt-2 text-lg leading-8 text-text">{siteContent.detailProduct.sku}</p>
                </div>
              </div>

              <div id="purchase" className="flex flex-wrap gap-3">
                {siteContent.detailProduct.actions.map((action) => {
                  const isCartAction = action === "Go to cart";

                  return (
                    <a
                      key={action}
                      href={isCartAction ? "#purchase" : "#purchase"}
                      className={`inline-flex items-center justify-center rounded-full px-5 py-3 font-display text-xs uppercase tracking-[0.24em] transition-colors sm:text-sm ${
                        isCartAction
                          ? "border border-border bg-surface text-text hover:border-primary/50 hover:bg-surface-strong"
                          : "border border-primary/50 bg-primary text-background hover:bg-primary-strong"
                      }`}
                    >
                      {action}
                    </a>
                  );
                })}
              </div>

              <div className="rounded-[2rem] border border-border bg-background p-6 shadow-panel sm:p-8">
                <p className="text-base leading-8 text-muted">{siteContent.detailProduct.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-panel">
                  <p className="font-display text-xs uppercase tracking-[0.24em] text-primary">Weight</p>
                  <p className="mt-3 text-sm leading-7 text-text">
                    {siteContent.detailProduct.additionalInformation.weight}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-panel">
                  <p className="font-display text-xs uppercase tracking-[0.24em] text-primary">Dimensions</p>
                  <p className="mt-3 text-sm leading-7 text-text">
                    {siteContent.detailProduct.additionalInformation.dimensions}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-border bg-surface p-5 shadow-panel">
                  <p className="font-display text-xs uppercase tracking-[0.24em] text-primary">
                    Quantity Options
                  </p>
                  <p className="mt-3 text-sm leading-7 text-text">
                    {siteContent.detailProduct.additionalInformation.quantityOptions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductGrid title="Related Products" products={relatedProducts} eyebrow={siteContent.brandName} />
      </main>

      <SiteFooter
        brandName={siteContent.brandName}
        subheadline={siteContent.hero.subheadline}
        navigation={navigation}
        externalLinks={siteContent.partner.links}
        cartHref={cartHref}
        cartLabel={cartLabel}
      />
    </>
  );
}
