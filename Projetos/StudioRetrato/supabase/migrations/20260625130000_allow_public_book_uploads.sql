-- Permite uploads públicos no bucket studioretrato-assets apenas na pasta "books/"
-- Isso resolve falhas de permissão quando clientes anônimos finalizam a geração das fotos Kie AI.

CREATE POLICY "Permitir upload publico de fotos de books"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'studioretrato-assets' AND (storage.foldername(name))[1] = 'books');

CREATE POLICY "Permitir update publico de fotos de books"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'studioretrato-assets' AND (storage.foldername(name))[1] = 'books')
WITH CHECK (bucket_id = 'studioretrato-assets' AND (storage.foldername(name))[1] = 'books');
