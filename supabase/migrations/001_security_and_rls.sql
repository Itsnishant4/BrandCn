-- Supabase Security Migration
-- Run this in Supabase SQL Editor to enable RLS and security policies

-- 1. Enable RLS on themes table
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;

-- 2. Create policies for public read access (everyone can view themes)
DROP POLICY IF EXISTS "Anyone can view themes" ON themes;
CREATE POLICY "Anyone can view themes" ON themes
    FOR SELECT USING (true);

-- 3. Create policy for authenticated admin users to insert/update/delete
-- This requires users to have a specific admin role claim
DROP POLICY IF EXISTS "Authenticated users can insert themes" ON themes;
CREATE POLICY "Authenticated users can insert themes" ON themes
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' 
        AND (auth.jwt() ->> 'is_admin')::boolean = true
    );

DROP POLICY IF EXISTS "Authenticated users can update themes" ON themes;
CREATE POLICY "Authenticated users can update themes" ON themes
    FOR UPDATE USING (
        auth.role() = 'authenticated' 
        AND (auth.jwt() ->> 'is_admin')::boolean = true
    );

DROP POLICY IF EXISTS "Authenticated users can delete themes" ON themes;
CREATE POLICY "Authenticated users can delete themes" ON themes
    FOR DELETE USING (
        auth.role() = 'authenticated' 
        AND (auth.jwt() ->> 'is_admin')::boolean = true
    );

-- 4. Create increment_copy_count function to fix race condition
-- This uses a database function to ensure atomic increment
DROP FUNCTION IF EXISTS increment_copy_count(uuid);
CREATE OR REPLACE FUNCTION increment_copy_count(theme_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE themes
    SET copy_count = copy_count + 1
    WHERE id = theme_id;
END;
$$;

-- 5. Create profiles table for user management
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 6. Add user_id column to themes for ownership tracking
ALTER TABLE themes ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_themes_user_id ON themes(user_id);
CREATE INDEX IF NOT EXISTS idx_themes_slug ON themes(slug);
CREATE INDEX IF NOT EXISTS idx_themes_category ON themes(category);

-- 7. Function to handle new user signup
DROP FUNCTION IF EXISTS handle_new_user();
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (new.id, new.email)
    ON CONFLICT (id) DO NOTHING;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
