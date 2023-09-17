import { BookCategory } from '@prisma/client'
import prisma from '../../../shared/prisma'

const createCategory = async (data: BookCategory): Promise<BookCategory> => {
  const result = await prisma.bookCategory.create({
    data,
  })
  return result
}

const getAllCategories = async () => {
  const result = await prisma.bookCategory.findMany({})
  return result
}

const getSingleCategories = async (id: string) => {
  const result = await prisma.bookCategory.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  })
  return result
}

const updateCategory = async (id: string, payload: Partial<BookCategory>) => {
  const result = await prisma.bookCategory.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

const deleteCategory = async (id: string) => {
  const result = await prisma.bookCategory.delete({
    where: { id },
  })
  return result
}

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategories,
  updateCategory,
  deleteCategory,
}
