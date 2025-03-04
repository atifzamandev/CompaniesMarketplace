'use client'

import { Session } from '@supabase/supabase-js'
import { useEffect, useState, useCallback } from 'react'
import { createClient } from '../utils/supabase/client'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const refresh = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setSession(session)
    setLoading(false)
  }, [supabase.auth])

  useEffect(() => {
    refresh()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth, refresh])

  return { session, loading, refresh }
}
