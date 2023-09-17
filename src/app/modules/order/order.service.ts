import prisma from '../../../shared/prisma'
import { OrderBooks, createOrderBody } from './order.interface'

const createOrder = async (data: createOrderBody, userId: string) => {
  const result = await prisma.$transaction(async tx => {
    const order = await tx.order.create({ data: { userId } })
    const orderedBooks = await Promise.all(
      data?.orderedBooks.map(async ({ bookId, quantity }: OrderBooks) => {
        return tx.orderedBook.create({
          data: {
            bookId,
            quantity,
            orderId: order.id,
          },
        })
      })
    )
    return {
      id: order.id,
      userId: order.userId,
      orderedBooks: orderedBooks.map(item => ({
        bookId: item.bookId,
        quantity: item.quantity,
      })),
      status: order.status,
      createdAt: order.createdAt,
    }
  })
  return result
}

const getAllOrder = async (role: string, userId: string) => {
  if (role === 'admin') {
    return await prisma.order.findMany({ include: { orderBooks: true } })
  } else if (role === 'customer') {
    return await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderBooks: {
          select: {
            bookId: true,
            quantity: true,
          },
        },
      },
    })
  }
}
export const OrderService = { createOrder, getAllOrder }
