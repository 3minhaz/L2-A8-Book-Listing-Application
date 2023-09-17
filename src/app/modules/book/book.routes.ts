import express from 'express'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { BookController } from './book.controller'

const router = express.Router()

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
)

router.get('/', BookController.getAllBooks)
export const BookRoutes = router
