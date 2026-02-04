"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Round2Page() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submission, setSubmission] = useState<any>(null)
  const [driveLink, setDriveLink] = useState("")
  const [shareConfirmed, setShareConfirmed] = useState(false)
  const [incognitoConfirmed, setIncognitoConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { user: userData } } = await supabase.auth.getUser()
    if (!userData) {
      router.push("/login?redirect=/round2")
      return
    }

    setUser(userData)

    // Load their main submission (Round 1)
    const { data: existingSubmission, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("user_id", userData.id)
      .maybeSingle()

    if (error) {
      console.error("Error loading submission:", error)
      setError("There was an error loading your submission. Please try again.")
      setLoading(false)
      return
    }

    // Require an existing submission
    if (!existingSubmission) {
      router.push("/submit")
      return
    }

    // Require that they have advanced to pre-final round
    if (existingSubmission.prefinal_status !== "advanced") {
      setError("You currently do not have access to the Round 2 pitch form.")
      setSubmission(existingSubmission)
      setLoading(false)
      return
    }

    // Require that Round 2 payment is marked as complete
    if (!existingSubmission.round2_paid) {
      setError("We are still processing your Round 2 payment. Once your payment is confirmed, you will see the pitch submission form here.")
      setSubmission(existingSubmission)
      setLoading(false)
      return
    }

    setSubmission(existingSubmission)

    // Prefill existing pitch data if they are updating
    if (existingSubmission.round2_pitch_url) {
      setDriveLink(existingSubmission.round2_pitch_url)
      setShareConfirmed(!!existingSubmission.round2_sharing_confirmed)
      setIncognitoConfirmed(!!existingSubmission.round2_incognito_confirmed)
    }

    setLoading(false)
  }

  function isValidDriveLink(url: string) {
    if (!url) return false
    try {
      const parsed = new URL(url)
      return parsed.hostname.includes("drive.google.com")
    } catch {
      return false
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!isValidDriveLink(driveLink)) {
      setError("Please enter a valid Google Drive link (starting with https://drive.google.com/).")
      return
    }

    if (!shareConfirmed || !incognitoConfirmed) {
      setError("Please confirm both checkboxes to continue.")
      return
    }

    const confirmed = window.confirm(
      "Please confirm:\n\n" +
      "- This is a Google Drive link to your 2-minute pitch video\n" +
      "- Sharing is set to 'Anyone with the link can view'\n" +
      "- You have tested the link in an incognito window\n\n" +
      "Ready to submit your Round 2 pitch?"
    )

    if (!confirmed) return

    setSubmitting(true)

    try {
      const { error: updateError } = await supabase
        .from("submissions")
        .update({
          round2_pitch_url: driveLink.trim(),
          round2_sharing_confirmed: shareConfirmed,
          round2_incognito_confirmed: incognitoConfirmed,
          round2_submitted_at: new Date().toISOString(),
        })
        .eq("id", submission.id)

      if (updateError) {
        console.error("Error saving Round 2 pitch:", updateError)
        setError("There was an error saving your Round 2 pitch. Please try again.")
        setSubmitting(false)
        return
      }

      router.push("/dashboard?submitted=true")
    } catch (err) {
      console.error("Unexpected error saving Round 2 pitch:", err)
      setError("There was an unexpected error. Please try again.")
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <PortfolioNavbar />
        <div className="min-h-screen bg-background pt-20 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#156d95]" />
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <PortfolioNavbar />
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-2">
              <CardHeader className="space-y-4">
                <div>
                  <CardTitle
                    className="text-2xl sm:text-3xl mb-2"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Round 2: 2-Minute Pitch Video
                  </CardTitle>
                  <CardDescription className="text-base">
                    Submit a Google Drive link to your 2-minute pitch video for your idea.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                {error && (
                  <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                {submission && submission.prefinal_status === "advanced" && submission.round2_paid ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="driveLink" className="text-base font-medium">
                        Google Drive Link to 2-Minute Pitch Video *
                      </Label>
                      <Input
                        id="driveLink"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        required
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload your video to Google Drive, set sharing to &quot;Anyone with the link can view&quot;,
                        then paste the link here.
                      </p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4"
                          checked={shareConfirmed}
                          onChange={(e) => setShareConfirmed(e.target.checked)}
                        />
                        <span>
                          I have set the Google Drive file sharing to{" "}
                          <strong>“Anyone with the link can view”</strong>.
                        </span>
                      </label>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4"
                          checked={incognitoConfirmed}
                          onChange={(e) => setIncognitoConfirmed(e.target.checked)}
                        />
                        <span>
                          I have opened the link in an <strong>incognito/private window</strong> and confirmed it works.
                        </span>
                      </label>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800 flex items-start gap-2">
                      <ExternalLink className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      <p>
                        Tip: On Google Drive, click &quot;Share&quot; → &quot;Anyone with the link&quot; →
                        &quot;Viewer&quot; before copying your link.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="px-8 bg-[#156d95] hover:bg-[#156d95]/90 text-white"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Submit Round 2 Pitch
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard")}
                      >
                        Back to Dashboard
                      </Button>
                    </div>
                  </form>
                ) : (
                  !error && (
                    <p className="text-sm text-muted-foreground">
                      You do not currently have access to the Round 2 pitch form.
                    </p>
                  )
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

