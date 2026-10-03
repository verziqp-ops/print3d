-- Catalog G-code is a template; clients get playback only after printing starts.
alter table public.products add column if not exists gcode text;
drop trigger if exists start_gcode_clock on public.orders;
create or replace function public.start_gcode_clock() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    if new.gcode is null and new.product_id is not null then
      select p.gcode into new.gcode from public.products p where p.id = new.product_id;
    end if;
    new.print_started_at := case when new.status = 'printing' then now() else null end;
  elsif new.status = 'printing' and old.status is distinct from 'printing' then
    new.print_started_at := now();
  elsif new.status = 'pending' then
    new.print_started_at := null;
  else
    new.print_started_at := old.print_started_at;
  end if;
  return new;
end;
$$;
revoke execute on function public.start_gcode_clock() from public, anon, authenticated;
create trigger start_gcode_clock before insert or update on public.orders
for each row execute function public.start_gcode_clock();
-- Old uploads on pending orders must not leave a running clock.
update public.orders set print_started_at = null where status = 'pending' and print_started_at is not null;
