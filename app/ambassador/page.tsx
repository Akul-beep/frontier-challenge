"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Send, Users } from "lucide-react"

const YEARS = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate Student",
]

export default function AmbassadorPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    school: "",
    year: "",
    motivation: "",
    previousExperience: "",
    outreachPlan: "",
  })

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { user: userData } } = await supabase.auth.getUser()
    if (!userData) {
      router.push("/login?redirect=/ambassador")
      return
    }
    setUser(userData)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { error } = await supabase.from("ambassadors").insert({
        user_id: user.id,
        school: formData.school,
        year: formData.year,
        motivation: formData.motivation,
        previous_experience: formData.previousExperience,
        outreach_plan: formData.outreachPlan,
        status: "pending",
      })

      if (error) throw error

      router.push("/dashboard?ambassador=true")
    } catch (error) {
      console.error("Error submitting:", error)
      alert("There was an error submitting your application. Please try again.")
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
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#156d95]/10 mb-4">
              <Users className="h-8 w-8 text-[#156d95]" />
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Become an Ambassador
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help spread the word about the Global Ideas Challenge and inspire other students to participate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle
                  className="text-2xl"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Ambassador Application
                </CardTitle>
                <CardDescription>
                  Tell us about yourself and how you'd like to help spread the word
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-base font-medium">
                      School/Institution *
                    </Label>
                    <Input
                      id="school"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      placeholder="Enter your school name"
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-base font-medium">
                      Year/Grade *
                    </Label>
                    <Select
                      value={formData.year}
                      onValueChange={(value) => setFormData({ ...formData, year: value })}
                      required
                    >
                      <SelectTrigger className="w-full text-base">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-base font-medium">
                      Why do you want to be an ambassador? *
                    </Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="Share your motivation for becoming an ambassador..."
                      required
                      rows={4}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousExperience" className="text-base font-medium">
                      Previous Experience *
                    </Label>
                    <Textarea
                      id="previousExperience"
                      value={formData.previousExperience}
                      onChange={(e) =>
                        setFormData({ ...formData, previousExperience: e.target.value })
                      }
                      placeholder="Describe any relevant experience (leadership, community service, etc.)..."
                      required
                      rows={4}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="outreachPlan" className="text-base font-medium">
                      Outreach Plan *
                    </Label>
                    <Textarea
                      id="outreachPlan"
                      value={formData.outreachPlan}
                      onChange={(e) =>
                        setFormData({ ...formData, outreachPlan: e.target.value })
                      }
                      placeholder="How do you plan to promote the challenge? (social media, school events, etc.)..."
                      required
                      rows={4}
                      className="text-base"
                    />
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
                          <Send className="mr-2 h-4 w-4" />
                          Submit Application
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
