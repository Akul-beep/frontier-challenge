# 🚨 BUCKET NOT FOUND - Final Fix Guide

You're still seeing the error because the bucket needs to be created via the **Dashboard**, not just SQL.

## ✅ STEP-BY-STEP FIX (Do This Now):

### Step 1: Create Bucket via Dashboard

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**
3. Click **"Storage"** in the left sidebar
4. Look at the top - do you see a bucket named `submissions`?
   - **If YES** → Skip to Step 2
   - **If NO** → Continue:
5. Click **"New bucket"** button (top right, blue button)
6. Fill in:
   - **Name**: `submissions` (must be exactly this, lowercase)
   - **Public bucket**: **UNCHECKED** (leave it private/false)
7. Click **"Create bucket"**

### Step 2: Verify Bucket Exists

After creating, you should see `submissions` in your Storage buckets list.

Verify in SQL Editor:
```sql
SELECT * FROM storage.buckets WHERE id = 'submissions';
```

If you see a row, the bucket exists! ✅

### Step 3: Set Up Policies

Now run the policies (run ALL the SQL from `setup-storage-policies.sql`):

1. Go to **SQL Editor**
2. Copy **ALL** the SQL from `setup-storage-policies.sql`
3. Paste and run it
4. Should say "Success"

### Step 4: Test

Try uploading a file through your submission form - the error should be gone!

---

## 🔍 Why SQL Alone Didn't Work

The `INSERT INTO storage.buckets` SQL sometimes doesn't work because Supabase Storage has special requirements. **Creating via Dashboard is more reliable.**

## 🆘 If Still Not Working

If you still see the error after creating via Dashboard:

1. **Check bucket name is exactly `submissions`** (lowercase, no spaces)
2. **Try making it public temporarily** to test:
   ```sql
   UPDATE storage.buckets SET public = true WHERE id = 'submissions';
   ```
   Then test. If it works, change it back:
   ```sql
   UPDATE storage.buckets SET public = false WHERE id = 'submissions';
   ```

3. **Alternative**: Users can use Google Drive links - those work without the bucket!

---

**The key is creating it via Dashboard first, then running the policies!** ✅

