# Ethical Participant Counting Policy ✅

## Our Ethical Approach

We count someone as a **"participant"** only if they meet **both** criteria:

1. ✅ **Completed ALL 5 questions** (answered every question)
2. ✅ **Passed the qualification** (got 3+ correct answers out of 5)

## Why This is Ethical

### What We DON'T Count:
- ❌ People who just start the form (1-4 questions) - that's just browsing
- ❌ People who complete but fail (0-2 correct) - they haven't demonstrated understanding

### What We DO Count:
- ✅ People who complete ALL 5 questions AND pass (3+ correct)
- ✅ This shows genuine intent AND understanding
- ✅ They've met the qualification requirement to proceed

## Implementation

### In Code:
- `qualification_completed = 'true'` is ONLY set if `passed = true`
- Failed attempts are tracked for analytics but NOT counted as participants
- The messaging is clear: **"Once you pass, you're a participant"**

### In Database:
- Use `get-participant-count.sql` to get accurate counts
- Only count rows where `passed = true` (for anonymous_qualifications)
- For logged-in users, count only those who completed all 5 questions

## Transparency

- We're upfront: "Once you pass, you're a participant"
- We track all attempts for analytics (honest metrics)
- We only count passed completions as participants (ethical counting)

This ensures we're being honest and ethical while still tracking engagement properly!

