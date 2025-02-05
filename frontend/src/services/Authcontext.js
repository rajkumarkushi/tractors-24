import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from sessionStorage
    const storedEmail = sessionStorage.getItem("userEmail");
    if (storedEmail) {
      return {
        email: storedEmail,
        name: sessionStorage.getItem("userName"),
        role: sessionStorage.getItem("userRole"),
        phone: sessionStorage.getItem("userPhone"),
      };
    }
    return null;
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);



  const checkAuth = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (token) {
        const { data } = await api.get('/auth/profile');
        setUser(data);
        storeUserData(data);
      }
    } catch (error) {
      sessionStorage.removeItem('token');
      clearUserData();
    } finally {
      setLoading(false);
    }
  };

  const storeUserData = (userData) => {
    sessionStorage.setItem("userEmail", userData.email || '');
    sessionStorage.setItem("userName", userData.name || '');
    sessionStorage.setItem("userRole", userData.role || '');
    sessionStorage.setItem("userPhone", userData.phone || '');
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    sessionStorage.setItem('token', data.token);
    storeUserData(data.user);
    setUser(data.user);
    return data;
  };

  const clearUserData = () => {
    sessionStorage.clear();
    setUser(null);

  };

  const register = async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user)); // Store user data
    setUser(data.user);
  };

  const logout = () => {
    clearUserData();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);