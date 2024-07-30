import { Router } from 'express';
import auth from "./auth.js"
import jobs from "./jobs.js"

const router = Router()

router.use("/auth", auth);
router.use("/jobs", jobs);

export default router;