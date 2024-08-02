/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ userType, setUserType, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};