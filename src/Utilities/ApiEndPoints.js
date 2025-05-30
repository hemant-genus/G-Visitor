import { BASE_URL } from '../config';

export const API_ENDPOINTS = {
    getLogin: () => `${BASE_URL}/Home`, // For login
    getMenus: () => `${BASE_URL}/TQM/GetMenu`, 
    getRegisterData: () => `${BASE_URL}/TQM/GetUser`,
    setRegisterData: () => `${BASE_URL}/TQM/SetUser`,

    getVisitorData: () => `${BASE_URL}/TQM/GetVisitor`,
    setVisitorData: () => `${BASE_URL}/TQM/SetVisitor`,
    getemployeeDropDown: () => `${BASE_URL}/TQM/GetEmployeeList`,  // it is to search whom to meet.
    
    updateRegisterData: () => `${BASE_URL}/TQM/UpdateUser`,
    deleteRegisterData: () => `${BASE_URL}/TQM/DeleteUser`,
    getTrainingSchedule: () => `${BASE_URL}/Home/GetSchedule`,  // For user-related actions
    getScheduleDropDown: () => `${BASE_URL}/Schedule/GetDropDownList`, 
    getBaseUrl: () => `${BASE_URL}`,
    getNcReport: () => `${BASE_URL}/Report/getNcData`, 
    getCellApprovalReport: () => `${BASE_URL}/Report/getCellApproval`, 
    getUserFeedbackReport: () => `${BASE_URL}/Report/getUserFeedback`, 
    getEndpoint: (controller, functionName) => `${BASE_URL}/${controller}/${functionName}`,
};