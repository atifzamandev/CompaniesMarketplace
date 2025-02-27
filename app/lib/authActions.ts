'use server'

import { signIn, signOut } from '@/auth'

export async function loginWithProvider(provider: 'google' | 'github') {
  await signIn(provider, { redirectTo: '/' })
}

export async function logOut() {
  await signOut({ redirectTo: '/' })
}
