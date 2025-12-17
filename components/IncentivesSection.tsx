"use client"

import { motion } from "framer-motion"
import { DollarSign, Users, Award, Badge, Sparkles } from "lucide-react"
import Link from "next/link"

export function IncentivesSection() {
  const incentives = [
    {
      icon: DollarSign,
      title: "Cash Prizes",
      description: "Win real money",
      highlight: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: Users,
      title: "Elite Mentorship",
      description: "Princeton & Diamond Challenge",
      highlight: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: Award,
      title: "Global Awards",
      description: "National & international recognition",
      highlight: true,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      icon: Badge,
      title: "Certificate",
      description: "Everyone who submits gets one",
      highlight: false,
      color: "text-[#156d95]",
      bgColor: "bg-[#156d95]/5",
      borderColor: "border-[#156d95]/20",
    },
  ]

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-[#156d95]/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>What You Get</span>
          </div>
          
          <h2
            className="text-3xl sm:text-4xl lg:text-[48px] leading-tight font-medium text-[#202020] mb-4 tracking-tight"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: 500,
            }}
          >
            Why Join the Challenge?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {incentives.map((incentive, index) => {
            const Icon = incentive.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border-2 ${
                  incentive.highlight
                    ? `${incentive.borderColor} ${incentive.bgColor} shadow-lg`
                    : "border-[#e5e5e5] bg-white shadow-sm"
                } hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                {incentive.highlight && (
                  <div className="absolute -top-2 -right-2 bg-[#156d95] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    HOT
                  </div>
                )}
                
                <div className={`w-12 h-12 rounded-full ${incentive.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${incentive.color}`} />
                </div>
                
                <h3
                  className={`text-xl font-bold mb-2 ${
                    incentive.highlight ? "text-[#202020]" : "text-[#202020]"
                  }`}
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {incentive.title}
                </h3>
                
                <p
                  className="text-sm text-[#666666] leading-relaxed"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {incentive.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="#qualification"
            className="group inline-flex items-center gap-3 bg-[#156d95] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Claim Your Spot Now
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

