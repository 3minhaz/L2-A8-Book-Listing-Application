import express from 'express'
import { authRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { CategoryRoutes } from '../modules/category/category.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
