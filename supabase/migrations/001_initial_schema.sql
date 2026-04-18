-- ============================================================
-- RBS Ammunition — Initial Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- ── PRODUCTS ─────────────────────────────────────────────────────────────────
-- Used for future product management via Supabase dashboard.
-- The site currently serves products from a static catalog in /src/lib/products.ts

CREATE TABLE IF NOT EXISTS products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  description     TEXT,
  caliber         TEXT NOT NULL,
  brand           TEXT,
  grain           INTEGER,
  round_count     INTEGER,
  price           NUMERIC(10,2) NOT NULL,
  image_url       TEXT,
  in_stock        BOOLEAN DEFAULT TRUE,
  stock_quantity  INTEGER DEFAULT 0,
  category        TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── ORDERS ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS orders (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status           TEXT DEFAULT 'pending',         -- pending | paid | shipped | delivered | cancelled
  customer_email   TEXT NOT NULL,
  customer_name    TEXT NOT NULL,
  shipping_address JSONB NOT NULL,                  -- { street, city, state, zip }
  items            JSONB NOT NULL,                  -- [{ product_id, name, quantity, price }]
  subtotal         NUMERIC(10,2),
  shipping_cost    NUMERIC(10,2),
  tax              NUMERIC(10,2),
  total            NUMERIC(10,2) NOT NULL,
  payment_status   TEXT DEFAULT 'unpaid',           -- unpaid | paid
  transaction_id   TEXT,                            -- filled after FluidPay payment
  age_verified     BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── UPDATED_AT TRIGGER ────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders   ENABLE ROW LEVEL SECURITY;

-- Products: publicly readable by anyone
CREATE POLICY "products_public_read"
  ON products FOR SELECT
  USING (TRUE);

-- Orders: anyone can INSERT (customers placing orders without an account)
CREATE POLICY "orders_public_insert"
  ON orders FOR INSERT
  WITH CHECK (TRUE);

-- Orders: only authenticated users (admins) can SELECT / UPDATE / DELETE
CREATE POLICY "orders_auth_read"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "orders_auth_update"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "orders_auth_delete"
  ON orders FOR DELETE
  USING (auth.role() = 'authenticated');
