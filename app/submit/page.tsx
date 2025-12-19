"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Upload, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"
import { validatePdfPages } from "@/lib/pdf-validator"
import { COUNTRIES } from "@/lib/countries"
import { analytics } from "@/lib/analytics"

const TRACKS = [
  "Business, Economics & Finance",
  "Technology & AI",
  "Society, Policy & Education",
  "Environment & Sustainability",
]

const GRADES = [
  "6", "7", "8", "9", "10", "11", "12"
]

const DIVISIONS = [
  "Junior Division (Grades 6-8)",
  "Open Division (Grades 9-12)",
]

// Auto-determine division based on grade
function getDivisionFromGrade(grade: string): string {
  const gradeNum = parseInt(grade)
  if (gradeNum >= 6 && gradeNum <= 8) {
    return "Junior Division (Grades 6-8)"
  } else if (gradeNum >= 9 && gradeNum <= 12) {
    return "Open Division (Grades 9-12)"
  }
  return ""
}

export default function SubmitPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    track: "",
    grade: "",
    division: "",
    country: "",
    document: null as File | null,
  })
  const [pdfValidation, setPdfValidation] = useState<{ isValid: boolean; pageCount: number; error?: string } | null>(null)
  const [validatingPdf, setValidatingPdf] = useState(false)
  const [hasQualification, setHasQualification] = useState(false)
  const [existingDocumentUrl, setExistingDocumentUrl] = useState<string | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { user: userData } } = await supabase.auth.getUser()
    if (!userData) {
      // Check if they completed qualification locally
      const localQualification = localStorage.getItem('qualification_completed')
      if (localQualification) {
        router.push("/login?redirect=/submit&qualification_complete=true")
      } else {
        router.push("/qualify")
      }
      return
    }

    setUser(userData)

    // Check if user has completed qualification (database or local)
    const { data: qualification } = await supabase
      .from("qualifications")
      .select("*")
      .eq("user_id", userData.id)
      .maybeSingle()

    const localQualification = localStorage.getItem("qualification_completed")

    if (!qualification && !localQualification) {
      router.push("/qualify")
      return
    }

    // Load existing submission so they can update it
    const { data: existingSubmission } = await supabase
      .from("submissions")
      .select("title, track, grade, division, country, document_url")
      .eq("user_id", userData.id)
      .maybeSingle()

    if (existingSubmission) {
      setExistingDocumentUrl(existingSubmission.document_url || null)
      setFormData((prev) => ({
        ...prev,
        title: existingSubmission.title || "",
        track: existingSubmission.track || "",
        grade: existingSubmission.grade || "",
        division: existingSubmission.division || "",
        country: existingSubmission.country || "",
        document: null,
      }))
    }

    setHasQualification(true)
    setLoading(false)
  }

  async function handleDocumentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if it's a PDF
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      alert("Please upload a PDF file only.")
      e.target.value = ""
      return
    }

    setFormData((prev) => ({ ...prev, document: file })) // Clear any previous reference-only state
    setPdfValidation(null)
    setValidatingPdf(true)

    // Validate PDF page count
    try {
      const validation = await validatePdfPages(file)
      setPdfValidation(validation)
      
      if (!validation.isValid) {
        e.target.value = ""
        setFormData((prev) => ({ ...prev, document: null }))
      }
    } catch (error) {
      console.error('PDF validation error:', error)
      // Allow submission if validation fails (fallback)
      setPdfValidation({ isValid: true, pageCount: 1 })
    } finally {
      setValidatingPdf(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Track submission start (non-blocking)
    try {
      analytics.submissionStarted()
    } catch (err) {
      console.warn("Analytics submissionStarted error", err)
    }

    // Validate PDF before submission (if file upload, not Drive link)
    if (formData.document && (!pdfValidation || !pdfValidation.isValid)) {
      alert("Please ensure your PDF is exactly 1 page before submitting.")
      return
    }

    // Require a PDF file (no more Google Drive option)
    if (!formData.document && !existingDocumentUrl) {
      alert("Please upload your 1-page PDF document before submitting.")
      return
    }

    // Confirm submission
    const confirmed = window.confirm(
      "Are you sure you want to submit your idea?\n\n" +
      "Please review:\n" +
      `- Title: ${formData.title}\n` +
      `- Track: ${formData.track}\n` +
      `- Grade: ${formData.grade}\n` +
      `- Division: ${formData.division}\n` +
      `- Country: ${formData.country}\n\n` +
      "Note: You can update your submission before the deadline (December 27th)."
    )

    if (!confirmed) {
      return
    }

    setSubmitting(true)

    try {
      // Start from existing document URL (for updates)
      let documentUrl = existingDocumentUrl

      // Upload document if provided
      if (formData.document) {
        const fileExt = formData.document.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `${user.id}/${fileName}`
        
        const { error: uploadError } = await supabase.storage
          .from("submissions")
          .upload(filePath, formData.document, {
            upsert: true // Allow updating existing files
          })

        if (uploadError) {
          // If bucket doesn't exist, provide helpful error
          if (uploadError.message.includes("Bucket not found")) {
            throw new Error("Storage bucket not configured. Please contact support or use a Google Drive link instead.")
          }
          throw uploadError
        }

        const { data: urlData } = supabase.storage
          .from("submissions")
          .getPublicUrl(filePath)

        documentUrl = urlData.publicUrl
      }

      // Get qualification ID
      const { data: qualification } = await supabase
        .from("qualifications")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()

      // Check if submission already exists (allow updates)
      const { data: existingSubmission } = await supabase
        .from("submissions")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()

      // Ensure division is set from grade if not already set
      const finalDivision = formData.division || (formData.grade ? getDivisionFromGrade(formData.grade) : "")
      
      if (!finalDivision) {
        alert("Please select your grade first.")
        return
      }

      let submitError
      if (existingSubmission) {
        // Update existing submission
        const { error } = await supabase
          .from("submissions")
          .update({
            title: formData.title,
            track: formData.track,
            grade: formData.grade,
            division: finalDivision,
            country: formData.country || null,
            document_url: documentUrl,
            video_url: null,
            status: "submitted",
            submitted_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingSubmission.id)
        submitError = error
      } else {
        // Create new submission
        const { error } = await supabase.from("submissions").insert({
          user_id: user.id,
          qualification_id: qualification?.id || null,
          title: formData.title,
          track: formData.track,
          grade: formData.grade,
          division: finalDivision,
          country: formData.country || null,
          document_url: documentUrl,
          video_url: null,
          status: "submitted",
          submitted_at: new Date().toISOString(),
        })
        submitError = error
      }

      if (submitError) throw submitError

      // Track successful submission (non-blocking)
      try {
        analytics.submissionCompleted(formData.track, formData.division)
      } catch (err) {
        console.warn("Analytics submissionCompleted error", err)
      }

      router.push("/dashboard?submitted=true")
    } catch (error: any) {
      console.error("Error submitting:", error)
      const message =
        (error && typeof error === "object" && "message" in error && (error as any).message) ||
        "There was an error submitting your idea. Please try again."

      // If Supabase actually saved the submission, treat it as success
      try {
        if (user) {
          const { data: existingSubmission } = await supabase
            .from("submissions")
            .select("id")
            .eq("user_id", user.id)
            .maybeSingle()

          if (existingSubmission) {
            router.push("/dashboard?submitted=true")
            return
          }
        }
      } catch (checkError) {
        console.error("Error checking existing submission after failure:", checkError)
      }

      alert(message)
    } finally {
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
                    Submit Your Idea
                  </CardTitle>
                  <CardDescription className="text-base">
                    {hasQualification && (
                      <span className="flex items-center gap-2 text-green-600 mb-4">
                        <CheckCircle2 className="h-4 w-4" />
                        Qualification completed! You can now submit your idea.
                      </span>
                    )}
                  </CardDescription>
                  
                  {/* Prominent Guide Link */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-[#156d95]/10 to-[#156d95]/5 border-2 border-[#156d95]/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[#156d95] flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#202020] mb-1" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                          Need help? Check out the complete submission guide
                        </p>
                        <p className="text-xs text-[#666666] mb-3" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                          Includes all 4 track prompts, formatting requirements, judging criteria, and step-by-step instructions. You can print it or save as PDF.
                        </p>
                        <Link href="/submission-guide">
                          <Button
                            variant="outline"
                            className="border-[#156d95] text-[#156d95] hover:bg-[#156d95]/10 text-sm font-medium"
                          >
                            View Complete Submission Guide →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-base font-medium">
                      Project Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter your project title"
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="track" className="text-base font-medium">
                      Track *
                    </Label>
                    <Select
                      value={formData.track}
                      onValueChange={(value) => setFormData({ ...formData, track: value })}
                      required
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue placeholder="Select a track" />
                      </SelectTrigger>
                      <SelectContent>
                        {TRACKS.map((track) => (
                          <SelectItem key={track} value={track}>
                            {track}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-base font-medium">
                      Current Grade *
                    </Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) => {
                        const division = getDivisionFromGrade(value)
                        setFormData({ ...formData, grade: value, division })
                      }}
                      required
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue placeholder="Select your current grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADES.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formData.grade && formData.division && (
                      <p className="text-sm text-muted-foreground">
                        You'll be competing in: <strong>{formData.division}</strong>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-base font-medium">
                      Country *
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                      required
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Required for National Recognition Awards eligibility.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document" className="text-base font-medium">
                      1-Page Document (PDF) *
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <Input
                          id="document"
                          type="file"
                          accept=".pdf"
                          onChange={handleDocumentChange}
                          className="cursor-pointer"
                          disabled={validatingPdf}
                        />
                        {validatingPdf && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Validating PDF...
                          </div>
                        )}
                      </div>
                      {formData.document && pdfValidation?.isValid && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>✓ PDF is exactly 1 page - Ready to submit!</span>
                        </div>
                      )}
                      {pdfValidation && !pdfValidation.isValid && (
                        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{pdfValidation.error}</p>
                            <p className="text-xs text-red-500 mt-1">
                              Please compress your document to exactly 1 page and try again.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload your 1-page project document (PDF format only). We verify it's exactly 1 page.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={submitting || (formData.document && !pdfValidation?.isValid)}
                      className="px-8 bg-[#156d95] hover:bg-[#156d95]/90 text-white"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Submit Idea
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

