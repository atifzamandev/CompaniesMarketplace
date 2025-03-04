import { createClient } from '@/app/utils/supabase/server'
import BusinessCard from '@/components/BusinessCard'
import { Button } from '@/components/ui/button'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()

  const { data: user, error: userError } = await supabase
    .from('marketplace_users')
    .select('*')
    .eq('id', (await params).id)
    .single()

  if (userError || !user) {
    return notFound()
  }

  const { data: userBusinesses, error: businessError } = await supabase
    .from('companies')
    .select(
      `                                                                                                                        
       *,                                                                                                                             
       sellerInfo:marketplace_users (                                                                                                 
         id,                                                                                                                          
         name,                                                                                                                        
         email,
         image                                                                                                                        
       )                                                                                                                              
     `
    )
    .eq('seller_id', user.id)

  const sellerImage = user.image || 'https://placehold.co/128x128'

  if (businessError) {
    console.error('Error fetching businesses:', businessError)
  }

  return (
    <>
      <section className='hero_container !min-h-[240px]'>
        <div className='flex flex-col items-center gap-4'>
          <Image
            src={sellerImage}
            alt={user.name}
            width={128}
            height={128}
            className='rounded-full border-4 border-white shadow-lg'
          />
          <h1 className='text-30-extrabold text-white'>{user.name}</h1>
          <p className='text-14-normal'>{user.user_type}</p>
        </div>
      </section>

      <section className='section_container'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
            <h2 className='text-24-semibold mb-4'>Contact Information</h2>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Mail className='size-6 text-blue-500' />
                <p className='text-16-medium'>{user.email}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='size-6 text-blue-500' />
                <p className='text-16-medium'>{user.phone}</p>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <h2 className='text-24-semibold'>
              {userBusinesses && userBusinesses.length > 0
                ? 'Listed Businesses'
                : 'No Businesses Listed'}
            </h2>

            {userBusinesses && userBusinesses.length > 0 ? (
              <ul className='card_grid'>
                {userBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </ul>
            ) : (
              <div className='text-center py-8 bg-blue-50 rounded-lg'>
                <p className='text-16-medium text-blue-900 mb-4'>
                  This user has not listed any businesses yet.
                </p>
                <Button asChild>
                  <Link href='/'>Browse Other Listings</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
