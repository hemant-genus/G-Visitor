import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  //  debugger;
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMenu = localStorage.getItem('MenuItem');

    if (storedMenu) {
      debugger
      setMenuItems(JSON.parse(storedMenu));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="menu">
      <ul className={`menu-list ${isOpen ? 'open' : ''}`}>
        {menuItems
        .filter(menu => menu.isAssigned === 1)   // 👈 HIDE unassigned menus
        .map((menu) => (
          <li key={menu.menuId}>
            <Link to={menu.menuPath}>{menu.menuName}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
