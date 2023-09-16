import express from 'express'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { CategoryController } from './category.controller'

const router = express.Router()

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.createCategory
)

export const CategoryRoutes = router
