/* eslint-disable @typescript-eslint/no-explicit-any */
import { bookSearchableFields } from './book.constant'
import { Book, Prisma } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IBookFieldsUpdate, IBookFilterableFields } from './book.interface'
import { paginationHelpers } from '../../../helpers/paginationHelper'

const createBook = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
  })
  return result
}

const getAllBooks = async (
  filterableFields: IBookFilterableFields,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { search, ...filtersData } = filterableFields

  const andConditions = []

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(field => {
        if (field === 'minPrice' && filtersData.minPrice) {
          return {
            price: {
              gte: parseFloat(filtersData.minPrice),
            },
          }
        } else if (field === 'maxPrice' && filtersData.maxPrice) {
          return {
            price: {
              lte: parseFloat(filtersData.maxPrice),
            },
          }
        } else {
          return {
            [field]: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              equals: (filtersData as any)[field],
            },
          }
        }
      }),
    })
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  })

  const total = await prisma.book.count({ where: whereConditions })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: { id },
  })
  return result
}

const getBooksByCategoryId = async (
  id: string,
  filterableFields: IBookFilterableFields,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options)
  const { search, ...filtersData } = filterableFields

  const andConditions = []

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        if (key === 'minPrice' && filtersData.minPrice) {
          return {
            price: {
              gte: parseFloat(filtersData.minPrice),
            },
          }
        } else if (key === 'maxPrice' && filtersData.maxPrice) {
          return {
            price: {
              lte: parseFloat(filtersData.maxPrice),
            },
          }
        } else {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          }
        }
      }),
    })
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const total = await prisma.book.count({ where: whereConditions })

  const result = await prisma.book.findMany({
    where: { categoryId: id, ...whereConditions },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  })
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const updateBook = async (id: string, payload: Partial<IBookFieldsUpdate>) => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  })
  return result
}

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  getBooksByCategoryId,
  updateBook,
}
