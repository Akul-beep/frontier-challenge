# Supabase Setup Guide

This guide will walk you through setting up Supabase for the Global Ideas Challenge platform.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Global Ideas Challenge (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the region closest to your users
4. Click "Create new project" and wait for it to be set up (takes 1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

## Step 3: Set Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the placeholder values with the actual values from Step 2.

## Step 4: Create Database Tables

Go to **SQL Editor** in your Supabase dashboard and run the following SQL script:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Qualifications table
CREATE TABLE IF NOT EXISTS public.qualifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_1 TEXT NOT NULL,
  question_2 TEXT NOT NULL,
  question_3 TEXT NOT NULL,
  question_4 TEXT NOT NULL,
  question_5 TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  qualification_id UUID REFERENCES public.qualifications(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  track TEXT NOT NULL,
  division TEXT NOT NULL,
  document_url TEXT,
  video_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed')),
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ambassadors table
CREATE TABLE IF NOT EXISTS public.ambassadors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  school TEXT NOT NULL,
  year TEXT NOT NULL,
  motivation TEXT NOT NULL,
  previous_experience TEXT NOT NULL,
  outreach_plan TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_qualifications_user_id ON public.qualifications(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_ambassadors_user_id ON public.ambassadors(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_ambassadors_status ON public.ambassadors(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ambassadors_updated_at BEFORE UPDATE ON public.ambassadors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Step 5: Set Up Row Level Security (RLS)

Enable RLS and create policies. Run this SQL:

```sql
-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassadors ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Qualifications policies
CREATE POLICY "Users can view their own qualifications"
  ON public.qualifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own qualifications"
  ON public.qualifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Submissions policies
CREATE POLICY "Users can view their own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = user_id);

-- Ambassadors policies
CREATE POLICY "Users can view their own ambassador applications"
  ON public.ambassadors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ambassador applications"
  ON public.ambassadors FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## Step 6: Set Up Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click "Create a new bucket"
3. Name it: `submissions`
4. Set it as **Public**: NO (private bucket)
5. Click "Create bucket"

Now create storage policies:

**EASIEST METHOD - Use SQL** (Recommended):

1. Click "SQL Editor" in Supabase dashboard
2. Click "New query"
3. Open the file `setup-storage-policies.sql` in this project
4. Copy ALL the SQL from that file
5. Paste it into SQL Editor
6. Click "Run"

✅ This creates all 4 policies (INSERT, SELECT, UPDATE, DELETE) at once!

---

**Alternative UI Method**:

⚠️ **IMPORTANT**: Policies must be created on **storage.objects**, NOT storage.buckets!

1. Click on the `submissions` bucket
2. Go to "Policies" tab
3. Click "New Policy" → "Create policy from scratch"
4. **Make sure the target is "storage.objects"**
5. **Policy 1: Allow users to upload**
   - **Policy name**: Users can upload their own submissions
   - **Allowed operation**: INSERT
   - **Policy definition**:
     ```sql
     bucket_id = 'submissions' AND (auth.uid())::text = (storage.foldername(name))[1]
     ```
   - Click "Review" and "Save policy"
6. **Policy 2: Allow users to view**
   - Click "New Policy" again
   - **Policy name**: Users can view their own submissions
   - **Allowed operation**: SELECT
   - **Policy definition**: Same as above
   - Click "Review" and "Save policy"

**Note**: Files are stored in folders like `{user_id}/filename.pdf` for better organization and security.

## Step 7: Configure Authentication

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Ensure **Email** provider is enabled (it should be by default)
3. Configure email templates if needed (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation email template

## Step 8: Test Your Setup

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/login` and try creating an account
3. Try completing the qualification form at `/qualify`
4. Test submitting an idea at `/submit`

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file has the correct keys
- Make sure you're using `NEXT_PUBLIC_SUPABASE_ANON_KEY`, not the service role key
- Restart your dev server after adding environment variables

### RLS Policy errors
- Make sure all the policies are created correctly
- Check that RLS is enabled on all tables
- Verify the user is authenticated before accessing protected routes

### Storage upload errors
- Check that the bucket exists and is named `submissions`
- Verify storage policies allow the current user to upload
- For development, you can temporarily disable RLS on storage (not for production)

### Database connection errors
- Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check that your Supabase project is active (not paused)
- Ensure you're on a paid plan or free tier with active project

## Next Steps

- Set up email confirmation (optional but recommended)
- Configure additional auth providers (Google, GitHub, etc.) if needed
- Set up database backups
- Configure monitoring and alerts
- Review and customize email templates

## Important Notes

- **Never commit `.env.local` to git** - it's already in `.gitignore`
- The `anon` key is safe to use in client-side code (that's what it's for)
- For production, consider setting up database backups
- Monitor your usage to stay within free tier limits (if applicable)

That's it! Your Supabase setup is complete. 🎉
