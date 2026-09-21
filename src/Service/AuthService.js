import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import showToast from '../Utilities/ToastUtilities';
import { API_ENDPOINTS } from '../Utilities/ApiEndPoints'
import axiosInstance from '../Helper/axiosInstance';
class AuthService 
  {

    static async  login(loginRequest)
     {
        try {
            //  debugger
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

              //  http://localhost:55788/Values/Validate


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
        }
        
        //-----------------------------------------------------------Get PLANT FOR EMPLOYEE
        static async GetUserPlants(empCode, token) {
        debugger;
        try {
          const exeUrl = API_ENDPOINTS.RightsGetPlants();
          const response = await axiosInstance.get(exeUrl, {
            params: { empcode: empCode },
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });

          const result = response.data;

          if (!result.success || !result.data || result.data.length === 0) {
            showToast('No plants found for this employee!', 'error', { autoClose: 500 });
            return { success: false, data: [] };
          }

          return { success: true, data: result.data };
        } catch (error) {
          console.error("Error fetching plant:", error);
          showToast('Error fetching plant data!', 'error', { autoClose: 500 });
          return { success: false, data: [] };
        }
      }


  static async setPlantRights(formData) {
    try {
      const url = API_ENDPOINTS.setPlantRights();
      const token = localStorage.getItem("Token");
      debugger;
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      // Backend returns { success, result, message }
      if (!response.data.success) {
        showToast(response.data.message || "Failed to update Plant rights", 'error', { autoClose: 500 });
      }

      return response.data;
    } catch (error) {
      console.error("Error updating Plant rights:", error);
      showToast('API error while updating rights', 'error', { autoClose: 500 });
      return { success: false, message: "API error" };
    }
  }


        // -------------------------- GET MENU FOR EMPLOYEE --------------------------
  static async GetUserMenu(userCode, token) {
    debugger;
    try {
      const exeUrl = API_ENDPOINTS.getMenus();
      const response = await axiosInstance.get(exeUrl, {
        params: { empcode: userCode },
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const result = response.data;

      if (!result.success || !result.data || result.data.length === 0) {
        showToast('No menus found for this employee!', 'error', { autoClose: 500 });
        return { success: false, data: [] };
      }

      return { success: true, data: result.data };
    } catch (error) {
      console.error("Error fetching menus:", error);
      showToast('Error fetching menu data!', 'error', { autoClose: 500 });
      return { success: false, data: [] };
    }
  }

  // -------------------------- SET MENU RIGHTS --------------------------
  static async setMenuRights(formData) {
    try {
      const url = API_ENDPOINTS.setMenuRights();
      const token = localStorage.getItem("Token");
      debugger;
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      // Backend returns { success, result, message }
      if (!response.data.success) {
        showToast(response.data.message || "Failed to update menu rights", 'error', { autoClose: 500 });
      }

      return response.data;
    } catch (error) {
      console.error("Error updating menu rights:", error);
      showToast('API error while updating rights', 'error', { autoClose: 500 });
      return { success: false, message: "API error" };
    }
  }

  //---------------------

  // -------------------------- GET MENU FOR EMPLOYEE --------------------------Not in use
  static async GetUserMenus(empcode, token) 
        {
          try {       
            debugger     
              //  debugger;
            const exeUrl = API_ENDPOINTS.getUserMenus();
            
            // ---- cURL logging ----
            // const queryString = new URLSearchParams({ role }).toString();

            //     const curlCommand = `
            //     curl -X GET "${exeUrl}?${queryString}" \
            //     -H "Content-Type: application/json" \
            //     -H "Authorization: Bearer ${token}"
            //     `;

            //     console.log("cURL (GetMenus):", curlCommand);
        // ----------------------

            const response = await axiosInstance.get(exeUrl, {
              params: { empcode},
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });
            const result = response.data;

            if (!result.success || !result.data || result.data.length === 0) {
              showToast('No records found for the selected date range!', 'error', {
                autoClose: 500,
              });
              return { success: false, data: [] };
            }
            return { success: true, data: result.data };
          } catch (error) {
            //  console.error("Error Occurred:", error);
            showToast('Error fetching visitor data!', 'error', {
              autoClose: 500,
            });
            return { success: false, data: [] };
          }
      }

        //--------------------------------------------------------Hemant !!        
        static async GetMenus(empcode, token) 
        {
          try {            
              debugger;
            const exeUrl = API_ENDPOINTS.getMenus();
            
            // ---- cURL logging ----
            // const queryString = new URLSearchParams({ role }).toString();

            //     const curlCommand = `
            //     curl -X GET "${exeUrl}?${queryString}" \
            //     -H "Content-Type: application/json" \
            //     -H "Authorization: Bearer ${token}"
            //     `;

            //     console.log("cURL (GetMenus):", curlCommand);
        // ----------------------

            const response = await axiosInstance.get(exeUrl, {
              params: { empcode},
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });
            const result = response.data;

            if (!result.success || !result.data || result.data.length === 0) {
              showToast('No records found for the selected date range!', 'error', {
                autoClose: 500,
              });
              return { success: false, data: [] };
            }
            return { success: true, data: result.data };
          } catch (error) {
            console.error("Error Occurred:", error);
            showToast('Error fetching visitor data!', 'error', {
              autoClose: 500,
            });
            return { success: false, data: [] };
          }
      }

 }

export default AuthService;