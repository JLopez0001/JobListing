import { Router } from "express";
import * as controllers from "../controllers/jobs.js"

const router = Router();

//////////////////  ROUTES  ////////////////////////

router.get("/listings", controllers.getJobs);
router.get("/:id", controllers.getJob);
router.get("/search/listings", controllers.searchJobs);

////////// SEARCHING SPECIFIC FIELDS FOR DEGGUBING ///////

// router.get("/title/:title", controllers.getJobsByTitle);
// router.get("/category/:category", controllers.getJobsByCategory);
// router.get("/location/:location", controllers.getJobsByLocation);
// router.get("/company/:company", controllers.getJobsByCompany);
// router.get("/workSetting/:remote", controllers.getJobsBySetting);
// router.get("/employment/:employmentType", controllers.getJobsByEmploymentType);
// router.get("/experienceLevel/:experienceLevel", controllers.getJobsByExperience)

export default router;