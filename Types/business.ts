export interface SellerInfo {
  id: number
  name: string
  email: string
  phone: string
}

export interface BusinessInfo {
  id: number
  company_name: string
  description: string
  price: string
  industry_type: string
  image: string
  sellerInfo: SellerInfo
}
