export interface SellerInfo {
  _id: number
  name: string
  email: string
  phone: string
}

export interface BusinessInfo {
  _id: number
  companyName: string
  description: string
  price: string
  industryType: string
  image: string
  sellerInfo: SellerInfo
}
