import express from 'express';
const router = express.Router();

const init = 'name'

const moduleRoutes = [
  // ... routes
  {
    path: "/academic-semesters",
    // route: AcademicSemeterRoutes
    route: init
  },
  
];

console.log(moduleRoutes);
// moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
