# 🔥 FIX BUCKET ERROR - DO THIS NOW

The SQL method doesn't always work. **You MUST create it via Dashboard:**

## ✅ Create Bucket (2 minutes):

1. **Open**: https://supabase.com/dashboard
2. **Click your project**
3. **Click "Storage"** (left sidebar)
4. **Look for "submissions" bucket** - is it there?
   - **NO** → Continue below
   - **YES** → Skip to Step 5

5. **Click "New bucket"** (blue button, top right)
6. **Name**: Type exactly: `submissions`
7. **Public bucket**: Leave **UNCHECKED** (it should be private)
8. **Click "Create bucket"**

9. **Verify**: You should now see `submissions` in the list

## ✅ Then Run Policies:

1. **Go to SQL Editor**
2. **Copy ALL SQL** from `setup-storage-policies.sql`
3. **Paste and run**
4. Done!

---

## 🧪 Test:

Try uploading a file - error should be gone!

**If still broken**, check:
- Bucket name is exactly `submissions` (lowercase)
- Bucket shows in Storage list
- Policies were run successfully

