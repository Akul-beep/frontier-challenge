"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Award, Users, Trophy, Video } from "lucide-react"

export default function PricingSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium border border-[#156d95]/20">
            <Trophy className="w-4 h-4" />
            <span>What You Can Win</span>
          </div>
          
          <h2 
            className="font-figtree text-3xl sm:text-4xl lg:text-[52px] font-bold leading-tight mb-4 sm:mb-6 text-[#202020]"
            style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 700 }}
          >
            Awards & Recognition
          </h2>
          <p 
            className="font-figtree text-xl sm:text-2xl text-[#202020] max-w-3xl mx-auto font-semibold mb-3"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Stand out to colleges. Build your portfolio. Get recognized globally.
          </p>
          <p 
            className="font-figtree text-base sm:text-lg text-[#666666] max-w-3xl mx-auto mb-8"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            All participants receive a Certificate of Participation. Top submissions receive global, national, and special distinction recognition.
          </p>
        </div>

        {/* Award Cards - Professional Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Global Podium - ONLY CASH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative p-8 rounded-2xl text-center transition-all border-2 border-[#156d95] bg-gradient-to-br from-[#156d95]/5 to-white shadow-lg hover:shadow-xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#156d95] to-[#0f5a7a] flex items-center justify-center shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-figtree text-2xl font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Global Podium Awards
            </h3>
            <p className="font-figtree text-sm text-[#666666] mb-6" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Top 3 Overall Ideas (International)
            </p>
            <div className="space-y-2.5 mb-6 text-left bg-gradient-to-br from-white to-[#156d95]/5 rounded-xl p-5 border border-[#156d95]/10">
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">🥇 1st Place</strong> — $50 + Certificate of Distinction
              </div>
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">🥈 2nd Place</strong> — $30 + Certificate of Distinction
              </div>
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">🥉 3rd Place</strong> — $20 + Certificate of Distinction
              </div>
            </div>
            <p className="font-figtree text-sm leading-relaxed text-[#666666] italic" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Selected from all submissions worldwide.
            </p>
          </motion.div>

          {/* National Recognition - NO CASH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative p-8 rounded-2xl text-center transition-all border-2 border-[#e5e5e5] bg-white shadow-md hover:shadow-xl hover:border-[#156d95]/30"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#156d95]/10 to-[#156d95]/5 flex items-center justify-center border-2 border-[#156d95]/20">
              <Users className="w-10 h-10 text-[#156d95]" />
            </div>
            <h3 className="font-figtree text-2xl font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              National Recognition Awards
            </h3>
            <p className="font-figtree text-sm text-[#666666] mb-6" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Top 3 Submissions per Country
            </p>
            <div className="space-y-2.5 mb-6 text-left bg-gradient-to-br from-[#156d95]/5 to-white rounded-xl p-5 border border-[#156d95]/10">
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">🥇 National Winner</strong>
              </div>
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">🥈 National Runner-Up</strong>
              </div>
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">🥉 National Honorable Mention</strong>
              </div>
            </div>
            <p className="font-figtree text-sm leading-relaxed text-[#666666] italic" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Recognizes outstanding ideas within each participating country.
            </p>
          </motion.div>

          {/* Special Distinction - NO CASH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative p-8 rounded-2xl text-center transition-all border-2 border-[#e5e5e5] bg-white shadow-md hover:shadow-xl hover:border-[#156d95]/30"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#156d95]/10 to-[#156d95]/5 flex items-center justify-center border-2 border-[#156d95]/20">
              <Award className="w-10 h-10 text-[#156d95]" />
            </div>
            <h3 className="font-figtree text-2xl font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Special Distinction Awards
            </h3>
            <p className="font-figtree text-sm text-[#666666] mb-6" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Awarded Across All Tracks
            </p>
            <div className="space-y-2.5 mb-6 text-left bg-gradient-to-br from-[#156d95]/5 to-white rounded-xl p-5 border border-[#156d95]/10">
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">⭐ Most Innovative Idea</strong>
              </div>
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">⭐ Best Real-World Impact</strong>
              </div>
              <div className="font-figtree text-base text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <strong className="text-[#156d95] font-semibold">⭐ Best Clarity & Communication</strong>
              </div>
            </div>
            <p className="font-figtree text-sm leading-relaxed text-[#666666] italic" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Recognizes exceptional creativity, feasibility, and presentation.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="#qualification"
            className="group inline-flex items-center gap-2.5 bg-[#156d95] text-white px-6 py-3 rounded-full font-figtree text-base sm:text-lg font-bold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Win Recognition & Prizes - Start Round 1 Now
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
