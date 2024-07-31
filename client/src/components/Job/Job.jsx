import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate.js'
import './Job.css'

function Job({job, onClick}) {
  return (
    <div className='jobContainer'>
        <section>
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>
            <p>{job.location}</p>
            <p>${job.salaryRange}</p>
            <p>Posted on <time>{formatDate(job.listingDate)}</time></p>
        </section>

        <section className="jobBtn">
          <button onClick={() => onClick(job._id)}>View Job</button>
        </section>
    </div>
  );
}

// Define PropTypes for the Job component
Job.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    salaryRange: PropTypes.string,
    listingDate: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired, 
};


export default Job;