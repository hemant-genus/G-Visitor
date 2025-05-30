import {  Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Function to build the menu hierarchy
export const buildMenuHierarchy = (menuData) => {
    const menuMap = {};

    // First, create a map of all menu items
    menuData.forEach(item => {
        menuMap[item.menuId] = { ...item, subMenu: [] };
    });

    // Now, organize them by parent-child relationship
    const menuHierarchy = [];
    menuData.forEach(item => {
        if (item.parentId === 0) {
            // Main menu
            menuHierarchy.push(menuMap[item.menuId]);
        } else {
            // Submenu: Find the parent menu and push this into its subMenu array
            if (menuMap[item.parentId]) {
                menuMap[item.parentId].subMenu.push(menuMap[item.menuId]);
            }
        }
    });

    return menuHierarchy;
};

// Function to render menu items
export const renderMenuItems = (items) => {
    return items.map(item => (
        item.subMenu.length > 0 ? (
            <NavDropdown title={item.menuDescription} id={`dropdown-${item.menuId}`} key={item.menuId} className="custom-dropdown">
                {item.subMenu.map(subItem => (
                    <NavDropdown.Item as={Link} to={subItem.link || '#'} key={subItem.menuId}>
                        {subItem.menuDescription}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        ) : (
            <Nav.Link as={Link} to={item.link || '#'} key={item.menuId}>
                {item.menuDescription}
            </Nav.Link>
        )
    ));
};
