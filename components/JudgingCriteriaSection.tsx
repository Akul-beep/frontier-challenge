"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Sparkles, Target, Eye } from "lucide-react"

export default function JudgingCriteriaSection() {
  const criteria = [
    {
      icon: Sparkles,
      title: "Creativity & Originality",
      description:
        "How unique and innovative is your approach? We're looking for fresh perspectives and creative solutions.",
      weight: "30%",
    },
    {
      icon: Target,
      title: "Clarity & Communication",
      description:
        "Can you clearly explain your idea? Strong written communication is essential for conveying your vision effectively.",
      weight: "25%",
    },
    {
      icon: Eye,
      title: "Impact & Feasibility",
      description: "How significant is the problem you're solving, and how realistic is your solution?",
      weight: "30%",
    },
    {
      icon: CheckCircle2,
      title: "Completeness",
      description:
        "Does your submission fully address the prompt? We evaluate how well you've thought through your idea.",
      weight: "15%",
    },
  ]

  return (
    <section className="w-full py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2
            className="text-2xl sm:text-3xl lg:text-[40px] leading-tight font-normal text-[#202020] mb-3 sm:mb-4 tracking-tight"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: "400",
            }}
          >
            How Submissions Are Judged
          </h2>
          <p
            className="text-base sm:text-lg leading-6 sm:leading-7 text-[#666666] max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            <strong className="text-[#202020]">Transparent, fair evaluation</strong> by experienced judges. All submissions
            are evaluated using the same criteria, with separate judging for Junior and Open Divisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {criteria.map((criterion, index) => {
            const Icon = criterion.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white border border-[#e5e5e5] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#156d95] text-white flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className="text-lg sm:text-xl font-medium text-[#202020]"
                        style={{
                          fontFamily: "var(--font-figtree), Figtree",
                        }}
                      >
                        {criterion.title}
                      </h3>
                      <span
                        className="text-sm font-medium text-[#156d95] bg-[#156d95]/10 px-3 py-1 rounded-full"
                        style={{
                          fontFamily: "var(--font-figtree), Figtree",
                        }}
                      >
                        {criterion.weight}
                      </span>
                    </div>
                    <p
                      className="text-sm sm:text-base text-[#666666]"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {criterion.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#156d95]/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#156d95]/20"
        >
          <h3
            className="text-xl sm:text-2xl font-medium text-[#202020] mb-4 sm:mb-6"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            Fair & Transparent Process
          </h3>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#156d95] flex-shrink-0 mt-0.5" />
              <div>
                <h4
                  className="text-base font-medium text-[#202020] mb-1"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  Separate Division Judging
                </h4>
                <p
                  className="text-sm text-[#666666]"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  Junior and Open Divisions are judged separately to ensure age-appropriate evaluation.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#156d95] flex-shrink-0 mt-0.5" />
              <div>
                <h4
                  className="text-base font-medium text-[#202020] mb-1"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  Experienced Judges
                </h4>
                <p
                  className="text-sm text-[#666666]"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  Submissions are evaluated by educators and professionals with expertise in innovation and student development.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#156d95] flex-shrink-0 mt-0.5" />
              <div>
                <h4
                  className="text-base font-medium text-[#202020] mb-1"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  Equal Evaluation
                </h4>
                <p
                  className="text-sm text-[#666666]"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  All submissions are judged using the same criteria, ensuring fair evaluation for every participant.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#156d95] flex-shrink-0 mt-0.5" />
              <div>
                <h4
                  className="text-base font-medium text-[#202020] mb-1"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  Multiple Winners
                </h4>
                <p
                  className="text-sm text-[#666666]"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  Winners are selected for Best Overall, Most Innovative, and People's Choice in each division.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
