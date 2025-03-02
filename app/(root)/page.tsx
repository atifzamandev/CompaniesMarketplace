import BusinessCard from '@/components/BusinessCard'
import SearchForm from '../../components/SearchForm'
import { BusinessInfo } from '@/Types/business'
import { createClient } from '../utils/supabase/server'

interface HomeProps {
  searchParams: Promise<{ query: string }>
}
export default async function Home({ searchParams }: HomeProps) {
  const query = (await searchParams).query

  const supabase = await createClient()

  const { data: businesses, error } = await supabase
    .from('company')
    .select('*, sellerInfo: seller_id(*)')
    .ilike('company_name', `%${query || ''}%`)

  if (error) {
    console.error('Error fetching businesses:', error.message)
    return <p className='text-red-500'>Failed to load businesses.</p>
  }
  return (
    <>
      <section className='hero_container'>
        <h1 className='main_heading'>
          Share your company <br /> To sell on marketplace
        </h1>

        <p className='sub-heading !max-w-3xl'>
          Open place to sell and buy business
        </p>
        <SearchForm query={query} />
      </section>

      <section className='section_container'>
        <p className='text-24-semibold'>
          {query ? `Search results for ${query}` : 'All availalbe businesses'}
        </p>

        <ul className='mt-7 card_grid'>
          {businesses.length > 0 ? (
            businesses.map((bussiness: BusinessInfo) => (
              <BusinessCard key={bussiness.id} business={bussiness} />
            ))
          ) : (
            <p className='no-results'>No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}
