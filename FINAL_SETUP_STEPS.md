# ✅ Almost There! Final Setup Steps

Your Supabase URL and anon key are now configured! 🎉

## Just 2 More Steps:

### Step 1: Run Database Setup SQL (2 minutes)

1. **Go to your Supabase dashboard**: https://supabase.com/dashboard/project/gpcsmvzlbztmtyhelucy
2. **Click "SQL Editor"** in the left sidebar
3. **Click "New query"**
4. **Open the file `setup-supabase.sql`** in this project
5. **Copy ALL the SQL code** from that file
6. **Paste it into the SQL Editor**
7. **Click "Run"** (or press Cmd/Ctrl + Enter)

✅ This creates:
- All database tables (users, qualifications, submissions, ambassadors)
- Indexes for performance
- Row Level Security (RLS) policies
- Triggers for auto-updating timestamps

### Step 2: Create Storage Bucket (2 minutes)

1. **In Supabase dashboard, click "Storage"** in the left sidebar
2. **Click "Create a new bucket"**
3. **Name it**: `submissions`
4. **Make it Private** (NOT public - uncheck the public option)
5. **Click "Create bucket"**

Then add these 2 policies:

#### Option A: Use SQL (Recommended - Faster!)
1. **Click "SQL Editor"** in Supabase dashboard
2. **Click "New query"**
3. **Open the file `setup-storage-policies.sql`** in this project
4. **Copy ALL the SQL** from that file
5. **Paste it into SQL Editor**
6. **Click "Run"**

✅ This creates all 4 policies at once (upload, view, update, delete)

#### Option B: Use the UI (Alternative)
If you prefer the UI method, make sure to select **"storage.objects"** as the target, NOT "storage.buckets":

1. Click on the `submissions` bucket
2. Go to **"Policies"** tab
3. Click **"New Policy"** → **"Create policy from scratch"**
4. **IMPORTANT**: Make sure the policy is on **"storage.objects"**, NOT "storage.buckets"
5. Fill in:
   - **Policy name**: `Users can upload their own submissions`
   - **Allowed operation**: `INSERT`
   - **Policy definition**:
   ```sql
   bucket_id = 'submissions' AND (auth.uid())::text = (storage.foldername(name))[1]
   ```
6. Click **"Review"** → **"Save policy"**

Repeat for SELECT policy with:
   - **Policy name**: `Users can view their own submissions`
   - **Allowed operation**: `SELECT`
   - **Policy definition**: Same as above

## 🚀 Test It Now!

1. **Restart your dev server** (if it's running):
   ```bash
   npm run dev
   ```

2. **Go to**: http://localhost:3000/login

3. **Create an account** and test the flow:
   - Complete qualification at `/qualify`
   - Submit an idea at `/submit`
   - Check dashboard at `/dashboard`

## ✅ You're Done!

Everything is configured and ready to go. The platform is fully functional!

---

**Need help?** Check:
- `QUICK_SETUP.md` for detailed instructions
- `SUPABASE_SETUP.md` for comprehensive guide
- `PLATFORM_FEATURES.md` for feature documentation
