-- Garantir que a coluna photo_url exista na tabela de clientes
ALTER TABLE public.clients ADD COLUMN IF NOT EXISTS photo_url text;

-- Criar o bucket caso não exista
INSERT INTO storage.buckets (id, name, public)
VALUES ('studioretrato-assets', 'studioretrato-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Política: Permitir leitura pública (SELECT) de arquivos do bucket
CREATE POLICY "Leitura pública de retratos e assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'studioretrato-assets');

-- Política: Permitir upload (INSERT) apenas para administradores autenticados
CREATE POLICY "Upload apenas por administradores autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'studioretrato-assets');

-- Política: Permitir atualização (UPDATE) apenas por administradores autenticados
CREATE POLICY "Atualização apenas por administradores autenticados"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'studioretrato-assets')
WITH CHECK (bucket_id = 'studioretrato-assets');

-- Política: Permitir deleção (DELETE) apenas por administradores autenticados
CREATE POLICY "Deleção apenas por administradores autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'studioretrato-assets');
