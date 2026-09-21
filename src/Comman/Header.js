```javascript
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import genusLogo from './genus_logo.png';

const Header = () => {

    const handleLogout = () => {

        // Clear user session
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('UserName');
        localStorage.removeItem('PlantCode');

        // Redirect to Login page
        window.location.replace('/G-Visitor/#/login');
    };

    const userName = localStorage.getItem('UserName');
    const userPlant = localStorage.getItem('PlantCode');

    return (
        <header className="header">

            <div className="logo">
                <img
                    src={genusLogo}
                    alt="Genus Power Logo"
                    className="genus-logo"
                />
            </div>

            <nav>
                <ul className="nav-menu">

                    <li>
                        Welcome, {userName ? userName : 'Guest'}!
                    </li>

                    <li>
                        Plant: {userPlant ? userPlant : 'N/A'}
                    </li>

                    <li>
                        <Link
                            to="/home"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'white',
                                textDecoration: 'underline'
                            }}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <a
                            href="/G-Visitor/#/login"
                            onClick={handleLogout}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'white',
                                textDecoration: 'underline'
                            }}
                        >
                            Logout
                        </a>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;
```
