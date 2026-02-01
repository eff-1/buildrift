import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wallet_address: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          name: string
          description: string | null
          start_date: string | null
          end_date: string | null
          status: 'draft' | 'active' | 'ended'
          organizer_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          status?: 'draft' | 'active' | 'ended'
          organizer_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          status?: 'draft' | 'active' | 'ended'
          organizer_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      actions: {
        Row: {
          id: string
          event_id: string
          title: string
          description: string | null
          points: number
          enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          title: string
          description?: string | null
          points?: number
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          title?: string
          description?: string | null
          points?: number
          enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      verifications: {
        Row: {
          id: string
          user_id: string
          action_id: string
          verifier_id: string
          ipfs_hash: string | null
          metadata: any | null
          verified_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action_id: string
          verifier_id: string
          ipfs_hash?: string | null
          metadata?: any | null
          verified_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action_id?: string
          verifier_id?: string
          ipfs_hash?: string | null
          metadata?: any | null
          verified_at?: string
        }
      }
      scores: {
        Row: {
          id: string
          user_id: string
          event_id: string
          event_score: number
          lifetime_score: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          event_score?: number
          lifetime_score?: number
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          event_score?: number
          lifetime_score?: number
          updated_at?: string
        }
      }
    }
  }
}