//SERVICES
import { authSignInUp } from "../../services/auth-fetch";
//React
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
//ATOM
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
//Toast
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  const handleSubmit = async (data) => {
    try {
      await authSignInUp("signin", data, setUser);
      navigate("/dashboard/user-db");
      toast.success("Authentification réussie");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <UserForm onSubmit={handleSubmit} mode={"Connexion"} />;
    </div>
  );
}
