import { readFileSync } from "node:fs";
import { join } from "node:path";

export type MainProduct = {
  title: string;
  price: string;
  status: string;
  image: string;
};

export type RelatedProduct = {
  title: string;
  tags: string;
  price: string;
  action: string;
};

export type SiteContent = {
  brandName: string;
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    tertiaryCta: string;
  };
  partner: {
    aboutHeadline: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  productsCategory: string;
  products: MainProduct[];
  detailProduct: {
    title: string;
    category: string;
    notice: string;
    priceRange: string;
    options: string;
    sku: string;
    actions: string[];
    description: string;
    additionalInformation: {
      weight: string;
      dimensions: string;
      quantityOptions: string;
    };
  };
  relatedProducts: RelatedProduct[];
};

let cachedContent: SiteContent | null = null;

const SOURCE_PATH = join(process.cwd(), "sourcematerial.txt");

function readSourceMaterial() {
  return readFileSync(SOURCE_PATH, "utf8").replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
}

function capture(segment: string, startLabel: string, endLabel?: string) {
  const startIndex = segment.indexOf(startLabel);

  if (startIndex === -1) {
    throw new Error(`Missing label: ${startLabel}`);
  }

  const valueStart = startIndex + startLabel.length;
  const valueEnd = endLabel ? segment.indexOf(endLabel, valueStart) : segment.length;

  if (valueEnd === -1) {
    throw new Error(`Missing end label: ${endLabel}`);
  }

  return segment.slice(valueStart, valueEnd).trim();
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseProducts(productsSegment: string) {
  const matches = productsSegment.matchAll(
    /Title:\s*(.*?)\s*Price:\s*(.*?)\s*Status:\s*(.*?)\s*Image:\s*(\[[\s\S]*?\])(?=Title:|$)/g,
  );

  return Array.from(matches, ([, title, price, status, image]) => ({
    title: title.trim(),
    price: price.trim(),
    status: status.trim(),
    image: image.trim(),
  }));
}

function parseRelatedProducts(relatedSegment: string) {
  const matches = relatedSegment.matchAll(
    /Title:\s*(.*?)\s*Tags:\s*(.*?)\s*Price:\s*(.*?)\s*Action:\s*(.*?)(?=Title:|$)/g,
  );

  return Array.from(matches, ([, title, tags, price, action]) => ({
    title: title.trim(),
    tags: tags.trim(),
    price: price.trim(),
    action: action.trim(),
  }));
}

export function getSiteContent() {
  if (cachedContent) {
    return cachedContent;
  }

  const raw = readSourceMaterial();
  const detailIndex = raw.indexOf("Product Detail Page");
  const relatedIndex = raw.indexOf("Related Products");
  const productListStart = raw.indexOf("Title:", raw.indexOf("ProductsCategory:"));
  const detailStart = raw.indexOf("Title:", detailIndex);
  const relatedStart = raw.indexOf("Title:", relatedIndex);

  const ctaValue = capture(raw, "CTA:", "ProductsCategory:");
  const ctaMatch = ctaValue.match(/^(.*?)\s*\((https?:\/\/[^)]+)\)$/);

  if (!ctaMatch) {
    throw new Error("Partner CTA is not in the expected format.");
  }

  const detailSegment = raw.slice(detailStart, relatedIndex).trim();
  const additionalSegment = capture(detailSegment, "Additional Information:");

  cachedContent = {
    brandName: raw.slice(0, raw.indexOf("Hero Headline:")).trim(),
    hero: {
      headline: capture(raw, "Hero Headline:", "Subheadline:"),
      subheadline: capture(raw, "Subheadline:", "Primary CTA:"),
      primaryCta: capture(raw, "Primary CTA:", "Secondary CTA:"),
      secondaryCta: capture(raw, "Secondary CTA:", "Tertiary CTA:"),
      tertiaryCta: capture(raw, "Tertiary CTA:", "AboutHeadline:"),
    },
    partner: {
      aboutHeadline: capture(raw, "AboutHeadline:", "PartnerDescription:"),
      description: capture(raw, "PartnerDescription:", "CTA:"),
      ctaLabel: ctaMatch[1].trim(),
      ctaHref: ctaMatch[2].trim(),
    },
    productsCategory: capture(raw, "ProductsCategory:", "Title:"),
    products: parseProducts(raw.slice(productListStart, detailIndex).trim()),
    detailProduct: {
      title: capture(detailSegment, "Title:", "Category:"),
      category: capture(detailSegment, "Category:", "Notice:"),
      notice: capture(detailSegment, "Notice:", "Price range:"),
      priceRange: capture(detailSegment, "Price range:", "Options:"),
      options: capture(detailSegment, "Options:", "SKU:"),
      sku: capture(detailSegment, "SKU:", "Actions:"),
      actions: capture(detailSegment, "Actions:", "Description:")
        .split(",")
        .map((action) => action.trim()),
      description: capture(detailSegment, "Description:", "Additional Information:"),
      additionalInformation: {
        weight: capture(additionalSegment, "Weight:", "Dimensions:"),
        dimensions: capture(additionalSegment, "Dimensions:", "Quantity Options:"),
        quantityOptions: capture(additionalSegment, "Quantity Options:"),
      },
    },
    relatedProducts: parseRelatedProducts(raw.slice(relatedStart).trim()),
  };

  return cachedContent;
}

export function getProductSlug(title: string) {
  return slugify(title);
}

