"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  variant?: "default" | "bold" | "urgent" | "white"
  size?: "sm" | "md" | "lg"
}

export function CountdownTimer({ variant = "default", size = "md" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Deadline: December 27, 2024, 23:59:00 UTC+0
    const deadline = new Date("2024-12-27T23:59:00Z").getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = deadline - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return null
  }

  const { days, hours, minutes, seconds } = timeLeft

  const timeUnits = [
    { value: days, label: "Days", max: 30 },
    { value: hours, label: "Hrs", max: 24 },
    { value: minutes, label: "Mins", max: 60 },
    { value: seconds, label: "Secs", max: 60 },
  ]

  // Size classes
  const sizeClasses = {
    sm: { number: "text-xl sm:text-2xl", label: "text-[10px] sm:text-xs", gap: "gap-2" },
    md: { number: "text-2xl sm:text-3xl lg:text-4xl", label: "text-xs sm:text-sm", gap: "gap-3 sm:gap-4" },
    lg: { number: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl", label: "text-sm sm:text-base", gap: "gap-4 sm:gap-6" },
  }

  const currentSize = sizeClasses[size]

  // Color classes based on variant
  const colorClasses = {
    default: { number: "text-[#156d95]", label: "text-[#666666]" },
    bold: { number: "text-[#156d95]", label: "text-[#333333]" },
    urgent: { number: "text-red-600", label: "text-red-700/80" },
    white: { number: "text-white", label: "text-white/90" },
  }

  const currentColors = colorClasses[variant]

  return (
    <div className={`flex items-center ${currentSize.gap}`}>
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex items-baseline gap-1 sm:gap-1.5">
          <motion.div
            key={`${unit.label}-${unit.value}`}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className={`${currentSize.number} font-bold tabular-nums ${currentColors.number}`}
            style={{ 
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {String(unit.value).padStart(2, "0")}
          </motion.div>
          <div
            className={`${currentSize.label} font-semibold ${currentColors.label} uppercase tracking-wide`}
            style={{ 
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: 600,
            }}
          >
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
}
