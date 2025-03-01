import SearchForm from '../../components/SearchForm'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query
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
        <p className='text-30-semibold'>
          {query ? `Search results for ${query}` : 'All availalbe business'}
        </p>

      </section>
    </>
  )
}
