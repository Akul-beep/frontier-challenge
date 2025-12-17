-- Storage Policies for submissions bucket
-- Run this AFTER creating the 'submissions' bucket in Storage
-- This script handles existing policies gracefully

-- Policy 1: Allow users to upload to their own folder
DROP POLICY IF EXISTS "Users can upload their own submissions" ON storage.objects;
CREATE POLICY "Users can upload their own submissions"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'submissions' AND 
  (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy 2: Allow users to view their own submissions
DROP POLICY IF EXISTS "Users can view their own submissions" ON storage.objects;
CREATE POLICY "Users can view their own submissions"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'submissions' AND 
  (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy 3: Allow users to update their own submissions (optional, for replacing files)
DROP POLICY IF EXISTS "Users can update their own submissions" ON storage.objects;
CREATE POLICY "Users can update their own submissions"
ON storage.objects
FOR UPDATE
TO public
USING (
  bucket_id = 'submissions' AND 
  (auth.uid())::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'submissions' AND 
  (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy 4: Allow users to delete their own submissions (optional)
DROP POLICY IF EXISTS "Users can delete their own submissions" ON storage.objects;
CREATE POLICY "Users can delete their own submissions"
ON storage.objects
FOR DELETE
TO public
USING (
  bucket_id = 'submissions' AND 
  (auth.uid())::text = (storage.foldername(name))[1]
);

