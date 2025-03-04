import { createClient } from '@/app/utils/supabase/server'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()

  const { data: business, error } = await supabase
    .from('companies')
    .select(
      `                                                                                                                        
       *,                                                                                                                             
       seller:marketplace_users (                                                                                                     
         id,                                                                                                                     
         name,                                                                                                                        
         email                                                                                                                        
       )                                                                                                                              
     `
    )
    .eq('id', (await params).id)
    .single()

  if (error || !business) {
    return notFound()
  }
  return (
    <>
      <section className='hero_container !min-h-[340px]'>
        <h1 className='main_heading'>{business.company_name}</h1>
        <p className='sub-heading !max-w-5xl'>{business.description}</p>
      </section>

      <section className='section_container'>
        <Image
          src={business.image}
          alt={business.company_name}
          width={1200}
          height={600}
          className='w-full h-auto rounded-xl'
        />

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link
              href={`/user/${business.seller.id}`}
              className='flex gap-2 items-center mb-3'
            >
              <Image
                src='https://placehold.co/64x64'
                alt='avatar'
                width={64}
                height={64}
                className='rounded-full drop-shadow-lg'
              />

              <div>
                <p className='text-20-medium'>{business.seller.name}</p>
                <p className='text-16-medium !text-black-300'>
                  {business.seller.email}
                </p>
              </div>
            </Link>

            <p className='category-tag'>{business.industry_type}</p>
          </div>

          <div className='space-y-4'>
            <h3 className='text-30-bold'>Business Details</h3>
            <div className='prose max-w-4xl font-work-sans'>
              <p>{business.description}</p>
              <p className='text-24-semibold mt-4'>
                Business Value Price:{' '}
                <span className='business-price'>{business.price}</span>
              </p>
            </div>
          </div>

          <div className='flex gap-4 mt-8'>
            <Button className='business-card_btn' asChild>
              <Link href={`/contact/${business.seller.user_id}`}>
                Contact Seller
              </Link>
            </Button>

            <Button variant='outline' asChild>
              <Link href='/'>Back to Listings</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
