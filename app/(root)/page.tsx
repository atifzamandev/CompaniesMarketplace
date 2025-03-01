import BusinessCard from '@/components/BusinessCard'
import SearchForm from '../../components/SearchForm'
import { BusinessInfo } from '@/Types/business'

interface HomeProps {
  searchParams: Promise<{ query: string }>
}
export default async function Home({ searchParams }: HomeProps) {
  const query = (await searchParams).query

  const bussinessInfo = [
    {
      _id: 1,
      companyName: 'Nordic AI Tech',
      description: 'Foucus on inovative AI solutions for Nordic countries.',
      price: '500000kr',
      industryType: 'Tech',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      sellerInfo: {
        _id: 1,
        name: 'Atif Zaman',
        email: 'atifzaman88010@gmail.com',
        phone: '0769862341',
      },
    },
    {
      _id: 2,
      companyName: 'Nordic AI Startup',
      description: 'Foucus on inovative AI solutions for Nordic countries.',
      price: '500000kr',
      industryType: 'Tech',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      sellerInfo: {
        _id: 2,
        name: 'Atif Zaman',
        email: 'atifzaman88010@gmail.com',
        phone: '0769862341',
      },
    },
    {
      _id: 3,
      companyName: 'Medical Store',
      description: 'Foucus on inovative AI solutions for Nordic countries.',
      price: '500000kr',
      industryType: 'Tech',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      sellerInfo: {
        _id: 3,
        name: 'Atif Zaman',
        email: 'atifzaman88010@gmail.com',
        phone: '0769862341',
      },
    },
    {
      _id: 4,
      companyName: 'Nordic Cloths',
      description: 'Foucus on inovative AI solutions for Nordic countries.',
      price: '500000kr',
      industryType: 'Tech',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      sellerInfo: {
        _id: 4,
        name: 'Atif Zaman',
        email: 'atifzaman88010@gmail.com',
        phone: '0769862341',
      },
    },
  ]

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
          {bussinessInfo.length > 0 ? (
            bussinessInfo.map((bussiness: BusinessInfo) => (
              <BusinessCard key={bussiness._id} business={bussiness} />
            ))
          ) : (
            <p className='no-results'>No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}
