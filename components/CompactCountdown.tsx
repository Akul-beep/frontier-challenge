"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CompactCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Deadline: December 27, 2025, 23:59:59 UTC
    const deadline = new Date("2025-12-27T23:59:59.000Z")

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = deadline.getTime() - now.getTime()

      if (difference > 0) {
        // Calculate time units
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
    return (
      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#156d95]/20 shadow-sm">
        <span className="text-xs sm:text-sm font-bold tabular-nums text-[#156d95]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
          Loading...
        </span>
      </div>
    )
  }

  const { days, hours, minutes, seconds } = timeLeft

  return (
    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#156d95]/20 shadow-sm">
      <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap text-[#156d95] opacity-90" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
        Time Remaining:
      </span>
      <div className="flex items-center gap-1">
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs sm:text-sm font-bold tabular-nums text-[#156d95]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
            {String(days)}
          </span>
          <span className="text-[9px] font-medium uppercase opacity-70 text-[#156d95]">d</span>
        </div>
        <span className="text-[10px] opacity-50 text-[#156d95]">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs sm:text-sm font-bold tabular-nums text-[#156d95]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
            {String(hours).padStart(2, "0")}
          </span>
          <span className="text-[9px] font-medium uppercase opacity-70 text-[#156d95]">h</span>
        </div>
        <span className="text-[10px] opacity-50 text-[#156d95]">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs sm:text-sm font-bold tabular-nums text-[#156d95]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
            {String(minutes).padStart(2, "0")}
          </span>
          <span className="text-[9px] font-medium uppercase opacity-70 text-[#156d95]">m</span>
        </div>
        <span className="text-[10px] opacity-50 text-[#156d95]">:</span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-xs sm:text-sm font-bold tabular-nums text-[#156d95]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
            {String(seconds).padStart(2, "0")}
          </span>
          <span className="text-[9px] font-medium uppercase opacity-70 text-[#156d95]">s</span>
        </div>
      </div>
    </div>
  )
}
