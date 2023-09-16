import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CategoryService } from './category.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

export const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body
    const result = await CategoryService.createCategory(data)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category created successfully',
      data: result,
    })
  }
)

export const CategoryController = { createCategory }
