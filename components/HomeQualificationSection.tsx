"use client"

import { QualificationForm } from "@/components/QualificationForm"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { Sparkles, Clock, Award, CheckCircle2, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomeQualificationSection() {
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [hasPassed, setHasPassed] = useState<boolean | null>(null)
  const [score, setScore] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        // Check database qualification
        const { data: qual } = await supabase
          .from("qualifications")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle()
        if (qual) {
          setHasPassed(true)
        }
      }
      
      // Check localStorage for qualification (works for both logged in and anonymous)
      if (typeof window !== 'undefined') {
        const qualificationPassed = localStorage.getItem('qualification_passed') === 'true'
        const qualificationScore = localStorage.getItem('qualification_score')
        if (qualificationPassed) {
          setHasPassed(true)
          if (qualificationScore) {
            setScore(parseInt(qualificationScore))
          }
        }
      }
    }
    checkUser()
  }, [])

  // Show "Already Passed" state if they've completed qualification
  if (mounted && hasPassed) {
    return (
      <section id="qualification" className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-[#156d95]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Round 1: Qualification Passed ✓</span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl lg:text-[48px] leading-tight font-bold text-[#202020] mb-4 sm:mb-5 tracking-tight"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: 700,
              }}
            >
              You're Already a Participant!
              <br />
              <span className="text-[#156d95]">Ready for Round 2?</span>
            </h2>
            
            <p
              className="text-lg sm:text-xl leading-7 text-[#202020] max-w-3xl mx-auto mb-8 font-semibold"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              {score !== null && `You passed with ${score}/5 correct! `}
              Now it's time to submit your 1-page idea. Choose your track, write your solution, and compete for <strong className="text-[#156d95]">cash prizes, mentorship, and global recognition</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/submission-guide">
                <Button
                  size="lg"
                  className="bg-[#156d95] hover:bg-[#156d95]/90 text-white px-8 py-6 text-lg font-bold"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  View Complete Submission Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              {userId ? (
                <Link href="/submit">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#156d95] text-[#156d95] hover:bg-[#156d95]/10 px-8 py-6 text-lg font-bold"
                  >
                    Go to Submission Form
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login?redirect=/submit&mode=signup&from=qualification">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#156d95] text-[#156d95] hover:bg-[#156d95]/10 px-8 py-6 text-lg font-bold"
                  >
                    Sign Up & Submit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Show qualification form collapsed/read-only for reference */}
            <details className="max-w-3xl mx-auto mt-8">
              <summary className="cursor-pointer text-[#156d95] hover:underline font-medium text-lg mb-4">
                View your qualification results
              </summary>
              <div className="mt-4">
                <QualificationForm userId={userId} saveLocally={true} />
              </div>
            </details>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="qualification" className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#156d95]/5 via-white to-[#156d95]/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#156d95]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#156d95]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Round 1: Qualification Round</span>
          </div>
          
          <h2
            className="text-3xl sm:text-4xl lg:text-[48px] leading-tight font-bold text-[#202020] mb-4 sm:mb-5 tracking-tight"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: 700,
            }}
          >
            Round 1: Start Your Journey
            <br />
            <span className="text-[#156d95]">Complete Qualification in 2 Minutes</span>
          </h2>
          
          <p
            className="text-lg sm:text-xl leading-7 text-[#202020] max-w-3xl mx-auto mb-6 font-semibold"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            Answer 5 quick questions (2 minutes). Once you pass, <strong className="text-[#156d95]">you're a participant</strong> and proceed to Round 2: choose track & submit 1-page idea. Compete for <strong className="text-[#156d95]">cash prizes, mentorship, and global recognition</strong>.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-[#666666]">
              <Clock className="w-5 h-5 text-[#156d95]" />
              <span style={{ fontFamily: "var(--font-figtree), Figtree" }}>2 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-[#666666]">
              <CheckCircle2 className="w-5 h-5 text-[#156d95]" />
              <span style={{ fontFamily: "var(--font-figtree), Figtree" }}>3 out of 5 to pass</span>
            </div>
            <div className="flex items-center gap-2 text-[#666666]">
              <Award className="w-5 h-5 text-[#156d95]" />
              <span style={{ fontFamily: "var(--font-figtree), Figtree" }}>100% free</span>
            </div>
          </div>
        </motion.div>
        
        <QualificationForm userId={userId} saveLocally={true} />
      </div>
    </section>
  )
}
