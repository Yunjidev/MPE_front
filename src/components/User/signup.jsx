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
      const response = await authSignInUp("signup", formData, setUser);
      const userData = await response;
      console.log(userData);
      navigate("/dashboard/user-db");
      toast.success("Inscription réussie");
    } catch (error) {
      const errorData = await JSON.parse(error.message);
      console.log(errorData);
      errorData.forEach((error) => {
        const [, message] = Object.entries(error)[0];
        toast.error(`${message}`);
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <UserForm onSubmit={handleSubmit} mode={"Inscription"} />;
    </div>
  );
}
