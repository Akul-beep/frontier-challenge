# 🔧 Storage Bucket Setup - Fix "Bucket not found" Error

## Issue
When viewing submissions in Supabase, you see: `{"statusCode":"404","error":"Bucket not found","message":"Bucket not found"}`

## Solution

### Step 1: Create the Storage Bucket

1. **Option A: Via SQL (Recommended)**
   - Open Supabase Dashboard → **SQL Editor**
   - Run this query from `create-storage-bucket.sql`:
   ```sql
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('submissions', 'submissions', false)
   ON CONFLICT (id) DO NOTHING;
   ```

2. **Option B: Via Supabase Dashboard**
   - Go to **Storage** in left sidebar
   - Click **"New bucket"**
   - Name: `submissions`
   - Public: **Unchecked** (private)
   - Click **"Create bucket"**

### Step 2: Apply Storage Policies

After creating the bucket, run the policies from `setup-storage-policies.sql`:

1. Go to **SQL Editor**
2. Run all the CREATE POLICY statements from `setup-storage-policies.sql`
3. This allows users to upload their own files

### Step 3: Verify Setup

Check that the bucket exists:
```sql
SELECT * FROM storage.buckets WHERE id = 'submissions';
```

You should see one row with:
- `id`: submissions
- `name`: submissions
- `public`: false

## What This Does

- Creates a private storage bucket for submission files
- Users can upload PDFs to their own folder (`user_id/filename.pdf`)
- Users can only access their own files
- Files are stored securely in Supabase Storage

## Notes

- If users see "Bucket not found" error, they can still submit using **Google Drive links** as an alternative
- The code now handles this error gracefully and suggests using Drive links
- Users can update their submissions before the deadline

## Current Behavior

- **File Upload**: Uploads to `submissions/{user_id}/{timestamp}.pdf`
- **Google Drive**: Stores the Drive URL directly
- **Updates**: Users can update their submission (re-upload file or change Drive link)

