-- Add grade column to submissions table
-- Run this in Supabase SQL Editor

-- Add grade column
ALTER TABLE public.submissions 
ADD COLUMN IF NOT EXISTS grade TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN public.submissions.grade IS 'Current grade level (6-12) used to determine division';

-- Create index for faster grade-based queries
CREATE INDEX IF NOT EXISTS idx_submissions_grade ON public.submissions(grade);

-- Update RLS policies (they should already allow INSERT/UPDATE, but verify)
-- No changes needed to RLS as grade is just another field in the submission

