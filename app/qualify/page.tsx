"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { QualificationForm } from "@/components/QualificationForm"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function QualifyPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [hasQualification, setHasQualification] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const { data: { user: userData } } = await supabase.auth.getUser()
      setUser(userData || null)

      // Check if user already completed qualification
      if (userData) {
        try {
          const { data: qualification } = await supabase
            .from("qualifications")
            .select("*")
            .eq("user_id", userData.id)
            .maybeSingle()

          if (qualification) {
            setHasQualification(true)
            router.push("/submit")
            return
          }
        } catch (qualError) {
          // Table might not exist yet, continue
          console.log('Checking qualification...')
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = () => {
    if (user) {
      // User is logged in, go directly to submit
      router.push("/submit")
    } else {
      // User not logged in, prompt signup
      router.push("/login?redirect=/submit&qualification_complete=true")
    }
  }

  if (loading) {
    return (
      <>
        <PortfolioNavbar />
        <div className="min-h-screen bg-background pt-20 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#156d95]" />
        </div>
        <Footer />
      </>
    )
  }

  if (hasQualification) {
    return null // Will redirect
  }

  return (
    <>
      <PortfolioNavbar />
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto">
          <QualificationForm 
            userId={user?.id} 
            onComplete={handleComplete}
            saveLocally={true}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

