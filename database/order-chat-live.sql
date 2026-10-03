-- Automatic order notifications are part of the order transaction, under existing RLS.
alter table public.orders add column if not exists print_started_at timestamptz;
create or replace function public.notify_print_order() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  insert into public.messages(user_id, sender_id, body, image)
  values(new.user_id, new.user_id,
    '📦 Нове замовлення #' || new.id || E'\n' || new.title ||
    E'\nМатеріал: ' || coalesce(new.plastic, '—') ||
    E'\nКолір: ' || coalesce(new.color, '—') ||
    E'\nКількість: ' || coalesce(new.qty, 1) ||
    case when new.price is not null then E'\nРазом: ' || new.price * coalesce(new.qty, 1) || ' грн' else '' end ||
    case when nullif(new.descr, '') is not null then E'\nОпис: ' || new.descr else '' end ||
    case when nullif(new.file, '') is not null then E'\nФайл: ' || new.file else '' end,
    new.image);
  return new;
end;
$$;
revoke execute on function public.notify_print_order() from public, anon, authenticated;
drop trigger if exists notify_print_order on public.orders;
create trigger notify_print_order after insert on public.orders
for each row execute function public.notify_print_order();
-- Use server time so an administrator's device clock cannot shift Live playback.
create or replace function public.start_gcode_clock() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if new.gcode is distinct from old.gcode and new.gcode is not null then
    new.print_started_at := now();
  end if;
  return new;
end;
$$;
revoke execute on function public.start_gcode_clock() from public, anon, authenticated;
drop trigger if exists start_gcode_clock on public.orders;
create trigger start_gcode_clock before update of gcode on public.orders
for each row execute function public.start_gcode_clock();
