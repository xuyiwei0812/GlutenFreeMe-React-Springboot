import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the auth data
const AuthContext = createContext(null);

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps your app and makes an auth object available to any child component that calls `useAuth()`.
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); // Start with no user logged in

    // Login function to update the auth state
    const login = (user) => {
        setAuth(user);
    };

    // Logout function to clear the auth state
    const logout = () => {
        setAuth(null);
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            const userObject = JSON.parse(storedUser);
            setAuth(userObject); // 这里使用userObject更新auth状态
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
