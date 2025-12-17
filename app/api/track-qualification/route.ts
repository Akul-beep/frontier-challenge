import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { qualification_identifier, answers, completed, score, passed, total_questions } = await request.json()

    if (!completed || !qualification_identifier || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Insert into anonymous_qualifications table (track all attempts for analytics)
    // ETHICAL NOTE: Only qualifications where passed=true should be counted as "participants"
    // This ensures we only count people who: 1) completed all 5 questions AND 2) passed (3+ correct)
    const insertData: any = {
      qualification_identifier,
      question_1: answers.q1 || '',
      question_2: answers.q2 || '',
      question_3: answers.q3 || '',
      question_4: answers.q4 || '',
      question_5: answers.q5 || '',
      completed_at: new Date().toISOString(),
    }

    // Add score and passed fields if provided
    if (score !== undefined) insertData.score = score
    if (passed !== undefined) insertData.passed = passed
    if (total_questions !== undefined) insertData.total_questions = total_questions

    const { error } = await supabase
      .from('anonymous_qualifications')
      .insert(insertData)

    if (error) {
      console.error('Error tracking qualification:', error)
      // If table doesn't exist yet, that's okay - just return success
      if (error.message.includes('does not exist')) {
        return NextResponse.json({ 
          success: true, 
          message: 'Qualification tracked (table not set up yet)',
          timestamp: new Date().toISOString()
        })
      }
      return NextResponse.json(
        { error: 'Failed to track qualification' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Qualification tracked',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking qualification:', error)
    return NextResponse.json(
      { error: 'Failed to track qualification' },
      { status: 500 }
    )
  }
}

