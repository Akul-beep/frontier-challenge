"use client"

import { motion } from "framer-motion"
import { HelpCircle, BookOpen, MessageCircle, FileText, Video, Users } from "lucide-react"

export const SupportResourcesSection = () => {
  const resources = [
    {
      icon: HelpCircle,
      title: "FAQ & Help Center",
      description: "Find answers to common questions about registration, submission, and judging.",
      available: "Available now",
    },
    {
      icon: BookOpen,
      title: "Submission Guidelines",
      description: "Detailed instructions on how to format your written or video submission for best results.",
      available: "After registration",
    },
    {
      icon: MessageCircle,
      title: "Email Support",
      description: "Have a question? Our team is here to help. Email us anytime during the challenge period.",
      available: "Available throughout",
    },
    {
      icon: FileText,
      title: "Example Submissions",
      description: "See examples of strong submissions from past competitions to guide your work.",
      available: "After registration",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch short tutorials on how to develop and present your idea effectively.",
      available: "After registration",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other participants, share ideas, and get feedback (optional participation).",
      available: "During challenge",
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
            Support & Resources
          </h2>
          <p
            className="text-base sm:text-lg leading-6 sm:leading-7 text-[#666666] max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            You're not alone in this challenge. We provide <strong className="text-[#202020]">comprehensive support and resources</strong> to help you succeed, from registration through submission.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#fafafa] border border-[#e5e5e5] hover:border-[#156d95]/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#156d95] text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg font-medium text-[#202020] mb-2"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {resource.title}
                    </h3>
                    <p
                      className="text-sm text-[#666666] mb-3"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {resource.description}
                    </p>
                    <span
                      className="inline-block text-xs font-medium text-[#156d95] bg-[#156d95]/10 px-3 py-1 rounded-full"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    >
                      {resource.available}
                    </span>
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
          className="bg-[#156d95]/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#156d95]/20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#156d95] text-white flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3
                className="text-xl font-medium text-[#202020] mb-2"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                Need Help? We're Here for You
              </h3>
              <p
                className="text-sm sm:text-base text-[#666666]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                Don't hesitate to reach out if you have questions or need assistance. Our support team is available throughout the challenge period to help you succeed. Email us at{" "}
                <a href="mailto:support@globalideaschallenge.com" className="text-[#156d95] hover:underline font-medium">
                  support@globalideaschallenge.com
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

