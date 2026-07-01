alter table public.books
add column if not exists category text;

create unique index if not exists books_client_category_unique
on public.books (client_id, category)
where category is not null;
