import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Header from './Comman/Header';
import Footer from './Comman/Footer';
import Menu from './Comman/Menu';

function Layout() {
  const location = useLocation();

  // Do not show Header, Footer, and Menu on login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      {!isLoginPage && <Header />}
      
      <div className="main-content">
        {!isLoginPage && <Menu />} {/* Optional side menu */}

        <div className="page-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            {/* Redirect to login for unknown routes */}
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>

      {!isLoginPage && <Footer />}
    </div>
  );
}