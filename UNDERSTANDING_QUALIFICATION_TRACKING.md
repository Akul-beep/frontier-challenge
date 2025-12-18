# 📊 Understanding Qualification Tracking

## What is `qualification_identifier`?

The `qualification_identifier` is a **unique ID** assigned to each anonymous qualification attempt. It's used to:
1. Track qualification attempts in Supabase without requiring login
2. Prevent duplicate counting of the same participant
3. Link attempts if someone retakes the qualification

---

## How It Works Now (FIXED)

### Old System (Had Issues):
```javascript
// OLD - could cause collisions
const identifier = btoa(JSON.stringify(mappedAnswers) + Date.now()).substring(0, 32)
```

**Problem:**
- Only 32 characters long
- Based on answers + timestamp
- Truncation could cause collisions
- **Result:** Your second attempt could overwrite the first

### New System (Fixed):
```javascript
// NEW - truly unique
const randomComponent = crypto.randomUUID() || unique_random_string
const identifier = `anon_${Date.now()}_${randomComponent}`.substring(0, 64)
```

**Benefits:**
- Uses browser's crypto API for true randomness
- Up to 64 characters (much longer)
- Includes timestamp + UUID
- **Result:** Each attempt gets a unique identifier

---

## What This Means for You

### ✅ Multiple Attempts from Same Browser
- Each attempt is tracked separately
- You can retake the qualification
- All attempts are saved (not overwritten)

### ✅ Multiple Attempts from Different Browsers
- Each browser session gets its own unique ID
- No collision risk
- All attempts are tracked independently

### ✅ Participant Counting
Only attempts where `passed = true` (3+ correct) are counted as participants:

```sql
-- Count only participants (who passed)
SELECT COUNT(*) FROM anonymous_qualifications WHERE passed = true;

-- See all attempts (both passed and failed)
SELECT COUNT(*) FROM anonymous_qualifications;
```

---

## Database Structure

The `anonymous_qualifications` table stores:

| Field | Type | Description |
|-------|------|-------------|
| `qualification_identifier` | TEXT (UNIQUE) | Unique ID for this attempt |
| `question_1` to `question_5` | TEXT | User's answers |
| `score` | INTEGER | Number of correct answers (0-5) |
| `passed` | BOOLEAN | `true` if score >= 3 |
| `total_questions` | INTEGER | Always 5 |
| `completed_at` | TIMESTAMPTZ | When they completed it |

---

## Viewing Your Data

### See All Attempts
```sql
SELECT 
  qualification_identifier,
  score,
  passed,
  completed_at
FROM anonymous_qualifications
ORDER BY completed_at DESC;
```

### Count Participants
```sql
SELECT 
  COUNT(*) FILTER (WHERE passed = true) as participants,
  COUNT(*) FILTER (WHERE passed = false) as failed_attempts,
  COUNT(*) as total_attempts
FROM anonymous_qualifications;
```

### See Your Recent Attempts
```sql
SELECT 
  qualification_identifier,
  score,
  passed,
  completed_at
FROM anonymous_qualifications
WHERE completed_at >= NOW() - INTERVAL '24 hours'
ORDER BY completed_at DESC;
```

---

## Why Each Attempt is Tracked

**Benefits:**
1. **Analytics** - See how many people attempt vs pass
2. **Transparency** - All data is visible
3. **Fairness** - Only those who pass (3+) are counted as participants
4. **Retakes** - Users can try again if they don't pass

**Ethical Counting:**
- Failed attempts (< 3 correct) are NOT counted as participants
- Only passed attempts (3+ correct) count
- This ensures only qualified participants are counted

---

## Summary

- ✅ **Each attempt now gets a truly unique identifier**
- ✅ **No more overwriting of previous attempts**
- ✅ **All attempts are tracked (both passed and failed)**
- ✅ **Only passed attempts (3+) count as participants**
- ✅ **You can safely retake from any browser**

The identifier issue is now fixed with the latest deployment!
