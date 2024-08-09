/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// src/context/ModalContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    // Récupérer le userType du localStorage au chargement initial
    return localStorage.getItem('userType') || null;
  });

  useEffect(() => {
    // Sauvegarder le userType dans localStorage à chaque changement
    if (userType) {
      localStorage.setItem('userType', userType);
    }
  }, [userType]);

  return (
    <ModalContext.Provider value={{ userType, setUserType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);