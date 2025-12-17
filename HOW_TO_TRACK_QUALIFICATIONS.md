# 📊 How to Track Qualification Completions

## Quick Answer
Run the SQL queries in the `track-qualifications.sql` file in your **Supabase SQL Editor**.

## Step-by-Step Guide

### 1. Open Supabase Dashboard
- Go to your Supabase project dashboard
- Navigate to **SQL Editor** in the left sidebar

### 2. Run the Tracking Queries
- Open the file `track-qualifications.sql` in this project
- Copy any of the queries you want to use
- Paste into the SQL Editor
- Click "Run" or press Cmd/Ctrl + Enter

## Available Queries

### Total Completions
Get a simple count of all qualification completions:
```sql
SELECT COUNT(*) as total_completions
FROM qualifications;
```

### List All Completions
See all users who completed qualification with their details:
```sql
SELECT 
  u.id,
  u.email,
  u.full_name,
  q.completed_at,
  q.created_at
FROM qualifications q
JOIN users u ON q.user_id = u.id
ORDER BY q.completed_at DESC;
```

### Daily Completion Stats
Track completions by date:
```sql
SELECT 
  DATE(q.completed_at) as completion_date,
  COUNT(*) as completions_count
FROM qualifications q
GROUP BY DATE(q.completed_at)
ORDER BY completion_date DESC;
```

### Recent Completions (Last 24 Hours)
```sql
SELECT 
  u.email,
  u.full_name,
  q.completed_at
FROM qualifications q
JOIN users u ON q.user_id = u.id
WHERE q.completed_at >= NOW() - INTERVAL '24 hours'
ORDER BY q.completed_at DESC;
```

### Completion Rate
See what percentage of users completed qualification:
```sql
SELECT 
  (SELECT COUNT(DISTINCT user_id) FROM qualifications) as users_with_qualification,
  (SELECT COUNT(*) FROM users) as total_users,
  ROUND(
    (SELECT COUNT(DISTINCT user_id)::numeric FROM qualifications) / 
    NULLIF((SELECT COUNT(*)::numeric FROM users), 0) * 100, 
    2
  ) as completion_percentage;
```

## Notes

- **All completions are tracked** - both from logged-in users (saved to database) and anonymous users (saved to localStorage)
- Logged-in users' completions are automatically saved to the `qualifications` table
- Anonymous completions are in localStorage - they'll sync to database when the user signs up
- The `completed_at` field shows when the qualification was completed

## Export Data

To export the data as CSV:
1. Run any query in SQL Editor
2. Click the download icon or "Export" button
3. Choose CSV format

