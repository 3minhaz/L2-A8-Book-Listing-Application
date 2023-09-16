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

router.get('/', CategoryController.getAllCategories)
router.get('/:id', CategoryController.getSingleCategories)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.updateCategory
)

export const CategoryRoutes = router
