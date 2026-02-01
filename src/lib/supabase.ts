import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  wallet_address: string
  name?: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  name: string
  description?: string
  start_date?: string
  end_date?: string
  status: 'draft' | 'active' | 'ended'
  organizer_id: string
  created_at: string
  updated_at: string
}

export interface Action {
  id: string
  event_id: string
  title: string
  description?: string
  points: number
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface Verification {
  id: string
  user_id: string
  action_id: string
  verifier_id: string
  ipfs_hash?: string
  metadata?: any
  verified_at: string
}

export interface Score {
  id: string
  user_id: string
  event_id: string
  event_score: number
  lifetime_score: number
  updated_at: string
}