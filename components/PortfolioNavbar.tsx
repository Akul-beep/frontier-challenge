"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
const mainNavigationLinks = [
  {
    name: "Prizes",
    href: "#prizes",
  },
  {
    name: "Tracks",
    href: "#tracks",
  },
  {
    name: "Mentors",
    href: "#mentors",
  },
  {
    name: "Become an Ambassador",
    href: "/ambassador",
    highlight: true,
  },
] as any[]

const moreNavigationLinks = [
  {
    name: "How It Works",
    href: "#how-it-works",
  },
  {
    name: "Important Dates",
    href: "#important-dates",
  },
] as any[]

// @component: PortfolioNavbar
export const PortfolioNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const moreMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkUser()
  }, [])

  // Close more menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function checkUser() {
    const { data: { user: userData } } = await supabase.auth.getUser()
    setUser(userData)
  }
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  const handleLinkClick = (href: string) => {
    closeMobileMenu()
    if (href.startsWith("/")) {
      window.location.href = href
      return
    }
    if (href === "#home" || href === "/") {
      window.location.href = "/"
      return
    }
    // For anchor links, navigate to home first if not already there
    if (href.startsWith("#")) {
      const currentPath = window.location.pathname
      if (currentPath !== "/") {
        // Navigate to home with anchor, then scroll
        window.location.href = `/${href}`
        return
      }
      // We're on home page, scroll to element
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }, 100)
    }
  }

  // @return
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              <img
                src="/logo.jpeg"
                alt="Frontier Challenge Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-lg"
              />
              <span
                className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-figtree), Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontWeight: "700",
                  letterSpacing: "-0.02em",
                }}
              >
                Frontier Challenge
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <div className="ml-6 lg:ml-10 flex items-baseline space-x-4 lg:space-x-6">
              {mainNavigationLinks.map((link) => {
                if (link.href.startsWith("/")) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-2 lg:px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 relative group ${
                        link.highlight 
                          ? 'text-[#156d95] hover:text-[#156d95]/80 font-semibold' 
                          : 'text-foreground hover:text-primary'
                      }`}
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontWeight: link.highlight ? "600" : "400",
                      }}
                    >
                      <span>{link.name}</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                    </Link>
                  )
                }
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`px-2 lg:px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 relative group ${
                      link.highlight 
                        ? 'text-[#156d95] hover:text-[#156d95]/80 font-semibold' 
                        : 'text-foreground hover:text-primary'
                    }`}
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: link.highlight ? "600" : "400",
                    }}
                  >
                    <span>{link.name}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                  </button>
                )
              })}
              
              {/* More Menu Dropdown */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                  onMouseEnter={() => setIsMoreMenuOpen(true)}
                  className="text-foreground hover:text-primary px-2 lg:px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 relative group flex items-center gap-1"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  <span>More</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                <AnimatePresence>
                  {isMoreMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setIsMoreMenuOpen(false)}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50"
                    >
                      {moreNavigationLinks.map((link) => (
                        link.href.startsWith("/") ? (
                          <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMoreMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                            style={{
                              fontFamily: "Figtree, sans-serif",
                            }}
                          >
                            {link.name}
                          </Link>
                        ) : (
                          <button
                            key={link.name}
                            onClick={() => {
                              handleLinkClick(link.href)
                              setIsMoreMenuOpen(false)
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors"
                            style={{
                              fontFamily: "Figtree, sans-serif",
                            }}
                          >
                            {link.name}
                          </button>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontWeight: "400",
                }}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-foreground hover:text-primary px-4 py-2 text-sm lg:text-base font-medium transition-colors duration-200 border border-border rounded-full hover:bg-accent/50"
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontWeight: "500",
                }}
              >
                Login
              </Link>
            )}
            <Link
              href="/qualify"
              className="bg-[#156d95] text-white px-4 lg:px-[18px] rounded-full text-sm lg:text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200 hover:rounded-2xl shadow-sm hover:shadow-md whitespace-nowrap leading-4 py-2.5 lg:py-[15px]"
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              <span
                style={{
                  fontFamily: "Figtree",
                  fontWeight: "500",
                }}
              >
                Register Free
              </span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-6 py-6 space-y-4">
              {mainNavigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  <span>{link.name}</span>
                </button>
              ))}
              {moreNavigationLinks.map((link) => (
                link.href.startsWith("/") ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    <span>{link.name}</span>
                  </a>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    <span>{link.name}</span>
                  </button>
                )
              ))}
              <div className="pt-4 border-t border-border space-y-3">
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={closeMobileMenu}
                    className="block w-full text-left text-foreground hover:text-primary py-3 text-lg font-medium transition-colors duration-200"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: "400",
                    }}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center text-foreground hover:text-primary py-3 px-4 text-base font-medium transition-colors duration-200 border border-border rounded-full hover:bg-accent/50"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontWeight: "500",
                    }}
                  >
                    Login
                  </Link>
                )}
                <Link
                  href="/qualify"
                  onClick={closeMobileMenu}
                  className="block w-full bg-[#156d95] text-white px-[18px] py-[15px] rounded-full text-base font-semibold hover:bg-[#156d95]/90 transition-all duration-200 text-center"
                  style={{
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  Register Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
