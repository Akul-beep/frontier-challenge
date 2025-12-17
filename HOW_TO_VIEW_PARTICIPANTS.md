# How to View Participants in Supabase 📊

## Quick Access: Where to See Participants

### Option 1: Supabase Dashboard (Easiest)

1. **Go to your Supabase Dashboard**
   - Visit [https://app.supabase.com](https://app.supabase.com)
   - Select your project

2. **View Tables Directly:**
   - Click **"Table Editor"** in the left sidebar
   - You'll see these tables:
     - `qualifications` - Logged-in users who completed qualification
     - `anonymous_qualifications` - Anonymous users (with `passed` field)
     - `submissions` - Users who submitted their 1-page idea

3. **For Anonymous Participants (Most Common):**
   - Open `anonymous_qualifications` table
   - Look at the `passed` column
   - **Participants = rows where `passed = true`**
   - You can filter by clicking the filter icon and setting `passed = true`

---

## Option 2: SQL Editor (Recommended for Accurate Counts)

1. **Go to SQL Editor** in Supabase Dashboard
2. **Run these queries:**

### Get Total Participant Count (Ethical Counting)

```sql
-- Combined total: Logged-in + Anonymous participants
SELECT 
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

### Break Down by Type

```sql
-- Logged-in participants
SELECT COUNT(*) as logged_in_participants
FROM qualifications
WHERE question_1 IS NOT NULL AND question_1 != ''
  AND question_2 IS NOT NULL AND question_2 != ''
  AND question_3 IS NOT NULL AND question_3 != ''
  AND question_4 IS NOT NULL AND question_4 != ''
  AND question_5 IS NOT NULL AND question_5 != '';

-- Anonymous participants (who passed)
SELECT COUNT(*) as anonymous_participants
FROM anonymous_qualifications
WHERE passed = true;
```

### See All Participants with Details

```sql
-- View all participants (passed qualifications)
SELECT 
  'logged_in' as type,
  id,
  user_id,
  completed_at,
  NULL as score,
  NULL as passed
FROM qualifications
WHERE question_1 IS NOT NULL AND question_1 != ''
  AND question_2 IS NOT NULL AND question_2 != ''
  AND question_3 IS NOT NULL AND question_3 != ''
  AND question_4 IS NOT NULL AND question_4 != ''
  AND question_5 IS NOT NULL AND question_5 != ''

UNION ALL

SELECT 
  'anonymous' as type,
  id,
  NULL as user_id,
  completed_at,
  score,
  passed
FROM anonymous_qualifications
WHERE passed = true

ORDER BY completed_at DESC;
```

### Get Analytics (Attempts vs Participants)

```sql
-- See how many attempted vs how many passed
SELECT 
  COUNT(*) FILTER (WHERE passed = true) as participants_passed,
  COUNT(*) FILTER (WHERE passed = false) as attempts_failed,
  COUNT(*) as total_attempts,
  ROUND(100.0 * COUNT(*) FILTER (WHERE passed = true) / COUNT(*), 2) as pass_rate_percent
FROM anonymous_qualifications;
```

---

## Option 3: Use the View (If Set Up)

If you've run `create-and-update-anonymous-qualifications.sql`, you have a view:

```sql
-- View all qualification completions (but filter for passed only)
SELECT * 
FROM all_qualification_completions
WHERE passed = true OR (type = 'logged_in' AND identifier IS NOT NULL)
ORDER BY completed_at DESC;
```

**Note:** This view includes all attempts. Filter by `passed = true` for participants only.

---

## Quick Reference

### Tables:
- **`qualifications`** - Logged-in users (all entries are participants if they have all 5 questions)
- **`anonymous_qualifications`** - Anonymous users (filter by `passed = true` for participants)
- **`submissions`** - Users who submitted their 1-page idea (subset of participants)

### Key Fields:
- `passed` (boolean) - `true` = participant, `false` = just attempted
- `score` (integer) - Number of correct answers (3+ = passed)
- `completed_at` (timestamp) - When they completed
- `qualification_identifier` - Unique ID for anonymous users

---

## Pro Tips 💡

1. **Export Data**: Click the "Export" button in Table Editor to download as CSV
2. **Create Saved Query**: Save the participant count query in SQL Editor for quick access
3. **Set Up Dashboard**: Create a custom dashboard with these queries pinned
4. **Monitor Growth**: Run the count query daily to track participant growth

---

## File Reference

- `get-participant-count.sql` - Contains all these queries
- `ETHICAL_PARTICIPANT_COUNTING.md` - Explains the counting policy

