"use client"

import { motion } from "framer-motion"

export const DivisionsSection = () => {
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
            Fair Competition for Everyone
          </h2>
          <p
            className="text-base sm:text-lg leading-6 sm:leading-7 text-[#666666] max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
            }}
          >
            <strong className="text-[#202020]">Two divisions</strong> mean you compete with peers at your level. <strong className="text-[#202020]">Separate judging</strong> ensures fairness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-[#e5e5e5] bg-white hover:shadow-lg transition-shadow"
          >
            <h3
              className="text-xl sm:text-2xl font-medium text-[#202020] mb-3 sm:mb-4"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Junior Division
            </h3>
            <div className="space-y-3 mb-6">
              <p
                className="text-lg text-[#666666]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                <strong className="text-[#202020]">Grades 6–8</strong>
              </p>
              <p
                className="text-base text-[#666666]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                Age-appropriate judging · Focus on creativity and clarity
              </p>
            </div>
            <p
              className="text-sm text-[#666666]"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Judged separately from Open Division with emphasis on creative thinking and clear communication of ideas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-2xl border border-[#e5e5e5] bg-white hover:shadow-lg transition-shadow"
          >
            <h3
              className="text-2xl font-medium text-[#202020] mb-4"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Open Division
            </h3>
            <div className="space-y-3 mb-6">
              <p
                className="text-lg text-[#666666]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                <strong className="text-[#202020]">Grades 9–12</strong>
              </p>
              <p
                className="text-base text-[#666666]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                Deeper analysis encouraged · Same prompts, separate judging
              </p>
            </div>
            <p
              className="text-sm text-[#666666]"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Same challenge tracks as Junior Division, but with separate judging that encourages deeper analysis and critical thinking.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
