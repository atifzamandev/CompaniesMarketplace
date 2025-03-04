'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

type AuthProvider = 'google' | 'github'

export async function loginWithProvider(provider: AuthProvider) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('OAuth login error:', error)
    throw error
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Logout error:', error)
    throw error
  }

  redirect('/')
}
