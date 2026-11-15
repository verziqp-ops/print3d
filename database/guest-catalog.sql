-- Public visitors can read the storefront before signing in at checkout.
-- Personal profiles, orders, messages and favorites keep their existing policies.
create policy guest_catalog_read on public.products for select to anon using (true);
create policy guest_catalog_read on public.categories for select to anon using (true);
create policy guest_catalog_read on public.colors for select to anon using (true);
create policy guest_catalog_read on public.plastics for select to anon using (true);
