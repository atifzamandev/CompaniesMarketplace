import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

const SubmitButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      className='business-card_btn w-full'
      disabled={pending}
    >
      {pending ? 'Please wait...' : children}
    </Button>
  )
}

export default SubmitButton
