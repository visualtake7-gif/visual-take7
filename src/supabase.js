import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://figzyiigewaugoopobkj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ3p5aWlnZXdhdWdvb3BvYmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTUxODgsImV4cCI6MjA5MTA3MTE4OH0.uYJ_VE1CcJaDFklJauUxqFapLRtFg8cN80k8as_HFVU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   
