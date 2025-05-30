import React, { useState, useEffect } from 'react';
import './Login.css'; // Add your custom CSS file here
import { useNavigate } from 'react-router-dom';
import User from '../Model/User';
import AuthService from '../Service/AuthService';
import genusLogo from './genus-power-logo.png'; // ✅ Import Genus logo

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    debugger;
    localStorage.clear();


    //  const storedEmail = localStorage.getItem('userEmail');
    debugger;
    // if (storedEmail) {
    //   navigate('/home');
    // }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Both fields are required.');
      return;
    }
    fetchData();
    localStorage.setItem('userEmail', email);
    //  navigate('/home');
  };




  const fetchData = async () => {
    debugger;
    try {
      setLoading(true);
      const loginRequest = new User(email, password);
      const loginSuccess = await AuthService.login(loginRequest);
      
      if (loginSuccess.success) {
        debugger;
        const result = loginSuccess?.data?.data;
        localStorage.setItem('Token', result.token);
        localStorage.setItem('email', result.workEmail);
        localStorage.setItem('UserCode', result.employeeCode);
        localStorage.setItem('PlantCode', result.locationName);
        localStorage.setItem('UserName', result.employeeName.split(' ')[0]);
        navigate('/home');
      } else {
        setLoading(false);
        setError("Invalid employee code or password.");
        alert("Invalid User or Password.");
        //  navigate('/login');
      }
    } catch (err) {
      setError(err);
      navigate('/login');
    } 
  };











  const fetchDataOld = async () => {
    try {
      setLoading(true);
      const loginRequest = new User(email, password);
      const loginSuccess = await AuthService.login(loginRequest);
      
      if (loginSuccess.success) {
        debugger;
        const result = loginSuccess?.data?.data;
        localStorage.setItem('Token', result.token);
        localStorage.setItem('email', result.workEmail);
        localStorage.setItem('UserCode', result.employeeCode);
        localStorage.setItem('PlantCode', result.locationName);
        localStorage.setItem('UserName', result.employeeName.split(' ')[0]);
        navigate('/home');
      } else {
        setError("Invalid employee code or password.");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container" >
        <img src={genusLogo} alt="Genus Power Logo" className="genus-logo" />
      </div>
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">UserCode:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your UserCode"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">{loading ? "Logging in..." : "Login"}</button>
      </form>
    </div>
  );
};

export default Login;
