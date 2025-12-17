# 🔧 Fix "Bucket not found" Error - Quick Fix!

## The Problem
You're seeing: `{"statusCode":"404","error":"Bucket not found","message":"Bucket not found"}`

This means the `submissions` storage bucket doesn't exist in your Supabase project yet.

## ✅ Solution - Create the Bucket Now!

### Method 1: Via Supabase Dashboard (Easiest) ⭐

1. **Open Supabase Dashboard**
   - Go to your project: https://supabase.com/dashboard
   - Select your project

2. **Go to Storage**
   - Click **"Storage"** in the left sidebar

3. **Create New Bucket**
   - Click **"New bucket"** button (top right)
   - **Name**: `submissions` (must be exactly this name)
   - **Public bucket**: **Unchecked** (leave it private)
   - Click **"Create bucket"**

4. **Set up Policies**
   - Go to **SQL Editor** in left sidebar
   - Copy and run all SQL from `setup-storage-policies.sql`
   - This allows users to upload their own files

### Method 2: Via SQL (Alternative)

1. **Open SQL Editor**
   - Go to Supabase Dashboard → **SQL Editor**

2. **Run this SQL:**
   ```sql
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('submissions', 'submissions', false)
   ON CONFLICT (id) DO NOTHING;
   ```

3. **Then run policies:**
   - Copy all SQL from `setup-storage-policies.sql`
   - Run it in SQL Editor

## ✅ Verify It Works

After creating the bucket, verify:
```sql
SELECT * FROM storage.buckets WHERE id = 'submissions';
```

You should see one row with the bucket info.

## 🔄 Test Upload

After creating the bucket and policies:
1. Try uploading a file through your submission form
2. The error should be gone!

## 🆘 Alternative: Use Google Drive Links

If you can't create the bucket right now, users can still submit using **Google Drive links** - that works without the bucket!

---

**That's it! Once you create the bucket, the error will be gone.** ✅

