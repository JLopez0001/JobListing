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
        // Log the error for debugging purposes
        console.error("Register error:", error);

        // Transform the error into a user-friendly message or custom error object
        const errorMessage =
          error.response?.data?.message || "Registration failed due to an unexpected error.";

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

        // Transform the error into a user-friendly message or custom error object
        const errorMessage =
          error.response?.data?.message || "Login failed due to an unexpected error.";

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
