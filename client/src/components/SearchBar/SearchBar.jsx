import { useState } from "react";
import PropTypes from 'prop-types';
import './SearchBar.css'

function SearchBar({ onSearch }) {

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        category: '',
        company: '',
        employmentType: '',
        experienceLevel: '',
        remote: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSearch(formData);
    };
    

    return (
        <main>
            <form onSubmit={onSubmit} id="jobSearchForm" >
                <header>
                    <h1>Search Your Next Job</h1>
                </header>

                <section className="searchGroup">
                    <div>
                        <label htmlFor="title">Job Title: </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="UX Designer"
                        />
                    </div>

                    <div>
                        <label htmlFor="location">Location: </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="New York"
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Category: </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="IT"
                        />
                    </div>

                    <div>
                        <label htmlFor="company">Company: </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Google"
                        />   
                    </div>
                </section>

                <fieldset>
                    <legend>Job Details</legend>

                    <section className="searchFieldSet">
                        <label htmlFor="employmentType">Employment Type: </label>
                        <select
                            id="employmentType"
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </section>

                    <section className="searchFieldSet">
                        <label htmlFor="experienceLevel">Experience Level: </label>
                        <select
                            id="experienceLevel"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Entry-level">Entry-level</option>
                            <option value="Mid-level">Mid-level</option>
                            <option value="Senior">Senior</option>
                            <option value="Executive">Executive</option>
                        </select>
                    </section>

                    <section className="searchFieldSet">
                        <label htmlFor="remote">Remote Status: </label>
                        <select
                            id="remote"
                            name="remote"
                            value={formData.remote}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="On-site">On-site</option>
                        </select>
                    </section>

                </fieldset>
                <button type="submit">Search</button>
            </form>
        </main>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar