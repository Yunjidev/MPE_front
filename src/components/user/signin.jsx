/* eslint-disable no-unused-vars */
//SERVICES
import { authSignInUp } from "../../services/auth-fetch";
//React
import { useNavigate } from "react-router-dom";
import UserForm from "./form";
//ATOM
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
//Toast
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleSubmit = async ({ identifier, password }) => {
    try {
      const response = await authSignInUp("signin", { identifier, password });
      setUser({ ...response, isLogged: true }); // Met à jour le contexte avec les nouvelles données
      navigate("/dashboard/user-db");
      toast.success("Authentification réussie");
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      toast.error(`Erreur lors de l'authentification : ${error.message}`);
    }
  };

  return <UserForm onSubmit={handleSubmit} mode={"Connexion"} />;
}
