CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  starred boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert contact messages"
ON public.contact_messages
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "No public read on contact messages"
ON public.contact_messages
FOR SELECT
TO public
USING (false);