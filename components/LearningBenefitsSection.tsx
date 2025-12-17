"use client"

import { motion } from "framer-motion"
import { Brain, FileText, Users, Award, Globe, TrendingUp } from "lucide-react"

export const LearningBenefitsSection = () => {
  const benefits = [
    {
      icon: Brain,
      title: "Develop Critical Thinking",
      description: "Tackle real-world problems and learn to think analytically about complex challenges.",
    },
    {
      icon: FileText,
      title: "Build Your Portfolio",
      description: "Add a global competition participation to your resume, college applications, and portfolio.",
    },
    {
      icon: Users,
      title: "Join a Global Community",
      description: "Connect with students worldwide who share your passion for innovation and problem-solving.",
    },
    {
      icon: TrendingUp,
      title: "Gain Real-World Skills",
      description: "Practice communication, research, and creative problem-solving—skills valued by colleges and employers.",
    },
    {
      icon: Award,
      title: "Earn Recognition",
      description: "Receive a certificate and potentially be featured in our global showcase, visible to educators and organizations.",
    },
    {
      icon: Globe,
      title: "Make an Impact",
      description: "Your ideas could inspire real change. Top submissions are featured publicly and shared with relevant organizations.",
    },
  ]

  return (
    <section className="w-full py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2
            className="text-2xl sm:text-3xl lg:text-[40px] leading-tight font-normal text-[#202020] mb-3 sm:mb-4 tracking-tight"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: "400",
            }}
          >
            Why This Changes Everything
          </h2>
          <p
            className="text-base sm:text-lg leading-6 sm:leading-7 text-[#666666] max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            Win <strong className="text-[#202020]">national & international awards</strong>. 
            Get <strong className="text-[#202020]">expert mentorship</strong>. 
            Featured in <strong className="text-[#202020]">global showcase</strong>. 
            <strong className="text-[#202020]"> Boost your portfolio</strong> with recognition that makes colleges notice you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#fafafa] border border-[#e5e5e5] hover:border-[#156d95]/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#156d95] text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-medium text-[#202020] mb-2"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {benefit.title}
                    </h3>
                    <p
                      className="text-sm text-[#666666]"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {benefit.description}
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="inline-block bg-[#156d95]/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#156d95]/20 max-w-3xl">
            <p
              className="text-base sm:text-lg leading-6 sm:leading-7 text-[#202020] mb-4"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              <strong>This isn't just a competition—it's an opportunity to grow.</strong> Whether you win a prize or not, you'll walk away with valuable skills, a certificate of participation, and the confidence that comes from sharing your ideas with the world.
            </p>
            <p
              className="text-sm sm:text-base text-[#666666]"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Perfect for college applications, portfolio building, and personal development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

