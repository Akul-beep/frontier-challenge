"use client"

import { QualificationForm } from "@/components/QualificationForm"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { Sparkles, Clock, Award, CheckCircle2 } from "lucide-react"

export function HomeQualificationSection() {
  const [userId, setUserId] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
      }
    }
    checkUser()
  }, [])

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
