-- ARREL MINIMUM DATABASE SCHEMA
-- Based on 'Minimum Architecture' Manifest

-- 1. PROFILES (Extends Auth)
create table public.profiles (
  id uuid references auth.users not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text,
  
  -- "Dades mínimes": No cosmetic fields.
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
);

-- 2. DIAGNOSTICS (Initial Point)
create table public.diagnostics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Stores the raw scores for the 5 immutable areas
  scores jsonb not null, 
  -- e.g., {"physical": -5, "social": 2, ...}
  
  -- The calculated prioritites at that moment
  priorities jsonb not null
);

-- 3. USER STATE ( The "Memory" of the Engine)
-- Tracks where the user is in the 7-day cycle.
create table public.user_state (
  user_id uuid references public.profiles(id) not null primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  current_cycle integer default 1,
  current_day integer default 1, -- 1 to 7
  
  -- Persistent Friction Memory
  -- Tracks "avoidance" or "resistance" per area over cycles
  friction_history jsonb default '{}'::jsonb 
);

-- 4. DAILY LOGS (Feedback)
create table public.daily_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  cycle_number integer not null,
  day_number integer not null,
  
  -- The Decision: What was assigned?
  assigned_task_id text not null, -- references code ID
  
  -- The Feedback: "✔ / △ / ✖"
  status text check (status in ('DONE', 'PARTIAL', 'NOT_DONE')) not null,
  
  -- "Una frase lliure"
  note text
);

-- RLS POLICIES (Security)
alter table public.profiles enable row level security;
alter table public.diagnostics enable row level security;
alter table public.user_state enable row level security;
alter table public.daily_logs enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can view own diagnostics" on diagnostics for select using (auth.uid() = user_id);
create policy "Users can insert own diagnostics" on diagnostics for insert with check (auth.uid() = user_id);

create policy "Users can view own state" on user_state for select using (auth.uid() = user_id);
create policy "Users can update own state" on user_state for update using (auth.uid() = user_id);
create policy "Users can insert own state" on user_state for insert with check (auth.uid() = user_id);

create policy "Users can view own logs" on daily_logs for select using (auth.uid() = user_id);
create policy "Users can insert own logs" on daily_logs for insert with check (auth.uid() = user_id);
