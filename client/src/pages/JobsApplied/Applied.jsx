import { useState, useEffect } from "react"
import Job from '../../components/Job/Job.jsx'
import JobDetail from '../../components/Job/JobDetail.jsx'
import { getAppliedJobs } from "../../services/users.js"
import { getJob } from "../../services/jobs"

function Applied() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null)

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            const response = await getAppliedJobs();
            console.log(response)
            setJobs(response.data)
        }

        fetchAppliedJobs()
    },[])

    const handleJobClick = async (job) => {
        try {
            const jobDetails = await getJob(job);
            setSelectedJob(jobDetails);
        } catch (error) {
            console.error("Error fetching job details:", error);
        }
    };

  return (
    <main>
        <header>
            <h1>Jobs You Applied To</h1>
        </header>

        <section>
            {selectedJob ? (
                <aside style={{float:'right', width:'48%', overflowY: 'scroll', height: '100vh'}}>
                    <JobDetail job={selectedJob} isApplied={true}/>
                </aside>
            ) : (
                <aside style={{float:'right', width:'48%'}}>
                    <h2>Please Click On Job To View</h2>
                </aside>
            )}
        </section>
        
        <section style={{overflowY: 'scroll', height: '100vh', width: '600px'}}>
            {jobs.map((job) => (
                <Job job={job} key={job._id} onClick={() => handleJobClick(job._id)}/>
            ))}
        </section>
    </main>
  )
}

export default Applied