# 🚀 Quick Setup Guide

Your Supabase URL is already configured! Just follow these 3 steps:

## Step 1: Get Your Anon Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/gpcsmvzlbztmtyhelucy
2. Click **Settings** → **API**
3. Copy the **anon public** key (under "Project API keys")
4. Open `.env.local` file in this project
5. Replace `YOUR_ANON_KEY_HERE` with your actual anon key

Your `.env.local` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://gpcsmvzlbztmtyhelucy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (your actual key)
```

## Step 2: Run Database Setup

1. Go to your Supabase dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Open the file `setup-supabase.sql` in this project
5. Copy ALL the SQL code from that file
6. Paste it into the SQL Editor
7. Click **Run** (or press Cmd/Ctrl + Enter)

✅ This creates all tables, indexes, and security policies!

## Step 3: Set Up Storage

1. In Supabase dashboard, click **Storage** in the left sidebar
2. Click **Create a new bucket**
3. Name it: `submissions`
4. Make it **Private** (NOT public)
5. Click **Create bucket**

Then create storage policies (EASIEST METHOD - Use SQL):

1. **Click "SQL Editor"** in Supabase dashboard
2. **Click "New query"**
3. **Open the file `setup-storage-policies.sql`** in this project
4. **Copy ALL the SQL** from that file
5. **Paste it into SQL Editor**
6. **Click "Run"**

✅ This creates all storage policies at once!

---

**Alternative UI Method** (if you prefer):
Make sure policies are created on **storage.objects**, NOT storage.buckets!

1. Click on the `submissions` bucket
2. Go to **Policies** tab
3. Click **New Policy** → **Create policy from scratch**
4. **IMPORTANT**: Select **"storage.objects"** as the target
5. For INSERT policy:
   - **Policy name**: Users can upload their own submissions
   - **Allowed operation**: INSERT
   - **Policy definition**:
   ```sql
   bucket_id = 'submissions' AND (auth.uid())::text = (storage.foldername(name))[1]
   ```
6. For SELECT policy:
   - **Policy name**: Users can view their own submissions
   - **Allowed operation**: SELECT
   - **Policy definition**: Same as above
3. Click **Review** → **Save policy**

## Step 4: Test It!

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/login
3. Create an account
4. Try the qualification form at /qualify
5. Submit an idea at /submit

## ✅ Done!

That's it! Your platform is now fully set up and ready to use.

---

**Troubleshooting:**
- If you get "Invalid API key", make sure `.env.local` has the correct anon key
- If tables don't exist, make sure you ran the SQL script
- Restart dev server after changing `.env.local`
