import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ProfileService } from './profile.service'
import sendResponse from '../../../shared/sendResponse'

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userId
  const result = await ProfileService.getMyProfile(id)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'My profile retrieved successfully',
    data: result,
  })
})

export const profileController = { getMyProfile }
