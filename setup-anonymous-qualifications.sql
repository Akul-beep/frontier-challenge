-- Create table to track anonymous qualification completions
-- This tracks completions even if users don't sign up

CREATE TABLE IF NOT EXISTS anonymous_qualifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qualification_identifier TEXT UNIQUE NOT NULL,
  question_1 TEXT,
  question_2 TEXT,
  question_3 TEXT,
  question_4 TEXT,
  question_5 TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_identifier ON anonymous_qualifications(qualification_identifier);
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_completed_at ON anonymous_qualifications(completed_at);

-- Enable RLS (Row Level Security)
ALTER TABLE anonymous_qualifications ENABLE ROW LEVEL SECURITY;

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

-- View to see all qualification completions (both logged-in and anonymous)
CREATE OR REPLACE VIEW all_qualification_completions AS
SELECT 
  'logged_in' as type,
  id::text as identifier,
  user_id::text as user_identifier,
  NULL::text as anonymous_identifier,
  completed_at,
  created_at
FROM qualifications
UNION ALL
SELECT 
  'anonymous' as type,
  id::text as identifier,
  NULL::text as user_identifier,
  qualification_identifier as anonymous_identifier,
  completed_at,
  created_at
FROM anonymous_qualifications;

