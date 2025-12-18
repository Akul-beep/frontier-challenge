# 🚀 Deploy to Vercel RIGHT NOW - Quick Steps

## Step 1: Push to GitHub (2 minutes)

### If Git is NOT initialized yet:

```bash
cd "/Users/akulnehra/Desktop/Challenge/Auralink SaaS Landing Page"
git init
git add .
git commit -m "Ready to deploy"
```

### Create GitHub Repository:

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon (top right) → **"New repository"**
3. Name it: `frontier-challenge` (or any name)
4. Make it **Private** (or Public - your choice)
5. **DO NOT** check "Initialize with README"
6. Click **"Create repository"**

### Push to GitHub:

GitHub will show you commands. Run these:

```bash
cd "/Users/akulnehra/Desktop/Challenge/Auralink SaaS Landing Page"
git remote add origin https://github.com/YOUR_USERNAME/frontier-challenge.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## Step 2: Deploy to Vercel (3 minutes)

### 2.1 Sign in to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or **"Log In"** if you have an account)
3. **Choose "Continue with GitHub"** (easiest option)

### 2.2 Import Your Project

1. After signing in, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories
3. Find `frontier-challenge` (or whatever you named it)
4. Click **"Import"** next to it

### 2.3 Configure Project

**Framework Preset:** Next.js (auto-detected - leave as is)

**Root Directory:** `./` (default - leave as is)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

### 2.4 Add Environment Variables ⚠️ CRITICAL!

Click **"Environment Variables"** and add these **2 variables**:

1. **`NEXT_PUBLIC_SUPABASE_URL`**
   - Get it from: Supabase Dashboard → Settings → API → **Project URL**
   - Copy the full URL (e.g., `https://xxxxx.supabase.co`)

2. **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**
   - Get it from: Supabase Dashboard → Settings → API → **Project API keys**
   - Copy the **`anon` `public`** key (long string)

**Important:** 
- ✅ Check boxes for: **Production**, **Preview**, and **Development**
- ✅ Click **"Add"** after each variable
- ✅ Make sure both are added before deploying

### 2.5 Deploy! 🚀

1. Click the big **"Deploy"** button
2. Wait 2-3 minutes for the build
3. You'll see: **"Congratulations! Your project has been deployed"**
4. You'll get a URL like: `your-project-name.vercel.app`
5. **🎉 YOUR SITE IS LIVE!**

---

## Step 3: View Analytics (After First Visitors)

1. In Vercel Dashboard → Click your project
2. Go to **"Analytics"** tab
3. You'll see:
   - Page views
   - Visitors
   - Custom events (qualification started, passed, signups, etc.)

---

## Need Help?

### Can't find Supabase keys?
- Go to: [app.supabase.com](https://app.supabase.com)
- Select your project
- Settings → API → Copy the keys

### Build fails?
- Check that both environment variables are added
- Make sure they're enabled for Production environment
- Check the build logs in Vercel

### Site works but analytics not showing?
- Wait 5-10 minutes after first visitors
- Events appear in "Analytics" → "Events" tab (not Overview)

---

## That's It! 🎉

Your website is now live on Vercel with full analytics tracking!

**Your deployment URL will be:** `https://your-project-name.vercel.app`

---

## Full Detailed Guide

See `DEPLOY_TO_VERCEL.md` for complete instructions with screenshots and troubleshooting.

