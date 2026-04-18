export type ProductCategory = "Pistol" | "Rifle" | "Reloading";

export type ProductVariant = {
  label: string;      // "50 Count" | "250 Count"
  roundCount: number;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  caliber: string;
  brand: string;
  grain: number | null;
  roundCount: number;        // base count (50ct when variants exist)
  price: number;             // base price (lowest when variants exist)
  variants?: ProductVariant[];
  imageSrc: string | null;
  inStock: boolean;
  category: ProductCategory;
};

const RBS_DESC =
  "Proudly manufactured in the USA, our commitment to excellence shines through every round. We exclusively utilize once-fired, brass casings in the production of our ammunition. This ensures reliability and performance you can count on. With meticulous hand-inspection, we uphold the highest standards to deliver a remanufactured product that surpasses expectations. Available for in-store pick-up at Skagit Shooting Range or shipped. Because we care, you can be sure that you are shooting the best ammunition available.";

export const PRODUCTS: Product[] = [
  // ── PISTOL AMMO ───────────────────────────────────────────────────────────
  {
    id: "rbs-9mm-115gr-tmj",
    slug: "rbs-9mm-115gr-tmj",
    name: "RBS 9mm 115gr TMJ",
    description: "RBS 9mm Luger 115 grain Total Metal Jacket, Remanufactured. " + RBS_DESC,
    caliber: "9mm",
    brand: "RBS",
    grain: 115,
    roundCount: 50,
    price: 14.50,
    variants: [
      { label: "50 Count", roundCount: 50, price: 14.50 },
      { label: "250 Count", roundCount: 250, price: 71.25 },
    ],
    imageSrc: "/products/newbb115.jpg",
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-9mm-124gr-tmj",
    slug: "rbs-9mm-124gr-tmj",
    name: "RBS 9mm 124gr TMJ",
    description: "RBS 9mm Luger 124 grain Total Metal Jacket, Remanufactured. " + RBS_DESC,
    caliber: "9mm",
    brand: "RBS",
    grain: 124,
    roundCount: 50,
    price: 14.99,
    variants: [
      { label: "50 Count", roundCount: 50, price: 14.99 },
      { label: "250 Count", roundCount: 250, price: 74.95 },
    ],
    imageSrc: "/products/9-124-box.jpg",
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-9mm-147gr-subsonic",
    slug: "rbs-9mm-147gr-subsonic",
    name: "RBS 9mm 147gr Subsonic TMJ",
    description: "RBS 9mm Subsonic 147 grain Total Metal Jacket, Remanufactured. " + RBS_DESC,
    caliber: "9mm",
    brand: "RBS",
    grain: 147,
    roundCount: 50,
    price: 16.99,
    variants: [
      { label: "50 Count", roundCount: 50, price: 16.99 },
      { label: "250 Count", roundCount: 250, price: 84.99 },
    ],
    imageSrc: "/products/newbb147.jpg",
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-9mm-165gr-subsonic",
    slug: "rbs-9mm-165gr-subsonic",
    name: "RBS 9mm 165gr Subsonic TMJ",
    description: "RBS 9mm Subsonic 165 grain Total Metal Jacket, Remanufactured. " + RBS_DESC,
    caliber: "9mm",
    brand: "RBS",
    grain: 165,
    roundCount: 50,
    price: 18.99,
    variants: [
      { label: "50 Count", roundCount: 50, price: 18.99 },
      { label: "250 Count", roundCount: 250, price: 94.95 },
    ],
    imageSrc: "/products/newbb165.jpg",
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-380-acp",
    slug: "rbs-380-acp",
    name: "RBS 380 ACP",
    description: "RBS .380 ACP 95 grain Total Metal Jacket, Remanufactured. " + RBS_DESC,
    caliber: ".380 ACP",
    brand: "RBS",
    grain: 95,
    roundCount: 50,
    price: 17.99,
    variants: [
      { label: "50 Count", roundCount: 50, price: 17.99 },
      { label: "250 Count", roundCount: 250, price: 89.95 },
    ],
    imageSrc: null,
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-38-special-158gr-tmj",
    slug: "rbs-38-special-158gr-tmj",
    name: "RBS 38 Special 158gr TMJ",
    description: "38 Special 158 Gr. Total Metal Jacket – 50 count box, Remanufactured. " + RBS_DESC,
    caliber: ".38 Special",
    brand: "RBS",
    grain: 158,
    roundCount: 50,
    price: 19.99,
    imageSrc: "/products/newbb38.jpg",
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-357-mag-158gr-tmj",
    slug: "rbs-357-mag-158gr-tmj",
    name: "RBS 357 Mag 158gr TMJ",
    description: "RBS 357 Mag 158 gr. Total Metal Jacket – 50-count box, Remanufactured. " + RBS_DESC,
    caliber: ".357 Magnum",
    brand: "RBS",
    grain: 158,
    roundCount: 50,
    price: 22.99,
    imageSrc: "/products/newbb357.jpg",
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-40-sw-180gr-tmj",
    slug: "rbs-40-sw-180gr-tmj",
    name: "RBS 40 S&W 180gr TMJ",
    description: "40 S&W 180 gr. Total Metal Jacket – Remanufactured. " + RBS_DESC,
    caliber: ".40 S&W",
    brand: "RBS",
    grain: 180,
    roundCount: 50,
    price: 17.99,
    variants: [
      { label: "50 Count", roundCount: 50, price: 17.99 },
      { label: "250 Count", roundCount: 250, price: 89.95 },
    ],
    imageSrc: "/products/new40.jpg",
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-10mm-180gr-tmj",
    slug: "rbs-10mm-180gr-tmj",
    name: "RBS 10mm 180gr TMJ",
    description: "10 mm, 180 gr. Total Metal Jacket – 50 count box, Remanufactured. " + RBS_DESC,
    caliber: "10mm",
    brand: "RBS",
    grain: 180,
    roundCount: 50,
    price: 21.99,
    imageSrc: "/products/newbb10.jpg",
    inStock: true,
    category: "Pistol",
  },
  {
    id: "rbs-45-acp",
    slug: "rbs-45-acp",
    name: "RBS 45 ACP 230gr TMJ",
    description: "RBS .45 ACP 230 grain Total Metal Jacket, Remanufactured. " + RBS_DESC,
    caliber: ".45 ACP",
    brand: "RBS",
    grain: 230,
    roundCount: 50,
    price: 19.99,
    variants: [
      { label: "50 Count", roundCount: 50, price: 19.99 },
      { label: "250 Count", roundCount: 250, price: 99.95 },
    ],
    imageSrc: null,
    inStock: true,
    category: "Pistol",
  },
  {
    id: "speer-lawman-45-auto-230gr-tmj",
    slug: "speer-lawman-45-auto-230gr-tmj",
    name: "Speer Lawman 45 Auto 230gr TMJ",
    description:
      "SPEER Lawman .45 Auto, 230 grain TMJ, 50 high-performance cartridges. In-Store Pickup is all that is available at this time.",
    caliber: ".45 Auto",
    brand: "Speer",
    grain: 230,
    roundCount: 50,
    price: 17.99,
    imageSrc: "/products/lawman-45.jpg",
    inStock: false,
    category: "Pistol",
  },

  // ── RIFLE AMMO ────────────────────────────────────────────────────────────
  {
    id: "pmc-223",
    slug: "pmc-223",
    name: "PMC .223",
    description:
      "20 Rounds of PMC .223 ammunition. In-Store Pickup is all that is available at this time.",
    caliber: ".223 Rem",
    brand: "PMC",
    grain: null,
    roundCount: 20,
    price: 10.99,
    imageSrc: "/products/223PIC.jpg",
    inStock: true,
    category: "Rifle",
  },
  {
    id: "pmc-x-tac-5-56",
    slug: "pmc-x-tac-5-56",
    name: "PMC X-Tac 5.56 NATO",
    description:
      "20 Rounds. The PMC X-TAC line is tried and tested by military and law enforcement around the world. Manufactured to the exacting specifications required by such organizations and demanded by discriminating customers. In-Store Pickup is all that is available at this time.",
    caliber: "5.56 NATO",
    brand: "PMC",
    grain: null,
    roundCount: 20,
    price: 13.99,
    imageSrc: "/products/3106__37935.jpg",
    inStock: true,
    category: "Rifle",
  },
  {
    id: "cci-mini-mag-22-lr",
    slug: "cci-mini-mag-22-lr",
    name: "CCI Mini Mag 22 LR",
    description:
      "100 Rounds of CCI Mini Mag 22 LR. In-Store Pickup is all that is available at this time.",
    caliber: ".22 LR",
    brand: "CCI",
    grain: 40,
    roundCount: 100,
    price: 10.99,
    imageSrc: "/products/image-full-602020-ba428b5bf57b7298c53723724ded98c4.jpg",
    inStock: true,
    category: "Rifle",
  },
  {
    id: "federal-20-gauge-7-5-shot",
    slug: "federal-20-gauge-7-5-shot",
    name: "Federal 20 Gauge 7 1/2 Shot",
    description:
      "25 Rounds of 20 gauge Federal clay target shotshells. 2-3/4\u2033 7/8oz. 7 1/2 shot. In-Store Pickup is all that is available at this time.",
    caliber: "20 Gauge",
    brand: "Federal",
    grain: null,
    roundCount: 25,
    price: 12.99,
    imageSrc: "/products/20-gauge-top-gun.jpg",
    inStock: true,
    category: "Rifle",
  },
  {
    id: "federal-12-gauge-8-shot",
    slug: "federal-12-gauge-8-shot",
    name: "Federal 12 Gauge 8 Shot",
    description:
      "25 Rounds of Federal 12 gauge clay target shotshells 2-3/4\u2033 1 oz. 8 shot. In-Store Pickup is all that is available at this time.",
    caliber: "12 Gauge",
    brand: "Federal",
    grain: null,
    roundCount: 25,
    price: 12.99,
    imageSrc: "/products/12-gauge-top-gun.jpg",
    inStock: false,
    category: "Rifle",
  },
  {
    id: "federal-premium-le-12-gauge-hydra-shok",
    slug: "federal-premium-le-12-gauge-hydra-shok",
    name: "Federal Premium LE 12 Gauge Hydra-Shok Slug",
    description:
      "Federal Premium Law Enforcement 12 Gauge \u2013 438gr Hydra-Shok\u00ae Tactical Rifled Slug. 2 \u00be\u2033 | 1300 FPS | 5 Rounds. Engineered for maximum stopping power, deep penetration, and consistent on-target performance.",
    caliber: "12 Gauge",
    brand: "Federal",
    grain: 438,
    roundCount: 5,
    price: 18.99,
    imageSrc: "/products/222-scaled-e1763681419216.jpg",
    inStock: true,
    category: "Rifle",
  },

  // ── RELOADING — BULLETS ───────────────────────────────────────────────────
  {
    id: "380-100gr-rnfp-bullets-500ct",
    slug: "380-100gr-rnfp-bullets-500ct",
    name: ".380 100gr RNFP Bullets",
    description:
      "500 per box. .380 caliber 100 grain round nose flat point bullets for reloading. In-Store Pickup is all that is available at this time.",
    caliber: ".380",
    brand: "RBS",
    grain: 100,
    roundCount: 500,
    price: 44.50,
    imageSrc: null,
    inStock: true,
    category: "Reloading",
  },
  {
    id: "9mm-115gr-rn-bullets-500ct",
    slug: "9mm-115gr-rn-bullets-500ct",
    name: "9mm 115gr Round Nose Bullets",
    description:
      "500 per box. 9mm 115 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.",
    caliber: "9mm",
    brand: "RBS",
    grain: 115,
    roundCount: 500,
    price: 46.50,
    imageSrc: "/products/9-115-RN.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "9mm-124gr-rn-bullets-500ct",
    slug: "9mm-124gr-rn-bullets-500ct",
    name: "9mm 124gr Round Nose Bullets",
    description:
      "500 per box. 9mm 124 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.",
    caliber: "9mm",
    brand: "RBS",
    grain: 124,
    roundCount: 500,
    price: 48.50,
    imageSrc: "/products/9-124-box.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "9mm-147gr-rn-bullets-500ct",
    slug: "9mm-147gr-rn-bullets-500ct",
    name: "9mm 147gr Round Nose Bullets",
    description:
      "500 per box. 9mm 147 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.",
    caliber: "9mm",
    brand: "RBS",
    grain: 147,
    roundCount: 500,
    price: 49.32,
    imageSrc: "/products/newbb147.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "9mm-165gr-rn-bullets-500ct",
    slug: "9mm-165gr-rn-bullets-500ct",
    name: "9mm 165gr Round Nose Bullets",
    description:
      "500 per box. 9mm 165 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.",
    caliber: "9mm",
    brand: "RBS",
    grain: 165,
    roundCount: 500,
    price: 51.99,
    imageSrc: "/products/9-165-rn-scaled.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "38-158gr-swc-bullets-500ct",
    slug: "38-158gr-swc-bullets-500ct",
    name: ".38 158gr Semi-Wadcutter Bullets",
    description:
      "500 per box. .38 158 grain semi-wadcutter bullets for reloading. In-Store Pickup is all that is available at this time.",
    caliber: ".38",
    brand: "RBS",
    grain: 158,
    roundCount: 500,
    price: 59.50,
    imageSrc: "/products/38-158-swc.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "40-180gr-rnfp-bullets-500ct",
    slug: "40-180gr-rnfp-bullets-500ct",
    name: ".40 180gr RNFP Bullets",
    description:
      "500 per box. .40 caliber 180 grain round nose flat point bullets for reloading. In-Store Pickup is all that is available at this time.",
    caliber: ".40",
    brand: "RBS",
    grain: 180,
    roundCount: 500,
    price: 64.99,
    imageSrc: null,
    inStock: true,
    category: "Reloading",
  },
  {
    id: "45-230gr-rn-bullets-500ct",
    slug: "45-230gr-rn-bullets-500ct",
    name: ".45 230gr Round Nose Bullets",
    description:
      "500 per box. .45 230 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.",
    caliber: ".45",
    brand: "RBS",
    grain: 230,
    roundCount: 500,
    price: 75.00,
    imageSrc: "/products/45-230-scaled.jpg",
    inStock: true,
    category: "Reloading",
  },

  // ── RELOADING — BRASS ─────────────────────────────────────────────────────
  {
    id: "223-brass-100ct",
    slug: "223-brass-100ct",
    name: ".223 Brass",
    description:
      "100 Count per. Mixed-headstamp .223 brass from an indoor firing range, unprocessed. In-Store Pickup is all that is available at this time.",
    caliber: ".223 Rem",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 5.99,
    imageSrc: "/products/2.23-brass-Small.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "380-acp-brass-100ct",
    slug: "380-acp-brass-100ct",
    name: ".380 ACP Brass",
    description:
      "100 Count per. .380 brass collected from an indoor range. Mixed head stamp, de-capped, reamed and polished. In-Store Pickup is all that is available at this time.",
    caliber: ".380 ACP",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 10.99,
    imageSrc: "/products/380-brass-Small.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "9mm-brass-100ct",
    slug: "9mm-brass-100ct",
    name: "9mm Brass",
    description:
      "100 Count per. Fully processed 9mm, collected from an indoor range. Mixed head stamp, de-primed, full-length case sized and polished. In-Store Pickup is all that is available at this time.",
    caliber: "9mm",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 9.99,
    imageSrc: "/products/9mm-brass-Small.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "38-special-brass-100ct",
    slug: "38-special-brass-100ct",
    name: "38 Special Brass",
    description:
      "100 Count per. Fully processed .38 brass, collected from an indoor range. Mixed head stamp, de-capped, reamed, roll sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.",
    caliber: ".38 Special",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 7.99,
    imageSrc: "/products/38-brass-Small.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "357-mag-brass-100ct",
    slug: "357-mag-brass-100ct",
    name: "357 Mag Brass",
    description:
      "100 Count per. Processed 357 MAG brass, collected from an indoor range. Mixed head stamp, de-capped, reamed, and polished. In-Store Pickup is all that is available at this time.",
    caliber: ".357 Magnum",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 13.99,
    imageSrc: "/products/357-brass-Small.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "40-sw-brass-100ct",
    slug: "40-sw-brass-100ct",
    name: "40 S&W Brass",
    description:
      "100 Count per. Fully processed 40 brass, collected from an indoor range. Mixed head stamp, de-capped, reamed, full-length case sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.",
    caliber: ".40 S&W",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 7.99,
    imageSrc: "/products/40-brass-Small.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "10mm-brass-100ct",
    slug: "10mm-brass-100ct",
    name: "10mm Brass",
    description:
      "100 Count per. Fully processed 10mm brass, collected from an indoor range. Mixed head stamp, de-capped, reamed, full-length case sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.",
    caliber: "10mm",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 10.99,
    imageSrc: "/products/10-brass-Small.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "45-acp-large-hole-brass-100ct",
    slug: "45-acp-large-hole-brass-100ct",
    name: "45 ACP Large Hole Brass",
    description:
      "100 Count per. Fully processed .45 large hole brass, collected from an indoor range. De-capped, reamed, full-length case sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.",
    caliber: ".45 ACP",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 11.99,
    imageSrc: "/products/45-brass-LH-Small.jpg",
    inStock: true,
    category: "Reloading",
  },
  {
    id: "45-acp-small-hole-brass-100ct",
    slug: "45-acp-small-hole-brass-100ct",
    name: "45 ACP Small Hole Brass",
    description:
      "100 Count per. Fully processed .45 small hole brass, collected from an indoor range. De-capped, reamed, full-length case sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.",
    caliber: ".45 ACP",
    brand: "RBS",
    grain: null,
    roundCount: 100,
    price: 11.99,
    imageSrc: null,
    inStock: true,
    category: "Reloading",
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(count = 6): Product[] {
  return PRODUCTS.filter((p) => p.imageSrc !== null && p.category === "Pistol").slice(0, count);
}

export function getAllCategories(): ProductCategory[] {
  return ["Pistol", "Rifle", "Reloading"];
}

export function filterProducts(products: Product[], category?: string, sort?: string): Product[] {
  let result = [...products];

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

export function formatPriceRange(product: Product): string {
  if (!product.variants || product.variants.length < 2) {
    return `$${product.price.toFixed(2)}`;
  }
  const prices = product.variants.map((v) => v.price);
  return `$${Math.min(...prices).toFixed(2)} \u2013 $${Math.max(...prices).toFixed(2)}`;
}
