/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);

  return (
    <ModalContext.Provider value={{ userType, setUserType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);