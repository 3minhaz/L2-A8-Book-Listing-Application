// import prisma from "../../../shared/prisma"

import { User } from '@prisma/client'
// import { ICreateUser } from './user.interface'
import prisma from '../../../shared/prisma'

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data })
  return result
}

export const UserService = { createUser }
