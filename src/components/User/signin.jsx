//SERVICES
import { authSignInUp } from "../../services/auth-fetch";
//React
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
//ATOM
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { enterprisesAtom } from "../../store/enterprises";
//Toast
import { toast } from "react-toastify";

export default function SignIn() {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const [, setEnterprises] = useAtom(enterprisesAtom);

  const handleSubmit = async (data) => {
    try {
      const userData = await authSignInUp("signin", data);
      setUser({
        ...userData.user,
        isLogged: true,
      });
      setEnterprises(userData.enterprises);
      navigate("/dashboard/user-db");
      toast.success("Authentification réussie");
    } catch (error) {
      const errorData = await JSON.parse(error.message);
      toast.error(errorData.errors);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <UserForm onSubmit={handleSubmit} mode={"Connexion"} />;
    </div>
  );
}
