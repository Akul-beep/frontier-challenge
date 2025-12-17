# 🔑 How to Get Your Supabase Anon Key

## Quick Steps:

1. **Go to your Supabase dashboard**:
   - Visit: https://supabase.com/dashboard/project/gpcsmvzlbztmtyhelucy
   - Or go to https://supabase.com/dashboard and select your project

2. **Navigate to API Settings**:
   - Click **Settings** (gear icon) in the left sidebar
   - Click **API** in the settings menu

3. **Copy the anon/public key**:
   - Under "Project API keys", find the **anon public** key
   - It looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...`
   - Click the copy icon or select and copy the entire key

4. **Add it to .env.local**:
   - Open `.env.local` file in this project
   - Replace `YOUR_ANON_KEY_HERE` with the key you just copied
   - Save the file

5. **Restart your dev server**:
   ```bash
   npm run dev
   ```

## Your .env.local should look like:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gpcsmvzlbztmtyhelucy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwc2NtdnpsYnp0bXR5aGVsdWN5IiwiYXVkIjoiYW5vbiIsImlhdCI6MTcwNzA1ODQ2MCwiZXhwIjoyMDIyNjM0NDYwfQ.YourActualKeyHere
```

**Note**: The anon key is safe to use in client-side code. It's designed for that purpose. Just don't commit `.env.local` to git (it's already in .gitignore).
