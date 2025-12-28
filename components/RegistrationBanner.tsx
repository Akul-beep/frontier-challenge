"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, GraduationCap } from "lucide-react"
import Link from "next/link"

export const RegistrationBanner = () => {
  return (
    <Link href="#qualification" className="block">
      <section className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 bg-gradient-to-r from-[#156d95] to-[#0f5a7a] text-white cursor-pointer hover:from-[#156d95]/90 hover:to-[#0f5a7a]/90 transition-all relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                <span className="bg-yellow-400/30 text-yellow-100 px-2 py-0.5 rounded font-bold mr-2 animate-pulse">⚡ Deadline Extended!</span>
                Submit by January 15th
              </span>
            </div>
            <span className="hidden sm:inline text-sm opacity-80">•</span>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 flex-shrink-0" />
              <span
                className="text-sm font-bold"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                Get Mentored by Princeton & Diamond Challenge Finalist
              </span>
            </div>
            <span className="hidden sm:inline text-sm opacity-80">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                Win Cash Prizes
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </Link>
  )
}
