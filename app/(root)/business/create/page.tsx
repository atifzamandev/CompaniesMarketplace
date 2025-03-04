'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { createClient } from '@/app/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'

const INDUSTRY_TYPES = [
  'Technology',
  'Retail',
  'Manufacturing',
  'Healthcare',
  'Food & Beverage',
  'Real Estate',
  'Services',
  'Other',
]

export default function CreateBusinessPage() {
  const router = useRouter()
  const { session } = useAuth()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<{
    id: number
    company_name: string
  } | null>(null)

  if (!session) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <h2 className='text-24-semibold text-red-600 mb-4'>
          Authentication Required
        </h2>
        <p className='text-16-medium text-gray-600 mb-8'>
          Please login to create a business listing.
        </p>
        <Button asChild>
          <Link href='/'>Return to Home</Link>
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccessData(null)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    try {
      const { data: userData, error: userError } = await supabase
        .from('marketplace_users')
        .select('id')
        .eq('id', session.user.id)
        .single()

      if (userError || !userData) {
        throw new Error('Could not find user profile')
      }

      const { data: newBusiness, error: insertError } = await supabase
        .from('companies')
        .insert({
          company_name: formData.get('company_name'),
          description: formData.get('description'),
          price: formData.get('price'),
          industry_type: formData.get('industry_type'),
          image: formData.get('image'),
          seller_id: userData.id,
        })
        .select('id, company_name')
        .single()

      if (insertError) throw insertError

      setSuccessData(newBusiness)
      formRef.current?.reset()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className='hero_container !min-h-[200px]'>
        <h1 className='main_heading'>Create Business Listing</h1>
        <p className='sub-heading'>
          Share your business details with potential buyers
        </p>
      </section>

      <section className='section_container'>
        <div className='max-w-2xl mx-auto'>
          <form ref={formRef} onSubmit={handleSubmit} className='space-y-8'>
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg'>
                {error}
              </div>
            )}

            <div className='space-y-2'>
              <Label htmlFor='company_name'>Company Name</Label>
              <Input
                id='company_name'
                name='company_name'
                required
                placeholder='Enter your company name'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
                required
                placeholder='Describe your business'
                className='min-h-[150px] resize-none'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='price'>Business Value</Label>
                <Input
                  id='price'
                  name='price'
                  required
                  placeholder='100000kr'
                  type='text'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='industry_type'>Industry</Label>
                <select
                  id='industry_type'
                  name='industry_type'
                  required
                  className='business-types'
                >
                  <option value=''>Select Industry</option>
                  {INDUSTRY_TYPES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='image'>Image URL</Label>
              <Input
                id='image'
                name='image'
                required
                placeholder='https://example.com/image.jpg'
                type='url'
              />
              <p className='text-sm text-muted-foreground'>
                Provide a URL for your business image
              </p>
            </div>

            <div className='space-y-4'>
              <div className='flex gap-4'>
                <Button
                  type='submit'
                  className='business-card_btn'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Listing'}
                </Button>

                <Button
                  type='button'
                  variant='outline'
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>

              {successData && (
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <div className='flex items-center gap-2 text-green-600'>
                    <svg
                      className='h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    <p className='font-medium'>
                      Your business &quot;{successData.company_name}&quot; has
                      been listed successfully.
                    </p>
                  </div>
                  <div className='mt-3 flex gap-3'>
                    <Button
                      size='sm'
                      variant='outline'
                      className='text-green-600 border-green-200 hover:bg-green-50'
                      asChild
                    >
                      <Link href={`/business/${successData.id}`}>
                        View Listing
                      </Link>
                    </Button>
                    <Button
                      size='sm'
                      variant='ghost'
                      className='text-gray-600 hover:bg-gray-50'
                      onClick={() => setSuccessData(null)}
                    >
                      Create Another
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
