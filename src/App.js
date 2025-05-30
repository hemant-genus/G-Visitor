import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import { HashRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact';
import Header from './Comman/Header';
import Footer from './Comman/Footer';
import Menu from './Comman/Menu';
import { Logout } from './Pages/Logout';
import { Register } from './Pages/Register';
import { RegisterVal } from './Pages/RegisterVal';
import ImageUploadDownload from './Pages/ImageUploadDownload ';
import FileListDownload from './Pages/FileListDownload';
import {Counter} from './features/counter/Counter'

import { VisitorEntry } from './Pages/VisitorEntry';
import { VisitorReport } from './Pages/VisitorReport';

import { VisitorEntryTemp } from './Pages/VisitorEntryTemp';

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Do not show Header, Footer, and Menu on login page
  const isLoginPage = location.pathname === '/login';
  const userEmail = localStorage.getItem('userEmail');

  // Redirect to login page if the user is not logged in and not on the login page
  if (!userEmail && !isLoginPage) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      {/* Conditionally render Header, Menu, and Footer */}
      {!isLoginPage && userEmail && <Header />}
      
      <div className="main-content">
        {!isLoginPage && userEmail && <Menu />} {/* Optional side menu */}

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogout={() => navigate('/login')} />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/registerdata" element={<Register />} />
            <Route path="/registerval" element={<RegisterVal />} />

            <Route path="/VisitorEntry" element={<VisitorEntry />} />
            <Route path="/VisitorReport" element={<VisitorReport />} />


            <Route path="/VisitorEntryTemp" element={<VisitorEntryTemp />} />




            {/* <Route path="/imageupload" element={<ImageUploadDownload />} />
            <Route path="/imagedownload" element={<FileListDownload />} /> */}
            {/* <Route path="/counter" element={<Counter />} /> */}
            <Route path="/logout" element={<Logout />} />
            {/* Redirect to login for unknown routes */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>

      {!isLoginPage && userEmail && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
