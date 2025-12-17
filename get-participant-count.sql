-- Get accurate participant count (ETHICAL COUNTING)
-- This query counts only people who:
-- 1. Completed ALL 5 questions
-- 2. Passed (got 3+ correct answers, i.e., passed = true)

-- For logged-in users (from qualifications table)
SELECT COUNT(*) as logged_in_participants
FROM qualifications
WHERE 
  question_1 IS NOT NULL AND question_1 != ''
  AND question_2 IS NOT NULL AND question_2 != ''
  AND question_3 IS NOT NULL AND question_3 != ''
  AND question_4 IS NOT NULL AND question_4 != ''
  AND question_5 IS NOT NULL AND question_5 != '';

-- For anonymous users (from anonymous_qualifications table)
-- NOTE: This table has a 'passed' field that we should use
SELECT COUNT(*) as anonymous_participants
FROM anonymous_qualifications
WHERE passed = true;

-- Combined total (ethical participant count)
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

-- Alternative: Count all attempts vs passed attempts (for transparency)
SELECT 
  COUNT(*) FILTER (WHERE passed = true) as participants_passed,
  COUNT(*) FILTER (WHERE passed = false) as attempts_failed,
  COUNT(*) as total_attempts
FROM anonymous_qualifications;

