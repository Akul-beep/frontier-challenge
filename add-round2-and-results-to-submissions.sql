-- Add Round 1 result + Round 2 pitch fields to submissions
-- Run this in the Supabase SQL Editor for your project.
-- You can safely run it multiple times; all statements are IF NOT EXISTS.

-- 1) Round 1 / pre-final result status
ALTER TABLE public.submissions
ADD COLUMN IF NOT EXISTS prefinal_status TEXT
  CHECK (prefinal_status IN ('pending', 'advanced', 'not_advanced'))
  DEFAULT 'pending';

COMMENT ON COLUMN public.submissions.prefinal_status IS
  'Result of Round 1 / pre-final selection: pending, advanced, or not_advanced';

CREATE INDEX IF NOT EXISTS idx_submissions_prefinal_status
  ON public.submissions(prefinal_status);

-- 2) Round 2 pitch submission (Google Drive link)
ALTER TABLE public.submissions
ADD COLUMN IF NOT EXISTS round2_pitch_url TEXT,
ADD COLUMN IF NOT EXISTS round2_sharing_confirmed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS round2_incognito_confirmed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS round2_submitted_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS round2_paid BOOLEAN DEFAULT false;

COMMENT ON COLUMN public.submissions.round2_pitch_url IS
  'Google Drive URL for the 2-minute pitch video';

COMMENT ON COLUMN public.submissions.round2_sharing_confirmed IS
  'User confirmed they set Drive sharing to \"Anyone with the link can view\"';

COMMENT ON COLUMN public.submissions.round2_incognito_confirmed IS
  'User confirmed they tested the link in an incognito/private window';

COMMENT ON COLUMN public.submissions.round2_submitted_at IS
  'Timestamp when the Round 2 pitch form was submitted';

COMMENT ON COLUMN public.submissions.round2_paid IS
  'Whether this submission has completed the Stripe payment required for Round 2';

CREATE INDEX IF NOT EXISTS idx_submissions_round2_paid
  ON public.submissions(round2_paid);

