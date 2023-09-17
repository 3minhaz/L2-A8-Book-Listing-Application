export type IBookFilterableFields = {
  search?: string
  price?: string
  category?: string
  minPrice?: string
  maxPrice?: string
}

export type IBookFieldsUpdate = {
  title: string
  author: string
  genre: string
  price: number
}
