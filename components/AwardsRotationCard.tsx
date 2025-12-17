"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Trophy, Users, Star } from "lucide-react"

type AwardType = {
  title: string
  subtitle: string
  description: string
  icon: typeof Award
  division: "Both" | "Junior" | "Open"
}

const awards: AwardType[] = [
  {
    title: "Frontier Scholar",
    subtitle: "1st, 2nd, 3rd Place",
    description: "International + National Recognition",
    icon: Trophy,
    division: "Both",
  },
  {
    title: "Frontier Innovator",
    subtitle: "Innovation Award",
    description: "International Recognition",
    icon: Star,
    division: "Both",
  },
  {
    title: "Frontier Choice",
    subtitle: "Public Recognition",
    description: "Selected by Community Voting",
    icon: Users,
    division: "Both",
  },
  {
    title: "Top 20–30 Advance",
    subtitle: "Final Round",
    description: "Enhanced Mentorship & Showcase",
    icon: Award,
    division: "Both",
  },
]

export const AwardsRotationCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % awards.length)
    }, 3000) // Rotate every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const currentAward = awards[currentIndex]
  const Icon = currentAward.icon

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-[#156d95]/20 shadow-lg w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#156d95] text-white flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3
              className="text-lg sm:text-xl font-semibold text-[#202020] mb-1"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              {currentAward.title}
            </h3>
            <p
              className="text-sm text-[#156d95] font-medium"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              {currentAward.subtitle}
            </p>
          </div>
        </div>
        <p
          className="text-sm text-[#666666] mb-4 leading-5"
          style={{
            fontFamily: "var(--font-figtree), Figtree",
          }}
        >
          {currentAward.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-[#e5e5e5]">
          <div className="flex gap-1">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#156d95] w-6" : "bg-[#e5e5e5]"
                }`}
                aria-label={`Go to award ${index + 1}`}
              />
            ))}
          </div>
          <span
            className="text-xs text-[#666666]"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            {currentAward.division === "Both" ? "Junior & Open Divisions" : `${currentAward.division} Division`}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

