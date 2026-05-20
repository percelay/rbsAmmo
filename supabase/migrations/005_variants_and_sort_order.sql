-- ============================================================
-- RBS Ammunition — Product variants and manual sort ordering
-- Run in the Supabase SQL editor after 004.
-- ============================================================

-- ── 1. Manual sort order on products ────────────────────────────────────────
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS products_sort_order_idx
  ON products (category, sort_order);

-- ── 2. Product variants (50-ct vs 250-ct sports pack, etc.) ─────────────────
CREATE TABLE IF NOT EXISTS product_variants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label           TEXT NOT NULL,            -- "50ct Box", "250ct Sport Pack"
  round_count     INTEGER NOT NULL,
  sku             TEXT UNIQUE,
  price           NUMERIC(10,2) NOT NULL,
  in_stock        BOOLEAN NOT NULL DEFAULT TRUE,
  stock_quantity  INTEGER NOT NULL DEFAULT 0,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS product_variants_product_id_idx
  ON product_variants (product_id, sort_order);

DROP TRIGGER IF EXISTS product_variants_updated_at ON product_variants;
CREATE TRIGGER product_variants_updated_at
  BEFORE UPDATE ON product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS — public read, admin write
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "product_variants_public_read" ON product_variants;
CREATE POLICY "product_variants_public_read"
  ON product_variants FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "product_variants_auth_write" ON product_variants;
CREATE POLICY "product_variants_auth_write"
  ON product_variants FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ── 3. Seed Pistol sort_order per Misti's spec ──────────────────────────────
-- Order: 380, 9-115, 9-124, 9-147, 9-165, 38, 357, 40, 10, 45
-- Steps of 10 so admin can interleave new products.
UPDATE products SET sort_order = 10  WHERE slug = 'rbs-380-acp';
UPDATE products SET sort_order = 20  WHERE slug = 'rbs-9mm-115gr-tmj';
UPDATE products SET sort_order = 30  WHERE slug = 'rbs-9mm-124gr-tmj';
UPDATE products SET sort_order = 40  WHERE slug = 'rbs-9mm-147gr-subsonic';
UPDATE products SET sort_order = 50  WHERE slug = 'rbs-9mm-165gr-subsonic';
UPDATE products SET sort_order = 60  WHERE slug = 'rbs-38-special-158gr-tmj';
UPDATE products SET sort_order = 70  WHERE slug = 'rbs-357-mag-158gr-tmj';
UPDATE products SET sort_order = 80  WHERE slug = 'rbs-40-sw-180gr-tmj';
UPDATE products SET sort_order = 90  WHERE slug = 'rbs-10mm-180gr-tmj';
UPDATE products SET sort_order = 100 WHERE slug = 'rbs-45-acp';
UPDATE products SET sort_order = 999 WHERE slug = 'speer-lawman-45-auto-230gr-tmj';
