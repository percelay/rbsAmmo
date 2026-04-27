-- Misti requested the 9mm 124gr Reloading product show actual bullets,
-- not the loaded-cartridge box image. The Pistol 50ct version keeps its image.
UPDATE products
SET image_url = '/newphotos/stockbullets3.png'
WHERE slug = '9mm-124gr-rn-bullets-500ct';
