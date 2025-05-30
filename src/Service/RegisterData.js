import 'react-toastify/dist/ReactToastify.css';
import { API_ENDPOINTS } from '../Utilities/ApiEndPoints';
import axiosInstance from '../Helper/axiosInstance';

class RegisterData {
    static async getUserFeedbackReportData() {
        try {
            debugger
            const homeUrl = API_ENDPOINTS.getRegisterData();
            const token = localStorage.getItem('Token');
            const response = await axiosInstance.get(homeUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            debugger;
            const result = response.data;
            if (!result.success) {
                return { success: false, data: [] }; // Return empty array on failure
            } else {
                return { success: true, data: result.data || [] }; // Ensure to return the expected data array
            }
        } catch (error) {
            console.error("Error Occurred:", error);
            return { success: false, data: [] }; // Return empty array on error
        }
    }


    static async getVisitorData() {
        try {
            debugger;
            const homeUrl = API_ENDPOINTS.getVisitorData();
            const token = localStorage.getItem('Token');
            const response = await axiosInstance.get(homeUrl, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            const result = response.data;
            if (!result.success) {
                return { success: false, data: [] }; // Return empty array on failure
            } else {
                return { success: true, data: result.data || [] }; // Ensure to return the expected data array
            }
        } catch (error) {
            console.error("Error Occurred:", error);
            return { success: false, data: [] }; // Return empty array on error
        }
    }


}

export default RegisterData;
