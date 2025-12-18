"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, Save, XCircle, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { analytics } from "@/lib/analytics"

const QUESTIONS = [
  {
    id: "q1",
    question: "A good business pitch should clearly explain:",
    options: [
      "The problem you're solving",
      "Your favorite color",
      "How many friends you have",
      "Your weekend plans",
    ],
    correctAnswer: "The problem you're solving",
  },
  {
    id: "q2",
    question: "An elevator pitch is typically:",
    options: [
      "Short and clear (1-2 minutes)",
      "As long as possible",
      "Only for elevators",
      "Always in writing",
    ],
    correctAnswer: "Short and clear (1-2 minutes)",
  },
  {
    id: "q3",
    question: "When pitching an idea, it's important to:",
    options: [
      "Explain why it matters",
      "Use fancy words only",
      "Never ask questions",
      "Keep it secret",
    ],
    correctAnswer: "Explain why it matters",
  },
  {
    id: "q4",
    question: "A good pitch helps people understand:",
    options: [
      "What problem you're solving and why",
      "Your entire life story",
      "Every technical detail",
      "Nothing specific",
    ],
    correctAnswer: "What problem you're solving and why",
  },
  {
    id: "q5",
    question: "The best pitches are:",
    options: [
      "Clear and focused",
      "Very long and detailed",
      "Full of jargon",
      "Confusing",
    ],
    correctAnswer: "Clear and focused",
  },
]

// Minimum correct answers required to pass (3 out of 5)
const MIN_CORRECT_TO_PASS = 3

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Create shuffled questions with randomized answer options
function getShuffledQuestions() {
  return QUESTIONS.map(q => ({
    ...q,
    options: shuffleArray(q.options),
    originalId: q.id
  }))
}

export function QualificationForm({ userId, onComplete, saveLocally = false }: { userId?: string; onComplete?: () => void; saveLocally?: boolean }) {
  const [mounted, setMounted] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof QUESTIONS>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSignupPrompt, setShowSignupPrompt] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Initialize shuffled questions on client only (fixes hydration error)
  useEffect(() => {
    setMounted(true)
    setShuffledQuestions(getShuffledQuestions())
  }, [])

  // Load saved answers from localStorage if available
  useEffect(() => {
    if (mounted && saveLocally && typeof window !== 'undefined') {
      const saved = localStorage.getItem('qualification_answers')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          // Map from q1-q5 format back to originalId format for shuffled questions
          const mappedAnswers: Record<string, string> = {}
          shuffledQuestions.forEach((q) => {
            if (parsed[q.originalId]) {
              mappedAnswers[q.originalId] = parsed[q.originalId]
            }
          })
          if (Object.keys(mappedAnswers).length > 0) {
            setAnswers(mappedAnswers)
            // Check if completed
            if (localStorage.getItem('qualification_completed') === 'true') {
              calculateScore(mappedAnswers)
              setShowSignupPrompt(true)
            }
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [mounted, saveLocally, shuffledQuestions])

  // Track when qualification form is first viewed/started
  useEffect(() => {
    if (mounted && currentQuestion === 0 && Object.keys(answers).length === 0) {
      analytics.qualificationStarted()
    }
  }, [mounted, currentQuestion, answers])

  // Calculate score and check if passed
  const calculateScore = (currentAnswers: Record<string, string>) => {
    let correct = 0
    shuffledQuestions.forEach((q) => {
      const userAnswer = currentAnswers[q.originalId]
      if (userAnswer === q.correctAnswer) {
        correct++
      }
    })
    setScore(correct)
    setPassed(correct >= MIN_CORRECT_TO_PASS)
    return { correct, passed: correct >= MIN_CORRECT_TO_PASS }
  }

  // Check if answer is correct for a specific question
  const isAnswerCorrect = (questionId: string, answer: string) => {
    const question = shuffledQuestions.find(q => q.originalId === questionId)
    return question && answer === question.correctAnswer
  }

  const progress = shuffledQuestions.length > 0 ? ((currentQuestion + 1) / shuffledQuestions.length) * 100 : 0

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const saveToLocalStorage = async (answers: Record<string, string>, scoreResult: { correct: number; passed: boolean }) => {
    if (typeof window === 'undefined') return false
    
    // Map back to q1-q5 format for consistency
    const mappedAnswers: Record<string, string> = {}
    shuffledQuestions.forEach((q) => {
      mappedAnswers[q.originalId] = answers[q.originalId] || ""
    })
    
    // Check if all questions are answered
    const allAnswered = shuffledQuestions.every(q => answers[q.originalId] && answers[q.originalId].trim() !== "")
    
    if (!allAnswered) {
      return false // Don't save if not all answered
    }
    
    // Create identifier for anonymous tracking
    // Use crypto for truly unique identifier (browser fingerprint + timestamp)
    const randomComponent = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : Math.random().toString(36).substring(2) + Date.now().toString(36)
    const identifier = `anon_${Date.now()}_${randomComponent}`.substring(0, 64)
    
    localStorage.setItem('qualification_answers', JSON.stringify(mappedAnswers))
    // Only mark as completed AND participant if they passed
    // This is ethical: they completed all 5 questions AND demonstrated understanding (3+ correct)
    if (scoreResult.passed) {
      localStorage.setItem('qualification_completed', 'true')
      localStorage.setItem('qualification_completed_at', new Date().toISOString())
    } else {
      // Store attempt but don't mark as completed participant
      localStorage.setItem('qualification_attempt_completed', 'true')
    }
    localStorage.setItem('qualification_identifier', identifier)
    localStorage.setItem('qualification_score', scoreResult.correct.toString())
    localStorage.setItem('qualification_passed', scoreResult.passed.toString())
    
    // Track all attempts in Supabase (for analytics)
    // Note: Only PASSED qualifications count as "participants" (for ethical counting)
    try {
      const response = await fetch('/api/track-qualification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qualification_identifier: identifier,
          answers: mappedAnswers,
          completed: true,
          score: scoreResult.correct,
          passed: scoreResult.passed,
          total_questions: shuffledQuestions.length
        })
      })
      
      if (!response.ok) {
        console.log('Could not track qualification:', await response.text())
      }
    } catch (e) {
      console.log('Could not track qualification:', e)
    }
    
    return true
  }

  const handleSubmit = async () => {
    // Check if all questions answered
    const allAnswered = shuffledQuestions.every(q => answers[q.originalId] && answers[q.originalId].trim() !== "")
    
    if (!allAnswered) {
      const unanswered = shuffledQuestions.findIndex(q => !answers[q.originalId] || answers[q.originalId].trim() === "")
      alert(`Please answer all questions before submitting. You still need to answer question ${unanswered + 1}.`)
      setCurrentQuestion(unanswered)
      return
    }
    
    setIsSubmitting(true)
    
    // Calculate score
    const scoreResult = calculateScore(answers)
    setShowResults(true)
    
    // Track completion (both passed and failed)
    analytics.qualificationCompleted(scoreResult.passed, scoreResult.correct)
    
    // Save attempt to local storage
    // ETHICAL NOTE: saveToLocalStorage only marks qualification_completed=true if they PASSED
    if (saveLocally) {
      await saveToLocalStorage(answers, scoreResult)
    }
    
    // Check if passed - only passed users are counted as participants
    // This is ethical: they must complete all 5 questions AND demonstrate understanding (3+ correct)
    if (!scoreResult.passed) {
      analytics.qualificationFailed(scoreResult.correct)
      setIsSubmitting(false)
      return // Show results, don't proceed - they haven't qualified as participants yet
    }
    
    // Track passed qualification
    analytics.qualificationPassed(scoreResult.correct)
    
    // If passed: they completed all 5 questions AND got 3+ correct
    // They are now officially a participant (counted ethically)
    
    try {
      // Already saved locally above (tracked in Supabase)
      // Now proceed with database save if user is logged in
      
      // If no userId, show signup prompt
      if (saveLocally && !userId) {
        setIsSubmitting(false)
        setShowSignupPrompt(true)
        return
      }

      // Save to database if userId provided
      if (userId) {
        // Map shuffled answers to q1-q5 format for database
        const mappedAnswers: Record<string, string> = {}
        shuffledQuestions.forEach((q) => {
          mappedAnswers[q.originalId] = answers[q.originalId] || ""
        })

        const { error } = await supabase.from("qualifications").upsert({
          user_id: userId,
          question_1: mappedAnswers.q1 || "",
          question_2: mappedAnswers.q2 || "",
          question_3: mappedAnswers.q3 || "",
          question_4: mappedAnswers.q4 || "",
          question_5: mappedAnswers.q5 || "",
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        })

        if (error) throw error
      } else {
        // Still save locally even if no user
        saveToLocalStorage(answers, scoreResult)
      }

      // Call onComplete callback if provided
      if (onComplete) {
        onComplete()
      } else if (userId) {
        // Redirect to submission page if logged in
        router.push("/submit")
      } else {
        // Show signup prompt if not logged in
        setShowSignupPrompt(true)
      }
    } catch (error) {
      console.error("Error submitting qualification:", error)
      alert("There was an error submitting your qualification. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRedo = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResults(false)
    setShowSignupPrompt(false)
    setScore(0)
    setPassed(false)
    // Reshuffle questions for new attempt
    setShuffledQuestions(getShuffledQuestions())
    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('qualification_answers')
      localStorage.removeItem('qualification_completed')
      localStorage.removeItem('qualification_completed_at')
      localStorage.removeItem('qualification_identifier')
      localStorage.removeItem('qualification_score')
      localStorage.removeItem('qualification_passed')
    }
  }

  // Don't render until mounted (prevents hydration error)
  if (!mounted || shuffledQuestions.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <Card className="border-2">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#156d95]" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQ = shuffledQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === shuffledQuestions.length - 1
  const canProceed = answers[currentQ.originalId] !== undefined
  const currentAnswer = answers[currentQ.originalId]
  const showFeedback = showResults && currentAnswer !== undefined

  // If showing signup prompt (after passing)
  if (showSignupPrompt && !userId && passed) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-2 border-[#156d95] bg-white">
            <CardHeader className="space-y-4 pb-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto w-16 h-16 rounded-full bg-[#156d95] flex items-center justify-center mb-4"
              >
                <CheckCircle2 className="h-8 w-8 text-white" strokeWidth={2.5} />
              </motion.div>
              <CardTitle
                className="text-3xl sm:text-4xl mb-4 font-bold text-[#202020]"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Qualification Passed
              </CardTitle>
              <div className="bg-[#156d95]/5 rounded-xl p-6 mb-4 border border-[#156d95]/20">
                <p className="text-xl sm:text-2xl font-bold text-[#202020] mb-3" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  {score} out of {shuffledQuestions.length} correct
                </p>
                <p className="text-base sm:text-lg text-[#666666] leading-7" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  You've successfully completed the qualification round. You're now a participant and ready to submit your idea to compete for <strong className="text-[#202020]">cash prizes, national recognition, and exclusive mentorship</strong>.
                </p>
              </div>
              <CardDescription className="text-base font-medium text-[#666666]">
                Sign up to save your results and proceed to submission.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-[#156d95]/5 border border-[#156d95]/20 rounded-lg p-4">
                <p className="text-sm text-[#666666] font-medium" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
                  Your participation has been counted. Sign up to save your results and proceed to submission.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={() => router.push("/login?redirect=/submit&mode=signup&from=qualification")}
                  className="flex-1 bg-[#156d95] hover:bg-[#156d95]/90 text-white py-2 text-sm"
                >
                  Sign Up to Save & Submit
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRedo}
                  className="py-2 text-sm"
                >
                  Redo Qualification
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (onComplete) onComplete()
                  }}
                  className="py-2 text-sm"
                >
                  Continue Browsing
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Show results if submitted but didn't pass
  if (showResults && !passed) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-2 border-orange-200">
            <CardHeader className="space-y-4 pb-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle
                className="text-2xl sm:text-3xl mb-2"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Almost There!
              </CardTitle>
              <CardDescription className="text-base">
                You got {score} out of {shuffledQuestions.length} correct. You need at least {MIN_CORRECT_TO_PASS} correct to pass and become a participant. 
                <strong className="text-orange-700"> Don't worry—review the questions and try again. You've got this!</strong> Once you pass, you'll be counted as a participant.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Don't worry!</strong> You can retake the qualification. Review the questions and try again.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleRedo}
                  className="flex-1 bg-[#156d95] hover:bg-[#156d95]/90 text-white py-2 text-sm"
                >
                  Retake Qualification
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (onComplete) onComplete()
                  }}
                  className="py-2 text-sm"
                >
                  Continue Browsing
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-2">
          <CardHeader className="space-y-4 pb-6">
            <div>
              <CardTitle
                className="text-2xl sm:text-3xl mb-2"
                style={{ fontFamily: "var(--font-figtree), Figtree" }}
              >
                Round 1: Qualification Round
              </CardTitle>
              <CardDescription className="text-base">
                Answer 5 quick questions about pitches and business. Get {MIN_CORRECT_TO_PASS} or more correct to pass. Once you pass, you're a participant and can submit your <strong className="text-[#156d95]">1-page idea</strong> by December 27th. 
                <strong className="text-[#156d95]"> Most people pass on their first try!</strong>
              </CardDescription>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Question {currentQuestion + 1} of {shuffledQuestions.length}
                </span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              {saveLocally && typeof window !== 'undefined' && localStorage.getItem('qualification_completed') && (
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to redo the qualification? Your previous answers will be cleared.")) {
                      handleRedo()
                    }
                  }}
                  className="text-xs text-[#156d95] hover:underline mt-2"
                >
                  Redo qualification
                </button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-3 py-1 rounded-full bg-[#156d95]/10 text-[#156d95] text-sm font-medium">
                        Question {currentQuestion + 1} of {shuffledQuestions.length}
                      </div>
                      {score > 0 && showResults && (
                        <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          {score} correct so far!
                        </div>
                      )}
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-semibold mb-6"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {currentQ.question}
                    </h3>
                    <RadioGroup
                      value={currentAnswer || ""}
                      onValueChange={(value) =>
                        setAnswers({ ...answers, [currentQ.originalId]: value })
                      }
                      className="space-y-3"
                    >
                      {currentQ.options.map((option, idx) => {
                        const isSelected = currentAnswer === option
                        const isCorrect = isAnswerCorrect(currentQ.originalId, option)
                        const showResult = showFeedback && isSelected
                        
                        return (
                          <div
                            key={idx}
                            className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${
                              showResult
                                ? isCorrect
                                  ? "border-green-500 bg-green-50"
                                  : "border-red-500 bg-red-50"
                                : isSelected
                                ? "border-[#156d95] bg-blue-50"
                                : "border-border hover:bg-accent/50"
                            }`}
                          >
                            <RadioGroupItem value={option} id={`${currentQ.originalId}-${idx}`} disabled={showFeedback} />
                            <Label
                              htmlFor={`${currentQ.originalId}-${idx}`}
                              className="flex-1 cursor-pointer text-base font-normal flex items-center gap-2"
                              style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                              {option}
                              {showResult && (
                                isCorrect ? (
                                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                ) : (
                                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                                )
                              )}
                            </Label>
                          </div>
                        )
                      })}
                    </RadioGroup>
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                          isAnswerCorrect(currentQ.originalId, currentAnswer)
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}
                      >
                        {isAnswerCorrect(currentQ.originalId, currentAnswer) ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                            <span className="text-green-900 font-medium">Correct!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                            <span className="text-red-900 font-medium">
                              Incorrect. The correct answer is: {currentQ.correctAnswer}
                            </span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-5 py-2 text-sm"
              >
                Previous
              </Button>
              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed || isSubmitting}
                  className="px-6 py-2 text-sm bg-[#156d95] hover:bg-[#156d95]/90 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-3.5 w-3.5" />
                      Complete Qualification
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="px-6 py-2 text-sm bg-[#156d95] hover:bg-[#156d95]/90 text-white"
                >
                  Next Question
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
