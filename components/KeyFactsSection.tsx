"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Users, Calendar, Award, Globe } from "lucide-react"

export const KeyFactsSection = () => {
  const keyFacts = [
    {
      icon: Award,
      title: "$100 in Prizes",
      description: "Cash awards + certificates",
      highlight: true,
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Open to students worldwide",
      highlight: true,
    },
    {
      icon: CheckCircle2,
      title: "100% Free",
      description: "No cost to participate",
      highlight: true,
    },
    {
      icon: Calendar,
      title: "Submit by Dec 27",
      description: "Work on your schedule",
      highlight: true,
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Showcase your ideas worldwide",
      highlight: true,
    },
  ]

  return (
    <section className="w-full py-12 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#e5e5e5]">
          <div className="text-center mb-8">
            <h2
              className="text-2xl md:text-3xl font-medium text-[#202020] mb-3"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Why Join Now
            </h2>
            <p
              className="text-base text-[#666666] max-w-2xl mx-auto"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              <strong className="text-[#202020]">Free. Fair. Accessible.</strong> Designed for students everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {keyFacts.map((fact, index) => {
              const Icon = fact.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-4 rounded-xl transition-all ${
                    fact.highlight
                      ? "bg-[#156d95]/5 border border-[#156d95]/20"
                      : "bg-[#fafafa] border border-[#e5e5e5]"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                        fact.highlight ? "bg-[#156d95] text-white" : "bg-[#e5e5e5] text-[#666666]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className="text-base font-medium text-[#202020] mb-1"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {fact.title}
                    </h3>
                    <p
                      className="text-xs text-[#666666]"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {fact.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 pt-6 border-t border-[#e5e5e5]"
          >
            <div className="bg-[#156d95]/5 rounded-xl p-4 border border-[#156d95]/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#156d95] text-white flex items-center justify-center font-bold text-sm">
                  !
                </div>
                <div>
                  <h4
                    className="text-base font-medium text-[#202020] mb-1"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    Submit Your Idea in Any Format
                  </h4>
                  <p
                    className="text-sm text-[#666666]"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    Submit a <strong className="text-[#202020]">1-page document</strong> (PDF or Google Doc). 
                    Simple, accessible format that lets your ideas shine.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
