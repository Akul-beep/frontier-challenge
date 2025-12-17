-- Make submissions bucket public so files can be accessed via public URLs
-- Run this in Supabase SQL Editor

UPDATE storage.buckets 
SET public = true 
WHERE id = 'submissions';

-- Verify it's now public
SELECT id, name, public FROM storage.buckets WHERE id = 'submissions';

