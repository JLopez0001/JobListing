import { Router } from 'express';
import * as controllers from '../controllers/auth.js'

const router = Router();

//////////////////  ROUTES  ////////////////////////

router.post("/register", controllers.registerUser)
router.post("/login", controllers.loginUser)
router.get('/verify',controllers.verifyUser)

export default router
