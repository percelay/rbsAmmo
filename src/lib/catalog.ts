import { getProductSlug, getSiteContent, type MainProduct, type RelatedProduct } from "@/lib/content";

export type CategorySlug = "pistol-ammo" | "rifle-ammo" | "ammo-components";

export type CategoryLink = {
  slug: CategorySlug;
  label: string;
  href: string;
};

export type ProductCardItem = {
  title: string;
  price: string;
  status?: string;
  tags?: string;
  imageLabel: string;
  imageSrc?: string;
  href?: string;
};

type CategoryData = {
  slug: CategorySlug;
  label: string;
  products: ProductCardItem[];
};

const PISTOL_MARKERS = [/9mm/i, /45 AUTO/i, /357/i, /40 S&W/i, /SUBSONIC/i];
const COMPONENT_MARKERS = [/BRASS/i, /Reloading/i];

function isPistolProduct(product: MainProduct) {
  return PISTOL_MARKERS.some((marker) => marker.test(product.title));
}

function isComponentProduct(product: RelatedProduct) {
  return COMPONENT_MARKERS.some((marker) => marker.test(product.title) || marker.test(product.tags));
}

function toMainCard(product: MainProduct): ProductCardItem {
  const detailSlug = getProductSlug(getSiteContent().detailProduct.title);
  const slug = getProductSlug(product.title);

  return {
    title: product.title,
    price: product.price,
    status: product.status,
    imageLabel: product.image,
    imageSrc: slug === detailSlug ? "/9-124-box.webp" : undefined,
    href: slug === detailSlug ? `/products/${slug}` : undefined,
  };
}

function toRelatedCard(product: RelatedProduct): ProductCardItem {
  return {
    title: product.title,
    price: product.price,
    tags: product.tags,
    imageLabel: "[Placeholder]",
  };
}

export function getCategoryLinks(): CategoryLink[] {
  const { hero } = getSiteContent();

  return [
    {
      slug: "pistol-ammo",
      label: hero.primaryCta,
      href: "/shop/pistol-ammo",
    },
    {
      slug: "rifle-ammo",
      label: hero.secondaryCta,
      href: "/shop/rifle-ammo",
    },
    {
      slug: "ammo-components",
      label: hero.tertiaryCta,
      href: "/shop/ammo-components",
    },
  ];
}

export function getHomeProducts() {
  return getSiteContent().products.map(toMainCard);
}

export function getCategoryData(slug: CategorySlug): CategoryData {
  const siteContent = getSiteContent();
  const categoryLink = getCategoryLinks().find((entry) => entry.slug === slug);

  if (!categoryLink) {
    throw new Error(`Unknown category slug: ${slug}`);
  }

  const pistolProducts = siteContent.products.filter(isPistolProduct).map(toMainCard);
  const componentProducts = siteContent.relatedProducts.filter(isComponentProduct).map(toRelatedCard);
  const pistolTitles = new Set(pistolProducts.map((product) => product.title));
  const rifleProducts = siteContent.products
    .filter((product) => !pistolTitles.has(product.title))
    .map(toMainCard);

  const productsByCategory: Record<CategorySlug, ProductCardItem[]> = {
    "pistol-ammo": pistolProducts,
    "rifle-ammo": rifleProducts,
    "ammo-components": componentProducts,
  };

  return {
    slug,
    label: categoryLink.label,
    products: productsByCategory[slug],
  };
}

export function getDetailProductHref() {
  return `/products/${getProductSlug(getSiteContent().detailProduct.title)}`;
}

