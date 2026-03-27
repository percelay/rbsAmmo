import { HeroSection } from "@/components/hero-section";
import { PartnerSection } from "@/components/partner-section";
import { ProductGrid } from "@/components/product-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategoryLinks, getDetailProductHref, getHomeProducts } from "@/lib/catalog";
import { getSiteContent } from "@/lib/content";

export default function HomePage() {
  const siteContent = getSiteContent();
  const navigation = getCategoryLinks();
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
        <HeroSection
          brandName={siteContent.brandName}
          headline={siteContent.hero.headline}
          subheadline={siteContent.hero.subheadline}
          navigation={navigation}
        />

        <PartnerSection
          links={siteContent.partner.links}
        />

        <ProductGrid title={siteContent.productsCategory} products={getHomeProducts()} eyebrow={siteContent.brandName} />
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
