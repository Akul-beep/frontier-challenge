"use client"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

type FooterLink = {
  label: string
  href: string
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

type FooterProps = {
  companyName?: string
  tagline?: string
  sections?: FooterSection[]
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    email?: string
  }
  copyrightText?: string
}

const defaultSections: FooterSection[] = [
  {
    title: "Challenge",
    links: [
      { label: "Tracks", href: "/#tracks" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Divisions", href: "/divisions" },
      { label: "Timeline", href: "/timeline" },
      { label: "Prizes", href: "/#prizes" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Judging Criteria", href: "/judging" },
      { label: "Support & Resources", href: "/support" },
      { label: "Registration", href: "/#prizes" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Rules & Guidelines", href: "#rules" },
    ],
  },
]

export const Footer = ({
  companyName = "Frontier Challenge",
  tagline = "A global competition recognizing innovative ideas from students worldwide.",
  sections = defaultSections,
  socialLinks = {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "hello@globalideaschallenge.com",
  },
  copyrightText,
}: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const copyright = copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`
  return (
    <footer className="w-full bg-[#fafafa] border-t border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="col-span-2"
          >
            <div className="mb-4">
              <h3
                className="text-2xl font-semibold text-[#202020] mb-2"
                style={{ fontFamily: "Figtree", fontWeight: "500" }}
              >
                {companyName}
              </h3>
              <p className="text-sm leading-5 text-[#666666] max-w-xs" style={{ fontFamily: "Figtree" }}>
                {tagline}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#202020] hover:border-[#202020] transition-colors duration-150"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#202020] hover:border-[#202020] transition-colors duration-150"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#202020] hover:border-[#202020] transition-colors duration-150"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#202020] hover:border-[#202020] transition-colors duration-150"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="col-span-1"
            >
              <h4
                className="text-sm font-medium text-[#202020] mb-4 uppercase tracking-wide"
                style={{ fontFamily: "Figtree", fontWeight: "500" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className="text-sm text-[#666666] hover:text-[#202020] transition-colors duration-150"
                        style={{ fontFamily: "Figtree" }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-[#666666] hover:text-[#202020] transition-colors duration-150"
                        style={{ fontFamily: "Figtree" }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-8 border-t border-[#e5e5e5]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#666666]" style={{ fontFamily: "Figtree" }}>
              {copyright}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#status"
                className="text-sm text-[#666666] hover:text-[#202020] transition-colors duration-150"
                style={{ fontFamily: "Figtree" }}
              >
                Status
              </a>
              <a
                href="#sitemap"
                className="text-sm text-[#666666] hover:text-[#202020] transition-colors duration-150"
                style={{ fontFamily: "Figtree" }}
              >
                Sitemap
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
