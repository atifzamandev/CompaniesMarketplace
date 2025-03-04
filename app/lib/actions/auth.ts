'use server'

import { createClient } from '@/app/utils/supabase/server'
import { revalidatePath } from 'next/cache'
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const user_type = formData.get('user_type') as string

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (authError) {
      return {
        message: authError.message,
        success: false,
      }
    }

    if (user) {
      const { data: existingUser } = await supabase
        .from('marketplace_users')
        .select('id')
        .eq('id', user.id)
        .single()

      if (!existingUser) {
        const { error: userError } = await supabase
          .from('marketplace_users')
          .insert({
            id: user.id,
            name,
            email,
            phone,
            user_type,
          })

        if (userError) {
          if (!userError.message.includes('unique constraint')) {
            return {
              message: userError.message,
              success: false,
            }
          }
        }
      }
      revalidatePath('/')
      return {
        message:
          'Account created successfully! Please check your email for verification.',
        success: true,
      }
    }

    return {
      message:
        'Account created successfully! Please check your email for verification.',
      success: true,
    }
  } catch (error) {
    console.error('Signup error:', error)
    if (error instanceof Error && error.message.includes('unique constraint')) {
      return {
        message:
          'Account created successfully! Please check your email for verification.',
        success: true,
      }
    }
    return {
      message: error instanceof Error ? error.message : 'Something went wrong',
      success: false,
    }
  }
}

export async function login(prevState: unknown, formData: FormData) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })

    if (error) throw error

    if (!data.user) {
      return {
        message: 'Invalid email or password',
        success: false,
      }
    }

    revalidatePath('/')
    return {
      message: 'Logged in successfully!',
      success: true,
    }
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : 'Invalid email or password',

      success: false,
    }
  }
}

export async function loginWithProvider(provider: 'google' | 'github') {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) throw error

  return data
}
