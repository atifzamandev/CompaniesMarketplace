'use client'

import { insertCompany } from '@/app/lib/supabase/actions/insertCompany'
import { useActionState } from 'react'

export default function AddBusiness() {
  const [message, handleSubmit, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      try {
        await insertCompany(formData)
        return { type: 'success', text: 'Company added successfully!' }
      } catch (err) {
        return {
          type: 'error',
          text: err instanceof Error ? err.message : 'Unknown error',
        }
      }
    },
    null
  )

  return (
    <form action={handleSubmit} className='space-y-4'>
      <input name='company_name' placeholder='Company Name' required />
      <input name='description' placeholder='Description' required />
      <input name='price' placeholder='Price' required />
      <input name='industry_type' placeholder='Industry Type' required />
      <input name='image' placeholder='Image URL' required />
      <input name='sellerId' type='number' placeholder='Seller ID' required />
      <button
        type='submit'
        className='bg-blue-500 text-white p-2'
        disabled={isPending}
      >
        {isPending ? 'Adding...' : 'Add Company'}
      </button>

      {message && (
        <p
          className={
            message.type === 'error' ? 'text-red-500' : 'text-green-500'
          }
        >
          {message.text}
        </p>
      )}
    </form>
  )
}
