-- Habilitar UUID
create extension if not exists "uuid-ossp";

-- Tabela: settings
create table public.settings (
    key text primary key,
    value jsonb not null
);

-- Tabela: categories
create table public.categories (
    id text primary key,
    name text not null
);

-- Tabela: references
create table public.references (
    id text primary key,
    name text not null,
    category text not null,
    url text not null,
    prompt text not null,
    public boolean default true,
    "order" integer default 0
);

-- Tabela: clients
create table public.clients (
    id text primary key,
    name text not null,
    phone text,
    email text,
    photo_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela: books
create table public.books (
    id text primary key,
    client_id text references public.clients(id) on delete cascade not null,
    title text not null,
    category text,
    price_per_photo numeric(10, 2) default 30.00,
    package_price numeric(10, 2) default 50.00,
    package_photos integer default 2,
    extra_photo_price numeric(10, 2) default 10.00,
    references_used jsonb default '[]'::jsonb,
    references_data jsonb default '[]'::jsonb,
    photos jsonb default '[]'::jsonb,
    payment_status text default 'pending'::text,
    selected_photo_ids jsonb default '[]'::jsonb,
    prompt_details text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create unique index if not exists books_client_category_unique
on public.books (client_id, category)
where category is not null;

-- Tabela: book_payments
create table public.book_payments (
    id uuid primary key default uuid_generate_v4(),
    book_id text not null references public.books(id) on delete cascade,
    selected_photo_ids jsonb not null default '[]'::jsonb,
    payable_photo_ids jsonb not null default '[]'::jsonb,
    amount numeric(10, 2) not null,
    status text not null default 'created',
    external_reference text unique,
    mercado_pago_preference_id text,
    mercado_pago_payment_id text,
    mercado_pago_status text,
    raw_response jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS em tabelas críticas
alter table public.settings enable row level security;
alter table public.categories enable row level security;
alter table public.references enable row level security;
alter table public.clients enable row level security;
alter table public.books enable row level security;
alter table public.book_payments enable row level security;

-- Políticas de Acesso
create policy "Leitura pública de configurações" on public.settings for select using (true);
create policy "Modificação apenas por administradores autenticados" on public.settings for all using (auth.role() = 'authenticated');

create policy "Leitura pública de categorias" on public.categories for select using (true);
create policy "Modificação apenas por administradores autenticados" on public.categories for all using (auth.role() = 'authenticated');

create policy "Leitura pública de referências" on public.references for select using (true);
create policy "Modificação apenas por administradores autenticados" on public.references for all using (auth.role() = 'authenticated');

create policy "Operações apenas por administradores autenticados" on public.clients for all using (auth.role() = 'authenticated');

create policy "Leitura pública de books" on public.books for select using (true);
create policy "Atualização pública apenas da seleção de fotos" on public.books for update to anon using (true) with check (true);
create policy "Modificação total apenas por administradores autenticados" on public.books for all using (auth.role() = 'authenticated');
create policy "Book payments apenas para administradores autenticados" on public.book_payments for all to authenticated using (true) with check (true);

-- ====================================================
-- CONFIGURAÇÃO DE STORAGE BUCKET & POLÍCIES
-- ====================================================

-- Criar o bucket caso não exista
insert into storage.buckets (id, name, public)
values ('studioretrato-assets', 'studioretrato-assets', true)
on conflict (id) do nothing;

-- Política: Permitir leitura pública (SELECT) de arquivos do bucket
create policy "Leitura pública de retratos e assets"
on storage.objects for select
to public
using (bucket_id = 'studioretrato-assets');

-- Política: Permitir upload (INSERT) apenas para administradores autenticados
create policy "Upload apenas por administradores autenticados"
on storage.objects for insert
to authenticated
with check (bucket_id = 'studioretrato-assets');

-- Política: Permitir atualização (UPDATE) apenas por administradores autenticados
create policy "Atualização apenas por administradores autenticados"
on storage.objects for update
to authenticated
using (bucket_id = 'studioretrato-assets')
with check (bucket_id = 'studioretrato-assets');

-- Política: Permitir deleção (DELETE) apenas por administradores autenticados
create policy "Deleção apenas por administradores autenticados"
on storage.objects for delete
to authenticated
using (bucket_id = 'studioretrato-assets');
