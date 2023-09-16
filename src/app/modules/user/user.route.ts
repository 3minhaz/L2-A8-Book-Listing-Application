import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUser
)

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateSingleUser
)

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)
// router.post('/signin', UserController.loginUser)

export const UserRoutes = router
