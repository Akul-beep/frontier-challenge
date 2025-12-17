import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { TimelineSection } from "@/components/TimelineSection"
import { Footer } from "@/components/Footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TimelinePage() {
  return (
    <>
      <PortfolioNavbar />
      <div className="pt-16 sm:pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#156d95] hover:text-[#156d95]/80 mb-8 transition-colors"
            style={{ fontFamily: "var(--font-figtree), Figtree" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        <TimelineSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-[#156d95] text-white px-6 py-3 rounded-full font-figtree text-base hover:rounded-2xl transition-all duration-150 shadow-sm hover:shadow-md"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


