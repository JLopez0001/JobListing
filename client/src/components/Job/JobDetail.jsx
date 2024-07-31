import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate.js';

function JobDetail({ job, handleApplyForJob, isApplied }) {
  return (
    <article className='jobContainer'>
        <header>
            <h2>{job.title}</h2>
            <h3>Company: {job.company}</h3>
        </header>
        
        <section>
            <h4>Job Information</h4>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Posted on:</strong> <time>{formatDate(job.listingDate)}</time></p>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>Employment Type:</strong> {job.employmentType}</p>
            <p><strong>Work Setting:</strong> {job.remote}</p>
            <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
            <p><strong>Salary Range:</strong> {job.salaryRange ? `$${job.salaryRange}` : 'Not specified'}</p>
            <p><strong>Application Deadline:</strong> {job.applicationDeadline ? formatDate(job.applicationDeadline) : 'Open until filled'}</p>
        </section>
        
        <section>
            <h4>Skills Needed</h4>
            <ul>
            {job.skillsNeeded.map((skill, index) => (
                <li key={index}>{skill}</li>
            ))}
            </ul>
        </section>
        
        <section>
            <h4>Job Description</h4>
            <p>{job.description}</p>
        </section>
        
        <footer className='jobBtn'>
            <h4>Contact Information</h4>
            <p>{job.contactInformation}</p>
            <button 
                onClick={() => handleApplyForJob(job._id)} 
                disabled={isApplied} // Disable button if already applied
            > 
                {isApplied ? "Applied" : "Apply For Job"}
            </button>
        </footer>
    </article>
  )
}

JobDetail.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        listingDate: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        skillsNeeded: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        remote: PropTypes.string.isRequired,
        employmentType: PropTypes.string.isRequired,
        experienceLevel: PropTypes.string.isRequired,
        salaryRange: PropTypes.string,
        applicationDeadline: PropTypes.string,
        contactInformation: PropTypes.string
    }).isRequired,
    handleApplyForJob: PropTypes.func, 
    isApplied: PropTypes.bool,
}

export default JobDetail