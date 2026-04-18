-- ============================================================
-- RBS Ammunition — Admin Product Policies + Product Image Storage
-- Run this after 001_initial_schema.sql
-- ============================================================

-- Allow authenticated admin users to manage products through the app.
DROP POLICY IF EXISTS "products_auth_insert" ON products;
DROP POLICY IF EXISTS "products_auth_update" ON products;
DROP POLICY IF EXISTS "products_auth_delete" ON products;

CREATE POLICY "products_auth_insert"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (TRUE);

CREATE POLICY "products_auth_update"
  ON products FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "products_auth_delete"
  ON products FOR DELETE
  TO authenticated
  USING (TRUE);

-- Public bucket for storefront product images.
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', TRUE)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public;

-- Public read so storefront pages can render images without auth.
DROP POLICY IF EXISTS "product_images_public_read" ON storage.objects;
CREATE POLICY "product_images_public_read"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

-- Authenticated admins can upload, replace, and remove product images.
DROP POLICY IF EXISTS "product_images_auth_insert" ON storage.objects;
CREATE POLICY "product_images_auth_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "product_images_auth_update" ON storage.objects;
CREATE POLICY "product_images_auth_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images')
  WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "product_images_auth_delete" ON storage.objects;
CREATE POLICY "product_images_auth_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');
