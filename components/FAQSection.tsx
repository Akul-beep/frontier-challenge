"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
type FAQItem = {
  question: string
  answer: string
}
type FAQSectionProps = {
  title?: string
  faqs?: FAQItem[]
}
const defaultFAQs: FAQItem[] = [
  {
    question: "Who can participate in the Frontier Challenge?",
    answer:
      "The challenge is open to students in Grades 6–12 worldwide. There are two divisions: Junior Division (Grades 6–8) and Open Division (Grades 9–12). Each division is judged separately to ensure fair competition.",
  },
  {
    question: "Do I need coding experience or a team to participate?",
    answer:
      "No coding experience or teams are required. This is an idea-based challenge where you submit a 1-page written document (PDF or Google Doc). The focus is on creativity, clarity, and innovative thinking, not technical skills.",
  },
  {
    question: "How do I submit my idea?",
    answer:
      "Submit your idea as a 1-page written document (PDF or Google Doc link). Submissions are due by December 27th. Detailed submission instructions will be provided after registration.",
  },
  {
    question: "What are the prizes and recognition?",
    answer:
      "All participants receive a certificate. The top ideas are recognized with prizes: $50 for Best Overall, $30 for Most Innovative, and $20 for People's Choice (selected by public voting). Top submissions are also featured in a public online showcase. Separate winners are selected for Junior and Open Divisions.",
  },
  {
    question: "When is the submission deadline?",
    answer:
      "Submit your idea anytime before December 27th. Work on your own schedule—no rush, no pressure. After you register, you'll have time to develop and refine your idea. Results and the showcase are published within 48 hours after the submission deadline.",
  },
  {
    question: "Can I participate if I'm not in the United States?",
    answer:
      "Yes! The Frontier Challenge is open to students worldwide in Grades 6–12. We welcome participants from all countries and backgrounds.",
  },
  {
    question: "How are submissions judged?",
    answer:
      "Submissions are evaluated on four criteria: Creativity & Originality (30%), Impact & Feasibility (30%), Clarity & Communication (25%), and Completeness (15%). All submissions are judged using the same criteria. Junior and Open Divisions are judged separately by experienced educators and professionals. See our 'How Submissions Are Judged' section for detailed information.",
  },
  {
    question: "What if I need help during the challenge?",
    answer:
      "We provide comprehensive support throughout the challenge. You can access our FAQ, submission guidelines, example submissions, video tutorials, and email support. Our team is available to answer questions and help you succeed. Check the 'Support & Resources' section for all available help.",
  },
  {
    question: "What do I gain from participating beyond prizes?",
    answer:
      "Beyond prizes, you'll develop critical thinking and problem-solving skills, build your portfolio with a global competition participation, earn a certificate for your resume and college applications, join a global community of innovators, and potentially be featured in our public showcase. The experience itself is valuable for personal growth and future opportunities.",
  },
]
export const FAQSection = ({ title = "Frequently Asked Questions", faqs = defaultFAQs }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  return (
    <section className="w-full py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <h2
              className="text-2xl sm:text-3xl lg:text-[40px] leading-tight font-normal text-[#202020] tracking-tight sticky top-20 sm:top-24"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: "400",
              }}
            >
              {title}
            </h2>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className="text-lg leading-7 text-[#202020] pr-8"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                        fontWeight: "400",
                      }}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-6 h-6 text-[#202020]" strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-12">
                          <p
                            className="text-lg leading-6 text-[#666666]"
                            style={{
                              fontFamily: "var(--font-figtree), Figtree",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
