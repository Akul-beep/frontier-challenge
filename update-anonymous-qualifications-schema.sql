-- Update anonymous_qualifications table to include score tracking
-- Run this in Supabase SQL Editor

-- Add score columns if they don't exist
ALTER TABLE anonymous_qualifications 
ADD COLUMN IF NOT EXISTS score INTEGER,
ADD COLUMN IF NOT EXISTS passed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS total_questions INTEGER DEFAULT 5;

-- Create index for faster queries on score and passed
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_score ON anonymous_qualifications(score);
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_passed ON anonymous_qualifications(passed);

-- Update the view to include score information
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

