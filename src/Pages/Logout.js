import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all login-related localStorage items
    debugger
    localStorage.removeItem('Token');
    localStorage.removeItem('email');
    localStorage.removeItem('UserCode');
    localStorage.removeItem('PlantCode');
    localStorage.removeItem('UserName');
    localStorage.removeItem('userEmail'); // if used elsewhere

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return <div>Logging out...</div>;
};



