# Repository Map

This file is for coding agents working in `rbsAmmo`.

## App Summary

- Framework: Next.js App Router (`src/app`)
- Styling: Tailwind CSS v4 via [src/styles/globals.css](src/styles/globals.css)
- Data: Supabase
- Public storefront and internal admin panel live in the same app

## High-Value Paths

- Public routes:
  - [src/app/page.tsx](src/app/page.tsx)
  - [src/app/shop/page.tsx](src/app/shop/page.tsx)
  - [src/app/shop/[slug]/page.tsx](src/app/shop/[slug]/page.tsx)
  - [src/app/cart/page.tsx](src/app/cart/page.tsx)
  - [src/app/checkout/page.tsx](src/app/checkout/page.tsx)
  - [src/app/order-confirmation/page.tsx](src/app/order-confirmation/page.tsx)
- Admin routes:
  - [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx)
  - [src/app/admin/(protected)/layout.tsx](src/app/admin/(protected)/layout.tsx)
  - [src/app/admin/(protected)/page.tsx](src/app/admin/(protected)/page.tsx)
  - [src/app/admin/(protected)/products/page.tsx](<src/app/admin/(protected)/products/page.tsx>)
  - [src/app/admin/(protected)/products/new/page.tsx](<src/app/admin/(protected)/products/new/page.tsx>)
  - [src/app/admin/(protected)/products/[id]/edit/page.tsx](<src/app/admin/(protected)/products/[id]/edit/page.tsx>)
  - [src/app/admin/(protected)/orders/page.tsx](<src/app/admin/(protected)/orders/page.tsx>)
  - [src/app/admin/(protected)/orders/[id]/page.tsx](<src/app/admin/(protected)/orders/[id]/page.tsx>)
- Shared admin actions and UI:
  - [src/app/admin/actions.ts](src/app/admin/actions.ts)
  - [src/components/admin](src/components/admin)

## Data Layer

- Shared product/order types and formatting helpers live in [src/lib/products.ts](src/lib/products.ts).
- Public storefront product reads come from [src/lib/products-server.ts](src/lib/products-server.ts).
- Authenticated admin reads come from [src/lib/admin-data.ts](src/lib/admin-data.ts).
- Public Supabase client helper is [src/lib/supabase.ts](src/lib/supabase.ts).
- SSR auth helpers are:
  - [src/lib/supabase-server.ts](src/lib/supabase-server.ts)
  - [src/lib/supabase-middleware.ts](src/lib/supabase-middleware.ts)
  - [src/middleware.ts](src/middleware.ts)

## Mutation Rules

- Public checkout order creation is still handled by [src/app/actions.ts](src/app/actions.ts).
- Admin mutations all go through server actions in [src/app/admin/actions.ts](src/app/admin/actions.ts).
- Product create/update/delete and order status updates are never done directly from client components.
- Admin mutations use the authenticated user session via `@supabase/ssr`.

## Supabase Notes

- Base schema is [supabase/migrations/001_initial_schema.sql](supabase/migrations/001_initial_schema.sql).
- Admin product policies plus storage bucket setup are in [supabase/migrations/002_admin_product_policies_and_storage.sql](supabase/migrations/002_admin_product_policies_and_storage.sql).
- Admin allowlist hardening is in [supabase/migrations/003_lock_admin_access.sql](supabase/migrations/003_lock_admin_access.sql).
- The storefront source of truth is now Supabase `products`, not a hardcoded catalog array.

## Important Frontend Components

- Public shell:
  - [src/components/site-header.tsx](src/components/site-header.tsx)
  - [src/components/site-footer.tsx](src/components/site-footer.tsx)
- Storefront product UI:
  - [src/components/product-card.tsx](src/components/product-card.tsx)
  - [src/components/product-grid.tsx](src/components/product-grid.tsx)
  - [src/components/shop-filters.tsx](src/components/shop-filters.tsx)
  - [src/components/add-to-cart-button.tsx](src/components/add-to-cart-button.tsx)
  - [src/components/variant-selector.tsx](src/components/variant-selector.tsx)
- Cart state:
  - [src/context/CartContext.tsx](src/context/CartContext.tsx)

## Legacy / Low-Priority Files

- [src/lib/content.ts](src/lib/content.ts), [src/lib/catalog.ts](src/lib/catalog.ts), [src/components/hero-section.tsx](src/components/hero-section.tsx), and [src/components/partner-section.tsx](src/components/partner-section.tsx) are older content/design helpers and are not on the main admin flow.
- [sourcematerial.txt](sourcematerial.txt) is content reference material, not runtime app state.

## Navigation Advice For Agents

- If you are changing public product behavior, start with:
  - [src/lib/products.ts](src/lib/products.ts)
  - [src/lib/products-server.ts](src/lib/products-server.ts)
  - relevant `src/app/shop/*` route
- If you are changing admin auth/session behavior, start with:
  - [src/middleware.ts](src/middleware.ts)
  - [src/lib/supabase-server.ts](src/lib/supabase-server.ts)
  - [src/app/admin/actions.ts](src/app/admin/actions.ts)
- If you are changing product CRUD, start with:
  - [src/components/admin/admin-product-form.tsx](src/components/admin/admin-product-form.tsx)
  - [src/app/admin/actions.ts](src/app/admin/actions.ts)
  - [src/lib/admin-data.ts](src/lib/admin-data.ts)
- If you are changing order management, start with:
  - [src/app/admin/(protected)/orders/page.tsx](<src/app/admin/(protected)/orders/page.tsx>)
  - [src/app/admin/(protected)/orders/[id]/page.tsx](<src/app/admin/(protected)/orders/[id]/page.tsx>)
  - [src/app/admin/actions.ts](src/app/admin/actions.ts)
