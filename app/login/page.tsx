"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { createClient } from "@/lib/supabase/client"
import { Loader2, LogIn } from "lucide-react"
import Link from "next/link"
import { analytics } from "@/lib/analytics"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const [fullName, setFullName] = useState("")

  const redirect = searchParams.get("redirect") || "/dashboard"
  const initialMode = searchParams.get("mode")
  const fromQualification = searchParams.get("from") === "qualification"

  // Default to Sign Up when coming from qualification flow
  useEffect(() => {
    if (initialMode === "signup" || fromQualification) {
      setIsSignUp(true)
    }
  }, [initialMode, fromQualification])

  async function syncLocalQualification(userId: string) {
    try {
      // Check if qualification already exists in DB
      const { data: existingQual } = await supabase
        .from("qualifications")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle()

      if (!existingQual) {
        // Only sync if they passed the qualification
        const qualificationPassed = localStorage.getItem('qualification_passed') === 'true'
        const localAnswers = localStorage.getItem('qualification_answers')
        
        if (qualificationPassed && localAnswers) {
          try {
            const answers = JSON.parse(localAnswers)
            // Map answers from q1-q5 format to question columns
            await supabase.from("qualifications").insert({
              user_id: userId,
              question_1: answers.q1 || "",
              question_2: answers.q2 || "",
              question_3: answers.q3 || "",
              question_4: answers.q4 || "",
              question_5: answers.q5 || "",
              completed_at: localStorage.getItem('qualification_completed_at') || new Date().toISOString(),
            })
          } catch (e) {
            console.log('Could not sync qualification:', e)
          }
        }
      }
    } catch (error) {
      console.log('Error syncing qualification:', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isSignUp) {
        analytics.signUpStarted()
        
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (signUpError) throw signUpError

        // Create user profile
        if (data.user) {
          await supabase.from("users").insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
          })

          // Sync local qualification to database if exists (after session is established)
          if (data.session) {
            await syncLocalQualification(data.user.id)
            analytics.signUpCompleted()
          }
        }

        // For sign up, check email confirmation
        if (data.user && !data.session) {
          alert("Please check your email to confirm your account!")
          return
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) throw signInError

        // Sync local qualification to database if exists
        const { data: { user: signedInUser } } = await supabase.auth.getUser()
        if (signedInUser) {
          await syncLocalQualification(signedInUser.id)
          analytics.loginCompleted()
        }
      }

      // Improved navigation for logged-in users
      // If redirect is /submit but they haven't qualified, go to qualify first
      if (redirect === "/submit" || redirect.includes("/submit")) {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (currentUser) {
          const { data: qualification } = await supabase
            .from("qualifications")
            .select("*")
            .eq("user_id", currentUser.id)
            .maybeSingle()
          
          if (!qualification && !localStorage.getItem('qualification_completed')) {
            router.push("/qualify")
            router.refresh()
            return
          }
        }
      }
      
      router.push(redirect)
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PortfolioNavbar />
      <div className="min-h-screen bg-background pt-20 pb-16 flex items-center justify-center">
        <div className="container mx-auto max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border-2">
              <CardHeader className="space-y-2 text-center">
                <CardTitle
                  className="text-2xl sm:text-3xl"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-base">
                  {isSignUp
                    ? "Sign up to participate in the Global Ideas Challenge"
                    : "Sign in to continue to your account"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-base font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        required={isSignUp}
                        className="text-base"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="text-base"
                      minLength={6}
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#156d95] hover:bg-[#156d95]/90 text-white"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isSignUp ? "Creating..." : "Signing in..."}
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        {isSignUp ? "Sign Up" : "Sign In"}
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp)
                        setError("")
                      }}
                      className="text-[#156d95] hover:underline"
                    >
                      {isSignUp
                        ? "Already have an account? Sign in"
                        : "Don't have an account? Sign up"}
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <>
        <PortfolioNavbar />
        <div className="min-h-screen bg-background pt-20 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#156d95]" />
        </div>
        <Footer />
      </>
    }>
      <LoginForm />
    </Suspense>
  )
}

