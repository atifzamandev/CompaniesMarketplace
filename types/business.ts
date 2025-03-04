export interface UserInfo {
  id: number
  name: string
  email: string
  phone: string
  image: string
  user_type: 'buyer|seller'
}

export interface BusinessInfo {
  id: number
  company_name: string
  description: string
  price: string
  industry_type: string
  image: string
  sellerInfo: UserInfo
}
