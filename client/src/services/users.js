import api from "./apiConfig.js";
import {jwtDecode}  from "jwt-decode";

export const register = async (credentials) => {
    try {
        const response = await api.post("auth/register", credentials);
        console.log(response)

        // Set token in local storage
        localStorage.setItem("token", response.data.token);

        // Decode the token to get the user information
        const user = jwtDecode(response.data.token);

        return user
    } catch (error) {
        console.log('erro',error)
        // Log the error for debugging purposes
        console.error("Register error:", error);

        // Transform the error into a user-friendly message or custom error object
        const errorMessage =
          error.response?.data?.error || "Registration failed due to an unexpected error.";

        // Optionally, throw a new error with the transformed message or handle it differently
        throw new Error(errorMessage);
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post('auth/login', credentials)

        // Set token in local storage
        localStorage.setItem("token", response.data.token);

        const user = jwtDecode(response.data.token)

        return user
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Login error:", error);
        console.log('er', error)
        // Transform the error into a user-friendly message or custom error object
        const errorMessage =
          error.response?.data?.error || "Login failed due to an unexpected error.";

        // Optionally, throw a new error with the transformed message or handle it differently
        throw new Error(errorMessage);
    }
};

export const logout = async () => {
    try {
        if (localStorage.getItem("token") === null) {
            throw new Error("No token found");
        }

        //remove token from local storage
        localStorage.removeItem("token");

        return true;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("log out error:", error);

        // Transform the error into a user-friendly message or custom error object
        const errorMessage =
        error.response?.data?.message || "Logging out failed due to an unexpected error.";

        // Optionally, throw a new error with the transformed message or handle it differently
        throw new Error(errorMessage);
    }
};

export const verify = async () => {
    //error handling
    if (localStorage.getItem("token") === null) {
        throw new Error("No token found");
    }

    //get token from local storage
    const token = localStorage.getItem("token");
    if (token) {
        const res = await api.get("auth/verify");
    return res.data;
    }
};

export const applyForJob = async (jobId) => {
    try {
        const response = await api.post(`auth/apply/${jobId}`);
        console.log('this is response', response)
        return response.data;
    } catch (error) {
        console.error("Error applying for job:", error);

        // // Handle different types of errors
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            alert(error.response.data.message || "An error occurred while applying for the job.");

            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request data:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", error.message);
        }
    }
};

export const getAppliedJobs = async () => {
    try {
        const response = await api.get('auth/jobsApplied');
        return response.data;
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        // Handle different types of errors
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request data:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", error.message);
        }
        throw error; // Re-throw the error after logging it
    }
}
