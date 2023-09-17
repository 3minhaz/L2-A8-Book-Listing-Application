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

export const updateSingleUser = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const payload = req.body
    const result = await UserService.updateSingleUser(id, payload)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Updated user successfully',
      data: result,
    })
  }
)

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.deleteUser(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  })
})

export const UserController = {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
}
