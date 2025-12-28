"use client"

import { motion } from "framer-motion"

export const TimelineSection = () => {
  const timelineItems = [
    {
      title: "Qualification Round",
      date: "Available Now",
      description: "Complete the free qualification round by answering 5 quick questions (takes less than 2 minutes). Once you pass, you're a participant and can submit your 1-page idea. 100% free, no credit card required.",
    },
    {
      title: "Submit Your 1-Page Idea",
      date: "By January 15",
      description: "After passing qualification, submit your 1-page document answering your chosen track's prompt. Work on your own schedule—submit anytime before January 15th.",
    },
    {
      title: "Results & Top 20–30 Selected",
      date: "By January 4",
      description: "Judges review all submissions. Everyone who submitted receives a certificate. The top 20–30 ideas are selected and advance to an exclusive final round where they submit a 2-minute pitch video, with enhanced mentorship opportunities.",
    },
    {
      title: "Final Round",
      date: "By January 11",
      description: "Top 20–30 participants advance to final round. Submit a 2-minute pitch video. Enhanced mentorship, additional recognition opportunities, and priority showcase placement.",
    },
    {
      title: "Winners Announced",
      date: "Saturday, January 17",
      description: "Final winners and special awards (Best Overall, Most Innovative, Best Pitch) are announced by Saturday, January 17.",
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
            Important Dates
          </h2>
          <p
            className="text-base sm:text-lg leading-6 sm:leading-7 text-[#666666] max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            <strong className="text-[#202020]">Submit by January 15th.</strong> Don't miss your chance to win national & international awards and get expert mentorship.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-[#e5e5e5] hidden md:block" />
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-4 sm:gap-6 lg:gap-8"
                >
                  <div className="flex-shrink-0 hidden md:block">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#156d95] text-white flex items-center justify-center font-figtree font-medium text-base lg:text-lg relative z-10">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 pt-0 sm:pt-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-1.5 sm:gap-2 mb-2">
                      <h3
                        className="text-lg sm:text-xl font-medium text-[#202020]"
                        style={{
                          fontFamily: "var(--font-figtree), Figtree",
                        }}
                      >
                        {item.title}
                      </h3>
                      <span
                        className="text-sm sm:text-base text-[#156d95] font-medium"
                        style={{
                          fontFamily: "var(--font-figtree), Figtree",
                        }}
                      >
                        {item.date}
                      </span>
                    </div>
                    <p
                      className="text-sm sm:text-base text-[#666666]"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
