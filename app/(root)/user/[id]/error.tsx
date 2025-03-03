'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error() {
  return (
    <div className='error-container'>
      <h2 className='error-heading'>Error Loading User Profile</h2>
      <p className='error-message'>
        There was a problem loading this user profile.
      </p>
      <Button asChild>
        <Link href='/'>Return to Home</Link>
      </Button>
    </div>
  )
}
