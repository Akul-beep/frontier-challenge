'use client'

import { track } from '@vercel/analytics'

// Custom event tracking for key metrics
export const analytics = {
  // Page views are tracked automatically by Vercel Analytics
  
  // Qualification tracking
  qualificationStarted: () => {
    track('qualification_started')
  },
  
  qualificationCompleted: (passed: boolean, score: number) => {
    track('qualification_completed', {
      passed: passed ? 'yes' : 'no',
      score: score.toString(),
    })
  },
  
  qualificationPassed: (score: number) => {
    track('qualification_passed', {
      score: score.toString(),
    })
  },
  
  qualificationFailed: (score: number) => {
    track('qualification_failed', {
      score: score.toString(),
    })
  },
  
  // User actions
  signUpStarted: () => {
    track('signup_started')
  },
  
  signUpCompleted: () => {
    track('signup_completed')
  },
  
  loginCompleted: () => {
    track('login_completed')
  },
  
  // Submission tracking
  submissionStarted: () => {
    track('submission_started')
  },
  
  submissionCompleted: (track: string, division: string) => {
    track('submission_completed', {
      track,
      division,
    })
  },
  
  // CTA clicks
  ctaClicked: (location: string, buttonText: string) => {
    track('cta_clicked', {
      location,
      buttonText,
    })
  },
  
  // Navigation
  sectionViewed: (sectionName: string) => {
    track('section_viewed', {
      section: sectionName,
    })
  },
}

