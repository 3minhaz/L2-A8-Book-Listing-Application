import { Category } from '@prisma/client'
import prisma from '../../../shared/prisma'

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  })
  return result
}

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  })
  return result
}

const getSingleCategories = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  })
  return result
}

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategories,
}
