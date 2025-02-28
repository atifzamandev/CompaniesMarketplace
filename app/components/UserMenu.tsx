import Link from 'next/link'
import React from 'react'
import { logOut } from '../lib/authActions'
import { User } from '@supabase/supabase-js'

interface UserMenuProps {
  user: User
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => (
  <>
    <Link href='/business/create'>
      <span>Add Business</span>
    </Link>

    <form action={logOut}>
      <button type='submit'>Logout</button>
    </form>

    <Link href={`/user/${user.id}`}>
      <span>{user.user_metadata.name || user.email}</span>
    </Link>
  </>
)

export default UserMenu
