import bcrypt from 'bcrypt'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IDecryptPassword } from './user.interface'

export const hashPassword = async (password: string) => {
  const hashing = await bcrypt
    .hash(password, parseInt(config.bycrypt_salt_rounds!))
    .then(function (hash) {
      return hash
    })
    .catch(err => {
      throw new ApiError(401, err)
    })
  return hashing
}

export const decryptPassword = async ({
  userPassword,
  storedPassword,
}: IDecryptPassword) => {
  const compare = await bcrypt
    .compare(userPassword, storedPassword)
    .then(function (result) {
      return result
    })
    .catch(err => {
      throw new ApiError(401, err)
    })
  return compare
}
