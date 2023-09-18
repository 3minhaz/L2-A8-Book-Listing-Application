import express from 'express'
import { authRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
import { CategoryRoutes } from '../modules/category/category.routes'
import { BookRoutes } from '../modules/book/book.routes'
import { OrderRoutes } from '../modules/order/order.route'
import { profileRoutes } from '../modules/profile/profile.route'
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
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
