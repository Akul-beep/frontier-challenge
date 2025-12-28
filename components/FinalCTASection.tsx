"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Award, Clock, Sparkles } from "lucide-react"

export const FinalCTASection = () => {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#156d95] to-[#0f5a7a] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6"
          >
            <Award className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2
            className="text-3xl sm:text-4xl lg:text-[56px] leading-tight font-bold text-white mb-6 tracking-tight"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: 700,
            }}
          >
            Ready to Win Recognition & Build Your Portfolio?
          </h2>
          
          <p
            className="text-xl sm:text-2xl leading-8 text-white/95 mb-4 max-w-3xl mx-auto font-medium"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            Submit your 1-page idea by <strong className="text-white font-bold">January 15th</strong>.
          </p>
          
          <p
            className="text-lg sm:text-xl leading-8 text-white/90 mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            <strong className="text-white font-bold">Round 1:</strong> Qualification (2 min). <strong className="text-white font-bold">Round 2:</strong> Track & submit 1-page idea by Jan 15. <strong className="text-white font-bold">Round 3:</strong> Top 20–30 advance (2-min pitch video). Everyone gets a certificate. Top 3 win cash prizes & <strong className="text-white font-bold">enhanced mentorship</strong>.
          </p>

          {/* Key Points */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-white/90">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span style={{ fontFamily: "var(--font-figtree), Figtree" }}>Jan 15 Deadline</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span style={{ fontFamily: "var(--font-figtree), Figtree" }}>Cash Prizes</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span style={{ fontFamily: "var(--font-figtree), Figtree" }}>100% Free</span>
            </div>
          </div>

          <Link href="#qualification">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2.5 bg-white text-[#156d95] px-6 py-3 rounded-full text-base sm:text-lg font-bold hover:rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Start Round 1: Qualification Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
