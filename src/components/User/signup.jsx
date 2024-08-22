// SignUp.jsx
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
//SERVICES
import { authSignInUp } from "../../services/auth-fetch";
//ATOM
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
//Toast
import { toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  const handleSubmit = async (formData) => {
    try {
      const response = await authSignInUp("signup", formData);
      const userData = await response.json();
      setUser({ ...userData, isLogged: true }); // Met à jour le contexte avec les nouvelles données
      navigate("/dashboard/user-db");
      toast.success("Inscription réussie");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error.message);
      toast.error(`Erreur lors de l'inscription : ${error.message}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <UserForm onSubmit={handleSubmit} mode={"Inscription"} />;
    </div>
  );
}
