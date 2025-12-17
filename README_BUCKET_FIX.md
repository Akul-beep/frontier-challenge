# ⚠️ BUCKET NOT FOUND - FIX THIS NOW

You're seeing this error because the storage bucket doesn't exist yet.

## ✅ FIX IN 2 STEPS:

### Step 1: Create the Bucket

**Option A - Dashboard (Easiest):**
1. Supabase Dashboard → **Storage** → **New bucket**
2. Name: `submissions`
3. Public: **No** (unchecked)
4. Create

**Option B - SQL:**
Run this in SQL Editor:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('submissions', 'submissions', false)
ON CONFLICT (id) DO NOTHING;
```

### Step 2: Add Policies

Run ALL SQL from `setup-storage-policies.sql` in SQL Editor.

---

**That's it! The error will be gone.** 🎉

