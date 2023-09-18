import prisma from '../../../shared/prisma'
import { userReturnFields } from '../user/user.constants'

const getMyProfile = async (id: string) => {
  const result = await prisma.user.findFirst({
    where: { id },
    select: userReturnFields,
  })
  return result
}

export const ProfileService = { getMyProfile }
