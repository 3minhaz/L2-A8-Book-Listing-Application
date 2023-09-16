import { Prisma } from '@prisma/client'
import { IPaginationOptions } from '../../../interfaces/pagination'
import prisma from '../../../shared/prisma'
import { userSearchableFields } from './user.constants'
import { IUserFilterRequest } from './user.interface'
import { paginationHelpers } from '../../../helpers/paginationHelper'

const getAllUser = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          [key]: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            equals: (filterData as any)[key],
          },
        }
      }),
    })
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}
  const result = await prisma.user.findMany({
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

  const total = await prisma.user.count({ where: whereConditions })
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
  })

  return result
}

export const UserService = { getAllUser, getSingleUser }
