# 📊 How to View Qualification Completions in Supabase

## Tables to Check

### 1. **Logged-In Users Who Completed**
Table: `qualifications`

**View all:**
```sql
SELECT 
  u.email,
  u.full_name,
  q.completed_at,
  q.question_1,
  q.question_2,
  q.question_3,
  q.question_4,
  q.question_5
FROM qualifications q
JOIN users u ON q.user_id = u.id
ORDER BY q.completed_at DESC;
```

**Count:**
```sql
SELECT COUNT(*) as total_logged_in_completions
FROM qualifications;
```

### 2. **Anonymous Completions (Without Signup)**
Table: `anonymous_qualifications`

**View all:**
```sql
SELECT 
  qualification_identifier,
  completed_at,
  question_1,
  question_2,
  question_3,
  question_4,
  question_5
FROM anonymous_qualifications
ORDER BY completed_at DESC;
```

**Count:**
```sql
SELECT COUNT(*) as total_anonymous_completions
FROM anonymous_qualifications;
```

### 3. **View ALL Completions (Combined)**
Use the view: `all_qualification_completions`

**View all:**
```sql
SELECT * FROM all_qualification_completions
ORDER BY completed_at DESC;
```

**Total count:**
```sql
SELECT COUNT(*) as total_all_completions
FROM all_qualification_completions;
```

**Breakdown:**
```sql
SELECT 
  type,
  COUNT(*) as count
FROM all_qualification_completions
GROUP BY type;
```

## Setup

**First, create the anonymous_qualifications table:**
Run the SQL from `setup-anonymous-qualifications.sql` in your Supabase SQL Editor.

This creates:
- `anonymous_qualifications` table
- `all_qualification_completions` view (combines both)
- Proper indexes and policies

## Quick Stats Query

Get a complete overview:
```sql
SELECT 
  (SELECT COUNT(*) FROM qualifications) as logged_in_count,
  (SELECT COUNT(*) FROM anonymous_qualifications) as anonymous_count,
  (SELECT COUNT(*) FROM qualifications) + 
  (SELECT COUNT(*) FROM anonymous_qualifications) as total_count;
```

