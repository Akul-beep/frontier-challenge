"use client"
import { motion } from "framer-motion"
import { ArrowRight, Award } from "lucide-react"
import Link from "next/link"
import { CompactCountdown } from "./CompactCountdown"

export const ProductTeaserCard = () => {
  return (
                <section className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left: Clear Value Prop - MENTORSHIP PROMINENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#156d95]/5 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col justify-center border border-[#156d95]/10 shadow-lg"
          >
            <div className="mb-4">
              {/* Deadline with Countdown beside it - Compact & Perfect */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-xs sm:text-sm font-semibold border border-[#156d95]/20">
                  <span className="whitespace-nowrap">Dec 27, 23:59 UTC+0</span>
                </div>
                <CompactCountdown />
              </div>
              
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl leading-tight font-bold text-[#202020] mb-4"
                style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 700 }}
              >
                Launch Your Ideas to Success
              </h2>

              <p
                className="text-base sm:text-lg text-[#404040] mb-4 leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Submit a <strong className="text-[#156d95]">1-page idea</strong> in your chosen track. 
                Get mentored by <strong className="text-[#156d95]">Princeton freshman & Diamond Challenge finalist</strong>. 
                Win cash prizes and national recognition.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-[#666666]">
                  <div className="w-5 h-5 rounded-full bg-[#156d95] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "var(--font-figtree), Figtree" }}><strong className="text-[#156d95]">Exclusive mentorship from Ivy League & award winners</strong></span>
                </div>
                <div className="flex items-center gap-3 text-[#666666]">
                  <div className="w-5 h-5 rounded-full bg-[#156d95] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "var(--font-figtree), Figtree" }}><strong className="text-[#156d95]">Cash prizes</strong> & <strong className="text-[#156d95]">national & international recognition</strong></span>
                </div>
                <div className="flex items-center gap-3 text-[#666666]">
                  <div className="w-5 h-5 rounded-full bg-[#156d95] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "var(--font-figtree), Figtree" }}><strong className="text-[#156d95]">100% participation certificate</strong> for your portfolio</span>
                </div>
              </div>

              <Link
                href="#qualification"
                className="group inline-flex items-center gap-2.5 bg-[#156d95] text-white px-6 py-3 rounded-full text-base sm:text-lg font-bold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Start Qualification Now (2 Minutes)
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
          >
            <img
              src="/space-shuttle-launch.gif"
              alt="Launch your ideas to success"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlay for better text readability and aesthetic */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(21, 109, 149, 0.2) 0%, rgba(15, 90, 122, 0.3) 50%, rgba(21, 109, 149, 0.15) 100%)",
                mixBlendMode: "overlay",
              }}
            />
            <div 
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.1) 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
