import api from "./apiConfig.js";

export const getJobs = async () => {
    try {
        const response = await api.get('/jobs/listings');
        return response.data
    } catch (error) {
        console.error("Error fetching jobs:", error);
        
        // Check if the error has a response property (meaning it's an HTTP error)
        if (error.response) {
            // Client received an error response
            const message = error.response.data?.message || "An error occurred while fetching jobs.";
            throw new Error(message);
        } else if (error.request) {
            // Client never received a response, or request never left
            throw new Error("No response from the server. Please check your internet connection or try again later.");
        } else {
            // Anything else
            throw new Error("An unexpected error occurred. Please try again.");
        }
    }
};

export const getJob = async (id) => {
    try {
        const response = await api.get(`/jobs/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching job:", error);
        
        // Check if the error has a response property (meaning it's an HTTP error)
        if (error.response) {
            // Client received an error response
            const message = error.response.data?.message || "An error occurred while fetching job.";
            throw new Error(message);
        } else if (error.request) {
            // Client never received a response, or request never left
            throw new Error("No response from the server. Please check your internet connection or try again later.");
        } else {
            // Anything else
            throw new Error("An unexpected error occurred. Please try again.");
        }
    }
};

export const searchJobs = async (searchParams) => {
    try {
        const queryString = new URLSearchParams(searchParams).toString();
        const response = await api.get(`/jobs/search/listings?${queryString}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching job listings:", error);
    
        // Handle different types of errors 
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
    
        throw error;  
    }
}