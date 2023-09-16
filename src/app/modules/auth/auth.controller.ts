import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import config from '../../../config'
import { AuthService } from './auth.service'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.createUser(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await AuthService.loginUser(data)
  const { refreshToken, ...others } = result

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Logged in successfully',
    data: others,
  })
})
export const AuthController = { createUser, loginUser }
