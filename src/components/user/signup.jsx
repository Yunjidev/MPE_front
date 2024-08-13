// SignUp.jsx
import { useNavigate } from "react-router-dom";
import UserForm from "./form";
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

  const handleSubmit = async ({ username, email, password }) => {
    const response = await authSignInUp("signup", {
      username,
      email,
      password,
    });
    const userData = await response;
    setUser({ ...userData, isLogged: true }); // Met à jour le contexte avec les nouvelles données
    navigate("/dashboard/user-db");
    toast.success("Inscription réussie");
  };

  return <UserForm onSubmit={handleSubmit} mode={"Inscription"} />;
}
