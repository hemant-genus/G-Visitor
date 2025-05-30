import React from 'react';
import './Header.css'; // Optional: For styling
import { Link, useNavigate } from 'react-router-dom';
import genusLogo from './genus_logo.png'; // ✅ Import Genus logo

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear the user session
        localStorage.removeItem('userEmail');
    
        // Redirect to login page
        navigate('/login');
      };
      const userEmail = localStorage.getItem('UserName');
      const userPlant = localStorage.getItem('PlantCode');
  return (
    <header className="header">
      <div className="logo">  
        
        {/* <img src="/vms.jpg" alt="G-Visitor" className="logo" /> */}
        <img src={genusLogo} alt="Genus Power Logo" className="genus-logo" />
        
        </div>
      <nav>
        <ul className="nav-menu">
            <li>Welcome, {userEmail ? userEmail : 'Guest'}!</li>
            <li>Plant: {userPlant ? userPlant : 'N/A'}</li>
          <li><Link to="/home" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', textDecoration: 'underline' }}>Home</Link></li>
          <li><Link onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', textDecoration: 'underline' }}>Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;