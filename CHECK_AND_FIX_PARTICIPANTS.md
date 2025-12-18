# 🔧 Fix: Participant Counting Not Working

## Issue
You completed a qualification but don't see it in Supabase. This means the `anonymous_qualifications` table either doesn't exist or isn't receiving data.

---

## ✅ Step 1: Check if Table Exists

Run this in **Supabase SQL Editor**:

```sql
-- Check if anonymous_qualifications table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'anonymous_qualifications'
);
```

**Result:**
- `true` = Table exists → Go to Step 3
- `false` = Table doesn't exist → Go to Step 2

---

## ✅ Step 2: Create the Table (If It Doesn't Exist)

Run this **entire script** in **Supabase SQL Editor**:

```sql
-- Complete script: Create anonymous_qualifications table WITH score tracking
-- Run this entire script in Supabase SQL Editor

-- Step 1: Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS anonymous_qualifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qualification_identifier TEXT UNIQUE NOT NULL,
  question_1 TEXT,
  question_2 TEXT,
  question_3 TEXT,
  question_4 TEXT,
  question_5 TEXT,
  score INTEGER,
  passed BOOLEAN,
  total_questions INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_identifier ON anonymous_qualifications(qualification_identifier);
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_completed_at ON anonymous_qualifications(completed_at);
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_score ON anonymous_qualifications(score);
CREATE INDEX IF NOT EXISTS idx_anonymous_qualifications_passed ON anonymous_qualifications(passed);

-- Step 3: Enable RLS (Row Level Security)
ALTER TABLE anonymous_qualifications ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous qualification insert" ON anonymous_qualifications;
DROP POLICY IF EXISTS "Allow read anonymous qualifications" ON anonymous_qualifications;

-- Step 5: Create policies
-- Policy: Allow anyone to insert (for tracking completions)
CREATE POLICY "Allow anonymous qualification insert"
ON anonymous_qualifications
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow reading all (for admin viewing)
CREATE POLICY "Allow read anonymous qualifications"
ON anonymous_qualifications
FOR SELECT
TO public
USING (true);

-- Verify the table was created
SELECT * FROM anonymous_qualifications LIMIT 1;
```

---

## ✅ Step 3: Check All Participant Data

After creating the table (or if it already existed), run these queries to see your data:

### 3.1 See ALL Qualification Attempts

```sql
-- See all anonymous qualification attempts (including failed ones)
SELECT 
  id,
  score,
  passed,
  completed_at
FROM anonymous_qualifications
ORDER BY completed_at DESC;
```

### 3.2 See Only PASSED Qualifications (Real Participants)

```sql
-- Only participants who passed (3+ correct)
SELECT 
  id,
  score,
  passed,
  completed_at
FROM anonymous_qualifications
WHERE passed = true
ORDER BY completed_at DESC;
```

### 3.3 Get Participant Count

```sql
-- Total participant count (ethical - only who passed)
SELECT 
  (SELECT COUNT(*) 
   FROM qualifications 
   WHERE question_1 IS NOT NULL AND question_1 != ''
     AND question_2 IS NOT NULL AND question_2 != ''
     AND question_3 IS NOT NULL AND question_3 != ''
     AND question_4 IS NOT NULL AND question_4 != ''
     AND question_5 IS NOT NULL AND question_5 != ''
  ) as logged_in_participants,
  (SELECT COUNT(*) 
   FROM anonymous_qualifications 
   WHERE passed = true
  ) as anonymous_participants,
  (SELECT COUNT(*) 
   FROM qualifications 
   WHERE question_1 IS NOT NULL AND question_1 != ''
     AND question_2 IS NOT NULL AND question_2 != ''
     AND question_3 IS NOT NULL AND question_3 != ''
     AND question_4 IS NOT NULL AND question_4 != ''
     AND question_5 IS NOT NULL AND question_5 != ''
  ) +
  (SELECT COUNT(*) 
   FROM anonymous_qualifications 
   WHERE passed = true
  ) as total_participants;
```

### 3.4 Analytics: Pass Rate

```sql
-- Get pass rate and attempt statistics
SELECT 
  COUNT(*) FILTER (WHERE passed = true) as participants_passed,
  COUNT(*) FILTER (WHERE passed = false) as attempts_failed,
  COUNT(*) as total_attempts,
  ROUND(100.0 * COUNT(*) FILTER (WHERE passed = true) / COUNT(*), 2) as pass_rate_percent
FROM anonymous_qualifications;
```

---

## ✅ Step 4: Test Again

After creating the table:
1. Go to your website homepage
2. Complete the qualification round (answer all 5 questions)
3. Get at least 3 correct to pass
4. Check Supabase again using queries from Step 3

Your participation should now be tracked!

---

## 🔍 Troubleshooting

### If you still don't see data:

1. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for errors when completing qualification

2. **Check Network Tab:**
   - Open Developer Tools → Network tab
   - Complete qualification
   - Look for `/api/track-qualification` request
   - Check if it returns 200 OK or an error

3. **Check Environment Variables:**
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` is set in `.env.local`
   - Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in `.env.local`

4. **Restart Dev Server:**
   ```bash
   npm run dev
   ```

---

## 📊 Quick Access Commands

### See Today's Participants
```sql
SELECT COUNT(*) as participants_today
FROM anonymous_qualifications
WHERE passed = true 
  AND completed_at >= CURRENT_DATE;
```

### See All Participants This Week
```sql
SELECT COUNT(*) as participants_this_week
FROM anonymous_qualifications
WHERE passed = true 
  AND completed_at >= date_trunc('week', CURRENT_TIMESTAMP);
```

---

## ✅ Summary

**Problem:** Qualification completions weren't being saved to Supabase  
**Cause:** `anonymous_qualifications` table likely doesn't exist  
**Solution:** Run the SQL script in Step 2 to create the table

After this, all future qualification attempts will be tracked properly!

