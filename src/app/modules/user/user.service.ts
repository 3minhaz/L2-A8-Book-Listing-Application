import { Prisma, User } from '@prisma/client'
import { IPaginationOptions } from '../../../interfaces/pagination'
import prisma from '../../../shared/prisma'
import { userReturnFields, userSearchableFields } from './user.constants'
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
    select: userReturnFields,
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
    select: userReturnFields,
  })
  return result
}

const updateSingleUser = async (id: string, payload: Partial<User>) => {
  const findEmail = await prisma.user.findFirst({
    where: { id },
    select: { email: true },
  })

  const result = await prisma.user.update({
    where: {
      email: findEmail?.email,
    },
    data: payload,
    select: userReturnFields,
  })
  return result
}

export const UserService = { getAllUser, getSingleUser, updateSingleUser }
