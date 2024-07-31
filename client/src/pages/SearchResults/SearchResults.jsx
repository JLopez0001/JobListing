import { useState } from "react"
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import { searchJobs, getJob } from '../../services/jobs.js'
import { applyForJob } from '../../services/users.js'
import Job from '../../components/Job/Job.jsx'
import JobDetail from '../../components/Job/JobDetail.jsx'

function SearchResults() {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null)
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [searchPerformed, setSearchPerformed] = useState(false); 


    const handleSearch = async (searchParams) => {
        try {
            setJobs([])
            const results = await searchJobs(searchParams); 
            setJobs(results.data); 
            setSearchPerformed(true);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
            setSearchPerformed(true);
        }
    };

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
            <SearchBar  onSearch={handleSearch} />
            <h1>Your search results: </h1>
            <section>
                {selectedJob ? (
                    <aside style={{float:'right', width:'48%', overflowY: 'scroll', height: '100vh'}}>
                        <JobDetail 
                            job={selectedJob} 
                            isApplied={appliedJobs.has(selectedJob._id)}
                            handleApplyForJob= {handleApplyForJob}
                        />
                    </aside>
                ) : (
                    <aside style={{float:'right', width:'48%'}}>
                        {searchPerformed && <h2>Please Click On Job To View</h2>}
                    </aside>
                )}
            </section>
            
            <section style={{overflowY: 'scroll', height: '100vh', width: '600px'}}>
                {searchPerformed && jobs.length === 0 ? (
                    <h1>No Results Found</h1>
                ) : (
                    jobs.map((job) => (
                        <Job 
                            job={job} 
                            key={job._id} 
                            onClick={() => handleJobClick(job._id)}
                        />
                    ))
                )}
            </section>
        </main>
    )
}

export default SearchResults