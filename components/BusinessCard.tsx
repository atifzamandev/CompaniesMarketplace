import { BusinessInfo } from '@/Types/business'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const BusinessCard = ({ business }: { business: BusinessInfo }) => {
  const {
    id,
    company_name,
    description,
    price,
    industry_type,
    image,
    sellerInfo: { id: sellerId, name },
  } = business

  return (
    <>
      <li className='business-card group'>
        <div className='flex-between mt-2 gap-3'>
          <Link href={`/business/${id}`}>
            <h3 className='text-24-semibold'>{company_name}</h3>
          </Link>

          <data value={price} className='business-price'>
            {price}
          </data>
        </div>

        <Link href={`/business/${id}`}>
          <p className='business-card_desc'>{description}</p>
          <Image
            src={image ?? 'https://placehold.co/600x400'}
            alt={company_name ?? 'Placeholder'}
            className='business-card_img'
            width={600}
            height={400}
          />
        </Link>

        <div className='flex-between gap-3 mt-5'>
          <Link href={`/?query=${industry_type?.toLowerCase()}`}>
            <p className='text-16-medium'>{industry_type}</p>
          </Link>

          <Button className='business-card_btn' asChild>
            <Link href={`/business/${id}`}> Details </Link>
          </Button>
        </div>
        <div className='flex-between mt-2 gap-3'>
          <Link href={`/user/${sellerId}`}>
            <p className='text-16-medium line-clamp-1 pb-3'>Owner: {name}</p>
          </Link>

          <Link href={`/user/${sellerId}`}>
            <Image
              src='https://placehold.co/48x48'
              alt='Placeholder'
              width={48}
              height={48}
              className='rounded-full'
            />
          </Link>
        </div>
      </li>
    </>
  )
}

export default BusinessCard
