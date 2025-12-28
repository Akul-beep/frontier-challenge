"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, Clock, Award, FileText } from "lucide-react"

export const IntegrationCarousel = () => {
  const steps = [
    {
      number: "1",
      icon: CheckCircle2,
      title: "Round 1: Complete Qualification",
      description: "Answer 5 quick questions (2 minutes). Once you pass, you're a participant and proceed to Round 2.",
      color: "from-[#156d95] to-[#156d95]/80",
    },
    {
      number: "2",
      icon: FileText,
      title: "Round 2: Choose Track & Submit Your 1-Page Idea",
      description: "Choose your track (Business, Technology, Society, or Environment). Write a 1-page document answering your track's prompt. Submit by January 15th.",
      color: "from-[#156d95] to-[#156d95]/80",
    },
    {
      number: "3",
      icon: Award,
      title: "Round 3: Final Round (Top 20–30) & Winners",
      description: "Everyone gets a certificate. Top 20–30 advance to Round 3 (2-min pitch video). Top 3 win cash prizes, enhanced mentorship, and global recognition.",
      color: "from-[#156d95] to-[#156d95]/80",
    },
  ]

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-[48px] leading-tight font-bold text-[#202020] mb-4 sm:mb-6 tracking-tight"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: 700,
            }}
          >
            How It Works: 3 Simple Steps
          </h2>
          <p
            className="text-lg sm:text-xl leading-7 text-[#666666] max-w-3xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            <strong className="text-[#202020] font-semibold">100% free.</strong> Everyone gets a certificate. Top performers win prizes, mentorship & recognition.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.number}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#156d95]/30 to-transparent hidden md:block"></div>
                </div>

                {/* Content */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#156d95]/5 to-white border border-[#156d95]/10">
                  <div className="w-10 h-10 rounded-lg bg-[#156d95]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#156d95]" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-[#202020] mb-3"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base text-[#666666] leading-6"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="#qualification"
            className="group inline-flex items-center gap-2.5 bg-[#156d95] text-white px-6 py-3 rounded-full text-base sm:text-lg font-bold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Start Step 1: Qualification Round (Takes 2 Minutes)
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
