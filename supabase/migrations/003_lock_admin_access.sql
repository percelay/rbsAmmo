-- ============================================================
-- RBS Ammunition — Lock Admin Access To Allowlisted Emails
-- Run this after 001_initial_schema.sql and 002_admin_product_policies_and_storage.sql
-- ============================================================

-- Allowlist table managed manually in Supabase dashboard / SQL editor.
CREATE TABLE IF NOT EXISTS public.admin_users (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT admin_users_email_lowercase CHECK (email = lower(email))
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_users_self_read" ON public.admin_users;
CREATE POLICY "admin_users_self_read"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (email = lower(COALESCE(auth.jwt() ->> 'email', '')));

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE email = lower(COALESCE(auth.jwt() ->> 'email', ''))
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin_user() TO anon, authenticated;

-- Replace broad authenticated policies with admin-only policies.
DROP POLICY IF EXISTS "orders_auth_read" ON public.orders;
DROP POLICY IF EXISTS "orders_auth_update" ON public.orders;
DROP POLICY IF EXISTS "orders_auth_delete" ON public.orders;

CREATE POLICY "orders_admin_read"
  ON public.orders FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

CREATE POLICY "orders_admin_update"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- Orders should never be deleted from the app.

DROP POLICY IF EXISTS "products_auth_insert" ON public.products;
DROP POLICY IF EXISTS "products_auth_update" ON public.products;
DROP POLICY IF EXISTS "products_auth_delete" ON public.products;

CREATE POLICY "products_admin_insert"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_user());

CREATE POLICY "products_admin_update"
  ON public.products FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

CREATE POLICY "products_admin_delete"
  ON public.products FOR DELETE
  TO authenticated
  USING (public.is_admin_user());

DROP POLICY IF EXISTS "product_images_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "product_images_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "product_images_auth_delete" ON storage.objects;

CREATE POLICY "product_images_admin_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin_user());

CREATE POLICY "product_images_admin_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin_user())
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin_user());

CREATE POLICY "product_images_admin_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin_user());
