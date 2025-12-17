-- SQL Query to Track Qualification Completions
-- Run this in your Supabase SQL Editor to see all users who completed the qualification quiz

-- 1. Count total qualification completions
SELECT COUNT(*) as total_completions
FROM qualifications;

-- 2. List all users who completed qualification with their details
SELECT 
  u.id,
  u.email,
  u.full_name,
  q.completed_at,
  q.created_at
FROM qualifications q
JOIN users u ON q.user_id = u.id
ORDER BY q.completed_at DESC;

-- 3. Count completions by date
SELECT 
  DATE(q.completed_at) as completion_date,
  COUNT(*) as completions_count
FROM qualifications q
GROUP BY DATE(q.completed_at)
ORDER BY completion_date DESC;

-- 4. Recent completions (last 24 hours)
SELECT 
  u.email,
  u.full_name,
  q.completed_at
FROM qualifications q
JOIN users u ON q.user_id = u.id
WHERE q.completed_at >= NOW() - INTERVAL '24 hours'
ORDER BY q.completed_at DESC;

-- 5. Get qualification completion rate (users with qualification vs total users)
SELECT 
  (SELECT COUNT(DISTINCT user_id) FROM qualifications) as users_with_qualification,
  (SELECT COUNT(*) FROM users) as total_users,
  ROUND(
    (SELECT COUNT(DISTINCT user_id)::numeric FROM qualifications) / 
    NULLIF((SELECT COUNT(*)::numeric FROM users), 0) * 100, 
    2
  ) as completion_percentage;

-- 6. View qualification answers (optional - for analysis)
SELECT 
  u.email,
  q.question_1,
  q.question_2,
  q.question_3,
  q.question_4,
  q.question_5,
  q.completed_at
FROM qualifications q
JOIN users u ON q.user_id = u.id
ORDER BY q.completed_at DESC
LIMIT 100;

