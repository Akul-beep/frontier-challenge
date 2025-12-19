"use client"

import { motion } from "framer-motion"
import { Download, FileText, Calendar, Award, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const tracks = [
  {
    id: "business",
    title: "Track 1: Business, Economics & Finance",
    prompt: "What is one problem in today's financial or economic system that affects people your age or your community, and how would you redesign it to be fairer, more accessible, or more effective?",
    tip: "Clearly explain the problem, who it affects, and how your redesigned system would make things fairer or more accessible for people like you.",
  },
  {
    id: "technology",
    title: "Track 2: Technology & AI",
    prompt: "What is one technology that is changing society quickly, and what rules, design choices, or safeguards should exist to ensure it helps people rather than harms them?",
    tip: "Focus on one technology and give a few simple rules or design choices that would help people stay safe while still getting the benefits.",
  },
  {
    id: "society",
    title: "Track 3: Society, Policy & Education",
    prompt: "What is one issue affecting young people today that adults often underestimate, and what practical change would you propose to address it?",
    tip: "Describe a real situation young people face, then suggest one practical change that a school, organization, or community could actually put in place.",
  },
  {
    id: "environment",
    title: "Track 4: Environment & Sustainability",
    prompt: "What is one environmental problem that is often discussed but rarely solved effectively, and what realistic solution would you propose that individuals, schools, or communities could implement?",
    tip: "Avoid huge, vague ideas—choose one clear environmental problem and a realistic solution that people at home, school, or in your community could follow.",
  },
]

export default function SubmissionGuidePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-after: always;
          }
          body {
            background: white;
          }
        }
      `}</style>

      {/* Header - Hidden when printing */}
      <div className="no-print border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-[#156d95] hover:underline font-medium">
              ← Back to Home
            </Link>
            <Button
              onClick={handlePrint}
              className="bg-[#156d95] hover:bg-[#156d95]/90 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Print / Save as PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium">
            <FileText className="w-4 h-4" />
            <span>Complete Submission Guide</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#202020] mb-4"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Submission Guide
          </h1>
          <p
            className="text-xl text-[#666666] max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Everything you need to know to submit your 1-page idea and compete for cash prizes, national recognition, and mentorship.
          </p>
        </motion.div>

        {/* Quick Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#156d95]/10 to-[#156d95]/5 border-2 border-[#156d95]/30 rounded-2xl p-6 sm:p-8 mb-12"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-[#156d95] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#202020] mb-1" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Deadline
                </h3>
                <p className="text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  <strong className="text-[#156d95]">December 27, 2024</strong>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-[#156d95] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#202020] mb-1" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Format
                </h3>
                <p className="text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  <strong className="text-[#156d95]">1-page PDF document</strong>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-[#156d95] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#202020] mb-1" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Rewards
                </h3>
                <p className="text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  <strong className="text-[#156d95]">Certificate for everyone</strong>. Top 3 win cash prizes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-[#156d95] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#202020] mb-1" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Requirements
                </h3>
                <p className="text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  No coding. No teams. <strong className="text-[#156d95]">Just your ideas.</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step-by-Step Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2
            className="text-3xl font-bold text-[#202020] mb-6"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            How to Submit
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Complete Qualification Round",
                description: "Answer 5 quick questions about pitches and business. Get 3 or more correct to pass and become a participant.",
              },
              {
                step: "2",
                title: "Sign Up & Choose Your Track",
                description: "Create a free account, then select one of the 4 tracks below that interests you most.",
              },
              {
                step: "3",
                title: "Write Your 1-Page Idea",
                description: "Answer your chosen track's prompt in a 1-page document. Be clear, creative, and focus on your solution.",
              },
              {
                step: "4",
                title: "Submit Your PDF",
                description: "Upload your 1-page PDF document through the submission form before December 27th. You can update it anytime before the deadline.",
              },
              {
                step: "5",
                title: "Wait for Results",
                description: "Everyone who submits gets a certificate! Top 20-30 advance to the final round (2-minute pitch video). Top 3 win cash prizes.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white border border-[#e5e5e5] rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#156d95] text-white flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3
                    className="text-xl font-bold text-[#202020] mb-2"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#666666] leading-relaxed"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* All Track Prompts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 print-break"
        >
          <h2
            className="text-3xl font-bold text-[#202020] mb-6"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Choose Your Track
          </h2>
          <p
            className="text-lg text-[#666666] mb-8"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Pick <strong className="text-[#202020]">one track</strong> that interests you most. Each track has a clear prompt to guide your idea.
          </p>

          <div className="space-y-8">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className="bg-white border-2 border-[#e5e5e5] rounded-2xl p-6 sm:p-8 hover:border-[#156d95]/30 transition-colors"
              >
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium mb-3"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {track.title}
                  </span>
                </div>
                
                <h3
                  className="text-xl font-bold text-[#202020] mb-4"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Prompt
                </h3>
                <p
                  className="text-lg leading-relaxed text-[#202020] mb-6"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {track.prompt}
                </p>

                <div className="bg-[#156d95]/5 border-l-4 border-[#156d95] rounded-r-lg p-4">
                  <p
                    className="text-base leading-relaxed text-[#666666]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    <strong className="text-[#156d95]">💡 Tip:</strong> {track.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Judging Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 print-break"
        >
          <h2
            className="text-3xl font-bold text-[#202020] mb-6"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            How Submissions Are Judged
          </h2>
          <p
            className="text-lg text-[#666666] mb-6"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Your submission will be evaluated on these four criteria. Junior and Open Divisions are judged separately for fairness.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Creativity & Originality",
                weight: "30%",
                description: "How unique and innovative is your idea? Does it offer a fresh perspective?",
              },
              {
                title: "Impact & Feasibility",
                weight: "30%",
                description: "How significant is the problem you're solving? Can your solution realistically be implemented?",
              },
              {
                title: "Clarity & Communication",
                weight: "25%",
                description: "Is your idea explained clearly? Can others understand your solution easily?",
              },
              {
                title: "Completeness",
                weight: "15%",
                description: "Did you address all parts of the prompt? Is your submission complete and well-structured?",
              },
            ].map((criterion, index) => (
              <div
                key={index}
                className="bg-white border border-[#e5e5e5] rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-lg font-bold text-[#202020]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {criterion.title}
                  </h3>
                  <span className="text-sm font-bold text-[#156d95] bg-[#156d95]/10 px-3 py-1 rounded-full">
                    {criterion.weight}
                  </span>
                </div>
                <p
                  className="text-[#666666] leading-relaxed"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {criterion.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Formatting Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2
            className="text-3xl font-bold text-[#202020] mb-6"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Formatting Requirements
          </h2>
          <div className="bg-[#156d95]/5 border-2 border-[#156d95]/20 rounded-2xl p-6 sm:p-8">
            <ul className="space-y-4">
              {[
                "Your document must be exactly 1 page (we verify this automatically)",
                "Format: PDF only (.pdf file)",
                "Include your project title at the top",
                "Answer your chosen track's prompt clearly",
                "Use clear headings and structure",
                "Font size: 11pt or larger for readability",
                "Margins: Standard (1 inch or similar)",
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#156d95] flex-shrink-0 mt-0.5" />
                  <span
                    className="text-lg text-[#202020]"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA Section - Hidden when printing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="no-print text-center bg-gradient-to-br from-[#156d95] to-[#156d95]/90 rounded-2xl p-8 sm:p-12 text-white"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Ready to Submit?
          </h2>
          <p
            className="text-xl mb-8 opacity-90"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Sign up and submit your 1-page idea before December 27th.
          </p>
          <Link href="/submit">
            <Button
              size="lg"
              className="bg-white text-[#156d95] hover:bg-white/90 text-lg px-8 py-6 font-bold"
            >
              Go to Submission Form
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
