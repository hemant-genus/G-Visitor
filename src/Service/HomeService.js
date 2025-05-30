import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import showToast from '../Utilities/ToastUtilities';
import { API_ENDPOINTS } from '../Utilities/ApiEndPoints';
import axiosInstance from '../Helper/axiosInstance';

class HomeService{

    static async getMenuItem(){
        try{
            
            const homeUrl = API_ENDPOINTS.getMenus();
            const token = localStorage.getItem('token');
            const response = await axiosInstance.get(homeUrl,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
          });
          debugger
          const result = response.data;
          if(!result.success){
            
            return { success: false,data:result };
          }else {
            
            return { success: true, data: result };
          }
        }
        catch(error){
            console.error("Error Occured:",error)
        }
    }

    static async  register(register){
      try {
        debugger
        const token = localStorage.getItem('Token');
        const loginUrl = API_ENDPOINTS.setRegisterData();
        debugger;
          const response = await axios.post(loginUrl, register, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          },
          });
          const result = response.data;
          if (!result.success) {
            showToast('Data Not set.','error',{
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
}
//------------------------------





//-------------------------------
static async SaveVisitor(visitor) {
  try {
    debugger;
    const token = localStorage.getItem('Token');
    const VisitorUrl = API_ENDPOINTS.setVisitorData();
    debugger;
    const response = await axios.post(VisitorUrl, visitor, {
      headers: {
        "Content-Type": "multipart/form-data", // ✅ Fix: Ensure FormData is handled properly
        "Authorization": `Bearer ${token}`
      },
    });

    const result = response.data;

    if (!result.success) {
      showToast('Data Not set.', 'error', { autoClose: 500 });
      return { success: false };
    } else {
      showToast('Visitor registration successful!', 'success', { autoClose: 500 });
      return { success: true, data: result };
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

//=--------------------------


// new code 

static async GetEmployees(inputValue) {
  try {
    const token = localStorage.getItem('Token');

    // Append inputValue as a query parameter in GET request
    const VisitorUrl = `${API_ENDPOINTS.getemployeeDropDown()}?inputValue=${encodeURIComponent(inputValue)}`;

    const response = await axios.get(VisitorUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    debugger;
    const result = response.data;

    if (!result.success) {
      showToast('No employee data found.', 'error', { autoClose: 500 });
      return { success: false, data: [] }; // Return empty array if no data
    }

    showToast('Employee data fetched successfully!', 'success', { autoClose: 500 });
    return { success: true, data: result.data };

  } catch (error) {
    console.error("Error fetching employees:", error);
    showToast('Error fetching employees!', 'error', { autoClose: 500 });
    return { success: false, error };
  }
}





//-----------------------

static async  SaveVisitorOld(visitor){
  try {
    debugger;
    const token = localStorage.getItem('Token');
    const VisitorUrl = API_ENDPOINTS.setVisitorData();
      debugger;
      const response = await axios.post(VisitorUrl, visitor, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      });
      const result = response.data;
      if (!result.success) {
        showToast('Data Not set.','error',{
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
}

static async  Updateregister(register){
  try {
    debugger
    const token = localStorage.getItem('Token');
    const loginUrl = API_ENDPOINTS.updateRegisterData();
      debugger;
      const response = await axios.post(loginUrl, register, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      });
      const result = response.data;
      if (!result.success) {
        showToast('Data Not set.','error',{
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
}

static async  Deleteregister(register){
  try {
    debugger
    const token = localStorage.getItem('Token');
    const loginUrl = API_ENDPOINTS.deleteRegisterData();
      debugger;
      const response = await axios.post(loginUrl, register, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      });
      const result = response.data;
      if (!result.success) {
        showToast('Data Not set.','error',{
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
}

static async GetVisitorReport(fromDate, toDate) {
  try {
    if (!fromDate || !toDate) {
      showToast('Please select both From Date and To Date!', 'error', {
        autoClose: 500,
      });
      return { success: false, data: [] };
    }
      debugger;
    const exeUrl = API_ENDPOINTS.getVisitorData();
    const token = localStorage.getItem('Token');

    // Pass FromDate and ToDate as query parameters
    const response = await axiosInstance.get(exeUrl, {
      params: { fromDate, toDate },
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


    static async getRegisterData(){
        try{
            debugger;
            const exeUrl = API_ENDPOINTS.getRegisterData();
            const token = localStorage.getItem('Token');
            const response = await axiosInstance.get(exeUrl,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
          const result = response.data;
          if(!result.success){
            showToast('Data not found!','error',{
                autoClose:500
              })
            return { success: false,data:result };
          }else {
            
            return { success: true, data: result };
          }
        }
        catch(error){
            console.error("Error Occured:",error)
            
        }
    }

    // static async getTrainingSchedule(departmentId){
    //     try{
            
    //         const url = API_ENDPOINTS.getTrainingSchedule();
    //         const token = localStorage.getItem('token');
    //         const response = await axiosInstance.get(url,{
    //         params:{departmentId},
    //         headers:{
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         },
    //       });
    //       const result = response.data;
    //       if(!result.success){
            
    //         return { success: false,data:result };
    //       }else {
            
    //         return { success: true, data: result };
    //       }
    //     }
    //     catch(error){
    //         console.error("Error Occured:",error)
    //     }
    // }
}
export default HomeService;