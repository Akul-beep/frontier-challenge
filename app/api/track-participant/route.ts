import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { answers } = await request.json()

    // This endpoint can be called anonymously to track participation
    // Store in a separate table for tracking
    const supabase = await createClient()
    
    // You can create a separate table for anonymous participants if needed
    // For now, we'll just return success - the localStorage handles the tracking
    // In production, you might want to store this in a database

    return NextResponse.json({ 
      success: true, 
      message: 'Participation tracked',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error tracking participant:', error)
    return NextResponse.json(
      { error: 'Failed to track participation' },
      { status: 500 }
    )
  }
}

