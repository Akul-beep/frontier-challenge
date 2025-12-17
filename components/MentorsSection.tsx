"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award, Sparkles, Star, Calendar, ArrowRight, ZoomIn } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export const MentorsSection = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; description: string } | null>(null)

  const mentors = [
    {
      name: "Srina Bose",
      role: "Princeton Freshman",
      bio: "Currently a freshman at Princeton University studying <strong>Sociology, South Asian Studies, and Creative Arts</strong>. <strong>Srina</strong> brings firsthand experience navigating the college application process and understanding what makes students stand out. She can help you make your competition wins stand out on your applications and explain <strong>why this matters for your future</strong>.",
      icon: GraduationCap,
      highlight: "Princeton University",
      credential: "Ivy League",
      achievements: [],
    },
    {
      name: "Yashi Garg",
      role: "Diamond Challenge Finalist",
      bio: "As a <strong>Diamond Challenge finalist</strong>, Yashi has <strong>won numerous pitch competitions</strong> and <strong>secured funding from VCs</strong>. She knows exactly what it takes to create winning competition entries, develop compelling ideas, craft strong pitches, and build portfolios that open doors to top universities.",
      icon: Award,
      highlight: "Diamond Challenge Finalist",
      credential: "Award Winner",
      achievements: [
        {
          src: "/yashi-diamond-challenge.jpg",
          title: "Diamond Challenge Finalist",
          description: "Finalist in the prestigious Diamond Challenge, showcasing excellence in entrepreneurship and innovation.",
        },
        {
          src: "/yashi-certificate.jpg",
          title: "Award Winner",
          description: "Winner of multiple pitch competitions and recipient of VC funding for innovative projects.",
        },
      ],
    },
  ]

  return (
    <>
      <section id="mentors" className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#156d95]/5 via-white to-[#156d95]/5 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#156d95]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#156d95]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium border border-[#156d95]/20">
              <Star className="w-4 h-4 fill-[#156d95]" />
              <span>Limited Spots Available</span>
            </div>
            
            <h2
              className="text-3xl sm:text-4xl lg:text-[52px] leading-tight font-bold text-[#202020] mb-4 sm:mb-6 tracking-tight"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: 700,
              }}
            >
              Get Exclusive Mentorship from{" "}
              <span className="text-[#156d95]">Ivy League & Award Winners</span>
            </h2>
            <p
              className="text-lg sm:text-xl leading-7 text-[#666666] max-w-3xl mx-auto mb-2"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Learn from <strong className="text-[#202020] font-semibold text-xl">Princeton freshman & Diamond Challenge finalist</strong> who've successfully navigated competitions and college applications.
            </p>
            <p
              className="text-base sm:text-lg leading-6 text-[#156d95] font-semibold"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              ⚡ Limited spots available—first come, first served!
            </p>
          </motion.div>

          {/* Mentor Cards - Side-by-side layout for wider cards */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto mb-8">
            {mentors.map((mentor, index) => {
              const Icon = mentor.icon
              const isYashi = mentor.name === "Yashi Garg"
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="relative rounded-2xl bg-white border-2 border-[#156d95]/20 hover:border-[#156d95] shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Credential Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1 rounded-full bg-[#156d95] text-white text-xs font-semibold shadow-lg">
                      {mentor.credential}
                    </div>
                  </div>

                  {/* Content Layout: Side by side for wider cards */}
                  <div className="flex flex-col md:flex-row">
                    {/* Left: Achievement Images (for Yashi only) */}
                    {isYashi && mentor.achievements && mentor.achievements.length > 0 ? (
                      <div className="md:w-2/5 p-4 sm:p-6 flex items-center justify-center bg-gradient-to-br from-[#156d95]/5 to-transparent">
                        <div className="flex flex-col gap-3 w-full">
                          {mentor.achievements.map((achievement, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              className="relative group cursor-pointer"
                              onClick={() => setSelectedImage(achievement)}
                            >
                              <div className="relative rounded-lg border-2 border-white shadow-xl bg-gray-100 overflow-hidden aspect-square">
                                <img
                                  src={achievement.src}
                                  alt={achievement.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.style.display = 'none'
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Right: Text Content */}
                    <div className={isYashi && mentor.achievements && mentor.achievements.length > 0 ? "md:w-3/5 p-4 sm:p-6 flex flex-col justify-center" : "w-full p-4 sm:p-6 flex flex-col justify-center"}>
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#156d95] to-[#0f5a7a] text-white flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-xl sm:text-2xl font-bold text-[#202020] mb-1"
                            style={{
                              fontFamily: "var(--font-figtree), Figtree",
                              fontWeight: 700,
                            }}
                          >
                            {mentor.name}
                          </h3>
                          <p
                            className="text-sm sm:text-base text-[#156d95] font-semibold mb-3"
                            style={{
                              fontFamily: "var(--font-figtree), Figtree",
                            }}
                          >
                            {mentor.role}
                          </p>
                          <p
                            className="text-sm sm:text-base leading-6 text-[#666666] [&_strong]:text-[#202020] [&_strong]:font-semibold"
                            style={{
                              fontFamily: "var(--font-figtree), Figtree",
                            }}
                            dangerouslySetInnerHTML={{ __html: mentor.bio }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* How Mentorship Works - Condensed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-br from-[#156d95]/10 to-white rounded-2xl p-6 sm:p-8 border-2 border-[#156d95]/30 max-w-4xl shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#156d95] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold text-[#202020]"
                  style={{
                    fontFamily: "var(--font-figtree), Figtree",
                  }}
                >
                  How Mentorship Works
                </h3>
              </div>
              <div className="text-sm sm:text-base text-[#666666] leading-6 mb-4" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                <p>
                  <strong className="text-[#202020] font-semibold">Combined mentorship session</strong> on <strong className="text-[#156d95] font-semibold">Tuesday, December 23rd</strong>. Timing will be shared soon. Mentors provide feedback on ideas, help refine approaches, and share insights. <strong className="text-[#156d95]">Limited spots—first come, first served.</strong> Additional participants receive written feedback.
                </p>
              </div>
              
              <Link
                href="#qualification"
                className="inline-flex items-center gap-2 bg-[#156d95] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-lg"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Secure Your Spot
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievement Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-2xl">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#202020]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  {selectedImage.title}
                </DialogTitle>
                <DialogDescription className="text-base text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  {selectedImage.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg border border-[#e5e5e5] shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg"
                  }}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
