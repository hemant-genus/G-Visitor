import axios from "axios";
import { API_ENDPOINTS } from "../Utilities/ApiEndPoints";
import showToast from "../Utilities/ToastUtilities";

const baseUrl = API_ENDPOINTS.getBaseUrl();
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: baseUrl, // Your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add an interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, return the response
        return response;
    },
    (error) => {
        // Handle specific error cases

        // If the error is a 401 (Unauthorized), log the user out and redirect to the login page
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            showToast('Session expired, please log in again.', 'error', {
                autoClose: 500
            });
            window.location.href = '/login';
        }

        // Check for network errors (server might be down)
        if (!error.response) {
            showToast('API server is not reachable. Please check your connection.', 'error', {
                autoClose: 500
            });
        }

        // Return the error to be handled by the calling code
        return Promise.reject(error);
    }
);

export default axiosInstance;
