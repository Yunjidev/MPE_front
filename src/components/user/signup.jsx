import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { authSignInUp } from "../../services/auth-fetch";
import UserForm from "./form";

export default function SignUp() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserType } = useContext(UserContext);

  const handleSubmit = async ({ username, email, password }) => {
    try {
      const response = await authSignInUp("signup", { username, email, password });
      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUserType(userData.userType); // Assurez-vous que votre API renvoie le type d'utilisateur
        navigate('/home');
      } else {
        const errorData = await response.json();
        alert(`Erreur lors de l'inscription : ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      alert(`Erreur lors de l'inscription : ${error.message}`);
    }
  };

  return <UserForm onSubmit={handleSubmit} mode={"Inscription"} />;
}