-- Supabase SQL schema for the products table
-- Run this in Supabase SQL Editor for your project.

CREATE TABLE IF NOT EXISTS public.products (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  "desc" text,
  price numeric(12,2) NOT NULL DEFAULT 0,
  orig_price numeric(12,2),
  category text NOT NULL,
  emoji text,
  image_url text,
  images jsonb,
  available boolean NOT NULL DEFAULT true,
  bestseller boolean NOT NULL DEFAULT false,
  specs jsonb,
  added_by_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_bestseller ON public.products (bestseller);
CREATE INDEX IF NOT EXISTS idx_products_available ON public.products (available);

-- Optional trigger to keep updated_at current
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_trigger ON public.products;
CREATE TRIGGER set_updated_at_trigger
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Example insert for seed product data
INSERT INTO public.products (name, "desc", price, orig_price, category, emoji, image_url, images, available, bestseller, specs, added_by_admin)
VALUES (
  'Pearl Drop Earrings',
  'Elegant freshwater pearl drop earrings with gold-plated hooks.',
  599.00,
  850.00,
  'Earrings',
  '✨',
  'https://example.com/path/to/image.jpg',
  '["https://example.com/path/to/image.jpg", "💫", "🌟"]',
  true,
  true,
  '{"Material": "Freshwater Pearl + Gold Plating", "Length": "3.5 cm", "Weight": "5g", "Occasion": "Casual / Formal"}',
  true
);
