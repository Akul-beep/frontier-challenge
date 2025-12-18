import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { qualification_identifier, answers, completed, score, passed, total_questions } = await request.json()

    console.log('Received qualification tracking request:', {
      qualification_identifier,
      completed,
      score,
      passed,
      total_questions,
      has_answers: !!answers
    })

    if (!completed || !qualification_identifier || !answers) {
      console.error('Missing required fields:', { completed, qualification_identifier, has_answers: !!answers })
      return NextResponse.json(
        { error: 'Missing required fields', details: { completed, has_identifier: !!qualification_identifier, has_answers: !!answers } },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase configuration missing:', { has_url: !!supabaseUrl, has_key: !!supabaseAnonKey })
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

    console.log('Attempting to insert data:', insertData)

    const { data, error } = await supabase
      .from('anonymous_qualifications')
      .insert(insertData)
      .select()

    if (error) {
      console.error('Supabase error tracking qualification:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      // If duplicate identifier (user retaking), update instead
      if (error.code === '23505') { // Unique violation
        console.log('Duplicate identifier, attempting upsert...')
        const { data: upsertData, error: upsertError } = await supabase
          .from('anonymous_qualifications')
          .upsert(insertData, { onConflict: 'qualification_identifier' })
          .select()
        
        if (upsertError) {
          console.error('Upsert also failed:', upsertError)
          return NextResponse.json(
            { error: 'Failed to track qualification', details: upsertError.message },
            { status: 500 }
          )
        }
        
        console.log('Upsert successful:', upsertData)
        return NextResponse.json({ 
          success: true, 
          message: 'Qualification updated',
          timestamp: new Date().toISOString()
        })
      }
      
      return NextResponse.json(
        { error: 'Failed to track qualification', details: error.message, hint: error.hint },
        { status: 500 }
      )
    }

    console.log('Successfully tracked qualification:', data)
    return NextResponse.json({ 
      success: true, 
      message: 'Qualification tracked',
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('Unexpected error tracking qualification:', error)
    return NextResponse.json(
      { error: 'Failed to track qualification', details: error?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}

