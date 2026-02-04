"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle2, FileText, Users, LogOut, ArrowRight } from "lucide-react"
import Link from "next/link"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [qualification, setQualification] = useState<any>(null)
  const [submission, setSubmission] = useState<any>(null)
  const [ambassador, setAmbassador] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const { data: { user: userData } } = await supabase.auth.getUser()
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(userData)

    // Load qualification
    const { data: qualData } = await supabase
      .from("qualifications")
      .select("*")
      .eq("user_id", userData.id)
      .maybeSingle()

    setQualification(qualData)

    // Load submission
    const { data: subData } = await supabase
      .from("submissions")
      .select("*")
      .eq("user_id", userData.id)
      .maybeSingle()

    setSubmission(subData)

    // Load ambassador application
    const { data: ambData } = await supabase
      .from("ambassadors")
      .select("*")
      .eq("user_id", userData.id)
      .maybeSingle()

    setAmbassador(ambData)
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
  }

  const submitted = searchParams.get("submitted") === "true"
  const ambassadorSubmitted = searchParams.get("ambassador") === "true"

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
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.email}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            {(submitted || ambassadorSubmitted) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">
                    {submitted && "Submission successful!"}
                    {ambassadorSubmitted && "Ambassador application submitted!"}
                  </p>
                  <p className="text-sm text-green-700">
                    {submitted && "Your idea has been submitted successfully. We'll review it soon."}
                    {ambassadorSubmitted && "Thank you for your application. We'll review it and get back to you."}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Qualification Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#156d95]" />
                    Qualification
                  </CardTitle>
                  <CardDescription>
                    Complete the qualification form to unlock submission
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {qualification ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Completed</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Completed on{" "}
                        {new Date(qualification.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <Link href="/qualify">
                      <Button className="w-full bg-[#156d95] hover:bg-[#156d95]/90 text-white">
                        Start Qualification
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* Submission Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#156d95]" />
                    Submission & Results
                  </CardTitle>
                  <CardDescription>
                    Track your 1-page submission and round results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submission ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Status:</span>
                          <span className="text-sm capitalize">{submission.status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Title:</span>
                          <span className="text-sm">{submission.title}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Track:</span>
                          <span className="text-sm">{submission.track}</span>
                        </div>
                        {submission.division && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Division:</span>
                            <span className="text-sm">{submission.division}</span>
                          </div>
                        )}
                      </div>

                      {submission.submitted_at && (
                        <p className="text-xs text-muted-foreground">
                          Submitted on{" "}
                          {new Date(submission.submitted_at).toLocaleDateString()}
                        </p>
                      )}

                      {/* Round 1 / pre-final result */}
                      {submission.prefinal_status && (
                        <div className="mt-2 rounded-lg border px-3 py-2 bg-muted/50">
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            Round 1 Result
                          </p>
                          {submission.prefinal_status === "advanced" && (
                            <p className="text-sm font-medium text-green-700">
                              You have advanced to the Pre-Final Round. 🎉
                            </p>
                          )}
                          {submission.prefinal_status === "not_advanced" && (
                            <p className="text-sm font-medium text-red-700">
                              Thank you for participating. You have not advanced to the Pre-Final Round.
                            </p>
                          )}
                          {submission.prefinal_status === "pending" && (
                            <p className="text-sm text-muted-foreground">
                              Your Round 1 submission is still under review.
                            </p>
                          )}
                        </div>
                      )}

                      {/* Round 2 pitch status */}
                      {submission.prefinal_status === "advanced" && (
                        <div className="mt-2 rounded-lg border px-3 py-2 bg-[#156d95]/5 border-[#156d95]/30">
                          <p className="text-xs font-semibold text-[#156d95] mb-1">
                            Round 2: Pitch Video
                          </p>
                          {submission.round2_pitch_url ? (
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-[#156d95]">
                                Your Round 2 pitch has been submitted.
                              </p>
                              <p className="text-xs text-muted-foreground break-all">
                                Link: {submission.round2_pitch_url}
                              </p>
                              {submission.round2_submitted_at && (
                                <p className="text-xs text-muted-foreground">
                                  Submitted on{" "}
                                  {new Date(submission.round2_submitted_at).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <p className="text-sm text-[#156d95]">
                                You&apos;ve advanced to Round 2. Submit your 2-minute pitch video to complete this round.
                              </p>
                              <Link href="/round2">
                                <Button
                                  size="sm"
                                  className="mt-1 bg-[#156d95] hover:bg-[#156d95]/90 text-white w-full"
                                >
                                  Submit Round 2 Pitch
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      )}

                      <Link href="/submit">
                        <Button
                          variant="outline"
                          className="mt-3 w-full"
                        >
                          Update Your Submission
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ) : qualification ? (
                    <div className="space-y-3">
                      {/* Prominent Guide Link */}
                      <div className="p-4 bg-gradient-to-r from-[#156d95]/10 to-[#156d95]/5 border-2 border-[#156d95]/30 rounded-xl">
                        <p className="text-sm font-bold text-[#202020] mb-2">
                          📋 Need help getting started?
                        </p>
                        <p className="text-xs text-[#666666] mb-3">
                          Check out the complete submission guide with all prompts, formatting requirements, and step-by-step instructions.
                        </p>
                        <Link href="/submission-guide">
                          <Button
                            variant="outline"
                            className="w-full border-[#156d95] text-[#156d95] hover:bg-[#156d95]/10 text-sm"
                          >
                            View Submission Guide
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      
                      <Link href="/submit">
                        <Button className="w-full bg-[#156d95] hover:bg-[#156d95]/90 text-white">
                          Submit Your Idea
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Complete qualification first to submit your idea
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Ambassador Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#156d95]" />
                    Ambassador Program
                  </CardTitle>
                  <CardDescription>
                    Become an ambassador and help spread the word
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ambassador ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-sm capitalize">{ambassador.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Applied on {new Date(ambassador.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <Link href="/ambassador">
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        Apply to be Ambassador
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <>
        <PortfolioNavbar />
        <div className="min-h-screen bg-background pt-20 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#156d95]" />
        </div>
        <Footer />
      </>
    }>
      <DashboardContent />
    </Suspense>
  )
}
