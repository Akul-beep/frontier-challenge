import type React from "react"
import type { Metadata } from "next"
import { Figtree, Inter, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "Frontier Challenge",
  description: "Submit by December 27th. Win national & international awards. Get mentorship from Princeton freshman & Diamond Challenge finalist. Featured in global showcase. Free to participate. Perfect for portfolio building.",
  generator: "Next.js",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
    shortcut: "/logo.jpeg",
  },
  openGraph: {
    title: "Frontier Challenge",
    description: "Submit by December 27th. Win national & international awards. Get Ivy League mentorship. Featured in global showcase. Free to participate.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${figtree.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
