
CREATE TABLE public.boutique_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '0€',
  emoji TEXT NOT NULL DEFAULT '🛍️',
  image_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'merch',
  status TEXT NOT NULL DEFAULT 'coming_soon',
  link_url TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.boutique_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active boutique items"
  ON public.boutique_items
  FOR SELECT
  TO public
  USING (active = true);
