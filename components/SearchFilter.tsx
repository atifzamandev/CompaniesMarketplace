'use client'

import { PriceRange } from '@/Types/filters'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'

interface SearchFilterProps {
  industries: string[]
  priceRange: PriceRange
}

const SearchFilter = ({ industries, priceRange }: SearchFilterProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    query: searchParams.get('query') || '',
    industry: searchParams.get('industry') || '',
    minPrice: searchParams.get('minPrice') || priceRange.min,
    maxPrice: searchParams.get('maxPrice') || priceRange.max,
  })

  const deferredFilters = useDeferredValue(filters)

  const searchParamsString = useMemo(() => {
    const params = new URLSearchParams()

    if (deferredFilters.query) params.set('query', deferredFilters.query)
    if (deferredFilters.industry)
      params.set('industry', deferredFilters.industry)
    if (deferredFilters.minPrice !== priceRange.min)
      params.set('minPrice', deferredFilters.minPrice.toString())
    if (deferredFilters.maxPrice !== priceRange.max)
      params.set('maxPrice', deferredFilters.maxPrice.toString())

    return params.toString()
  }, [deferredFilters, priceRange.min, priceRange.max])

  useEffect(() => {
    router.push(`/?${searchParamsString}`)
  }, [router, searchParamsString])

  const resetFilters = () => {
    setFilters({
      query: '',
      industry: '',
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    })
  }

  const hasActiveFilters =
    filters.query ||
    filters.industry ||
    filters.minPrice !== priceRange.min ||
    filters.maxPrice !== priceRange.max

  return (
    <div className='bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='md:col-span-2'>
          <input
            type='text'
            value={filters.query}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, query: e.target.value }))
            }
            className='filter-input'
            placeholder='Search businesses...'
          />
        </div>

        <div>
          <select
            value={filters.industry}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, industry: e.target.value }))
            }
            className='filter-select'
          >
            <option value=''>All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className='flex gap-2'>
          <input
            type='number'
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: Number(e.target.value),
              }))
            }
            className='filter-input'
            placeholder='Min Price'
          />
          <input
            type='number'
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice: Number(e.target.value),
              }))
            }
            className='filter-input'
            placeholder='Max Price'
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className='mt-4 flex items-center gap-2'>
          <div className='flex flex-wrap gap-2'>
            {filters.query && (
              <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                Search: {filters.query}
              </span>
            )}
            {filters.industry && (
              <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                {filters.industry}
              </span>
            )}
            {(filters.minPrice !== priceRange.min ||
              filters.maxPrice !== priceRange.max) && (
              <span className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'>
                ${filters.minPrice} - ${filters.maxPrice}
              </span>
            )}
          </div>
          <button
            onClick={resetFilters}
            className='text-sm text-blue-600 hover:text-blue-800'
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchFilter
