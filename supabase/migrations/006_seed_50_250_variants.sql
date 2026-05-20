-- ============================================================
-- RBS Ammunition — Seed 50ct + 250ct variants for the loaded
-- pistol cartridges that ship in both box sizes.
-- Run in the Supabase SQL editor after 005.
-- Idempotent: deletes existing variants for these slugs first.
-- ============================================================

-- 1. Wipe any prior variant rows for these specific products
DELETE FROM product_variants
WHERE product_id IN (
  SELECT id FROM products WHERE slug IN (
    'rbs-9mm-115gr-tmj',
    'rbs-9mm-124gr-tmj',
    'rbs-9mm-147gr-subsonic',
    'rbs-9mm-165gr-subsonic',
    'rbs-380-acp',
    'rbs-40-sw-180gr-tmj',
    'rbs-45-acp'
  )
);

-- 2. Insert 50ct + 250ct variants. The 50ct price matches the
--    parent product's existing single-box price; the 250ct price
--    is the higher end of the public range Misti supplied.
INSERT INTO product_variants
  (product_id, label, round_count, price, sku, in_stock, stock_quantity, sort_order)
SELECT
  p.id,
  v.label,
  v.round_count,
  v.price::numeric(10,2),
  'RBS-' || v.sku_suffix,
  TRUE,
  0,
  v.sort_order
FROM (VALUES
  ('rbs-9mm-115gr-tmj',      '50ct Box',           50,  14.50, '9-115-50',   10),
  ('rbs-9mm-115gr-tmj',      '250ct Sport Pack',   250, 71.25, '9-115-250',  20),
  ('rbs-9mm-124gr-tmj',      '50ct Box',           50,  14.99, '9-124-50',   10),
  ('rbs-9mm-124gr-tmj',      '250ct Sport Pack',   250, 74.95, '9-124-250',  20),
  ('rbs-9mm-147gr-subsonic', '50ct Box',           50,  16.99, '9-147-50',   10),
  ('rbs-9mm-147gr-subsonic', '250ct Sport Pack',   250, 84.99, '9-147-250',  20),
  ('rbs-9mm-165gr-subsonic', '50ct Box',           50,  18.99, '9-165-50',   10),
  ('rbs-9mm-165gr-subsonic', '250ct Sport Pack',   250, 94.95, '9-165-250',  20),
  ('rbs-380-acp',            '50ct Box',           50,  17.99, '380-50',     10),
  ('rbs-380-acp',            '250ct Sport Pack',   250, 89.95, '380-250',    20),
  ('rbs-40-sw-180gr-tmj',    '50ct Box',           50,  17.99, '40-50',      10),
  ('rbs-40-sw-180gr-tmj',    '250ct Sport Pack',   250, 89.95, '40-250',     20),
  ('rbs-45-acp',             '50ct Box',           50,  19.99, '45-50',      10),
  ('rbs-45-acp',             '250ct Sport Pack',   250, 99.95, '45-250',     20)
) AS v(slug, label, round_count, price, sku_suffix, sort_order)
JOIN products p ON p.slug = v.slug;
