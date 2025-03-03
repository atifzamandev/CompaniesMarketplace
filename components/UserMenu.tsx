import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { logOut } from '../app/lib/authActions'

interface UserMenuProps {
  user: User
}

const UserMenu = ({ user }: UserMenuProps) => (
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
