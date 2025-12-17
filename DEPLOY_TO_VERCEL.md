# 🚀 Complete Guide: Deploy to Vercel with Analytics

## Step-by-Step Deployment Instructions

### Prerequisites
- ✅ GitHub account
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com) - free)
- ✅ Supabase project set up (already done)
- ✅ Environment variables ready

---

## Part 1: Set Up GitHub Repository

### 1.1 Initialize Git (if not already done)

```bash
cd "/Users/akulnehra/Desktop/Challenge/Auralink SaaS Landing Page"
git init
git add .
git commit -m "Initial commit - Ready for deployment"
```

### 1.2 Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"** (or the `+` icon → New repository)
3. Repository name: `frontier-challenge` (or any name you want)
4. Description: "Frontier Challenge Landing Page"
5. Set to **Private** (recommended) or Public
6. **DO NOT** initialize with README, .gitignore, or license
7. Click **"Create repository"**

### 1.3 Push to GitHub

GitHub will show you commands. Run these in your terminal:

```bash
cd "/Users/akulnehra/Desktop/Challenge/Auralink SaaS Landing Page"
git remote add origin https://github.com/YOUR_USERNAME/frontier-challenge.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your GitHub username!**

---

## Part 2: Deploy to Vercel

### 2.1 Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub to sign in)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your `frontier-challenge` repository
5. Click **"Import"**

### 2.2 Configure Project

**Framework Preset:** Next.js (should auto-detect)

**Root Directory:** `./` (default - leave as is)

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

**Install Command:** `npm install` (default)

### 2.3 Add Environment Variables

**CRITICAL STEP!** Add these environment variables in Vercel:

Click **"Environment Variables"** and add:

1. **`NEXT_PUBLIC_SUPABASE_URL`**
   - Value: Your Supabase project URL
   - Find it in: Supabase Dashboard → Settings → API → Project URL

2. **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**
   - Value: Your Supabase anon/public key
   - Find it in: Supabase Dashboard → Settings → API → Project API keys → `anon` `public`

3. (Optional) **`NEXT_PUBLIC_VERCEL_URL`**
   - Leave empty or auto-set by Vercel

**Make sure to:**
- ✅ Check all three environments: Production, Preview, Development
- ✅ Click "Add" after each variable

### 2.4 Deploy!

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `your-project-name.vercel.app`
4. 🎉 **Your site is live!**

---

## Part 3: View Analytics in Vercel

### 3.1 Access Analytics Dashboard

1. In Vercel Dashboard, go to your project
2. Click **"Analytics"** tab in the top menu
3. You'll see:
   - **Page Views** (how many people visited)
   - **Top Pages** (which pages are most visited)
   - **Visitors** (unique visitors)
   - **Countries** (where visitors are from)
   - **Devices** (desktop/mobile)

### 3.2 View Custom Events

1. Go to **"Analytics"** → **"Events"** tab
2. You'll see custom events we're tracking:
   - `qualification_started` - People who started the quiz
   - `qualification_completed` - People who finished (passed or failed)
   - `qualification_passed` - People who passed (participants!)
   - `qualification_failed` - People who failed
   - `signup_completed` - People who signed up
   - `login_completed` - People who logged in
   - `submission_started` - People who started submitting
   - `submission_completed` - People who submitted their idea
   - `cta_clicked` - CTA button clicks

### 3.3 View Detailed Metrics

Click on any event to see:
- Count (how many times)
- Unique users
- Timeline graph
- Breakdown by properties (e.g., score, track, division)

---

## Part 4: View Participant Data in Supabase

### 4.1 Participant Counts (Quick)

In Supabase SQL Editor, run:

```sql
-- Total participants (passed qualification)
SELECT 
  (SELECT COUNT(*) 
   FROM qualifications
   WHERE question_1 IS NOT NULL AND question_1 != ''
     AND question_2 IS NOT NULL AND question_2 != ''
     AND question_3 IS NOT NULL AND question_3 != ''
     AND question_4 IS NOT NULL AND question_4 != ''
     AND question_5 IS NOT NULL AND question_5 != ''
  ) +
  (SELECT COUNT(*) 
   FROM anonymous_qualifications 
   WHERE passed = true
  ) as total_participants;
```

### 4.2 Detailed Breakdown

```sql
-- See all participants
SELECT 
  'logged_in' as type,
  completed_at,
  NULL as score,
  NULL as passed
FROM qualifications
WHERE question_1 IS NOT NULL AND question_1 != ''
  AND question_2 IS NOT NULL AND question_2 != ''
  AND question_3 IS NOT NULL AND question_3 != ''
  AND question_4 IS NOT NULL AND question_4 != ''
  AND question_5 IS NOT NULL AND question_5 != ''

UNION ALL

SELECT 
  'anonymous' as type,
  completed_at,
  score,
  passed
FROM anonymous_qualifications
WHERE passed = true

ORDER BY completed_at DESC;
```

### 4.3 Submissions

```sql
-- View all submissions
SELECT 
  title,
  track,
  division,
  country,
  status,
  submitted_at
FROM submissions
ORDER BY submitted_at DESC;
```

---

## Part 5: Calculate Conversion Rates

### 5.1 Using Vercel Analytics

**Conversion Funnel:**

1. **Page Views** (Total visitors)
   - View in: Analytics → Overview → Page Views

2. **Started Qualification** 
   - View in: Analytics → Events → `qualification_started`

3. **Passed Qualification** (Participants)
   - View in: Analytics → Events → `qualification_passed`
   - **OR** Supabase: Run participant count query

4. **Signed Up**
   - View in: Analytics → Events → `signup_completed`

5. **Submitted Idea**
   - View in: Analytics → Events → `submission_completed`

**Example Calculation:**
- 100 page views
- 80 started qualification → **80% started rate**
- 75 passed qualification → **93.75% pass rate** (75/80)
- 60 signed up → **75% signup rate** (60/80)
- 50 submitted → **62.5% submission rate** (50/80)

### 5.2 Using Supabase (More Accurate)

```sql
-- Get conversion metrics
SELECT 
  (SELECT COUNT(*) FROM anonymous_qualifications) as total_attempts,
  (SELECT COUNT(*) FROM anonymous_qualifications WHERE passed = true) as participants_passed,
  (SELECT COUNT(DISTINCT user_id) FROM submissions) as users_submitted,
  ROUND(100.0 * (SELECT COUNT(*) FROM anonymous_qualifications WHERE passed = true) / 
    NULLIF((SELECT COUNT(*) FROM anonymous_qualifications), 0), 2) as pass_rate_percent;
```

---

## Part 6: Set Up Custom Domain (Optional)

1. In Vercel project, go to **"Settings"** → **"Domains"**
2. Enter your domain (e.g., `frontierchallenge.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 24 hours)

---

## Troubleshooting

### Build Fails

**Error: Environment variables missing**
- ✅ Make sure all Supabase env vars are added in Vercel
- ✅ Check they're enabled for Production environment

**Error: Module not found**
- ✅ Make sure `npm install` completes successfully locally first
- ✅ Check `package.json` is committed to git

### Analytics Not Showing

- ✅ Wait 5-10 minutes after deployment
- ✅ Visit your site and trigger some events
- ✅ Check browser console for errors
- ✅ Make sure `@vercel/analytics` is installed (already done!)

### Can't See Events

- ✅ Events appear in "Events" tab, not "Overview"
- ✅ Wait a few minutes after users trigger events
- ✅ Make sure you're looking at the right time range

---

## Quick Reference

### Files Created:
- ✅ `lib/analytics.ts` - Custom event tracking
- ✅ Analytics tracking added to:
  - `components/QualificationForm.tsx`
  - `app/login/page.tsx`
  - `app/submit/page.tsx`

### What You'll Track:
1. ✅ Page views (automatic)
2. ✅ Qualification started
3. ✅ Qualification completed (passed/failed)
4. ✅ Sign up
5. ✅ Login
6. ✅ Submission started/completed

### Where to View:
- **Vercel Dashboard** → Analytics tab → Events
- **Supabase Dashboard** → SQL Editor → Run queries

---

## 🎉 You're Ready to Launch!

Once deployed:
1. ✅ Share your Vercel URL
2. ✅ Monitor Analytics in Vercel
3. ✅ Check participant counts in Supabase
4. ✅ Track conversion rates

**Everything is set up and ready to go!** 🚀

