-- ============================================================
-- RBS Ammunition — Product Seed Data
-- Run this in the Supabase SQL editor AFTER running 001_initial_schema.sql
-- Safe to re-run: truncates products first, then re-inserts all
-- ============================================================

TRUNCATE TABLE products RESTART IDENTITY CASCADE;

INSERT INTO products (id, name, slug, description, caliber, brand, grain, round_count, price, image_url, in_stock, category) VALUES

-- ── PISTOL AMMO ─────────────────────────────────────────────────────────────
(gen_random_uuid(), 'RBS 9mm 115gr TMJ', 'rbs-9mm-115gr-tmj',
 'RBS 9mm Luger 115 grain Total Metal Jacket, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection. Available for pickup at Skagit Shooting Range or shipped.',
 '9mm', 'RBS', 115, 50, 14.50, '/products/newbb115.jpg', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 9mm 124gr TMJ', 'rbs-9mm-124gr-tmj',
 'RBS 9mm Luger 124 grain Total Metal Jacket, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection. Available for pickup at Skagit Shooting Range or shipped.',
 '9mm', 'RBS', 124, 50, 14.99, '/products/9-124-box.jpg', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 9mm 147gr Subsonic TMJ', 'rbs-9mm-147gr-subsonic',
 'RBS 9mm Subsonic 147 grain Total Metal Jacket, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection. Available for pickup at Skagit Shooting Range or shipped.',
 '9mm', 'RBS', 147, 50, 16.99, '/products/newbb147.jpg', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 9mm 165gr Subsonic TMJ', 'rbs-9mm-165gr-subsonic',
 'RBS 9mm Subsonic 165 grain Total Metal Jacket, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection. Available for pickup at Skagit Shooting Range or shipped.',
 '9mm', 'RBS', 165, 50, 18.99, '/products/newbb165.jpg', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 380 ACP', 'rbs-380-acp',
 'RBS .380 ACP 95 grain Total Metal Jacket, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection. Available for pickup at Skagit Shooting Range or shipped.',
 '.380 ACP', 'RBS', 95, 50, 17.99, '/products/newbb380.webp', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 38 Special 158gr TMJ', 'rbs-38-special-158gr-tmj',
 '38 Special 158 gr. Total Metal Jacket – 50 count box, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection.',
 '.38 Special', 'RBS', 158, 50, 19.99, '/products/newbb38.jpg', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 357 Mag 158gr TMJ', 'rbs-357-mag-158gr-tmj',
 'RBS 357 Mag 158 gr. Total Metal Jacket – 50-count box, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection.',
 '.357 Magnum', 'RBS', 158, 50, 22.99, '/products/newbb357.jpg', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 40 S&W 180gr TMJ', 'rbs-40-sw-180gr-tmj',
 '40 S&W 180 gr. Total Metal Jacket – Remanufactured. Uses once-fired brass casings with meticulous hand-inspection.',
 '.40 S&W', 'RBS', 180, 50, 17.99, '/products/new40.jpg', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 10mm 180gr TMJ', 'rbs-10mm-180gr-tmj',
 '10mm, 180 gr. Total Metal Jacket – 50 count box, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection.',
 '10mm', 'RBS', 180, 50, 21.99, '/products/newbb10.jpg', TRUE, 'Pistol'),

(gen_random_uuid(), 'RBS 45 ACP 230gr TMJ', 'rbs-45-acp',
 'RBS .45 ACP 230 grain Total Metal Jacket, Remanufactured. Uses once-fired brass casings with meticulous hand-inspection. Available for pickup at Skagit Shooting Range or shipped.',
 '.45 ACP', 'RBS', 230, 50, 19.99, '/products/newbb45.webp', TRUE, 'Pistol'),

(gen_random_uuid(), 'Speer Lawman 45 Auto 230gr TMJ', 'speer-lawman-45-auto-230gr-tmj',
 'SPEER Lawman .45 Auto, 230 grain TMJ, 50 high-performance cartridges. In-Store Pickup is all that is available at this time.',
 '.45 Auto', 'Speer', 230, 50, 17.99, '/products/lawman-45.jpg', FALSE, 'Pistol'),

-- ── RIFLE AMMO ──────────────────────────────────────────────────────────────
(gen_random_uuid(), 'PMC .223', 'pmc-223',
 '20 Rounds of PMC .223 ammunition. In-Store Pickup is all that is available at this time.',
 '.223 Rem', 'PMC', NULL, 20, 10.99, '/products/223PIC.jpg', TRUE, 'Rifle'),

(gen_random_uuid(), 'PMC X-Tac 5.56 NATO', 'pmc-x-tac-5-56',
 'The PMC X-TAC line is tried and tested by military and law enforcement around the world. 20 rounds. In-Store Pickup is all that is available at this time.',
 '5.56 NATO', 'PMC', NULL, 20, 13.99, '/products/3106__37935.jpg', TRUE, 'Rifle'),

(gen_random_uuid(), 'CCI Mini Mag 22 LR', 'cci-mini-mag-22-lr',
 '100 Rounds of CCI Mini Mag 22 LR. In-Store Pickup is all that is available at this time.',
 '.22 LR', 'CCI', 40, 100, 10.99, '/products/image-full-602020-ba428b5bf57b7298c53723724ded98c4.jpg', TRUE, 'Rifle'),

(gen_random_uuid(), 'Federal 20 Gauge 7 1/2 Shot', 'federal-20-gauge-7-5-shot',
 '25 Rounds of 20 gauge Federal clay target shotshells. 2-3/4" 7/8oz. 7 1/2 shot. In-Store Pickup is all that is available at this time.',
 '20 Gauge', 'Federal', NULL, 25, 12.99, '/products/20-gauge-top-gun.jpg', TRUE, 'Rifle'),

(gen_random_uuid(), 'Federal 12 Gauge 8 Shot', 'federal-12-gauge-8-shot',
 '25 Rounds of Federal 12 gauge clay target shotshells 2-3/4" 1 oz. 8 shot. In-Store Pickup is all that is available at this time.',
 '12 Gauge', 'Federal', NULL, 25, 12.99, '/products/12-gauge-top-gun.jpg', FALSE, 'Rifle'),

(gen_random_uuid(), 'Federal Premium LE 12 Gauge Hydra-Shok Slug', 'federal-premium-le-12-gauge-hydra-shok',
 'Federal Premium Law Enforcement 12 Gauge – 438gr Hydra-Shok Tactical Rifled Slug. 2 3/4" | 1300 FPS | 5 Rounds. Maximum stopping power and deep penetration.',
 '12 Gauge', 'Federal', 438, 5, 18.99, '/products/222-scaled-e1763681419216.jpg', TRUE, 'Rifle'),

-- ── RELOADING — BULLETS ─────────────────────────────────────────────────────
(gen_random_uuid(), '.380 100gr RNFP Bullets', '380-100gr-rnfp-bullets-500ct',
 '500 per box. .380 caliber 100 grain round nose flat point bullets for reloading. In-Store Pickup is all that is available at this time.',
 '.380', 'RBS', 100, 500, 44.50, '/products/380-100RN.webp', TRUE, 'Reloading'),

(gen_random_uuid(), '9mm 115gr Round Nose Bullets', '9mm-115gr-rn-bullets-500ct',
 '500 per box. 9mm 115 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.',
 '9mm', 'RBS', 115, 500, 46.50, '/products/9-115-RN.webp', TRUE, 'Reloading'),

(gen_random_uuid(), '9mm 124gr Round Nose Bullets', '9mm-124gr-rn-bullets-500ct',
 '500 per box. 9mm 124 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.',
 '9mm', 'RBS', 124, 500, 48.50, '/products/9-124-box.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '9mm 147gr Round Nose Bullets', '9mm-147gr-rn-bullets-500ct',
 '500 per box. 9mm 147 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.',
 '9mm', 'RBS', 147, 500, 49.32, '/products/9mm_147gr_rn_plated_1.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '9mm 165gr Round Nose Bullets', '9mm-165gr-rn-bullets-500ct',
 '500 per box. 9mm 165 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.',
 '9mm', 'RBS', 165, 500, 51.99, '/products/9-165-rn-scaled.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '.38 158gr Semi-Wadcutter Bullets', '38-158gr-swc-bullets-500ct',
 '500 per box. .38 158 grain semi-wadcutter bullets for reloading. In-Store Pickup is all that is available at this time.',
 '.38', 'RBS', 158, 500, 59.50, '/products/38-158-swc.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '.40 180gr RNFP Bullets', '40-180gr-rnfp-bullets-500ct',
 '500 per box. .40 caliber 180 grain round nose flat point bullets for reloading. In-Store Pickup is all that is available at this time.',
 '.40', 'RBS', 180, 500, 64.99, '/products/40-165-RNFP.webp', TRUE, 'Reloading'),

(gen_random_uuid(), '.45 230gr Round Nose Bullets', '45-230gr-rn-bullets-500ct',
 '500 per box. .45 230 grain round nose bullets for reloading. In-Store Pickup is all that is available at this time.',
 '.45', 'RBS', 230, 500, 75.00, '/products/45-230-scaled.jpg', TRUE, 'Reloading'),

-- ── RELOADING — BRASS ───────────────────────────────────────────────────────
(gen_random_uuid(), '.223 Brass', '223-brass-100ct',
 '100 Count per. Mixed-headstamp .223 brass from an indoor firing range, unprocessed. In-Store Pickup is all that is available at this time.',
 '.223 Rem', 'RBS', NULL, 100, 5.99, '/products/2.23-brass-Small.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '.380 ACP Brass', '380-acp-brass-100ct',
 '100 Count per. .380 brass collected from an indoor range. Mixed head stamp, de-capped, reamed and polished. In-Store Pickup is all that is available at this time.',
 '.380 ACP', 'RBS', NULL, 100, 10.99, '/products/380-brass-Small.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '9mm Brass', '9mm-brass-100ct',
 '100 Count per. Fully processed 9mm, collected from an indoor range. Mixed head stamp, de-primed, full-length case sized and polished. In-Store Pickup is all that is available at this time.',
 '9mm', 'RBS', NULL, 100, 9.99, '/products/9mm-brass-Small.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '38 Special Brass', '38-special-brass-100ct',
 '100 Count per. Fully processed .38 brass. Mixed head stamp, de-capped, reamed, roll sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.',
 '.38 Special', 'RBS', NULL, 100, 7.99, '/products/38-brass-Small.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '357 Mag Brass', '357-mag-brass-100ct',
 '100 Count per. Processed 357 MAG brass. Mixed head stamp, de-capped, reamed, and polished. In-Store Pickup is all that is available at this time.',
 '.357 Magnum', 'RBS', NULL, 100, 13.99, '/products/357-brass-Small.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '40 S&W Brass', '40-sw-brass-100ct',
 '100 Count per. Fully processed 40 brass. Mixed head stamp, de-capped, reamed, full-length case sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.',
 '.40 S&W', 'RBS', NULL, 100, 7.99, '/products/40-brass-Small.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '10mm Brass', '10mm-brass-100ct',
 '100 Count per. Fully processed 10mm brass. Mixed head stamp, de-capped, reamed, full-length case sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.',
 '10mm', 'RBS', NULL, 100, 10.99, '/products/10-brass-Small.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '45 ACP Large Hole Brass', '45-acp-large-hole-brass-100ct',
 '100 Count per. Fully processed .45 large hole brass. De-capped, reamed, full-length case sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.',
 '.45 ACP', 'RBS', NULL, 100, 11.99, '/products/45-brass-LH-Small.jpg', TRUE, 'Reloading'),

(gen_random_uuid(), '45 ACP Small Hole Brass', '45-acp-small-hole-brass-100ct',
 '100 Count per. Fully processed .45 small hole brass. De-capped, reamed, full-length case sized and polished. READY TO LOAD! In-Store Pickup is all that is available at this time.',
 '.45 ACP', 'RBS', NULL, 100, 11.99, '/products/45-sh-Small.webp', TRUE, 'Reloading');
