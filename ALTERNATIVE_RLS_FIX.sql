-- ALTERNATIVE: If you want to keep RLS enabled, try this aggressive policy fix
-- Run this ONLY if disabling RLS didn't work or you want to keep RLS on

-- Step 1: Drop ALL policies completely
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'anonymous_qualifications')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON anonymous_qualifications', r.policyname);
    END LOOP;
END $$;

-- Step 2: Disable RLS temporarily
ALTER TABLE anonymous_qualifications DISABLE ROW LEVEL SECURITY;

-- Step 3: Re-enable RLS
ALTER TABLE anonymous_qualifications ENABLE ROW LEVEL SECURITY;

-- Step 4: Create the most permissive policies possible
CREATE POLICY "allow_all_inserts"
ON anonymous_qualifications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "allow_all_selects"
ON anonymous_qualifications
FOR SELECT
USING (true);

CREATE POLICY "allow_all_updates"
ON anonymous_qualifications
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Step 5: Verify policies
SELECT 
    tablename, 
    policyname, 
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'anonymous_qualifications';
