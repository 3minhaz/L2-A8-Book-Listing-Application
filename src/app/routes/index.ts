import express from 'express'
import { authRoutes } from '../modules/auth/auth.route'
import { UserRoutes } from '../modules/user/user.route'
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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
