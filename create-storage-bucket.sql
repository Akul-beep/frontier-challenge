-- Create the submissions storage bucket
-- Run this in your Supabase SQL Editor

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('submissions', 'submissions', false)
ON CONFLICT (id) DO NOTHING;

-- Verify the bucket was created
SELECT * FROM storage.buckets WHERE id = 'submissions';

