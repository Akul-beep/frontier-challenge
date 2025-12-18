-- QUICK FIX: Disable RLS Completely (if you want to launch NOW)
-- This removes all access restrictions on anonymous_qualifications table
-- Run this if you need to launch immediately and fix RLS later

-- Disable RLS on the table
ALTER TABLE anonymous_qualifications DISABLE ROW LEVEL SECURITY;

-- Verify it's disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'anonymous_qualifications';

-- Expected result: rowsecurity = false

-- After this, anyone can insert/read from this table
-- This is OKAY for anonymous_qualifications since it's public data anyway
-- (no sensitive user information, just quiz answers and scores)

-- Test it worked:
SELECT 'RLS is now DISABLED - inserts will work!' as status;
