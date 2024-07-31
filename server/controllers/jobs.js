import Jobs from '../models/Jobs.js'

//Get all jobs in database
export const getJobs = async (req,res) => {
    try {
        const jobs = await Jobs.find({});
        console.log(jobs)

        if (jobs.length === 0) {
        return res.status(404).json({ status: "fail", message: "No job listings available at this time" });
        } else {
        return res.status(200).json({ status: "success", data:jobs });
        }
    } catch (error) {
        console.error("Error fetching job listings:", error);
        return res.status(500).json({ status: "error",  message: "An error occurred while fetching job listings. Please try again later." });
    };
};


//Get job by id
export const getJob = async (req,res) => {
    try {
        const job = await Jobs.findById(req.params.id);
        console.log(job)
        if(!job){
            return res.status(404).json({ status: 'fail', message: "Job not found" });
        };

        res.status(200).json({ status: "success", data: job });
    } catch (error) {
        console.error("Error fetching the job by its ID: ", error);
        res.status(500).json({ status: "error", message: "An error occured while fetching job"});
    };
};

export const searchJobs = async (req, res) => {
    try {
      const { title, location, category, company, employmentType, experienceLevel, remote } = req.query;
  
      let jobsQuery = Jobs.find(); // Start with an empty query
  
       // Conditionally apply query helpers based on query parameters
       if (title) jobsQuery = jobsQuery.byName(title);
       if (location) jobsQuery = jobsQuery.byLocation(location);
       if (category) jobsQuery = jobsQuery.byCategory(category);
       if (company) jobsQuery = jobsQuery.byCompany(company);
       if (employmentType) jobsQuery = jobsQuery.find({ employmentType: new RegExp(employmentType, 'i') });
       if (experienceLevel) jobsQuery = jobsQuery.find({ experienceLevel: new RegExp(experienceLevel, 'i') });
       if (remote) jobsQuery = jobsQuery.find({ remote: new RegExp(remote, 'i') });

       const jobs = await jobsQuery.exec();

       if (jobs.length === 0) {
           return res.status(404).json({ status: "fail", message: "No job listings available with the specified criteria." });
       }

       return res.status(200).json({ status: "success", data: jobs });
    } catch (error) {
      console.error("Error fetching job listings:", error);
      return res.status(500).json({ status: "error", message: "An error occurred while fetching job listings. Please try again later." });
    }
  };


////////////////// BACKEND TESTING /////////////////////

// //Get job by name by calling a query heler in Job Model
// export const getJobsByTitle = async(req,res) => {
//     try{
//         const jobs = await Jobs.find().byName(req.params.title);
 
//         if(jobs.length === 0){
//             return res.status(404).json({ status: "fail", message: "No jobs found with that name"});
//         };

//         res.status(200).json({ status: "success", data: jobs })
//     } catch (error) {
//         console.error("Error fetching the jobs by this name");
//         res.status(500).json({ status: "error", message: "Error occured while fetching jobs"});
//     };
// };


// //Get jobs by category
// export const getJobsByCategory = async (req,res) => {
//     try {
//         const jobs = await Jobs.find().byCategory(req.params.category);

//         if(jobs.length === 0){
//             return res.status(404).json({ status: "fail", message: "No jobs found with that category"});
//         };

//         res.status(200).json({ status: "success", data: jobs});
//     } catch (error) {
//         console.error("Error fetching the jobs by this category");
//         res.status(500).json({ status: "error", message: "Error occured while fetching jobs"});
//     };
// };


// //Get jobs by location
// export const getJobsByLocation = async (req,res) => {
//     try {
//         const jobs = await Jobs.find().byLocation(req.params.location);

//         if(jobs.length === 0){
//             return res.status(404).json({ status: "fail", message: "No jobs found within that location" });
//         };

//         res.status(200).json({ status: "success", data: jobs});
//     } catch (error) {
//         console.error("Error occured fetching the job by location");
//         res.status(500).json({ status : "error", message: "Error getting jobs by this location. Try again" });
//     };
// };


// //Get jobs by company
// export const getJobsByCompany = async (req,res) => {
//     try {
//         const jobs = await Jobs.find().byCompany(req.params.company);

//         if(jobs.length === 0){
//             return res.status(404).json({ status: "fail", message: "No jobs found within that company" });
//         };

//         res.status(200).json({ status: "success", data: jobs })
//     } catch (error) {
//         console.error("Error occured fetching the job by company");
//         res.status(500).json({ status : "error", message: "Error getting jobs by this company. Try again" });
//     };
// };


// //Get jobs by work setting (remote, fulltime, hybrid )
// export const getJobsBySetting = async (req, res) => {
//     try {
//         const jobs = await Jobs.find({ remote: req.params.remote });

//         if(jobs.length === 0){
//             return res.status(404).json({ status: "fail", message: "No jobs found within that work setting" });
//         };

//         res.status(200).json({ status: "success", data: jobs})
//     } catch (error) {
//         console.error("Error occured fetching the job by work setting");
//         res.status(500).json({ status : "error", message: "Error getting jobs by this work setting. Try again" });
//     };
// };

// //Get jobs by employment type
// export const getJobsByEmploymentType = async (req,res) => {
//     try {
//         const jobs = await Jobs.find({ employmentType: req.params.employmentType })

//         if(jobs.length === 0){
//             return res.status(404).json({ status: "fail", message: "No jobs found within that employment type" });
//         };

//         res.status(200).json({ status: "success", data: jobs})
//     } catch (error) {
//         console.error("Error occured fetching the job by employment type");
//         res.status(500).json({ status : "error", message: "Error getting jobs by this employment type. Try again" });
//     };
// };


// //Get jobs by experience
// export const getJobsByExperience = async(req,res) => {
//     try {
//         const jobs = await Jobs.find({ experienceLevel: req.params.experienceLevel });

//         if(jobs.length === 0){
//             return res.status(404).json({ status: "fail", message: "No jobs found within that experience" });
//         };

//         res.status(200).json({ status: "success", data: jobs })
//     } catch (error) {
//         console.error("Error occured fetching the job by  experience");
//         res.status(500).json({ status : "error", message: "Error getting jobs by this experience. Try again" });
//     };
// };











