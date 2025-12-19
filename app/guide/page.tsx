"use client"

import { motion } from "framer-motion"
import { Download, CheckCircle2, FileText, Calendar, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import Link from "next/link"

const tracks = [
  {
    id: "business",
    number: "Track 1",
    title: "Business, Economics & Finance",
    prompt: "What is one problem in today's financial or economic system that affects people your age or your community, and how would you redesign it to be fairer, more accessible, or more effective?",
    tip: "Clearly explain the problem, who it affects, and how your redesigned system would make things fairer or more accessible for people like you.",
  },
  {
    id: "technology",
    number: "Track 2",
    title: "Technology & AI",
    prompt: "What is one technology that is changing society quickly, and what rules, design choices, or safeguards should exist to ensure it helps people rather than harms them?",
    tip: "Focus on one technology and give a few simple rules or design choices that would help people stay safe while still getting the benefits.",
  },
  {
    id: "society",
    number: "Track 3",
    title: "Society, Policy & Education",
    prompt: "What is one issue affecting young people today that adults often underestimate, and what practical change would you propose to address it?",
    tip: "Describe a real situation young people face, then suggest one practical change that a school, organization, or community could actually put in place.",
  },
  {
    id: "environment",
    number: "Track 4",
    title: "Environment & Sustainability",
    prompt: "What is one environmental problem that is often discussed but rarely solved effectively, and what realistic solution would you propose that individuals, schools, or communities could implement?",
    tip: "Avoid huge, vague ideas—choose one clear environmental problem and a realistic solution that people at home, school, or in your community could follow.",
  },
]

export default function SubmissionGuidePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <PortfolioNavbar />
      <div className="min-h-screen bg-white pt-16">
        {/* Print Header - Only visible when printing */}
        <div className="hidden print:block mb-8 border-b-2 border-[#156d95] pb-4">
          <h1 className="text-3xl font-bold text-[#156d95]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
            Frontier Challenge Submission Guide
          </h1>
          <p className="text-gray-600 mt-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
            Complete instructions for Round 2 submission
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 print:mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium mb-6 print:hidden">
              <FileText className="w-4 h-4" />
              <span>Round 2: Submission Guide</span>
            </div>
            
            <h1
              className="text-4xl sm:text-5xl font-bold text-[#202020] mb-4"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Submission Guide
            </h1>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto mb-6" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Everything you need to know to submit your 1-page idea and compete for cash prizes, national recognition, and mentorship.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center print:hidden">
              <Button
                onClick={handlePrint}
                className="bg-[#156d95] hover:bg-[#156d95]/90 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Print or Save as PDF
              </Button>
              <Button
                variant="outline"
                asChild
              >
                <Link href="/submit">Go to Submission Form →</Link>
              </Button>
            </div>
          </motion.div>

          {/* Quick Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12 print:grid-cols-3 print:mb-8">
            <div className="bg-[#156d95]/5 border border-[#156d95]/20 rounded-xl p-5 print:border print:border-gray-300">
              <Calendar className="w-8 h-8 text-[#156d95] mb-3" />
              <h3 className="font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Deadline
              </h3>
              <p className="text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                December 27, 2024
              </p>
            </div>
            <div className="bg-[#156d95]/5 border border-[#156d95]/20 rounded-xl p-5 print:border print:border-gray-300">
              <FileText className="w-8 h-8 text-[#156d95] mb-3" />
              <h3 className="font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Format
              </h3>
              <p className="text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                1-Page PDF Document
              </p>
            </div>
            <div className="bg-[#156d95]/5 border border-[#156d95]/20 rounded-xl p-5 print:border print:border-gray-300">
              <Award className="w-8 h-8 text-[#156d95] mb-3" />
              <h3 className="font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Everyone Wins
              </h3>
              <p className="text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Certificate for All Participants
              </p>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 print:mb-8"
          >
            <h2
              className="text-3xl font-bold text-[#202020] mb-6 print:text-2xl"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              What to Do Next
            </h2>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Choose Your Track",
                  description: "Pick ONE track from the four options below that interests you most. Read each prompt carefully and choose the one that sparks your best idea.",
                },
                {
                  step: "2",
                  title: "Develop Your 1-Page Idea",
                  description: "Answer your chosen prompt in a clear, creative 1-page document. Focus on clarity, impact, and feasibility. You have time until December 27th to perfect it.",
                },
                {
                  step: "3",
                  title: "Format as PDF",
                  description: "Save your document as a PDF file (exactly 1 page). Make sure it's clear, readable, and represents your best work.",
                },
                {
                  step: "4",
                  title: "Submit Online",
                  description: "Go to the submission form (linked above), fill in your details, upload your PDF, and submit before the deadline.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-6 bg-white border border-[#e5e5e5] rounded-xl print:border-gray-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#156d95] text-white flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                      {item.title}
                    </h3>
                    <p className="text-[#666666] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
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
            transition={{ delay: 0.2 }}
            className="mb-12 print:mb-8"
          >
            <h2
              className="text-3xl font-bold text-[#202020] mb-6 print:text-2xl"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Choose Your Track & Prompt
            </h2>
            <p className="text-[#666666] mb-8 leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Pick ONE track that interests you most. Each track has a specific prompt to answer. Your submission should directly address the prompt you choose.
            </p>

            <div className="space-y-8 print:space-y-6">
              {tracks.map((track, idx) => (
                <div
                  key={track.id}
                  className="border-2 border-[#e5e5e5] rounded-xl p-6 sm:p-8 print:border-gray-300 print:break-inside-avoid"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#156d95] text-white flex items-center justify-center font-bold">
                      {track.number.split(" ")[1]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#156d95] mb-1 uppercase tracking-wide">
                        {track.number}
                      </p>
                      <h3
                        className="text-2xl font-bold text-[#202020] mb-4"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  <div className="bg-[#156d95]/5 border-l-4 border-[#156d95] p-5 mb-4 print:bg-gray-50 print:border-gray-400">
                    <h4 className="font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                      Your Prompt:
                    </h4>
                    <p className="text-[#202020] leading-relaxed italic" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                      "{track.prompt}"
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 print:bg-gray-50 print:border-gray-300">
                    <p className="text-sm text-[#666666] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                      <strong className="text-[#202020]">💡 Tip:</strong> {track.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Submission Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 print:mb-8"
          >
            <h2
              className="text-3xl font-bold text-[#202020] mb-6 print:text-2xl"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Submission Requirements
            </h2>
            <div className="bg-white border-2 border-[#156d95] rounded-xl p-6 sm:p-8 print:border-gray-400">
              <ul className="space-y-4">
                {[
                  "1-page PDF document (exactly 1 page - we verify this)",
                  "Answers the prompt clearly and creatively",
                  "Clearly formatted and easy to read",
                  "Includes your project title",
                  "Submitted before December 27, 2024",
                  "One track only (choose your favorite)",
                ].map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#156d95] flex-shrink-0 mt-0.5" />
                    <span className="text-[#202020] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Judging Criteria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12 print:mb-8"
          >
            <h2
              className="text-3xl font-bold text-[#202020] mb-6 print:text-2xl"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              How Your Submission Will Be Judged
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { criteria: "Creativity & Originality", weight: "30%" },
                { criteria: "Impact & Feasibility", weight: "30%" },
                { criteria: "Clarity & Communication", weight: "25%" },
                { criteria: "Completeness", weight: "15%" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e5e5e5] rounded-xl p-5 print:border-gray-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-[#202020]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                      {item.criteria}
                    </h3>
                    <span className="text-[#156d95] font-bold">{item.weight}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#156d95] h-2 rounded-full"
                      style={{ width: item.weight }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Prizes & Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12 print:mb-8"
          >
            <h2
              className="text-3xl font-bold text-[#202020] mb-6 print:text-2xl"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Prizes & Recognition
            </h2>
            <div className="bg-gradient-to-br from-[#156d95]/10 to-[#156d95]/5 border border-[#156d95]/20 rounded-xl p-6 sm:p-8 print:border-gray-400">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg text-[#202020] mb-3" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    🏆 Top 3 Winners
                  </h3>
                  <p className="text-[#666666] leading-relaxed mb-4" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    Cash prizes and global podium recognition
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#202020] mb-3" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    🌟 Top 20-30 Finalists
                  </h3>
                  <p className="text-[#666666] leading-relaxed mb-4" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    Advance to Round 3 (2-minute pitch video). National recognition awards.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-bold text-lg text-[#202020] mb-3" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    ✅ All Participants
                  </h3>
                  <p className="text-[#666666] leading-relaxed" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                    Receive a certificate for your portfolio and resume. Everyone who submits gets recognized!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-[#156d95] text-white rounded-xl p-8 sm:p-12 print:hidden"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Ready to Submit?
            </h2>
            <p className="text-lg mb-6 opacity-90" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              Head to the submission form and upload your 1-page idea
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-[#156d95] hover:bg-gray-100"
            >
              <Link href="/submit">Go to Submission Form →</Link>
            </Button>
          </motion.div>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>Frontier Challenge Submission Guide - Visit frontierchallenge.com for more information</p>
        </div>

        <Footer />
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          .print\\:border-gray-400 {
            border-color: #9ca3af !important;
          }
          .print\\:bg-gray-50 {
            background-color: #f9fafb !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          .print\\:mb-8 {
            margin-bottom: 2rem !important;
          }
          .print\\:mb-6 {
            margin-bottom: 1.5rem !important;
          }
          .print\\:space-y-6 > * + * {
            margin-top: 1.5rem !important;
          }
          .print\\:text-2xl {
            font-size: 1.5rem !important;
            line-height: 2rem !important;
          }
        }
      `}</style>
    </>
  )
}
