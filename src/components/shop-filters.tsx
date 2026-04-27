"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { getAllCategories, type ProductCategory } from "@/lib/products";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

const ROUND_COUNT_OPTIONS = [
  { value: "", label: "All Sizes" },
  { value: "50", label: "50-ct Box" },
  { value: "250", label: "250-ct Sports Pack" },
];

export function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "All";
  const activeSort = searchParams.get("sort") ?? "";
  const activeRoundCount = searchParams.get("roundCount") ?? "";

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
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setParam("category", cat === "All" ? "" : cat)}
              className={`rounded-full border px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.18em] transition-colors ${
                activeCategory === cat
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-text hover:border-primary/60 hover:text-primary"
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
            className="rounded-full border border-border bg-surface px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.18em] text-text focus:border-primary/60 focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          Box Size
        </p>
        {ROUND_COUNT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setParam("roundCount", opt.value)}
            className={`rounded-full border px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
              activeRoundCount === opt.value
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-text hover:border-primary/60 hover:text-primary"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
