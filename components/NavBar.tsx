'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useAuth } from '../app/hooks/useAuth'
import CompaniesMarketplace from './../public/logo.svg'
import LoginButton from './LoginButton'
import UserMenu from './UserMenu'

const NavBar = () => {
  const { session, loading, refresh } = useAuth()
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refresh()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [refresh])

  return (
    <header className='px-5 py-3 bg-blue-900 font-heading'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image
            src={CompaniesMarketplace}
            alt='Companies Marketplace'
            width={148}
            height={32}
          />
        </Link>

        <div className='flex items-center gap-4 text-white'>
          {loading ? (
            <div>Loading...</div>
          ) : session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <LoginButton onLoginSuccess={refresh} />
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
