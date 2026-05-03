-- Create Notices Table
create table if not exists public.notices (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  title text not null,
  message text not null
);

-- Create Events Table
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  day text not null,
  month text not null,
  meta text not null,
  tag text not null
);

-- Add Read Policies
create policy "Anyone can read notices" on public.notices for select using (true);
create policy "Anyone can read events" on public.events for select using (true);

-- Add Write Policies
create policy "Anyone can insert notices" on public.notices for insert with check (true);
create policy "Anyone can update notices" on public.notices for update using (true);
create policy "Anyone can delete notices" on public.notices for delete using (true);

create policy "Anyone can insert events" on public.events for insert with check (true);
create policy "Anyone can update events" on public.events for update using (true);
create policy "Anyone can delete events" on public.events for delete using (true);
