'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import CompaniesMarketplace from './../../public/logo.svg'
import LoginButton from './LoginButton'
import UserMenu from './UserMenu'

const NavBar = () => {
  const { session, loading } = useAuth()

  return (
    <header className='px-5 py-3 bg-blue-900 font-work-sans'>
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
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  )
}
export default NavBar
