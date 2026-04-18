"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { getAllCategories, type ProductCategory } from "@/lib/products";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

export function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";
  const activeSort = searchParams.get("sort") ?? "";

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  }

  const categories: (ProductCategory | "All")[] = ["All", ...getAllCategories()];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setParam("category", cat === "All" ? "" : cat)}
            className={`rounded-full border px-4 py-2 font-display text-xs uppercase tracking-[0.18em] transition-colors ${
              activeCategory === cat
                ? "border-primary bg-primary text-background"
                : "border-border bg-surface text-muted hover:border-primary/50 hover:text-text"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="ml-auto">
        <select
          value={activeSort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="rounded-full border border-border bg-surface px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-muted focus:border-primary/50 focus:outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
