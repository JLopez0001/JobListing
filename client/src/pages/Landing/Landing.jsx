import Job from "../../components/Job/Job.jsx"
import JobDetail from "../../components/Job/JobDetail.jsx"
import { useState, useEffect } from "react"
import { getJobs, getJob } from "../../services/jobs.js"
import { applyForJob, getAppliedJobs } from '../../services/users.js'

function Landing() {
    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState(null)
    const [appliedJobs, setAppliedJobs] = useState(new Set());

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await getJobs()
            setJobs(response.data)
        }

        const fetchAppliedJobs = async () => {
            const response = await getAppliedJobs();
            
            // Extract the IDs of the applied jobs
            const appliedJobIds = response.data.map(job => job._id);
            
            // Update the state with the applied job IDs using a Set to ensure uniqueness
            setAppliedJobs(new Set(appliedJobIds));
        };

        fetchAppliedJobs()
        fetchJobs()
    },[])

    const handleJobClick = async (job) => {
        try {
            const jobDetails = await getJob(job);
            setSelectedJob(jobDetails);
        } catch (error) {
            console.error("Error fetching job details:", error);
        }
    };

    const handleApplyForJob = async (jobId) => {
        try {
            const response = await applyForJob(jobId);
            console.log('Applied response:', response);

            /*
            Update the appliedJobs state by adding the new jobId to the existing Set
            Using a Set ensures that the same jobId is not added more than once
            */
            setAppliedJobs(prev => new Set([...prev, jobId]));
        } catch (error) {
            console.error("Error applying for job:", error);
        }
    };

  return (
    <main>
        <header>
            <h1>Checkout all the Jobs</h1>
        </header>   
        {console.log(appliedJobs)}
        <section>
            {selectedJob ? (
                <aside style={{float:'right', width:'48%', overflowY: 'scroll', height: '100vh'}}>
                    <JobDetail 
                        job={selectedJob} 
                        handleApplyForJob={handleApplyForJob}
                        isApplied={appliedJobs.has(selectedJob._id)}
                    />
                </aside>
            ) : (
                <aside style={{float:'right', width:'48%'}}>
                    <h2>Please Click On Job To View Or Apply</h2>
                </aside>
            )
        }
        </section>
        
        <section style={{overflowY: 'scroll', height: '100vh', width: '600px'}}>
            {jobs.map((job) => (
                    <Job 
                        job={job} 
                        key={job._id} 
                        onClick={() => handleJobClick(job._id)}
                    />
                )
            )}
        </section>
    </main>
  )
}

export default Landing