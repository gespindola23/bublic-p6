-- 1. Create Companies Table
create table if not exists public.companies (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  website text,
  location text,
  founded_year integer,
  employee_count text,
  logo_url text,
  cover_url text,
  verified boolean default false,
  valuation bigint,
  total_raised bigint,
  funding_status text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Company Metrics Table
create table if not exists public.company_metrics (
  id uuid default gen_random_uuid() primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  metric_name text not null,
  metric_value text not null,
  metric_change text,
  is_visible boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Company Employees Table
create table if not exists public.company_employees (
  id uuid default gen_random_uuid() primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  is_founder boolean default false,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(company_id, user_id)
);

-- 4. Create Company Followers Table
create table if not exists public.company_followers (
  id uuid default gen_random_uuid() primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  followed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(company_id, user_id)
);

-- 5. Create Company Customers Table (for "Trusted By" section)
create table if not exists public.company_customers (
  id uuid default gen_random_uuid() primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_name text not null,
  customer_logo_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Set up Row Level Security (RLS)
alter table public.companies enable row level security;
alter table public.company_metrics enable row level security;
alter table public.company_employees enable row level security;
alter table public.company_followers enable row level security;
alter table public.company_customers enable row level security;

-- Policies for Companies
create policy "Companies are viewable by everyone."
  on public.companies for select
  using ( true );

create policy "Company employees can update their company."
  on public.companies for update
  using ( 
    exists (
      select 1 from public.company_employees 
      where company_id = id and user_id = auth.uid()
    )
  );

-- Policies for Company Metrics
create policy "Company metrics are viewable by everyone."
  on public.company_metrics for select
  using ( true );

create policy "Company employees can manage metrics."
  on public.company_metrics for all
  using ( 
    exists (
      select 1 from public.company_employees 
      where company_id = company_metrics.company_id and user_id = auth.uid()
    )
  );

-- Policies for Company Employees
create policy "Company employees are viewable by everyone."
  on public.company_employees for select
  using ( true );

-- Policies for Company Followers
create policy "Company followers are viewable by everyone."
  on public.company_followers for select
  using ( true );

create policy "Users can follow/unfollow companies."
  on public.company_followers for all
  using ( auth.uid() = user_id );

-- Policies for Company Customers
create policy "Company customers are viewable by everyone."
  on public.company_customers for select
  using ( true );

-- 7. Add company_id to posts table
alter table public.posts add column if not exists company_id uuid references public.companies(id);

-- 8. Seed Data
DO $$
DECLARE
    resend_company_id uuid;
    seed_user_id uuid;
BEGIN
    -- Find a user to attribute the seed data to
    SELECT id INTO seed_user_id FROM auth.users LIMIT 1;

    -- Only proceed with seeding if a user is found
    IF seed_user_id IS NOT NULL THEN
        -- Create Resend company
        INSERT INTO public.companies (
            id, name, description, website, location, founded_year, employee_count,
            logo_url, cover_url, verified, valuation, total_raised, funding_status
        ) VALUES (
            gen_random_uuid(), 'Resend', 'The email API for developers.', 'resend.com', 
            'San Francisco, CA', 2023, '50+', '/resend-logo-new.jpeg', '/resend-cover.png',
            true, 100000000, 15000000, 'Series A'
        ) RETURNING id INTO resend_company_id;

        -- Add company metrics
        INSERT INTO public.company_metrics (company_id, metric_name, metric_value, metric_change, is_visible) VALUES
            (resend_company_id, 'Emails Sent (Last 30d)', '1.2B', '+15%', true),
            (resend_company_id, 'API Uptime', '99.99%', 'SLA', true),
            (resend_company_id, 'Developer Signups', '150,000+', '+5K this week', true),
            (resend_company_id, 'Customer Satisfaction', '98%', 'Excellent', false);

        -- Add company employees
        INSERT INTO public.company_employees (company_id, user_id, title, is_founder) VALUES
            (resend_company_id, seed_user_id, 'CEO', true);

        -- Add some mock employees (we'll create profiles for them)
        INSERT INTO public.profiles (id, full_name, title, company, verified) VALUES
            (gen_random_uuid(), 'Zeno Rocha', 'CEO', 'Resend', true),
            (gen_random_uuid(), 'Bu Kinoshita', 'Head of Product', 'Resend', true),
            (gen_random_uuid(), 'Jonni Lundy', 'Founding Engineer', 'Resend', true),
            (gen_random_uuid(), 'Amie Chen', 'Product Designer', 'Resend', false),
            (gen_random_uuid(), 'Alex Smith', 'Developer Advocate', 'Resend', false);

        -- Add employees to company
        INSERT INTO public.company_employees (company_id, user_id, title, is_founder)
        SELECT resend_company_id, id, title, false
        FROM public.profiles 
        WHERE company = 'Resend' AND full_name != 'Sarah Chen';

        -- Add company followers (using existing profiles)
        INSERT INTO public.company_followers (company_id, user_id)
        SELECT resend_company_id, id
        FROM public.profiles 
        WHERE company != 'Resend'
        LIMIT 5;

        -- Add trusted customers
        INSERT INTO public.company_customers (company_id, customer_name, customer_logo_url, display_order) VALUES
            (resend_company_id, 'Vercel', '/customer-logos/vercel.svg', 1),
            (resend_company_id, 'Notion', '/customer-logos/notion.svg', 2),
            (resend_company_id, 'LottieFiles', '/customer-logos/lottiefiles.svg', 3),
            (resend_company_id, 'Retool', '/customer-logos/retool.svg', 4);

        -- Update posts to be associated with the company
        UPDATE public.posts 
        SET company_id = resend_company_id 
        WHERE user_id = seed_user_id;

        RAISE NOTICE 'Successfully seeded Resend company data with ID: %', resend_company_id;
    ELSE
        RAISE NOTICE 'No users found in auth.users. Skipping company seeding.';
    END IF;
END $$;
