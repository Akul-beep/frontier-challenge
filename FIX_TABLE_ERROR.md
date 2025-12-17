# 🔧 Fix: "relation anonymous_qualifications does not exist"

## ✅ Quick Fix:

You need to **create the table first** before updating it!

Run this **complete script** instead:

**File: `create-and-update-anonymous-qualifications.sql`**

This script:
1. ✅ Creates the table (if it doesn't exist)
2. ✅ Adds score/passed columns
3. ✅ Creates indexes
4. ✅ Sets up RLS policies
5. ✅ Creates the view

---

## 📋 Steps:

1. **Open Supabase SQL Editor**
2. **Copy and paste** the entire contents of `create-and-update-anonymous-qualifications.sql`
3. **Run it**
4. **Done!** ✅

The table will be created with all the necessary columns including score tracking.

---

## 🎯 What This Script Does:

- Creates `anonymous_qualifications` table
- Adds: `score`, `passed`, `total_questions` columns
- Creates indexes for fast queries
- Sets up RLS policies (anyone can insert, anyone can read)
- Creates `all_qualification_completions` view

**Run this one script and you're all set!** 🚀

