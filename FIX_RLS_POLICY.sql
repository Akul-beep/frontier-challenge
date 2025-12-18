-- Fix RLS Policy for anonymous_qualifications table
-- This is blocking inserts - let's fix it!

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "Allow anonymous qualification insert" ON anonymous_qualifications;
DROP POLICY IF EXISTS "Allow read anonymous qualifications" ON anonymous_qualifications;

-- Step 2: Create proper INSERT policy (allow anyone to insert)
CREATE POLICY "Allow anonymous qualification insert"
ON anonymous_qualifications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Step 3: Create proper SELECT policy (allow anyone to read)
CREATE POLICY "Allow read anonymous qualifications"
ON anonymous_qualifications
FOR SELECT
TO anon, authenticated
USING (true);

-- Step 4: Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'anonymous_qualifications';
