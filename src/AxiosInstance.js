import axios from "axios";
export const baseURL = "http://localhost:5000/api";
 

// Centralized error handler
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status code outside 2xx
    console.error("Error Response:", error.response);
    switch (error.response.status) {
      case 400:
        return { message: "Bad Request. Please check your input." };
      case 401:
        return { message: "Unauthorized. Please log in again." };
      case 403:
        return { message: "Forbidden. You do not have permission." };
      case 404:
        return { message: "Resource not found." };
      case 500:
        return { message: "Server error. Please try again later." };
      default:
        return { message: "Something went wrong. Please try again." };
    }
  } else if (error.request) {
    // No response received
    return { message: "No response from server. Please check your network." };
  } else {
    // Error setting up the request
    return { message: error.message || "An unexpected error occurred." };
  }
};

/** Authenticated Axios instance with token **/
const axiosWithAuth = axios.create({
  baseURL, // API base URL
  timeout: 10000, // Optional timeout for requests
});

// Add request interceptor to include token
axiosWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("session"); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(handleError(error)); // Handle request error
  }
);

// Add response interceptor for error handling
axiosWithAuth.interceptors.response.use(
  (response) => response, // Return response if no error
  (error) => Promise.reject(handleError(error)) // Handle response error
);

/** Public Axios instance without token **/
const axiosWithoutAuth = axios.create({
  baseURL, // API base URL
  timeout: 10000, // Optional timeout for requests
});

// Add response interceptor for public requests as well
axiosWithoutAuth.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(handleError(error))
);

/** Common function for API requests with Auth **/
export const apiRequestWithAuth = async (method, url, data = null) => {
  try {
    const response = await axiosWithAuth({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    throw error; // Handle error at the component level if needed
  }
};

/** Common function for API requests without Auth **/
export const apiRequestWithoutAuth = async (method, url, data = null) => {
  try {
    const response = await axiosWithoutAuth({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    throw error; // Handle error at the component level if needed
  }
};
