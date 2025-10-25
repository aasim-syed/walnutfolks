create table if not exists analytics (
  email text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);
