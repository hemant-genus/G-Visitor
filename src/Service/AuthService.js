import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import showToast from '../Utilities/ToastUtilities';
import { API_ENDPOINTS } from '../Utilities/ApiEndPoints'
import axiosInstance from '../Helper/axiosInstance';
class AuthService{
    static async  login(loginRequest){
        try {
            debugger
          const loginUrl = API_ENDPOINTS.getLogin();
            const response = await axios.post(loginUrl, loginRequest, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            const result = response.data;
            if (!result.success) {
              showToast('Login failed. Please try again.','error',{
                autoClose:500
              })
              
              return { success: false };
              
            } else {
              // Handle login success
              showToast('Login successful!','success',{
                autoClose:500
              })
              localStorage.setItem('token', result.data.token);
              return { success: true, data: result };
            }
          } catch (error) {
            // Handle network or other errors
            console.error("Error occurred:", error);
          }
}}

export default AuthService;