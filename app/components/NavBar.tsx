import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import CompaniesMarketplace from './../../public/logo.svg'
import { auth } from '@/auth'
import LoginButton from './LoginButton'
import { logOut } from '../lib/authActions'

const NavBar = async () => {
  const session = await auth()
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
          {session && session?.user ? (
            <>
              <Link href='/business/create'>
                <span>Add Business</span>
              </Link>

              <form action={logOut}>
                <button type='submit'>Logout</button>
              </form>

              <Link href={`/user/${session?.user.id}`}>
                <span>{session?.user.name}</span>
              </Link>
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
