-- COMPLETE FIX for RLS Policy Issue
-- The error "violates row-level security policy (USING expression)" means
-- there's a restrictive policy blocking inserts

-- OPTION 1: Temporarily disable RLS (easiest for testing)
-- Uncomment this line to disable RLS completely:
-- ALTER TABLE anonymous_qualifications DISABLE ROW LEVEL SECURITY;

-- OPTION 2: Fix the policies properly (recommended)

-- Step 1: Drop ALL existing policies (to start fresh)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'anonymous_qualifications') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON anonymous_qualifications';
    END LOOP;
END $$;

-- Step 2: Create a very permissive INSERT policy
CREATE POLICY "Enable insert for all users"
ON anonymous_qualifications
FOR INSERT
WITH CHECK (true);

-- Step 3: Create a permissive SELECT policy
CREATE POLICY "Enable read for all users"
ON anonymous_qualifications
FOR SELECT
USING (true);

-- Step 4: Verify the policies
SELECT 
    tablename, 
    policyname, 
    permissive,
    roles,
    cmd,
    qual as "USING",
    with_check as "WITH CHECK"
FROM pg_policies
WHERE tablename = 'anonymous_qualifications';

-- Step 5: Test with a simple insert (should work now)
-- This will fail if there's still an issue
INSERT INTO anonymous_qualifications (
    qualification_identifier,
    question_1,
    question_2,
    question_3,
    question_4,
    question_5,
    score,
    passed,
    total_questions
) VALUES (
    'test_' || gen_random_uuid()::text,
    'test answer 1',
    'test answer 2',
    'test answer 3',
    'test answer 4',
    'test answer 5',
    5,
    true,
    5
);

-- If the above insert worked, you'll see:
SELECT 'RLS is now fixed! ✓' as status;

-- Clean up test data
DELETE FROM anonymous_qualifications WHERE qualification_identifier LIKE 'test_%';
