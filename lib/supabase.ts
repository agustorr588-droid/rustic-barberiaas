import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kdshmqncqrucbeedcspw.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_NfrPjiUp-0iMPPP0KruAqA_I7JPjGZ7'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
