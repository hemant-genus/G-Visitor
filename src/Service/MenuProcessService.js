import axios from "axios";
import { API_ENDPOINTS } from "../Utilities/ApiEndPoints";
import axiosInstance from "../Helper/axiosInstance";

class MenuProcessService {
  static async getMenuListData(userID) {
    try {
      debugger;
      const url = API_ENDPOINTS.getMenusAll(userID);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const result = response.data;
      if (result.result.length > 0) {

        return { success: true, data: result };
      } else {

        return { success: false, data: result };
      }
    }
    catch (error) {
      console.error("Error Occured:", error)
    }
  }


  static async setMenuRights(formData) {
    try {
      debugger
      const url = API_ENDPOINTS.setMenuRights();
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      debugger
      const resultndData = response.data;
      if (resultndData.result > 0) {

        return { success: true, data: resultndData };
      } else {

        return { success: false, data: resultndData };
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return { success: false };
    }
  }

  static async getPlantListData(userID) {
    try {
      debugger;
      const url = API_ENDPOINTS.getPlantsAll(userID);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const result = response.data;
      if (result.result.length > 0) {

        return { success: true, data: result };
      } else {

        return { success: false, data: result };
      }
    }
    catch (error) {
      console.error("Error Occured:", error)
    }
  }


  static async setPlantRights(formData) {
    try {
      debugger
      const url = API_ENDPOINTS.setPlantRights();
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      debugger
      const resultndData = response.data;
      if (resultndData.result > 0) {

        return { success: true, data: resultndData };
      } else {

        return { success: false, data: resultndData };
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return { success: false };
    }
  }

  static async getCompanyListData(userID) {
    try {
      debugger;
      const url = API_ENDPOINTS.getCompanyAll(userID);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const result = response.data;
      if (result.result.length > 0) {

        return { success: true, data: result };
      } else {

        return { success: false, data: result };
      }
    }
    catch (error) {
      console.error("Error Occured:", error)
    }
  }


  static async setCompanyRights(formData) {
    try {
      debugger
      const url = API_ENDPOINTS.setCompanyRights();
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      debugger
      const resultndData = response.data;
      if (resultndData.result > 0) {

        return { success: true, data: resultndData };
      } else {

        return { success: false, data: resultndData };
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return { success: false };
    }
  }

  static async getVendorListData(userID) {
    try {
      debugger;
      const url = API_ENDPOINTS.getVendorAll(userID);
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const result = response.data;
      if (result.result.length > 0) {

        return { success: true, data: result };
      } else {

        return { success: false, data: result };
      }
    }
    catch (error) {
      console.error("Error Occured:", error)
    }
  }


  static async setVendorRights(formData) {
    try {
      debugger
      const url = API_ENDPOINTS.setVendorRights();
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      debugger
      const resultndData = response.data;
      if (resultndData.result > 0) {

        return { success: true, data: resultndData };
      } else {

        return { success: false, data: resultndData };
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return { success: false };
    }
  }
  static async getTPLogin() {
    try {
      debugger;
      const url = API_ENDPOINTS.getTPLogin();
      const token = localStorage.getItem('token');
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const result = response.data;
      if (result.result.length > 0) {

        return { success: true, data: result };
      } else {

        return { success: false, data: result };
      }
    }
    catch (error) {
      console.error("Error Occured:", error)
    }
  }




  static async setTPLogin(formData) {
    try {
      debugger
      const url = API_ENDPOINTS.setTPLogin();
      const token = localStorage.getItem('token');
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      debugger
      const resultndData = response.data;
      if (resultndData.result.length > 0) {

        return { success: true, data: resultndData };
      } else {

        return { success: false, data: resultndData };
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return { success: false };
    }
  }

  static async updateTPLogin(formData) {
    try {
      debugger
      const url = API_ENDPOINTS.updateTPLogin();
      const token = localStorage.getItem('token');
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      debugger
      const resultndData = response.data;
      if (resultndData.result.length > 0) {

        return { success: true, data: resultndData };
      } else {

        return { success: false, data: resultndData };
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return { success: false };
    }
  }

  static async getHREmail(formData) {
    try {
      debugger
      const url = API_ENDPOINTS.getHREmail();
      const token = localStorage.getItem('token');
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      debugger
      const resultndData = response.data;
      if (resultndData.result.length > 0) {

        return { success: true, data: resultndData };
      } else {

        return { success: false, data: resultndData };
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return { success: false };
    }
  }

  static async setHREmail(formData) {
    try {
      debugger
      const url = API_ENDPOINTS.setHREmail();
      const token = localStorage.getItem('token');
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      debugger
      const resultndData = response.data;
      if (resultndData.result.length > 0) {

        return { success: true, data: resultndData };
      } else {

        return { success: false, data: resultndData };
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      return { success: false };
    }
  }
}

export default MenuProcessService