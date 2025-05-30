import React, { createContext, useState, useEffect } from 'react';

// Create UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    // Load user data from localStorage when the component mounts
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData)); // Parse and set user data from localStorage
        }
    }, []);

    const setLoginData = (data) => {
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data)); // Store user data in localStorage
    };

    const clearUserData = () => {
        setUserData(null);
        localStorage.removeItem('userData'); // Clear data from localStorage when user logs out
    };

    return (
        <UserContext.Provider value={{ userData, setLoginData, clearUserData }}>
            {children}
        </UserContext.Provider>
    );
};
