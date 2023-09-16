import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CategoryService } from './category.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await CategoryService.createCategory(data)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    data: result,
  })
})

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories fetched Successfully',
    data: result,
  })
})

const getSingleCategories = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await CategoryService.getSingleCategories(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category fetched Successfully',
    data: result,
  })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await CategoryService.updateCategory(id, payload)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category updated Successfully',
    data: result,
  })
})

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategories,
  updateCategory,
}
