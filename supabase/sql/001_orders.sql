create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_email text not null check (position('@' in customer_email) > 1),
  total_ksh integer not null check (total_ksh > 0),
  currency text not null default 'KES',
  items jsonb not null default '[]'::jsonb,
  payment_provider text not null default 'paystack',
  payment_status text not null default 'pending' check (
    payment_status in ('pending', 'success', 'failed', 'abandoned')
  ),
  paystack_reference text unique,
  paystack_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_customer_email_idx on public.orders (customer_email);
create index if not exists orders_payment_status_idx on public.orders (payment_status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_orders_set_updated_at on public.orders;
create trigger trg_orders_set_updated_at
before update on public.orders
for each row
execute procedure public.set_updated_at();

alter table public.orders enable row level security;

drop policy if exists "anon_insert_orders" on public.orders;
create policy "anon_insert_orders"
on public.orders
for insert
to anon
with check (true);
