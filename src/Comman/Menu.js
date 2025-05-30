import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle menu state
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <nav className="menu">
      <div className="menu-header">
        

        {/* <h2 className="menu-title">Visitor System</h2> */}
      </div>

      {/* Collapsible Menu */}
      <ul className={`menu-list ${isOpen ? 'open' : ''}`}>
        
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/VisitorEntry">Visitor Pass</Link></li>
        <li><Link to="/VisitorReport">Visitor Report</Link></li>
        
      </ul>
    </nav>
  );
};

export default Menu;
