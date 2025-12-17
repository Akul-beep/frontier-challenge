"use client"

import { useEffect, Suspense } from "react"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { RegistrationBanner } from "@/components/RegistrationBanner"
import { ProductTeaserCard } from "@/components/ProductTeaserCard"
import { BankingScaleHero } from "@/components/BankingScaleHero"
import PricingSection from "@/components/PricingSection"
import { MentorsSection } from "@/components/MentorsSection"
import { CaseStudiesCarousel } from "@/components/CaseStudiesCarousel"
import { IntegrationCarousel } from "@/components/IntegrationCarousel"
import { CareerBenefitsSection } from "@/components/CareerBenefitsSection"
import { SocialProofSection } from "@/components/SocialProofSection"
import { FinalCTASection } from "@/components/FinalCTASection"
import { HomeQualificationSection } from "@/components/HomeQualificationSection"
import { Footer } from "@/components/Footer"
import Link from "next/link"

function HomePageContent() {
  useEffect(() => {
    // Handle anchor links from navigation
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }, 300) // Small delay to ensure page is rendered
    }
  }, [])

  return (
    <>
      <PortfolioNavbar />
      <div className="pt-16 sm:pt-20">
        <RegistrationBanner />
      </div>
      <div className="min-h-screen flex flex-col justify-start">
        <ProductTeaserCard />
        <BankingScaleHero />
      </div>
      
      {/* SECTION B: Qualification - IMMEDIATELY after hero for conversion */}
      <HomeQualificationSection />
      
      {/* PRIORITIZE: Awards section - what students want most */}
      <div id="prizes">
        <PricingSection />
      </div>
      
      {/* Mentors section - Moved higher up, right after prizes */}
      <MentorsSection />
      
      {/* Tracks */}
      <div id="tracks">
        <CaseStudiesCarousel />
      </div>
      
      {/* How It Works */}
      <div id="how-it-works">
        <IntegrationCarousel />
      </div>
      {/* Career Benefits - Addresses 15.80% motivator */}
      <CareerBenefitsSection />
      <SocialProofSection />
      {/* Important Dates - Simplified & Compelling with Countdown */}
      <div id="important-dates" className="w-full py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#156d95]/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl lg:text-[48px] leading-tight font-medium text-[#202020] mb-4 sm:mb-6 tracking-tight"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
                fontWeight: 500,
              }}
            >
              Important Dates
            </h2>
            <p
              className="text-lg sm:text-xl text-[#666666] max-w-2xl mx-auto"
              style={{
                fontFamily: "var(--font-figtree), Figtree",
              }}
            >
              Mark your calendar. Work at your own pace. Submit by December 27th.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border-2 border-[#156d95] shadow-lg text-center">
              <div className="text-sm text-[#666666] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Submission Deadline
              </div>
              <div className="text-3xl font-bold text-[#156d95] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                December 27
              </div>
              <div className="text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Submit your 1-page idea
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e5e5] shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-sm text-[#666666] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Results & Top 20–30
              </div>
              <div className="text-3xl font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                By January 4
              </div>
              <div className="text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Certificates for everyone
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e5e5] shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-sm text-[#666666] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Final Round (Top 20–30)
              </div>
              <div className="text-3xl font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                By January 11
              </div>
              <div className="text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Submit 2-minute pitch video & mentorship
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#e5e5e5] shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="text-sm text-[#666666] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Winners Announced
              </div>
              <div className="text-3xl font-bold text-[#202020] mb-2" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                January 17
              </div>
              <div className="text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                Cash prizes & recognition
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/timeline"
              className="inline-block text-[#156d95] hover:text-[#156d95]/80 font-medium text-sm"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              View detailed timeline →
            </Link>
          </div>
        </div>
      </div>
      <FinalCTASection />
      <Footer />
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <>
        <PortfolioNavbar />
        <div className="min-h-screen bg-background pt-20 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-[#156d95]">Loading...</div>
        </div>
        <Footer />
      </>
    }>
      <HomePageContent />
    </Suspense>
  )
}
