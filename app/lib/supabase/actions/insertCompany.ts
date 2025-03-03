'use server'

import { createClient } from '@/app/utils/supabase/server'

export async function insertCompany(formData: FormData) {
  const supabase = await createClient()

  const { company_name, description, price, industry_type, image, sellerId } =
    Object.fromEntries(formData)

  const { data, error } = await supabase.from('companies').insert([
    {
      company_name,
      description,
      price,
      industry_type,
      image,
      seller_id: Number(sellerId),
    },
  ])

  if (error) {
    throw new Error(error.message)
  }

  return data
}
