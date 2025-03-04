export interface FilterOptions {
  query?: string
  industry?: string
  minPrice?: string
  maxPrice?: string
}

export interface PriceRange {
  min: number
  max: number
}
