"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { CountdownTimer } from "./CountdownTimer"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show sticky CTA after user scrolls past 400px
    const handleScroll = () => {
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (isDismissed || !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full px-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#156d95] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 text-[#666666] hover:text-[#202020] transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex-1 text-center sm:text-left pr-6">
              <div className="text-xs sm:text-sm font-semibold text-[#156d95] mb-1" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Submission Deadline
              </div>
              <div className="text-[#202020]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <CountdownTimer variant="bold" size="sm" />
              </div>
            </div>

            <Link
              href="#qualification"
              onClick={() => setIsDismissed(true)}
              className="group inline-flex items-center gap-2 bg-[#156d95] text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-lg whitespace-nowrap"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Sign Up Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

