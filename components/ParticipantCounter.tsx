"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users } from "lucide-react"

export function ParticipantCounter() {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Start with a base number and add random increment for social proof
    const baseCount = 450
    const randomIncrement = Math.floor(Math.random() * 150) + 50
    const targetCount = baseCount + randomIncrement

    // Animate counting up
    const duration = 2000
    const steps = 60
    const increment = targetCount / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setCount(Math.floor(increment * currentStep))
      } else {
        setCount(targetCount)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200"
    >
      <Users className="w-4 h-4 text-green-600" />
      <span className="text-sm font-semibold text-green-700" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
        <span className="font-bold tabular-nums">{count.toLocaleString()}+</span> students already joined
      </span>
    </motion.div>
  )
}

