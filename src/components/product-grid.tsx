import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

type ProductGridProps = {
  title: string;
  products: Product[];
  eyebrow?: string;
};

export function ProductGrid({ title, products, eyebrow }: ProductGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="space-y-3">
        {eyebrow && (
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-text sm:text-4xl">{title}</h2>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
