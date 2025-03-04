import BusinessCard from '@/components/BusinessCard'
import BusinessFilter from '@/components/SearchFilter'
import { BusinessInfo } from '@/types/business'
import { FilterOptions } from '@/types/filters'
import { createClient } from '../utils/supabase/server'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<FilterOptions>
}) {
  const params = await Promise.resolve(searchParams)
  const supabase = await createClient()

  const { data: companies } = await supabase
    .from('companies')
    .select('industry_type, price')
    .not('industry_type', 'is', null)
    .not('price', 'is', null)

  const uniqueIndustries = [...new Set(companies?.map((c) => c.industry_type))]

  const priceRange = companies?.reduce(
    (acc, c) => {
      const price = parseFloat(c.price.replace(/[^0-9.-]+/g, ''))
      return {
        min: Math.min(acc.min, price),
        max: Math.max(acc.max, price),
      }
    },
    { min: Infinity, max: -Infinity }
  ) || { min: 0, max: 0 }

  let query = supabase.from('companies').select('*, sellerInfo: seller_id(*)')

  if (params.query) {
    query = query.ilike('company_name', `%${params.query}%`)
  }
  if (params.industry) {
    query = query.eq('industry_type', params.industry)
  }
  if (params.minPrice || params.maxPrice) {
    query = query
      .gte('price', Number(params.minPrice ?? priceRange.min))
      .lte('price', Number(params.maxPrice ?? priceRange.max))
  }

  const { data: businesses, error } = await query

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
        <p className='sub-heading !max-w-3xl mb-8'>
          Open place to sell and buy business
        </p>
        <div className='w-full max-w-4xl mx-auto'>
          <BusinessFilter
            industries={uniqueIndustries}
            priceRange={priceRange}
          />
        </div>
      </section>

      <section className='section_container'>
        <div className='mb-6'>
          <div className='flex justify-between items-center'>
            <h2 className='text-24-semibold'>
              {params.query
                ? `Search results for "${params.query}"`
                : `All available ${
                    businesses.length === 1 ? 'business' : 'businesses'
                  }`}
            </h2>
            <p className='text-16-medium'>
              {businesses.length === 1 ? 'business' : 'businesses'} found
            </p>
          </div>
        </div>

        <ul className='card_grid'>
          {businesses.length > 0 ? (
            businesses.map((business: BusinessInfo) => (
              <BusinessCard key={business.id} business={business} />
            ))
          ) : (
            <p className='text-20-medium text-center py-8'>
              No business found matching your criteria
            </p>
          )}
        </ul>
      </section>
    </>
  )
}
