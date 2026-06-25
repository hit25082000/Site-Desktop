-- Adiciona a coluna prompt_details à tabela de books para salvar detalhes adicionais de prompt de IA
ALTER TABLE public.books ADD COLUMN IF NOT EXISTS prompt_details text;
