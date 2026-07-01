CREATE TABLE IF NOT EXISTS public.book_payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id text NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
  selected_photo_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  payable_photo_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  amount numeric(10, 2) NOT NULL,
  status text NOT NULL DEFAULT 'created',
  external_reference text UNIQUE,
  mercado_pago_preference_id text,
  mercado_pago_payment_id text,
  mercado_pago_status text,
  raw_response jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.book_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Book payments apenas para administradores autenticados" ON public.book_payments;
CREATE POLICY "Book payments apenas para administradores autenticados"
ON public.book_payments
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Atualização pública de books (seleção de fotos)" ON public.books;
DROP POLICY IF EXISTS "Atualização pública apenas da seleção de fotos" ON public.books;

REVOKE UPDATE ON public.books FROM public;
REVOKE UPDATE ON public.books FROM anon;
GRANT UPDATE (selected_photo_ids) ON public.books TO anon;
GRANT UPDATE ON public.books TO authenticated;

CREATE POLICY "Atualização pública apenas da seleção de fotos"
ON public.books
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);
