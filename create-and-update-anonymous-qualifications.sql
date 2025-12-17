-- Complete script: Create anonymous_qualifications table WITH score tracking
-- Run this entire script in Supabase SQL Editor

-- Step 1: Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS anonymous_qualifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qualification_identifier TEXT UNIQUE NOT NULL,
  question_1 TEXT,
  question_2 TEXT,
  question_3 TEXT,
  question_4 TEXT,
  question_5 TEXT,
  score INTEGER,
  passed BOOLEAN DEFAULT false,
  total_questions INTEGER DEFAULT 5,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_identifier ON anonymous_qualifications(qualification_identifier);
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_completed_at ON anonymous_qualifications(completed_at);
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_score ON anonymous_qualifications(score);
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_passed ON anonymous_qualifications(passed);

-- Step 3: Enable RLS (Row Level Security)
ALTER TABLE anonymous_qualifications ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous qualification insert" ON anonymous_qualifications;
DROP POLICY IF EXISTS "Allow read anonymous qualifications" ON anonymous_qualifications;

-- Step 5: Create policies
-- Policy: Allow anyone to insert (for tracking completions)
CREATE POLICY "Allow anonymous qualification insert"
ON anonymous_qualifications
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow reading all (for admin viewing)
CREATE POLICY "Allow read anonymous qualifications"
ON anonymous_qualifications
FOR SELECT
TO public
USING (true);

-- Step 6: Create/update the view to see all qualification completions
CREATE OR REPLACE VIEW all_qualification_completions AS
SELECT
  'logged_in' as type,
  id::text as identifier,
  user_id::text as user_identifier,
  NULL::text as anonymous_identifier,
  NULL::integer as score,
  NULL::boolean as passed,
  NULL::integer as total_questions,
  completed_at,
  created_at
FROM qualifications
UNION ALL
SELECT
  'anonymous' as type,
  id::text as identifier,
  NULL::text as user_identifier,
  qualification_identifier as anonymous_identifier,
  score,
  passed,
  total_questions,
  completed_at,
  created_at
FROM anonymous_qualifications;

-- Verify the table was created
SELECT * FROM anonymous_qualifications LIMIT 1;

