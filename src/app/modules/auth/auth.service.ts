import { User } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { ILoginUser } from './auth.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import { decryptPassword, hashPassword } from './auth.utils'

const createUser = async (data: User): Promise<User> => {
  const { password, ...others } = data
  const encryptPassword = await hashPassword(password)
  const updatedData = { ...others, password: encryptPassword }
  const result = await prisma.user.create({ data: updatedData })
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
  const checkPasswordMatched = await decryptPassword({
    userPassword: data.password,
    storedPassword: isUserExist.password,
  })
  if (!checkPasswordMatched) {
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

export const AuthService = { createUser, loginUser }
