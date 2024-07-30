import axios from "axios"

// Get authentication token from local storage
const getToken = () => {
    return new Promise((resolve) => {
        resolve(`Bearer ${localStorage.getItem("token") || null}`)
    });
};

// Creates API endpoint with base url
const api = axios.create({ baseURL: 'http://localhost:3000' });


/*
    Intercepts all outgoing requests to set the Authorization header.
    This interceptor adds a Bearer token to the headers of each request
    if a token is found in local storage.
*/

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken();
            if (token) {
                config.headers["Authorization"] = token;
            }
            return config;
        } catch (error) {
            console.error("Error getting token:", error);
            return Promise.reject(error);
        }
    },
    (error) => {
        console.log("Request error: ", error)
        return Promise.reject(error)
    }
);

export default api