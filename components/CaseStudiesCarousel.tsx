"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

type Track = {
  id: string
  shortLabel: string
  title: string
  prompt: string
  tip: string
}

const tracks: Track[] = [
  {
    id: "business",
    shortLabel: "Track 1 · Business, Economics & Finance",
    title: "Business, Economics & Finance",
    prompt:
      "What is one problem in today’s financial or economic system that affects people your age or your community, and how would you redesign it to be fairer, more accessible, or more effective?",
    tip: "Tip: Clearly explain the problem, who it affects, and how your redesigned system would make things fairer or more accessible for people like you.",
  },
  {
    id: "technology",
    shortLabel: "Track 2 · Technology & AI",
    title: "Technology & AI",
    prompt:
      "What is one technology that is changing society quickly, and what rules, design choices, or safeguards should exist to ensure it helps people rather than harms them?",
    tip: "Tip: Focus on one technology and give a few simple rules or design choices that would help people stay safe while still getting the benefits.",
  },
  {
    id: "society",
    shortLabel: "Track 3 · Society, Policy & Education",
    title: "Society, Policy & Education",
    prompt:
      "What is one issue affecting young people today that adults often underestimate, and what practical change would you propose to address it?",
    tip: "Tip: Describe a real situation young people face, then suggest one practical change that a school, organization, or community could actually put in place.",
  },
  {
    id: "environment",
    shortLabel: "Track 4 · Environment & Sustainability",
    title: "Environment & Sustainability",
    prompt:
      "What is one environmental problem that is often discussed but rarely solved effectively, and what realistic solution would you propose that individuals, schools, or communities could implement?",
    tip: "Tip: Avoid huge, vague ideas—choose one clear environmental problem and a realistic solution that people at home, school, or in your community could follow.",
  },
]

export const CaseStudiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = tracks[currentIndex]

  const goToTrack = (index: number) => setCurrentIndex(index)

  return (
    <section className="w-full bg-gradient-to-br from-background via-background to-muted/20 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium">
            <span>Round 2: Track Selection & Submission</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl lg:text-[48px] leading-tight font-bold text-foreground mb-4 sm:mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-figtree), Figtree", fontWeight: 700 }}
          >
            Round 2: Choose Your Track & Submit Your 1-Page Idea
          </h1>
          <p
            className="text-lg sm:text-xl leading-7 text-foreground max-w-3xl mx-auto px-4 mb-6 font-semibold"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            After Round 1, choose your track & submit 1-page idea. <strong className="text-[#156d95]">Everyone gets a certificate.</strong> Top 20–30 advance to Round 3 (2-min pitch video). Pick one track. Clear prompts. Submit by Dec 27. <strong className="text-foreground">No coding. No teams. Just ideas.</strong>
          </p>
        </div>

        {/* Track tabs */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 border-b border-[#e5e5e5] pb-3">
            {tracks.map((track, index) => (
              <button
                key={track.id}
                onClick={() => goToTrack(index)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-[#156d95] text-white shadow-md"
                    : "bg-white text-[#555] border border-[#e5e5e5] hover:bg-[#f7f7f7]"
                }`}
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {track.title}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#156d95]/30 to-transparent mb-8 sm:mb-12" />

        {/* Selected track content */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-end"
        >
          {/* Prompt card */}
          <div className="space-y-4 sm:space-y-5">
            <p
              className="text-xs sm:text-sm font-mono uppercase tracking-[0.12em] text-[#156d95]"
              style={{ fontFamily: "var(--font-geist-mono), 'Geist Mono', ui-monospace, monospace" }}
            >
              {current.shortLabel}
            </p>

            <h2
              className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-foreground leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              {current.title}
            </h2>

            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#e5e5e5]">
              <h3
                className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Prompt
              </h3>
              <p
                className="text-sm sm:text-base leading-6 text-foreground/90"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                {current.prompt}
              </p>
            </div>
          </div>

          {/* Tip card */}
          <div className="space-y-4 sm:space-y-5">
            <div className="bg-[#156d95]/5 border border-[#156d95]/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 min-h-[280px] flex flex-col justify-between">
              <div>
                <h3
                  className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Tip for this track
                </h3>
                <p
                  className="text-sm sm:text-base text-foreground/90 leading-6"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {current.tip}
                </p>
              </div>
              <p
                className="mt-4 text-xs sm:text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                You don’t need perfect answers—focus on a clear problem, a realistic idea, and explain your reasoning step by step.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 sm:mt-12 lg:mt-16"
        >
          <Link
            href="#qualification"
            className="group inline-flex items-center gap-2.5 bg-[#156d95] text-white px-6 py-3 rounded-full text-base sm:text-lg font-bold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Start Round 1: Qualification First (Takes 2 Minutes)
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
