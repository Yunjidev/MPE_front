//React
import { useNavigate } from 'react-router-dom';
import UserForm from "./form";
//SERVICES
import { authSignInUp } from "../../services/auth-fetch";
//ATOM
import {useAtom} from "jotai";
import {userAtom} from "../../store/user";

//Toast
import { toast } from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate(); // Utilisez le hook useNavigate
  const [user,setUser] = useAtom(userAtom);

  const handleSubmit = async ({ username, email, password }) => {
    try {
      const response = await authSignInUp("signup", { username, email, password });
      if (response.ok) {
        const userData = await response.json();
        // Utilisez setUser pour mettre à jour les données de l'utilisateur
        setUser({ ...user, ...userData, isLogged: true });
        // Redirection après inscription réussie
        navigate('/home');
        toast.success('Inscription réussie');
      } else {
        // Affichage d'un message d'erreur si l'inscription échoue
        const errorData = await response.json();
        toast.error(`Erreur lors de l'inscription : ${errorData.message || 'Vérifier les champs obligatoires'}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      toast.error(`Erreur lors de l'inscription : ${error.message}`);
    }
  };

  return <UserForm onSubmit={handleSubmit} mode={"Inscription"} />;
}
