export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          updated_at?: string
        }
      }
      qualifications: {
        Row: {
          id: string
          user_id: string
          question_1: string
          question_2: string
          question_3: string
          question_4: string
          question_5: string
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question_1: string
          question_2: string
          question_3: string
          question_4: string
          question_5: string
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          question_1?: string
          question_2?: string
          question_3?: string
          question_4?: string
          question_5?: string
        }
      }
      submissions: {
        Row: {
          id: string
          user_id: string
          qualification_id: string | null
          title: string
          track: string
          division: string
          document_url: string | null
          video_url: string | null
          status: 'draft' | 'submitted' | 'reviewed'
          submitted_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          qualification_id?: string | null
          title: string
          track: string
          division: string
          document_url?: string | null
          video_url?: string | null
          status?: 'draft' | 'submitted' | 'reviewed'
          submitted_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          track?: string
          division?: string
          document_url?: string | null
          video_url?: string | null
          status?: 'draft' | 'submitted' | 'reviewed'
          submitted_at?: string | null
          updated_at?: string
        }
      }
      ambassadors: {
        Row: {
          id: string
          user_id: string
          school: string
          year: string
          motivation: string
          previous_experience: string
          outreach_plan: string
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          school: string
          year: string
          motivation: string
          previous_experience: string
          outreach_plan: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          school?: string
          year?: string
          motivation?: string
          previous_experience?: string
          outreach_plan?: string
          status?: 'pending' | 'approved' | 'rejected'
          updated_at?: string
        }
      }
    }
  }
}
