import { useNavigate } from 'react-router-dom';
import { authSignInUp } from "../../services/auth-fetch";
import UserForm from "./form";

export default function SignUp() {
  const navigate = useNavigate(); // Utilisez le hook useNavigate

  const handleSubmit = async ({ username, email, password }) => {
    try {
      const response = await authSignInUp("signup", { username, email, password });
      if (response.ok) {
        // Redirection après inscription réussie
        navigate('/home');
      } else {
        // Affichage d'un message d'erreur si l'inscription échoue
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