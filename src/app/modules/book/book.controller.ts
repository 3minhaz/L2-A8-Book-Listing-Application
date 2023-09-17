import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { BookService } from './book.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { bookFilterableFields } from './book.constant'
import { paginationFields } from '../../../constants/pagination'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await BookService.createBook(data)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  })
})

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filterableFields = pick(req.query, bookFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await BookService.getAllBooks(filterableFields, options)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  })
})
export const BookController = { createBook, getAllBooks }
