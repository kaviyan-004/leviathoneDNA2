import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key-for-development'

// Create a mock Supabase client for demo purposes
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Mock authentication for demo purposes
export const mockAuth = {
  async signInWithPassword({ email, password }: { email: string; password: string }) {
    // Simulate successful login
    return {
      data: {
        user: {
          id: 'demo-user-1',
          email: email,
          user_metadata: {
            full_name: 'Demo User',
            role: 'researcher',
            organization: 'Demo Organization'
          }
        },
        session: {
          access_token: 'demo-token',
          refresh_token: 'demo-refresh'
        }
      },
      error: null
    }
  },
  
  async signUp({ email, password, options }: { email: string; password: string; options?: any }) {
    // Simulate successful signup
    return {
      data: {
        user: {
          id: 'demo-user-new',
          email: email,
          user_metadata: {
            full_name: options?.data?.full_name || 'New User',
            role: options?.data?.role || 'researcher',
            organization: options?.data?.organization || 'Demo Organization'
          }
        },
        session: {
          access_token: 'demo-token',
          refresh_token: 'demo-refresh'
        }
      },
      error: null
    }
  },
  
  async signOut() {
    // Simulate successful logout
    return { error: null }
  },
  
  async getSession() {
    // Check if user is logged in (demo mode)
    const userData = localStorage.getItem('demo-user')
    if (userData) {
      return {
        data: {
          session: {
            user: JSON.parse(userData)
          }
        },
        error: null
      }
    }
    return { data: { session: null }, error: null }
  },
  
  onAuthStateChange(callback: (event: string, session: any) => void) {
    // Mock auth state change listener
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    }
  }
}

// Database Types
export interface User {
  id: string
  email: string
  role: 'researcher' | 'student' | 'policymaker' | 'public' | 'admin'
  full_name?: string
  organization?: string
  created_at: string
  updated_at: string
}

export interface Dataset {
  id: string
  user_id: string
  name: string
  description?: string
  file_path: string
  file_size: number
  file_type: string
  status: 'uploaded' | 'processing' | 'completed' | 'failed'
  metadata?: any
  created_at: string
  updated_at: string
}

export interface AnalysisResult {
  id: string
  dataset_id: string
  species_count: number
  diversity_index: number
  abundance_data: any
  species_distribution: any
  geographic_data: any
  created_at: string
}

export interface ConservationAlert {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  location?: string
  species_affected?: string[]
  created_at: string
}
