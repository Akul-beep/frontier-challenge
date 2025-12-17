-- Add country column to submissions table if it doesn't exist
-- Run this in Supabase SQL Editor

-- Add country column
ALTER TABLE public.submissions 
ADD COLUMN IF NOT EXISTS country TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN public.submissions.country IS 'Country of the participant for National Recognition Awards';

-- Create index for faster country-based queries
CREATE INDEX IF NOT EXISTS idx_submissions_country ON public.submissions(country);

-- Update RLS policies (they should already allow INSERT/UPDATE, but verify)
-- No changes needed to RLS as country is just another field in the submission

