"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Quote, Star } from "lucide-react"

export const SocialProofSection = () => {
  const testimonials = [
    {
      quote: "I'm excited to participate in a competition that values ideas over technical skills. The mentorship from Princeton and Diamond Challenge finalists is exactly what I need.",
      author: "Sarah Chen",
      location: "Grade 10",
      division: "Open Division",
    },
    {
      quote: "The fact that everyone gets a certificate makes this accessible. I can focus on my idea without worrying about complex requirements.",
      author: "Marcus Johnson",
      location: "Grade 8",
      division: "Junior Division",
    },
    {
      quote: "This is perfect for building my portfolio. National recognition and mentorship opportunities are exactly what I'm looking for.",
      author: "Priya Patel",
      location: "Grade 11",
      division: "Open Division",
    },
  ]

  const stats = [
    { value: "40+", label: "Countries participating" },
    { value: "Hundreds", label: "Students worldwide" },
    { value: "Top 20–30", label: "Advance to exclusive final round" },
    { value: "100%", label: "Receive certificates" },
  ]

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#156d95]/5 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2
            className="text-2xl sm:text-3xl lg:text-[40px] leading-tight font-bold text-[#202020] mb-3 sm:mb-4 tracking-tight"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: 700,
            }}
          >
            Why Students Worldwide Are Excited
          </h2>
          <p
            className="text-base sm:text-lg leading-6 sm:leading-7 text-[#666666] max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            <strong className="text-[#202020]">Hundreds of students from 40+ countries</strong> are participating in this prestigious competition. Showcase your ideas and get mentorship from top performers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 sm:p-6 rounded-xl bg-white border border-[#e5e5e5]"
            >
              <div
                className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#156d95] mb-2"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs sm:text-sm text-[#666666]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aspirational testimonials for first launch */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white border border-[#e5e5e5] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#156d95] text-[#156d95]" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-[#156d95]/30 mb-4" />
              <p
                className="text-sm sm:text-base text-[#666666] mb-6 leading-6"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                "{testimonial.quote}"
              </p>
              <div>
                <div
                  className="text-sm font-medium text-[#202020] mb-1"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  {testimonial.author}
                </div>
                <div
                  className="text-xs text-[#666666]"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  {testimonial.location} • {testimonial.division}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <Link
            href="#qualification"
            className="inline-block bg-[#156d95] text-white px-[18px] py-[15px] rounded-full font-figtree text-lg hover:rounded-2xl transition-all duration-150 shadow-sm hover:shadow-md"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            Start Qualification →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

