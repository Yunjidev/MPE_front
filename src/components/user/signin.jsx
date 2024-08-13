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
      if (response.ok) {
        const userData = await response.json();
        if (userData && userData.user && userData.user.id) {
          // Utilisez setUser pour mettre à jour les données de l'utilisateur
          setUser((prevUser) => {
            const updatedUser = {
              ...prevUser,
              ...userData.user,
              isLogged: true,
            };
            // Synchronisez avec le stockage local
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return updatedUser;
          });
          // Redirection après authentification réussie
          navigate("/dashboard/user-db");
          toast.success("Authentification réussie");
        } else {
          toast.error("Identifiant ou mot de passe incorrect");
        }
      } else {
        const errorData = await response.json();
        toast.error(
          `Erreur lors de l'authentification : ${errorData.message || "Identifiant ou mot de passe incorrect"}`,
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      toast.error(`Erreur lors de l'authentification : ${error.message}`);
    }
  };

  return <UserForm onSubmit={handleSubmit} mode={"Connexion"} />;
}
