-- Complete schema migration that includes all tables
-- This script can be run independently and will create all necessary tables

-- 1. Create Profiles Table (if it doesn't exist)
create table if not exists public.profiles (
  id uuid not null primary key,
  full_name text,
  avatar_url text,
  title text,
  company text,
  verified boolean default false,
  constraint profiles_id_fkey foreign key(id) references auth.users(id) on delete cascade
);

-- 2. Create Posts Table (if it doesn't exist)
create table if not exists public.posts (
  id bigint generated by default as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_premium boolean default false,
  price numeric(10, 2),
  metrics jsonb,
  attachment jsonb,
  job_posting jsonb,
  company_id uuid -- We'll add the foreign key constraint after creating companies table
);

-- 3. Create Companies Table
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

-- 4. Add foreign key constraint to posts table for company_id
DO $$
BEGIN
    -- Check if the constraint doesn't already exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'posts_company_id_fkey'
        AND table_name = 'posts'
    ) THEN
        ALTER TABLE public.posts
        ADD CONSTRAINT posts_company_id_fkey
        FOREIGN KEY (company_id) REFERENCES public.companies(id);
    END IF;
END $$;

-- 5. Create Company Metrics Table
create table if not exists public.company_metrics (
  id uuid default gen_random_uuid() primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  metric_name text not null,
  metric_value text not null,
  metric_change text,
  is_visible boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Create Company Employees Table
create table if not exists public.company_employees (
  id uuid default gen_random_uuid() primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  is_founder boolean default false,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(company_id, user_id)
);

-- 7. Create Company Followers Table
create table if not exists public.company_followers (
  id uuid default gen_random_uuid() primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  followed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(company_id, user_id)
);

-- 8. Create Company Customers Table (for "Trusted By" section)
create table if not exists public.company_customers (
  id uuid default gen_random_uuid() primary key,
  company_id uuid not null references public.companies(id) on delete cascade,
  customer_name text not null,
  customer_logo_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.companies enable row level security;
alter table public.company_metrics enable row level security;
alter table public.company_employees enable row level security;
alter table public.company_followers enable row level security;
alter table public.company_customers enable row level security;

-- 10. Create Policies

-- Policies for Profiles
DO $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;

    -- Create new policies
    CREATE POLICY "Public profiles are viewable by everyone."
      ON public.profiles FOR SELECT
      USING ( true );

    CREATE POLICY "Users can insert their own profile."
      ON public.profiles FOR INSERT
      WITH CHECK ( auth.uid() = id );

    CREATE POLICY "Users can update their own profile."
      ON public.profiles FOR UPDATE
      USING ( auth.uid() = id );
END $$;

-- Policies for Posts
DO $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Posts are viewable by everyone." ON public.posts;
    DROP POLICY IF EXISTS "Users can insert their own posts." ON public.posts;
    DROP POLICY IF EXISTS "Users can update their own posts." ON public.posts;
    DROP POLICY IF EXISTS "Users can delete their own posts." ON public.posts;

    -- Create new policies
    CREATE POLICY "Posts are viewable by everyone."
      ON public.posts FOR SELECT
      USING ( true );

    CREATE POLICY "Users can insert their own posts."
      ON public.posts FOR INSERT
      WITH CHECK ( auth.uid() = user_id );

    CREATE POLICY "Users can update their own posts."
      ON public.posts FOR UPDATE
      USING ( auth.uid() = user_id );

    CREATE POLICY "Users can delete their own posts."
      ON public.posts FOR DELETE
      USING ( auth.uid() = user_id );
END $$;

-- Policies for Companies
CREATE POLICY "Companies are viewable by everyone."
  ON public.companies FOR SELECT
  USING ( true );

CREATE POLICY "Company employees can update their company."
  ON public.companies FOR UPDATE
  USING (
    exists (
      select 1 from public.company_employees
      where company_id = id and user_id = auth.uid()
    )
  );

-- Policies for Company Metrics
CREATE POLICY "Company metrics are viewable by everyone."
  ON public.company_metrics FOR SELECT
  USING ( true );

CREATE POLICY "Company employees can manage metrics."
  ON public.company_metrics FOR ALL
  USING (
    exists (
      select 1 from public.company_employees
      where company_id = company_metrics.company_id and user_id = auth.uid()
    )
  );

-- Policies for Company Employees
CREATE POLICY "Company employees are viewable by everyone."
  ON public.company_employees FOR SELECT
  USING ( true );

-- Policies for Company Followers
CREATE POLICY "Company followers are viewable by everyone."
  ON public.company_followers FOR SELECT
  USING ( true );

CREATE POLICY "Users can follow/unfollow companies."
  ON public.company_followers FOR ALL
  USING ( auth.uid() = user_id );

-- Policies for Company Customers
CREATE POLICY "Company customers are viewable by everyone."
  ON public.company_customers FOR SELECT
  USING ( true );

-- 11. Seed Data
DO $$
DECLARE
    resend_company_id uuid;
    seed_user_id uuid;
BEGIN
    -- Find an existing user to attribute the seed data to.
    -- IMPORTANT: You must have at least one user signed up in your Supabase project
    -- (e.g., via the /auth/register page or Supabase UI) for this seeding to work.
    SELECT id INTO seed_user_id FROM auth.users LIMIT 1;

    -- Only proceed with seeding if a user is found.
    IF seed_user_id IS NOT NULL THEN
        -- Create or update the main profile for the existing user
        INSERT INTO public.profiles (id, full_name, avatar_url, title, company, verified)
        VALUES (seed_user_id, 'Sarah Chen', '/placeholder.svg?height=40&width=40', 'Founder & CEO', 'TechFlow', true)
        ON CONFLICT (id) DO UPDATE SET
            full_name = EXCLUDED.full_name,
            avatar_url = EXCLUDED.avatar_url,
            title = EXCLUDED.title,
            company = EXCLUDED.company,
            verified = EXCLUDED.verified;

        -- Create Resend company (if it doesn't exist, or update if it does)
        INSERT INTO public.companies (
            name, description, website, location, founded_year, employee_count,
            logo_url, cover_url, verified, valuation, total_raised, funding_status
        ) VALUES (
            'Resend', 'The email API for developers.', 'resend.com',
            'San Francisco, CA', 2023, '50+', '/resend-logo-new.jpeg', '/resend-cover.png',
            true, 100000000, 15000000, 'Series A'
        )
        ON CONFLICT (name) DO UPDATE SET
            description = EXCLUDED.description,
            website = EXCLUDED.website,
            location = EXCLUDED.location,
            founded_year = EXCLUDED.founded_year,
            employee_count = EXCLUDED.employee_count,
            logo_url = EXCLUDED.logo_url,
            cover_url = EXCLUDED.cover_url,
            verified = EXCLUDED.verified,
            valuation = EXCLUDED.valuation,
            total_raised = EXCLUDED.total_raised,
            funding_status = EXCLUDED.funding_status
        RETURNING id INTO resend_company_id;

        -- Add the existing user as an employee of Resend
        INSERT INTO public.company_employees (company_id, user_id, title, is_founder)
        VALUES (resend_company_id, seed_user_id, 'CEO', true)
        ON CONFLICT (company_id, user_id) DO UPDATE SET
            title = EXCLUDED.title,
            is_founder = EXCLUDED.is_founder;

        -- Add company metrics
        INSERT INTO public.company_metrics (company_id, metric_name, metric_value, metric_change, is_visible) VALUES
            (resend_company_id, 'Emails Sent (Last 30d)', '1.2B', '+15%', true),
            (resend_company_id, 'API Uptime', '99.99%', 'SLA', true),
            (resend_company_id, 'Developer Signups', '150,000+', '+5K this week', true),
            (resend_company_id, 'Customer Satisfaction', '98%', 'Excellent', false)
        ON CONFLICT (company_id, metric_name) DO UPDATE SET
            metric_value = EXCLUDED.metric_value,
            metric_change = EXCLUDED.metric_change,
            is_visible = EXCLUDED.is_visible;

        -- Add company followers (using the main seed user)
        INSERT INTO public.company_followers (company_id, user_id)
        VALUES (resend_company_id, seed_user_id)
        ON CONFLICT (company_id, user_id) DO NOTHING;

        -- Add trusted customers
        INSERT INTO public.company_customers (company_id, customer_name, customer_logo_url, display_order) VALUES
            (resend_company_id, 'Vercel', '/customer-logos/vercel.svg', 1),
            (resend_company_id, 'Notion', '/customer-logos/notion.svg', 2),
            (resend_company_id, 'LottieFiles', '/customer-logos/lottiefiles.svg', 3),
            (resend_company_id, 'Retool', '/customer-logos/retool.svg', 4)
        ON CONFLICT (company_id, customer_name) DO UPDATE SET
            customer_logo_url = EXCLUDED.customer_logo_url,
            display_order = EXCLUDED.display_order;

        -- Clean up existing seed posts to avoid duplicates
        DELETE FROM public.posts WHERE user_id = seed_user_id AND (
            content LIKE '🚀 Milestone Alert!%' OR
            content LIKE 'The hardest part about fundraising%' OR
            content LIKE 'We''re hiring!%'
        );

        -- Add sample posts
        INSERT INTO public.posts (user_id, content, is_premium, price, metrics, attachment, job_posting, company_id)
        VALUES
            (
                seed_user_id,
                '🚀 Milestone Alert! We just hit $50K MRR after 8 months of building in public. Here''s what we learned about product-led growth and why we''re doubling down on our community strategy. #BuildInPublic',
                false,
                null,
                '{"mrr": "$50,000", "growth": "+25%"}',
                null,
                null,
                resend_company_id
            ),
            (
                seed_user_id,
                'The hardest part about fundraising isn''t the pitch deck - it''s maintaining team morale during the process. Here''s how we kept our team motivated during our Series A... This is premium content that reveals our internal strategies.',
                true,
                5.00,
                null,
                '{"type": "pdf", "title": "Series A Fundraising Playbook", "gated": true}',
                null,
                resend_company_id
            ),
            (
                seed_user_id,
                'We''re hiring! Looking for a Senior Full-Stack Developer to join our mission of making sustainability accessible to everyone. Remote-first, competitive equity package 🌱 #Hiring #Jobs',
                false,
                null,
                null,
                null,
                '{"title": "Senior Full-Stack Developer", "location": "Remote", "type": "Full-time"}',
                resend_company_id
            );

        RAISE NOTICE 'Successfully seeded complete schema with Resend company data. Company ID: %', resend_company_id;
    ELSE
        RAISE NOTICE 'No users found in auth.users. Skipping company seeding. Please sign up a user first via the /auth/register page or Supabase UI.';
    END IF;
END $$;
