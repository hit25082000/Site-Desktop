-- Adicionar colunas de precificação faltantes na tabela de books
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS package_price numeric(10, 2) DEFAULT 50.00;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS package_photos integer DEFAULT 2;
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS extra_photo_price numeric(10, 2) DEFAULT 10.00;

-- Permitir que a coluna price_per_photo seja nula caso usem precificação de pacote
ALTER TABLE public.books ALTER COLUMN price_per_photo DROP NOT NULL;
