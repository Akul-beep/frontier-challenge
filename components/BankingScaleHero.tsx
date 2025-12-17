"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Award, Users, Clock, Sparkles, FileText } from "lucide-react"
import Link from "next/link"

export const BankingScaleHero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline - Focus on the Competition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Global Student Competition</span>
            </div>
            
            <h1
              className="text-3xl sm:text-4xl lg:text-[56px] font-bold leading-tight tracking-tight text-[#111A4A] mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 700 }}
            >
              Frontier Challenge:
              <br />
              <span className="text-[#156d95]">Share Your Innovative Ideas</span>
            </h1>

            <p
              className="text-lg sm:text-xl leading-7 text-[#404040] mb-4 font-medium max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Submit a <strong className="text-[#156d95]">1-page document</strong> answering one prompt from Business, Technology, Society, or Environment. 
              Share your ideas, your innovation, your vision for solving real problems.
            </p>

            <p
              className="text-lg sm:text-xl leading-7 text-[#156d95] mb-3 max-w-2xl mx-auto font-bold"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Limited spots available for exclusive mentorship sessions with Princeton freshman & Diamond Challenge finalist—first come, first served!
            </p>
            
            <p
              className="text-base leading-6 text-[#666666] mb-3 max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Top submissions win cash prizes and national & international recognition. 
              <strong className="text-[#202020]"> Everyone who submits receives a certificate</strong> for their portfolio.
            </p>
          </motion.div>

          {/* Key Benefits - Visual, Scannable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#156d95]/5 to-transparent border border-[#156d95]/10">
              <FileText className="w-6 h-6 text-[#156d95] mb-2" />
              <div className="text-2xl font-bold text-[#111A4A] mb-1">1-Page</div>
              <div className="text-xs text-[#666666] text-center">Written Document</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#156d95]/5 to-transparent border border-[#156d95]/10">
              <Users className="w-6 h-6 text-[#156d95] mb-2" />
              <div className="text-2xl font-bold text-[#111A4A] mb-1">4 Tracks</div>
              <div className="text-xs text-[#666666] text-center">Choose Your Focus</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#156d95]/5 to-transparent border border-[#156d95]/10">
              <Clock className="w-6 h-6 text-[#156d95] mb-2" />
              <div className="text-2xl font-bold text-[#111A4A] mb-1">Dec 27</div>
              <div className="text-xs text-[#666666] text-center">Deadline</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-[#156d95]/5 to-transparent border border-[#156d95]/10">
              <Award className="w-6 h-6 text-[#156d95] mb-2" />
              <div className="text-2xl font-bold text-[#111A4A] mb-1">100%</div>
              <div className="text-xs text-[#666666] text-center">Get Certificate</div>
            </div>
          </motion.div>

          {/* Primary CTA - Strong, Clear */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-3"
          >
            <Link
              href="#qualification"
              className="group inline-flex items-center gap-3 bg-[#156d95] text-white px-7 py-3.5 rounded-full text-base sm:text-lg font-bold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Start Free Qualification Round
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#tracks"
              className="inline-flex items-center text-[#156d95] hover:text-[#156d95]/80 font-medium transition-colors"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              See Competition Tracks →
            </Link>
          </motion.div>

          {/* Trust Indicators - Quick Scannable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-[#666666] space-y-2"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Your ideas, your innovation
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Work independently
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Open worldwide
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                100% free
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
