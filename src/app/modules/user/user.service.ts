// import prisma from "../../../shared/prisma"

import { User } from '@prisma/client'
// import { ICreateUser } from './user.interface'
import prisma from '../../../shared/prisma'
import { ILoginUser } from './user.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data })
  return result
}

const loginUser = async (data: ILoginUser) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist')
  }
  const notMatchedPassword = isUserExist.password !== data.password
  if (notMatchedPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect')
  }

  const { id: userId, role } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )
  return { accessToken, refreshToken }
}

export const UserService = { createUser, loginUser }
