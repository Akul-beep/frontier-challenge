"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { GraduationCap, Briefcase, FileText, Award, ArrowRight } from "lucide-react"

export const CareerBenefitsSection = () => {
  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fafafa] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-[48px] leading-tight font-medium text-[#202020] mb-4 sm:mb-6 tracking-tight"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              fontWeight: 500,
            }}
          >
            Build Your Portfolio.
            <br />
            <span className="text-[#156d95]">Stand Out to Colleges.</span>
          </h2>
          <p
            className="text-lg sm:text-xl leading-7 text-[#666666] max-w-3xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            Whether you're in 6th grade or 12th grade, this competition helps you stand out. 
            Add global recognition to your applications, build your portfolio, and show what you're capable of.
          </p>
        </div>

        {/* Simplified Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-white border border-[#e5e5e5] hover:border-[#156d95]/30 hover:shadow-lg transition-all text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#156d95]/10 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-[#156d95]" />
            </div>
            <h3
              className="text-lg font-semibold text-[#202020] mb-2"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              College Applications
            </h3>
            <p
              className="text-sm text-[#666666] leading-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Perfect for 9th–12th graders. Add global competition to your applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-2xl bg-white border border-[#e5e5e5] hover:border-[#156d95]/30 hover:shadow-lg transition-all text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#156d95]/10 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-[#156d95]" />
            </div>
            <h3
              className="text-lg font-semibold text-[#202020] mb-2"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Build Portfolio
            </h3>
            <p
              className="text-sm text-[#666666] leading-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Start building your profile early. Great for 6th–8th graders too.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-2xl bg-white border border-[#e5e5e5] hover:border-[#156d95]/30 hover:shadow-lg transition-all text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#156d95]/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-[#156d95]" />
            </div>
            <h3
              className="text-lg font-semibold text-[#202020] mb-2"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Certificate for All
            </h3>
            <p
              className="text-sm text-[#666666] leading-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Everyone who submits gets a certificate for their portfolio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl bg-white border border-[#e5e5e5] hover:border-[#156d95]/30 hover:shadow-lg transition-all text-center"
          >
            <div className="w-12 h-12 rounded-full bg-[#156d95]/10 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-[#156d95]" />
            </div>
            <h3
              className="text-lg font-semibold text-[#202020] mb-2"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Global Recognition
            </h3>
            <p
              className="text-sm text-[#666666] leading-6"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Top submissions featured in showcase visible worldwide.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="#qualification"
            className="group inline-flex items-center gap-3 bg-[#156d95] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#156d95]/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            Start Building Your Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
