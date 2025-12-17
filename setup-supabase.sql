-- Global Ideas Challenge - Supabase Database Setup
-- Copy and paste this entire file into Supabase SQL Editor and run it

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Qualifications table
CREATE TABLE IF NOT EXISTS public.qualifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_1 TEXT NOT NULL,
  question_2 TEXT NOT NULL,
  question_3 TEXT NOT NULL,
  question_4 TEXT NOT NULL,
  question_5 TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  qualification_id UUID REFERENCES public.qualifications(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  track TEXT NOT NULL,
  division TEXT NOT NULL,
  document_url TEXT,
  video_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed')),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ambassadors table
CREATE TABLE IF NOT EXISTS public.ambassadors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school TEXT NOT NULL,
  year TEXT NOT NULL,
  motivation TEXT NOT NULL,
  previous_experience TEXT NOT NULL,
  outreach_plan TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_qualifications_user_id ON public.qualifications(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_ambassadors_user_id ON public.ambassadors(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_ambassadors_status ON public.ambassadors(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_submissions_updated_at ON public.submissions;
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ambassadors_updated_at ON public.ambassadors;
CREATE TRIGGER update_ambassadors_updated_at BEFORE UPDATE ON public.ambassadors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassadors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow re-running this script)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view their own qualifications" ON public.qualifications;
DROP POLICY IF EXISTS "Users can insert their own qualifications" ON public.qualifications;
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can insert their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can view their own ambassador applications" ON public.ambassadors;
DROP POLICY IF EXISTS "Users can insert their own ambassador applications" ON public.ambassadors;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Qualifications policies
CREATE POLICY "Users can view their own qualifications"
  ON public.qualifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own qualifications"
  ON public.qualifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Submissions policies
CREATE POLICY "Users can view their own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = user_id);

-- Ambassadors policies
CREATE POLICY "Users can view their own ambassador applications"
  ON public.ambassadors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ambassador applications"
  ON public.ambassadors FOR INSERT
  WITH CHECK (auth.uid() = user_id);
