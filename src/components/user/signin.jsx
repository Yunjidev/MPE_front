/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { authSignInUp } from "../../services/auth-fetch";
import UserForm from "./form";

export default function SignIn() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserType } = useContext(UserContext);

  const handleSubmit = async ({ identifier, password }) => {
    try {
      const response = await authSignInUp("signin", { identifier, password });
      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUserType(userData.userType); // Assurez-vous que votre API renvoie le type d'utilisateur
        navigate('/home');
      } else {
        const errorData = await response.json();
        alert(`Erreur de connexion : ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
      alert(`Erreur de connexion : ${error.message}`);
    }
  };

  return <UserForm onSubmit={handleSubmit} mode={"Connexion"} />;
}