export type OrderBooks = {
  bookId: string
  quantity: number
}

export type createOrderBody = {
  orderedBooks: OrderBooks[]
}
