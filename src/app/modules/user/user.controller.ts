import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { userFilterableFields } from './user.constants'
import { paginationFields } from '../../../constants/pagination'

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await UserService.getAllUser(filters, options)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Get all users successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.getSingleUser(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single user fetched successfully',
    data: result,
  })
})

// const loginUser = catchAsync(async (req: Request, res: Response) => {
//   const data = req.body
//   const result = await UserService.loginUser(data)
//   const { refreshToken, ...others } = result

//   // set refresh token into cookie
//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   }

//   res.cookie('refreshToken', refreshToken, cookieOptions)

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'User Logged in successfully',
//     data: others,
//   })
// })
export const UserController = { getAllUser, getSingleUser }
