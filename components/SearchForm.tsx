import React from 'react'
import Form from 'next/form'
import SearchButton from './SearchButton'
import { Search } from 'lucide-react'

interface SearchForm {
  query?: string
}

const SearchForm = ({ query }: SearchForm) => {
  return (
    <Form action='/' scroll={false} className='search-form'>
      <input
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='Search and filter businesses'
      />
      <div className='flex gap-2'>
        <div className='flex gap-2'>
          {query && <SearchButton />}
          <button type='submit' className='search-btn text-white'>
            <Search className='size-5' />
          </button>
        </div>
      </div>
    </Form>
  )
}

export default SearchForm
