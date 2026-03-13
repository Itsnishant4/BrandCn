import { createClient } from '@supabase/supabase-js'

let _supabase = null

function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase env vars')
    return null
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

export const getSupabaseClient = () => {
  if (_supabase) return _supabase
  _supabase = createSupabaseClient()
  return _supabase
}

let _supabaseAdmin = null

export const getSupabaseAdminClient = () => {
  if (_supabaseAdmin) return _supabaseAdmin
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Missing Supabase Admin env vars, falling back to anon client')
    return getSupabaseClient()
  }
  
  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
  return _supabaseAdmin
}

export const supabase = {
  auth: {
    getUser: async () => {
      const client = getSupabaseClient()
      return client ? client.auth.getUser() : { data: { user: null }, error: { message: 'Not configured' } }
    },
    getSession: async () => {
      const client = getSupabaseClient()
      return client ? client.auth.getSession() : { data: { session: null }, error: { message: 'Not configured' } }
    },
    signInWithPassword: async (credentials) => {
      const client = getSupabaseClient()
      return client ? client.auth.signInWithPassword(credentials) : { error: { message: 'Not configured' } }
    },
    signOut: async () => {
      const client = getSupabaseClient()
      return client ? client.auth.signOut() : { error: { message: 'Not configured' } }
    }
  },
  from: (table) => {
    const client = getSupabaseClient()
    if (!client) {
      return { 
        select: () => ({ eq: () => ({ single: async () => ({ data: null, error: { message: 'Not configured' } }) }) }),
        insert: () => ({ select: () => ({ single: async () => ({ data: null, error: { message: 'Not configured' } }) }) }),
        update: () => ({ eq: () => ({ select: () => ({ single: async () => ({ data: null, error: { message: 'Not configured' } }) }) }) }),
        delete: () => ({ eq: () => ({ error: { message: 'Not configured' } }) })
      }
    }
    return client.from(table)
  }
}

export { createClient }